import { SectionHeading } from "@/components/ui/primitives";
import { getBuildLogs } from "@/lib/engineer-data";
import type { Locale } from "@/i18n/config";
import Link from "next/link";
import { LazySection, Skeleton } from "@/components/ui/primitives";
import { BackButton } from "@/components/ui/back-button";
import { SectionBackLink } from "@/components/ui/section-back-link";

export default async function BuildLogPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const logs = await getBuildLogs(locale);

  return (
    <div className="space-y-6">
      <SectionBackLink href={`/${locale}/build`} label="Back to engineer hub" />
      <div className="flex items-center justify-between gap-3">
        <SectionHeading
          eyebrow="Build log"
          title="Short build notes"
          description="Brief, surgical notes on what changed today."
        />
      </div>
      <LazySection minHeight={260} skeleton={<Skeleton className="h-64" />}>
        <div className="grid gap-3 md:grid-cols-2">
          {logs.map((log) => (
            <Link
              key={log.meta.slug}
              href={`/${locale}/build-log/${log.meta.slug}`}
              className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              <div className="flex items-center justify-between text-xs text-[color:var(--muted)]">
                <span>{log.meta.date}</span>
                <span>{log.meta.readingMinutes} min read</span>
              </div>
              <p className="text-sm font-semibold text-[color:var(--foreground)]">
                {log.meta.title}
              </p>
              <p className="text-xs text-[color:var(--muted)]">
                {log.meta.summary}
              </p>
              <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-[color:var(--muted)]">
                <span className="pill text-[10px]">{log.meta.author}</span>
                {log.meta.tags.map((tag) => (
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
