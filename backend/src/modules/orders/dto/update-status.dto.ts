import { IsEnum } from 'class-validator';
import { KitchenStatus } from '@prisma/client';

export class UpdateStatusDto {
  @IsEnum(KitchenStatus)
  kitchenStatus: KitchenStatus;
}
