import { PaymentStatus, KitchenStatus } from "@prisma/client";
import { Product } from "src/modules/products/entities/product.entity";
import { Table } from "src/modules/tables/entities/table.entity";

export class OrderItem {
    id: number;
    order: Order;
    product: Product;
    quantity: number;
    unitPrice: number;
    aiNotes: string | null;
}

export class Order {
  id: number;
  table: Table | null;
  chatSessionId: string | null;
  paymentCode: string | null;
  total: number | null;
  paymentStatus: PaymentStatus;
  kitchenStatus: KitchenStatus;
  createdAt: Date;
  items: OrderItem[];
}
