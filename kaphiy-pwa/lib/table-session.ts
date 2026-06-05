/**
 * QR → mesa wiring.
 * QRs printed for each table encode a URL like `/inicio?tableId=3`.
 * On scan we persist the id in sessionStorage so subsequent navigation
 * (menu, chat, pedido) reuses it without re-reading the URL.
 */

const KEY = "current_table_id";

/** Read tableId persisted from a previous QR scan. Returns null if none. */
export function getCurrentTableId(): number | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(KEY);
  if (!raw) return null;
  const n = parseInt(raw, 10);
  return Number.isFinite(n) && n > 0 ? n : null;
}

/** Persist tableId for the session. */
export function setCurrentTableId(id: number): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(KEY, String(id));
}

/** Clear stored table — call when order delivered or new session. */
export function clearCurrentTableId(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(KEY);
}

/**
 * Parse `tableId` from a URLSearchParams-like object and persist if valid.
 * Returns the parsed id or null when missing/invalid.
 */
export function hydrateTableIdFromParams(params: { get(name: string): string | null }): number | null {
  const raw = params.get("tableId") ?? params.get("table");
  if (!raw) return null;
  const n = parseInt(raw, 10);
  if (!Number.isFinite(n) || n <= 0) return null;
  setCurrentTableId(n);
  return n;
}
