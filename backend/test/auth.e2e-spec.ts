import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as request from 'supertest';
import { App } from 'supertest/types';
import * as bcrypt from 'bcrypt';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { KitchenGateway } from '../src/modules/kitchen/kitchen.gateway';
import { KitchenService } from '../src/modules/kitchen/kitchen.service';

describe('Auth (integration)', () => {
  let app: INestApplication<App>;
  let prismaMock: any;
  let validPinHash: string;

  beforeAll(async () => {
    validPinHash = await bcrypt.hash('1234', 10);
  });

  beforeEach(async () => {
    prismaMock = {
      barista: {
        findMany: jest.fn().mockResolvedValue([
          { id: 1, name: 'Sebas', pinHash: validPinHash, isActive: true, createdAt: new Date() },
        ]),
        findUnique: jest.fn().mockResolvedValue({
          id: 1,
          name: 'Sebas',
          pinHash: validPinHash,
          isActive: true,
          createdAt: new Date(),
        }),
      },
      order: { findMany: jest.fn(), count: jest.fn() },
      $connect: jest.fn(),
      $disconnect: jest.fn(),
      onModuleInit: jest.fn(),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService).useValue(prismaMock)
      .overrideProvider(KitchenGateway).useValue({
        emitNewOrder: jest.fn(),
        emitStatusChanged: jest.fn(),
        emitStats: jest.fn(),
        emitItemAdded: jest.fn(),
        emitSnapshot: jest.fn(),
      })
      .overrideProvider(KitchenService).useValue({
        getActiveOrders: jest.fn().mockResolvedValue([]),
        getStats: jest.fn().mockResolvedValue({ inPrep: 0, alerts: 0, completedToday: 0, avgTimeMinutes: 0 }),
      })
      .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
    );
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('POST /auth/login', () => {
    it('returns 200 + JWT + barista when PIN is correct', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ pin: '1234' })
        .expect(200);

      expect(res.body).toEqual(
        expect.objectContaining({
          access_token: expect.any(String),
          barista: { id: 1, name: 'Sebas' },
        }),
      );
      expect(res.body.access_token.split('.')).toHaveLength(3);
    });

    it('returns 401 when PIN is incorrect', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ pin: '9999' })
        .expect(401);
    });

    it('returns 400 when PIN is too short (DTO validation)', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ pin: '12' })
        .expect(400);
    });

    it('returns 400 when PIN is too long', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ pin: '123456789' })
        .expect(400);
    });

    it('returns 400 when PIN is missing', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({})
        .expect(400);
    });

    it('rejects requests with extra unknown fields (whitelist)', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ pin: '1234', admin: true })
        .expect(400);
    });

    it('returns 401 when no active baristas exist', async () => {
      prismaMock.barista.findMany.mockResolvedValueOnce([]);
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ pin: '1234' })
        .expect(401);
    });

    it('signed token contains barista id and role', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ pin: '1234' })
        .expect(200);

      const jwt = app.get(JwtService);
      const decoded = await jwt.verifyAsync(res.body.access_token);
      expect(decoded).toEqual(
        expect.objectContaining({ sub: 1, name: 'Sebas', role: 'barista' }),
      );
    });
  });
});
