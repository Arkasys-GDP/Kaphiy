import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

(async () => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const p = new PrismaClient({ adapter } as any);
  const rows = await p.$queryRawUnsafe(
    `SELECT table_name, column_name, data_type FROM information_schema.columns
     WHERE (table_name='orders' AND column_name IN ('created_at','deleted_at'))
        OR (table_name='baristas' AND column_name='created_at')
        OR (table_name='products' AND column_name='image_url')
     ORDER BY table_name, column_name`
  );
  console.log(rows);

  const now = await p.$queryRawUnsafe(`SELECT NOW() AS now_utc, NOW() AT TIME ZONE 'America/Guayaquil' AS now_gye`);
  console.log(now);
  await p.$disconnect();
  await pool.end();
})();
