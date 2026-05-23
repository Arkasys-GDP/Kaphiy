import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { KitchenStatus, Order, Prisma } from '@prisma/client';
import { KitchenGateway } from '../kitchen/kitchen.gateway';
import { KitchenService } from '../kitchen/kitchen.service';
import {
  ACTIVE_KITCHEN_STATUSES,
  ORDER_INCLUDE,
  adaptOrder,
  toWireStatus,
} from '../kitchen/kitchen.adapter';
import { MetricsRange } from './dto/metrics-query.dto';

export interface MetricsResponse {
  range: MetricsRange;
  totals: {
    orders: number;
    revenue: number;
    avgPrepMinutes: number;
    completed: number;
    cancelled: number;
  };
  timeSeries: Array<{ bucket: string; orders: number; revenue: number }>;
  topProducts: Array<{
    productId: number;
    name: string;
    quantity: number;
    revenue: number;
  }>;
  statusBreakdown: Array<{ status: string; count: number }>;
}

interface TimeSeriesRow {
  bucket: Date;
  orders: bigint;
  revenue: Prisma.Decimal | null;
}

interface TopProductRow {
  product_id: number;
  name: string;
  quantity: bigint;
  revenue: Prisma.Decimal | null;
}

interface StatusBreakdownRow {
  kitchen_status: string;
  count: bigint;
}

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly gateway: KitchenGateway,
    private readonly kitchen: KitchenService,
  ) {}

  // ── Public endpoints ──────────────────────────────────────

  async findActive() {
    const [orders, stats] = await Promise.all([
      this.kitchen.getActiveOrders(),
      this.kitchen.getStats(),
    ]);
    return { orders, stats };
  }

  async findHistory(page = 1, limit = 20) {
    const safeLimit = Math.min(Math.max(limit, 1), 100);
    const safePage = Math.max(page, 1);
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const where = {
      kitchenStatus: KitchenStatus.DELIVERED,
      createdAt: { gte: startOfDay },
      deletedAt: null,
    };

    const [rows, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        include: ORDER_INCLUDE,
        orderBy: { createdAt: 'desc' },
        skip: (safePage - 1) * safeLimit,
        take: safeLimit,
      }),
      this.prisma.order.count({ where }),
    ]);

    return {
      orders: rows.map(adaptOrder),
      total,
      page: safePage,
      limit: safeLimit,
    };
  }

  async getMetrics(range: MetricsRange = 'daily'): Promise<MetricsResponse> {
    const { since, bucket } = this.rangeWindow(range);
    const sinceISO = since.toISOString();

    // Aggregate totals
    const totalsRow = await this.prisma.order.aggregate({
      where: { createdAt: { gte: since }, deletedAt: null },
      _count: { _all: true },
      _sum: { total: true },
    });

    const completedCount = await this.prisma.order.count({
      where: {
        kitchenStatus: KitchenStatus.DELIVERED,
        createdAt: { gte: since },
        deletedAt: null,
      },
    });

    const cancelledCount = await this.prisma.order.count({
      where: {
        paymentStatus: 'CANCELLED',
        createdAt: { gte: since },
        deletedAt: null,
      },
    });

    // Time series — bucket by hour (daily) or day (weekly/monthly)
    const timeSeriesRows = await this.prisma.$queryRaw<TimeSeriesRow[]>`
      SELECT
        date_trunc(${bucket}::text, created_at) AS bucket,
        COUNT(*)::bigint AS orders,
        COALESCE(SUM(total), 0)::numeric AS revenue
      FROM orders
      WHERE created_at >= ${sinceISO}::timestamp
        AND deleted_at IS NULL
      GROUP BY bucket
      ORDER BY bucket ASC
    `;

    // Top 5 products
    const topRows = await this.prisma.$queryRaw<TopProductRow[]>`
      SELECT
        p.id AS product_id,
        p.name AS name,
        SUM(oi.quantity)::bigint AS quantity,
        SUM(oi.quantity * oi.unit_price)::numeric AS revenue
      FROM order_items oi
      JOIN products p ON p.id = oi.product_id
      JOIN orders o ON o.id = oi.order_id
      WHERE o.created_at >= ${sinceISO}::timestamp
        AND o.deleted_at IS NULL
      GROUP BY p.id, p.name
      ORDER BY quantity DESC
      LIMIT 5
    `;

    // Kitchen status breakdown
    const statusRows = await this.prisma.$queryRaw<StatusBreakdownRow[]>`
      SELECT kitchen_status::text AS kitchen_status, COUNT(*)::bigint AS count
      FROM orders
      WHERE created_at >= ${sinceISO}::timestamp
        AND deleted_at IS NULL
      GROUP BY kitchen_status
    `;

    const totalRevenue = totalsRow._sum.total
      ? Number(totalsRow._sum.total)
      : 0;

    return {
      range,
      totals: {
        orders: totalsRow._count._all,
        revenue: totalRevenue,
        avgPrepMinutes: 0, // requires completed_at column — pending DB change
        completed: completedCount,
        cancelled: cancelledCount,
      },
      timeSeries: timeSeriesRows.map((r) => ({
        bucket: r.bucket.toISOString(),
        orders: Number(r.orders),
        revenue: r.revenue ? Number(r.revenue) : 0,
      })),
      topProducts: topRows.map((r) => ({
        productId: r.product_id,
        name: r.name,
        quantity: Number(r.quantity),
        revenue: r.revenue ? Number(r.revenue) : 0,
      })),
      statusBreakdown: statusRows.map((r) => ({
        status: r.kitchen_status,
        count: Number(r.count),
      })),
    };
  }

  private rangeWindow(range: MetricsRange): { since: Date; bucket: 'hour' | 'day' } {
    const now = new Date();
    if (range === 'daily') {
      const since = new Date(now.getTime() - 24 * 60 * 60_000);
      return { since, bucket: 'hour' };
    }
    if (range === 'weekly') {
      const since = new Date(now.getTime() - 7 * 24 * 60 * 60_000);
      return { since, bucket: 'day' };
    }
    // monthly
    const since = new Date(now.getTime() - 30 * 24 * 60 * 60_000);
    return { since, bucket: 'day' };
  }

  async updateStatus(id: number, kitchenStatus: KitchenStatus) {
    const existing = await this.prisma.order.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Order ${id} not found`);

    const updated = await this.prisma.order.update({
      where: { id },
      data: { kitchenStatus },
      include: ORDER_INCLUDE,
    });

    // Broadcast status change + refreshed stats
    this.gateway.emitStatusChanged(String(updated.id), toWireStatus(updated.kitchenStatus));
    void this.kitchen.getStats().then((s) => this.gateway.emitStats(s));

    return adaptOrder(updated);
  }

  // ── Existing CRUD ────────────────────────────────────────

  async create(dto: CreateOrderDto): Promise<Order> {
    const { items, tableId, ...orderData } = dto;

    const products = await this.prisma.product.findMany({
      where: { id: { in: items.map((i) => i.productId) } },
    });
    if (products.length !== items.length) {
      throw new NotFoundException('One or more products not found');
    }

    const total = items.reduce((acc, item) => {
      const product = products.find((p) => p.id === item.productId)!;
      return acc + product.price.toNumber() * item.quantity;
    }, 0);

    const order = await this.prisma.order.create({
      data: {
        ...orderData,
        total,
        table: tableId ? { connect: { id: tableId } } : undefined,
        orderItems: {
          create: items.map((item) => {
            const product = products.find((p) => p.id === item.productId)!;
            return {
              quantity: item.quantity,
              unitPrice: product.price,
              aiNotes: item.aiNotes,
              product: { connect: { id: item.productId } },
            };
          }),
        },
      },
      include: ORDER_INCLUDE,
    });

    // Broadcast new order to kitchen dashboards
    if (ACTIVE_KITCHEN_STATUSES.includes(order.kitchenStatus)) {
      this.gateway.emitNewOrder(adaptOrder(order));
      void this.kitchen.getStats().then((s) => this.gateway.emitStats(s));
    }

    return order;
  }

  async findAll(): Promise<Order[]> {
    return this.prisma.order.findMany({
      include: { orderItems: { include: { product: true } }, table: true },
    });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { orderItems: { include: { product: true } }, table: true },
    });
    if (!order) throw new NotFoundException(`Order with ID ${id} not found`);
    return order;
  }

  async update(id: number, dto: UpdateOrderDto): Promise<Order> {
    await this.findOne(id);
    const { items, tableId, ...orderData } = dto;

    let total: number | undefined;
    let products: Array<Awaited<ReturnType<PrismaService['product']['findMany']>>[number]> = [];

    if (items) {
      products = await this.prisma.product.findMany({
        where: { id: { in: items.map((i) => i.productId) } },
      });
      if (products.length !== items.length) {
        throw new NotFoundException('One or more products not found');
      }
      total = items.reduce((acc, item) => {
        const product = products.find((p) => p.id === item.productId)!;
        return acc + product.price.toNumber() * item.quantity;
      }, 0);
      await this.prisma.orderItem.deleteMany({ where: { orderId: id } });
    }

    return this.prisma.order.update({
      where: { id },
      data: {
        ...orderData,
        total,
        table: tableId ? { connect: { id: tableId } } : undefined,
        orderItems: items
          ? {
              create: items.map((item) => {
                const product = products.find((p) => p.id === item.productId)!;
                return {
                  quantity: item.quantity,
                  unitPrice: product.price,
                  aiNotes: item.aiNotes,
                  product: { connect: { id: item.productId } },
                };
              }),
            }
          : undefined,
      },
      include: { orderItems: { include: { product: true } }, table: true },
    });
  }

  async remove(id: number): Promise<Order> {
    await this.findOne(id);
    await this.prisma.orderItem.deleteMany({ where: { orderId: id } });
    return this.prisma.order.delete({ where: { id } });
  }
}
