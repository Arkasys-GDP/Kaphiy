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
    // No completedAt column — approximate using a service-level proxy:
    // for delivered orders today, we don't have exit timestamp, so return 0 for now.
    // TODO: add `completed_at` column and fill it on transition to DELIVERED.
    const _ = startOfDay;
    void _;
    return 0;
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
