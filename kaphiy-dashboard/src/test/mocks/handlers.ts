import { http, HttpResponse } from "msw";
import { MOCK_ORDERS, MOCK_STATS, MOCK_HISTORY } from "./seed";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export const handlers = [
  // Auth
  http.post(`${BASE}/auth/login`, async ({ request }) => {
    const body = (await request.json()) as { pin?: string };
    if (!body.pin) {
      return HttpResponse.json({ message: "PIN requerido" }, { status: 400 });
    }
    return HttpResponse.json({
      access_token: `mock-jwt-${Date.now()}`,
      barista: { id: 1, name: "Barista de turno" },
    });
  }),

  // Active orders
  http.get(`${BASE}/orders/active`, ({ request }) => {
    const auth = request.headers.get("Authorization");
    if (!auth) return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    return HttpResponse.json({ orders: MOCK_ORDERS, stats: MOCK_STATS });
  }),

  // Order status update (PATCH)
  http.patch(`${BASE}/orders/:id/status`, async ({ params, request }) => {
    const body = (await request.json()) as { kitchen_status: string };
    return HttpResponse.json({ id: params["id"], kitchen_status: body.kitchen_status });
  }),

  // Mark item out of stock
  http.patch(`${BASE}/order-items/:id/out-of-stock`, ({ params }) => {
    return HttpResponse.json({ id: params["id"], is_available: false });
  }),

  // Order history
  http.get(`${BASE}/orders/history`, ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") ?? 1);
    const limit = Number(url.searchParams.get("limit") ?? 20);
    return HttpResponse.json({
      orders: MOCK_HISTORY,
      total: MOCK_HISTORY.length,
      page,
      limit,
    });
  }),
];
