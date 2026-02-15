import { notFound } from "next/navigation";
import { SectionHeading, LazySection, Skeleton } from "@/components/ui/primitives";
import { getProject, getProjects } from "@/data/projects";
import { locales, type Locale } from "@/i18n/config";
import { ArticleMeta } from "@/components/ui/article-meta";
import { CoverImage } from "@/components/ui/cover-image";
import { PostActions } from "@/components/ui/post-actions";
import { SectionBackLink } from "@/components/ui/section-back-link";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getProjects(locale).map((project) => ({
      locale,
      slug: project.meta.slug,
    })),
  );
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = getProject(locale, slug);
  if (!project) notFound();
  const Content = project.Component;
  const cover = project.meta.cover;

  return (
    <article className="space-y-6">
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
        author={project.meta.author}
        date={project.meta.date}
        readingMinutes={project.meta.readingMinutes}
        avatarUrl={project.meta.authorAvatar}
      />
      <div className="flex flex-wrap gap-2">
        {project.meta.tags.map((tag) => (
          <span key={tag} className="pill">
            {tag}
          </span>
        ))}
        <span className="pill">{project.meta.year}</span>
        {project.meta.status ? (
          <span className="pill">{project.meta.status}</span>
        ) : null}
        <span className="pill">{project.meta.readingMinutes} min read</span>
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
