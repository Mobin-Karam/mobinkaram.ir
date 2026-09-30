import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock3 } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { formatBlogDate } from "@/lib/blog/date";
import { generateBlogPostingJsonLd } from "@/lib/blog/seo";
import { extractTableOfContents } from "@/lib/blog/toc";
import type {
  BlogAuthor,
  BlogLocale,
  BlogPost,
  BlogPostMeta,
} from "@/types/blog";
import BlogArticleNavigation from "./BlogArticleNavigation";
import MdxContent from "./MdxContent";
import RelatedPosts from "./RelatedPosts";
import BlogTableOfContents from "./BlogTableOfContents";
import ArticleReadingControls from "./ArticleReadingControls";

export default async function BlogArticle({
  post,
  locale,
  author,
  translation,
  related,
  newer,
  older,
}: {
  post: BlogPost;
  locale: BlogLocale;
  author?: BlogAuthor;
  translation?: BlogPostMeta | null;
  related: BlogPostMeta[];
  newer: BlogPostMeta | null;
  older: BlogPostMeta | null;
}) {
  const t = await getTranslations({ locale, namespace: "blog" });
  const jsonLd = generateBlogPostingJsonLd(post, author);
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "fa" ? "خانه" : "Home",
        item: `https://mobinkaram.ir/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: locale === "fa" ? "بلاگ" : "Blog",
        item: `https://mobinkaram.ir/${locale}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://mobinkaram.ir${post.href}`,
      },
    ],
  };
  const tableOfContents = extractTableOfContents(post.body);

  return (
    <main
      dir={locale === "fa" ? "rtl" : "ltr"}
      className="min-h-screen bg-background text-foreground"
    >
      <script
        id={`blog-post-${post.path}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        id={`blog-breadcrumb-${post.path}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <header className="border-b border-border bg-card/30">
        <div className="mx-auto max-w-6xl px-5 pb-8 pt-20 sm:px-6 sm:pt-24 lg:px-8 lg:pt-28">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Link
              href={`/${locale}/blog`}
              className="inline-flex min-h-11 items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="size-4 rtl:-scale-x-100" />
              {t("backToJournal")}
            </Link>
            {translation ? (
              <Link
                href={translation.href}
                className="inline-flex min-h-11 items-center text-xs font-semibold text-primary hover:underline"
              >
                {locale === "fa" ? "English" : "فارسی"}
              </Link>
            ) : null}
          </div>

          <div
            dir="ltr"
            className={`mt-5 overflow-hidden rounded-xl border border-border bg-background shadow-[0_12px_36px_-28px_rgba(0,0,0,0.45)] ${post.coverUrl ? "lg:flex" : ""}`}
          >
            {post.coverUrl ? (
              <div
                className={`order-2 border-t border-border bg-muted lg:w-52 lg:shrink-0 lg:border-t-0 ${locale === "fa" ? "lg:order-1 lg:border-e" : "lg:order-2 lg:border-s"}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.coverUrl}
                  alt={post.title}
                  decoding="async"
                  fetchPriority="high"
                  className="h-36 w-full object-cover sm:h-40 lg:h-full"
                />
              </div>
            ) : null}
            <div
              dir={locale === "fa" ? "rtl" : "ltr"}
              className={`order-1 min-w-0 flex-1 p-5 sm:p-6 ${locale === "fa" ? "lg:order-2" : "lg:order-1"}`}
            >
              <div className="mb-3 flex flex-wrap items-center gap-2 font-mono text-[10px] font-medium tracking-[0.08em] text-muted-foreground sm:text-[11px]">
                <Link
                  href={`/${locale}/blog/category/${encodeURIComponent(post.category)}`}
                  className="text-primary hover:underline"
                >
                  {post.categoryInfo?.title?.[locale] || post.category}
                </Link>
                <span>/</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="size-3" />
                  {t("readingTime", { minutes: post.readingTime || 1 })}
                </span>
              </div>
              <h1 className="max-w-3xl text-pretty font-sans text-[1.9rem] font-semibold leading-[1.28] tracking-[-0.03em] sm:text-4xl sm:leading-[1.2]">
                {post.title}
              </h1>
              <p className="mt-3 max-w-2xl font-sans text-sm leading-7 text-muted-foreground sm:text-base">
                {post.description}
              </p>
              <ArticleReadingControls locale={locale} />
              <div className="mt-5 grid gap-3 border-t border-border pt-4 text-sm sm:grid-cols-2">
                <div>
                  <p className="font-mono text-[10px] font-medium tracking-[0.08em] text-muted-foreground">
                    {t("published")}
                  </p>
                  <time className="mt-1.5 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <CalendarDays className="size-3.5" />
                    {formatBlogDate(post.date, locale)}
                  </time>
                </div>
                {post.updatedAt ? (
                  <div>
                    <p className="font-mono text-[10px] font-medium tracking-[0.08em] text-muted-foreground">
                      {t("lastUpdated")}
                    </p>
                    <time className="mt-1.5 block text-sm text-muted-foreground">
                      {formatBlogDate(post.updatedAt, locale)}
                    </time>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-start lg:gap-12 lg:px-8 lg:py-14">
        <article className="min-w-0">
          <BlogTableOfContents items={tableOfContents} locale={locale} mobile />
          <div className="mx-auto max-w-2xl">
            <MdxContent source={post.body} />
          </div>

          {!!post.tags?.length && (
            <footer className="mx-auto mt-14 max-w-2xl border-t border-border pt-7 sm:mt-16">
              <p className="mb-3 font-mono text-[10px] font-medium tracking-[0.12em] text-muted-foreground">
                {t("filedUnder")}
              </p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/${locale}/blog/tag/${encodeURIComponent(tag)}`}
                    className="inline-flex min-h-11 items-center border border-border bg-muted/30 px-3 text-xs text-muted-foreground hover:border-primary"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </footer>
          )}

          <BlogArticleNavigation locale={locale} newer={newer} older={older} />
          <RelatedPosts posts={related} locale={locale} />
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-28 max-h-[calc(100dvh-9rem)] overflow-y-auto overscroll-contain rounded-xl border border-border bg-card p-5">
            <p className="font-mono text-[10px] font-medium tracking-[0.14em] text-primary">
              {t("eyebrow")}
            </p>
            {author ? (
              <div className="mt-4 border-b border-border pb-4">
                {author.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="mb-3 size-12 rounded-full border border-border object-cover"
                  />
                ) : null}
                <p className="text-lg font-bold">{author.name}</p>
                {author.title ? (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {author.title}
                  </p>
                ) : null}
              </div>
            ) : null}
            <div className="mt-4 space-y-1 text-xs leading-6 text-muted-foreground">
              <p>{post.categoryInfo?.title?.[locale] || post.category}</p>
              <p>{t("readingTime", { minutes: post.readingTime || 1 })}</p>
              <p>{formatBlogDate(post.date, locale)}</p>
            </div>
            <BlogTableOfContents items={tableOfContents} locale={locale} />
          </div>
        </aside>
      </div>
    </main>
  );
}
