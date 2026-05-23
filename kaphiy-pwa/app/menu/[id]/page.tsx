"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, MessageSquare } from "lucide-react";
import { getProduct, adaptProduct } from "@/lib/api";
import Link from "next/link";

type AdaptedProduct = ReturnType<typeof adaptProduct>;

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const rawId = typeof params.id === "string" ? params.id : "";

  const [product, setProduct] = useState<AdaptedProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedTemp, setSelectedTemp] = useState(0);

  useEffect(() => {
    const numericId = parseInt(rawId, 10);
    if (!isNaN(numericId)) {
      // ID numérico → buscar en el backend
      getProduct(numericId)
        .then((p) => {
          setProduct(adaptProduct(p));
          setLoading(false);
        })
        .catch(() => {
          setProduct(null);
          setLoading(false);
        });
    } else {
      // ID no válido
      setProduct(null);
      setLoading(false);
    }
  }, [rawId]);

  if (loading) {
    return (
      <div style={{ minHeight: "100dvh", background: "#EFE3D6", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem" }}>
        <span style={{ fontSize: "2.5rem" }}>☕</span>
        <p style={{ fontFamily: "var(--font-inter)", color: "#8a6555", fontSize: "0.875rem" }}>Cargando...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ minHeight: "100dvh", background: "#EFE3D6", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
        <span style={{ fontSize: "3rem" }}>☕</span>
        <p style={{ fontFamily: "var(--font-inter)", color: "#8a6555" }}>Producto no encontrado</p>
        <Link href="/menu">
          <button className="btn-secondary" style={{ width: "auto", padding: "0.5rem 1.5rem" }}>Volver al menú</button>
        </Link>
      </div>
    );
  }

  const badgeColorMap: Record<string, React.CSSProperties> = {
    green: { background: "rgba(169,181,162,0.2)", color: "#4a5e44" },
    rose: { background: "rgba(162,117,114,0.15)", color: "#A27572" },
    muted: { background: "#f0e8de", color: "#8a6555" },
    dark: { background: "#3e3b30", color: "#fff9f4" },
  };

  return (
    <div style={{ minHeight: "100dvh", background: "#EFE3D6", display: "flex", flexDirection: "column" }}>
      {/* Hero */}
      <div style={{ background: "#EFE3D6", height: 260, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", flexShrink: 0 }}>
        <button
          onClick={() => router.back()}
          style={{ position: "absolute", top: "1rem", left: "1rem", width: 38, height: 38, borderRadius: 12, background: "rgba(255,249,244,0.85)", border: "1px solid #d8c8b8", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", backdropFilter: "blur(4px)", zIndex: 10 }}
        >
          <ChevronLeft size={20} color="#3e3b30" />
        </button>
        <div style={{ fontSize: "5rem", lineHeight: 1, filter: "drop-shadow(0 8px 24px rgba(90,58,46,.2))" }}>
          {product.emoji}
        </div>
      </div>

      {/* Detail sheet */}
      <div style={{ flex: 1, background: "#fff9f4", borderRadius: "24px 24px 0 0", padding: "1.5rem 1.25rem 7rem", marginTop: -24, boxShadow: "0 -4px 24px rgba(90,58,46,.1)", overflowY: "auto" }}>
        {/* Badges */}
        {product.badges.length > 0 && (
          <div style={{ display: "flex", gap: "0.4rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
            {product.badges.map((badge, i) => {
              const colors = badgeColorMap[product.badgeTypes[i] ?? "muted"];
              return <span key={badge} className="badge" style={colors}>{badge}</span>;
            })}
          </div>
        )}

        {/* Name + Price */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
          <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "2rem", fontWeight: 700, color: "#3e3b30", lineHeight: 1.15, maxWidth: "65%" }}>
            {product.name}
          </h1>
          <span style={{ fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: "1.4rem", color: "#3e3b30", marginTop: "0.2rem" }}>
            ${product.price.toFixed(2)}
          </span>
        </div>

        {/* Description */}
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.85rem", color: "#8a6555", lineHeight: 1.6, marginBottom: "1.25rem" }}>
          {product.fullDescription}
        </p>

        {/* Ingredients / Info tags */}
        {product.tags.length > 0 && (
          <div style={{ marginBottom: "1.25rem" }}>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.65rem", fontWeight: 600, color: "#8a6555", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.6rem" }}>
              INGREDIENTES
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
              {product.tags.map((tag, i) => (
                <div key={tag} style={{ background: "#f9f1e9", borderRadius: 16, padding: "0.6rem 0.875rem", display: "flex", alignItems: "center", gap: "0.5rem", border: "1px solid #d8c8b8" }}>
                  <span style={{ fontSize: "1rem" }}>{product.tagEmojis[i] ?? "✨"}</span>
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.78rem", fontWeight: 500, color: "#5A3A2E" }}>{tag}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Customization (size/temp) */}
        {(product.sizes.length > 0 || product.temps.length > 0) && (
          <div style={{ marginBottom: "1.5rem" }}>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.65rem", fontWeight: 600, color: "#8a6555", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              PERSONALIZAR
            </p>
            {product.sizes.length > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem", fontWeight: 500, color: "#5A3A2E" }}>Tamaño</span>
                <div className="option-toggle">
                  {product.sizes.map((size, i) => (
                    <button key={size} className={selectedSize === i ? "selected" : ""} onClick={() => setSelectedSize(i)}>{size}</button>
                  ))}
                </div>
              </div>
            )}
            {product.temps.length > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem", fontWeight: 500, color: "#5A3A2E" }}>Temperatura</span>
                <div className="option-toggle">
                  {product.temps.map((temp, i) => (
                    <button key={temp} className={selectedTemp === i ? "selected" : ""} onClick={() => setSelectedTemp(i)}>{temp}</button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* CTA */}
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, padding: "1rem 1.25rem 1.5rem", background: "linear-gradient(to top, #fff9f4 60%, transparent)", zIndex: 50 }}>
        <Link href={`/chat?msg=${encodeURIComponent("Quiero pedir un " + product.name)}`} style={{ textDecoration: "none" }}>
          <button className="btn-primary">
            <MessageSquare size={17} />
            Pedir por Chat con IA
          </button>
        </Link>
      </div>
    </div>
  );
}
