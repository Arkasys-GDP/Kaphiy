import { describe, it, expect } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "@/test/mocks/server";
import {
  adaptProduct,
  createOrder,
  getCategories,
  getProduct,
  getProducts,
} from "./api";
import { MOCK_PRODUCTS } from "@/test/mocks/seed";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

describe("API client (integration with MSW)", () => {
  describe("getCategories", () => {
    it("fetches categories from backend", async () => {
      const cats = await getCategories();
      expect(cats).toHaveLength(2);
      expect(cats[0]).toMatchObject({ id: 1, name: "Cafés" });
    });

    it("throws when backend returns 500", async () => {
      server.use(
        http.get(`${BASE}/categories`, () =>
          HttpResponse.json({}, { status: 500 }),
        ),
      );
      await expect(getCategories()).rejects.toThrow(/API error 500/);
    });
  });

  describe("getProducts", () => {
    it("fetches products list", async () => {
      const products = await getProducts();
      expect(products).toHaveLength(3);
      expect(products[0]).toMatchObject({
        id: 101,
        name: "Latte de Avena",
        isAvailable: true,
      });
    });

    it("sends Cache-Control: no-store (cache: 'no-store')", async () => {
      let capturedCache: RequestCache | undefined;
      server.use(
        http.get(`${BASE}/products`, ({ request }) => {
          capturedCache = (request as any).cache;
          return HttpResponse.json(MOCK_PRODUCTS);
        }),
      );
      await getProducts();
      expect(capturedCache).toBe("no-store");
    });
  });

  describe("getProduct", () => {
    it("fetches a single product by id", async () => {
      const p = await getProduct(102);
      expect(p).toMatchObject({ id: 102, name: "Croissant" });
    });

    it("throws on 404", async () => {
      await expect(getProduct(9999)).rejects.toThrow(/API error 404/);
    });
  });

  describe("createOrder", () => {
    it("posts order and returns confirmation", async () => {
      const res = await createOrder({
        tableId: 3,
        items: [
          { productId: 101, quantity: 2 },
          { productId: 102, quantity: 1 },
        ],
      });
      expect(res).toMatchObject({
        id: 9001,
        paymentCode: "ABC123",
        total: "30.00",
      });
    });

    it("sends application/json content-type", async () => {
      let captured: string | null = null;
      server.use(
        http.post(`${BASE}/orders`, ({ request }) => {
          captured = request.headers.get("content-type");
          return HttpResponse.json({ id: 1 }, { status: 201 });
        }),
      );
      await createOrder({ tableId: 1, items: [{ productId: 1, quantity: 1 }] });
      expect(captured).toMatch(/application\/json/);
    });

    it("throws when backend rejects with 400", async () => {
      await expect(
        createOrder({ tableId: 1, items: [] }),
      ).rejects.toThrow(/API error 400/);
    });
  });

  describe("adaptProduct", () => {
    it("parses price (string) into number", () => {
      const out = adaptProduct(MOCK_PRODUCTS[0]);
      expect(out.price).toBe(14.5);
      expect(typeof out.price).toBe("number");
    });

    it("parses price (number) into number", () => {
      const out = adaptProduct(MOCK_PRODUCTS[1]);
      expect(out.price).toBe(9.9);
    });

    it("maps category name to coffee emoji for 'Cafés'", () => {
      const out = adaptProduct(MOCK_PRODUCTS[0]);
      expect(out.emoji).toBe("☕");
    });

    it("maps Pastelería to croissant emoji", () => {
      const out = adaptProduct(MOCK_PRODUCTS[1]);
      expect(out.emoji).toBe("🥐");
    });

    it("adds 'Oat Milk' green badge when ingredients contain avena", () => {
      const out = adaptProduct(MOCK_PRODUCTS[0]);
      expect(out.badges).toContain("Oat Milk");
      expect(out.badgeTypes).toContain("green");
    });

    it("adds 'No disponible' muted badge for unavailable product", () => {
      const out = adaptProduct(MOCK_PRODUCTS[2]);
      expect(out.badges).toContain("No disponible");
      expect(out.badgeTypes).toContain("muted");
    });

    it("uses ingredient names as description (· separated)", () => {
      const out = adaptProduct(MOCK_PRODUCTS[0]);
      expect(out.description).toBe("Avena · Café");
    });

    it("falls back to aiDescription when no ingredients", () => {
      const out = adaptProduct(MOCK_PRODUCTS[2]);
      expect(out.description).toBe("Doble shot");
    });

    it("limits tags to first 4 ingredients", () => {
      const many: typeof MOCK_PRODUCTS[number] = {
        ...MOCK_PRODUCTS[0],
        productIngredients: Array.from({ length: 6 }).map((_, i) => ({
          id: i,
          isOptional: false,
          ingredient: { id: i, name: `ing-${i}` },
        })),
      };
      const out = adaptProduct(many);
      expect(out.tags).toHaveLength(4);
    });
  });
});
