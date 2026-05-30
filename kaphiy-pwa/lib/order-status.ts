/** Backend enum values + their display labels. Single source of truth. */

export type KitchenStatus =
  | "WAITING"
  | "PREPARING"
  | "READY"
  | "DELIVERED"
  | "OUT_OF_STOCK";

export type PaymentStatus = "PENDING" | "PAID" | "CANCELLED";

export interface StatusLabel {
  label: string;
  emoji: string;
  color: string;
  bg: string;
}

export const KITCHEN_LABELS: Record<KitchenStatus, StatusLabel> = {
  WAITING: { label: "En cola · Recibido", emoji: "⏳", color: "#92714a", bg: "#f5ece3" },
  PREPARING: { label: "En preparación", emoji: "👨‍🍳", color: "#b45309", bg: "#fef3c7" },
  READY: { label: "Listo para retirar", emoji: "☕", color: "#15803d", bg: "#dcfce7" },
  DELIVERED: { label: "Entregado", emoji: "✅", color: "#166534", bg: "#bbf7d0" },
  OUT_OF_STOCK: { label: "Sin stock", emoji: "❌", color: "#991b1b", bg: "#fee2e2" },
};

export const PAYMENT_LABELS: Record<PaymentStatus, StatusLabel> = {
  PENDING: { label: "No pagado", emoji: "🔴", color: "#b91c1c", bg: "#fee2e2" },
  PAID: { label: "Pagado", emoji: "🟢", color: "#15803d", bg: "#dcfce7" },
  CANCELLED: { label: "Cancelado", emoji: "⚫", color: "#6b7280", bg: "#f3f4f6" },
};

export function getKitchenLabel(status: string | null | undefined): StatusLabel {
  return KITCHEN_LABELS[(status as KitchenStatus) ?? "WAITING"] ?? KITCHEN_LABELS.WAITING;
}

export function getPaymentLabel(status: string | null | undefined): StatusLabel {
  return PAYMENT_LABELS[(status as PaymentStatus) ?? "PENDING"] ?? PAYMENT_LABELS.PENDING;
}

/** True when terminal: order is done — clear session state. */
export function isOrderTerminal(kitchen: string | null | undefined, payment: string | null | undefined): boolean {
  return kitchen === "DELIVERED" || payment === "CANCELLED";
}
