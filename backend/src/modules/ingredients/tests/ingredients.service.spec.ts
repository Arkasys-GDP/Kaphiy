import { Test, TestingModule } from '@nestjs/testing';
import { IngredientsService } from '../ingredients.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { Ingredient } from '@prisma/client';

const mockPrismaService = {
  ingredient: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

const mockIngredient: Ingredient = {
    id: 1,
    name: 'Sugar',
    isAllergen: false,
};

describe('IngredientsService', () => {
  let service: IngredientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IngredientsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<IngredientsService>(IngredientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an ingredient', async () => {
        mockPrismaService.ingredient.create.mockResolvedValue(mockIngredient);
        const result = await service.create({ name: 'Sugar' });
        expect(result).toEqual(mockIngredient);
    });
  });

  describe('findAll', () => {
    it('should return an array of ingredients', async () => {
        mockPrismaService.ingredient.findMany.mockResolvedValue([mockIngredient]);
        const result = await service.findAll();
        expect(result).toEqual([mockIngredient]);
    });
  });

  describe('findOne', () => {
    it('should return an ingredient', async () => {
        mockPrismaService.ingredient.findUnique.mockResolvedValue(mockIngredient);
        const result = await service.findOne(1);
        expect(result).toEqual(mockIngredient);
    });

    it('should throw a NotFoundException if ingredient is not found', async () => {
        mockPrismaService.ingredient.findUnique.mockResolvedValue(null);
        await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

    describe('update', () => {
        it('should update an ingredient', async () => {
            mockPrismaService.ingredient.findUnique.mockResolvedValue(mockIngredient);
            mockPrismaService.ingredient.update.mockResolvedValue(mockIngredient);
            const result = await service.update(1, { name: 'Updated Ingredient' });
            expect(result).toEqual(mockIngredient);
        });

        it('should throw a NotFoundException if ingredient to update is not found', async () => {
            mockPrismaService.ingredient.findUnique.mockResolvedValue(null);
            await expect(service.update(1, { name: 'Updated Ingredient' })).rejects.toThrow(NotFoundException);
        });
    });

    describe('remove', () => {
        it('should delete an ingredient', async () => {
            mockPrismaService.ingredient.findUnique.mockResolvedValue(mockIngredient);
            mockPrismaService.ingredient.delete.mockResolvedValue(mockIngredient);
            const result = await service.remove(1);
            expect(result).toEqual(mockIngredient);
        });

        it('should throw a NotFoundException if ingredient to delete is not found', async () => {
            mockPrismaService.ingredient.findUnique.mockResolvedValue(null);
            await expect(service.remove(1)).rejects.toThrow(NotFoundException);
        });
    });
});
