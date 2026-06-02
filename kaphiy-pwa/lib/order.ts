export interface ProductCandidate {
  id: string | number;
  productId?: string | number | null;
  legacyId?: string | number | null;
  name: string;
  price: number;
  imageUrl?: string;
  emoji?: string;
}

export interface PendingOrderItem {
  id: string;
  productId: number | null;
  name: string;
  price: number;
  qty: number;
  imageUrl?: string;
  emoji?: string;
}

export interface OrderPayloadItem {
  productId: number;
  quantity: number;
  aiNotes?: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function normalizeText(value: unknown): string {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

function numberFrom(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(String(value).replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function intFrom(value: unknown): number | null {
  const parsed = numberFrom(value);
  if (parsed === null) return null;
  const intValue = Math.trunc(parsed);
  return intValue > 0 ? intValue : null;
}

function pick(record: Record<string, unknown>, keys: string[]): unknown {
  for (const key of keys) {
    if (record[key] !== undefined && record[key] !== null && record[key] !== "") {
      return record[key];
    }
  }
  return undefined;
}

function nestedProduct(record: Record<string, unknown>): Record<string, unknown> | null {
  const directProduct = record.product;
  if (isRecord(directProduct)) return directProduct;

  const dashboardProduct = record.products;
  if (isRecord(dashboardProduct)) return dashboardProduct;

  return null;
}

function rawProductId(record: Record<string, unknown>): number | null {
  const product = nestedProduct(record);
  return intFrom(
    pick(record, [
      "productId",
      "product_id",
      "productID",
      "idProducto",
      "productoId",
      "producto_id",
      "id_producto",
      "idProduct",
      "id",
    ]) ?? pick(product ?? {}, ["id", "productId", "product_id"]),
  );
}

function rawLegacyId(record: Record<string, unknown>): number | null {
  const product = nestedProduct(record);
  return intFrom(
    pick(record, ["legacyId", "legacy_id"]) ?? pick(product ?? {}, ["legacyId", "legacy_id"]),
  );
}

function rawName(record: Record<string, unknown>): string {
  const product = nestedProduct(record);
  const value =
    pick(record, ["productName", "product_name", "nombre", "name", "producto", "item"]) ??
    pick(product ?? {}, ["name", "productName", "product_name", "nombre"]);
  return String(value ?? "").trim();
}

function rawPrice(record: Record<string, unknown>): number {
  const product = nestedProduct(record);
  return (
    numberFrom(
      pick(record, ["unitPrice", "unit_price", "price", "precio", "total"]) ??
        pick(product ?? {}, ["unitPrice", "unit_price", "price", "precio"]),
    ) ?? 0
  );
}

function rawQuantity(record: Record<string, unknown>): number {
  return (
    intFrom(pick(record, ["qty", "quantity", "cantidad", "amount", "count", "unidades"])) ?? 1
  );
}

function isGenericName(name: string): boolean {
  const normalized = normalizeText(name);
  return !normalized || ["producto", "item", "pedido", "orden"].includes(normalized);
}

function productNumericId(product: ProductCandidate): number | null {
  return intFrom(product.productId ?? product.id);
}

function findProduct(raw: Record<string, unknown>, products: ProductCandidate[]): ProductCandidate | null {
  const id = rawProductId(raw);
  const legacyId = rawLegacyId(raw);
  const name = rawName(raw);
  const normalizedName = normalizeText(name);
  const price = rawPrice(raw);

  if (id) {
    const byId = products.find((product) => productNumericId(product) === id);
    if (byId) return byId;
  }

  if (legacyId) {
    const byLegacyId = products.find((product) => intFrom(product.legacyId) === legacyId);
    if (byLegacyId) return byLegacyId;
  }

  if (normalizedName && !isGenericName(name)) {
    const exact = products.find((product) => normalizeText(product.name) === normalizedName);
    if (exact) return exact;

    const partial = products.find((product) => {
      const productName = normalizeText(product.name);
      return (
        normalizedName.length >= 4 &&
        (productName.includes(normalizedName) || normalizedName.includes(productName))
      );
    });
    if (partial) return partial;
  }

  if (price > 0) {
    const samePrice = products.filter((product) => Math.abs(Number(product.price) - price) < 0.01);
    if (samePrice.length === 1) return samePrice[0] ?? null;
  }

  return null;
}

export function normalizeCartItems(
  rawItems: unknown[],
  products: ProductCandidate[],
): PendingOrderItem[] {
  return rawItems.map((rawItem, index) => {
    const record = isRecord(rawItem) ? rawItem : {};
    const product = findProduct(record, products);
    const productId = product ? productNumericId(product) : rawProductId(record);
    const fallbackName = rawName(record);
    const fallbackPrice = rawPrice(record);
    const id = productId ? String(productId) : `invalid-${index}`;

    return {
      id,
      productId,
      name: product?.name ?? (fallbackName || "Producto"),
      price: product ? Number(product.price) : fallbackPrice,
      qty: rawQuantity(record),
      imageUrl: product?.imageUrl,
      emoji: product?.emoji,
    };
  });
}

export function getInvalidOrderItems(items: PendingOrderItem[]): PendingOrderItem[] {
  return items.filter((item) => !item.productId || item.price <= 0 || isGenericName(item.name));
}

export function buildOrderItems(
  items: PendingOrderItem[],
  quantities: Record<string, number>,
  aiNotes: string[],
): { orderItems: OrderPayloadItem[]; invalidItems: PendingOrderItem[] } {
  const invalidItems = getInvalidOrderItems(items);
  const notes = aiNotes.length > 0 ? aiNotes.join(", ") : undefined;

  return {
    invalidItems,
    orderItems: items
      .filter((item) => !invalidItems.includes(item))
      .map((item) => ({
        productId: item.productId as number,
        quantity: quantities[item.id] ?? item.qty ?? 1,
        aiNotes: notes,
      })),
  };
}
