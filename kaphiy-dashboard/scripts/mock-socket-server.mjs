/**
 * Dev mock socket server — run with: node scripts/mock-socket-server.mjs
 * Simulates backend NestJS @nestjs/websockets gateway for kaphiy-dashboard.
 * Sends realistic events based on DB schema (kitchen_status, order_items).
 * Keep running alongside `npm run dev`.
 */

import { createServer } from "node:http";
import { Server } from "socket.io";

const PORT = 3001;

const httpServer = createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok", mock: true }));
    return;
  }
  res.writeHead(404);
  res.end();
});

const io = new Server(httpServer, {
  cors: { origin: "*" },
});

// ── Seed state (mirrors DB schema shapes) ────────────────
const now = Date.now();
const ago = (min) => new Date(now - min * 60_000).toISOString();

let orders = [
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
        id: 101, order_id: 41, product_id: 5, quantity: 2,
        unit_price: "9.50", ai_notes: "Oat milk, sin azúcar",
        products: { id: 5, name: "Latte de Avellana", price: "9.50", is_available: true, product_ingredients: [{ is_optional: false, ingredients: { id: 3, name: "Lactosa", is_allergen: true } }] },
      },
      {
        id: 102, order_id: 41, product_id: 12, quantity: 1,
        unit_price: "6.50", ai_notes: "Tibio",
        products: { id: 12, name: "Croissant Praliné", price: "6.50", is_available: true, product_ingredients: [{ is_optional: false, ingredients: { id: 1, name: "Gluten", is_allergen: true } }] },
      },
    ],
  },
  {
    id: 42,
    table_id: 7,
    chat_session_id: null,
    payment_code: "0042",
    total: "52.00",
    payment_status: "PENDING",
    kitchen_status: "WAITING",
    created_at: ago(6),
    tables: { id: 7, table_name: "7", status: "Occupied" },
    order_items: [
      {
        id: 103, order_id: 42, product_id: 1, quantity: 2,
        unit_price: "8.00", ai_notes: "Extra caliente",
        products: { id: 1, name: "Espresso Doble", price: "8.00", is_available: true, product_ingredients: [] },
      },
      {
        id: 104, order_id: 42, product_id: 8, quantity: 1,
        unit_price: "10.00", ai_notes: null,
        products: { id: 8, name: "Matcha Latte", price: "10.00", is_available: true, product_ingredients: [{ is_optional: false, ingredients: { id: 3, name: "Lactosa", is_allergen: true } }] },
      },
    ],
  },
];

let stats = { in_prep: 1, alerts: 1, completed_today: 14, avg_time_minutes: 8.2 };
let nextId = 50;

function buildSnapshot() {
  return { orders, stats };
}

io.on("connection", (socket) => {
  console.log(`[mock] client connected: ${socket.id}`);

  socket.on("orders:resync", (_payload, ack) => {
    if (typeof ack === "function") ack(buildSnapshot());
  });

  socket.on("order:start", ({ orderId }, ack) => {
    const o = orders.find((o) => String(o.id) === String(orderId));
    if (o) {
      o.kitchen_status = "IN_PREP";
      io.emit("orders:status-changed", { orderId: String(orderId), status: "IN_PREP" });
    }
    if (typeof ack === "function") ack({ ok: true });
  });

  socket.on("order:ready", ({ orderId }, ack) => {
    const o = orders.find((o) => String(o.id) === String(orderId));
    if (o) {
      o.kitchen_status = "READY";
      io.emit("orders:status-changed", { orderId: String(orderId), status: "READY" });
    }
    if (typeof ack === "function") ack({ ok: true });
  });

  socket.on("order:out-of-stock", ({ orderId, itemId }, ack) => {
    const o = orders.find((o) => String(o.id) === String(orderId));
    if (o) {
      const item = o.order_items.find((i) => String(i.id) === String(itemId));
      if (item?.products) item.products.is_available = false;
      o.kitchen_status = "OUT_OF_STOCK";
      io.emit("orders:status-changed", { orderId: String(orderId), status: "OUT_OF_STOCK" });
    }
    if (typeof ack === "function") ack({ ok: true });
    console.log(`[mock] item ${itemId} marked out of stock → client reversal emitted`);
  });

  socket.on("order:print", ({ orderId }, ack) => {
    console.log(`[mock] print request for order ${orderId} (ESC/POS bridge placeholder)`);
    if (typeof ack === "function") ack({ ok: true });
  });

  socket.on("disconnect", () => {
    console.log(`[mock] client disconnected: ${socket.id}`);
  });
});

// Simulate new order every 30s
let orderInterval = setInterval(() => {
  if (io.sockets.sockets.size === 0) return;
  nextId++;
  const newOrder = {
    id: nextId,
    table_id: Math.floor(Math.random() * 10) + 1,
    chat_session_id: null,
    payment_code: String(nextId).padStart(4, "0"),
    total: "24.00",
    payment_status: "PENDING",
    kitchen_status: "WAITING",
    created_at: new Date().toISOString(),
    tables: { id: nextId, table_name: String(Math.floor(Math.random() * 10) + 1), status: "Occupied" },
    order_items: [
      {
        id: nextId * 10, order_id: nextId, product_id: 1, quantity: 1,
        unit_price: "8.00", ai_notes: null,
        products: { id: 1, name: "Espresso Doble", price: "8.00", is_available: true, product_ingredients: [] },
      },
    ],
  };
  orders.push(newOrder);
  io.emit("orders:new", newOrder);
  console.log(`[mock] → orders:new #${nextId} (Mesa ${newOrder.tables.table_name})`);
}, 30_000);

httpServer.listen(PORT, () => {
  console.log(`[mock] socket server running on http://localhost:${PORT}`);
  console.log(`[mock] sends orders:new every 30s`);
  console.log(`[mock] health: http://localhost:${PORT}/health`);
});

process.on("SIGINT", () => {
  clearInterval(orderInterval);
  process.exit(0);
});
