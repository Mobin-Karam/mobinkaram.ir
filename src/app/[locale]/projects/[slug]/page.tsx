import { notFound } from "next/navigation";
import Script from "next/script";
import { SectionHeading, LazySection, Skeleton, Pill } from "@/components/ui/primitives";
import { getProject, getProjects } from "@/lib/engineer-data";
import { locales, type Locale } from "@/i18n/config";
import { ArticleMeta } from "@/components/ui/article-meta";
import { CoverImage } from "@/components/ui/cover-image";
import { PostActions } from "@/components/ui/post-actions";
import { SectionBackLink } from "@/components/ui/section-back-link";
import { articleLd, siteUrl, absoluteUrl } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = await getProject(locale, slug);
  if (!project) return {};
  const title = `${project.meta.title} | Case study`;
  const description = project.meta.summary;
  const url = `${siteUrl}/${locale}/projects/${slug}`;
  const image = absoluteUrl(project.meta.cover);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export function generateStaticParams() {
  return [];
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = await getProject(locale, slug);
  if (!project) notFound();
  const Content = project.Component;
  const cover = project.meta.cover;
  const ld = articleLd({
    title: project.meta.title,
    description: project.meta.summary,
    url: `${siteUrl}/${locale}/projects/${slug}`,
    datePublished: project.meta.date,
    author: project.meta.author,
    tags: project.meta.tags,
    image: cover,
  });

  return (
    <article className="space-y-6">
      <Script
        id={`ld-project-${slug}`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <SectionBackLink
        href={`/${locale}/projects`}
        label="Back to case studies"
      />
      <SectionHeading
        eyebrow="Case study"
        title={project.meta.title}
        description={project.meta.summary}
      />
      <PostActions title={project.meta.title} />
      <ArticleMeta
        author={project.meta.author ?? "Mobin Karam"}
        date={project.meta.date ?? ""}
        readingMinutes={project.meta.readingMinutes ?? 5}
        avatarUrl={project.meta.authorAvatar}
      />
      <div className="flex flex-wrap gap-2">
        {project.meta.tags.map((tag) => (
          <Pill key={tag}>{tag}</Pill>
        ))}
        <Pill>{project.meta.year}</Pill>
        {project.meta.status ? <Pill>{project.meta.status}</Pill> : null}
        <Pill>{project.meta.readingMinutes} min read</Pill>
      </div>
      <CoverImage title={project.meta.title} cover={cover} />
      <LazySection minHeight={320} skeleton={<Skeleton className="h-80" />}>
        <div className="mdx-card p-6">
          <div className="mdx-content prose max-w-none">
            <Content />
          </div>
        </div>
      </LazySection>
    </article>
  );
}
