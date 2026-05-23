/**
 * DB → wire-format adapter.
 * Frontend & backend share the same wire format, decoupled from Prisma column names.
 */

import { KitchenStatus, PaymentStatus, Prisma } from '@prisma/client';
import {
  KitchenStatusWire,
  OrderItemWire,
  OrderStatsWire,
  OrderWire,
} from './kitchen.events';

export const ACTIVE_KITCHEN_STATUSES: KitchenStatus[] = [
  KitchenStatus.WAITING,
  KitchenStatus.PREPARING,
  KitchenStatus.READY,
  KitchenStatus.OUT_OF_STOCK,
];

const KITCHEN_STATUS_MAP: Record<KitchenStatus, KitchenStatusWire> = {
  WAITING: 'PENDING',
  PREPARING: 'IN_PREP',
  READY: 'READY',
  DELIVERED: 'DELIVERED',
  OUT_OF_STOCK: 'OUT_OF_STOCK',
};

const REVERSE_STATUS_MAP: Record<KitchenStatusWire, KitchenStatus> = {
  PENDING: KitchenStatus.WAITING,
  IN_PREP: KitchenStatus.PREPARING,
  READY: KitchenStatus.READY,
  DELIVERED: KitchenStatus.DELIVERED,
  OUT_OF_STOCK: KitchenStatus.OUT_OF_STOCK,
};

export function toWireStatus(s: KitchenStatus): KitchenStatusWire {
  return KITCHEN_STATUS_MAP[s];
}

export function fromWireStatus(s: KitchenStatusWire): KitchenStatus {
  return REVERSE_STATUS_MAP[s];
}

// Order shape from Prisma include
type OrderWithRelations = Prisma.OrderGetPayload<{
  include: {
    table: true;
    orderItems: {
      include: {
        product: {
          include: {
            productIngredients: { include: { ingredient: true } };
          };
        };
      };
    };
  };
}>;

type OrderItemWithProduct = OrderWithRelations['orderItems'][number];

export function adaptOrderItem(item: OrderItemWithProduct): OrderItemWire {
  const allergens =
    item.product?.productIngredients
      .filter((pi) => pi.ingredient.isAllergen)
      .map((pi) => pi.ingredient.name) ?? [];

  const modifiers = item.aiNotes
    ? item.aiNotes
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  return {
    id: String(item.id),
    name: item.product?.name ?? '(producto eliminado)',
    quantity: item.quantity,
    modifiers,
    dietaryFlags: allergens,
    // status='ready' indicates the item is unavailable / out-of-stock
    status: item.product?.isAvailable === false ? 'ready' : 'pending',
  };
}

export function adaptOrder(order: OrderWithRelations): OrderWire {
  return {
    id: String(order.id),
    orderNumber: order.paymentCode ? `#PED-${order.paymentCode}` : `#${order.id}`,
    tableId: String(order.tableId),
    tableNumber: order.table?.tableName ?? String(order.tableId),
    paxCount: 1, // schema lacks pax count — default 1
    status: toWireStatus(order.kitchenStatus),
    paymentStatus: order.paymentStatus,
    total: order.total ? Number(order.total) : 0,
    items: order.orderItems.map(adaptOrderItem),
    createdAt: order.createdAt.toISOString(),
    updatedAt: order.createdAt.toISOString(),
    notes: undefined,
  };
}

export function adaptStats(raw: {
  inPrep: number;
  alerts: number;
  completedToday: number;
  avgTimeMinutes: number;
}): OrderStatsWire {
  return raw;
}

export const ORDER_INCLUDE = {
  table: true,
  orderItems: {
    include: {
      product: {
        include: {
          productIngredients: { include: { ingredient: true } },
        },
      },
    },
  },
} as const satisfies Prisma.OrderInclude;

export { PaymentStatus };
