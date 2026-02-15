"use client";

import Link from "next/link";
import clsx from "clsx";
import { Home, FlaskRound, BookOpenCheck, Layers, Cog } from "lucide-react";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";

const items = [
  { key: "home", icon: Home, href: "" },
  { key: "lab", icon: FlaskRound, href: "/lab" },
  { key: "projects", icon: BookOpenCheck, href: "/projects" },
  { key: "stack", icon: Layers, href: "/stack" },
  { key: "now", icon: Cog, href: "/now" },
];

export function MobileNav({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-3 left-0 right-0 z-30 mx-auto flex max-w-3xl items-center justify-around rounded-full border border-[color:var(--border)] bg-[color:var(--surface)]/90 px-3 py-2 shadow-lg backdrop-blur-md md:hidden">
      {items.map((item) => {
        const href = `/${locale}${item.href}`;
        const active =
          item.key === "home"
            ? pathname === `/${locale}` || pathname === `/${locale}/`
            : pathname.startsWith(href);
        const Icon = item.icon;
        return (
          <Link
            key={item.key}
            href={href}
            className={clsx(
              "flex flex-col items-center gap-1 px-2 py-1 text-[11px]",
              active
                ? "text-[color:var(--accent-strong)]"
                : "text-[color:var(--muted)]",
            )}
          >
            <Icon size={18} />
            <span className="capitalize">{item.key}</span>
          </Link>
        );
      })}
    </nav>
  );
}
