import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import ArchiveHeader from "@/features/blog/components/ArchiveHeader";
import BlogTimeline from "@/features/blog/components/BlogTimeline";
import {
  filterPostsByArchive,
  getAllPosts,
  isBlogLocale,
} from "@/lib/blog/content";
import { normalizeDateSegment } from "@/lib/blog/date";

export async function generateStaticParams() {
  const locales = ["en", "fa"] as const;
  const all = await Promise.all(
    locales.map(async (locale) => ({
      locale,
      posts: await getAllPosts(locale),
    })),
  );
  const result: Array<{ locale: string; year: string; month: string }> = [];
  for (const { locale, posts } of all) {
    const seen = new Set<string>();
    for (const post of posts) {
      const key = `${post.dateParts.year}/${post.dateParts.month}`;
      if (!seen.has(key)) {
        seen.add(key);
        result.push({
          locale,
          year: post.dateParts.year,
          month: post.dateParts.month,
        });
      }
    }
  }
  return result;
}

export default async function MonthArchivePage({
  params,
}: {
  params: Promise<{ locale: string; year: string; month: string }>;
}) {
  const { locale, year, month } = await params;
  if (!isBlogLocale(locale) || !/^\d{4}$/.test(year)) return notFound();
  const blogLocale = locale;
  const normalizedMonth = normalizeDateSegment(month);
  const [posts, t] = await Promise.all([
    getAllPosts(blogLocale),
    getTranslations({ locale: blogLocale, namespace: "blog" }),
  ]);
  const filtered = filterPostsByArchive(posts, year, normalizedMonth);
  if (!filtered.length) notFound();

  return (
    <main
      dir={blogLocale === "fa" ? "rtl" : "ltr"}
      className="min-h-screen bg-background text-foreground"
    >
      <ArchiveHeader
        locale={blogLocale}
        eyebrow={t("dateArchive")}
        title={t("monthArchive", { year, month: normalizedMonth })}
      />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <BlogTimeline posts={filtered} locale={blogLocale} />
      </section>
    </main>
  );
}
