import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import BlogMasthead from "@/features/blog/components/BlogMasthead";
import BlogTimeline from "@/features/blog/components/BlogTimeline";
import { getAllPosts, isBlogLocale } from "@/lib/blog/content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isBlogLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "blog" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/blog`,
      languages: { en: "/en/blog", fa: "/fa/blog" },
    },
  };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isBlogLocale(locale)) return notFound();
  const blogLocale = locale;

  const [posts, t] = await Promise.all([
    getAllPosts(blogLocale),
    getTranslations({ locale: blogLocale, namespace: "blog" }),
  ]);

  return (
    <main dir={blogLocale === "fa" ? "rtl" : "ltr"} className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <BlogMasthead locale={blogLocale} />
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="mb-9 grid gap-4 border-b border-border pb-7 sm:mb-12 sm:pb-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,480px)] lg:items-end">
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-primary sm:text-xs">{t("archive")}</p>
            <h2 className="font-serif text-3xl font-black tracking-[-0.035em] sm:text-4xl lg:text-5xl">{t("latestDispatches")}</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-muted-foreground lg:text-end">{t("archiveDescription")}</p>
        </div>
        <BlogTimeline posts={posts} locale={blogLocale} />
      </section>
    </main>
  );
}
