import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import ArchiveHeader from "@/features/blog/components/ArchiveHeader";
import BlogTimeline from "@/features/blog/components/BlogTimeline";
import { getAllPosts, getCategories, isBlogLocale } from "@/lib/blog/content";

export async function generateStaticParams() {
  const categories = await getCategories();
  return ["en", "fa"].flatMap((locale) => categories.map((category) => ({ locale, category: category.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; category: string }> }): Promise<Metadata> {
  const { locale, category } = await params;
  if (!isBlogLocale(locale)) return {};
  const categories = await getCategories();
  const item = categories.find((value) => value.slug === category);
  if (!item) return {};
  return {
    title: item.title[locale],
    description: item.description?.[locale],
    alternates: { canonical: `/${locale}/blog/category/${category}` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ locale: string; category: string }> }) {
  const { locale, category } = await params;
  if (!isBlogLocale(locale)) return notFound();
  const blogLocale = locale;

  const [posts, categories, t] = await Promise.all([
    getAllPosts(blogLocale),
    getCategories(),
    getTranslations({ locale: blogLocale, namespace: "blog" }),
  ]);
  const item = categories.find((value) => value.slug === category);
  if (!item) notFound();

  return (
    <main dir={blogLocale === "fa" ? "rtl" : "ltr"} className="min-h-screen bg-background text-foreground">
      <ArchiveHeader
        locale={blogLocale}
        eyebrow={t("categoryArchive")}
        title={item.title[blogLocale]}
        description={item.description?.[blogLocale]}
      />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <BlogTimeline posts={posts.filter((post) => post.category === category)} locale={blogLocale} />
      </section>
    </main>
  );
}
