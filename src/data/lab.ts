import type { ComponentType } from "react";
import type { Locale } from "@/i18n/config";

import NavArchEn, { meta as navArchEnMeta } from "../../content/en/lab/navigation-architecture.mdx";
import StateModelsEn, { meta as stateModelsEnMeta } from "../../content/en/lab/state-models.mdx";

export type LabMeta = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  area: string;
  date: string;
  author: string;
  authorAvatar?: string;
  readingMinutes: number;
};

export type LabEntry = {
  locale: Locale;
  meta: LabMeta;
  Component: ComponentType;
};

const base: LabEntry[] = [
  { locale: "en", meta: navArchEnMeta, Component: NavArchEn },
  { locale: "en", meta: stateModelsEnMeta, Component: StateModelsEn },
];

const labEntries: LabEntry[] = [
  ...base,
  ...base.map((e) => ({ ...e, locale: "fa" as const })),
];

export function getLabEntries(locale: Locale) {
  return labEntries.filter((item) => item.locale === locale);
}

export function getLabEntry(locale: Locale, slug: string) {
  return labEntries.find(
    (item) => item.locale === locale && item.meta.slug === slug,
  );
}

export const labTags = Array.from(
  new Set(labEntries.flatMap((item) => item.meta.tags)),
);
