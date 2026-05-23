-- Fix: convert naive TIMESTAMP columns to TIMESTAMPTZ.
-- Existing values are interpreted as America/Guayaquil (UTC-5) since the
-- backend runs in that timezone and CURRENT_TIMESTAMP previously stored
-- wall-clock without offset.
--
-- Run once via:  npx prisma db execute --file prisma/manual-migrations/002_fix_timestamps_tz.sql

BEGIN;

ALTER TABLE orders
  ALTER COLUMN created_at TYPE TIMESTAMPTZ(6)
    USING created_at AT TIME ZONE 'America/Guayaquil';

ALTER TABLE orders
  ALTER COLUMN deleted_at TYPE TIMESTAMPTZ(6)
    USING deleted_at AT TIME ZONE 'America/Guayaquil';

ALTER TABLE baristas
  ALTER COLUMN created_at TYPE TIMESTAMPTZ(6)
    USING created_at AT TIME ZONE 'America/Guayaquil';

COMMIT;
