"use client";

import { useEffect, useState } from "react";
import type { KitchenStatus, PaymentStatus } from "@/lib/order-status";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export interface PolledOrder {
  id: number;
  kitchenStatus: KitchenStatus;
  paymentStatus: PaymentStatus;
  total: string | number | null;
  createdAt: string;
  orderItems: {
    quantity: number;
    product: { name: string; price: string | number } | null;
  }[];
}

interface State {
  order: PolledOrder | null;
  loading: boolean;
  error: boolean;
}

/**
 * Poll /orders/:id every `intervalMs`. Pauses when tab hidden — saves battery + backend load.
 * Cleans up listeners + timers on unmount or orderId change.
 */
export function useOrderPolling(orderId: number | null, intervalMs = 4000): State {
  const [state, setState] = useState<State>({ order: null, loading: !!orderId, error: false });

  useEffect(() => {
    if (!orderId) {
      setState({ order: null, loading: false, error: false });
      return;
    }

    let active = true;
    let timer: ReturnType<typeof setInterval> | null = null;

    const fetchOnce = async () => {
      try {
        const res = await fetch(`${BASE_URL}/orders/${orderId}`, { cache: "no-store" });
        if (!res.ok) {
          if (active) setState((s) => ({ ...s, loading: false, error: true }));
          return;
        }
        const data: PolledOrder = await res.json();
        if (active) setState({ order: data, loading: false, error: false });
      } catch {
        if (active) setState((s) => ({ ...s, loading: false, error: true }));
      }
    };

    const start = () => {
      if (timer) return;
      fetchOnce();
      timer = setInterval(fetchOnce, intervalMs);
    };

    const stop = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    const onVisibility = () => {
      if (document.visibilityState === "visible") start();
      else stop();
    };

    if (document.visibilityState === "visible") start();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      active = false;
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [orderId, intervalMs]);

  return state;
}
