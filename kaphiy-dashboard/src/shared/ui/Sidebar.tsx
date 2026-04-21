"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UtensilsCrossed, History, Settings2, LogOut } from "lucide-react";
import { useAuthStore } from "@/src/features/auth/store/authSlice";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/orders", label: "Pedidos", Icon: UtensilsCrossed },
  { href: "/history", label: "Historial", Icon: History },
  { href: "/settings", label: "Ajustes", Icon: Settings2 },
] as const;

export function Sidebar() {
  const pathname = usePathname();
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  return (
    <nav
      aria-label="Navegación principal"
      className="flex w-14 flex-shrink-0 flex-col items-center border-r border-[var(--border)] bg-[var(--card)] py-4 sm:w-[4.5rem]"
    >
      {/* Nav links */}
      <ul className="flex flex-1 flex-col items-center gap-1" role="list">
        {NAV_ITEMS.map(({ href, label, Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <li key={href}>
              <Link
                href={href}
                aria-label={label}
                aria-current={active ? "page" : undefined}
                title={label}
                className={cn(
                  "flex size-10 flex-col items-center justify-center rounded-xl transition-colors",
                  "focus-visible:outline-2 focus-visible:outline-[var(--praline)]",
                  active
                    ? "bg-[color-mix(in_oklch,var(--praline)_15%,transparent)] text-[var(--praline)]"
                    : "text-[var(--muted-foreground)] hover:bg-[var(--border)] hover:text-[var(--foreground)]",
                )}
              >
                <Icon className="size-[18px]" aria-hidden />
                <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-wide">
                  {label.slice(0, 3)}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Logout */}
      <button
        onClick={handleLogout}
        aria-label="Cerrar sesión"
        title="Cerrar sesión"
        className={cn(
          "flex size-10 flex-col items-center justify-center rounded-xl transition-colors",
          "text-[var(--muted-foreground)] hover:bg-[color-mix(in_oklch,var(--sem-alert)_15%,transparent)] hover:text-[var(--sem-alert)]",
          "focus-visible:outline-2 focus-visible:outline-[var(--sem-alert)]",
        )}
      >
        <LogOut className="size-[18px]" aria-hidden />
        <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-wide">Salir</span>
      </button>
    </nav>
  );
}
