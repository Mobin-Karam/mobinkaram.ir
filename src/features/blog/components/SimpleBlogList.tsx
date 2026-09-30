"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import type { BlogLocale, BlogPostMeta } from "@/types/blog";

const PAGE_SIZE = 8;

export default function SimpleBlogList({
  posts,
  locale,
}: {
  posts: BlogPostMeta[];
  locale: BlogLocale;
}) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const isFa = locale === "fa";
  const matches = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    if (!term) return posts;
    return posts.filter((post) =>
      `${post.title} ${post.description} ${(post.tags ?? []).join(" ")}`
        .toLocaleLowerCase()
        .includes(term),
    );
  }, [posts, query]);
  const pageCount = Math.max(1, Math.ceil(matches.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount - 1);
  const visible = matches.slice(
    currentPage * PAGE_SIZE,
    (currentPage + 1) * PAGE_SIZE,
  );

  function updateQuery(value: string) {
    setQuery(value);
    setPage(0);
  }

  return (
    <section
      className="mx-auto w-full max-w-2xl px-5 pb-16 pt-28 sm:pt-32"
      aria-label={isFa ? "فهرست نوشته‌ها" : "Post list"}
    >
      <label className="flex h-12 items-center gap-3 border-b border-border text-muted-foreground focus-within:border-primary">
        <Search className="size-4 shrink-0" aria-hidden="true" />
        <span className="sr-only">
          {isFa ? "جست‌وجوی نوشته‌ها" : "Search posts"}
        </span>
        <input
          type="search"
          value={query}
          onChange={(event) => updateQuery(event.target.value)}
          placeholder={isFa ? "جست‌وجو در نوشته‌ها" : "Search posts"}
          className="h-full min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
      </label>

      {visible.length ? (
        <ol className="divide-y divide-border border-y border-border">
          {visible.map((post) => (
            <li key={post.path}>
              <Link
                href={post.href}
                className="block py-5 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <div className="flex items-baseline justify-between gap-5">
                  <h2 className="min-w-0 text-base font-medium leading-7 sm:text-lg">
                    {post.title}
                  </h2>
                  <time className="shrink-0 font-mono text-xs text-muted-foreground">
                    {post.dateParts.year}/{post.dateParts.month}/
                    {post.dateParts.day}
                  </time>
                </div>
                <p className="mt-1 line-clamp-1 text-sm leading-6 text-muted-foreground">
                  {post.description}
                </p>
              </Link>
            </li>
          ))}
        </ol>
      ) : (
        <p className="border-y border-border py-10 text-center text-sm text-muted-foreground">
          {isFa ? "نوشته‌ای پیدا نشد." : "No posts found."}
        </p>
      )}

      <nav
        dir="ltr"
        className="mt-8 grid w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 text-sm"
        aria-label={isFa ? "صفحه‌بندی" : "Pagination"}
      >
        <button
          type="button"
          onClick={() => setPage((value) => Math.max(0, value - 1))}
          disabled={currentPage === 0}
          aria-label={isFa ? "صفحه قبل" : "Previous page"}
          className="min-h-11 justify-self-start px-1 py-2 text-muted-foreground transition hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
        >
          {isFa ? "قبلی" : "Previous"}
        </button>
        <span className="font-mono text-xs text-muted-foreground" dir="ltr">
          {currentPage + 1} / {pageCount}
        </span>
        <button
          type="button"
          onClick={() => setPage((value) => Math.min(pageCount - 1, value + 1))}
          disabled={currentPage >= pageCount - 1}
          aria-label={isFa ? "صفحه بعد" : "Next page"}
          className="min-h-11 justify-self-end px-1 py-2 text-muted-foreground transition hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
        >
          {isFa ? "بعدی" : "Next"}
        </button>
      </nav>
    </section>
  );
}
