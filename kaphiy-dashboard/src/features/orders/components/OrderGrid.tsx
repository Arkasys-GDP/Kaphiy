"use client"

import { useKaphiyStore } from "../store"
import { OrderCard } from "./OrderCard"
import { useOrdersSocket } from "../hooks/useOrdersSocket"
import { InboxIcon } from "lucide-react"
import { useMemo } from "react"

interface Props {
  socketUrl: string
  token: string
}

export function OrderGrid({ socketUrl, token }: Props) {
  const allOrders = useKaphiyStore((s) => s.orders)
  const orders = useMemo(
    () =>
      allOrders.filter(
        (o) =>
          o.status === "PENDING" ||
          o.status === "IN_PREP" ||
          o.status === "READY"
      ),
    [allOrders]
  )

  const { startOrder, markReady, markOutOfStock } = useOrdersSocket(socketUrl, token)

  return (
    <main
      role="main"
      aria-label="Pedidos activos"
      className="flex flex-1 flex-col overflow-hidden"
    >
      {/* Grid header */}
      <div className="flex flex-shrink-0 items-end justify-between px-7 pt-4 pb-2.5">
        <div>
          <h1 className="font-display text-lg font-bold text-[var(--foreground)]">
            Pedidos Activos
          </h1>
          <p className="mt-0.5 text-[11px] text-[var(--muted-foreground)]">
            Actualizado en tiempo real · Toca &ldquo;Listo para entregar&rdquo;
            cuando el pedido esté listo
          </p>
        </div>

        {/* Legend */}
        <div
          aria-label="Leyenda de semáforo"
          className="hidden items-center gap-5 sm:flex"
        >
          {[
            { label: "+10 min — Requiere atención", colorVar: "sem-alert" },
            { label: "En tiempo", colorVar: "praline" },
          ].map(({ label, colorVar }) => (
            <div
              key={label}
              className="flex items-center gap-1.5 text-[11px] text-[var(--muted-foreground)]"
            >
              <span
                aria-hidden
                className="h-3.5 w-3.5 rounded"
                style={{
                  border: `2.5px solid var(--${colorVar})`,
                  background: `color-mix(in oklch, var(--${colorVar}) 12%, transparent)`,
                }}
              />
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Masonry grid */}
      <div
        className="columns-[minmax(min(100%,330px),1fr)] gap-6 overflow-y-auto px-7 pb-10"
        style={{ columnFill: "balance" }}
      >
        {orders.length === 0 ? (
          <EmptyState />
        ) : (
          orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onStart={startOrder}
              onReady={markReady}
              onOutOfStock={markOutOfStock}
            />
          ))
        )}
      </div>
    </main>
  )
}

function EmptyState() {
  return (
    <div
      role="status"
      aria-label="Sin pedidos activos"
      className="flex min-h-[260px] flex-col items-center justify-center gap-3 rounded-[20px] border-2 border-dashed border-[var(--border)] text-[var(--muted-foreground)]"
    >
      <InboxIcon
        className="size-9 stroke-[var(--border)] stroke-[1.4]"
        aria-hidden
      />
      <p className="text-xs">Sin pedidos activos</p>
    </div>
  )
}
