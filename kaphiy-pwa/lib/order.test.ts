import { describe, expect, it } from "vitest";
import { buildOrderItems, getInvalidOrderItems, normalizeCartItems } from "./order";
import { adaptProduct } from "./api";
import { MOCK_PRODUCTS } from "@/test/mocks/seed";

const products = MOCK_PRODUCTS.map(adaptProduct);

describe("order helpers", () => {
  it("resolves product and price from productId", () => {
    const [item] = normalizeCartItems([{ productId: 101, quantity: 2 }], products);

    expect(item).toMatchObject({
      productId: 101,
      name: "Latte de Avena",
      price: 14.5,
      qty: 2,
    });
  });

  it("accepts product_id from DB-shaped payloads", () => {
    const [item] = normalizeCartItems([{ product_id: 102, quantity: 1 }], products);

    expect(item).toMatchObject({
      productId: 102,
      name: "Croissant",
      price: 9.9,
    });
  });

  it("marks generic Producto without id or price as invalid", () => {
    const items = normalizeCartItems([{ name: "Producto", price: 0 }], products);

    expect(getInvalidOrderItems(items)).toHaveLength(1);
  });

  it("builds order payload only with valid product ids", () => {
    const items = normalizeCartItems(
      [{ productId: 101, quantity: 2 }, { name: "Producto", price: 0 }],
      products,
    );

    const { orderItems, invalidItems } = buildOrderItems(items, { "101": 3 }, ["sin azucar"]);

    expect(invalidItems).toHaveLength(1);
    expect(orderItems).toEqual([{ productId: 101, quantity: 3, aiNotes: "sin azucar" }]);
  });
});
