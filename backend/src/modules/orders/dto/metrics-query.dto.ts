import { IsEnum, IsOptional } from 'class-validator';

export type MetricsRange = 'daily' | 'weekly' | 'monthly';

export class MetricsQueryDto {
  @IsOptional()
  @IsEnum(['daily', 'weekly', 'monthly'])
  range: MetricsRange = 'daily';
}
