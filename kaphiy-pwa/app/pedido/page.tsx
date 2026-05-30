"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, CheckCircle, Minus, Plus, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createOrder, getProducts, adaptProduct } from "@/lib/api";
import {
  buildOrderItems,
  getInvalidOrderItems,
  normalizeCartItems,
  type PendingOrderItem,
} from "@/lib/order";

type AdaptedProduct = ReturnType<typeof adaptProduct>;

const IVA_RATE = 0.15;

// ── Mapas de estado ────────────────────────────────────────────────────────────
const KITCHEN_LABELS: Record<string, { label: string; emoji: string; color: string; bg: string }> = {
  WAITING: { label: "En cola · Recibido", emoji: "⏳", color: "#92714a", bg: "#f5ece3" },
  PREPARING: { label: "En preparación", emoji: "👨‍🍳", color: "#b45309", bg: "#fef3c7" },
  READY: { label: "Listo para retirar", emoji: "☕", color: "#15803d", bg: "#dcfce7" },
  DELIVERED: { label: "Entregado", emoji: "✅", color: "#166534", bg: "#bbf7d0" },
  OUT_OF_STOCK: { label: "Sin stock", emoji: "❌", color: "#991b1b", bg: "#fee2e2" },
};
const PAYMENT_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  PENDING: { label: "No pagado", color: "#b91c1c", bg: "#fee2e2" },
  PAID: { label: "Pagado", color: "#15803d", bg: "#dcfce7" },
  CANCELLED: { label: "Cancelado", color: "#6b7280", bg: "#f3f4f6" },
};

function StatusBadge({ label, emoji, color, bg }: { label: string; emoji: string; color: string; bg: string }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "0.35rem",
      background: bg, color, borderRadius: 99, padding: "0.35rem 0.75rem",
      fontSize: "0.78rem", fontWeight: 600,
    }}>
      {emoji} {label}
    </span>
  );
}

