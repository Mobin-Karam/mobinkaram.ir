import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import ArchiveHeader from "@/features/blog/components/ArchiveHeader";
import BlogTimeline from "@/features/blog/components/BlogTimeline";
import { getAllPosts, isBlogLocale } from "@/lib/blog/content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string; tag: string }> }): Promise<Metadata> {
  const { locale, tag } = await params;
  if (!isBlogLocale(locale)) return {};
  return { title: `#${tag}`, alternates: { canonical: `/${locale}/blog/tag/${encodeURIComponent(tag)}` } };
}

export default async function TagPage({ params }: { params: Promise<{ locale: string; tag: string }> }) {
  const { locale, tag } = await params;
  if (!isBlogLocale(locale)) return notFound();
  const blogLocale = locale;
  const [posts, t] = await Promise.all([
    getAllPosts(blogLocale),
    getTranslations({ locale: blogLocale, namespace: "blog" }),
  ]);
  const tagged = posts.filter((post) => post.tags?.includes(tag));
  if (!tagged.length) notFound();

  return (
    <main dir={blogLocale === "fa" ? "rtl" : "ltr"} className="min-h-screen bg-background text-foreground">
      <ArchiveHeader locale={blogLocale} eyebrow={t("tagArchive")} title={`#${tag}`} />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <BlogTimeline posts={tagged} locale={blogLocale} />
      </section>
    </main>
  );
}
