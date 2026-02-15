import type { Locale } from "@/i18n/config";

export type SearchResult = {
  type: "project" | "lab" | "log";
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  locale: Locale;
};

export function searchContent(
  locale: Locale,
  query: string,
  index: SearchResult[],
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
