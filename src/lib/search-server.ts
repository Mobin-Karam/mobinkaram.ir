import "server-only";
import { getProjects, getLabEntries, getBuildLogs } from "@/lib/engineer-data";
import type { Locale } from "@/i18n/config";
import type { SearchResult } from "@/lib/search";

export async function buildSearchIndex(locale: Locale): Promise<SearchResult[]> {
  const [projects, lab, logs] = await Promise.all([
    getProjects(locale),
    getLabEntries(locale),
    getBuildLogs(locale),
  ]);

  const projectDocs = projects.map((p) => ({
    type: "project" as const,
    slug: p.meta.slug,
    title: p.meta.title,
    summary: p.meta.summary,
    tags: p.meta.tags,
    locale,
  }));

  const labDocs = lab.map((entry) => ({
    type: "lab" as const,
    slug: entry.meta.slug,
    title: entry.meta.title,
    summary: entry.meta.summary,
    tags: entry.meta.tags,
    locale,
  }));

  const logDocs = logs.map((log) => ({
    type: "log" as const,
    slug: log.meta.slug,
    title: log.meta.title,
    summary: log.meta.summary,
    tags: log.meta.tags,
    locale,
  }));

  return [...projectDocs, ...labDocs, ...logDocs];
}
