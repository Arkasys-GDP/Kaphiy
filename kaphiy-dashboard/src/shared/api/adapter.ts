/**
 * Adapters: DB schema (Prisma) → frontend types.
 * Keep frontend types decoupled from DB column names.
 * Update here when backend response shapes are finalized.
 */

import type { Order, OrderItem, OrderStats } from "@/src/features/orders/types";
import type { OrderStatus } from "@/src/features/orders/lib/statusMachine";

// ── DB shapes (mirroring Prisma schema) ──────────────────
export interface DbOrder {
  id: number;
  table_id: number | null;
  chat_session_id: string | null;
  payment_code: string | null;
  total: string | null;
  payment_status: string | null;
  kitchen_status: DbKitchenStatus | null;
  created_at: string | null;
  tables: { id: number; table_name: string; status: string | null } | null;
  order_items: DbOrderItem[];
}

export interface DbOrderItem {
  id: number;
  order_id: number | null;
  product_id: number | null;
  quantity: number;
  unit_price: string;
  ai_notes: string | null;
  products: {
    id: number;
    name: string;
    price: string;
    is_available: boolean | null;
    product_ingredients: Array<{
      is_optional: boolean | null;
      ingredients: { id: number; name: string; is_allergen: boolean | null };
    }>;
  } | null;
}

export type DbKitchenStatus =
  | "WAITING"
  | "IN_PREP"
  | "READY"
  | "DELIVERED"
  | "OUT_OF_STOCK";

// ── Mapping ───────────────────────────────────────────────
const KITCHEN_STATUS_MAP: Record<DbKitchenStatus, OrderStatus> = {
  WAITING: "PENDING",
  IN_PREP: "IN_PREP",
  READY: "READY",
  DELIVERED: "DELIVERED",
  OUT_OF_STOCK: "OUT_OF_STOCK",
};

export const FRONTEND_TO_DB_STATUS: Record<OrderStatus, DbKitchenStatus> = {
  PENDING: "WAITING",
  IN_PREP: "IN_PREP",
  READY: "READY",
  DELIVERED: "DELIVERED",
  OUT_OF_STOCK: "OUT_OF_STOCK",
};

function adaptOrderItem(item: DbOrderItem): OrderItem {
  const allergens =
    item.products?.product_ingredients
      .filter((pi) => pi.ingredients.is_allergen)
      .map((pi) => pi.ingredients.name) ?? [];

  const modifiers = item.ai_notes
    ? item.ai_notes
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  return {
    id: String(item.id),
    name: item.products?.name ?? "(producto eliminado)",
    quantity: item.quantity,
    modifiers,
    dietaryFlags: allergens,
    status: item.products?.is_available === false ? "ready" : "pending",
  };
}

export function adaptOrder(db: DbOrder): Order {
  const dbStatus = (db.kitchen_status ?? "WAITING") as DbKitchenStatus;
  return {
    id: String(db.id),
    orderNumber: db.payment_code ? `#PED-${db.payment_code}` : `#${db.id}`,
    tableId: String(db.table_id ?? 0),
    tableNumber: db.tables?.table_name ?? String(db.table_id ?? "?"),
    paxCount: 1, // schema has no pax count — default 1 until backend adds it
    status: KITCHEN_STATUS_MAP[dbStatus],
    items: db.order_items.map(adaptOrderItem),
    createdAt: db.created_at ?? new Date().toISOString(),
    updatedAt: db.created_at ?? new Date().toISOString(),
    notes: undefined,
  };
}

export function adaptOrders(orders: DbOrder[]): Order[] {
  return orders.map(adaptOrder);
}

export function adaptStats(raw: {
  in_prep: number;
  alerts: number;
  completed_today: number;
  avg_time_minutes: number;
}): OrderStats {
  return {
    inPrep: raw.in_prep,
    alerts: raw.alerts,
    completedToday: raw.completed_today,
    avgTimeMinutes: raw.avg_time_minutes,
  };
}
