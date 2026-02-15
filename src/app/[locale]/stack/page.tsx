import { SectionHeading } from "@/components/ui/section-heading";
import { stackReasons } from "@/data/stack";
import { techEvolution } from "@/data/tech-evolution";
import type { Locale } from "@/i18n/config";
import { LazySection } from "@/components/ui/lazy-section";
import { Skeleton } from "@/components/ui/skeleton";
import { BackButton } from "@/components/ui/back-button";
import {
  SiTypescript,
  SiNextdotjs,
  SiNestjs,
  SiPostgresql,
  SiExpo,
  SiTailwindcss,
  SiPlausibleanalytics,
} from "react-icons/si";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

function stackIcon(name: string) {
  const n = name.toLowerCase();
  if (n.includes("typescript"))
    return <SiTypescript className="text-sky-500" />;
  if (n.includes("next"))
    return <SiNextdotjs className="text-black dark:text-white" />;
  if (n.includes("nest")) return <SiNestjs className="text-red-500" />;
  if (n.includes("postgres")) return <SiPostgresql className="text-sky-700" />;
  if (n.includes("expo"))
    return <SiExpo className="text-gray-800 dark:text-gray-200" />;
  if (n.includes("tailwind"))
    return <SiTailwindcss className="text-cyan-500" />;
  if (n.includes("plausible"))
    return <SiPlausibleanalytics className="text-indigo-500" />;
  return <span className="text-[color:var(--muted)]">•</span>;
}

export default async function StackPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return (
    <div className="space-y-6">
      <Link
        href={`/${locale}/build`}
        className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--accent-strong)]"
      >
        <ArrowLeft size={14} />
        Back to Profile
      </Link>
      <div className="flex items-center justify-between gap-3">
        <SectionHeading
          eyebrow="Stack"
          title="Why I use these tools"
          description="Reasoning first, not just a skills list."
        />
        <BackButton />
      </div>
      <LazySection minHeight={260} skeleton={<Skeleton className="h-64" />}>
        <div className="grid gap-3 md:grid-cols-2">
          {stackReasons.map((item) => (
            <div
              key={item.name}
              className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-[color:var(--foreground)]">
                  <span className="inline-flex items-center gap-2">
                    {stackIcon(item.name)}
                    {item.name}
                  </span>
                </p>
                <span className="pill text-[10px]">Core</span>
              </div>
              <p className="mt-2 text-sm text-[color:var(--muted)]">
                {item.why}
              </p>
              {item.notes ? (
                <p className="mt-2 text-xs text-[color:var(--muted)]">
                  {item.notes}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </LazySection>

      <LazySection minHeight={220} skeleton={<Skeleton className="h-56" />}>
        <div className="card p-5">
          <SectionHeading
            eyebrow="Tech evolution"
            title="How the stack evolved over time"
          />
          <div className="mt-4 space-y-3">
            {techEvolution.map((item) => (
              <div
                key={item.year}
                className="flex items-start gap-3 rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] p-3"
              >
                <div className="pill text-[10px]">{item.year}</div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold text-[color:var(--foreground)]">
                    {item.focus}
                  </p>
                  <p className="text-xs text-[color:var(--muted)]">
                    {item.gained.join(" • ")}
                  </p>
                  {item.dropped?.length ? (
                    <p className="text-xs text-[color:var(--muted)]">
                      Dropped: {item.dropped.join(", ")}
                    </p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </LazySection>
    </div>
  );
}
