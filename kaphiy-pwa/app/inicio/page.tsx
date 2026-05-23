"use client";

import { useState, useEffect } from "react";
import { MapPin, Search, ChevronRight, Sparkles, TrendingUp } from "lucide-react";
import { BottomNav } from "@/components/pwa/BottomNav";
import { FeaturedCard } from "@/components/pwa/FeaturedCard";
import { ProductListItem } from "@/components/pwa/ProductListItem";
import { getProducts, getCategories, adaptProduct, ApiCategory } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";

type AdaptedProduct = ReturnType<typeof adaptProduct>;

const CATEGORY_EMOJIS: Record<string, string> = {
  café: "☕",
  bebidas: "🧋",
  postres: "🍰",
  snacks: "🥪",
  especiales: "✨",
  default: "🍽️",
};

function getCategoryEmoji(name: string): string {
  const key = Object.keys(CATEGORY_EMOJIS).find((k) => name.toLowerCase().includes(k));
  return key ? CATEGORY_EMOJIS[key] : CATEGORY_EMOJIS.default;
}

export default function InicioPage() {
  const router = useRouter();
  const [products, setProducts] = useState<AdaptedProduct[]>([]);
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    Promise.all([getProducts(), getCategories()])
      .then(([prods, cats]) => {
        setProducts(prods.map(adaptProduct));
        setCategories(cats);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const aiRecommendations = products.slice(0, 3).map((p, i) => ({
    product: p,
    label: i === 0 ? "Recomendado" : i === 1 ? "Maridaje" : "Tendencia",
    labelType: (["history", "pairing", "trending"] as const)[i],
  }));

  const popularItems = products.slice(0, 6);

  return (
    <div className="page-screen">
      {/* ── Header ── */}
      <div className="page-header">
        <div className="page-header__top">
          <div className="page-header__location">
            <MapPin size={13} color="currentColor" />
            Baños de Agua Santa, Ecuador
          </div>
        </div>

        <div className="page-header__brand">
          <h1 className="page-header__brand-name">PRALINÉ</h1>
          <p className="page-header__brand-sub">COFFEE HOUSE · SPECIALTY</p>
        </div>

        <Link href="/menu" style={{ textDecoration: "none" }}>
          <div className="search-bar" style={{ background: "rgba(255,249,244,0.12)", borderColor: "rgba(255,249,244,0.2)" }}>
            <Search size={14} color="rgba(255,249,244,0.6)" />
            <span style={{ color: "rgba(255,249,244,0.5)", fontSize: "0.85rem" }}>
              Buscar bebidas, pasteles...
            </span>
          </div>
        </Link>
      </div>

      {/* ── Error State ── */}
      {error && (
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <p style={{ color: "var(--color-praline-rose)" }}>
            No se pudieron cargar los datos. Revisa tu conexión.
          </p>
        </div>
      )}

      {/* ── Categorías ── */}
      <div style={{ padding: "1.25rem 1.25rem 0.5rem" }}>
        <p className="section-label">MENÚ</p>
        <div style={{ display: "flex", gap: "0.75rem", overflowX: "auto" }} className="hide-scrollbar">
          {loading
            ? [1, 2, 3, 4].map((i) => (
                <div key={i} style={{ width: 60, height: 80, background: "#fff9f4", borderRadius: 20, opacity: 0.5 }} />
              ))
            : categories.map((cat) => {
                const catKey = cat.name.toLowerCase();
                return (
                  <div
                    key={cat.id}
                    className="category-chip"
                    onClick={() => router.push(`/menu?category=${encodeURIComponent(catKey)}`)}
                  >
                    <div className="category-chip-icon inactive">
                      <span style={{ fontSize: "1.3rem" }}>{getCategoryEmoji(cat.name)}</span>
                    </div>
                    <span
                      className="category-chip-label"
                      style={{ fontWeight: 400 }}
                    >
                      {cat.name}
                    </span>
                  </div>
                );
              })}
        </div>
      </div>

      {/* ── Recomendaciones IA ── */}
      <div style={{ padding: "1.25rem 0 0" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingInline: "1.25rem",
            marginBottom: "0.75rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span className="ai-badge">✦ GEMINI IA</span>
            <h2 className="section-title">Para ti hoy</h2>
          </div>
          <Link
            href="/menu"
            style={{
              fontSize: "0.75rem",
              color: "var(--color-praline-rose)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.2rem",
            }}
          >
            Ver todo <ChevronRight size={13} />
          </Link>
        </div>

        <div
          style={{ display: "flex", gap: "0.75rem", paddingInline: "1.25rem", overflowX: "auto" }}
          className="hide-scrollbar"
        >
          {loading ? (
            <div style={{ width: 180, height: 220, background: "#fff9f4", borderRadius: 20, opacity: 0.5 }} />
          ) : aiRecommendations.length > 0 ? (
            aiRecommendations.map((rec) => (
              <FeaturedCard
                key={rec.product.id}
                id={rec.product.id}
                emoji={rec.product.emoji}
                name={rec.product.name}
                description={rec.product.description}
                price={rec.product.price}
                label={rec.label}
                labelType={rec.labelType}
              />
            ))
          ) : !error && (
            <div style={{ width: "100%", textAlign: "center", padding: "1rem", color: "var(--color-praline-muted)", fontSize: "0.85rem" }}>
              Recomendaciones no disponibles actualmente ✦
            </div>
          )}
        </div>
      </div>

      {/* ── Popular ahora ── */}
      <div style={{ padding: "1.5rem 1.25rem 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.75rem" }}>
          <h2 className="section-title">Popular ahora</h2>
          <TrendingUp size={15} color="var(--color-praline-rose)" />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          {loading ? (
            [1, 2, 3].map((i) => (
              <div key={i} style={{ height: 76, background: "#fff9f4", borderRadius: 20, opacity: 0.5 }} />
            ))
          ) : popularItems.length > 0 ? (
            popularItems.map((item) => (
              <ProductListItem
                key={item.id}
                id={item.id}
                emoji={item.emoji}
                name={item.name}
                description={item.description}
                price={item.price}
                badges={item.badges}
                badgeTypes={item.badgeTypes as any}
              />
            ))
          ) : !error && (
            <p style={{ textAlign: "center", color: "var(--color-praline-muted)", fontSize: "0.85rem" }}>
              No hay productos populares ☕
            </p>
          )}
        </div>
      </div>

      {/* ── Botón flotante Gemini ── */}
      <div
        style={{
          position: "fixed",
          bottom: "5.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 40,
          width: "100%",
          maxWidth: 430,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          id="hablar-gemini-btn"
          className="btn-gemini-fab"
          onClick={() => router.push("/chat")}
        >
          <Sparkles size={16} />
          Hablar con Gemini
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
