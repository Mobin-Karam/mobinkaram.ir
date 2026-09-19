import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock3 } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { formatBlogDate } from "@/lib/blog/date";
import type { BlogAuthor, BlogLocale, BlogPost, BlogPostMeta } from "@/types/blog";
import BlogArticleNavigation from "./BlogArticleNavigation";
import MdxContent from "./MdxContent";
import RelatedPosts from "./RelatedPosts";

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

  return (
    <main dir={locale === "fa" ? "rtl" : "ltr"} className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-24 sm:px-6 sm:pb-14 sm:pt-28 lg:px-8 lg:pb-16 lg:pt-32">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link href={`/${locale}/blog`} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
              <ArrowLeft className="size-4 rtl:-scale-x-100" />
              {t("backToJournal")}
            </Link>
            {translation ? (
              <Link href={translation.href} className="text-xs font-semibold text-primary hover:underline">
                {locale === "fa" ? "English" : "فارسی"}
              </Link>
            ) : null}
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-end lg:gap-14">
            <div>
              <div className="mb-5 flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground sm:text-xs">
                <Link href={`/${locale}/blog/category/${encodeURIComponent(post.category)}`} className="text-primary hover:underline">
                  {post.categoryInfo?.title?.[locale] || post.category}
                </Link>
                <span>/</span>
                <span className="inline-flex items-center gap-1.5"><Clock3 className="size-3" />{t("readingTime", { minutes: post.readingTime || 1 })}</span>
              </div>
              <h1 className="max-w-5xl text-pretty font-serif text-[2.55rem] font-black leading-[0.98] tracking-[-0.045em] sm:text-5xl md:text-6xl lg:text-7xl">
                {post.title}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">{post.description}</p>
            </div>

            <div className="border-t border-border pt-5 lg:border-s lg:border-t-0 lg:ps-6 lg:pt-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{t("published")}</p>
              <time className="mt-2 flex items-center gap-2 font-serif text-lg font-bold">
                <CalendarDays className="size-4" />
                {formatBlogDate(post.date, locale)}
              </time>
              {post.updatedAt ? (
                <div className="mt-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{t("lastUpdated")}</p>
                  <time className="mt-1 block text-sm text-muted-foreground">{formatBlogDate(post.updatedAt, locale)}</time>
                </div>
              ) : null}
            </div>
          </div>

          {post.coverUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.coverUrl} alt="" className="mt-10 max-h-[560px] w-full rounded-2xl border border-border bg-muted object-cover" />
          ) : null}
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-16 lg:px-8 lg:py-20">
        <article className="min-w-0">
          <div className="mx-auto max-w-3xl">
            <MdxContent source={post.body} />
          </div>

          {!!post.tags?.length && (
            <footer className="mx-auto mt-14 max-w-3xl border-t border-border pt-8 sm:mt-20">
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{t("filedUnder")}</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link key={tag} href={`/${locale}/blog/tag/${encodeURIComponent(tag)}`} className="rounded-full border border-border bg-muted/30 px-3 py-1.5 text-xs text-muted-foreground hover:border-primary/50">
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
          <div className="sticky top-28 border-s border-border ps-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">{t("eyebrow")}</p>
            {author ? (
              <div className="mt-5 border-b border-border pb-5">
                {author.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={author.avatar} alt="" className="mb-3 size-12 rounded-full border border-border object-cover" />
                ) : null}
                <p className="font-serif text-lg font-black">{author.name}</p>
                {author.title ? <p className="mt-1 text-xs text-muted-foreground">{author.title}</p> : null}
              </div>
            ) : null}
            <div className="mt-5 text-sm leading-7 text-muted-foreground">
              <p>{post.categoryInfo?.title?.[locale] || post.category}</p>
              <p>{t("readingTime", { minutes: post.readingTime || 1 })}</p>
              <p>{formatBlogDate(post.date, locale)}</p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