function ConfirmationScreen({
  total, orderId, onBack
}: { total: number; orderId: number | null; onBack: () => void }) {
  const [kitchenStatus, setKitchenStatus] = useState<string>("WAITING");
  const [paymentStatus, setPaymentStatus] = useState<string>("PENDING");
  const [pollError, setPollError] = useState(false);

  useEffect(() => {
    if (!orderId) return;
    let active = true;

    const poll = async () => {
      try {
        const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
        const res = await fetch(`${BASE_URL}/orders/${orderId}`, { cache: "no-store" });
        if (!res.ok) { setPollError(true); return; }
        const order = await res.json();
        if (active) {
          setKitchenStatus(order.kitchenStatus ?? "WAITING");
          setPaymentStatus(order.paymentStatus ?? "PENDING");
          setPollError(false);
        }
      } catch { if (active) setPollError(true); }
    };

    poll();
    const interval = setInterval(poll, 4000);
    return () => { active = false; clearInterval(interval); };
  }, [orderId]);

  const kitchen = KITCHEN_LABELS[kitchenStatus] ?? KITCHEN_LABELS.WAITING;
  const payment = PAYMENT_LABELS[paymentStatus] ?? PAYMENT_LABELS.PENDING;

  return (
    <div style={{
      minHeight: "100dvh",
      background: "var(--color-praline-bg)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "2rem", gap: "1.25rem", textAlign: "center",
    }}>
      <div style={{ fontSize: "3.5rem" }}>{kitchen.emoji}</div>
      <h1 className="section-title" style={{ fontSize: "1.6rem" }}>¡Pedido enviado!</h1>

      {/* ── Estado del pedido ── */}
      <div className="praline-card" style={{ padding: "1.25rem 1.5rem", width: "100%", maxWidth: 320, display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em", color: "var(--color-praline-muted)", marginBottom: "0.5rem" }}>ESTADO EN COCINA</p>
          <StatusBadge {...kitchen} />
        </div>
        <div style={{ height: 1, background: "var(--color-praline-border)" }} />
        <div>
          <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em", color: "var(--color-praline-muted)", marginBottom: "0.5rem" }}>ESTADO DE PAGO</p>
          <StatusBadge emoji={payment.label === "Pagado" ? "🟢" : payment.label === "Cancelado" ? "⚫" : "🔴"} {...payment} />
        </div>
        <div style={{ height: 1, background: "var(--color-praline-border)" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "0.8rem", color: "var(--color-praline-muted)" }}>Total pagado</span>
          <strong style={{ fontSize: "1rem", color: "var(--color-praline-primary-dark)" }}>${total.toFixed(2)}</strong>
        </div>
      </div>

      {pollError && (
        <p style={{ fontSize: "0.72rem", color: "var(--color-praline-rose)" }}>No se pudo actualizar el estado. Reintentando...</p>
      )}
      {orderId && (
        <p style={{ fontSize: "0.7rem", color: "var(--color-praline-muted)" }}>Orden #{orderId} · Actualizando en tiempo real</p>
      )}

      <button
        className="btn-secondary"
        style={{ width: "auto", padding: "0.75rem 2rem" }}
        onClick={onBack}
      >
        Volver al inicio
      </button>
    </div>
  );
}

export default function PedidoPage() {
  const router = useRouter();
  const [items, setItems] = useState<PendingOrderItem[]>([]);
  const [aiNotes, setAiNotes] = useState<string[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [confirmed, setConfirmed] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [orderError, setOrderError] = useState<string | null>(null);

  useEffect(() => {
    async function loadOrderAndEnrich() {
      const saved = localStorage.getItem("current_order");
      if (!saved) {
        // Si no hay carrito pero sí hay un pedido previo confirmado → redirigir
        const lastOrderId = localStorage.getItem("last_order_id");
        if (lastOrderId) {
          router.replace("/mis-pedidos");
          return;
        }
        setLoading(false);
        return;
      }

      try {
        const parsed = JSON.parse(saved) as { cartItems?: unknown[]; aiNotes?: unknown[] };
        const rawItems = Array.isArray(parsed.cartItems) ? parsed.cartItems : [];
        const notes = Array.isArray(parsed.aiNotes)
          ? parsed.aiNotes.map((note) => String(note)).filter(Boolean)
          : [];
        setAiNotes(notes);

        let realProducts: AdaptedProduct[] = [];
        try {
          const apiProds = await getProducts();
          realProducts = apiProds.map(adaptProduct);
        } catch (apiErr) {
          console.error("Error fetching products for enrichment:", apiErr);
        }

        const enrichedItems = normalizeCartItems(rawItems, realProducts);
        const invalidItems = getInvalidOrderItems(enrichedItems);
        if (rawItems.length === 0 || invalidItems.length > 0) {
          localStorage.removeItem("current_order");
          setItems([]);
          setQuantities({});
          setOrderError(
            "Elige un producto del menu o vuelve al chat para intentarlo otra vez.",
          );
          return;
        }

        setItems(enrichedItems);

        const initialQtys: Record<string, number> = {};
        enrichedItems.forEach((item) => {
          initialQtys[item.id] = item.qty || 1;
        });
        setQuantities(initialQtys);
      } catch (e) {
        console.error("Error parsing/enriching current_order:", e);
      } finally {
        setLoading(false);
      }
    }

    loadOrderAndEnrich();
  }, [router]);

  const updateQty = (id: string, delta: number) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(1, (prev[id] ?? 1) + delta) }));
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      const generateUUID = (): string => {
        if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
          return crypto.randomUUID();
        }
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
          const r = (Math.random() * 16) | 0;
          const v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        });
      };

      let chatSessionId = localStorage.getItem("chat_session_id");
      if (!chatSessionId || !uuidRegex.test(chatSessionId)) {
        chatSessionId = generateUUID();
        localStorage.setItem("chat_session_id", chatSessionId);
      }

      const { orderItems, invalidItems } = buildOrderItems(items, quantities, aiNotes);
      if (invalidItems.length > 0 || orderItems.length === 0) {
        setSubmitError(
          "No se pudo enviar el pedido. Revisa el producto y vuelve a intentarlo.",
        );
        return;
      }

      const payload = {
        tableId: 1,
        chatSessionId,
        items: orderItems,
        paymentStatus: 'PENDING' as const,
        kitchenStatus: 'WAITING' as const,
      };

      const createdOrder = await createOrder(payload);
      const newOrderId = createdOrder?.id ?? null;
      setConfirmedOrderId(newOrderId);
      if (newOrderId) {
        localStorage.setItem("last_order_id", String(newOrderId));
      }
      // Limpiar carrito y sesión de chat → fuerza chat nuevo limpio
      localStorage.removeItem("current_order");
      localStorage.removeItem("chat_messages");
      localStorage.removeItem("chat_session_id");
      setConfirmed(true);
    } catch (err) {
      console.error(err);
      setSubmitError(err instanceof Error ? err.message : "Error al enviar el pedido. Por favor intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * (quantities[item.id] ?? 1), 0);
  const iva = subtotal * IVA_RATE;
  const total = subtotal + iva;

  if (loading) return null;

  if (confirmed) {
    return <ConfirmationScreen total={total} orderId={confirmedOrderId} onBack={() => {
      router.replace("/mis-pedidos");
    }} />;
  }

  if (items.length === 0) {
    return (
      <div style={{ minHeight: "100dvh", background: "var(--color-praline-bg)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", gap: "1.5rem", textAlign: "center" }}>
        <span style={{ fontSize: "4rem" }}>🛒</span>
        <h2 className="section-title">{orderError ? "No pudimos preparar tu pedido" : "Tu carrito está vacío"}</h2>
        <p style={{ color: "var(--color-praline-muted)", fontSize: "0.9rem" }}>
          {orderError ?? "Aún no has confirmado un pedido con KAPHY."}
        </p>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/chat" style={{ textDecoration: "none" }}>
            <button className="btn-primary" style={{ padding: "0.8rem 2rem" }}>Volver al Chat</button>
          </Link>
          <Link href="/menu" style={{ textDecoration: "none" }}>
            <button className="btn-secondary" style={{ padding: "0.8rem 2rem" }}>Ver menú</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100dvh", background: "var(--color-praline-bg)", paddingBottom: "7rem" }}>

      {/* ── Header ── */}
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
          onClick={() => router.back()}
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
          <ChevronLeft size={20} /> Confirmar Pedido
        </button>
        <span className="badge badge-muted">Paso 3/3</span>
      </div>

      <div style={{ padding: "1rem 1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}>

        {/* ── Tu pedido ── */}
        <div>
          <p className="section-label">TU PEDIDO</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {items.map((item) => (
              <div key={item.id} className="praline-card" style={{ padding: "0.875rem" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <div
                    style={{
                      width: 44, height: 44, borderRadius: 14,
                      background: "#f0e8de", display: "flex",
                      alignItems: "center", justifyContent: "center",
                      fontSize: "1.3rem", flexShrink: 0,
                      overflow: "hidden",
                    }}
                  >
                    {item.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      item.emoji ?? "☕"
                    )}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--color-praline-primary-dark)" }}>
                        {item.name}
                      </span>
                      <span style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--color-praline-primary-dark)" }}>
                        ${(item.price * (quantities[item.id] ?? 1)).toFixed(2)}
                      </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", marginTop: "0.5rem" }}>
                      <div
                        style={{
                          display: "flex", alignItems: "center", gap: "0.5rem",
                          background: "var(--color-praline-bg-alt)",
                          borderRadius: 9999, padding: "0.25rem 0.5rem",
                          border: "1px solid var(--color-praline-border)",
                        }}
                      >
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          style={{
                            width: 22, height: 22, borderRadius: 9999,
                            background: "var(--color-praline-primary-dark)",
                            border: "none", cursor: "pointer",
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}
                        >
                          <Minus size={11} color="#fff9f4" />
                        </button>
                        <span style={{ fontWeight: 700, fontSize: "0.8rem", color: "var(--color-praline-primary-dark)", minWidth: 16, textAlign: "center" }}>
                          {quantities[item.id] ?? 1}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          style={{
                            width: 22, height: 22, borderRadius: 9999,
                            background: "var(--color-praline-primary-dark)",
                            border: "none", cursor: "pointer",
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}
                        >
                          <Plus size={11} color="#fff9f4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Notas IA ── */}
        {aiNotes.length > 0 && (
          <div className="praline-card" style={{ padding: "0.875rem" }}>
            <p className="section-label">NOTAS DE LA IA</p>
            <p style={{ fontSize: "0.72rem", color: "var(--color-praline-muted)", marginBottom: "0.4rem" }}>
              ✦ KAPHY anotó estas preferencias:
            </p>
            <div style={{ display: "flex", gap: "0.3rem", flexWrap: "wrap", marginBottom: "0.4rem" }}>
              {aiNotes.map((pref) => (
                <span key={pref} className="badge badge-muted">{pref}</span>
              ))}
            </div>
          </div>
        )}

        {/* ── Resumen ── */}
        <div className="praline-card" style={{ padding: "0.875rem" }}>
          <p className="section-label">RESUMEN</p>
          {[
            { label: "Subtotal", value: subtotal },
            { label: "IVA 15%", value: iva },
            { label: "Servicio", value: 0 },
          ].map((row) => (
            <div key={row.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
              <span style={{ fontSize: "0.82rem", color: "var(--color-praline-muted)" }}>{row.label}</span>
              <span style={{ fontSize: "0.82rem", color: "var(--color-praline-brown)" }}>${row.value.toFixed(2)}</span>
            </div>
          ))}
          <div style={{ height: 1, background: "var(--color-praline-border)", margin: "0.6rem 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--color-praline-primary-dark)" }}>Total</span>
            <span style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--color-praline-primary-dark)" }}>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* SECCIÓN DE PAGO COMENTADA A PETICIÓN DEL USUARIO
        <div>
          <p className="section-label">MÉTODO DE PAGO</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {PAYMENT_OPTIONS.map(({ id, label, Icon }) => {
              const isSelected = paymentMethod === id;
              return (
                <button
                  key={id}
                  onClick={() => setPaymentMethod(id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "var(--color-praline-surface)",
                    border: `1.5px solid ${isSelected ? "var(--color-praline-dark)" : "var(--color-praline-border)"}`,
                    borderRadius: 20,
                    padding: "0.875rem 1rem",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <div
                      style={{
                        width: 18, height: 18, borderRadius: 9999,
                        border: `2px solid ${isSelected ? "var(--color-praline-dark)" : "var(--color-praline-border)"}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                    >
                      {isSelected && (
                        <div style={{ width: 8, height: 8, borderRadius: 9999, background: "var(--color-praline-dark)" }} />
                      )}
                    </div>
                    <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--color-praline-primary-dark)" }}>
                      {label}
                    </span>
                  </div>
                  <span style={{ color: "var(--color-praline-muted)" }}>
                    <Icon size={16} />
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {paymentMethod === "qr" && (
          <div className="praline-card" style={{ padding: "1.25rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
            <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--color-praline-primary-dark)", letterSpacing: "0.08em" }}>
              ESCANEA PARA PAGAR ${total.toFixed(2)}
            </p>
            <QRPlaceholder />
            <p style={{ fontSize: "0.7rem", color: "var(--color-praline-muted)", lineHeight: 1.6, textAlign: "center" }}>
              Banco Pichincha · Cta Corriente 28181<br />
              Praline Coffee House CI: 1792828282001
            </p>
          </div>
        )}
        */}

        {/* ── Privacidad ── */}
        <div
          style={{
            display: "flex", gap: "0.5rem",
            background: "rgba(162,117,114,0.08)",
            borderRadius: 16, padding: "0.75rem",
            border: "1px solid rgba(162,117,114,0.15)",
          }}
        >
          <Lock size={14} color="var(--color-praline-rose)" style={{ flexShrink: 0, marginTop: 2 }} />
          <p style={{ fontSize: "0.68rem", color: "var(--color-praline-muted)", lineHeight: 1.5 }}>
            <strong style={{ color: "var(--color-praline-rose)" }}>Privacidad protegida.</strong> Tus datos son
            tratados bajo la <strong>LOPDP Ecuador</strong>. Solo procesamos tu pedido.
          </p>
        </div>
      </div>

      {/* ── Botón confirmar (fixed) ── */}
      <div
        style={{
          position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
          width: "100%", maxWidth: 430, padding: "1rem 1.25rem 1.5rem",
          background: "linear-gradient(to top, var(--color-praline-bg) 60%, transparent)",
          zIndex: 50,
        }}
      >
        {submitError && (
          <div style={{ color: "var(--color-praline-rose)", fontSize: "0.8rem", textAlign: "center", marginBottom: "0.5rem" }}>
            {submitError}
          </div>
        )}
        <button
          className="btn-primary"
          onClick={handleConfirm}
          disabled={isSubmitting}
          style={{ gap: "0.5rem", opacity: isSubmitting ? 0.7 : 1 }}
        >
          <CheckCircle size={17} />
          {isSubmitting ? "Enviando pedido..." : "Confirmar y enviar a cocina"}
        </button>
      </div >
    </div >
  );
}
