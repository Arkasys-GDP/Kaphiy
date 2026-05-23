import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrderItemsController } from './order-items.controller';
import { OrdersService } from './orders.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { KitchenModule } from '../kitchen/kitchen.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, KitchenModule, AuthModule],
  controllers: [OrdersController, OrderItemsController],
  providers: [OrdersService],
})
export class OrdersModule {}
