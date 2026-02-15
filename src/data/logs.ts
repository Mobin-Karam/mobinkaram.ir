import type { ComponentType } from "react";
import type { Locale } from "@/i18n/config";

import Day14En, { meta as day14EnMeta } from "../../content/en/logs/day-14.mdx";
import Day21En, { meta as day21EnMeta } from "../../content/en/logs/day-21.mdx";

export type LogMeta = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  date: string;
  author: string;
  authorAvatar?: string;
  readingMinutes: number;
};

export type BuildLogEntry = {
  locale: Locale;
  meta: LogMeta;
  Component: ComponentType;
};

const base: BuildLogEntry[] = [
  { locale: "en", meta: day14EnMeta, Component: Day14En },
  { locale: "en", meta: day21EnMeta, Component: Day21En },
];

const buildLogs: BuildLogEntry[] = [
  ...base,
  ...base.map((log) => ({ ...log, locale: "fa" as const })),
];

export function getBuildLogs(locale: Locale) {
  return buildLogs
    .filter((log) => log.locale === locale)
    .sort((a, b) => Date.parse(b.meta.date) - Date.parse(a.meta.date));
}

export function getLog(locale: Locale, slug: string) {
  return buildLogs.find(
    (log) => log.locale === locale && log.meta.slug === slug,
  );
}
