import { PackageX } from "lucide-react";
import type { OrderItem as OrderItemType } from "../types";
import { cn } from "@/lib/utils";

interface Props {
  item: OrderItemType;
  onOutOfStock?: () => void;
}

export function OrderItem({ item, onOutOfStock }: Props) {
  return (
    <li
      className={cn(
        "flex items-start justify-between gap-3 border-b border-dashed border-[var(--border)] pb-4 last:border-0 last:pb-0",
        item.isNew && "animate-[order-item-flash_0.8s_ease-out_2]",
      )}
    >
      <div className="flex min-w-0 flex-1 items-start gap-3.5">
        {/* Qty bubble */}
        <span
          aria-label={`Cantidad: ${item.quantity}`}
          className="flex size-7 flex-shrink-0 items-center justify-center rounded-lg bg-[color-mix(in_oklch,var(--praline)_10%,transparent)] text-[13px] font-bold text-[var(--praline)]"
        >
          {item.quantity}
        </span>

        {/* Name + modifiers */}
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[var(--foreground)]">{item.name}</p>
          {item.modifiers.length > 0 && (
            <p className="mt-0.5 text-[11.5px] leading-snug text-[var(--muted-foreground)]">
              {item.modifiers.join(" · ")}
            </p>
          )}
          {item.dietaryFlags.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-1">
              {item.dietaryFlags.map((flag) => (
                <span
                  key={flag}
                  className="rounded-full bg-[color-mix(in_oklch,var(--sem-warn)_15%,transparent)] px-2 py-0.5 text-[10px] font-semibold text-[var(--sem-warn)]"
                >
                  {flag}
                </span>
              ))}
            </div>
          )}
          {item.isNew && (
            <span className="mt-1 inline-block rounded-full bg-[color-mix(in_oklch,var(--praline)_15%,transparent)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[var(--praline)]">
              Nuevo
            </span>
          )}
        </div>
      </div>

      {/* Right side: out-of-stock button + status dot */}
      <div className="flex flex-shrink-0 flex-col items-end gap-1.5 pt-0.5">
        {onOutOfStock && (
          <button
            onClick={onOutOfStock}
            aria-label={`Marcar ${item.name} como agotado`}
            title="Agotado"
            className={cn(
              "flex size-6 items-center justify-center rounded-lg border border-[var(--border)] transition-colors",
              "hover:border-[var(--sem-alert)] hover:bg-[color-mix(in_oklch,var(--sem-alert)_10%,transparent)] hover:text-[var(--sem-alert)]",
              "focus-visible:outline-2 focus-visible:outline-[var(--sem-alert)]",
              "text-[var(--muted-foreground)]",
            )}
          >
            <PackageX className="size-3.5" aria-hidden />
          </button>
        )}
        <span
          aria-label={item.status === "ready" ? "Listo" : "Pendiente"}
          className={cn(
            "size-3 rounded-full ring-2 ring-white/70",
            item.status === "ready" ? "bg-[var(--sem-ok)]" : "bg-[var(--crema)]",
          )}
        />
      </div>
    </li>
  );
}
