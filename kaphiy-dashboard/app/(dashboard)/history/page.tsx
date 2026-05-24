"use client"

import { useState } from "react"
import { format, parseISO } from "date-fns"
import { es } from "date-fns/locale"
import {
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Loader2,
} from "lucide-react"
import { useOrderHistory } from "@/src/features/orders/hooks/useOrderHistory"
import { cn } from "@/lib/utils"
import type { Order } from "@/src/features/orders/types"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const PAGE_LIMIT = 20

export default function HistoryPage() {
  const [page, setPage] = useState(1)
  const { data, isLoading, isError } = useOrderHistory(page, PAGE_LIMIT)

  return (
    <main
      role="main"
      aria-label="Historial de pedidos"
      className="flex flex-1 flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="flex shrink-0 items-end justify-between px-7 pt-4 pb-2.5">
        <div>
          <h1 className="font-display text-lg font-bold text-foreground">
            Historial
          </h1>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            Pedidos entregados hoy
          </p>
        </div>
        {data && (
          <span className="text-[11px] font-semibold text-muted-foreground">
            {data.total} pedido{data.total !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-7 pb-10">
        {isLoading && (
          <div className="flex items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="size-6 animate-spin" aria-hidden />
            <span className="ml-2 text-sm">Cargando historial…</span>
          </div>
        )}

        {isError && (
          <div
            role="alert"
            className="mt-4 rounded-xl border border-(--sem-alert)/30 bg-[color-mix(in_oklch,var(--sem-alert)_8%,transparent)] px-5 py-4 text-sm text-sem-alert"
          >
            No se pudo cargar el historial. Verifica tu conexión.
          </div>
        )}

        {data && data.orders.length === 0 && (
          <div
            role="status"
            className="flex flex-col items-center justify-center gap-3 py-20 text-muted-foreground"
          >
            <ClipboardCheck className="size-10 stroke-[1.4]" aria-hidden />
            <p className="text-xs">Sin pedidos entregados hoy</p>
          </div>
        )}

        {data && data.orders.length > 0 && (
          <Table className="table-fixed border-separate border-spacing-y-1.5 text-sm">
            <TableHeader>
              <TableRow className="border-0 text-left text-[10px] font-semibold tracking-widest text-muted-foreground uppercase hover:bg-transparent">
                <TableHead className="h-auto w-23 border-0 py-1 pl-4 pr-3 text-muted-foreground">
                  Pedido
                </TableHead>
                <TableHead className="h-auto w-40 border-0 py-1 px-3 text-muted-foreground">
                  Mesa
                </TableHead>
                <TableHead className="h-auto border-0 py-1 px-3 text-muted-foreground">
                  Productos
                </TableHead>
                <TableHead className="h-auto w-22 border-0 py-1 pr-4 pl-3 text-right text-muted-foreground">
                  Hora
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.orders.map((order) => (
                <HistoryRow key={order.id} order={order} />
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Pagination */}
      {data && data.totalPages > 1 && (
        <div
          aria-label="Paginación"
          className="flex shrink-0 items-center justify-center gap-3 border-t border-border py-3"
        >
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            aria-label="Página anterior"
            className={cn(
              "flex size-8 items-center justify-center rounded-lg border border-border transition-colors",
              "hover:border-praline hover:text-praline",
              "disabled:cursor-not-allowed disabled:opacity-40",
              "focus-visible:outline-2 focus-visible:outline-praline"
            )}
          >
            <ChevronLeft className="size-4" aria-hidden />
          </button>

          <span className="min-w-20 text-center text-xs font-medium text-muted-foreground">
            {page} / {data.totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
            disabled={page === data.totalPages}
            aria-label="Página siguiente"
            className={cn(
              "flex size-8 items-center justify-center rounded-lg border border-border transition-colors",
              "hover:border-praline hover:text-praline",
              "disabled:cursor-not-allowed disabled:opacity-40",
              "focus-visible:outline-2 focus-visible:outline-praline"
            )}
          >
            <ChevronRight className="size-4" aria-hidden />
          </button>
        </div>
      )}
    </main>
  )
}

function HistoryRow({ order }: { order: Order }) {
  let timeStr = "—"
  try {
    timeStr = format(parseISO(order.createdAt), "HH:mm", { locale: es })
  } catch {
    // malformed date — leave as default
  }

  const productSummary = order.items
    .map((i) => `${i.quantity}× ${i.name}`)
    .join(", ")

  return (
    <TableRow className="group border-0 bg-card/90 shadow-[0_10px_24px_rgba(0,0,0,0.14)] transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:bg-card/95">
      <TableCell className="w-23 rounded-l-xl py-3 pl-4 pr-3 font-mono text-xs font-medium text-foreground">
        {order.orderNumber}
      </TableCell>
      <TableCell className="w-40 py-3 px-3 font-semibold text-foreground">
        Mesa {order.tableNumber}
      </TableCell>
      <TableCell className="py-3 px-3 text-muted-foreground">
        <span className="block truncate">{productSummary}</span>
      </TableCell>
      <TableCell className="w-22 rounded-r-xl py-3 pr-4 pl-3 text-right font-mono text-xs text-muted-foreground">
        {timeStr}
      </TableCell>
    </TableRow>
  )
}