import type { Locale } from "@/i18n/config";

type NowBlock = {
  title: string;
  items: string[];
};

const nowContent: Record<Locale, NowBlock[]> = {
  fa: [],
  en: [
    {
      title: "Building",
      items: ["Koonj - Phase 2 (role automation + payment analytics)", "Shared design system (web + native)"],
    },
    {
      title: "Learning",
      items: ["Vendor-agnostic realtime patterns", "Navigation patterns for cross-platform apps"],
    },
    {
      title: "Researching",
      items: ["Layered pricing models for small communities", "End-to-end traceability across money flows"],
    },
  ],
};

export function getNowBlocks(locale: Locale) {
  return nowContent[locale] ?? nowContent.en;
}
