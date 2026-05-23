import { Controller, NotFoundException, Param, ParseIntPipe, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { KitchenStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { KitchenGateway } from '../kitchen/kitchen.gateway';
import { KitchenService } from '../kitchen/kitchen.service';
import {
  ACTIVE_KITCHEN_STATUSES,
  toWireStatus,
} from '../kitchen/kitchen.adapter';

@ApiTags('order-items')
@Controller('order-items')
export class OrderItemsController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly gateway: KitchenGateway,
    private readonly kitchen: KitchenService,
  ) {}

  @Patch(':id/out-of-stock')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Mark an order_item product as unavailable + flip parent order to OUT_OF_STOCK',
  })
  async markOutOfStock(@Param('id', ParseIntPipe) id: number) {
    const item = await this.prisma.orderItem.findUnique({
      where: { id },
      include: { product: true, order: true },
    });
    if (!item) throw new NotFoundException(`OrderItem ${id} not found`);
    if (!item.product) throw new NotFoundException('Product missing on order_item');

    // Mark product unavailable globally (cascades to client-facing PWA)
    await this.prisma.product.update({
      where: { id: item.product.id },
      data: { isAvailable: false },
    });

    // Flip parent order to OUT_OF_STOCK if it's still in active state
    let parentStatus = item.order.kitchenStatus;
    if (ACTIVE_KITCHEN_STATUSES.includes(parentStatus) && parentStatus !== KitchenStatus.OUT_OF_STOCK) {
      const updated = await this.prisma.order.update({
        where: { id: item.orderId },
        data: { kitchenStatus: KitchenStatus.OUT_OF_STOCK },
      });
      parentStatus = updated.kitchenStatus;
    }

    // Broadcast: parent status change + stats refresh
    this.gateway.emitStatusChanged(String(item.orderId), toWireStatus(parentStatus));
    void this.kitchen.getStats().then((s) => this.gateway.emitStats(s));

    return {
      id: item.id,
      productId: item.product.id,
      isAvailable: false,
      orderId: item.orderId,
      orderStatus: toWireStatus(parentStatus),
    };
  }
}
