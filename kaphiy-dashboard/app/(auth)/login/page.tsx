"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/features/auth/store/authSlice";
import { useLogin } from "@/src/features/auth/hooks/useLogin";
import { Eye, EyeOff, LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { mutate, isPending, isError, error } = useLogin();

  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);

  useEffect(() => {
    if (isAuthenticated) router.replace("/orders");
  }, [isAuthenticated, router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!pin) return;
    mutate(
      { pin },
      { onSuccess: () => router.replace("/orders") },
    );
  }

  const errorMsg = isError
    ? (error?.status === 401 || error?.status === 400
        ? "PIN incorrecto. Intenta de nuevo."
        : "Error de servidor. Contacta al administrador.")
    : null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--background)] px-6">
      <h1 className="font-display mb-2 text-4xl font-semibold tracking-widest text-[var(--praline)]">
        PRALIN<em className="not-italic text-[var(--crema)]">É</em>
      </h1>
      <p className="mb-10 text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">
        Panel de Cocina
      </p>

      <form
        onSubmit={handleSubmit}
        aria-label="Formulario de ingreso"
        className="ticket-card w-full max-w-sm px-8 py-10"
      >
        <h2 className="mb-6 text-lg font-bold text-[var(--foreground)]">
          Acceso de Barista
        </h2>

        <label
          htmlFor="pin"
          className="mb-2 block text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]"
        >
          PIN de turno
        </label>
        <div className="relative mb-6">
          <input
            id="pin"
            type={showPin ? "text" : "password"}
            inputMode="numeric"
            autoComplete="current-password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="••••••"
            maxLength={8}
            required
            aria-invalid={!!errorMsg}
            aria-describedby={errorMsg ? "pin-error" : undefined}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--input)] px-4 py-3 pr-12 font-mono text-lg tracking-widest text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--praline)] focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPin((v) => !v)}
            aria-label={showPin ? "Ocultar PIN" : "Mostrar PIN"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          >
            {showPin ? (
              <EyeOff className="size-4" aria-hidden />
            ) : (
              <Eye className="size-4" aria-hidden />
            )}
          </button>
        </div>

        {errorMsg && (
          <p id="pin-error" role="alert" className="mb-4 text-xs font-medium text-[var(--sem-alert)]">
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending || !pin}
          aria-busy={isPending}
          className="flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-[18px] bg-[var(--praline)] px-4 py-4 text-sm font-bold text-white transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 active:translate-y-0.5"
        >
          <LogIn className="size-4" aria-hidden />
          {isPending ? "Ingresando…" : "Ingresar"}
        </button>
      </form>
    </div>
  );
}
