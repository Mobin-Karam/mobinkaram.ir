import "server-only";
import { cache } from "react";
import { listEngineerFiles, getEngineerFile } from "@/lib/engineer-content";
import { compileEngineerMDX } from "@/lib/engineer-mdx";
import type { Locale } from "@/i18n/config";

export type ProjectMeta = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  stack?: string[];
  year?: string;
  date?: string;
  author?: string;
  cover?: string;
  authorAvatar?: string;
  readingMinutes?: number;
  status?: string;
  featured?: boolean;
  published?: boolean;
};

export type LabMeta = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  area?: string;
  date?: string;
  author?: string;
  authorAvatar?: string;
  readingMinutes?: number;
  cover?: string;
  published?: boolean;
};

export type LogMeta = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  date?: string;
  author?: string;
  authorAvatar?: string;
  readingMinutes?: number;
  cover?: string;
  published?: boolean;
};

export type Entry<TMeta> = {
  meta: TMeta;
  Component: React.ComponentType;
  locale: Locale;
};

async function loadCategory<TMeta>(category: "projects" | "lab" | "logs", locale: Locale) {
  const files = await listEngineerFiles(category, locale as "en" | "fa");
  const entries: Entry<TMeta>[] = [];
  for (const file of files) {
    const slug = file.name.replace(/\.mdx$/, "");
    const source = await getEngineerFile(category, locale as "en" | "fa", slug);
    if (!source) continue;
    try {
      const { frontmatter, content } = await compileEngineerMDX(source);
      const Component = () => content;
      const meta = { slug, ...frontmatter } as TMeta & { slug: string; published?: boolean };
      if (meta.published === false) continue;
      entries.push({ meta: meta as TMeta, Component, locale });
    } catch (err) {
      console.warn(`[engineer] failed to compile ${category}/${locale}/${slug}:`, err);
    }
  }
  return entries.sort((a, b) => (b.meta as any).date?.localeCompare((a.meta as any).date ?? "") ?? 0);
}

export const getProjects = cache(async (locale: Locale) => loadCategory<ProjectMeta>("projects", locale));
export const getLabEntries = cache(async (locale: Locale) => loadCategory<LabMeta>("lab", locale));
export const getBuildLogs = cache(async (locale: Locale) => loadCategory<LogMeta>("logs", locale));

export const getProject = cache(async (locale: Locale, slug: string) => {
  const projects = await getProjects(locale);
  return projects.find((p) => p.meta.slug === slug) ?? null;
});

export const getLabEntry = cache(async (locale: Locale, slug: string) => {
  const labs = await getLabEntries(locale);
  return labs.find((p) => p.meta.slug === slug) ?? null;
});

export const getLog = cache(async (locale: Locale, slug: string) => {
  const logs = await getBuildLogs(locale);
  return logs.find((p) => p.meta.slug === slug) ?? null;
});

export const getFeaturedProject = cache(async (locale: Locale) => {
  const projects = await getProjects(locale);
  return projects.find((p) => p.meta.featured) ?? projects[0] ?? null;
});

export const uniqueProjectTags = cache(async (locale: Locale) => {
  const projects = await getProjects(locale);
  return Array.from(new Set(projects.flatMap((p) => p.meta.tags)));
});

export const engineerRevalidate = 1800;
