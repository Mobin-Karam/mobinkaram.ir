import { SectionHeading } from "@/components/ui/section-heading";
import { getLabEntries } from "@/data/lab";
import type { Locale } from "@/i18n/config";
import Link from "next/link";
import { LazySection } from "@/components/ui/lazy-section";
import { Skeleton } from "@/components/ui/skeleton";
import { BackButton } from "@/components/ui/back-button";

export default async function LabPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const experiments = getLabEntries(locale);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <SectionHeading
          eyebrow="Lab"
          title="Engineering experiments"
          description="Small, focused experiments on navigation, state, and performance."
        />
        <BackButton />
      </div>
      <LazySection minHeight={260} skeleton={<Skeleton className="h-64" />}>
        <div className="grid gap-3 md:grid-cols-2">
          {experiments.map((item) => (
            <Link
              key={item.meta.slug}
              href={`/${locale}/lab/${item.meta.slug}`}
              className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              <div className="flex items-center justify-between text-xs text-[color:var(--muted)]">
                <span>{item.meta.area}</span>
                <span>{item.meta.date}</span>
              </div>
              <p className="text-sm font-semibold text-[color:var(--foreground)]">
                {item.meta.title}
              </p>
              <p className="text-xs text-[color:var(--muted)] line-clamp-3">
                {item.meta.summary}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {item.meta.tags.map((tag) => (
                  <span key={tag} className="pill text-[10px]">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between text-[11px] text-[color:var(--muted)]">
                <span>{item.meta.readingMinutes} min read</span>
                <span className="text-[color:var(--accent-strong)]">Read →</span>
              </div>
            </Link>
          ))}
        </div>
      </LazySection>
    </div>
  );
}