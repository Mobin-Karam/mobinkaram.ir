import { notFound } from "next/navigation";
import Script from "next/script";
import { SectionHeading, LazySection, Skeleton, Pill } from "@/components/ui/primitives";
import { getLabEntries, getLabEntry } from "@/lib/engineer-data";
import { locales, type Locale } from "@/i18n/config";
import { ArticleMeta } from "@/components/ui/article-meta";
import { CoverImage } from "@/components/ui/cover-image";
import { PostActions } from "@/components/ui/post-actions";
import { SectionBackLink } from "@/components/ui/section-back-link";
import { articleLd, siteUrl } from "@/lib/seo";

export function generateStaticParams() {
  return [];
}

export default async function LabDetail({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const experiment = await getLabEntry(locale, slug);
  if (!experiment) notFound();
  const Content = experiment.Component;
  const cover = experiment.meta.cover;
  const ld = articleLd({
    title: experiment.meta.title,
    description: experiment.meta.summary,
    url: `${siteUrl}/${locale}/lab/${slug}`,
    datePublished: experiment.meta.date,
    author: experiment.meta.author,
    tags: experiment.meta.tags,
    image: cover,
  });

  return (
    <article className="space-y-6">
      <Script
        id={`ld-lab-${slug}`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <SectionBackLink href={`/${locale}/lab`} label="Back to lab" />
      <SectionHeading
        eyebrow="Experiment"
        title={experiment.meta.title}
        description={experiment.meta.summary}
      />
      <PostActions title={experiment.meta.title} />
      <ArticleMeta
        author={experiment.meta.author ?? "Mobin Karam"}
        date={experiment.meta.date ?? ""}
        readingMinutes={experiment.meta.readingMinutes ?? 3}
        avatarUrl={experiment.meta.authorAvatar}
      />
      <div className="flex flex-wrap gap-2">
        {experiment.meta.tags.map((tag) => (
          <Pill key={tag}>{tag}</Pill>
        ))}
        <Pill>{experiment.meta.area}</Pill>
        <Pill>{experiment.meta.readingMinutes} min read</Pill>
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
