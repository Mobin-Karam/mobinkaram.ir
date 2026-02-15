import { notFound } from "next/navigation";
import Script from "next/script";
import { SectionHeading, LazySection, Skeleton, Pill } from "@/components/ui/primitives";
import { ArticleMeta } from "@/components/ui/article-meta";
import { CoverImage } from "@/components/ui/cover-image";
import { PostActions } from "@/components/ui/post-actions";
import { SectionBackLink } from "@/components/ui/section-back-link";
import {
  getAllSlugCategories,
  getPostBySlug,
  getRelatedPosts,
  isPostNew,
  categorizePost,
} from "@/lib/blog";
import { siteUrl, articleLd } from "@/lib/seo";
import type { Locale } from "@/i18n/config";
import Link from "next/link";

export const revalidate = 1800;
export const dynamicParams = true;

export async function generateStaticParams() {
  return getAllSlugCategories();
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string; category: string }>;
}) {
  const { locale, slug } = await params;
  const result = await getPostBySlug(locale as "en" | "fa", (await params).category, slug);
  if (!result) notFound();
  const { content, frontmatter } = result;
  const category = categorizePost(frontmatter);
  const related = await getRelatedPosts(
    locale as "en" | "fa",
    frontmatter.slug,
    frontmatter.tags ?? [],
  );
  const postsInLocale = (await getAllSlugCategories()).filter((p) => p.locale === locale);
  const slugs = postsInLocale.map((p) => p.slug);
  const currentIndex = slugs.indexOf(frontmatter.slug);
  const prevSlug = currentIndex > 0 ? slugs[currentIndex - 1] : null;
  const nextSlug = currentIndex >= 0 && currentIndex < slugs.length - 1 ? slugs[currentIndex + 1] : null;
  const ld = articleLd({
    title: frontmatter.title,
    description: frontmatter.description,
    url: `${siteUrl}/${locale}/blog/${category}/${frontmatter.slug}`,
    datePublished: frontmatter.date,
    author: frontmatter.author ?? "Mobin Karam",
    tags: frontmatter.tags,
    image: frontmatter.cover,
  });

  return (
    <article className="space-y-6">
      <Script
        id={`ld-blog-${frontmatter.slug}`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <SectionBackLink href={`/${locale}/blog/${category}`} label="Back to blog" />
      <SectionHeading
        eyebrow="Blog"
        title={frontmatter.title}
        description={frontmatter.description}
      />
      <PostActions title={frontmatter.title} />
      <ArticleMeta
        author={frontmatter.author ?? "Mobin Karam"}
        date={frontmatter.date}
        readingMinutes={frontmatter.readingTime ?? 5}
        avatarUrl={frontmatter.author ? `https://github.com/Mobin-Karam.png` : undefined}
      />
      <div className="flex flex-wrap gap-2">
        {frontmatter.tags?.map((tag) => (
          <Pill key={tag}>{tag}</Pill>
        ))}
        <Pill>{frontmatter.readingTime ?? 5} min read</Pill>
        {isPostNew(frontmatter.date) ? (
          <Pill className="border-amber-300 bg-amber-50 text-amber-800">New</Pill>
        ) : null}
      </div>
      <CoverImage title={frontmatter.title} cover={frontmatter.cover} />
      <LazySection minHeight={320} skeleton={<Skeleton className="h-80" />}>
        <div className="mdx-card p-6">
          <div className="mdx-content prose max-w-none">{content}</div>
        </div>
      </LazySection>

      <div className="grid gap-3 md:grid-cols-2">
        <Link
          href={`/${locale}/blog/${category}/${prevSlug ?? frontmatter.slug}`}
          className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4 hover:-translate-y-0.5 hover:shadow-md transition block text-left"
        >
          <p className="text-[10px] uppercase text-[color:var(--muted)]">Previous</p>
          <p className="text-sm font-semibold text-[color:var(--foreground)] line-clamp-2">
            {prevSlug ?? frontmatter.slug}
          </p>
        </Link>
        <Link
          href={`/${locale}/blog/${category}/${nextSlug ?? frontmatter.slug}`}
          className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4 hover:-translate-y-0.5 hover:shadow-md transition block text-right"
        >
          <p className="text-[10px] uppercase text-[color:var(--muted)]">Next</p>
          <p className="text-sm font-semibold text-[color:var(--foreground)] line-clamp-2">
            {nextSlug ?? frontmatter.slug}
          </p>
        </Link>
      </div>

      {related.length ? (
        <div className="card p-5">
          <SectionHeading eyebrow="Related" title="You might also like" />
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {related.map((post) => {
              const cat = categorizePost(post as any);
              return (
                <Link
                  key={post.slug}
                  href={`/${locale}/blog/${cat}/${post.slug}`}
                  className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-3 hover:-translate-y-0.5 hover:shadow-md transition block"
                >
                  <div className="flex items-center justify-between text-[11px] text-[color:var(--muted)]">
                    <span>{post.date}</span>
                    <span>{post.readingTime ?? 5} min</span>
                  </div>
                  {isPostNew(post.date) ? (
                    <span className="mt-1 inline-flex items-center gap-1 rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
                      New
                    </span>
                  ) : null}
                  <p className="text-sm font-semibold text-[color:var(--foreground)] line-clamp-2">
                    {post.title}
                  </p>
                  <p className="text-xs text-[color:var(--muted)] line-clamp-2">
                    {post.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </article>
  );
}
