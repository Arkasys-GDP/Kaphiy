import { IsInt, IsNotEmpty, IsOptional, IsUUID, IsString, IsArray, ValidateNested, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { PaymentStatus, KitchenStatus } from '@prisma/client';

class OrderItemDto {
  @IsInt()
  productId: number;

  @IsInt()
  quantity: number;

  @IsOptional()
  @IsString()
  aiNotes?: string;
}

export class CreateOrderDto {
  @IsOptional()
  @IsInt()
  tableId?: number;

  @IsOptional()
  @IsUUID()
  chatSessionId?: string;

  @IsOptional()
  @IsString()
  paymentCode?: string;
  
  @IsOptional()
  @IsEnum(PaymentStatus)
  paymentStatus?: PaymentStatus;
  
  @IsOptional()
  @IsEnum(KitchenStatus)
  kitchenStatus?: KitchenStatus;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
