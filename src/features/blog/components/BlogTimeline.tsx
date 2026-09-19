import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { getBlogPostHref } from "@/lib/blog/url";
import type { BlogLocale, BlogPostMeta } from "@/types/blog";

export default async function BlogTimeline({
  posts,
  locale,
}: {
  posts: BlogPostMeta[];
  locale: BlogLocale;
}) {
  const t = await getTranslations({
    locale,
    namespace: "blog",
  });

  if (!posts.length) {
    return (
      <section className="border-y border-border py-12 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
          {t("empty.eyebrow")}
        </p>

        <h3 className="mt-2 font-serif text-xl font-bold">
          {t("empty.title")}
        </h3>

        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          {t("noPosts")}
        </p>
      </section>
    );
  }

  return (
    <section className="relative border-t border-border">
      <div
        aria-hidden="true"
        className="absolute bottom-0 start-[5px] top-0 w-px bg-border"
      />

      <div>
        {posts.map((post, index) => {
          const href = getBlogPostHref(post.date, locale, post.routeSlug);

          return (
            <article
              key={post.path}
              className="
                group relative grid
                grid-cols-[12px_minmax(0,1fr)]
                gap-x-3
                border-b border-border
                py-3
                sm:py-3.5
              "
            >
              {/* Timeline */}
              <div className="relative flex justify-start">
                <span className="relative z-10 mt-[7px] block size-2 rounded-full bg-primary ring-4 ring-background" />
              </div>

              {/* Content */}
              <div
                className="
                  min-w-0
                  sm:grid
                  sm:grid-cols-[70px_minmax(0,1fr)_auto]
                  sm:items-center
                  sm:gap-4
                "
              >
                {/* Date */}
                <div className="mb-1 flex items-center gap-2 text-[10px] text-muted-foreground sm:mb-0 sm:block">
                  <span className="font-serif font-bold text-foreground">
                    {post.dateParts.year}
                  </span>

                  <span className="sm:block">
                    {post.dateParts.month}/{post.dateParts.day}
                  </span>
                </div>

                {/* Main information */}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <Link
                      href={href}
                      className="truncate font-serif text-base font-bold leading-6 hover:underline hover:decoration-primary hover:underline-offset-4 sm:text-[17px]"
                    >
                      {post.title}
                    </Link>

                    <span className="hidden text-border sm:inline">/</span>

                    <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
                      {post.category}
                    </span>
                  </div>

                  <div className="mt-1 flex flex-wrap items-center gap-x-2 text-[10px] text-muted-foreground">
                    <span>
                      {t("readingTime", {
                        minutes: post.readingTime,
                      })}
                    </span>

                    <span>·</span>

                    <span>
                      {t("entry", {
                        number: String(posts.length - index).padStart(2, "0"),
                      })}
                    </span>

                    {post.tags?.length ? (
                      <>
                        <span className="hidden sm:inline">·</span>

                        <span className="hidden truncate sm:inline">
                          {post.tags
                            .slice(0, 3)
                            .map((tag) => `#${tag}`)
                            .join(" ")}
                        </span>
                      </>
                    ) : null}
                  </div>
                </div>

                {/* Open */}
                <Link
                  href={href}
                  aria-label={post.title}
                  className="
                    absolute end-0 top-3
                    hidden size-8
                    items-center justify-center
                    text-muted-foreground
                    hover:text-foreground
                    sm:static sm:flex
                  "
                >
                  <ArrowUpRight className="size-4 rtl:-scale-x-100" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
