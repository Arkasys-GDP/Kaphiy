import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from '../categories.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { Category } from '@prisma/client';

const mockPrismaService = {
  category: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

const mockCategory: Category = {
    id: 1,
    name: 'Test Category',
    isActive: true,
};

describe('CategoriesService', () => {
  let service: CategoriesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a category', async () => {
      mockPrismaService.category.create.mockResolvedValue(mockCategory);
      const result = await service.create({ name: 'Test Category' });
      expect(result).toEqual(mockCategory);
    });
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
        mockPrismaService.category.findMany.mockResolvedValue([mockCategory]);
        const result = await service.findAll();
        expect(result).toEqual([mockCategory]);
    });
  });

  describe('findOne', () => {
    it('should return a category', async () => {
        mockPrismaService.category.findUnique.mockResolvedValue(mockCategory);
        const result = await service.findOne(1);
        expect(result).toEqual(mockCategory);
    });

    it('should throw a NotFoundException if category is not found', async () => {
        mockPrismaService.category.findUnique.mockResolvedValue(null);
        await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
        mockPrismaService.category.findUnique.mockResolvedValue(mockCategory);
        mockPrismaService.category.update.mockResolvedValue(mockCategory);
        const result = await service.update(1, { name: 'Updated Category' });
        expect(result).toEqual(mockCategory);
    });

    it('should throw a NotFoundException if category to update is not found', async () => {
        mockPrismaService.category.findUnique.mockResolvedValue(null);
        await expect(service.update(1, { name: 'Updated Category' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete a category', async () => {
        mockPrismaService.category.findUnique.mockResolvedValue(mockCategory);
        mockPrismaService.category.delete.mockResolvedValue(mockCategory);
        const result = await service.remove(1);
        expect(result).toEqual(mockCategory);
    });

    it('should throw a NotFoundException if category to delete is not found', async () => {
        mockPrismaService.category.findUnique.mockResolvedValue(null);
        await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
