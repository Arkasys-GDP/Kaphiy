# Kaphiy Core API Reference

REST + WebSocket service built on NestJS 11 + Prisma 7 (PostgreSQL/Neon).
This document describes the **actual** routes implemented in `backend/src`.

## Base URL
- Local dev: `http://localhost:3001`
- No global prefix (controllers mount at root, not `/api`).
- Swagger UI: `http://localhost:3001/api`
- WebSocket: same origin, default Socket.IO path (`/socket.io/`).

## Content-Type
All requests are `application/json`. POST/PATCH require `Content-Type: application/json`.

## Authentication
JWT via `Authorization: Bearer <token>`. Token is issued by `POST /auth/login` and is required for **dashboard endpoints** (`/orders/active`, `/orders/history`, `PATCH /orders/:id/status`, `PATCH /order-items/:id/out-of-stock`) and for the WebSocket handshake.

Public endpoints (no auth): the rest of the CRUD (`/products`, `/categories`, `/tables`, `/ingredients`, `POST /orders`, etc.) — these are consumed by the AI/n8n agent and the customer PWA.

---

## 1. Auth

### `POST /auth/login`
Body:
```json
{ "pin": "1234" }
```
Response **200**:
```json
{
  "access_token": "<JWT>",
  "barista": { "id": 1, "name": "Barista de turno" }
}
```
Errors: `400` (PIN missing/format), `401` (incorrect PIN).

JWT payload: `{ sub: number, name: string, role: 'barista', iat, exp }`.
Default expiry: 12h. Override via `JWT_EXPIRES_IN` env. Secret: `JWT_SECRET` env (fallback `kaphiy-dev-secret` for dev only).

---

## 2. Orders — Dashboard endpoints

All require `Authorization: Bearer <token>`.

### `GET /orders/active`
Returns active orders (kitchen statuses `WAITING`, `PREPARING`, `READY`, `OUT_OF_STOCK`) plus aggregate stats. Wire format (already adapted; frontend consumes directly):

```json
{
  "orders": [
    {
      "id": "41",
      "orderNumber": "#PED-0041",
      "tableId": "3",
      "tableNumber": "Mesa 3",
      "paxCount": 1,
      "status": "PENDING" | "IN_PREP" | "READY" | "DELIVERED" | "OUT_OF_STOCK",
      "items": [
        {
          "id": "101",
          "name": "Latte de Avellana",
          "quantity": 2,
          "modifiers": ["Oat milk", "sin azúcar"],
          "dietaryFlags": ["Lactosa"],
          "status": "pending" | "ready"
        }
      ],
      "paymentStatus": "PENDING" | "PAID" | "CANCELLED",
      "total": 26.0,
      "createdAt": "2026-04-26T10:00:00.000Z",
      "updatedAt": "2026-04-26T10:00:00.000Z"
    }
  ],
  "stats": {
    "inPrep": 1,
    "alerts": 0,
    "completedToday": 14,
    "avgTimeMinutes": 0
  }
}
```

> **Status mapping** (backend `KitchenStatus` enum → wire `status`):
> `WAITING` → `PENDING`, `PREPARING` → `IN_PREP`, `READY` → `READY`, `DELIVERED` → `DELIVERED`, `OUT_OF_STOCK` → `OUT_OF_STOCK`.

> **Payment ownership**: `paymentStatus` and `total` are **read-only** in the kitchen dashboard. Payment is processed by the customer-facing PWA / cashier flow; the kitchen dashboard only displays the badge for context. Mutations to `paymentStatus` happen via the order `PATCH /orders/:id` endpoint, not from this dashboard.

> **Timestamps**: all `createdAt`/`updatedAt` are ISO-8601 UTC (`Z`-suffixed). The DB column type is `TIMESTAMPTZ(6)` — no client-side timezone math required.

### `GET /orders/history?page=1&limit=20`
Returns DELIVERED orders **today** (since 00:00 local), paginated.
```json
{
  "orders": [...],
  "total": 14,
  "page": 1,
  "limit": 20
}
```

### `PATCH /orders/:id/status`
Body:
```json
{ "kitchenStatus": "PREPARING" }
```
Accepts any `KitchenStatus` enum value. Emits `orders:status-changed` over WebSocket.
Response: full updated order in wire format.

### `PATCH /order-items/:id/out-of-stock`
Marks the item's product as `is_available = false` (cascades to PWA via product re-fetch) and flips parent order to `OUT_OF_STOCK` if still active. Emits `orders:status-changed` + `orders:stats`.
Response:
```json
{
  "id": 101,
  "productId": 5,
  "isAvailable": false,
  "orderId": 41,
  "orderStatus": "OUT_OF_STOCK"
}
```

### `GET /orders/metrics?range=daily|weekly|monthly`
Aggregated KPIs + time series + top products. Default range: `daily`.

- **daily** — last 24 hours, hour-bucketed
- **weekly** — last 7 days, day-bucketed
- **monthly** — last 30 days, day-bucketed

