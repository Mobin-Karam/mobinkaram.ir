export type Locale = "fa" | "en";
export const locales: Locale[] = ["en", "fa"];
export const defaultLocale: Locale = "en";
export const rtlLocales = new Set<Locale>(); // no RTL; content is English
export const localePrefix = "always" as const;

export const localeLabels: Record<Locale, string> = {
  fa: "Persian",
  en: "English",
};
