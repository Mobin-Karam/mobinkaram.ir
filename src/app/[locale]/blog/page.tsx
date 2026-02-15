import Link from "next/link";
import { SectionHeading, Card } from "@/components/ui/primitives";
import { getPostIndex, getUniqueBlogTags, categorizePost } from "@/lib/blog";
import { getCategories } from "@/lib/categories";
import type { Locale } from "@/i18n/config";
import { LazySection, Skeleton } from "@/components/ui/primitives";
import { BlogHero } from "@/components/blog/blog-hero";
import { BlogList } from "@/components/blog/blog-list";
import { Rss } from "lucide-react";
import { BlogStats } from "@/components/blog/blog-stats";
import { CategoryPicker } from "@/components/blog/category-picker";

export const revalidate = 1800;

export default async function BlogIndex({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const posts = await getPostIndex(locale as "en" | "fa");
  const tags = await getUniqueBlogTags(locale as "en" | "fa");
  const categories = await getCategories();

  if (!posts.length) {
    return (
      <div className="space-y-4">
        <SectionHeading
          eyebrow="Blog"
          title="Engineering articles"
          description="No posts yet."
        />
      </div>
    );
  }

  const [featured, ...rest] = posts;
  const categoriesWithCounts = categories.map((c) => ({
    ...c,
    count: posts.filter(
      (p) => (p as any).category === c.slug || categorizePost(p) === c.slug,
    ).length,
  }));
  const newCount = posts.filter((p) => {
    const diff = Date.now() - Date.parse(p.date);
    return diff <= 4 * 24 * 60 * 60 * 1000;
  }).length;

  const now = Date.now();
  const daysAgo = (days: number) => now - days * 24 * 60 * 60 * 1000;
  const countSince = (days?: number | null) =>
    posts.filter((p) => (days ? Date.parse(p.date) >= daysAgo(days) : true))
      .length;
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
          <CategoryPicker
            locale={locale}
            categories={categoriesWithCounts.map((c) => ({
              slug: c.slug,
              title: c.title?.[locale] ?? c.title?.en ?? c.slug,
              count: c.count,
            }))}
          />
          <div className="grid gap-4 md:grid-cols-2">
            {categoriesWithCounts.map((c) => {
              const theme = c.theme ?? {};
              const style: React.CSSProperties = {
                backgroundImage: theme.bgPattern ? `url(${theme.bgPattern})` : undefined,
                backgroundColor: theme.background ?? undefined,
                color: theme.text ?? undefined,
              };
              return (
                <Card
                  key={c.slug}
                  className="relative overflow-hidden"
                  style={style}
                >
                  {c.iconPath ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={c.iconPath}
                      alt={c.slug}
                      className="absolute right-3 top-3 h-8 w-8 opacity-60"
                      loading="lazy"
                    />
                  ) : null}
                  <SectionHeading
                    eyebrow="Category"
                    title={c.title?.[locale] ?? c.title?.en ?? c.slug}
                    description={c.description?.[locale] ?? c.description?.en ?? ""}
                  />
                  <p className="text-sm text-[color:var(--muted)]">{c.count} posts available.</p>
                  <Link
                    href={`/${locale}/blog/${c.slug}`}
                    className="mt-3 inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] px-3 py-1 text-sm font-semibold text-[color:var(--accent-strong)] hover:-translate-y-0.5 transition"
                  >
                    View {c.title?.[locale] ?? c.title?.en ?? c.slug}
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      </LazySection>
    </div>
  );
}
