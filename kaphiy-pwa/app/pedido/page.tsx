"use client";

import { useState, useEffect, useMemo } from "react";
import { ChevronLeft, CheckCircle, Minus, Plus, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createOrder, getProducts, adaptProduct, pickRandomTableId } from "@/lib/api";
import { getOrCreateChatSessionId } from "@/lib/session";
import { getCurrentTableId } from "@/lib/table-session";
import { getKitchenLabel, getPaymentLabel, isOrderTerminal } from "@/lib/order-status";
import { useOrderPolling } from "@/hooks/useOrderPolling";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  imageUrl?: string;
  emoji?: string;
}

interface SavedCartItem {
  id?: string | number;
  productId?: string | number;
  name?: string;
  productName?: string;
  nombre?: string;
  price?: string | number;
  unitPrice?: string | number;
  precio?: string | number;
  qty?: string | number;
  quantity?: string | number;
  cantidad?: string | number;
}

const IVA_RATE = 0.15;

function StatusBadge({
  label,
  emoji,
  color,
  bg,
}: {
  label: string;
  emoji: string;
  color: string;
  bg: string;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35rem",
        background: bg,
        color,
        borderRadius: 99,
        padding: "0.35rem 0.75rem",
        fontSize: "0.78rem",
        fontWeight: 600,
      }}
    >
      {emoji} {label}
    </span>
  );
}

function ConfirmationScreen({
  total,
  orderId,
  onBack,
}: {
  total: number;
  orderId: number | null;
  onBack: () => void;
}) {
  const { order, error: pollError } = useOrderPolling(orderId);
  const kitchenStatus = order?.kitchenStatus ?? "WAITING";
  const paymentStatus = order?.paymentStatus ?? "PENDING";
  const kitchen = getKitchenLabel(kitchenStatus);
  const payment = getPaymentLabel(paymentStatus);

  // Once order delivered or cancelled, clear last_order_id so user can start fresh.
  useEffect(() => {
    if (isOrderTerminal(kitchenStatus, paymentStatus)) {
      localStorage.removeItem("last_order_id");
    }
  }, [kitchenStatus, paymentStatus]);

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "var(--color-praline-bg)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        gap: "1.25rem",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: "3.5rem" }}>{kitchen.emoji}</div>
      <h1 className="section-title" style={{ fontSize: "1.6rem" }}>
        ¡Pedido enviado!
      </h1>

      <div
        className="praline-card"
        style={{
          padding: "1.25rem 1.5rem",
          width: "100%",
          maxWidth: 320,
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "var(--color-praline-muted)",
              marginBottom: "0.5rem",
            }}
          >
            ESTADO EN COCINA
          </p>
          <StatusBadge {...kitchen} />
        </div>
        <div style={{ height: 1, background: "var(--color-praline-border)" }} />
        <div>
          <p
            style={{
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "var(--color-praline-muted)",
              marginBottom: "0.5rem",
            }}
          >
            ESTADO DE PAGO
          </p>
          <StatusBadge {...payment} />
        </div>
        <div style={{ height: 1, background: "var(--color-praline-border)" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "0.8rem", color: "var(--color-praline-muted)" }}>Total pagado</span>
          <strong style={{ fontSize: "1rem", color: "var(--color-praline-primary-dark)" }}>
            ${total.toFixed(2)}
          </strong>
        </div>
      </div>

      {pollError && (
        <p style={{ fontSize: "0.72rem", color: "var(--color-praline-rose)" }}>
          No se pudo actualizar el estado. Reintentando...
        </p>
      )}
      {orderId && (
        <p style={{ fontSize: "0.7rem", color: "var(--color-praline-muted)" }}>
          Orden #{orderId} · Actualizando en tiempo real
        </p>
      )}

      <button className="btn-secondary-2" style={{ width: "auto", padding: "0.75rem 2rem" }} onClick={onBack}>
        Volver al inicio
      </button>
    </div>
  );
}

