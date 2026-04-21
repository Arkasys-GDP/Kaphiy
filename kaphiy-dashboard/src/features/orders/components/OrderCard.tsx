"use client";

import { useCallback } from "react";
import { CheckCheck } from "lucide-react";
import type { Order } from "../types";
import { semaphoreOf } from "../lib/semaphore";
import { useElapsedTime } from "../hooks/useElapsedTime";
import { useKaphiyStore } from "../store";
import { useOrderActions } from "../hooks/useOrdersSocket";
import { TimerBadge } from "./TimerBadge";
import { OrderItem } from "./OrderItem";
import { cn } from "@/lib/utils";

interface Props {
  order: Order;
  onStart: (id: string) => Promise<boolean>;
  onReady: (id: string) => Promise<boolean>;
  onOutOfStock: (orderId: string, itemId: string) => Promise<boolean>;
}

export function OrderCard({ order, onStart, onReady, onOutOfStock }: Props) {
  const warnSecs = useKaphiyStore((s) => s.semaphoreWarnSecs);
  const alertSecs = useKaphiyStore((s) => s.semaphoreAlertSecs);

  const elapsed = useElapsedTime(order.createdAt);
  const sem = semaphoreOf(elapsed, { warn: warnSecs, alert: alertSecs });
  const isAlert = sem === "alert";

  const { optimisticTransition } = useOrderActions();

  const handleAction = useCallback(() => {
    if (order.status === "PENDING") {
      optimisticTransition(order.id, "PENDING", "IN_PREP", () => onStart(order.id));
    } else if (order.status === "IN_PREP") {
      optimisticTransition(order.id, "IN_PREP", "READY", () => onReady(order.id));
    }
  }, [order.id, order.status, optimisticTransition, onStart, onReady]);

  const handleOutOfStock = useCallback(
    (itemId: string) => {
      const from = order.status as "PENDING" | "IN_PREP";
      optimisticTransition(order.id, from, "OUT_OF_STOCK", () =>
        onOutOfStock(order.id, itemId),
      );
    },
    [order.id, order.status, optimisticTransition, onOutOfStock],
  );

  const actionLabel =
    order.status === "PENDING"
      ? "Iniciar preparación"
      : order.status === "IN_PREP"
        ? "Listo para entregar"
        : null;

  return (
    <article
      aria-label={`Pedido ${order.orderNumber} — Mesa ${order.tableNumber}`}
      className={cn(
        "ticket-card relative mb-6 flex w-full flex-col break-inside-avoid",
        isAlert && "ring-2 ring-[var(--sem-alert)]/40",
      )}
    >
      {/* Accent bar — color coded by semaphore */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-x-0 top-0 h-1.5 rounded-t-[var(--radius-ticket)]",
          sem === "ok" && "bg-[var(--praline)]",
          sem === "warn" && "bg-[var(--sem-warn)]",
          sem === "alert" && "bg-[var(--sem-alert)]",
        )}
      />

      {/* Card head */}
      <header className="flex items-start justify-between border-b border-[var(--border)] px-6 pb-4 pt-7">
        <div className="flex flex-col gap-1">
          {/* Mesa number — signature display type */}
          <div className="flex items-baseline gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--praline)]">
              Mesa
            </span>
            <span className="order-number">{order.tableNumber}</span>
          </div>
          <p className="text-[11px] font-medium text-[var(--muted-foreground)]">
            {order.orderNumber} · {order.paxCount} persona{order.paxCount !== 1 ? "s" : ""}
          </p>
          {/* Status chip */}
          <span
            className={cn(
              "mt-1 inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide",
              order.status === "PENDING" &&
                "bg-[color-mix(in_oklch,var(--crema)_25%,transparent)] text-[var(--crema)]",
              order.status === "IN_PREP" &&
                "bg-[color-mix(in_oklch,var(--praline)_15%,transparent)] text-[var(--praline)]",
              order.status === "READY" &&
                "bg-[color-mix(in_oklch,var(--sem-ok)_18%,transparent)] text-[var(--sem-ok)]",
            )}
          >
            {order.status === "PENDING" && "Pendiente"}
            {order.status === "IN_PREP" && "En preparación"}
            {order.status === "READY" && "Listo ✓"}
          </span>
        </div>

        <TimerBadge createdAt={order.createdAt} />
      </header>

      {/* Products */}
      <ul
        aria-label="Productos del pedido"
        className="flex flex-1 flex-col gap-4 px-6 py-5"
      >
        {order.items.map((item) => (
          <OrderItem
            key={item.id}
            item={item}
            onOutOfStock={
              order.status === "PENDING" || order.status === "IN_PREP"
                ? () => handleOutOfStock(item.id)
                : undefined
            }
          />
        ))}
      </ul>

      {/* Notes */}
      {order.notes && (
        <p className="mx-6 mb-4 rounded-lg bg-[color-mix(in_oklch,var(--sem-warn)_8%,transparent)] px-3 py-2 text-[11px] leading-snug text-[var(--muted-foreground)]">
          <span className="font-bold text-[var(--sem-warn)]">Nota IA: </span>
          {order.notes}
        </p>
      )}

      {/* Divider */}
      <hr className="ticket-divider mx-6" />

      {/* Footer actions */}
      <footer className="flex gap-2 px-6 py-4">
        {actionLabel && (
          <button
            onClick={handleAction}
            aria-label={actionLabel}
            className={cn(
              "flex flex-1 cursor-pointer items-center justify-center gap-2.5 rounded-[18px] px-4 py-4 text-sm font-bold transition-all",
              "border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)]",
              "hover:border-[var(--praline)] hover:bg-[var(--praline)] hover:text-white",
              "active:translate-y-0.5",
              "focus-visible:outline-2 focus-visible:outline-[var(--praline)]",
              order.status === "IN_PREP" &&
                "border-[var(--sem-ok)] bg-[color-mix(in_oklch,var(--sem-ok)_10%,transparent)] text-[var(--sem-ok)] hover:bg-[var(--sem-ok)] hover:text-white",
            )}
          >
            <CheckCheck className="size-4.5" aria-hidden />
            {actionLabel}
          </button>
        )}

      </footer>
    </article>
  );
}
