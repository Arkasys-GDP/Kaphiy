"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ClipboardList, RefreshCw } from "lucide-react";
import { BottomNav } from "@/components/pwa/BottomNav";
import Link from "next/link";
import { useOrderPolling } from "@/hooks/useOrderPolling";
import { getKitchenLabel, getPaymentLabel, isOrderTerminal, type StatusLabel } from "@/lib/order-status";

function StatusBadge({ label, emoji, color, bg }: StatusLabel) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.3rem",
        background: bg,
        color,
        borderRadius: 99,
        padding: "0.3rem 0.65rem",
        fontSize: "0.75rem",
        fontWeight: 600,
      }}
    >
      {emoji} {label}
    </span>
  );
}

function ActiveOrderCard({ orderId, onTerminal }: { orderId: number; onTerminal: () => void }) {
  const { order, loading, error: pollError } = useOrderPolling(orderId);

  // Cleanup when terminal — but keep showing card until user dismisses.
  useEffect(() => {
    if (order && isOrderTerminal(order.kitchenStatus, order.paymentStatus)) {
      onTerminal();
    }
  }, [order, onTerminal]);

  if (loading) {
    return (
      <div className="praline-card" style={{ padding: "1.25rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <RefreshCw
          size={16}
          color="var(--color-praline-muted)"
          style={{ animation: "spin 1.2s linear infinite" }}
        />
        <span style={{ fontSize: "0.85rem", color: "var(--color-praline-muted)" }}>
          Cargando estado del pedido...
        </span>
      </div>
    );
  }

  if (!order) return null;

  const kitchen = getKitchenLabel(order.kitchenStatus);
  const payment = getPaymentLabel(order.paymentStatus);
  const total = parseFloat(String(order.total ?? 0));

  return (
    <div
      className="praline-card"
      style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--color-praline-primary-dark)" }}>
          {kitchen.emoji} Orden #{order.id}
        </span>
        <span style={{ fontSize: "0.7rem", color: "var(--color-praline-muted)" }}>
          {new Date(order.createdAt).toLocaleTimeString("es-EC", { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>

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

      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <StatusBadge {...kitchen} />
        <StatusBadge {...payment} />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "0.78rem", color: "var(--color-praline-muted)" }}>Total</span>
        <strong style={{ fontSize: "1rem", color: "var(--color-praline-primary-dark)" }}>
          ${total.toFixed(2)}
        </strong>
      </div>

      {pollError && (
        <p style={{ fontSize: "0.7rem", color: "var(--color-praline-rose)", margin: 0 }}>
          No se pudo actualizar. Reintentando...
        </p>
      )}
      <p style={{ fontSize: "0.68rem", color: "var(--color-praline-muted)", margin: 0 }}>
        Actualización en tiempo real cada 4 s
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

  // Once terminal, remove from storage so a refresh shows empty state.
  const handleTerminal = () => {
    localStorage.removeItem("last_order_id");
  };

  return (
    <div className="page-screen" style={{ paddingBottom: "6rem" }}>
      <div
        style={{
          background: "var(--color-praline-surface)",
          padding: "1rem 1.25rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid var(--color-praline-border)",
          position: "sticky",
          top: 0,
          zIndex: 20,
        }}
      >
        <button
          onClick={() => router.push("/inicio")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
            color: "var(--color-praline-brown)",
            fontSize: "0.875rem",
            padding: 0,
          }}
        >
          <ChevronLeft size={20} /> Mis Pedidos
        </button>
        <ClipboardList size={18} color="var(--color-praline-rose)" />
      </div>

      <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        {lastOrderId ? (
          <>
            <p className="section-label">PEDIDO ACTIVO</p>
            <ActiveOrderCard orderId={lastOrderId} onTerminal={handleTerminal} />

            <button
              onClick={() => {
                localStorage.removeItem("last_order_id");
                localStorage.removeItem("current_order");
                router.push("/chat");
              }}
              className="btn-secondary"
              style={{ marginTop: "0.5rem" }}
            >
              ✦ Hacer otro pedido
            </button>
          </>
        ) : (
          <div
            style={{
              minHeight: "60vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1.25rem",
              textAlign: "center",
            }}
          >
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
