import { notFound } from "next/navigation";
import Script from "next/script";
import { SectionHeading, LazySection, Skeleton, Pill } from "@/components/ui/primitives";
import { ArticleMeta } from "@/components/ui/article-meta";
import { CoverImage } from "@/components/ui/cover-image";
import { PostActions } from "@/components/ui/post-actions";
import { SectionBackLink } from "@/components/ui/section-back-link";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { siteUrl, articleLd } from "@/lib/seo";
import type { Locale } from "@/i18n/config";

export const revalidate = 1800;

export async function generateStaticParams() {
  return getAllSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = await getPostBySlug(locale as "en" | "fa", slug);
  if (!post) return {};
  const fm = post.frontmatter;
  const url = `${siteUrl}/${locale}/blog/${fm.slug}`;
  const image = fm.cover;
  return {
    title: fm.title,
    description: fm.description,
    alternates: { canonical: url },
    openGraph: {
      title: fm.title,
      description: fm.description,
      url,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: fm.title,
      description: fm.description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const result = await getPostBySlug(locale as "en" | "fa", slug);
  if (!result) notFound();
  const { content, frontmatter } = result;
  const ld = articleLd({
    title: frontmatter.title,
    description: frontmatter.description,
    url: `${siteUrl}/${locale}/blog/${frontmatter.slug}`,
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
      <SectionBackLink href={`/${locale}/blog`} label="Back to blog" />
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
      </div>
      <CoverImage title={frontmatter.title} cover={frontmatter.cover} />
      <LazySection minHeight={320} skeleton={<Skeleton className="h-80" />}>
        <div className="mdx-card p-6">
          <div className="mdx-content prose max-w-none">{content}</div>
        </div>
      </LazySection>
    </article>
  );
}
