import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock3 } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { formatBlogDate } from "@/lib/blog/date";
import type { BlogLocale, BlogPostMeta } from "@/types/blog";

export default async function BlogCard({
  post,
  locale,
  index = 0,
  featured = false,
}: {
  post: BlogPostMeta;
  locale: BlogLocale;
  index?: number;
  featured?: boolean;
}) {
  const t = await getTranslations({ locale, namespace: "blog" });

  return (
    <article className="min-w-0">
      <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
        <Link
          href={`/${locale}/blog/category/${encodeURIComponent(post.category)}`}
          className="text-primary hover:underline"
        >
          {post.categoryInfo?.title?.[locale] || post.category}
        </Link>
        <span aria-hidden="true">/</span>
        <span className="inline-flex items-center gap-1.5">
          <Clock3 className="size-3" />
          {t("readingTime", { minutes: post.readingTime || 1 })}
        </span>
        <span className="hidden sm:inline" aria-hidden="true">/</span>
        <span className="inline-flex w-full items-center gap-1.5 normal-case tracking-normal sm:w-auto">
          <CalendarDays className="size-3" />
          {formatBlogDate(post.date, locale)}
        </span>
        {featured && (
          <>
            <span aria-hidden="true">/</span>
            <span>{t("latestStory")}</span>
          </>
        )}
      </div>

      <div className={featured ? "grid gap-7 lg:grid-cols-[minmax(0,1.45fr)_minmax(220px,0.55fr)] lg:gap-10" : ""}>
        <div className="min-w-0">
          <p className="mb-3 font-serif text-xs italic text-muted-foreground">
            {t("storyNumber", { number: String(index + 1).padStart(3, "0") })}
          </p>

          <h2
            className={[
              "max-w-4xl text-pretty font-serif font-black leading-[1.04] tracking-[-0.035em]",
              featured ? "text-3xl sm:text-4xl lg:text-5xl xl:text-6xl" : "text-2xl sm:text-3xl lg:text-4xl",
            ].join(" ")}
          >
            <Link href={post.href} className="decoration-primary decoration-2 underline-offset-[6px] hover:underline">
              {post.title}
            </Link>
          </h2>

          <p className={[
            "mt-4 max-w-3xl text-pretty text-muted-foreground sm:mt-5",
            featured ? "text-sm leading-7 sm:text-base sm:leading-8 lg:text-lg" : "text-sm leading-7 sm:text-base",
          ].join(" ")}>
            {post.description}
          </p>

          {!!post.tags?.length && (
            <div className="mt-5 flex flex-wrap gap-2">
              {post.tags.slice(0, 4).map((tag) => (
                <Link
                  key={tag}
                  href={`/${locale}/blog/tag/${encodeURIComponent(tag)}`}
                  className="rounded-full border border-border px-2.5 py-1 text-[10px] text-muted-foreground hover:border-primary/50 hover:text-foreground"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}

          <Link
            href={post.href}
            className="mt-6 inline-flex min-h-10 items-center gap-2 border-b border-foreground pb-1 text-[10px] font-bold uppercase tracking-[0.16em] sm:mt-7 sm:text-xs"
          >
            {t("readMore")}
            <ArrowUpRight className="size-3.5 rtl:-scale-x-100" />
          </Link>
        </div>

        {featured && (
          <aside className="border-t border-border pt-6 lg:border-s lg:border-t-0 lg:ps-7 lg:pt-0">
            {post.coverUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.coverUrl}
                alt=""
                className="mb-5 aspect-[4/3] w-full rounded-xl border border-border object-cover"
              />
            ) : null}
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              {t("fromJournal")}
            </p>
            <blockquote className="mt-4 font-serif text-lg font-bold leading-7 sm:text-xl">
              “{t("journalQuote")}”
            </blockquote>
          </aside>
        )}
      </div>
    </article>
  );
}
