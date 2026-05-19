"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ClipboardList, RefreshCw } from "lucide-react";
import { BottomNav } from "@/components/pwa/BottomNav";
import Link from "next/link";

// ── Status maps ────────────────────────────────────────────────────────────────
const KITCHEN_LABELS: Record<string, { label: string; emoji: string; color: string; bg: string }> = {
  WAITING:     { label: "En cola · Recibido",  emoji: "⏳", color: "#92714a", bg: "#f5ece3" },
  PREPARING:   { label: "En preparación",      emoji: "👨‍🍳", color: "#b45309", bg: "#fef3c7" },
  READY:       { label: "Listo para retirar",  emoji: "☕", color: "#15803d", bg: "#dcfce7" },
  DELIVERED:   { label: "Entregado",           emoji: "✅", color: "#166534", bg: "#bbf7d0" },
  OUT_OF_STOCK:{ label: "Sin stock",           emoji: "❌", color: "#991b1b", bg: "#fee2e2" },
};
const PAYMENT_LABELS: Record<string, { label: string; emoji: string; color: string; bg: string }> = {
  PENDING:  { label: "No pagado",  emoji: "🔴", color: "#b91c1c", bg: "#fee2e2" },
  PAID:     { label: "Pagado",     emoji: "🟢", color: "#15803d", bg: "#dcfce7" },
  CANCELLED:{ label: "Cancelado", emoji: "⚫", color: "#6b7280", bg: "#f3f4f6" },
};

function StatusBadge({ label, emoji, color, bg }: { label: string; emoji: string; color: string; bg: string }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "0.3rem",
      background: bg, color, borderRadius: 99, padding: "0.3rem 0.65rem",
      fontSize: "0.75rem", fontWeight: 600,
    }}>
      {emoji} {label}
    </span>
  );
}

interface OrderData {
  id: number;
  kitchenStatus: string;
  paymentStatus: string;
  total: string | number | null;
  createdAt: string;
  orderItems: { quantity: number; product: { name: string; price: string | number } }[];
}

function ActiveOrderCard({ orderId }: { orderId: number }) {
  const [order, setOrder]       = useState<OrderData | null>(null);
  const [loading, setLoading]   = useState(true);
  const [pollError, setPollError] = useState(false);

  useEffect(() => {
    let active = true;
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

    const poll = async () => {
      try {
        const res = await fetch(`${BASE_URL}/orders/${orderId}`, { cache: "no-store" });
        if (!res.ok) { setPollError(true); return; }
        const data = await res.json();
        if (active) { setOrder(data); setLoading(false); setPollError(false); }
      } catch { if (active) { setPollError(true); setLoading(false); } }
    };

    poll();
    const interval = setInterval(poll, 4000);
    return () => { active = false; clearInterval(interval); };
  }, [orderId]);

  if (loading) {
    return (
      <div className="praline-card" style={{ padding: "1.25rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <RefreshCw size={16} color="var(--color-praline-muted)" style={{ animation: "spin 1.2s linear infinite" }} />
        <span style={{ fontSize: "0.85rem", color: "var(--color-praline-muted)" }}>Cargando estado del pedido...</span>
      </div>
    );
  }

  if (!order) return null;

  const kitchen = KITCHEN_LABELS[order.kitchenStatus] ?? KITCHEN_LABELS.WAITING;
  const payment = PAYMENT_LABELS[order.paymentStatus] ?? PAYMENT_LABELS.PENDING;
  const total = parseFloat(String(order.total ?? 0));

  return (
    <div className="praline-card" style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--color-praline-primary-dark)" }}>
          {kitchen.emoji} Orden #{order.id}
        </span>
        <span style={{ fontSize: "0.7rem", color: "var(--color-praline-muted)" }}>
          {new Date(order.createdAt).toLocaleTimeString("es-EC", { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>

      {/* Items */}
      {order.orderItems?.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          {order.orderItems.map((oi, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem" }}>
              <span style={{ color: "var(--color-praline-brown)" }}>
                {oi.quantity}× {oi.product.name}
              </span>
              <span style={{ color: "var(--color-praline-muted)" }}>
                ${(parseFloat(String(oi.product.price)) * oi.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      )}

      <div style={{ height: 1, background: "var(--color-praline-border)" }} />

      {/* Badges */}
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <StatusBadge {...kitchen} />
        <StatusBadge {...payment} />
      </div>

      {/* Total */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "0.78rem", color: "var(--color-praline-muted)" }}>Total</span>
        <strong style={{ fontSize: "1rem", color: "var(--color-praline-primary-dark)" }}>${total.toFixed(2)}</strong>
      </div>

      {pollError && (
        <p style={{ fontSize: "0.7rem", color: "var(--color-praline-rose)", margin: 0 }}>
          No se pudo actualizar. Reintentando...
        </p>
      )}
      <p style={{ fontSize: "0.68rem", color: "var(--color-praline-muted)", margin: 0 }}>
        Actualizando en tiempo real cada 4 s
      </p>
    </div>
  );
}

export default function MisPedidosPage() {
  const router = useRouter();
  const [lastOrderId, setLastOrderId] = useState<number | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("last_order_id");
    if (id) setLastOrderId(parseInt(id, 10));
  }, []);

  return (
    <div className="page-screen" style={{ paddingBottom: "6rem" }}>
      {/* ── Header ── */}
      <div style={{
        background: "var(--color-praline-surface)",
        padding: "1rem 1.25rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid var(--color-praline-border)",
        position: "sticky", top: 0, zIndex: 20,
      }}>
        <button
          onClick={() => router.push("/inicio")}
          style={{
            background: "none", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", gap: "0.3rem",
            color: "var(--color-praline-brown)", fontSize: "0.875rem", padding: 0,
          }}
        >
          <ChevronLeft size={20} /> Mis Pedidos
        </button>
        <ClipboardList size={18} color="var(--color-praline-rose)" />
      </div>

      <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}>

        {/* ── Pedido activo ── */}
        {lastOrderId ? (
          <>
            <p className="section-label">PEDIDO ACTIVO</p>
            <ActiveOrderCard orderId={lastOrderId} />
          </>
        ) : (
          <div style={{
            minHeight: "60vh", display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: "1.25rem", textAlign: "center",
          }}>
            <span style={{ fontSize: "3.5rem" }}>🛒</span>
            <h2 className="section-title">Sin pedidos aún</h2>
            <p style={{ color: "var(--color-praline-muted)", fontSize: "0.875rem", maxWidth: 260 }}>
              Habla con KAPHY para hacer tu primer pedido y ver el estado aquí.
            </p>
            <Link href="/chat" style={{ textDecoration: "none" }}>
              <button className="btn-primary" style={{ padding: "0.75rem 2rem" }}>
                Hablar con KAPHY
              </button>
            </Link>
          </div>
        )}
      </div>

      <BottomNav />

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
