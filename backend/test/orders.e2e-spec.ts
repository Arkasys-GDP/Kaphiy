import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { KitchenStatus, PaymentStatus, Prisma } from '@prisma/client';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { KitchenGateway } from '../src/modules/kitchen/kitchen.gateway';
import { KitchenService } from '../src/modules/kitchen/kitchen.service';

const productLatte = {
  id: 1,
  name: 'Latte',
  legacyId: null,
  categoryId: 1,
  aiDescription: null,
  price: new Prisma.Decimal('14.50'),
  isAvailable: true,
  productIngredients: [],
};
const productCroissant = {
  id: 2,
  name: 'Croissant',
  legacyId: null,
  categoryId: 2,
  aiDescription: null,
  price: new Prisma.Decimal('9.90'),
  isAvailable: true,
  productIngredients: [],
};

const mkOrder = (overrides: Partial<any> = {}) => ({
  id: 41,
  tableId: 3,
  chatSessionId: null,
  paymentCode: null,
  total: new Prisma.Decimal('38.90'),
  paymentStatus: PaymentStatus.PENDING,
  kitchenStatus: KitchenStatus.WAITING,
  createdAt: new Date('2026-04-21T12:00:00Z'),
  deletedAt: null,
  table: { id: 3, tableName: 'Mesa 3', status: 'Available' },
  orderItems: [
    {
      id: 100,
      orderId: 41,
      productId: 1,
      quantity: 2,
      unitPrice: new Prisma.Decimal('14.50'),
      aiNotes: null,
      product: productLatte,
    },
  ],
  ...overrides,
});

