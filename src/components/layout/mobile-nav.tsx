"use client";

import Link from "next/link";
import clsx from "clsx";
import {
  Home,
  LayoutPanelLeft,
  UserRound,
  Layers,
  Cog,
  User,
  Flag,
} from "lucide-react";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";

const items = [
  { key: "home", label: "Home", icon: Home, href: "" },
  { key: "engineer", label: "Engineer", icon: LayoutPanelLeft, href: "/build" },
  { key: "profile", label: "Profile", icon: UserRound, href: "/profile" },
  { key: "now", label: "Now", icon: Cog, href: "/now" },
  { key: "stack", label: "Stack", icon: Layers, href: "/stack" },
  { key: "about", label: "About", icon: User, href: "/about" },
  { key: "tracker", label: "Tracker", icon: Flag, href: "/koonj-status" },
];

export function MobileNav({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const activeIndex = items.findIndex((item) =>
    item.key === "home"
      ? pathname === `/${locale}` || pathname === `/${locale}/`
      : pathname.startsWith(`/${locale}${item.href}`),
  );
  const indicatorX =
    activeIndex >= 0 ? (activeIndex * 100) / items.length : 0;
  return (
    <nav
      className="fixed left-1/2 z-30 flex w-[min(96%,1100px)] -translate-x-1/2 items-center justify-around overflow-hidden rounded-full border border-white/25 bg-gradient-to-r from-[color:var(--surface)]/92 via-white/30 to-[color:var(--surface)]/92 px-3 py-2 shadow-[0_18px_45px_-24px_rgba(0,0,0,0.55)] backdrop-blur-xl backdrop-saturate-150 ring-1 ring-black/5 md:hidden"
      style={{ bottom: `calc(14px + env(safe-area-inset-bottom))` }}
    >
      <span
        aria-hidden
        className="absolute inset-y-1 left-0 z-0 rounded-full bg-white/12 blur-[2px] transition-[transform,width] duration-250 ease-out"
        style={{
          width: `${100 / items.length}%`,
          transform: `translateX(${indicatorX}%)`,
        }}
      />
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
              "relative z-10 flex flex-1 flex-col items-center gap-1 px-2 py-1 text-[11px] transition-colors",
              active
                ? "text-[color:var(--accent-strong)]"
                : "text-[color:var(--muted)]",
            )}
          >
            <span
              aria-hidden
              className={clsx(
                "absolute inset-0 rounded-full bg-white/10 opacity-0 transition duration-200 ease-out",
                active && "opacity-100",
              )}
            />
            <Icon size={18} />
            <span className="capitalize">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
