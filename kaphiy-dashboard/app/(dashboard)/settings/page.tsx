"use client";

import { useState } from "react";
import { Bell, BellOff, Sun, Moon, Monitor, Clock } from "lucide-react";
import { useKaphiyStore } from "@/src/features/orders/store";
import { cn } from "@/lib/utils";

const THEME_OPTIONS = [
  { value: "light" as const, label: "Claro", Icon: Sun },
  { value: "dark" as const, label: "Oscuro", Icon: Moon },
  { value: "system" as const, label: "Sistema", Icon: Monitor },
];

export default function SettingsPage() {
  const muted = useKaphiyStore((s) => s.muted);
  const toggleMute = useKaphiyStore((s) => s.toggleMute);
  const semaphoreWarnSecs = useKaphiyStore((s) => s.semaphoreWarnSecs);
  const semaphoreAlertSecs = useKaphiyStore((s) => s.semaphoreAlertSecs);
  const setSemaphoreThresholds = useKaphiyStore((s) => s.setSemaphoreThresholds);
  const theme = useKaphiyStore((s) => s.theme);
  const setTheme = useKaphiyStore((s) => s.setTheme);

  // Local draft — only commit on blur/enter to avoid spammy state writes
  // Initialized once from persisted store; page is freshly mounted each visit
  const [warnDraft, setWarnDraft] = useState(() => String(Math.round(semaphoreWarnSecs / 60)));
  const [alertDraft, setAlertDraft] = useState(() => String(Math.round(semaphoreAlertSecs / 60)));

  function commitThresholds() {
    const warnMin = Math.max(1, Math.min(30, Number(warnDraft) || 5));
    const alertMin = Math.max(warnMin + 1, Math.min(60, Number(alertDraft) || 10));
    setWarnDraft(String(warnMin));
    setAlertDraft(String(alertMin));
    setSemaphoreThresholds(warnMin * 60, alertMin * 60);
  }

  return (
    <main
      role="main"
      aria-label="Ajustes del sistema"
      className="flex flex-1 flex-col overflow-y-auto"
    >
      {/* Header */}
      <div className="px-7 pb-2.5 pt-4">
        <h1 className="font-display text-lg font-bold text-[var(--foreground)]">
          Ajustes
        </h1>
        <p className="mt-0.5 text-[11px] text-[var(--muted-foreground)]">
          Configuración del panel de cocina
        </p>
      </div>

      <div className="flex flex-col gap-6 px-7 pb-10">

        {/* ── Notifications ── */}
        <Section title="Notificaciones">
          <Row
            label="Sonido de nuevos pedidos"
            description={muted ? "Silenciado — no sonará al llegar pedidos" : "Activo — suena al llegar nuevos pedidos"}
          >
            <button
              onClick={toggleMute}
              aria-pressed={muted}
              aria-label={muted ? "Activar sonido" : "Silenciar"}
              className={cn(
                "flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all",
                "focus-visible:outline-2 focus-visible:outline-[var(--praline)]",
                muted
                  ? "border-[var(--border)] bg-[var(--card)] text-[var(--muted-foreground)]"
                  : "border-[var(--praline)] bg-[color-mix(in_oklch,var(--praline)_12%,transparent)] text-[var(--praline)]",
              )}
            >
              {muted
                ? <BellOff className="size-4" aria-hidden />
                : <Bell className="size-4" aria-hidden />}
              {muted ? "Silenciado" : "Activo"}
            </button>
          </Row>
        </Section>

        {/* ── Semaphore thresholds ── */}
        <Section title="Semáforo de tiempo">
          <p className="mb-4 text-[11px] text-[var(--muted-foreground)]">
            El semáforo cambia de color según el tiempo transcurrido. Configura los umbrales en minutos.
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <ThresholdInput
              id="warn-threshold"
              label="Advertencia (amarillo)"
              colorVar="sem-warn"
              value={warnDraft}
              onChange={setWarnDraft}
              onBlur={commitThresholds}
              onKeyDown={(e) => e.key === "Enter" && commitThresholds()}
              min={1}
              max={30}
            />
            <ThresholdInput
              id="alert-threshold"
              label="Alerta (rojo)"
              colorVar="sem-alert"
              value={alertDraft}
              onChange={setAlertDraft}
              onBlur={commitThresholds}
              onKeyDown={(e) => e.key === "Enter" && commitThresholds()}
              min={2}
              max={60}
            />
          </div>
          <ThresholdVisualizer warnSecs={semaphoreWarnSecs} alertSecs={semaphoreAlertSecs} />
        </Section>

        {/* ── Theme ── */}
        <Section title="Apariencia">
          <div className="flex flex-wrap gap-2">
            {THEME_OPTIONS.map(({ value, label, Icon }) => (
              <button
                key={value}
                onClick={() => setTheme(value)}
                aria-pressed={theme === value}
                className={cn(
                  "flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all",
                  "focus-visible:outline-2 focus-visible:outline-[var(--praline)]",
                  theme === value
                    ? "border-[var(--praline)] bg-[color-mix(in_oklch,var(--praline)_12%,transparent)] text-[var(--praline)]"
                    : "border-[var(--border)] bg-[var(--card)] text-[var(--muted-foreground)] hover:border-[var(--praline)]/40 hover:text-[var(--foreground)]",
                )}
              >
                <Icon className="size-4" aria-hidden />
                {label}
              </button>
            ))}
          </div>
        </Section>

      </div>
    </main>
  );
}

// ── Sub-components ──────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="ticket-card px-6 py-5">
      <h2 className="mb-4 text-[11px] font-bold uppercase tracking-widest text-[var(--praline)]">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Row({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-[var(--foreground)]">{label}</p>
        {description && (
          <p className="mt-0.5 text-[11px] text-[var(--muted-foreground)]">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}

interface ThresholdInputProps {
  id: string;
  label: string;
  colorVar: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  min: number;
  max: number;
}

function ThresholdInput({ id, label, colorVar, value, onChange, onBlur, onKeyDown, min, max }: ThresholdInputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)]"
      >
        <span
          aria-hidden
          className="inline-block size-2.5 rounded-full"
          style={{ background: `var(--${colorVar})` }}
        />
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          className={cn(
            "w-20 rounded-xl border border-[var(--border)] bg-[var(--input)] px-3 py-2.5 font-mono text-sm text-[var(--foreground)]",
            "focus:border-[var(--praline)] focus:outline-none",
          )}
        />
        <span className="text-xs text-[var(--muted-foreground)]">min</span>
      </div>
    </div>
  );
}

function ThresholdVisualizer({ warnSecs, alertSecs }: { warnSecs: number; alertSecs: number }) {
  const warnMin = Math.round(warnSecs / 60);
  const alertMin = Math.round(alertSecs / 60);

  return (
    <div className="mt-4 flex items-center gap-1 text-[10px] text-[var(--muted-foreground)]" aria-hidden>
      <Clock className="mr-1 size-3.5 flex-shrink-0" />
      <span>0 min</span>
      <div className="mx-1 h-2 flex-1 rounded-full bg-[color-mix(in_oklch,var(--sem-ok)_40%,transparent)]" style={{ flex: warnMin }} />
      <span>{warnMin} min</span>
      <div className="mx-1 h-2 rounded-full bg-[color-mix(in_oklch,var(--sem-warn)_60%,transparent)]" style={{ flex: alertMin - warnMin }} />
      <span>{alertMin} min</span>
      <div className="mx-1 h-2 w-4 rounded-full bg-[color-mix(in_oklch,var(--sem-alert)_60%,transparent)]" />
      <span>+{alertMin} min</span>
    </div>
  );
}
