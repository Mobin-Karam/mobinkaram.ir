"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeLabels, type Locale } from "@/i18n/config";

export function LocaleSwitch({ locale }: { locale: Locale }) {
  // Switcher kept for future bilingual toggle; currently English-first.
  const pathname = usePathname();
  const target = locale;
  const href = switchLocale(pathname, target);
  return (
    <Link
      href={href}
      className="hidden pill items-center gap-2"
      aria-label="Switch language"
    >
      <span className="text-xs font-semibold uppercase tracking-wide">
        {localeLabels[target]}
      </span>
    </Link>
  );
}

function switchLocale(pathname: string, target: Locale) {
  if (!pathname || pathname === "/") return `/${target}`;
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return `/${target}`;
  parts[0] = target;
  return `/${parts.join("/")}`;
}
