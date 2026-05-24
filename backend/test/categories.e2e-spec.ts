import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { KitchenGateway } from '../src/modules/kitchen/kitchen.gateway';
import { KitchenService } from '../src/modules/kitchen/kitchen.service';

const cat = (id: number, name: string) => ({ id, name, isActive: true });

describe('Categories (integration)', () => {
  let app: INestApplication<App>;
  let prismaMock: any;
  let token: string;

  beforeEach(async () => {
    prismaMock = {
      category: {
        findMany: jest
          .fn()
          .mockResolvedValue([cat(1, 'Cafés'), cat(2, 'Panadería')]),
        findUnique: jest.fn().mockResolvedValue(cat(1, 'Cafés')),
        create: jest.fn().mockResolvedValue(cat(3, 'Bebidas')),
        update: jest.fn().mockResolvedValue(cat(1, 'Cafés Especiales')),
        delete: jest.fn().mockResolvedValue(cat(1, 'Cafés')),
      },
      barista: {
        findUnique: jest.fn().mockResolvedValue({
          id: 1,
          name: 'Tester',
          pinHash: 'x',
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

  it('GET /categories returns 200 with list', async () => {
    const res = await request(app.getHttpServer())
      .get('/categories')
      .expect(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0]).toMatchObject({ id: 1, name: 'Cafés' });
  });

  it('GET /categories/:id returns 200 with the category', async () => {
    const res = await request(app.getHttpServer())
      .get('/categories/1')
      .expect(200);
    expect(res.body).toMatchObject({ id: 1, name: 'Cafés' });
  });

  it('GET /categories/:id returns 404 when missing', async () => {
    prismaMock.category.findUnique.mockResolvedValueOnce(null);
    await request(app.getHttpServer()).get('/categories/99').expect(404);
  });

  it('POST /categories without token returns 401', async () => {
    await request(app.getHttpServer())
      .post('/categories')
      .send({ name: 'Bebidas' })
      .expect(401);
  });

  it('POST /categories with token returns 201', async () => {
    const res = await request(app.getHttpServer())
      .post('/categories')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Bebidas' })
      .expect(201);
    expect(res.body).toMatchObject({ id: 3, name: 'Bebidas' });
  });

  it('PATCH /categories/:id with token returns 200', async () => {
    const res = await request(app.getHttpServer())
      .patch('/categories/1')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Cafés Especiales' })
      .expect(200);
    expect(res.body).toMatchObject({ id: 1, name: 'Cafés Especiales' });
  });

  it('DELETE /categories/:id without token returns 401', async () => {
    await request(app.getHttpServer()).delete('/categories/1').expect(401);
  });

  it('DELETE /categories/:id with token returns 200', async () => {
    await request(app.getHttpServer())
      .delete('/categories/1')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(prismaMock.category.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
