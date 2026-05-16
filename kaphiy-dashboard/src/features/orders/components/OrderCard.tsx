"use client";

import { useCallback } from "react";
import {
  CheckCheck,
  PackageCheck,
  BadgeCheck,
  CircleDashed,
  CircleSlash,
} from "lucide-react";
import type { Order, PaymentStatus } from "../types";
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
  onDeliver: (id: string) => Promise<boolean>;
  onOutOfStock: (orderId: string, itemId: string) => Promise<boolean>;
}

export function OrderCard({
  order,
  onStart,
  onReady,
  onDeliver,
  onOutOfStock,
}: Props) {
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
    } else if (order.status === "READY") {
      optimisticTransition(order.id, "READY", "DELIVERED", () => onDeliver(order.id));
    }
  }, [order.id, order.status, optimisticTransition, onStart, onReady, onDeliver]);

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
        : order.status === "READY"
          ? "Marcar entregado"
          : null;

  const ActionIcon =
    order.status === "READY" ? PackageCheck : CheckCheck;

  return (
    <article
      aria-label={`Pedido ${order.orderNumber} — Mesa ${order.tableNumber}`}
      className={cn(
        "ticket-card relative mb-6 flex w-full flex-col break-inside-avoid",
        isAlert && "ring-2 ring-(--sem-alert)/40",
      )}
    >
      {/* Accent bar — color coded by semaphore */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-x-0 top-0 h-1.5 rounded-t-ticket",
          sem === "ok" && "bg-praline",
          sem === "warn" && "bg-sem-warn",
          sem === "alert" && "bg-sem-alert",
        )}
      />

      {/* Card head */}
      <header className="flex items-start justify-between border-b border-border px-6 pb-4 pt-7">
        <div className="flex flex-col gap-1">
          {/* Mesa number — signature display type */}
          <div className="flex items-baseline gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-praline">
              Mesa
            </span>
            <span className="order-number">{order.tableNumber}</span>
          </div>
          <p className="text-[11px] font-medium text-muted-foreground">
            {order.orderNumber} · {order.paxCount} persona{order.paxCount !== 1 ? "s" : ""}
          </p>
          {/* Chips: kitchen status + payment status */}
          <div className="mt-1 flex flex-wrap items-center gap-1.5">
            <span
              className={cn(
                "inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                order.status === "PENDING" &&
                  "bg-[color-mix(in_oklch,var(--crema)_45%,transparent)] text-ink",
                order.status === "IN_PREP" &&
                  "bg-[color-mix(in_oklch,var(--praline)_18%,transparent)] text-praline",
                order.status === "READY" &&
                  "bg-[color-mix(in_oklch,var(--sem-ok)_20%,transparent)] text-sem-ok",
              )}
            >
              {order.status === "PENDING" && "Pendiente"}
              {order.status === "IN_PREP" && "En preparación"}
              {order.status === "READY" && "Listo ✓"}
            </span>
            <PaymentBadge status={order.paymentStatus} total={order.total} />
          </div>
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
        <p className="mx-6 mb-4 rounded-lg bg-[color-mix(in_oklch,var(--sem-warn)_8%,transparent)] px-3 py-2 text-[11px] leading-snug text-muted-foreground">
          <span className="font-bold text-sem-warn">Nota IA: </span>
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
              "border border-border bg-card text-foreground",
              "hover:border-praline hover:bg-praline hover:text-white",
              "active:translate-y-0.5",
              "focus-visible:outline-2 focus-visible:outline-praline",
              order.status === "IN_PREP" &&
                "border-sem-ok bg-[color-mix(in_oklch,var(--sem-ok)_10%,transparent)] text-sem-ok hover:bg-sem-ok hover:text-white",
              order.status === "READY" &&
                "border-praline bg-praline text-paper hover:brightness-110",
            )}
          >
            <ActionIcon className="size-4.5" aria-hidden />
            {actionLabel}
          </button>
        )}

      </footer>
    </article>
  );
}

// ── Payment badge — read-only context for the kitchen ────────
// Payment is owned by the customer PWA + cashier flow. Cocina only sees state.

const PRICE_FORMATTER = new Intl.NumberFormat("es-EC", {
  style: "currency",
  currency: "USD",
});

function PaymentBadge({ status, total }: { status: PaymentStatus; total: number }) {
  const config = {
    PAID: {
      Icon: BadgeCheck,
      label: "Pagado",
      cls: "bg-[color-mix(in_oklch,var(--sem-ok)_18%,transparent)] text-[var(--sem-ok)]",
    },
    PENDING: {
      Icon: CircleDashed,
      label: "Por cobrar",
      cls: "bg-[color-mix(in_oklch,var(--rose)_18%,transparent)] text-[var(--rose)]",
    },
    CANCELLED: {
      Icon: CircleSlash,
      label: "Cancelado",
      cls: "bg-[color-mix(in_oklch,var(--muted-foreground)_15%,transparent)] text-[var(--muted-foreground)] line-through",
    },
  } as const;

  const c = config[status];

  return (
    <span
      title={`${c.label} · ${PRICE_FORMATTER.format(total)}`}
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        c.cls,
      )}
    >
      <c.Icon className="size-3" aria-hidden />
      {c.label}
      <span className="font-mono font-bold normal-case opacity-80">
        {PRICE_FORMATTER.format(total)}
      </span>
    </span>
  );
}
