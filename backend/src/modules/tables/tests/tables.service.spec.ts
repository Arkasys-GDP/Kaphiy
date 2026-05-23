import { Test, TestingModule } from '@nestjs/testing';
import { TablesService } from '../tables.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { Table, TableStatus } from '@prisma/client';

const mockPrismaService = {
  table: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

const mockTable: Table = {
    id: 1,
    tableName: 'Table 1',
    status: TableStatus.Available,
};

describe('TablesService', () => {
  let service: TablesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TablesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<TablesService>(TablesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a table', async () => {
        mockPrismaService.table.create.mockResolvedValue(mockTable);
        const result = await service.create({ tableName: 'Table 1' });
        expect(result).toEqual(mockTable);
    });
  });

  describe('findAll', () => {
    it('should return an array of tables', async () => {
        mockPrismaService.table.findMany.mockResolvedValue([mockTable]);
        const result = await service.findAll();
        expect(result).toEqual([mockTable]);
    });
  });

  describe('findOne', () => {
    it('should return a table', async () => {
        mockPrismaService.table.findUnique.mockResolvedValue(mockTable);
        const result = await service.findOne(1);
        expect(result).toEqual(mockTable);
    });

    it('should throw a NotFoundException if table is not found', async () => {
        mockPrismaService.table.findUnique.mockResolvedValue(null);
        await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

    describe('update', () => {
        it('should update a table', async () => {
            mockPrismaService.table.findUnique.mockResolvedValue(mockTable);
            mockPrismaService.table.update.mockResolvedValue(mockTable);
            const result = await service.update(1, { tableName: 'Updated Table' });
            expect(result).toEqual(mockTable);
        });

        it('should throw a NotFoundException if table to update is not found', async () => {
            mockPrismaService.table.findUnique.mockResolvedValue(null);
            await expect(service.update(1, { tableName: 'Updated Table' })).rejects.toThrow(NotFoundException);
        });
    });

    describe('remove', () => {
        it('should delete a table', async () => {
            mockPrismaService.table.findUnique.mockResolvedValue(mockTable);
            mockPrismaService.table.delete.mockResolvedValue(mockTable);
            const result = await service.remove(1);
            expect(result).toEqual(mockTable);
        });

        it('should throw a NotFoundException if table to delete is not found', async () => {
            mockPrismaService.table.findUnique.mockResolvedValue(null);
            await expect(service.remove(1)).rejects.toThrow(NotFoundException);
        });
    });
});
