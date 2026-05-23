import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { TableStatus } from '@prisma/client';

export class CreateTableDto {
  @IsString()
  @IsNotEmpty()
  tableName: string;

  @IsOptional()
  @IsEnum(TableStatus)
  status?: TableStatus;
}
