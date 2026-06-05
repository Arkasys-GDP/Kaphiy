import { Injectable } from '@nestjs/common';
import { KitchenStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  ACTIVE_KITCHEN_STATUSES,
  ORDER_INCLUDE,
  adaptOrder,
} from './kitchen.adapter';
import { OrderStatsWire, OrderWire } from './kitchen.events';

@Injectable()
export class KitchenService {
  constructor(private readonly prisma: PrismaService) {}

  async getActiveOrders(): Promise<OrderWire[]> {
    const orders = await this.prisma.order.findMany({
      where: {
        kitchenStatus: { in: ACTIVE_KITCHEN_STATUSES },
        deletedAt: null,
      },
      include: ORDER_INCLUDE,
      orderBy: { createdAt: 'asc' },
    });
    return orders.map(adaptOrder);
  }

  async getStats(): Promise<OrderStatsWire> {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const [inPrep, completedToday, alerts, avgMinutes] = await Promise.all([
      this.prisma.order.count({
        where: { kitchenStatus: KitchenStatus.PREPARING, deletedAt: null },
      }),
      this.prisma.order.count({
        where: {
          kitchenStatus: KitchenStatus.DELIVERED,
          createdAt: { gte: startOfDay },
          deletedAt: null,
        },
      }),
      // alerts = orders >10min in active kitchen statuses
      this.prisma.order.count({
        where: {
          kitchenStatus: { in: ACTIVE_KITCHEN_STATUSES },
          createdAt: { lt: new Date(Date.now() - 10 * 60_000) },
          deletedAt: null,
        },
      }),
      this.computeAvgMinutes(startOfDay),
    ]);

    return {
      inPrep,
      alerts,
      completedToday,
      avgTimeMinutes: avgMinutes,
    };
  }

  private async computeAvgMinutes(startOfDay: Date): Promise<number> {
    // Avg minutes between order creation and DELIVERED stamp, for today.
    const rows = await this.prisma.$queryRaw<{ avg_minutes: number | null }[]>`
      SELECT
        EXTRACT(EPOCH FROM AVG(completed_at - created_at)) / 60 AS avg_minutes
      FROM orders
      WHERE kitchen_status = 'DELIVERED'
        AND completed_at IS NOT NULL
        AND created_at >= ${startOfDay}
        AND deleted_at IS NULL
    `;
    const avg = rows[0]?.avg_minutes;
    return avg ? Math.round(Number(avg) * 10) / 10 : 0;
  }

  async findActiveOrder(id: number) {
    return this.prisma.order.findUnique({
      where: { id },
      include: ORDER_INCLUDE,
    });
  }

  async getOrderById(id: number): Promise<OrderWire | null> {
    const o = await this.findActiveOrder(id);
    return o ? adaptOrder(o) : null;
  }
}
