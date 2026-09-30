"use client";

import Link from "next/link";
import { FolderKanban, Home, Newspaper } from "lucide-react";
import { usePathname } from "next/navigation";

const tabs = [
  { key: "home", href: "", icon: Home, fa: "خانه", en: "Home" },
  { key: "projects", href: "/projects", icon: FolderKanban, fa: "پروژه‌ها", en: "Projects" },
  { key: "blog", href: "/blog", icon: Newspaper, fa: "بلاگ", en: "Blog" },
] as const;

export function MobileAppNav({ locale }: { locale: "fa" | "en" }) {
  const pathname = usePathname();

  return (
    <nav
      aria-label={locale === "fa" ? "ناوبری اصلی" : "Primary navigation"}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur md:hidden"
    >
      <div className="mx-auto grid max-w-md grid-cols-3 gap-1">
        {tabs.map((tab) => {
          const href = `/${locale}${tab.href}`;
          const active = tab.key === "home"
            ? pathname === href || pathname === `${href}/`
            : pathname === href || pathname.startsWith(`${href}/`);
          const Icon = tab.icon;

          return (
            <Link
              key={tab.key}
              href={href}
              prefetch
              aria-current={active ? "page" : undefined}
              className={[
                "flex min-h-12 flex-col items-center justify-center gap-1 rounded-lg text-[11px] font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              ].join(" ")}
            >
              <Icon className="size-4" aria-hidden="true" />
              <span>{locale === "fa" ? tab.fa : tab.en}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
