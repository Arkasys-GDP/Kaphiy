import type { StateCreator } from "zustand";
import type { Order, OrderStats } from "../types";
import type { OrderStatus } from "../lib/statusMachine";
import type { KaphiyStore } from "./index";

export interface OrdersSlice {
  orders: Order[];
  stats: OrderStats;
  setOrders: (orders: Order[]) => void;
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  appendItems: (orderId: string, items: Order["items"]) => void;
  removeOrder: (orderId: string) => void;
  setStats: (stats: OrderStats) => void;
}

export const createOrdersSlice: StateCreator<KaphiyStore, [], [], OrdersSlice> = (set) => ({
  orders: [],
  stats: { inPrep: 0, alerts: 0, completedToday: 0, avgTimeMinutes: 0 },

  setOrders: (orders) => set({ orders }),

  addOrder: (order) =>
    set((state) => {
      const exists = state.orders.some((o) => o.id === order.id);
      if (exists) {
        return {
          orders: state.orders.map((o) => (o.id === order.id ? order : o)),
        };
      }
      return { orders: [order, ...state.orders] };
    }),

  updateOrderStatus: (orderId, status) =>
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === orderId ? { ...o, status, updatedAt: new Date().toISOString() } : o,
      ),
    })),

  appendItems: (orderId, newItems) =>
    set((state) => ({
      orders: state.orders.map((o) => {
        if (o.id !== orderId) return o;
        const merged = [...o.items];
        for (const item of newItems) {
          merged.push({ ...item, isNew: true });
        }
        return { ...o, items: merged, updatedAt: new Date().toISOString() };
      }),
    })),

  removeOrder: (orderId) =>
    set((state) => ({
      orders: state.orders.filter((o) => o.id !== orderId),
    })),

  setStats: (stats) => set({ stats }),
});
