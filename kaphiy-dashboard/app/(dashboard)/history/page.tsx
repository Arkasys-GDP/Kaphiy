"use client";

import { useState } from "react";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeft, ChevronRight, ClipboardCheck, Loader2 } from "lucide-react";
import { useOrderHistory } from "@/src/features/orders/hooks/useOrderHistory";
import { cn } from "@/lib/utils";
import type { Order } from "@/src/features/orders/types";

const PAGE_LIMIT = 20;

export default function HistoryPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useOrderHistory(page, PAGE_LIMIT);

  return (
    <main
      role="main"
      aria-label="Historial de pedidos"
      className="flex flex-1 flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="flex flex-shrink-0 items-end justify-between px-7 pb-2.5 pt-4">
        <div>
          <h1 className="font-display text-lg font-bold text-[var(--foreground)]">
            Historial
          </h1>
          <p className="mt-0.5 text-[11px] text-[var(--muted-foreground)]">
            Pedidos entregados hoy
          </p>
        </div>
        {data && (
          <span className="text-[11px] font-semibold text-[var(--muted-foreground)]">
            {data.total} pedido{data.total !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-7 pb-10">
        {isLoading && (
          <div className="flex items-center justify-center py-20 text-[var(--muted-foreground)]">
            <Loader2 className="size-6 animate-spin" aria-hidden />
            <span className="ml-2 text-sm">Cargando historial…</span>
          </div>
        )}

        {isError && (
          <div
            role="alert"
            className="mt-4 rounded-xl border border-[var(--sem-alert)]/30 bg-[color-mix(in_oklch,var(--sem-alert)_8%,transparent)] px-5 py-4 text-sm text-[var(--sem-alert)]"
          >
            No se pudo cargar el historial. Verifica tu conexión.
          </div>
        )}

        {data && data.orders.length === 0 && (
          <div
            role="status"
            className="flex flex-col items-center justify-center gap-3 py-20 text-[var(--muted-foreground)]"
          >
            <ClipboardCheck className="size-10 stroke-[1.4]" aria-hidden />
            <p className="text-xs">Sin pedidos entregados hoy</p>
          </div>
        )}

        {data && data.orders.length > 0 && (
          <table className="w-full border-separate border-spacing-y-1.5 text-sm">
            <thead>
              <tr className="text-left text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">
                <th className="py-1 pl-4">Pedido</th>
                <th className="py-1">Mesa</th>
                <th className="py-1">Productos</th>
                <th className="py-1">Hora</th>
              </tr>
            </thead>
            <tbody>
              {data.orders.map((order) => (
                <HistoryRow key={order.id} order={order} />
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {data && data.totalPages > 1 && (
        <div
          aria-label="Paginación"
          className="flex flex-shrink-0 items-center justify-center gap-3 border-t border-[var(--border)] py-3"
        >
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            aria-label="Página anterior"
            className={cn(
              "flex size-8 items-center justify-center rounded-lg border border-[var(--border)] transition-colors",
              "hover:border-[var(--praline)] hover:text-[var(--praline)]",
              "disabled:cursor-not-allowed disabled:opacity-40",
              "focus-visible:outline-2 focus-visible:outline-[var(--praline)]",
            )}
          >
            <ChevronLeft className="size-4" aria-hidden />
          </button>

          <span className="min-w-[5rem] text-center text-xs font-medium text-[var(--muted-foreground)]">
            {page} / {data.totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
            disabled={page === data.totalPages}
            aria-label="Página siguiente"
            className={cn(
              "flex size-8 items-center justify-center rounded-lg border border-[var(--border)] transition-colors",
              "hover:border-[var(--praline)] hover:text-[var(--praline)]",
              "disabled:cursor-not-allowed disabled:opacity-40",
              "focus-visible:outline-2 focus-visible:outline-[var(--praline)]",
            )}
          >
            <ChevronRight className="size-4" aria-hidden />
          </button>
        </div>
      )}
    </main>
  );
}

function HistoryRow({ order }: { order: Order }) {
  let timeStr = "—";
  try {
    timeStr = format(parseISO(order.createdAt), "HH:mm", { locale: es });
  } catch {
    // malformed date — leave as default
  }

  const productSummary = order.items
    .map((i) => `${i.quantity}× ${i.name}`)
    .join(", ");

  return (
    <tr className="group ticket-card !mb-0 text-sm">
      <td className="rounded-l-xl py-3 pl-4 font-mono text-xs font-medium text-[var(--praline)]">
        {order.orderNumber}
      </td>
      <td className="py-3 font-semibold text-[var(--foreground)]">
        Mesa {order.tableNumber}
      </td>
      <td className="max-w-[280px] truncate py-3 text-[var(--muted-foreground)]">
        {productSummary}
      </td>
      <td className="rounded-r-xl py-3 pr-4 text-right font-mono text-xs text-[var(--muted-foreground)]">
        {timeStr}
      </td>
    </tr>
  );
}
