export const locales = ["fa", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fa";

export const localePrefix = "always" as const;

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
