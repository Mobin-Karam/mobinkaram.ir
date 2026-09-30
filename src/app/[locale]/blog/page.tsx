import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import SimpleBlogList from "@/features/blog/components/SimpleBlogList";
import { getPostsResult, isBlogLocale } from "@/lib/blog/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
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

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isBlogLocale(locale)) return notFound();
  const blogLocale = locale;

  const result = await getPostsResult(blogLocale);
  const { posts } = result;

  return (
    <main
      dir={blogLocale === "fa" ? "rtl" : "ltr"}
      className="min-h-screen bg-background text-foreground"
    >
      {result.unavailable ? (
        <section
          role="status"
          className="mx-auto w-full max-w-2xl px-5 pb-16 pt-32 text-center"
        >
          <p className="text-lg font-medium">
            {blogLocale === "fa"
              ? "ژورنال موقتاً در دسترس نیست"
              : "The journal is temporarily unavailable"}
          </p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {blogLocale === "fa"
              ? "کمی بعد دوباره تلاش کنید."
              : "Please try again shortly."}
          </p>
        </section>
      ) : (
        <SimpleBlogList posts={posts} locale={blogLocale} />
      )}
    </main>
  );
}
