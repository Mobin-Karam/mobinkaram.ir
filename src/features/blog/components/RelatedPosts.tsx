import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import type { BlogLocale, BlogPostMeta } from "@/types/blog";

export default async function RelatedPosts({ posts, locale }: { posts: BlogPostMeta[]; locale: BlogLocale }) {
  if (!posts.length) return null;
  const t = await getTranslations({ locale, namespace: "blog" });

  return (
    <section className="mx-auto mt-16 max-w-3xl border-t border-border pt-10 font-mono lg:mt-20">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{t("keepReading")}</p>
      <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{t("relatedStories")}</h2>
      <div className="mt-7 divide-y divide-border border-y border-border">
        {posts.map((post) => (
          <Link key={post.path} href={post.href} className="grid gap-3 py-6 transition hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
                {post.categoryInfo?.title?.[locale] || post.category}
              </p>
              <h3 className="text-xl font-bold leading-7">&gt; {post.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{post.description}</p>
            </div>
            <ArrowUpRight className="size-5 rtl:-scale-x-100" />
          </Link>
        ))}
      </div>
    </section>
  );
}
