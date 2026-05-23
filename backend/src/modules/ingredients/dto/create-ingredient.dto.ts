import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateIngredientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsBoolean()
  isAllergen?: boolean;
}
