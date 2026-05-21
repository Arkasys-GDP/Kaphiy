/**
 * Mock data in wire format (matches backend response shape).
 * Used by MSW handlers and component tests.
 */

import type { Order, OrderStats } from "@/src/features/orders/types";
import type { Category } from "@/src/features/categories/types";
import type { Ingredient } from "@/src/features/ingredients/types";
import type { Product } from "@/src/features/products/types";
import type { Metrics } from "@/src/features/metrics/types";

const now = new Date();
const ago = (minutes: number) => new Date(now.getTime() - minutes * 60_000).toISOString();

export const MOCK_ORDERS: Order[] = [
  {
    id: "41",
    orderNumber: "#PED-0041",
    tableId: "3",
    tableNumber: "3",
    paxCount: 1,
    status: "IN_PREP",
    items: [
      {
        id: "101",
        name: "Latte de Avellana",
        quantity: 2,
        modifiers: ["Oat milk", "sin azúcar"],
        dietaryFlags: ["Lactosa"],
        status: "pending",
      },
      {
        id: "102",
        name: "Croissant Praliné",
        quantity: 1,
        modifiers: ["Tibio"],
        dietaryFlags: ["Gluten"],
        status: "pending",
      },
    ],
    paymentStatus: "PAID",
    total: 34.5,
    createdAt: ago(13),
    updatedAt: ago(13),
  },
  {
    id: "42",
    orderNumber: "#PED-0042",
    tableId: "7",
    tableNumber: "7",
    paxCount: 1,
    status: "PENDING",
    items: [
      {
        id: "103",
        name: "Espresso Doble",
        quantity: 2,
        modifiers: ["Extra caliente"],
        dietaryFlags: [],
        status: "pending",
      },
      {
        id: "104",
        name: "Matcha Latte",
        quantity: 1,
        modifiers: [],
        dietaryFlags: ["Lactosa"],
        status: "pending",
      },
    ],
    paymentStatus: "PENDING",
    total: 26,
    createdAt: ago(6),
    updatedAt: ago(6),
  },
  {
    id: "43",
    orderNumber: "#PED-0043",
    tableId: "2",
    tableNumber: "2",
    paxCount: 1,
    status: "PENDING",
    items: [
      {
        id: "106",
        name: "Cappuccino",
        quantity: 1,
        modifiers: ["Sin lácteos"],
        dietaryFlags: ["Lactosa"],
        status: "pending",
      },
    ],
    paymentStatus: "PENDING",
    total: 9,
    createdAt: ago(2),
    updatedAt: ago(2),
  },
];

export const MOCK_STATS: OrderStats = {
  inPrep: 1,
  alerts: 1,
  completedToday: 14,
  avgTimeMinutes: 8.2,
};

export const MOCK_HISTORY: Order[] = [
  {
    id: "38",
    orderNumber: "#PED-0038",
    tableId: "5",
    tableNumber: "5",
    paxCount: 1,
    status: "DELIVERED",
    items: [
      {
        id: "95",
        name: "Espresso Doble",
        quantity: 2,
        modifiers: [],
        dietaryFlags: [],
        status: "pending",
      },
    ],
    paymentStatus: "PAID",
    total: 16,
    createdAt: ago(45),
    updatedAt: ago(45),
  },
];

// ── Categories / Ingredients / Products / Metrics ────────────

export const MOCK_CATEGORIES: Category[] = [
  { id: 1, name: "Café", isActive: true },
  { id: 2, name: "Bebidas Frías", isActive: true },
  { id: 3, name: "Postres", isActive: true },
];

export const MOCK_INGREDIENTS: Ingredient[] = [
  { id: 1, name: "Leche entera", isAllergen: true },
  { id: 2, name: "Azúcar Blanca", isAllergen: false },
  { id: 3, name: "Lactosa", isAllergen: true },
  { id: 4, name: "Gluten", isAllergen: true },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Café Latte Clásico",
    categoryId: 1,
    price: "2.50",
    aiDescription: "Latte suave con notas de caramelo.",
    isAvailable: true,
    productIngredients: [
      { ingredientId: 1, isOptional: true, ingredient: { id: 1, name: "Leche entera", isAllergen: true } },
    ],
  },
  {
    id: 2,
    name: "Frappuccino",
    categoryId: 2,
    price: "4.00",
    isAvailable: true,
    productIngredients: [],
  },
];

export const MOCK_METRICS: Metrics = {
  range: "daily",
  totals: {
    orders: 24,
    revenue: 285.5,
    avgPrepMinutes: 0,
    completed: 22,
    cancelled: 0,
  },
  timeSeries: [
    { bucket: ago(60 * 23), orders: 2, revenue: 18.5 },
    { bucket: ago(60 * 12), orders: 8, revenue: 95.0 },
    { bucket: ago(60 * 4), orders: 14, revenue: 172.0 },
  ],
  topProducts: [
    { productId: 1, name: "Latte de Avellana", quantity: 14, revenue: 84.0 },
    { productId: 2, name: "Espresso Doble", quantity: 9, revenue: 54.0 },
    { productId: 3, name: "Cappuccino", quantity: 5, revenue: 30.0 },
  ],
  statusBreakdown: [
    { status: "DELIVERED", count: 22 },
    { status: "PREPARING", count: 1 },
    { status: "WAITING", count: 1 },
  ],
};
