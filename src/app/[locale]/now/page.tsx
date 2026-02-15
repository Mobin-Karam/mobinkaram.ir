import { SectionHeading } from "@/components/ui/section-heading";
import { getNowBlocks } from "@/data/now";
import type { Locale } from "@/i18n/config";
import { GitHubActivity } from "@/components/widgets/github-activity";
import { LazySection } from "@/components/ui/lazy-section";
import { Skeleton } from "@/components/ui/skeleton";

export default async function NowPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const currentLocale = (locale as Locale) ?? "en";
  const blocks = getNowBlocks(currentLocale) ?? [];

  return (
    <div className="space-y-6">
      <LazySection minHeight={180} skeleton={<Skeleton className="h-44" />}>
        <SectionHeading
          eyebrow="Now"
          title="What I'm focused on now"
          description="Kept fresh to show real coding and research focus."
        />
        <div className="grid gap-3 md:grid-cols-3">
          {blocks.map((block) => (
            <div
              key={block.title}
              className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4"
            >
              <p className="text-sm font-semibold text-[color:var(--foreground)]">
                {block.title}
              </p>
              <ul className="mt-2 space-y-2 text-sm text-[color:var(--muted)]">
                {block.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </LazySection>

      <LazySection minHeight={220} skeleton={<Skeleton className="h-52" />}>
        <div className="card p-5">
          <SectionHeading
            eyebrow="Live activity"
            title="Latest GitHub activity"
          />
          <GitHubActivity username="Mobin-Karam" locale={currentLocale} />
        </div>
      </LazySection>
    </div>
  );
}
