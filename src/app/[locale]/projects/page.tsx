import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectGrid } from "@/components/projects/project-grid";
import { getProjects } from "@/data/projects";
import type { Locale } from "@/i18n/config";
import { LazySection } from "@/components/ui/lazy-section";
import { Skeleton } from "@/components/ui/skeleton";

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const projects = getProjects(locale).map((p) => ({ meta: p.meta }));

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow={t("nav.projects")}
        title="Case studies with engineering detail"
        description="Each case covers the problem, architecture, trade-offs, failures, and learnings."
      />
      <LazySection minHeight={260} skeleton={<Skeleton className="h-64" />}>
        <ProjectGrid projects={projects} locale={locale} />
      </LazySection>
    </div>
  );
}
