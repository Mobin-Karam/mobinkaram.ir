"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { Search, Tag, RefreshCcw, Sparkles } from "lucide-react";
import type { PostFrontmatter } from "@/types/post";

type Props = {
  posts: PostFrontmatter[];
  tags: string[];
  locale: string;
  category?: string;
};

function isNew(date?: string, days = 4) {
  if (!date) return false;
  return Date.now() - Date.parse(date) <= days * 24 * 60 * 60 * 1000;
}

export function BlogList({ posts, tags, locale, category }: Props) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string>("all");
  const [onlyNew, setOnlyNew] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  const filtered = useMemo(() => {
    const result = posts
      .filter((p) => (activeTag === "all" ? true : p.tags?.includes(activeTag)))
      .filter((p) => (onlyNew ? isNew(p.date) : true))
      .filter((p) => {
        if (!query.trim()) return true;
        const q = query.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
        );
      });
    return result;
  }, [posts, activeTag, onlyNew, query]);

  // Reset pagination when filters change
  const filteredLength = filtered.length;
  useMemo(() => {
    setVisibleCount(Math.min(6, filteredLength || 6));
  }, [filteredLength, activeTag, onlyNew, query]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4">
        <div className="flex items-center gap-2 rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 py-2">
          <Search size={16} className="text-[color:var(--muted)]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts..."
            className="w-48 bg-transparent text-sm text-[color:var(--foreground)] outline-none placeholder:text-[color:var(--muted)]"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-[11px] uppercase text-[color:var(--muted)]">Tags:</span>
          <button
            onClick={() => setActiveTag("all")}
            className={clsx(
              "pill text-[11px]",
              activeTag === "all"
                ? "border-[color:var(--accent-strong)] text-[color:var(--accent-strong)]"
                : "",
            )}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={clsx(
                "pill text-[11px]",
                activeTag === tag
                  ? "border-[color:var(--accent-strong)] text-[color:var(--accent-strong)]"
                  : "",
              )}
            >
              {tag}
            </button>
          ))}
        </div>
        <button
          onClick={() => setOnlyNew((v) => !v)}
          className={clsx(
            "inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition",
            onlyNew
              ? "border-amber-300 bg-amber-50 text-amber-800"
              : "border-[color:var(--border)] bg-[color:var(--background)] text-[color:var(--foreground)]",
          )}
        >
          <Sparkles size={14} />
          New only
        </button>
        <button
          onClick={() => {
            setQuery("");
            setActiveTag("all");
            setOnlyNew(false);
          }}
          className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--border)] px-3 py-2 text-xs font-semibold text-[color:var(--foreground)] transition hover:-translate-y-0.5"
        >
          <RefreshCcw size={14} />
          Reset
        </button>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {filtered.slice(0, visibleCount).map((post) => (
          <Link
            key={post.slug}
            href={`/${locale}/blog/${category ?? "engineering"}/${post.slug}`}
            className="group relative overflow-hidden rounded-2xl border border-[color:var(--border)] bg-gradient-to-br from-[color:var(--surface)] via-[color:var(--background)] to-[color:var(--surface)] p-4 shadow-[var(--glow)] transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            {post.cover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.cover}
                alt={post.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-10 transition duration-500 group-hover:opacity-15"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-10">
                <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.25),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(16,185,129,0.20),transparent_35%)]" />
              </div>
            )}
            <div className="relative z-10 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-[color:var(--muted)]">
                <span>{post.date}</span>
                <span>{post.readingTime ?? 5} min read</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {isNew(post.date) ? (
                  <span className="inline-flex items-center gap-1 rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
                    New
                  </span>
                ) : null}
                {post.tags?.slice(0, 3).map((tag) => (
                  <span key={tag} className="pill text-[10px]">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-base font-semibold text-[color:var(--foreground)]">{post.title}</p>
              <p className="text-sm text-[color:var(--muted)] line-clamp-2">{post.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length > visibleCount ? (
        <div className="flex justify-center">
          <button
            onClick={() => setVisibleCount((c) => c + 6)}
            className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-2 text-sm font-semibold text-[color:var(--foreground)] transition hover:-translate-y-0.5 hover:shadow-md"
          >
            Load more
          </button>
        </div>
      ) : null}

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[color:var(--border)] bg-[color:var(--surface)] p-6 text-center text-sm text-[color:var(--muted)]">
          No posts match your filters.
        </div>
      ) : null}
    </div>
  );
}
