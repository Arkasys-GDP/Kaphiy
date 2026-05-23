import { Logger, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { KitchenStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { KitchenService } from './kitchen.service';
import { ACTIVE_KITCHEN_STATUSES, toWireStatus } from './kitchen.adapter';
import {
  AckResponse,
  ClientToServerEvents,
  KitchenStatusWire,
  OrderItemWire,
  OrderStatsWire,
  OrderWire,
  ServerToClientEvents,
} from './kitchen.events';

type KaphiySocket = Socket<ClientToServerEvents, ServerToClientEvents>;

@WebSocketGateway({
  cors: { origin: '*' },
})
export class KitchenGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(KitchenGateway.name);

  @WebSocketServer()
  server!: Server<ClientToServerEvents, ServerToClientEvents>;

  constructor(
    private readonly jwt: JwtService,
    private readonly kitchen: KitchenService,
    private readonly prisma: PrismaService,
  ) {}

  afterInit() {
    this.logger.log('KitchenGateway initialized');
  }

  async handleConnection(client: KaphiySocket) {
    // Verify JWT from handshake auth or query
    const token =
      (client.handshake.auth?.token as string | undefined) ??
      (client.handshake.query?.token as string | undefined);

    if (!token) {
      this.logger.warn(`socket ${client.id} rejected — no token`);
      client.disconnect(true);
      return;
    }

    try {
      await this.jwt.verifyAsync(token);
      this.logger.log(`socket ${client.id} connected (auth ok)`);
    } catch (err) {
      this.logger.warn(`socket ${client.id} rejected — invalid token`);
      client.disconnect(true);
    }
  }

  handleDisconnect(client: KaphiySocket) {
    this.logger.log(`socket ${client.id} disconnected`);
  }

  // ── Client → Server ──────────────────────────────────────

  @SubscribeMessage('orders:resync')
  async handleResync() {
    const [orders, stats] = await Promise.all([
      this.kitchen.getActiveOrders(),
      this.kitchen.getStats(),
    ]);
    return { orders, stats };
  }

  @SubscribeMessage('order:print')
  async handlePrint(
    @MessageBody() payload: { orderId: string },
  ): Promise<AckResponse> {
    this.logger.log(`print request for order ${payload.orderId}`);
    // TODO: bridge to ESC/POS service when available
    return { ok: true };
  }

  @SubscribeMessage('order:start')
  async handleStart(@MessageBody() payload: { orderId: string }): Promise<AckResponse> {
    return this.transitionStatus(payload.orderId, KitchenStatus.PREPARING);
  }

  @SubscribeMessage('order:ready')
  async handleReady(@MessageBody() payload: { orderId: string }): Promise<AckResponse> {
    return this.transitionStatus(payload.orderId, KitchenStatus.READY);
  }

  @SubscribeMessage('order:deliver')
  async handleDeliver(@MessageBody() payload: { orderId: string }): Promise<AckResponse> {
    return this.transitionStatus(payload.orderId, KitchenStatus.DELIVERED);
  }

  @SubscribeMessage('order:out-of-stock')
  async handleOutOfStock(
    @MessageBody() payload: { orderId: string; itemId: string },
  ): Promise<AckResponse> {
    try {
      const itemId = Number(payload.itemId);
      const item = await this.prisma.orderItem.findUnique({
        where: { id: itemId },
        include: { product: true, order: true },
      });
      if (!item || !item.product) throw new NotFoundException('OrderItem not found');

      await this.prisma.product.update({
        where: { id: item.product.id },
        data: { isAvailable: false },
      });

      let status = item.order.kitchenStatus;
      if (
        ACTIVE_KITCHEN_STATUSES.includes(status) &&
        status !== KitchenStatus.OUT_OF_STOCK
      ) {
        const updated = await this.prisma.order.update({
          where: { id: item.orderId },
          data: { kitchenStatus: KitchenStatus.OUT_OF_STOCK },
        });
        status = updated.kitchenStatus;
      }

      this.emitStatusChanged(String(item.orderId), toWireStatus(status));
      void this.kitchen.getStats().then((s) => this.emitStats(s));
      return { ok: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'unknown error';
      this.logger.error(`order:out-of-stock failed: ${message}`);
      return { ok: false, error: message };
    }
  }

  private async transitionStatus(
    orderIdRaw: string,
    next: KitchenStatus,
  ): Promise<AckResponse> {
    try {
      const id = Number(orderIdRaw);
      const order = await this.prisma.order.findUnique({ where: { id } });
      if (!order) throw new NotFoundException(`Order ${id} not found`);

      const updated = await this.prisma.order.update({
        where: { id },
        data: { kitchenStatus: next },
      });

      this.emitStatusChanged(String(updated.id), toWireStatus(updated.kitchenStatus));
      void this.kitchen.getStats().then((s) => this.emitStats(s));
      return { ok: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'unknown error';
      this.logger.error(`status transition failed: ${message}`);
      return { ok: false, error: message };
    }
  }

  // ── Emitters (called by services after DB mutations) ────

  emitNewOrder(order: OrderWire) {
    this.server.emit('orders:new', order);
  }

  emitStatusChanged(orderId: string, status: KitchenStatusWire) {
    this.server.emit('orders:status-changed', { orderId, status });
  }

  emitItemAdded(orderId: string, items: OrderItemWire[]) {
    this.server.emit('orders:item-added', { orderId, items });
  }

  emitStats(stats: OrderStatsWire) {
    this.server.emit('orders:stats', stats);
  }

  emitSnapshot(orders: OrderWire[], stats: OrderStatsWire) {
    this.server.emit('orders:snapshot', { orders, stats });
  }
}
