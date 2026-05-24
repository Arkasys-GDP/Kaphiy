"use client";

import { useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetcher } from "@/src/shared/api/fetcher";
import { useKaphiyStore } from "../store";
import { useAuthStore } from "@/src/features/auth/store/authSlice";
import type { Order, OrderStats } from "../types";

interface ActiveOrdersResponse {
  orders: Order[];
  stats: OrderStats;
}

export function useActiveOrders() {
  const token = useAuthStore((s) => s.token);
  const setOrders = useKaphiyStore((s) => s.setOrders);
  const setStats = useKaphiyStore((s) => s.setStats);

  const query = useQuery({
    queryKey: ["orders", "active"],
    enabled: !!token,
    queryFn: () =>
      fetcher<ActiveOrdersResponse>("/orders/active", { token: token! }),
    staleTime: 15_000,
  });

  useEffect(() => {
    if (query.data) {
      setOrders(query.data.orders);
      setStats(query.data.stats);
    }
  }, [query.data, setOrders, setStats]);

  return query;
}

export function usePayOrder() {
  const token = useAuthStore((s) => s.token);
  return useMutation({
    mutationFn: (orderId: string) =>
      fetcher(`/orders/${orderId}/payment`, {
        method: "PATCH",
        token: token!,
        body: JSON.stringify({ paymentStatus: "PAID" }),
      }),
  });
}
