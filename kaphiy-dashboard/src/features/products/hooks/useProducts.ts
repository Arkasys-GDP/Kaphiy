"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { fetcher } from "@/src/shared/api/fetcher";
import { useAuthStore } from "@/src/features/auth/store/authSlice";
import type { Product } from "../types";
import type { ProductInput } from "../lib/schema";

const KEY = ["products"] as const;

export function useProductsQuery() {
  return useQuery<Product[]>({
    queryKey: KEY,
    queryFn: () => fetcher<Product[]>("/products"),
    staleTime: 60_000,
  });
}

export function useCreateProduct() {
  const qc = useQueryClient();
  const token = useAuthStore((s) => s.token);

  return useMutation<Product, Error, ProductInput>({
    mutationFn: (input) =>
      fetcher<Product>("/products", {
        method: "POST",
        body: JSON.stringify(serialize(input)),
        token: token ?? undefined,
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  });
}

export function useUpdateProduct() {
  const qc = useQueryClient();
  const token = useAuthStore((s) => s.token);

  return useMutation<Product, Error, { id: number; input: Partial<ProductInput> }>({
    mutationFn: ({ id, input }) =>
      fetcher<Product>(`/products/${id}`, {
        method: "PATCH",
        body: JSON.stringify(serialize(input)),
        token: token ?? undefined,
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  const token = useAuthStore((s) => s.token);

  return useMutation<void, Error, number>({
    mutationFn: (id) =>
      fetcher<void>(`/products/${id}`, {
        method: "DELETE",
        token: token ?? undefined,
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  });
}
/** Trim empty optional fields before sending to backend. */
function serialize(input: Partial<ProductInput>): unknown {
  const out: Record<string, unknown> = { ...input };
  if (out.aiDescription === "") out.aiDescription = undefined;
  if (out.imageUrl === "") out.imageUrl = undefined;
  return out;
}
