import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from '../orders.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { Order, Product, Table, OrderItem, PaymentStatus, KitchenStatus, TableStatus, Prisma } from '@prisma/client';
import { KitchenGateway } from '../../kitchen/kitchen.gateway';
import { KitchenService } from '../../kitchen/kitchen.service';

const mockPrismaService = {
  order: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  product: {
    findMany: jest.fn(),
  },
  orderItem: {
    deleteMany: jest.fn(),
  }
};

const mockTable: Table = {
    id: 1,
    tableName: 'Table 1',
    status: TableStatus.Available,
};

const mockProduct: any = {
    id: 1,
    name: 'Latte',
    price: new Prisma.Decimal(3.50),
    isAvailable: true,
    categoryId: 1,
    aiDescription: null,
    legacyId: null,
    imageUrl: null,
    productIngredients: [],
};

const mockOrderItem: OrderItem & { product: Product } = {
    id: 1,
    orderId: 1,
    productId: 1,
    quantity: 2,
    unitPrice: new Prisma.Decimal(3.50),
    aiNotes: null,
    product: mockProduct,
};

const mockOrder: any = {
    id: 1,
    tableId: 1,
    chatSessionId: null,
    paymentCode: '123456',
    total: new Prisma.Decimal(7.00),
    paymentStatus: PaymentStatus.PENDING,
    kitchenStatus: KitchenStatus.WAITING,
    createdAt: new Date(),
    table: mockTable,
    orderItems: [mockOrderItem],
};

describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: KitchenGateway,
          useValue: {
            emitStatusChanged: jest.fn(),
            emitStats: jest.fn(),
            emitNewOrder: jest.fn(),
          },
        },
        {
          provide: KitchenService,
          useValue: {
            getActiveOrders: jest.fn().mockResolvedValue([]),
            getStats: jest.fn().mockResolvedValue({
              inPrep: 0,
              alerts: 0,
              completedToday: 0,
              avgTimeMinutes: 0,
            }),
          },
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an order', async () => {
        mockPrismaService.product.findMany.mockResolvedValue([mockProduct]);
        mockPrismaService.order.create.mockResolvedValue(mockOrder);
        const result = await service.create({
            tableId: 1,
            items: [{ productId: 1, quantity: 2 }]
        });
        expect(result).toEqual(mockOrder);
    });

    it('should throw NotFoundException if a product is not found', async () => {
        mockPrismaService.product.findMany.mockResolvedValue([]);
        await expect(service.create({
            tableId: 1,
            items: [{ productId: 1, quantity: 2 }]
        })).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return an array of orders', async () => {
        mockPrismaService.order.findMany.mockResolvedValue([mockOrder]);
        const result = await service.findAll();
        expect(result).toEqual([mockOrder]);
    });
  });

  describe('findOne', () => {
    it('should return an order', async () => {
        mockPrismaService.order.findUnique.mockResolvedValue(mockOrder);
        const result = await service.findOne(1);
        expect(result).toEqual(mockOrder);
    });

    it('should throw a NotFoundException if order is not found', async () => {
        mockPrismaService.order.findUnique.mockResolvedValue(null);
        await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

    describe('update', () => {
        it('should update an order', async () => {
            mockPrismaService.order.findUnique.mockResolvedValue(mockOrder);
            mockPrismaService.product.findMany.mockResolvedValue([mockProduct]);
            mockPrismaService.order.update.mockResolvedValue(mockOrder);
            const result = await service.update(1, { kitchenStatus: KitchenStatus.PREPARING });
            expect(result).toEqual(mockOrder);
        });

        it('should throw a NotFoundException if order to update is not found', async () => {
            mockPrismaService.order.findUnique.mockResolvedValue(null);
            await expect(service.update(1, { kitchenStatus: KitchenStatus.PREPARING })).rejects.toThrow(NotFoundException);
        });
    });

    describe('remove', () => {
        it('should delete an order', async () => {
            mockPrismaService.order.findUnique.mockResolvedValue(mockOrder);
            mockPrismaService.orderItem.deleteMany.mockResolvedValue({ count: 1 });
            mockPrismaService.order.delete.mockResolvedValue(mockOrder);
            const result = await service.remove(1);
            expect(result).toEqual(mockOrder);
        });

        it('should throw a NotFoundException if order to delete is not found', async () => {
            mockPrismaService.order.findUnique.mockResolvedValue(null);
            await expect(service.remove(1)).rejects.toThrow(NotFoundException);
        });
    });
});
