import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from '../products.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { Product, Category, Ingredient, ProductIngredient, Prisma } from '@prisma/client';

const mockPrismaService = {
  product: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  productIngredient: {
    deleteMany: jest.fn(),
  }
};

const mockCategory: Category = {
    id: 1,
    name: 'Coffee',
    isActive: true,
};

const mockIngredient: Ingredient = {
    id: 1,
    name: 'Milk',
    isAllergen: false,
};

const mockProduct: Product & { category: Category, ingredients: (ProductIngredient & { ingredient: Ingredient })[] } = {
    id: 1,
    name: 'Latte',
    price: new Prisma.Decimal(3.50),
    isAvailable: true,
    categoryId: 1,
    aiDescription: 'A coffee drink made with espresso and steamed milk.',
    legacyId: 123,
    category: mockCategory,
    ingredients: [{
        productId: 1,
        ingredientId: 1,
        isOptional: false,
        ingredient: mockIngredient
    }]
};

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a product', async () => {
        mockPrismaService.product.create.mockResolvedValue(mockProduct);
        const result = await service.create({
            name: 'Latte',
            price: 3.50,
            categoryId: 1,
            ingredients: [{ ingredientId: 1, isOptional: false }]
        });
        expect(result).toEqual(mockProduct);
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
        mockPrismaService.product.findMany.mockResolvedValue([mockProduct]);
        const result = await service.findAll();
        expect(result).toEqual([mockProduct]);
    });
  });

  describe('findOne', () => {
    it('should return a product', async () => {
        mockPrismaService.product.findUnique.mockResolvedValue(mockProduct);
        const result = await service.findOne(1);
        expect(result).toEqual(mockProduct);
    });

    it('should throw a NotFoundException if product is not found', async () => {
        mockPrismaService.product.findUnique.mockResolvedValue(null);
        await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

    describe('update', () => {
        it('should update a product', async () => {
            mockPrismaService.product.findUnique.mockResolvedValue(mockProduct);
            mockPrismaService.product.update.mockResolvedValue(mockProduct);
            const result = await service.update(1, { name: 'Updated Product' });
            expect(result).toEqual(mockProduct);
        });

        it('should throw a NotFoundException if product to update is not found', async () => {
            mockPrismaService.product.findUnique.mockResolvedValue(null);
            await expect(service.update(1, { name: 'Updated Product' })).rejects.toThrow(NotFoundException);
        });
    });

    describe('remove', () => {
        it('should delete a product', async () => {
            mockPrismaService.product.findUnique.mockResolvedValue(mockProduct);
            mockPrismaService.productIngredient.deleteMany.mockResolvedValue({ count: 1 });
            mockPrismaService.product.delete.mockResolvedValue(mockProduct);
            const result = await service.remove(1);
            expect(result).toEqual(mockProduct);
        });

        it('should throw a NotFoundException if product to delete is not found', async () => {
            mockPrismaService.product.findUnique.mockResolvedValue(null);
            await expect(service.remove(1)).rejects.toThrow(NotFoundException);
        });
    });
});
