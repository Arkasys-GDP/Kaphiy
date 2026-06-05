import type { KitchenStatus, PaymentStatus } from "./order-status";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

// ─── Backend response types ───────────────────────────────────────────────────

export interface ApiCategory {
  id: number;
  name: string;
  description?: string;
}

export interface ApiIngredient {
  id: number;
  name: string;
}

export interface ApiProductIngredient {
  id: number;
  isOptional: boolean;
  ingredient: ApiIngredient;
}

export interface ApiProduct {
  id: number;
  legacyId?: number | null;
  name: string;
  price: number | string;
  aiDescription?: string;
  isAvailable: boolean;
  imageUrl?: string;
  categoryId: number;
  category: ApiCategory;
  productIngredients: ApiProductIngredient[];
}

export interface ApiOrder {
  id: number;
  kitchenStatus: KitchenStatus;
  paymentStatus: PaymentStatus;
  total: string | number | null;
  createdAt: string;
}

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`API error ${res.status} en ${path}`);
  return res.json() as Promise<T>;
}

// ─── Products ─────────────────────────────────────────────────────────────────

export async function getProducts(): Promise<ApiProduct[]> {
  return get<ApiProduct[]>("/products");
}

export async function getProduct(id: number): Promise<ApiProduct> {
  return get<ApiProduct>(`/products/${id}`);
}

// ─── Categories ───────────────────────────────────────────────────────────────

export async function getCategories(): Promise<ApiCategory[]> {
  return get<ApiCategory[]>("/categories");
}

// ─── Tables ───────────────────────────────────────────────────────────────────

export interface ApiTable {
  id: number;
  tableName: string;
  status: "Available" | "Occupied" | "Reserved";
}

export async function getTables(): Promise<ApiTable[]> {
  return get<ApiTable[]>("/tables");
}

/**
 * Pick a random table id from the available list. Used in demos so each order
 * lands on a different table, mimicking concurrent customers.
 * Falls back to id 1 if list empty or fetch fails.
 */
export async function pickRandomTableId(): Promise<number> {
  try {
    const tables = await getTables();
    if (tables.length === 0) return 1;
    return tables[Math.floor(Math.random() * tables.length)].id;
  } catch {
    return 1;
  }
}

// ─── Orders ───────────────────────────────────────────────────────────────────

export interface CreateOrderDto {
  tableId: number;
  chatSessionId?: string;
  paymentCode?: string;
  paymentStatus?: PaymentStatus;
  kitchenStatus?: KitchenStatus;
  items: {
    productId: number;
    quantity: number;
    aiNotes?: string;
  }[];
}

export async function createOrder(data: CreateOrderDto): Promise<ApiOrder> {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`API error ${res.status} al crear la orden`);
  return res.json();
}

// ─── Adapters ─────────────────────────────────────────────────────────────────

const CATEGORY_EMOJIS: Record<string, string> = {
  café: "☕",
  cafe: "☕",
  coffee: "☕",
  brunch: "🍳",
  pasteles: "🥐",
  pastelería: "🥐",
  pasteleria: "🥐",
  galletas: "🍪",
  bebidas: "🧋",
  especiales: "🍵",
  postres: "🍰",
  snacks: "🥪",
  default: "🍽️",
};

/** Pick best-match emoji for category name. Exposed for use across pages. */
export function getCategoryEmoji(name: string): string {
  const key = name.toLowerCase();
  const match = Object.entries(CATEGORY_EMOJIS).find(([k]) => key.includes(k));
  return match?.[1] ?? CATEGORY_EMOJIS.default;
}

/**
 * Dedupe categories by lowercase name — backend may return repeats when
 * join with products explodes the result set. Keeps first occurrence.
 */
export function uniqueCategories(cats: ApiCategory[]): ApiCategory[] {
  const seen = new Set<string>();
  const out: ApiCategory[] = [];
  for (const c of cats) {
    const key = c.name.trim().toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(c);
  }
  return out;
}

export function adaptProduct(p: ApiProduct) {
  const categoryKey = p.category?.name?.toLowerCase() ?? "default";
  const emoji = getCategoryEmoji(p.category?.name ?? "default");

  const ingredientNames = p.productIngredients?.map((pi) => pi.ingredient.name) ?? [];

  const badges: string[] = [];
  const badgeTypes: ("green" | "rose" | "muted" | "dark")[] = [];
  if (ingredientNames.some((n) => /avena|oat/i.test(n))) {
    badges.push("Oat Milk");
    badgeTypes.push("green");
  }
  if (!p.isAvailable) {
    badges.push("No disponible");
    badgeTypes.push("muted");
  }

  return {
    id: String(p.id),
    productId: p.id,
    legacyId: p.legacyId ?? null,
    name: p.name,
    category: categoryKey,
    categoryLabel: p.category?.name ?? "Menú",
    emoji,
    description: ingredientNames.join(" · ") || p.aiDescription || "",
    price: parseFloat(String(p.price)),
    badges,
    badgeTypes,
    fullDescription: p.aiDescription ?? `${p.name} de Praliné Coffee House.`,
    tags: ingredientNames.slice(0, 4),
    tagEmojis: ingredientNames.slice(0, 4).map(() => "✨"),
    sizes: [] as string[],
    temps: [] as string[],
    isAvailable: p.isAvailable,
    imageUrl: p.imageUrl || undefined,
  };
}
