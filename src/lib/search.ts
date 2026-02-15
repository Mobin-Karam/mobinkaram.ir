import { getProjects } from "@/data/projects";
import { getLabEntries } from "@/data/lab";
import { getBuildLogs } from "@/data/logs";
import type { Locale } from "@/i18n/config";

export type SearchResult = {
  type: "project" | "lab" | "log";
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  locale: Locale;
};

export function buildSearchIndex(locale: Locale): SearchResult[] {
  const projectDocs = getProjects(locale).map((p) => ({
    type: "project" as const,
    slug: p.meta.slug,
    title: p.meta.title,
    summary: p.meta.summary,
    tags: p.meta.tags,
    locale,
  }));

  const labDocs = getLabEntries(locale).map((entry) => ({
    type: "lab" as const,
    slug: entry.meta.slug,
    title: entry.meta.title,
    summary: entry.meta.summary,
    tags: entry.meta.tags,
    locale,
  }));

  const logDocs = getBuildLogs(locale).map((log) => ({
    type: "log" as const,
    slug: log.meta.slug,
    title: log.meta.title,
    summary: log.meta.summary,
    tags: log.meta.tags,
    locale,
  }));

  return [...projectDocs, ...labDocs, ...logDocs];
}

export function searchContent(
  locale: Locale,
  query: string,
  index = buildSearchIndex(locale),
): SearchResult[] {
  if (!query.trim()) return [];
  const term = query.toLowerCase();

  return index
    .filter(
      (item) =>
        item.title.toLowerCase().includes(term) ||
        item.summary.toLowerCase().includes(term) ||
        item.tags.some((tag) => tag.toLowerCase().includes(term)),
    )
    .slice(0, 10);
}
