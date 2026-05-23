import { http, HttpResponse } from "msw";
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from "./seed";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export const handlers = [
  http.get(`${BASE}/categories`, () => HttpResponse.json(MOCK_CATEGORIES)),
  http.get(`${BASE}/products`, () => HttpResponse.json(MOCK_PRODUCTS)),
  http.get(`${BASE}/products/:id`, ({ params }) => {
    const p = MOCK_PRODUCTS.find((x) => x.id === Number(params.id));
    return p
      ? HttpResponse.json(p)
      : HttpResponse.json({ message: "not found" }, { status: 404 });
  }),
  http.post(`${BASE}/orders`, async ({ request }) => {
    const body = (await request.json()) as { items?: unknown[] };
    if (!body?.items || !Array.isArray(body.items) || body.items.length === 0) {
      return HttpResponse.json({ message: "items required" }, { status: 400 });
    }
    return HttpResponse.json(
      { id: 9001, paymentCode: "ABC123", total: "30.00", kitchenStatus: "WAITING" },
      { status: 201 },
    );
  }),
];
