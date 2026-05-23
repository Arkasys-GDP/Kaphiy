
const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

// ─── Tipos que devuelve el backend ────────────────────────────────────────────

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
  name: string;
  price: number | string; 
  aiDescription?: string;
  isAvailable: boolean;
  categoryId: number;
  category: ApiCategory;
  productIngredients: ApiProductIngredient[];
}


async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    cache: "no-store", 
  });
  if (!res.ok) {
    throw new Error(`API error ${res.status} en ${path}`);
  }
  return res.json() as Promise<T>;
}

// ─── Endpoints de Productos ───────────────────────────────────────────────────

export async function getProducts(): Promise<ApiProduct[]> {
  return get<ApiProduct[]>("/products");
}

export async function getProduct(id: number): Promise<ApiProduct> {
  return get<ApiProduct>(`/products/${id}`);
}

// ─── Endpoints de Categorías ──────────────────────────────────────────────────

export async function getCategories(): Promise<ApiCategory[]> {
  return get<ApiCategory[]>("/categories");
}

// ─── Endpoints de Órdenes ─────────────────────────────────────────────────────

export interface CreateOrderDto {
  tableId?: number;
  chatSessionId?: string;
  paymentCode?: string;
  paymentStatus?: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  kitchenStatus?: 'PENDING' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED';
  items: {
    productId: number;
    quantity: number;
    aiNotes?: string;
  }[];
}

export async function createOrder(data: CreateOrderDto): Promise<any> {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error(`API error ${res.status} al crear la orden`);
  }
  return res.json();
}

// ─── Utilidades de adaptación de datos ────────────────────────────────────────

export function adaptProduct(p: ApiProduct) {
  const categoryEmojis: Record<string, string> = {
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
    default: "🍽️",
  };
  const categoryKey = p.category?.name?.toLowerCase() ?? "default";
  const emoji =
    Object.entries(categoryEmojis).find(([k]) => categoryKey.includes(k))?.[1] ??
    categoryEmojis.default;

  const ingredientNames = p.productIngredients?.map((pi) => pi.ingredient.name) ?? [];

  const badges: string[] = [];
  const badgeTypes: string[] = [];
  if (ingredientNames.some((n) => n.toLowerCase().includes("avena") || n.toLowerCase().includes("oat"))) {
    badges.push("Oat Milk");
    badgeTypes.push("green");
  }
  if (!p.isAvailable) {
    badges.push("No disponible");
    badgeTypes.push("muted");
  }

  return {
    id: String(p.id),
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
  };
}
