"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, ShoppingBag } from "lucide-react";

const TABS = [
  { href: "/inicio",  label: "Inicio",   Icon: Home        },
  { href: "/menu",    label: "Menú",     Icon: BookOpen    },
  { href: "/pedido",  label: "Pedidos",  Icon: ShoppingBag },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav">
      {TABS.map(({ href, label, Icon }) => {
        const isActive =
          pathname === href ||
          (href !== "/inicio" && pathname.startsWith(href));

        return (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center gap-1 min-w-[60px]"
            style={{ WebkitTapHighlightColor: "transparent", textDecoration: "none" }}
          >
            <div className={`bottom-nav__icon bottom-nav__icon--${isActive ? "active" : "inactive"}`}>
              <Icon
                size={16}
                color={isActive ? "#fff9f4" : "#8a6555"}
                strokeWidth={isActive ? 2.5 : 1.8}
              />
            </div>
            <span className={`bottom-nav__label bottom-nav__label--${isActive ? "active" : "inactive"}`}>
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
