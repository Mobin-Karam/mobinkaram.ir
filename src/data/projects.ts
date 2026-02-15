import type { ComponentType } from "react";
import type { Locale } from "@/i18n/config";

import KoonjEn, { meta as koonjEnMeta } from "../../content/en/projects/koonj.mdx";
import FieldKitEn, { meta as fieldKitEnMeta } from "../../content/en/projects/fieldkit.mdx";

export type ProjectMeta = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  stack: string[];
  year: string;
  date: string;
  author: string;
  cover?: string;
  authorAvatar?: string;
  readingMinutes: number;
  status?: string;
  featured?: boolean;
};

export type ProjectEntry = {
  locale: Locale;
  meta: ProjectMeta;
  Component: ComponentType;
};

const base: ProjectEntry[] = [
  { locale: "en", meta: koonjEnMeta, Component: KoonjEn },
  { locale: "en", meta: fieldKitEnMeta, Component: FieldKitEn },
];

const projects: ProjectEntry[] = [
  ...base,
  ...base.map((p) => ({ ...p, locale: "fa" as const })),
];

export function getProjects(locale: Locale) {
  return projects.filter((p) => p.locale === locale);
}

export function getProject(locale: Locale, slug: string) {
  return projects.find(
    (p) => p.locale === locale && p.meta.slug === slug,
  );
}

export function getFeaturedProject(locale: Locale) {
  return (
    projects.find(
      (p) => p.locale === locale && p.meta.featured,
    ) ?? projects.find((p) => p.locale === locale)
  );
}

export const uniqueTags = Array.from(
  new Set(projects.flatMap((p) => p.meta.tags)),
);
