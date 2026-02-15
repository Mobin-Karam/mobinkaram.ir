import Link from "next/link";
import { SectionHeading, Card } from "@/components/ui/primitives";
import { getPostIndex, getUniqueBlogTags } from "@/lib/blog";
import type { Locale } from "@/i18n/config";
import { LazySection, Skeleton } from "@/components/ui/primitives";
import { BlogHero } from "@/components/blog/blog-hero";
import { BlogList } from "@/components/blog/blog-list";
import { Rss } from "lucide-react";

export const revalidate = 1800;

export default async function BlogIndex({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const posts = await getPostIndex(locale as "en" | "fa");
  const tags = await getUniqueBlogTags(locale as "en" | "fa");

  if (!posts.length) {
    return (
      <div className="space-y-4">
        <SectionHeading eyebrow="Blog" title="Engineering articles" description="No posts yet." />
      </div>
    );
  }

  const [featured, ...rest] = posts;
  const newCount = posts.filter((p) => {
    const diff = Date.now() - Date.parse(p.date);
    return diff <= 4 * 24 * 60 * 60 * 1000;
  }).length;

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="Blog"
        title="Engineering articles"
        description="Systems, performance, and product learnings."
      />
      <LazySection minHeight={320} skeleton={<Skeleton className="h-80" />}>
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-[2fr,1fr]">
            <BlogHero locale={locale} post={featured as any} />
            <Card className="flex flex-col gap-3 p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-[color:var(--foreground)]">Blog stats</p>
                <Link
                  href="/rss.xml"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border border-[color:var(--border)] px-3 py-1 text-[12px] font-semibold text-[color:var(--accent-strong)] hover:-translate-y-0.5 transition"
                >
                  <Rss size={14} />
                  RSS
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] p-3">
                  <p className="text-[11px] uppercase text-[color:var(--muted)]">Posts</p>
                  <p className="text-2xl font-semibold text-[color:var(--foreground)]">
                    {posts.length}
                  </p>
                </div>
                <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] p-3">
                  <p className="text-[11px] uppercase text-[color:var(--muted)]">New</p>
                  <p className="text-2xl font-semibold text-[color:var(--foreground)]">
                    {newCount}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-[11px] uppercase text-[color:var(--muted)]">Topics</p>
                <div className="flex flex-wrap gap-2">
                  {tags.slice(0, 10).map((tag) => (
                    <span key={tag} className="pill text-[11px]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          <BlogList posts={rest} tags={tags} locale={locale} />
        </div>
      </LazySection>
    </div>
  );
}
