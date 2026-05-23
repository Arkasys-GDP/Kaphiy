"use client";

import { useState, useEffect } from "react";
import { MapPin, Search, ChevronDown, ChevronRight } from "lucide-react";
import { BottomNav } from "@/components/pwa/BottomNav";
import { ProductListItem } from "@/components/pwa/ProductListItem";
import { getProducts, getCategories, adaptProduct, ApiCategory } from "@/lib/api";
import { useSearchParams, useRouter } from "next/navigation";

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

export function MenuContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialCategory = searchParams.get("category");

  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<AdaptedProduct[]>([]);
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(initialCategory);
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (cat: string) => {
    setCollapsedCategories(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

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

  const filtered = search.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase())
      )
    : null;

  const productsToGroup = activeCategory && !search.trim()
    ? products.filter((p) => p.categoryLabel.toLowerCase().includes(activeCategory) || p.category.toLowerCase().includes(activeCategory))
    : products;

  const grouped = productsToGroup.reduce<Record<string, AdaptedProduct[]>>((acc, p) => {
    const key = p.categoryLabel;
    if (!acc[key]) acc[key] = [];
    acc[key].push(p);
    return acc;
  }, {});

  return (
    <div className="page-screen">
      {/* ── Header (mismo diseño que inicio) ── */}
      <div className="page-header page-header--compact">
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

        {/* Search activo con input */}
        <div className="search-bar" style={{ background: "rgba(255,249,244,0.12)", borderColor: "rgba(255,249,244,0.2)" }}>
          <Search size={14} color="rgba(255,249,244,0.6)" />
          <input
            type="text"
            placeholder="Buscar en el menú..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#fff9f4",
              fontSize: "0.85rem",
              width: "100%",
              fontFamily: "var(--font-inter), 'Inter', sans-serif",
            }}
          />
        </div>
      </div>

      {/* ── Error banner ── */}
      {error && (
        <div
          style={{
            background: "rgba(162,117,114,0.12)",
            borderBottom: "1px solid rgba(162,117,114,0.2)",
            padding: "0.5rem 1.25rem",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "0.7rem", color: "var(--color-praline-rose)" }}>
            ⚠️ No se pudo conectar con el servidor · Por favor, intenta más tarde
          </p>
        </div>
      )}

      {/* ── Categorías (Filtro) ── */}
      {!loading && !error && (
        <div style={{ padding: "1.25rem 1.25rem 0", background: "var(--color-praline-bg)" }}>
          <div style={{ display: "flex", gap: "0.75rem", overflowX: "auto" }} className="hide-scrollbar">
            <div
              className="category-chip"
              onClick={() => { setActiveCategory(null); router.replace("/menu"); }}
            >
              <div className={`category-chip-icon ${!activeCategory ? "active" : "inactive"}`}>
                <span style={{ fontSize: "1.3rem" }}>📋</span>
              </div>
              <span className="category-chip-label" style={{ fontWeight: !activeCategory ? 600 : 400 }}>
                Todos
              </span>
            </div>
            {categories.map((cat) => {
              const catKey = cat.name.toLowerCase();
              const isActive = activeCategory === catKey;
              return (
                <div
                  key={cat.id}
                  className="category-chip"
                  onClick={() => { setActiveCategory(catKey); router.replace(`/menu?category=${encodeURIComponent(catKey)}`); }}
                >
                  <div className={`category-chip-icon ${isActive ? "active" : "inactive"}`}>
                    <span style={{ fontSize: "1.3rem" }}>{getCategoryEmoji(cat.name)}</span>
                  </div>
                  <span className="category-chip-label" style={{ fontWeight: isActive ? 600 : 400 }}>
                    {cat.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Contenido ── */}
      <div style={{ padding: "1.25rem" }}>
        {loading ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} style={{ height: 76, background: "#fff9f4", borderRadius: 20, opacity: 0.5 }} />
            ))}
          </div>
        ) : filtered ? (
          <div>
            <p className="section-label">
              {filtered.length} resultado{filtered.length !== 1 ? "s" : ""} para &ldquo;{search}&rdquo;
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {filtered.map((prod) => (
                <ProductListItem
                  key={prod.id}
                  id={prod.id}
                  emoji={prod.emoji}
                  name={prod.name}
                  description={prod.description}
                  price={prod.price}
                  badges={prod.badges}
                  badgeTypes={prod.badgeTypes as any}
                />
              ))}
              {filtered.length === 0 && (
                <p style={{ textAlign: "center", color: "var(--color-praline-muted)", fontSize: "0.875rem", padding: "2rem" }}>
                  No se encontraron productos ☕
                </p>
              )}
            </div>
          </div>
        ) : (
          Object.entries(grouped).map(([categoryLabel, items]) => {
            const isCollapsed = collapsedCategories[categoryLabel] || false;
            return (
              <div key={categoryLabel} style={{ marginBottom: "1.5rem" }}>
                <div 
                  onClick={() => toggleCategory(categoryLabel)}
                  style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "0.5rem", 
                    marginBottom: "0.75rem",
                    cursor: "pointer",
                    userSelect: "none"
                  }}
                >
                  <span style={{ fontSize: "1.2rem" }}>{items[0]?.emoji ?? "☕"}</span>
                  <h2 className="section-title" style={{ margin: 0, flex: 1 }}>{categoryLabel}</h2>
                  {isCollapsed ? <ChevronRight size={20} color="#8a6555" /> : <ChevronDown size={20} color="#8a6555" />}
                </div>
                {!isCollapsed && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    {items.map((prod) => (
                      <ProductListItem
                        key={prod.id}
                        id={prod.id}
                        emoji={prod.emoji}
                        name={prod.name}
                        description={prod.description}
                        price={prod.price}
                        badges={prod.badges}
                        badgeTypes={prod.badgeTypes as any}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      <BottomNav />
    </div>
  );
}
