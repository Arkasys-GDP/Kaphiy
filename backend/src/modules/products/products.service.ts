import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { ingredients, categoryId, ...productData } = createProductDto;

    const data: any = {
      ...productData,
      category: {
        connect: { id: categoryId },
      },
    };

    if (ingredients) {
      data.productIngredients = {
        create: ingredients.map((ingredient) => ({
          ingredient: {
            connect: { id: ingredient.ingredientId },
          },
          isOptional: ingredient.isOptional,
        })),
      };
    }

    return this.prisma.product.create({
      data,
      include: {
        productIngredients: {
          include: {
            ingredient: true,
          },
        },
        category: true,
      },
    });
  }

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany({
      include: {
        productIngredients: {
          include: {
            ingredient: true,
          },
        },
        category: true,
      },
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        productIngredients: {
          include: {
            ingredient: true,
          },
        },
        category: true,
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    await this.findOne(id);
    const { ingredients, categoryId, ...productData } = updateProductDto;

    const data: any = {
      ...productData,
      category: categoryId ? { connect: { id: categoryId } } : undefined,
    };

    if (ingredients) {
      data.productIngredients = {
        deleteMany: {}, // Clear existing ingredients
        create: ingredients.map((ingredient) => ({
          ingredient: { connect: { id: ingredient.ingredientId } },
          isOptional: ingredient.isOptional,
        })),
      };
    }

    return this.prisma.product.update({
      where: { id },
      data,
      include: {
        productIngredients: {
          include: {
            ingredient: true,
          },
        },
        category: true,
      },
    });
  }

  async remove(id: number): Promise<Product> {
    await this.findOne(id);
    
    // Need to delete relations first from the join table
    await this.prisma.productIngredient.deleteMany({
        where: { productId: id },
    });
    
    return this.prisma.product.delete({
      where: { id },
    });
  }
}

