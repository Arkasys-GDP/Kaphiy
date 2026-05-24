import { describe, it, expect } from "vitest";
import { adaptOrder, adaptOrders, adaptStats, type DbOrder } from "./adapter";

const BASE_ORDER: DbOrder = {
  id: 41,
  table_id: 3,
  chat_session_id: null,
  payment_code: "0041",
  total: "34.50",
  payment_status: "PENDING",
  kitchen_status: "WAITING",
  created_at: "2024-01-15T10:00:00.000Z",
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
  ],
};

describe("adaptOrder", () => {
  it("maps id and orderNumber from payment_code", () => {
    const order = adaptOrder(BASE_ORDER);
    expect(order.id).toBe("41");
    expect(order.orderNumber).toBe("#PED-0041");
  });

  it("maps WAITING kitchen_status → PENDING frontend status", () => {
    const order = adaptOrder(BASE_ORDER);
    expect(order.status).toBe("PENDING");
  });

  it("maps IN_PREP → IN_PREP unchanged", () => {
    const order = adaptOrder({ ...BASE_ORDER, kitchen_status: "IN_PREP" });
    expect(order.status).toBe("IN_PREP");
  });

  it("maps DELIVERED → DELIVERED unchanged", () => {
    const order = adaptOrder({ ...BASE_ORDER, kitchen_status: "DELIVERED" });
    expect(order.status).toBe("DELIVERED");
  });

  it("maps tableNumber from tables.table_name", () => {
    const order = adaptOrder(BASE_ORDER);
    expect(order.tableNumber).toBe("3");
  });

  it("falls back to table_id when tables is null", () => {
    const order = adaptOrder({ ...BASE_ORDER, tables: null });
    expect(order.tableNumber).toBe("3");
  });

  it("splits ai_notes into modifiers array", () => {
    const order = adaptOrder(BASE_ORDER);
    expect(order.items[0]?.modifiers).toEqual(["Oat milk", "sin azúcar"]);
  });

  it("empty modifiers when ai_notes is null", () => {
    const order = adaptOrder({
      ...BASE_ORDER,
      order_items: [{ ...BASE_ORDER.order_items[0]!, ai_notes: null }],
    });
    expect(order.items[0]?.modifiers).toEqual([]);
  });

  it("extracts allergen ingredients into dietaryFlags", () => {
    const order = adaptOrder(BASE_ORDER);
    expect(order.items[0]?.dietaryFlags).toContain("Lactosa");
  });

  it("non-allergen ingredients excluded from dietaryFlags", () => {
    const order = adaptOrder({
      ...BASE_ORDER,
      order_items: [
        {
          ...BASE_ORDER.order_items[0]!,
          products: {
            ...BASE_ORDER.order_items[0]!.products!,
            product_ingredients: [
              {
                is_optional: false,
                ingredients: { id: 99, name: "Agua", is_allergen: false },
              },
            ],
          },
        },
      ],
    });
    expect(order.items[0]?.dietaryFlags).toEqual([]);
  });

  it("item status is 'pending' when product is available", () => {
    const order = adaptOrder(BASE_ORDER);
    expect(order.items[0]?.status).toBe("pending");
  });

  it("item status is 'ready' when product is_available is false", () => {
    const order = adaptOrder({
      ...BASE_ORDER,
      order_items: [
        {
          ...BASE_ORDER.order_items[0]!,
          products: { ...BASE_ORDER.order_items[0]!.products!, is_available: false },
        },
      ],
    });
    expect(order.items[0]?.status).toBe("ready");
  });

  it("uses null kitchen_status as WAITING fallback", () => {
    const order = adaptOrder({ ...BASE_ORDER, kitchen_status: null });
    expect(order.status).toBe("PENDING");
  });
});

describe("adaptOrders", () => {
  it("maps array of DB orders", () => {
    const result = adaptOrders([BASE_ORDER, { ...BASE_ORDER, id: 42 }]);
    expect(result).toHaveLength(2);
    expect(result[1]?.id).toBe("42");
  });
});

describe("adaptStats", () => {
  it("maps snake_case to camelCase", () => {
    const stats = adaptStats({
      in_prep: 3,
      alerts: 1,
      completed_today: 10,
      avg_time_minutes: 7.5,
    });
    expect(stats).toEqual({
      inPrep: 3,
      alerts: 1,
      completedToday: 10,
      avgTimeMinutes: 7.5,
    });
  });
});
