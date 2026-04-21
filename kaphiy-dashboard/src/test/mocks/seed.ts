/**
 * Seed data aligned with Prisma schema.
 * Simulates backend responses (DbOrder shape).
 */

import type { DbOrder } from "@/src/shared/api/adapter";

const now = new Date();
const ago = (minutes: number) => new Date(now.getTime() - minutes * 60_000).toISOString();

export const MOCK_ORDERS: DbOrder[] = [
  {
    id: 41,
    table_id: 3,
    chat_session_id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    payment_code: "0041",
    total: "34.50",
    payment_status: "PENDING",
    kitchen_status: "IN_PREP",
    created_at: ago(13),
    tables: { id: 3, table_name: "3", status: "Occupied" },
    order_items: [
      {
        id: 101,
        order_id: 41,
        product_id: 5,
        quantity: 2,
        unit_price: "9.50",
        ai_notes: "Oat milk, sin azúcar",
        products: {
          id: 5,
          name: "Latte de Avellana",
          price: "9.50",
          is_available: true,
          product_ingredients: [
            {
              is_optional: false,
              ingredients: { id: 3, name: "Lactosa", is_allergen: true },
            },
          ],
        },
      },
      {
        id: 102,
        order_id: 41,
        product_id: 12,
        quantity: 1,
        unit_price: "6.50",
        ai_notes: "Tibio",
        products: {
          id: 12,
          name: "Croissant Praliné",
          price: "6.50",
          is_available: true,
          product_ingredients: [
            {
              is_optional: false,
              ingredients: { id: 1, name: "Gluten", is_allergen: true },
            },
          ],
        },
      },
    ],
  },
  {
    id: 42,
    table_id: 7,
    chat_session_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    payment_code: "0042",
    total: "52.00",
    payment_status: "PENDING",
    kitchen_status: "WAITING",
    created_at: ago(6),
    tables: { id: 7, table_name: "7", status: "Occupied" },
    order_items: [
      {
        id: 103,
        order_id: 42,
        product_id: 1,
        quantity: 2,
        unit_price: "8.00",
        ai_notes: "Extra caliente",
        products: {
          id: 1,
          name: "Espresso Doble",
          price: "8.00",
          is_available: true,
          product_ingredients: [],
        },
      },
      {
        id: 104,
        order_id: 42,
        product_id: 8,
        quantity: 1,
        unit_price: "10.00",
        ai_notes: null,
        products: {
          id: 8,
          name: "Matcha Latte",
          price: "10.00",
          is_available: true,
          product_ingredients: [
            {
              is_optional: false,
              ingredients: { id: 3, name: "Lactosa", is_allergen: true },
            },
          ],
        },
      },
      {
        id: 105,
        order_id: 42,
        product_id: 15,
        quantity: 2,
        unit_price: "7.00",
        ai_notes: null,
        products: {
          id: 15,
          name: "Cupcake Praliné",
          price: "7.00",
          is_available: true,
          product_ingredients: [
            {
              is_optional: false,
              ingredients: { id: 1, name: "Gluten", is_allergen: true },
            },
          ],
        },
      },
    ],
  },
  {
    id: 43,
    table_id: 2,
    chat_session_id: null,
    payment_code: "0043",
    total: "18.00",
    payment_status: "PENDING",
    kitchen_status: "WAITING",
    created_at: ago(2),
    tables: { id: 2, table_name: "2", status: "Occupied" },
    order_items: [
      {
        id: 106,
        order_id: 43,
        product_id: 2,
        quantity: 1,
        unit_price: "9.00",
        ai_notes: "Sin lácteos",
        products: {
          id: 2,
          name: "Cappuccino",
          price: "9.00",
          is_available: true,
          product_ingredients: [
            {
              is_optional: false,
              ingredients: { id: 3, name: "Lactosa", is_allergen: true },
            },
          ],
        },
      },
      {
        id: 107,
        order_id: 43,
        product_id: 20,
        quantity: 1,
        unit_price: "9.00",
        ai_notes: null,
        products: {
          id: 20,
          name: "Tostada Praliné",
          price: "9.00",
          is_available: true,
          product_ingredients: [
            {
              is_optional: false,
              ingredients: { id: 1, name: "Gluten", is_allergen: true },
            },
          ],
        },
      },
    ],
  },
];

export const MOCK_STATS = {
  in_prep: 1,
  alerts: 1,
  completed_today: 14,
  avg_time_minutes: 8.2,
};

export const MOCK_HISTORY: DbOrder[] = [
  {
    id: 38,
    table_id: 5,
    chat_session_id: null,
    payment_code: "0038",
    total: "28.00",
    payment_status: "PAID",
    kitchen_status: "DELIVERED",
    created_at: ago(45),
    tables: { id: 5, table_name: "5", status: "Available" },
    order_items: [
      {
        id: 95,
        order_id: 38,
        product_id: 1,
        quantity: 2,
        unit_price: "8.00",
        ai_notes: null,
        products: {
          id: 1,
          name: "Espresso Doble",
          price: "8.00",
          is_available: true,
          product_ingredients: [],
        },
      },
    ],
  },
];
