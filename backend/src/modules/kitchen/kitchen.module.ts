import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { KitchenService } from './kitchen.service';
import { KitchenGateway } from './kitchen.gateway';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [KitchenService, KitchenGateway],
  exports: [KitchenService, KitchenGateway],
})
export class KitchenModule {}
