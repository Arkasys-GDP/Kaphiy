import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsNumber, IsInt, Min, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ProductIngredientDto {
  @IsInt()
  ingredientId: number;

  @IsOptional()
  @IsBoolean()
  isOptional?: boolean;
}

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsInt()
  legacyId?: number;

  @IsInt()
  categoryId: number;

  @IsOptional()
  @IsString()
  aiDescription?: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductIngredientDto)
  ingredients?: ProductIngredientDto[];
}
