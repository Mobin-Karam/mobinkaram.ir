import Link from "next/link";
import { SectionHeading, Card } from "@/components/ui/primitives";
import { getPostIndex, getUniqueBlogTags, categorizePost } from "@/lib/blog";
import type { Locale } from "@/i18n/config";
import { LazySection, Skeleton } from "@/components/ui/primitives";
import { BlogHero } from "@/components/blog/blog-hero";
import { BlogList } from "@/components/blog/blog-list";
import { Rss } from "lucide-react";
import { BlogStats } from "@/components/blog/blog-stats";

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

  const islamPosts = posts.filter((p) => categorizePost(p) === "islam");
  const engineeringPosts = posts.filter((p) => categorizePost(p) === "engineering");

  const now = Date.now();
  const daysAgo = (days: number) => now - days * 24 * 60 * 60 * 1000;
  const countSince = (days?: number | null) =>
    posts.filter((p) => (days ? Date.parse(p.date) >= daysAgo(days) : true)).length;
  const stats = [
    { label: "7 days", days: 7, count: countSince(7) },
    { label: "30 days", days: 30, count: countSince(30) },
    { label: "60 days", days: 60, count: countSince(60) },
    { label: "90 days", days: 90, count: countSince(90) },
    { label: "1 year", days: 365, count: countSince(365) },
    { label: "All time", days: null, count: posts.length },
  ];

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="Blog"
        title="Blog"
        description="Choose a category to dive into the writing."
      />
      <LazySection minHeight={320} skeleton={<Skeleton className="h-80" />}>
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-[2fr,1fr]">
            <BlogHero
              locale={locale}
              post={featured as any}
              category={categorizePost(featured as any)}
            />
            <Card className="flex flex-col gap-4 p-5">
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
              <BlogStats stats={stats} />
              <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)] p-3 text-sm">
                <p className="text-[11px] uppercase text-[color:var(--muted)]">New posts</p>
                <p className="text-2xl font-semibold text-[color:var(--foreground)]">{newCount}</p>
              </div>
              <div className="space-y-2">
                <p className="text-[11px] uppercase text-[color:var(--muted)]">Topics</p>
                <div className="flex flex-wrap gap-2">
                  {tags.slice(0, 12).map((tag) => (
                    <span key={tag} className="pill text-[11px]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="p-5">
              <SectionHeading eyebrow="Category" title="Engineering" />
              <p className="text-sm text-[color:var(--muted)]">
                Systems, product, and delivery writing. {engineeringPosts.length} posts.
              </p>
              <Link
                href={`/${locale}/blog/engineering`}
                className="mt-3 inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] px-3 py-1 text-sm font-semibold text-[color:var(--accent-strong)] hover:-translate-y-0.5 transition"
              >
                View engineering
              </Link>
            </Card>

            <Card className="p-5">
              <SectionHeading eyebrow="Category" title="Islam" />
              <p className="text-sm text-[color:var(--muted)]">
                Faith, practice, and reflections. {islamPosts.length} posts.
              </p>
              <Link
                href={`/${locale}/blog/islam`}
                className="mt-3 inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] px-3 py-1 text-sm font-semibold text-[color:var(--accent-strong)] hover:-translate-y-0.5 transition"
              >
                View Islam
              </Link>
            </Card>
          </div>
        </div>
      </LazySection>
    </div>
  );
}
