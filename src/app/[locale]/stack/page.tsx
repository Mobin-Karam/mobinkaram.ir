import { SectionHeading } from "@/components/ui/section-heading";
import { stackReasons } from "@/data/stack";
import { techEvolution } from "@/data/tech-evolution";
import type { Locale } from "@/i18n/config";
import { LazySection } from "@/components/ui/lazy-section";
import { Skeleton } from "@/components/ui/skeleton";

export default async function StackPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="Stack"
        title="Why I use these tools"
        description="Reasoning first, not just a skills list."
      />
      <LazySection minHeight={260} skeleton={<Skeleton className="h-64" />}>
        <div className="grid gap-3 md:grid-cols-2">
          {stackReasons.map((item) => (
            <div
              key={item.name}
              className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-[color:var(--foreground)]">
                  {item.name}
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
