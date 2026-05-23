import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { Ingredient } from './entities/ingredient.entity';

@Injectable()
export class IngredientsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createIngredientDto: CreateIngredientDto): Promise<Ingredient> {
    return this.prisma.ingredient.create({
      data: createIngredientDto,
    });
  }

  async findAll(): Promise<Ingredient[]> {
    return this.prisma.ingredient.findMany();
  }

  async findOne(id: number): Promise<Ingredient> {
    const ingredient = await this.prisma.ingredient.findUnique({
      where: { id },
    });

    if (!ingredient) {
      throw new NotFoundException(`Ingredient with ID ${id} not found`);
    }

    return ingredient;
  }

  async update(id: number, updateIngredientDto: UpdateIngredientDto): Promise<Ingredient> {
    await this.findOne(id);
    return this.prisma.ingredient.update({
      where: { id },
      data: updateIngredientDto,
    });
  }

  async remove(id: number): Promise<Ingredient> {
    await this.findOne(id);
    return this.prisma.ingredient.delete({
      where: { id },
    });
  }
}

