import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/ui/section-heading";
import { getBuildLogs, getLog } from "@/data/logs";
import { locales, type Locale } from "@/i18n/config";
import { ArticleMeta } from "@/components/ui/article-meta";
import { LazySection } from "@/components/ui/lazy-section";
import { Skeleton } from "@/components/ui/skeleton";
import { CoverImage } from "@/components/ui/cover-image";
import { PostActions } from "@/components/ui/post-actions";
import { SectionBackLink } from "@/components/ui/section-back-link";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getBuildLogs(locale).map((log) => ({
      locale,
      slug: log.meta.slug,
    })),
  );
}

export default async function BuildLogDetail({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const log = getLog(locale, slug);
  if (!log) notFound();
  const Content = log.Component;
  const cover = log.meta.cover;

  return (
    <article className="space-y-6">
      <SectionBackLink
        href={`/${locale}/build-log`}
        label="Back to build log"
      />
      <SectionHeading
        eyebrow="Log"
        title={log.meta.title}
        description={log.meta.summary}
      />
      <PostActions title={log.meta.title} />
      <ArticleMeta
        author={log.meta.author}
        date={log.meta.date}
        readingMinutes={log.meta.readingMinutes}
        avatarUrl={log.meta.authorAvatar}
      />
      <div className="flex flex-wrap gap-2">
        {log.meta.tags.map((tag) => (
          <span key={tag} className="pill">
            {tag}
          </span>
        ))}
        <span className="pill">{log.meta.readingMinutes} min read</span>
      </div>
      <CoverImage title={log.meta.title} cover={cover} />
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