export default function PedidoPage() {
  const router = useRouter();
  const [items, setItems] = useState<OrderItem[]>([]);
  const [aiNotes, setAiNotes] = useState<string[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [confirmed, setConfirmed] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadOrderAndEnrich() {
      const saved = localStorage.getItem("current_order");
      if (!saved) {
        const lastOrderId = localStorage.getItem("last_order_id");
        if (lastOrderId) {
          router.replace("/mis-pedidos");
          return;
        }
        if (!cancelled) setLoading(false);
        return;
      }

      try {
        const parsed: { cartItems?: SavedCartItem[]; aiNotes?: string[] } = JSON.parse(saved);
        const rawItems = parsed.cartItems ?? [];
        if (!cancelled) setAiNotes(parsed.aiNotes ?? []);

        let realProducts: ReturnType<typeof adaptProduct>[] = [];
        try {
          const apiProds = await getProducts();
          realProducts = apiProds.map(adaptProduct);
        } catch (apiErr) {
          console.error("Error fetching products for enrichment:", apiErr);
        }

        const enrichedItems: OrderItem[] = rawItems.map((item, idx) => {
          const itemIdStr = String(item.id ?? item.productId ?? "");
          const itemNameRaw = item.productName ?? item.name ?? item.nombre ?? "";
          const itemNameStr = String(itemNameRaw).trim().toLowerCase();

          const matchedProd = realProducts.find((p) => {
            if (itemIdStr && String(p.id) === itemIdStr) return true;
            if (itemNameStr && p.name.trim().toLowerCase() === itemNameStr) return true;
            return false;
          });

          const rawPrice = matchedProd
            ? matchedProd.price
            : parseFloat(String(item.unitPrice ?? item.price ?? item.precio ?? 0));
          const finalPrice = isNaN(rawPrice) ? 0 : rawPrice;
          const finalName = matchedProd
            ? matchedProd.name
            : item.productName ?? item.name ?? item.nombre ?? "Producto";
          const finalId = matchedProd ? String(matchedProd.id) : itemIdStr || `temp-${idx}`;

          return {
            id: finalId,
            name: finalName,
            price: finalPrice,
            qty: parseInt(String(item.qty ?? item.cantidad ?? item.quantity ?? 1), 10) || 1,
            imageUrl: matchedProd?.imageUrl,
            emoji: matchedProd?.emoji,
          };
        });

        if (cancelled) return;
        setItems(enrichedItems);

        const initialQtys: Record<string, number> = {};
        enrichedItems.forEach((it) => {
          initialQtys[it.id] = it.qty || 1;
        });
        setQuantities(initialQtys);
      } catch (e) {
        console.error("Error parsing/enriching current_order:", e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadOrderAndEnrich();
    return () => {
      cancelled = true;
    };
  }, [router]);

  const updateQty = (id: string, delta: number) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(1, (prev[id] ?? 1) + delta) }));
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const chatSessionId = getOrCreateChatSessionId();
      // Prefer the table id set by the QR scan (?tableId=N persisted in sessionStorage).
      // Falls back to a random table only when no QR context exists — keeps the demo working
      // when the PWA is opened by typing the URL directly.
      const tableId = getCurrentTableId() ?? (await pickRandomTableId());

      const createdOrder = await createOrder({
        tableId,
        chatSessionId,
        items: items.map((item) => ({
          productId: parseInt(item.id, 10),
          quantity: quantities[item.id] ?? 1,
          aiNotes: aiNotes.length > 0 ? aiNotes.join(", ") : undefined,
        })),
        paymentStatus: "PENDING",
        kitchenStatus: "WAITING",
      });

      const newOrderId = createdOrder?.id ?? null;
      setConfirmedOrderId(newOrderId);
      if (newOrderId) localStorage.setItem("last_order_id", String(newOrderId));

      // Clear cart + chat session — fresh start next time.
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

  const { subtotal, iva, total } = useMemo(() => {
    const sub = items.reduce((s, it) => s + it.price * (quantities[it.id] ?? 1), 0);
    const v = sub * IVA_RATE;
    return { subtotal: sub, iva: v, total: sub + v };
  }, [items, quantities]);

  if (loading) return null;

  if (confirmed) {
    return (
      <ConfirmationScreen
        total={total}
        orderId={confirmedOrderId}
        onBack={() => {
          router.push("/mis-pedidos");
        }}
      />
    );
  }

  if (items.length === 0) {
    return (
      <div
        style={{
          minHeight: "100dvh",
          background: "var(--color-praline-bg)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          gap: "1.5rem",
          textAlign: "center",
        }}
      >
        <span style={{ fontSize: "4rem" }}>🛒</span>
        <h2 className="section-title">Tu carrito está vacío</h2>
        <p style={{ color: "var(--color-praline-muted)", fontSize: "0.9rem" }}>
          Aún no has confirmado un pedido con KAPHY.
        </p>
        <Link href="/chat" style={{ textDecoration: "none" }}>
          <button className="btn-primary" style={{ padding: "0.8rem 2rem" }}>
            Volver al Chat
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100dvh", background: "var(--color-praline-bg)", paddingBottom: "7rem" }}>
      {/* Header */}
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
        {/* Items */}
        <div>
          <p className="section-label">TU PEDIDO</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {items.map((item) => (
              <div key={item.id} className="praline-card" style={{ padding: "0.875rem" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 14,
                      background: "#f0e8de",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.3rem",
                      flexShrink: 0,
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
                      <span
                        style={{
                          fontWeight: 600,
                          fontSize: "0.875rem",
                          color: "var(--color-praline-primary-dark)",
                        }}
                      >
                        {item.name}
                      </span>
                      <span
                        style={{
                          fontWeight: 700,
                          fontSize: "0.875rem",
                          color: "var(--color-praline-primary-dark)",
                        }}
                      >
                        ${(item.price * (quantities[item.id] ?? 1)).toFixed(2)}
                      </span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        marginTop: "0.5rem",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          background: "var(--color-praline-bg-alt)",
                          borderRadius: 9999,
                          padding: "0.25rem 0.5rem",
                          border: "1px solid var(--color-praline-border)",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, -1)}
                          aria-label={`Disminuir cantidad de ${item.name}`}
                          style={{
                            width: 22,
                            height: 22,
                            borderRadius: 9999,
                            background: "var(--color-praline-primary-dark)",
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Minus size={11} color="#fff9f4" />
                        </button>
                        <span
                          style={{
                            fontWeight: 700,
                            fontSize: "0.8rem",
                            color: "var(--color-praline-primary-dark)",
                            minWidth: 16,
                            textAlign: "center",
                          }}
                        >
                          {quantities[item.id] ?? 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, 1)}
                          aria-label={`Aumentar cantidad de ${item.name}`}
                          style={{
                            width: 22,
                            height: 22,
                            borderRadius: 9999,
                            background: "var(--color-praline-primary-dark)",
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
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

        {/* AI notes */}
        {aiNotes.length > 0 && (
          <div className="praline-card" style={{ padding: "0.875rem" }}>
            <p className="section-label">NOTAS DE LA IA</p>
            <p
              style={{
                fontSize: "0.72rem",
                color: "var(--color-praline-muted)",
                marginBottom: "0.4rem",
              }}
            >
              ✦ KAPHY anotó estas preferencias:
            </p>
            <div style={{ display: "flex", gap: "0.3rem", flexWrap: "wrap", marginBottom: "0.4rem" }}>
              {aiNotes.map((pref) => (
                <span key={pref} className="badge badge-muted">
                  {pref}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Summary */}
        <div className="praline-card" style={{ padding: "0.875rem" }}>
          <p className="section-label">RESUMEN</p>
          {[
            { label: "Subtotal", value: subtotal },
            { label: "IVA 15%", value: iva },
            { label: "Servicio", value: 0 },
          ].map((row) => (
            <div
              key={row.label}
              style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}
            >
              <span style={{ fontSize: "0.82rem", color: "var(--color-praline-muted)" }}>{row.label}</span>
              <span style={{ fontSize: "0.82rem", color: "var(--color-praline-brown)" }}>
                ${row.value.toFixed(2)}
              </span>
            </div>
          ))}
          <div style={{ height: 1, background: "var(--color-praline-border)", margin: "0.6rem 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span
              style={{
                fontWeight: 700,
                fontSize: "0.95rem",
                color: "var(--color-praline-primary-dark)",
              }}
            >
              Total
            </span>
            <span
              style={{
                fontWeight: 700,
                fontSize: "1.1rem",
                color: "var(--color-praline-primary-dark)",
              }}
            >
              ${total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Privacy */}
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            background: "rgba(162,117,114,0.08)",
            borderRadius: 16,
            padding: "0.75rem",
            border: "1px solid rgba(162,117,114,0.15)",
          }}
        >
          <Lock
            size={14}
            color="var(--color-praline-rose)"
            style={{ flexShrink: 0, marginTop: 2 }}
          />
          <p style={{ fontSize: "0.68rem", color: "var(--color-praline-muted)", lineHeight: 1.5 }}>
            <strong style={{ color: "var(--color-praline-rose)" }}>Privacidad protegida.</strong> Tus
            datos son tratados bajo la <strong>LOPDP Ecuador</strong>. Solo procesamos tu pedido.
          </p>
        </div>
      </div>

      {/* Fixed confirm button */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: 430,
          padding: "1rem 1.25rem 1.5rem",
          background: "linear-gradient(to top, var(--color-praline-bg) 60%, transparent)",
          zIndex: 50,
        }}
      >
        {submitError && (
          <div
            role="alert"
            style={{
              color: "var(--color-praline-rose)",
              fontSize: "0.8rem",
              textAlign: "center",
              marginBottom: "0.5rem",
            }}
          >
            {submitError}
          </div>
        )}
        <button
          type="button"
          className="btn-primary"
          onClick={handleConfirm}
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          style={{ gap: "0.5rem", opacity: isSubmitting ? 0.7 : 1 }}
        >
          <CheckCircle size={17} />
          {isSubmitting ? "Enviando pedido..." : "Confirmar y enviar a cocina"}
        </button>
      </div>
    </div>
  );
}
