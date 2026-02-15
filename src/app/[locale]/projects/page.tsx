import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/ui/primitives";
import { ProjectGrid } from "@/components/projects/project-grid";
import { getProjects } from "@/lib/engineer-data";
import type { Locale } from "@/i18n/config";
import { LazySection, Skeleton } from "@/components/ui/primitives";
import { SectionBackLink } from "@/components/ui/section-back-link";

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const projects = (await getProjects(locale)).map((p) => ({ meta: p.meta }));

  return (
    <div className="space-y-6">
      <SectionBackLink href={`/${locale}/build`} label="Back to Engineer hub" />
      <div className="flex items-center justify-between gap-3">
        <SectionHeading
          eyebrow={t("nav.projects")}
          title="Case studies with engineering detail"
          description="Each case covers the problem, architecture, trade-offs, failures, and learnings."
        />
      </div>
      <LazySection minHeight={260} skeleton={<Skeleton className="h-64" />}>
        <ProjectGrid projects={projects} locale={locale} />
      </LazySection>
    </div>
  );
}
