import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter } as any);

async function main() {
  const PIN = process.env.SEED_BARISTA_PIN ?? '8786';
  const NAME = process.env.SEED_BARISTA_NAME ?? 'Barista de turno';

  const existing = await prisma.barista.findFirst({
    where: { name: NAME },
  });

  if (existing) {
    console.log(`Barista "${NAME}" already exists (id=${existing.id}). Skipping.`);
    return;
  }

  const pinHash = await bcrypt.hash(PIN, 10);
  const barista = await prisma.barista.create({
    data: { name: NAME, pinHash, isActive: true },
  });

  console.log(`✓ Barista created: id=${barista.id}, name="${barista.name}", PIN=${PIN}`);
  console.log('  (change PIN via SEED_BARISTA_PIN env var or UI later)');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
