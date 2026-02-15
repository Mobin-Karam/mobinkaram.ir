"use client";

import Link from "next/link";
import clsx from "clsx";
import {
  Home,
  LayoutPanelLeft,
  UserRound,
  Layers,
  ShieldCheck,
  Mail,
  PanelsTopLeft,
  Flag,
} from "lucide-react";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";

const items = [
  { key: "home", label: "Home", icon: Home, href: "" },
  { key: "projects", label: "Projects", icon: PanelsTopLeft, href: "/projects" },
  { key: "engineer", label: "Engineer", icon: LayoutPanelLeft, href: "/build" },
  { key: "architecture", label: "Architecture", icon: Layers, href: "/architecture" },
  { key: "security", label: "Security", icon: ShieldCheck, href: "/security" },
  { key: "profile", label: "Profile", icon: UserRound, href: "/profile" },
  { key: "contact", label: "Contact", icon: Mail, href: "/contact" },
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
      className="fixed left-1/2 z-30 flex w-[min(98%,1100px)] max-w-xl -translate-x-1/2 items-center justify-around overflow-hidden rounded-full border border-white/30 bg-white/10 px-2.5 py-2 shadow-[0_18px_45px_-24px_rgba(0,0,0,0.55)] backdrop-blur-2xl backdrop-saturate-200 ring-1 ring-white/20 md:hidden"
      style={{ bottom: `calc(14px + env(safe-area-inset-bottom))` }}
    >
      <span
        aria-hidden
        className="absolute inset-y-1 left-0 z-0 rounded-full bg-white/25 shadow-lg shadow-white/30 blur-[2px] transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)]"
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
              "relative z-10 flex flex-1 flex-col items-center gap-1 px-1.5 py-1 text-[10px] transition-colors",
              active
                ? "text-[color:var(--accent-strong)]"
                : "text-[color:var(--muted)]",
            )}
          >
            <span
              aria-hidden
              className={clsx(
                "absolute inset-0 rounded-full bg-white/10 opacity-0 transition duration-300 ease-out",
                active && "opacity-100",
              )}
            />
            <span
              className={clsx(
                "flex h-10 w-10 items-center justify-center rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)]",
                active
                  ? "bg-white/20 text-[color:var(--accent-strong)] shadow-inner shadow-white/30 ring-2 ring-[color:var(--accent-strong)] ring-offset-2 ring-offset-[color:var(--surface)]"
                  : "bg-white/5 text-[color:var(--muted)] ring-0",
              )}
            >
              <Icon size={18} />
            </span>
            <span className="sr-only">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
