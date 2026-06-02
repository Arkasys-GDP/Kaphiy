"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Volume2, VolumeX } from "lucide-react"
import { ConnectionBadge } from "./ConnectionBadge"
import { useKaphiyStore } from "@/src/features/orders/store"
import { cn } from "@/lib/utils"

function fmtTime() {
  return new Date().toLocaleTimeString("es-EC", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })
}

function LiveClock() {
  const [time, setTime] = useState(fmtTime)

  useEffect(() => {
    const id = setInterval(() => setTime(fmtTime()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <time
      className="tabular font-mono text-2xl font-bold tracking-wide text-ink dark:text-paper"
      aria-label={`Hora actual: ${time}`}
    >
      {time || "–:–:–"}
    </time>
  )
}

export function TopBar() {
  const muted = useKaphiyStore((s) => s.muted)
  const toggleMute = useKaphiyStore((s) => s.toggleMute)
  const alerts = useKaphiyStore((s) => s.stats.alerts)

  return (
    <header
      role="banner"
      className="flex h-17 shrink-0 items-center gap-4 bg-praline px-7 text-paper"
    >
      {/* Brand */}
      <Image
        src="/logoCB.png"
        alt="Praliné Coffee House"
        width={200}
        height={80}
        priority
        className="h-9 w-auto object-contain"
      />

      {/* Divider */}
      <span aria-hidden className="h-8 w-px bg-white/20" />

      <span className="text-xs font-semibold tracking-widest text-white/60 uppercase">
        Dashboard de Cocina
      </span>

      <div className="ml-auto flex items-center gap-4">
        {/* Alerts pill — solid cream for high contrast on any TopBar bg */}
        {alerts > 0 && (
          <span
            aria-live="polite"
            aria-atomic
            className="inline-flex items-center gap-1.5 rounded-full bg-paper px-3 py-1 text-xs font-bold tracking-wide shadow-sm ring-1 ring-black/5"
            style={{ color: "var(--sem-alert)" }}
          >
            <span
              aria-hidden
              className="size-1.5 animate-pulse rounded-full"
              style={{ background: "var(--sem-alert)" }}
            />
            {alerts} alerta{alerts !== 1 ? "s" : ""}
          </span>
        )}

        <ConnectionBadge />

        {/* Mute toggle */}
        <button
          onClick={toggleMute}
          aria-label={muted ? "Activar sonido" : "Silenciar"}
          className={cn(
            "rounded-full p-2 transition-colors",
            "hover:bg-white/15 focus-visible:outline-white",
            muted && "opacity-50"
          )}
        >
          {muted ? (
            <VolumeX className="size-4 text-white" aria-hidden />
          ) : (
            <Volume2 className="size-4 text-white" aria-hidden />
          )}
        </button>

        <LiveClock />
      </div>
    </header>
  )
}
