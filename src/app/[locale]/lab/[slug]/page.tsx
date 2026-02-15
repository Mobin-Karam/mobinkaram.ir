import { notFound } from "next/navigation";
import { SectionHeading, LazySection, Skeleton } from "@/components/ui/primitives";
import { getLabEntries, getLabEntry } from "@/data/lab";
import { locales, type Locale } from "@/i18n/config";
import { ArticleMeta } from "@/components/ui/article-meta";
import { CoverImage } from "@/components/ui/cover-image";
import { PostActions } from "@/components/ui/post-actions";
import { SectionBackLink } from "@/components/ui/section-back-link";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getLabEntries(locale).map((entry) => ({
      locale,
      slug: entry.meta.slug,
    })),
  );
}

export default async function LabDetail({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const experiment = getLabEntry(locale, slug);
  if (!experiment) notFound();
  const Content = experiment.Component;
  const cover = experiment.meta.cover;

  return (
    <article className="space-y-6">
      <SectionBackLink href={`/${locale}/lab`} label="Back to lab" />
      <SectionHeading
        eyebrow="Experiment"
        title={experiment.meta.title}
        description={experiment.meta.summary}
      />
      <PostActions title={experiment.meta.title} />
      <ArticleMeta
        author={experiment.meta.author}
        date={experiment.meta.date}
        readingMinutes={experiment.meta.readingMinutes}
        avatarUrl={experiment.meta.authorAvatar}
      />
      <div className="flex flex-wrap gap-2">
        {experiment.meta.tags.map((tag) => (
          <span key={tag} className="pill">
            {tag}
          </span>
        ))}
        <span className="pill">{experiment.meta.area}</span>
        <span className="pill">{experiment.meta.readingMinutes} min read</span>
      </div>
      <CoverImage title={experiment.meta.title} cover={cover} />
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
