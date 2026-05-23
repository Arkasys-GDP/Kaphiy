import { TableStatus } from '@prisma/client';

export class Table {
  id: number;
  tableName: string;
  status: TableStatus;
}
