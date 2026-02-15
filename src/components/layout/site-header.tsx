"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { StatusDot } from "@/components/ui/status-dot";
import { InstallButton } from "@/components/ui/install-button";
import type { Locale } from "@/i18n/config";
import clsx from "clsx";
import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Menu,
  X,
  Home,
  Layers,
  ShieldCheck,
  Mail,
  Flag,
  Rss,
  Github,
  Linkedin,
  Globe2,
  LayoutPanelLeft,
  UserRound,
  PanelsTopLeft,
} from "lucide-react";
import { ScrollProgress } from "@/components/ui/scroll-progress";

const navItems: { key: string; href: string; icon: LucideIcon }[] = [
  { key: "home", href: "", icon: Home },
  { key: "engineer", href: "/build", icon: LayoutPanelLeft },
  { key: "blog", href: "/blog", icon: PanelsTopLeft },
  { key: "profile", href: "/profile", icon: UserRound },
  { key: "tracker", href: "/koonj-status", icon: Flag },
  { key: "contact", href: "/contact", icon: Mail },
];

export function SiteHeader({ locale }: { locale: Locale }) {
  const t = useTranslations();
  const pathname = usePathname();
  const currentLocale = locale ?? "en";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const avatarUrl = "https://github.com/Mobin-Karam.png";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "sticky top-0 z-30 mb-6 flex flex-col gap-2 border-b border-[color:var(--border)] bg-gradient-to-r from-[color:var(--surface)]/92 via-white/80 to-[color:var(--surface)]/92 px-2 pb-3 backdrop-blur-xl transition-shadow",
        scrolled && "shadow-[0_10px_30px_-18px_rgba(0,0,0,0.35)]",
      )}
    >
      <div className="relative h-0.5 w-full">
        <ScrollProgress />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-2 shadow-[var(--glow)] transition hover:-translate-y-0.5 hover:shadow-lg">
            <img
              src={avatarUrl}
              alt="Mobin Karam avatar"
              className="h-10 w-10 rounded-xl border border-[color:var(--border)] object-cover shadow-sm"
              loading="lazy"
            />
            <div>
              <p className="text-sm font-semibold text-[color:var(--foreground)] leading-tight">
                {t("brand.name")}
              </p>
              <p className="text-xs text-[color:var(--muted)] leading-tight">
                {t("brand.role")}
              </p>
            </div>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <Link
              href="https://www.linkedin.com/in/mobin-karam/"
              className="pill nav-btn ltr-text hover:-translate-y-0.5 hover:shadow-md transition group"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin size={14} />
              LinkedIn
            </Link>
            <Link
              href="https://github.com/Mobin-Karam"
              className="pill nav-btn ltr-text hover:-translate-y-0.5 hover:shadow-md transition group"
              target="_blank"
              rel="noreferrer"
            >
              <Github size={14} />
              GitHub
            </Link>
            <Link
              href="https://quera.org/profile/mobinkaram"
              className="pill nav-btn ltr-text hover:-translate-y-0.5 hover:shadow-md transition group"
              target="_blank"
              rel="noreferrer"
            >
              <Globe2 size={14} />
              Quera
            </Link>
            <Link
              href="/rss.xml"
              className="pill nav-btn ltr-text hover:-translate-y-0.5 hover:shadow-md transition group"
              target="_blank"
              rel="noreferrer"
            >
              <Rss size={14} />
              RSS
            </Link>
            <InstallButton />
          </div>
          <StatusDot label={t("status.currentlyCoding")} />
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            className="pill flex items-center gap-2 md:hidden transition hover:-translate-y-0.5 hover:shadow-md"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={16} /> : <Menu size={16} />}
            <span className="text-xs font-semibold">Menu</span>
          </button>
        </div>
      </div>
      <nav
        className={clsx(
          "flex flex-wrap items-center gap-2",
          open ? "flex" : "hidden md:flex",
        )}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const path = `/${currentLocale}${item.href}`;
          const active =
            item.key === "home"
              ? pathname === `/${currentLocale}` || pathname === `/${currentLocale}/`
              : pathname.startsWith(path);
          return (
            <Link
              key={item.key}
              href={path}
            className={clsx(
                "relative overflow-hidden pill nav-btn group flex items-center gap-2 hover:shadow-md transition hover:-translate-y-0.5",
                active && "border-[color:var(--accent)] text-[color:var(--foreground)] shadow-sm",
              )}
              onClick={() => setOpen(false)}
            >
              <Icon size={15} className="text-[color:var(--muted)] group-hover:text-[color:var(--foreground)] transition" />
              {t(`nav.${item.key}`)}
              <span
                className={clsx(
                  "absolute inset-x-2 -bottom-[6px] h-[2px] rounded-full bg-[color:var(--accent-strong)] transition-transform duration-300",
                  active ? "scale-x-100" : "scale-x-0",
                )}
              />
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

