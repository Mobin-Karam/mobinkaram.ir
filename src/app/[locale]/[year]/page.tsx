import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import ArchiveHeader from "@/features/blog/components/ArchiveHeader";
import BlogTimeline from "@/features/blog/components/BlogTimeline";
import {
  filterPostsByArchive,
  getAllPosts,
  isBlogLocale,
} from "@/lib/blog/content";

export async function generateStaticParams() {
  const locales = ["en", "fa"] as const;
  const all = await Promise.all(
    locales.map(async (locale) => ({
      locale,
      posts: await getAllPosts(locale),
    })),
  );
  return all.flatMap(({ locale, posts }) =>
    [...new Set(posts.map((post) => post.dateParts.year))].map((year) => ({
      locale,
      year,
    })),
  );
}

export default async function YearArchivePage({
  params,
}: {
  params: Promise<{ locale: string; year: string }>;
}) {
  const { locale, year } = await params;
  if (!isBlogLocale(locale) || !/^\d{4}$/.test(year)) return notFound();
  const blogLocale = locale;
  const [posts, t] = await Promise.all([
    getAllPosts(blogLocale),
    getTranslations({ locale: blogLocale, namespace: "blog" }),
  ]);
  const filtered = filterPostsByArchive(posts, year);
  if (!filtered.length) notFound();

  return (
    <main
      dir={blogLocale === "fa" ? "rtl" : "ltr"}
      className="min-h-screen bg-background text-foreground"
    >
      <ArchiveHeader
        locale={blogLocale}
        eyebrow={t("dateArchive")}
        title={t("yearArchive", { year })}
      />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <BlogTimeline posts={filtered} locale={blogLocale} />
      </section>
    </main>
  );
}
