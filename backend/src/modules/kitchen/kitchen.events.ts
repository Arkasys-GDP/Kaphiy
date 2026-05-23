/**
 * Wire-format types for the kitchen WebSocket gateway.
 * Mirror these in the dashboard's `events.ts`.
 */

export type KitchenStatusWire =
  | 'PENDING'
  | 'IN_PREP'
  | 'READY'
  | 'DELIVERED'
  | 'OUT_OF_STOCK';

export type PaymentStatusWire = 'PENDING' | 'PAID' | 'CANCELLED';

export interface OrderItemWire {
  id: string;
  name: string;
  quantity: number;
  modifiers: string[];
  dietaryFlags: string[];
  status: 'pending' | 'ready';
}

export interface OrderWire {
  id: string;
  orderNumber: string;
  tableId: string;
  tableNumber: string;
  paxCount: number;
  status: KitchenStatusWire;
  paymentStatus: PaymentStatusWire;
  total: number; // in PEN/USD per business config
  items: OrderItemWire[];
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

export interface OrderStatsWire {
  inPrep: number;
  alerts: number;
  completedToday: number;
  avgTimeMinutes: number;
}

// Server → Client
export interface ServerToClientEvents {
  'orders:snapshot': (payload: { orders: OrderWire[]; stats: OrderStatsWire }) => void;
  'orders:new': (order: OrderWire) => void;
  'orders:item-added': (payload: { orderId: string; items: OrderItemWire[] }) => void;
  'orders:status-changed': (payload: { orderId: string; status: KitchenStatusWire }) => void;
  'orders:stats': (stats: OrderStatsWire) => void;
}

// Client → Server (with ack callback)
export interface AckResponse {
  ok: boolean;
  error?: string;
}

export interface ClientToServerEvents {
  'orders:resync': (
    payload: null,
    ack: (snapshot: { orders: OrderWire[]; stats: OrderStatsWire }) => void,
  ) => void;
  'order:start': (payload: { orderId: string }, ack: (res: AckResponse) => void) => void;
  'order:ready': (payload: { orderId: string }, ack: (res: AckResponse) => void) => void;
  'order:deliver': (payload: { orderId: string }, ack: (res: AckResponse) => void) => void;
  'order:out-of-stock': (
    payload: { orderId: string; itemId: string },
    ack: (res: AckResponse) => void,
  ) => void;
  'order:print': (payload: { orderId: string }, ack: (res: AckResponse) => void) => void;
}
