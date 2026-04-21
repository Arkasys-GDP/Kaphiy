"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/src/shared/api/fetcher";
import { adaptOrders, adaptStats, type DbOrder } from "@/src/shared/api/adapter";
import { useKaphiyStore } from "../store";
import { useAuthStore } from "@/src/features/auth/store/authSlice";

interface ActiveOrdersResponse {
  orders: DbOrder[];
  stats: { in_prep: number; alerts: number; completed_today: number; avg_time_minutes: number };
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
      setOrders(adaptOrders(query.data.orders));
      setStats(adaptStats(query.data.stats));
    }
  }, [query.data, setOrders, setStats]);

  return query;
}