describe('Orders (integration)', () => {
  let app: INestApplication<App>;
  let prismaMock: any;
  let kitchenServiceMock: any;
  let kitchenGatewayMock: any;
  let token: string;

  beforeEach(async () => {
    prismaMock = {
      product: {
        findMany: jest.fn().mockResolvedValue([productLatte, productCroissant]),
        findUnique: jest.fn().mockResolvedValue(productLatte),
      },
      order: {
        findUnique: jest.fn().mockResolvedValue(mkOrder()),
        findMany: jest.fn().mockResolvedValue([mkOrder()]),
        create: jest.fn().mockImplementation(({ data }) =>
          Promise.resolve(mkOrder({ tableId: data.table?.connect?.id ?? data.tableId, total: new Prisma.Decimal(String(data.total)) })),
        ),
        update: jest.fn().mockImplementation(({ data }) =>
          Promise.resolve(mkOrder({ kitchenStatus: data.kitchenStatus ?? KitchenStatus.PREPARING })),
        ),
        delete: jest.fn().mockResolvedValue(mkOrder()),
        count: jest.fn().mockResolvedValue(0),
      },
      orderItem: {
        deleteMany: jest.fn().mockResolvedValue({ count: 0 }),
      },
      barista: {
        findUnique: jest.fn().mockResolvedValue({
          id: 1, name: 'Tester', pinHash: 'x', isActive: true, createdAt: new Date(),
        }),
        findMany: jest.fn(),
      },
      $connect: jest.fn(),
    };

    kitchenServiceMock = {
      getActiveOrders: jest.fn().mockResolvedValue([
        { id: '41', orderNumber: '#PED-0041', tableNumber: '3', status: 'PENDING', items: [] },
      ]),
      getStats: jest.fn().mockResolvedValue({
        inPrep: 1, alerts: 0, completedToday: 5, avgTimeMinutes: 7.2,
      }),
    };

    kitchenGatewayMock = {
      emitNewOrder: jest.fn(),
      emitStatusChanged: jest.fn(),
      emitStats: jest.fn(),
      emitItemAdded: jest.fn(),
      emitSnapshot: jest.fn(),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService).useValue(prismaMock)
      .overrideProvider(KitchenGateway).useValue(kitchenGatewayMock)
      .overrideProvider(KitchenService).useValue(kitchenServiceMock)
      .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
    );
    await app.init();

    const jwt = app.get(JwtService);
    token = await jwt.signAsync({ sub: 1, name: 'Tester', role: 'barista' });
  });

  afterEach(async () => {
    await app.close();
  });

  describe('POST /orders (public)', () => {
    it('creates an order with valid items and returns 201', async () => {
      const res = await request(app.getHttpServer())
        .post('/orders')
        .send({
          tableId: 3,
          items: [
            { productId: 1, quantity: 2 },
            { productId: 2, quantity: 1 },
          ],
        })
        .expect(201);

      expect(res.body).toMatchObject({ id: 41, tableId: 3 });
      // Service computes total = 14.50 * 2 + 9.90 * 1 = 38.90
      expect(prismaMock.order.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ total: 38.9 }),
        }),
      );
    });

    it('broadcasts new order via WebSocket gateway', async () => {
      prismaMock.product.findMany.mockResolvedValueOnce([productLatte]);
      await request(app.getHttpServer())
        .post('/orders')
        .send({ tableId: 3, items: [{ productId: 1, quantity: 1 }] })
        .expect(201);

      expect(kitchenGatewayMock.emitNewOrder).toHaveBeenCalled();
    });

    it('returns 404 when one of the products does not exist', async () => {
      prismaMock.product.findMany.mockResolvedValueOnce([productLatte]); // only 1 of 2
      await request(app.getHttpServer())
        .post('/orders')
        .send({
          tableId: 3,
          items: [
            { productId: 1, quantity: 1 },
            { productId: 999, quantity: 1 },
          ],
        })
        .expect(404);
    });

    it('returns 400 when items array is missing', async () => {
      await request(app.getHttpServer())
        .post('/orders')
        .send({ tableId: 3 })
        .expect(400);
    });

    it('returns 400 when item quantity is not an integer', async () => {
      await request(app.getHttpServer())
        .post('/orders')
        .send({ tableId: 3, items: [{ productId: 1, quantity: 'two' }] })
        .expect(400);
    });

    it('returns 400 when chatSessionId is not a UUID', async () => {
      await request(app.getHttpServer())
        .post('/orders')
        .send({
          tableId: 3,
          chatSessionId: 'not-a-uuid',
          items: [{ productId: 1, quantity: 1 }],
        })
        .expect(400);
    });
  });

  describe('GET /orders (public)', () => {
    it('returns 200 with an array of orders', async () => {
      const res = await request(app.getHttpServer()).get('/orders').expect(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body[0]).toMatchObject({ id: 41, tableId: 3 });
    });

    it('GET /orders/:id returns 200', async () => {
      const res = await request(app.getHttpServer()).get('/orders/41').expect(200);
      expect(res.body).toMatchObject({ id: 41 });
    });

    it('GET /orders/:id returns 404 when missing', async () => {
      prismaMock.order.findUnique.mockResolvedValueOnce(null);
      await request(app.getHttpServer()).get('/orders/9999').expect(404);
    });
  });

  describe('protected dashboard endpoints', () => {
    it('GET /orders/active without token returns 401', async () => {
      await request(app.getHttpServer()).get('/orders/active').expect(401);
    });

    it('GET /orders/active with token returns 200 + orders + stats', async () => {
      const res = await request(app.getHttpServer())
        .get('/orders/active')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(res.body).toEqual(
        expect.objectContaining({
          orders: expect.any(Array),
          stats: expect.objectContaining({
            inPrep: expect.any(Number),
            completedToday: expect.any(Number),
          }),
        }),
      );
    });

    it('PATCH /orders/:id/status without token returns 401', async () => {
      await request(app.getHttpServer())
        .patch('/orders/41/status')
        .send({ kitchenStatus: 'PREPARING' })
        .expect(401);
    });

    it('PATCH /orders/:id/status with invalid enum returns 400', async () => {
      await request(app.getHttpServer())
        .patch('/orders/41/status')
        .set('Authorization', `Bearer ${token}`)
        .send({ kitchenStatus: 'INVALID' })
        .expect(400);
    });

    it('PATCH /orders/:id/status with token updates and broadcasts', async () => {
      const res = await request(app.getHttpServer())
        .patch('/orders/41/status')
        .set('Authorization', `Bearer ${token}`)
        .send({ kitchenStatus: 'PREPARING' })
        .expect(200);

      expect(res.body).toEqual(expect.any(Object));
      expect(kitchenGatewayMock.emitStatusChanged).toHaveBeenCalled();
    });

    it('PATCH /orders/:id/status returns 404 when order missing', async () => {
      prismaMock.order.findUnique.mockResolvedValueOnce(null);
      await request(app.getHttpServer())
        .patch('/orders/9999/status')
        .set('Authorization', `Bearer ${token}`)
        .send({ kitchenStatus: 'PREPARING' })
        .expect(404);
    });

    it('GET /orders/history with token returns 200 with pagination shape', async () => {
      prismaMock.order.findMany.mockResolvedValueOnce([mkOrder({ kitchenStatus: KitchenStatus.DELIVERED })]);
      prismaMock.order.count.mockResolvedValueOnce(1);

      const res = await request(app.getHttpServer())
        .get('/orders/history?page=1&limit=10')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(res.body).toEqual(
        expect.objectContaining({
          orders: expect.any(Array),
          total: expect.any(Number),
          page: 1,
          limit: 10,
        }),
      );
    });
  });
});
