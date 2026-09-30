"use client";

import { HeroSection } from "./hero-section";
import { ContactSection } from "./contact-section";
import { PortfolioChat } from "@/features/portfolio/components/portfolio-chat";
import Link from "next/link";
import type { BlogPostMeta } from "@/types/blog";

export function HomeClient({ posts, locale }: { posts: BlogPostMeta[]; locale: string }) {
  return (
    <>
      <main className="home-story overflow-x-clip">
        <HeroSection />
        <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="latest-stories">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Journal</p><h2 id="latest-stories" className="mt-2 font-serif text-3xl font-black sm:text-4xl">{locale === "fa" ? "آخرین نوشته‌ها" : "Latest stories"}</h2></div>
            <Link href={`/${locale}/blog`} className="text-sm font-semibold text-primary hover:underline">{locale === "fa" ? "همه نوشته‌ها" : "View all"}</Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">{posts.map((post) => <Link key={post.path} href={post.href} className="rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-1 hover:border-primary/50"><p className="text-xs text-muted-foreground">{post.category}</p><h3 className="mt-3 font-serif text-xl font-bold">{post.title}</h3><p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{post.description}</p></Link>)}</div>
        </section>
        <ContactSection />
      </main>
    </>
  );
}
