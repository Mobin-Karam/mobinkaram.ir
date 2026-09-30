import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import type { BlogLocale, BlogPostMeta } from "@/types/blog";

export default async function RelatedPosts({ posts, locale }: { posts: BlogPostMeta[]; locale: BlogLocale }) {
  if (!posts.length) return null;
  const t = await getTranslations({ locale, namespace: "blog" });

  return (
    <section className="mx-auto mt-14 max-w-2xl border-t border-border pt-8 sm:mt-16">
      <p className="font-mono text-[10px] font-medium tracking-[0.14em] text-primary">{t("keepReading")}</p>
      <h2 className="mt-2 text-xl font-semibold sm:text-2xl">{t("relatedStories")}</h2>
      <div className="mt-5 grid gap-3">
        {posts.map((post) => (
          <Link key={post.path} href={post.href} className="grid gap-3 rounded-xl border border-border bg-card p-4 transition hover:border-primary hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <p className="mb-2 font-mono text-[10px] font-medium tracking-[0.1em] text-primary">
                {post.categoryInfo?.title?.[locale] || post.category}
              </p>
              <h3 className="text-base font-semibold leading-6">{post.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm leading-6 text-muted-foreground">{post.description}</p>
            </div>
            <ArrowUpRight className="size-5 rtl:-scale-x-100" />
          </Link>
        ))}
      </div>
    </section>
  );
}
