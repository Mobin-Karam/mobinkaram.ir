import Link from "next/link";
import { SectionHeading } from "@/components/ui/primitives";
import { getPostIndex } from "@/lib/blog";
import type { Locale } from "@/i18n/config";
import { LazySection, Skeleton } from "@/components/ui/primitives";

export const revalidate = 1800;

export default async function BlogIndex({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const posts = await getPostIndex(locale as "en" | "fa");

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="Blog"
        title="Engineering articles"
        description="Systems, performance, and product learnings."
      />
      <LazySection minHeight={260} skeleton={<Skeleton className="h-64" />}>
        <div className="grid gap-3 md:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/${locale}/blog/${post.slug}`}
              className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4 hover:-translate-y-0.5 hover:shadow-lg transition block"
            >
              <div className="flex items-center justify-between text-[11px] text-[color:var(--muted)]">
                <span>{post.date}</span>
                <span>{post.readingTime ?? 5} min read</span>
              </div>
              <p className="mt-2 text-sm font-semibold text-[color:var(--foreground)]">
                {post.title}
              </p>
              <p className="text-xs text-[color:var(--muted)] line-clamp-2">{post.description}</p>
              <div className="mt-2 flex flex-wrap gap-2 text-[10px] text-[color:var(--muted)]">
                {post.tags?.map((tag) => (
                  <span key={tag} className="pill text-[10px]">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </LazySection>
    </div>
  );
}
