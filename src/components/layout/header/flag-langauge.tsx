"use client";

import type { ComponentType } from "react";
import IR from "country-flag-icons/react/3x2/IR";
import GB from "country-flag-icons/react/3x2/GB";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Locale = "fa" | "en";

/*
 * Use the package's own component type instead of creating
 * a conflicting SVGProps type.
 */
type CountryFlagComponent = ComponentType<React.ComponentProps<typeof IR>>;

interface LocaleOption {
  value: Locale;
  label: string;
  shortLabel: string;
  flagTitle: string;
  Flag: CountryFlagComponent;
}

const locales = [
  {
    value: "fa",
    label: "فارسی",
    shortLabel: "فا",
    flagTitle: "Iran",
    Flag: IR,
  },
  {
    value: "en",
    label: "English",
    shortLabel: "EN",
    flagTitle: "United Kingdom",
    Flag: GB,
  },
] as const satisfies readonly LocaleOption[];

const localeValues = locales.map((item) => item.value);

function isLocale(value: string): value is Locale {
  return localeValues.includes(value as Locale);
}

export default function FlagLanguage() {
  const pathname = usePathname();

  const pathnameParts = pathname.split("/");
  const pathnameLocale = pathnameParts[1];

  const currentLocale: Locale = isLocale(pathnameLocale)
    ? pathnameLocale
    : "fa";

  const getLocalePath = (locale: Locale): string => {
    const hasLocalePrefix = isLocale(pathnameLocale);

    const pathParts = hasLocalePrefix
      ? pathnameParts.slice(2)
      : pathnameParts.slice(1);

    const restOfPath = pathParts.filter(Boolean).join("/");

    return restOfPath ? `/${locale}/${restOfPath}` : `/${locale}`;
  };

  return (
    <div
      role="group"
      aria-label="Change language"
      className={[
        "flex items-center rounded-full",
        "border border-border/70",
        "bg-muted/50 p-1",
      ].join(" ")}
    >
      {locales.map((item) => {
        const active = item.value === currentLocale;
        const Flag = item.Flag;

        return (
          <Link
            key={item.value}
            href={getLocalePath(item.value)}
            hrefLang={item.value}
            lang={item.value}
            aria-label={`Switch language to ${item.label}`}
            aria-current={active ? "page" : undefined}
            title={item.label}
            className={[
              "relative isolate",
              "flex min-h-8 items-center gap-1.5",
              "rounded-full px-2 py-1.5 sm:px-2.5",
              "text-[11px] font-semibold",
              "outline-none transition-colors",
              "focus-visible:ring-2",
              "focus-visible:ring-ring",
              active
                ? "text-foreground"
                : ["text-muted-foreground", "hover:text-foreground"].join(" "),
            ].join(" ")}
          >
            {active && (
              <motion.span
                layoutId="active-language"
                className={[
                  "absolute inset-0 -z-10",
                  "rounded-full bg-background",
                  "shadow-sm ring-1 ring-border/70",
                ].join(" ")}
                transition={{
                  type: "spring",
                  stiffness: 450,
                  damping: 35,
                }}
              />
            )}

            <span
              className={[
                "h-4 w-5 shrink-0 overflow-hidden",
                "rounded-[3px] ring-1 ring-black/10",
              ].join(" ")}
            >
              <Flag title={item.flagTitle} className="size-full object-cover" />
            </span>

            <span
              className={[
                "hidden leading-none sm:inline",
                item.value === "fa" ? "font-medium" : "uppercase",
              ].join(" ")}
            >
              {item.shortLabel}
            </span>

            <span className="sr-only">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
