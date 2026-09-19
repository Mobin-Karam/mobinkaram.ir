import type { BlogFrontmatter, BlogLocale } from "@/types/blog";
import { getLocalizedDateParts } from "./date";

const PERSIAN = /[\u0600-\u06FF]/;

export function slugifyBlogTitle(value: string) {
  return value
    .normalize("NFKC")
    .replace(/[يى]/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/\u200c/g, "-")
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export function getRouteSlug(
  frontmatter: BlogFrontmatter,
  locale: BlogLocale,
  fileStem: string,
) {
  const requested = frontmatter.slug?.trim();

  if (locale === "fa") {
    if (requested && PERSIAN.test(requested)) return slugifyBlogTitle(requested);
    return slugifyBlogTitle(frontmatter.title || requested || fileStem);
  }

  return slugifyBlogTitle(requested || frontmatter.title || fileStem);
}

export function getBlogPostHref(
  date: string,
  locale: BlogLocale,
  routeSlug: string,
) {
  const parts = getLocalizedDateParts(date, locale);
  return `/${locale}/${parts.year}/${parts.month}/${parts.day}/${encodeURIComponent(routeSlug)}`;
}
