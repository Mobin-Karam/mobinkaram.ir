"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import type { BlogLocale, BlogPostMeta } from "@/types/blog";

export default function BlogDiscovery({ posts, locale }: { posts: BlogPostMeta[]; locale: BlogLocale }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const categories = useMemo(() => Array.from(new Map(posts.map((post) => [post.category, post.categoryInfo?.title?.[locale] || post.category])).entries()), [posts, locale]);
  const results = useMemo(() => posts.filter((post) => {
    const matchesCategory = category === "all" || post.category === category;
    const term = query.trim().toLocaleLowerCase();
    const matchesQuery = !term || `${post.title} ${post.description} ${(post.tags || []).join(" ")}`.toLocaleLowerCase().includes(term);
    return matchesCategory && matchesQuery;
  }), [posts, category, query]);

  return <section aria-labelledby="discover-stories" className="mt-12 border-t border-border pt-8 font-mono sm:mt-16 sm:pt-10">
    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">$ grep --stories</p><h2 id="discover-stories" className="mt-2 text-2xl font-bold sm:text-3xl">{locale === "fa" ? "نوشته‌ای پیدا کنید" : "Find a story"}</h2></div>
      <label className="flex min-h-11 w-full max-w-sm items-center gap-2 border border-border bg-card px-3 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary sm:w-80"><Search className="size-4 text-primary" aria-hidden="true" /><span className="sr-only">{locale === "fa" ? "جست‌وجوی نوشته‌ها" : "Search stories"}</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={locale === "fa" ? "جست‌وجوی نوشته‌ها" : "Search stories"} className="min-w-0 flex-1 bg-transparent text-sm outline-none" /></label>
    </div>
    <div className="mt-5 flex gap-2 overflow-x-auto pb-1" aria-label={locale === "fa" ? "دسته‌بندی‌ها" : "Categories"}>{[["all", locale === "fa" ? "همه" : "All"], ...categories].map(([value, label]) => <button type="button" key={value} onClick={() => setCategory(value)} className={`min-h-9 shrink-0 border px-3 text-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${category === value ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary"}`}>--{label}</button>)}</div>
    <div className="mt-7 grid gap-4 md:grid-cols-2">{results.map((post, index) => <article key={post.path} className="group border border-border bg-card p-5 transition hover:border-primary hover:shadow-[5px_5px_0_color-mix(in_srgb,var(--color-primary)_35%,transparent)] focus-within:ring-2 focus-within:ring-primary"><div className="flex items-center justify-between gap-3 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground"><Link href={`/${locale}/blog/category/${encodeURIComponent(post.category)}`} className="text-primary hover:underline">[{post.categoryInfo?.title?.[locale] || post.category}]</Link><span>#{String(index + 1).padStart(3, "0")} · {post.readingTime || 1}m</span></div><h3 className="mt-4 text-xl font-bold leading-tight"><Link href={post.href} className="focus-visible:outline-none hover:text-primary">{post.title} <span aria-hidden="true">→</span></Link></h3><p className="mt-3 line-clamp-3 text-sm leading-7 text-muted-foreground">{post.description}</p><div className="mt-5 flex flex-wrap gap-2">{post.tags?.slice(0, 3).map((tag) => <Link key={tag} href={`/${locale}/blog/tag/${encodeURIComponent(tag)}`} className="border border-border px-2 py-1 text-[10px] text-muted-foreground hover:border-primary hover:text-primary">#{tag}</Link>)}</div></article>)}</div>
    {!results.length ? <p className="mt-7 rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">{locale === "fa" ? "نوشته‌ای با این جست‌وجو پیدا نشد." : "No stories match this search."}</p> : null}
  </section>;
}
