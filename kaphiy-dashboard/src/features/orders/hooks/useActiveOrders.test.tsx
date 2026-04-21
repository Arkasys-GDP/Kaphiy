import { describe, it, expect, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { makeTestQueryClient } from "@/src/test/renderWithProviders";
import { useActiveOrders } from "./useActiveOrders";
import { useKaphiyStore } from "../store";
import { useAuthStore } from "@/src/features/auth/store/authSlice";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: vi.fn() }),
  usePathname: () => "/orders",
}));

function wrapper({ children }: { children: React.ReactNode }) {
  const qc = makeTestQueryClient();
  return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
}

describe("useActiveOrders", () => {
  it("is disabled when no token", () => {
    useAuthStore.setState({ token: null, isAuthenticated: false });

    const { result } = renderHook(() => useActiveOrders(), { wrapper });
    expect(result.current.fetchStatus).toBe("idle");
  });

  it("fetches orders and hydrates Zustand store", async () => {
    useAuthStore.setState({ token: "mock-token", isAuthenticated: true });

    const { result } = renderHook(() => useActiveOrders(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const orders = useKaphiyStore.getState().orders;
    const stats = useKaphiyStore.getState().stats;

    expect(orders.length).toBeGreaterThan(0);
    // All orders from MOCK_ORDERS seed have kitchen_status IN_PREP or WAITING
    expect(orders.every((o) => o.status !== undefined)).toBe(true);
    // Stats populated
    expect(stats?.completedToday).toBeDefined();
  });

  it("maps WAITING DB status to PENDING frontend status", async () => {
    useAuthStore.setState({ token: "mock-token", isAuthenticated: true });

    const { result } = renderHook(() => useActiveOrders(), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const orders = useKaphiyStore.getState().orders;
    // MOCK_ORDERS has orders with kitchen_status WAITING — should adapt to PENDING
    const hasNoPending = orders.every((o) => o.status !== "PENDING");
    // At least one order should NOT be PENDING (we have IN_PREP in seed too)
    expect(hasNoPending).toBe(false);
  });
});