Response:
```json
{
  "range": "daily",
  "totals": {
    "orders": 24,
    "revenue": 285.50,
    "avgPrepMinutes": 0,
    "completed": 22,
    "cancelled": 0
  },
  "timeSeries": [
    { "bucket": "2026-05-03T08:00:00.000Z", "orders": 2, "revenue": 18.50 }
  ],
  "topProducts": [
    { "productId": 1, "name": "Latte de Avellana", "quantity": 14, "revenue": 84.0 }
  ],
  "statusBreakdown": [
    { "status": "DELIVERED", "count": 22 },
    { "status": "PREPARING", "count": 1 }
  ]
}
```

> `avgPrepMinutes` returns 0 until the schema gets a `completed_at` column (deferred).

---

## 3. Orders — Public CRUD (n8n / PWA agent)

### `GET /orders`
List all orders (no auth). Includes `orderItems`, `product`, `table`.

### `GET /orders/:id`
Single order with relations.

### `POST /orders`
Create order. Body:
```json
{
  "tableId": 1,
  "chatSessionId": "uuid-v4",
  "paymentCode": "732XDA",
  "paymentStatus": "PENDING",
  "kitchenStatus": "WAITING",
  "items": [
    { "productId": 5, "quantity": 2, "aiNotes": "sin azúcar" }
  ]
}
```
- `tableId` is required (NOT NULL on schema).
- `chatSessionId`, `paymentCode`, `aiNotes` are optional.
- `paymentStatus` ∈ `PENDING | PAID | CANCELLED` (DB stores `UNPAID` for `PENDING`).
- `kitchenStatus` ∈ `WAITING | PREPARING | READY | DELIVERED | OUT_OF_STOCK`.

If the resulting order is in an active kitchen status, **emits `orders:new` + `orders:stats`** over WebSocket.

### `PATCH /orders/:id`
Partial update (any root field + items override). Does **not** emit WS events — use `PATCH /orders/:id/status` for status-only changes.

### `DELETE /orders/:id`
Cascades delete on `orderItems`.

---

## 4. Products / Categories / Ingredients / Tables

Standard REST CRUD. **Reads are public** (consumed by n8n agent + customer PWA for menu).
**Writes (POST / PATCH / DELETE) require JWT** (admin barista) on `/products`, `/categories`, `/ingredients`. `/tables` writes remain open for now.

| Resource | List (public) | One (public) | Create | Update | Delete |
|---|---|---|---|---|---|
| Products | `GET /products` | `GET /products/:id` | 🔒 `POST /products` | 🔒 `PATCH /products/:id` | 🔒 `DELETE /products/:id` |
| Categories | `GET /categories` | `GET /categories/:id` | 🔒 `POST /categories` | 🔒 `PATCH /categories/:id` | 🔒 `DELETE /categories/:id` |
| Ingredients | `GET /ingredients` | `GET /ingredients/:id` | 🔒 `POST /ingredients` | 🔒 `PATCH /ingredients/:id` | 🔒 `DELETE /ingredients/:id` |
| Tables | `GET /tables` | `GET /tables/:id` | `POST /tables` | `PATCH /tables/:id` | `DELETE /tables/:id` |

🔒 = requires `Authorization: Bearer <jwt>`. See Swagger UI at `/api` for payload schemas.

---

## 5. WebSocket Gateway

Namespace: default (`/`). Path: `/socket.io/`.
**Auth**: pass JWT via Socket.IO handshake `auth: { token }` (preferred) or query string `?token=...`. Server rejects unauthenticated connections.

### Server → Client events

| Event | Payload | When |
|---|---|---|
| `orders:snapshot` | `{ orders: Order[], stats: Stats }` | Manual broadcast on bulk reload |
| `orders:new` | `Order` (wire format) | New order created |
| `orders:item-added` | `{ orderId: string, items: OrderItem[] }` | Pre-cuenta items appended (future) |
| `orders:status-changed` | `{ orderId: string, status: WireStatus }` | After `PATCH /orders/:id/status` or socket transition |
| `orders:stats` | `Stats` | After any status mutation |

### Client → Server events (with ack)

| Event | Payload | Ack |
|---|---|---|
| `orders:resync` | `null` | `{ orders, stats }` (full snapshot) |
| `order:start` | `{ orderId }` | `{ ok: boolean, error? }` — sets `PREPARING` |
| `order:ready` | `{ orderId }` | `{ ok }` — sets `READY` |
| `order:out-of-stock` | `{ orderId, itemId }` | `{ ok }` — flips product unavailable + parent → `OUT_OF_STOCK` |
| `order:print` | `{ orderId }` | `{ ok }` — placeholder (ESC/POS bridge TBD) |

---

## 6. Environment

Backend `.env`:
```env
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
JWT_SECRET=<random-256-bit>
JWT_EXPIRES_IN=12h
PORT=3001
```

Dashboard `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
```

---

## 7. Seed

Run `npx tsx prisma/seed.ts` for demo categories/products/tables.
Run `npx tsx prisma/seed-barista.ts` for the demo barista (PIN `1234`, override via `SEED_BARISTA_PIN`).
