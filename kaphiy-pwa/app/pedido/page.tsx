"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, CheckCircle, CreditCard, Banknote, Minus, Plus, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createOrder } from "@/lib/api";

type PaymentMethod = "qr" | "cash";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

const IVA_RATE = 0.15;

const PAYMENT_OPTIONS: { id: PaymentMethod; label: string; Icon: typeof CreditCard }[] = [
  { id: "qr",   label: "Transferencia / QR", Icon: CreditCard },
  { id: "cash", label: "Efectivo en caja",   Icon: Banknote   },
];

function QRPlaceholder() {
  return (
    <div
      style={{
        width: 140,
        height: 140,
        background: "#fff",
        borderRadius: 12,
        padding: 10,
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: 2,
      }}
    >
      {Array.from({ length: 49 }).map((_, i) => {
        const filled =
          (i % 7 < 3 && i < 21) ||
          (i % 7 > 3 && i < 21) ||
          (i % 7 < 3 && i > 27) ||
          i === 24 ||
          (i % 3 === 0 && i > 20 && i < 28) ||
          (i % 5 === 0 && i > 21);
        return (
          <div
            key={i}
            style={{ borderRadius: 2, background: filled ? "#1a1a1a" : "transparent" }}
          />
        );
      })}
    </div>
  );
}

function ConfirmationScreen({ total, onBack }: { total: number; onBack: () => void }) {
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
      <div style={{ fontSize: "4rem" }}>✅</div>
      <h1 className="section-title" style={{ fontSize: "1.8rem" }}>¡Pedido enviado!</h1>
      <p style={{ color: "var(--color-praline-muted)", lineHeight: 1.5, maxWidth: 280 }}>
        Tu pedido fue enviado a cocina. Te avisaremos cuando esté listo. ☕
      </p>
      <div className="praline-card" style={{ padding: "1rem 1.5rem" }}>
        <p style={{ fontSize: "0.8rem", color: "var(--color-praline-muted)" }}>
          Total <strong style={{ color: "var(--color-praline-primary-dark)" }}>${total.toFixed(2)}</strong>
        </p>
      </div>
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
  
  const [items, setItems] = useState<OrderItem[]>([]);
  const [aiNotes, setAiNotes] = useState<string[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("qr");
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("current_order");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setItems(parsed.cartItems || []);
        setAiNotes(parsed.aiNotes || []);
        
        const initialQtys: Record<string, number> = {};
        (parsed.cartItems || []).forEach((item: OrderItem) => {
          initialQtys[item.id] = item.qty || 1;
        });
        setQuantities(initialQtys);
      } catch (e) {
        console.error(e);
      }
    }
    setLoading(false);
  }, []);

  const updateQty = (id: string, delta: number) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(1, (prev[id] ?? 1) + delta) }));
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const payload = {
        items: items.map(item => ({
          productId: parseInt(item.id, 10),
          quantity: quantities[item.id] ?? 1,
          aiNotes: aiNotes.length > 0 ? aiNotes.join(", ") : undefined,
        })),
        paymentStatus: 'PENDING' as const,
        kitchenStatus: 'PENDING' as const,
      };
      
      const chatSessionId = localStorage.getItem("chat_session_id");
      if (chatSessionId) {
        (payload as any).chatSessionId = chatSessionId;
      }

      await createOrder(payload);
      setConfirmed(true);
    } catch (err) {
      console.error(err);
      setSubmitError("Error al enviar el pedido. Por favor intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * (quantities[item.id] ?? 1), 0);
  const iva      = subtotal * IVA_RATE;
  const total    = subtotal + iva;

  if (loading) return null;

  if (confirmed) {
    return <ConfirmationScreen total={total} onBack={() => {
      localStorage.removeItem("current_order");
      localStorage.removeItem("chat_messages");
      localStorage.removeItem("chat_session_id");
      router.push("/inicio");
    }} />;
  }

  if (items.length === 0) {
    return (
      <div style={{ minHeight: "100dvh", background: "var(--color-praline-bg)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", gap: "1.5rem", textAlign: "center" }}>
        <span style={{ fontSize: "4rem" }}>🛒</span>
        <h2 className="section-title">Tu carrito está vacío</h2>
        <p style={{ color: "var(--color-praline-muted)", fontSize: "0.9rem" }}>Aún no has confirmado un pedido con KAPHY.</p>
        <Link href="/chat" style={{ textDecoration: "none" }}>
          <button className="btn-primary" style={{ padding: "0.8rem 2rem" }}>Volver al Chat</button>
        </Link>
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
                    }}
                  >
                    ☕
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
            { label: "Subtotal",  value: subtotal },
            { label: "IVA 15%",   value: iva      },
            { label: "Servicio",  value: 0        },
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
      </div>
    </div>
  );
}
