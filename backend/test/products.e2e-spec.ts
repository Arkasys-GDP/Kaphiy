import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { Prisma } from '@prisma/client';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { KitchenGateway } from '../src/modules/kitchen/kitchen.gateway';
import { KitchenService } from '../src/modules/kitchen/kitchen.service';

const baseProduct = {
  id: 1,
  name: 'Latte',
  legacyId: null,
  categoryId: 1,
  aiDescription: 'Latte clásico',
  price: new Prisma.Decimal('14.50'),
  isAvailable: true,
};

describe('Products (integration)', () => {
  let app: INestApplication<App>;
  let prismaMock: any;
  let token: string;

  beforeEach(async () => {
    prismaMock = {
      product: {
        findMany: jest.fn().mockResolvedValue([baseProduct]),
        findUnique: jest.fn().mockResolvedValue(baseProduct),
        create: jest.fn().mockResolvedValue({ ...baseProduct, id: 99 }),
        update: jest
          .fn()
          .mockResolvedValue({ ...baseProduct, name: 'Latte Vainilla' }),
        delete: jest.fn().mockResolvedValue(baseProduct),
      },
      productIngredient: {
        deleteMany: jest.fn().mockResolvedValue({ count: 0 }),
      },
      barista: {
        findUnique: jest.fn().mockResolvedValue({
          id: 1,
          name: 'Tester',
          pinHash: 'irrelevant',
          isActive: true,
          createdAt: new Date(),
        }),
        findMany: jest.fn(),
      },
      $connect: jest.fn(),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .overrideProvider(KitchenGateway)
      .useValue({
        emitNewOrder: jest.fn(),
        emitStatusChanged: jest.fn(),
        emitStats: jest.fn(),
        emitItemAdded: jest.fn(),
        emitSnapshot: jest.fn(),
      })
      .overrideProvider(KitchenService)
      .useValue({
        getActiveOrders: jest.fn().mockResolvedValue([]),
        getStats: jest.fn().mockResolvedValue({
          inPrep: 0,
          alerts: 0,
          completedToday: 0,
          avgTimeMinutes: 0,
        }),
      })
      .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();

    const jwt = app.get(JwtService);
    token = await jwt.signAsync({ sub: 1, name: 'Tester', role: 'barista' });
  });

  afterEach(async () => {
    await app.close();
  });

  describe('public reads', () => {
    it('GET /products returns 200 with array', async () => {
      const res = await request(app.getHttpServer())
        .get('/products')
        .expect(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body[0]).toMatchObject({ id: 1, name: 'Latte' });
    });

    it('GET /products/:id returns 200 with product', async () => {
      const res = await request(app.getHttpServer())
        .get('/products/1')
        .expect(200);
      expect(res.body).toMatchObject({ id: 1, name: 'Latte' });
    });

    it('GET /products/:id returns 404 when product not found', async () => {
      prismaMock.product.findUnique.mockResolvedValueOnce(null);
      await request(app.getHttpServer()).get('/products/999').expect(404);
    });

    it('GET /products/:id returns 400 when id is not numeric (ParseIntPipe)', async () => {
      await request(app.getHttpServer()).get('/products/abc').expect(400);
    });
  });

  describe('write endpoints require JWT', () => {
    it('POST /products without token returns 401', async () => {
      await request(app.getHttpServer())
        .post('/products')
        .send({ name: 'New', categoryId: 1, price: 10 })
        .expect(401);
    });

    it('POST /products with invalid token returns 401', async () => {
      await request(app.getHttpServer())
        .post('/products')
        .set('Authorization', 'Bearer not-a-real-token')
        .send({ name: 'New', categoryId: 1, price: 10 })
        .expect(401);
    });

    it('POST /products with valid token returns 201', async () => {
      const res = await request(app.getHttpServer())
        .post('/products')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'New', categoryId: 1, price: 10 })
        .expect(201);
      expect(res.body).toMatchObject({ id: 99, name: 'Latte' });
    });

    it('POST /products with invalid DTO returns 400', async () => {
      await request(app.getHttpServer())
        .post('/products')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: '', categoryId: 'oops', price: -5 })
        .expect(400);
    });

    it('PATCH /products/:id with valid token returns 200', async () => {
      const res = await request(app.getHttpServer())
        .patch('/products/1')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Latte Vainilla' })
        .expect(200);
      expect(res.body).toMatchObject({ name: 'Latte Vainilla' });
    });

    it('DELETE /products/:id without token returns 401', async () => {
      await request(app.getHttpServer()).delete('/products/1').expect(401);
    });

    it('DELETE /products/:id with valid token returns 200', async () => {
      await request(app.getHttpServer())
        .delete('/products/1')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      expect(prismaMock.product.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe('rejects baristas that are inactive (JWT strategy validate)', () => {
    it('returns 401 when barista has been deactivated since token issuance', async () => {
      prismaMock.barista.findUnique.mockResolvedValueOnce(null);
      await request(app.getHttpServer())
        .post('/products')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'New', categoryId: 1, price: 10 })
        .expect(401);
    });
  });
});
