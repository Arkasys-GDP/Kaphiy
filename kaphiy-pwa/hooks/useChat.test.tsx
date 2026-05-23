import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { server } from "@/test/mocks/server";
import { useChat } from "./useChat";

const WEBHOOK = "/api/n8n-webhook";

beforeEach(() => {
  localStorage.clear();
});

describe("useChat (integration with localStorage + webhook)", () => {
  it("creates a new sessionId on first mount", async () => {
    server.use(http.options(WEBHOOK, () => new HttpResponse(null, { status: 204 })));
    const { result } = renderHook(() => useChat());
    await waitFor(() => expect(result.current.isInitialized).toBe(true));

    const sid = localStorage.getItem("chat_session_id");
    // Hook generates RFC 4122 UUID (crypto.randomUUID with fallback).
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    expect(sid).toMatch(uuidRegex);
    expect(result.current.messages).toEqual([]);
  });

  it("recovers existing session + messages from localStorage", async () => {
    // Pre-seed with a valid UUID — hook rejects invalid IDs and regenerates.
    const seededUuid = "f47ac10b-58cc-4372-a567-0e02b2c3d479";
    localStorage.setItem("chat_session_id", seededUuid);
    localStorage.setItem(
      "chat_messages",
      JSON.stringify([
        { id: "1", role: "user", text: "hola", time: "10:00" },
      ]),
    );
    server.use(http.options(WEBHOOK, () => new HttpResponse(null, { status: 204 })));

    const { result } = renderHook(() => useChat());
    await waitFor(() => expect(result.current.isInitialized).toBe(true));

    expect(localStorage.getItem("chat_session_id")).toBe(seededUuid);
    expect(result.current.messages).toHaveLength(1);
    expect(result.current.messages[0].text).toBe("hola");
  });

  it("sets isOnline=true when webhook OPTIONS succeeds", async () => {
    server.use(http.options(WEBHOOK, () => new HttpResponse(null, { status: 204 })));
    const { result } = renderHook(() => useChat());
    await waitFor(() => expect(result.current.isOnline).toBe(true));
  });

  it("sets isOnline=false when webhook OPTIONS fails", async () => {
    server.use(http.options(WEBHOOK, () => HttpResponse.error()));
    const { result } = renderHook(() => useChat());
    await waitFor(() => expect(result.current.isInitialized).toBe(true));
    expect(result.current.isOnline).toBe(false);
  });

  it("appends user message and AI reply when handleSend succeeds", async () => {
    server.use(
      http.options(WEBHOOK, () => new HttpResponse(null, { status: 204 })),
      http.post(WEBHOOK, () =>
        HttpResponse.text(JSON.stringify({ response: "Hola, soy Kaphiy." })),
      ),
    );

    const { result } = renderHook(() => useChat());
    await waitFor(() => expect(result.current.isInitialized).toBe(true));

    await act(async () => {
      await result.current.handleSend("Quiero un latte");
    });

    expect(result.current.messages).toHaveLength(2);
    expect(result.current.messages[0]).toMatchObject({
      role: "user",
      text: "Quiero un latte",
    });
    expect(result.current.messages[1]).toMatchObject({
      role: "ai",
      text: "Hola, soy Kaphiy.",
    });
  });

  it("parses JSON wrapped in markdown code block", async () => {
    server.use(
      http.options(WEBHOOK, () => new HttpResponse(null, { status: 204 })),
      http.post(WEBHOOK, () =>
        HttpResponse.text('```json\n{"response":"Listo"}\n```'),
      ),
    );

    const { result } = renderHook(() => useChat());
    await waitFor(() => expect(result.current.isInitialized).toBe(true));

    await act(async () => {
      await result.current.handleSend("hola");
    });

    expect(result.current.messages[1].text).toBe("Listo");
  });

  it("stores current_order in localStorage when orderReady=true", async () => {
    server.use(
      http.options(WEBHOOK, () => new HttpResponse(null, { status: 204 })),
      http.post(WEBHOOK, () =>
        HttpResponse.text(
          JSON.stringify({
            response: "Pedido listo",
            orderReady: true,
            cartItems: [{ productId: 1, quantity: 2 }],
            aiNotes: ["sin azúcar"],
          }),
        ),
      ),
    );

    const { result } = renderHook(() => useChat());
    await waitFor(() => expect(result.current.isInitialized).toBe(true));

    await act(async () => {
      await result.current.handleSend("Confirmar pedido");
    });

    const saved = JSON.parse(localStorage.getItem("current_order") ?? "{}");
    expect(saved).toEqual({
      cartItems: [{ productId: 1, quantity: 2 }],
      aiNotes: ["sin azúcar"],
    });
    expect(result.current.messages.at(-1)?.isOrderReady).toBe(true);
  });

  it("appends connection-error message when webhook fails", async () => {
    server.use(
      http.options(WEBHOOK, () => new HttpResponse(null, { status: 204 })),
      http.post(WEBHOOK, () => HttpResponse.error()),
    );
    const errSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { result } = renderHook(() => useChat());
    await waitFor(() => expect(result.current.isInitialized).toBe(true));

    await act(async () => {
      await result.current.handleSend("hola");
    });

    expect(result.current.messages.at(-1)).toMatchObject({
      role: "ai",
      text: expect.stringMatching(/error de conexión/i),
    });
    errSpy.mockRestore();
  });

  it("persists messages to localStorage after send", async () => {
    server.use(
      http.options(WEBHOOK, () => new HttpResponse(null, { status: 204 })),
      http.post(WEBHOOK, () =>
        HttpResponse.text(JSON.stringify({ response: "ok" })),
      ),
    );
    const { result } = renderHook(() => useChat());
    await waitFor(() => expect(result.current.isInitialized).toBe(true));

    await act(async () => {
      await result.current.handleSend("test");
    });

    const persisted = JSON.parse(localStorage.getItem("chat_messages") ?? "[]");
    expect(persisted).toHaveLength(2);
  });

  it("ignores empty handleSend calls", async () => {
    server.use(http.options(WEBHOOK, () => new HttpResponse(null, { status: 204 })));
    const { result } = renderHook(() => useChat());
    await waitFor(() => expect(result.current.isInitialized).toBe(true));

    await act(async () => {
      await result.current.handleSend("");
    });

    expect(result.current.messages).toHaveLength(0);
  });
});
