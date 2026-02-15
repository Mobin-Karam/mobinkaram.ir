 "use client";

import Link from "next/link";
import clsx from "clsx";
import { ArrowUpRight } from "lucide-react";
import type { Post } from "@/types/post";

type Props = {
  locale: string;
  post: Post;
  category?: string;
};

function isNew(date?: string, days = 4) {
  if (!date) return false;
  return Date.now() - Date.parse(date) <= days * 24 * 60 * 60 * 1000;
}

export function BlogHero({ locale, post, category }: Props) {
  const newBadge = isNew(post.date);
  const href = `/${locale}/blog/${category ?? "engineering"}/${post.slug}`;

  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-3xl border border-[color:var(--border)] bg-gradient-to-r from-[color:var(--surface)] via-[color:var(--background)] to-[color:var(--surface)] shadow-[var(--glow)] transition hover:-translate-y-0.5 hover:shadow-xl"
    >
      {post.cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.cover}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover opacity-50 transition duration-500 group-hover:opacity-70"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--background)] via-[color:var(--background)]/85 to-transparent" />

      <div className="relative z-10 flex flex-col gap-4 p-6 md:p-10">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-[color:var(--muted)]">
          <span className="rounded-full border border-[color:var(--border-strong)] bg-[color:var(--surface)] px-2 py-0.5 text-[10px]">
            Featured
          </span>
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readingTime ?? 5} min read</span>
          {newBadge ? (
            <span className="rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
              New
            </span>
          ) : null}
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-[color:var(--foreground)] md:text-3xl">
            {post.title}
          </h2>
          <p className="max-w-3xl text-sm text-[color:var(--muted)] md:text-base">
            {post.description}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {post.tags?.slice(0, 6).map((tag) => (
            <span
              key={tag}
              className="pill border-[color:var(--border-strong)] bg-[color:var(--surface)] text-[10px] uppercase"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold text-[color:var(--accent-strong)]">
          Read article
          <span
            className={clsx(
              "inline-flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--border-strong)] bg-[color:var(--surface)] transition group-hover:-translate-y-0.5 group-hover:scale-105",
            )}
          >
            <ArrowUpRight size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
}
