/** Shared UUID + session helpers for PWA. */

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function generateUUID(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/** Return existing chat session id from localStorage, or create + persist new one. */
export function getOrCreateChatSessionId(): string {
  if (typeof window === "undefined") return generateUUID();
  let sid = localStorage.getItem("chat_session_id");
  if (!sid || !UUID_RE.test(sid)) {
    sid = generateUUID();
    localStorage.setItem("chat_session_id", sid);
  }
  return sid;
}

/** Clear all order/session data — call after order delivered/cancelled. */
export function clearOrderSession(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("chat_session_id");
  localStorage.removeItem("chat_messages");
  localStorage.removeItem("current_order");
  localStorage.removeItem("last_order_id");
}
