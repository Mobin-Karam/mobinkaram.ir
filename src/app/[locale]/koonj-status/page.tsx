import { SectionHeading, LazySection, Skeleton } from "@/components/ui/primitives";
import { koonjTracker } from "@/data/tracker";
import type { Locale } from "@/i18n/config";
import { getKoonjIssues } from "@/lib/github";
import clsx from "clsx";
import { RoadmapSvg } from "@/components/ui/roadmap-svg";

type TrackerCard = {
  title: string;
  detail: string;
  eta?: string;
  url?: string;
};

function mapIssuesToColumns(
  issues: Awaited<ReturnType<typeof getKoonjIssues>>,
): { done: TrackerCard[]; inProgress: TrackerCard[]; next: TrackerCard[] } {
  const base = {
    done: [] as TrackerCard[],
    inProgress: [] as TrackerCard[],
    next: [] as TrackerCard[],
  };
  if (!issues) return base;

  for (const issue of issues) {
    const labels = issue.labels?.map((l) => l.name.toLowerCase()) ?? [];
    const card: TrackerCard = {
      title: issue.title,
      detail: issue.html_url,
      url: issue.html_url,
    };
    if (labels.includes("done") || issue.state === "closed")
      base.done.push(card);
    else if (labels.includes("next")) base.next.push(card);
    else base.inProgress.push(card);
  }
  return base;
}

export default async function KoonjStatusPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const liveIssues = await getKoonjIssues();
  const liveGrouped = mapIssuesToColumns(liveIssues);

  const groupedStatic = {
    done: koonjTracker
      .filter((i) => i.status === "done")
      .map((t) => ({ title: t.title, detail: t.detail, eta: t.eta })),
    inProgress: koonjTracker
      .filter((i) => i.status === "in-progress")
      .map((t) => ({ title: t.title, detail: t.detail, eta: t.eta })),
    next: koonjTracker
      .filter((i) => i.status === "next")
      .map((t) => ({ title: t.title, detail: t.detail, eta: t.eta })),
  };

  const grouped = {
    done: liveGrouped.done.length ? liveGrouped.done : groupedStatic.done,
    inProgress: liveGrouped.inProgress.length
      ? liveGrouped.inProgress
      : groupedStatic.inProgress,
    next: liveGrouped.next.length ? liveGrouped.next : groupedStatic.next,
  };

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="Koonj"
        title="Koonj public tracker"
        description="Current milestone, completed features, and what's next."
      />
      <LazySection minHeight={220} skeleton={<Skeleton className="h-56" />}>
        <RoadmapSvg
          steps={[
            { title: "Foundation", detail: "Auth & billing", status: "done" },
            {
              title: "Memberships",
              detail: "Snapshots + roles",
              status: grouped.inProgress.length ? "in-progress" : "done",
            },
            {
              title: "Live events",
              detail: "Presence + gating",
              status: grouped.inProgress.length > 1 ? "in-progress" : "next",
            },
            {
              title: "Plugins",
              detail: "Automation marketplace",
              status: grouped.next.length ? "next" : "next",
            },
            { title: "Pilot launch", detail: "3 communities", status: "next" },
          ]}
        />
      </LazySection>
      <LazySection minHeight={240} skeleton={<Skeleton className="h-60" />}>
        <div className="grid gap-3 md:grid-cols-3">
          <TrackerColumn
            title="In progress"
            items={grouped.inProgress}
            color="amber"
          />
          <TrackerColumn title="Done" items={grouped.done} color="green" />
          <TrackerColumn title="Next" items={grouped.next} color="blue" />
        </div>
      </LazySection>
    </div>
  );
}

function TrackerColumn({
  title,
  items,
  color,
}: {
  title: string;
  items: TrackerCard[];
  color: "green" | "amber" | "blue";
}) {
  const colorClass =
    color === "green"
      ? "text-emerald-500"
      : color === "amber"
        ? "text-amber-500"
        : "text-blue-500";

  return (
    <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4">
      <p className={`mb-3 text-sm font-semibold ${colorClass}`}>{title}</p>
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.title + item.detail}
            className="rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] p-3"
          >
            <p className="text-sm font-semibold text-[color:var(--foreground)]">
              {item.url ? (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[color:var(--accent)] ltr-text"
                >
                  {item.title}
                </a>
              ) : (
                item.title
              )}
            </p>
            <p className="text-xs text-[color:var(--muted)] line-clamp-2">
              {item.detail}
            </p>
            {item.eta ? (
              <p className="mt-1 text-xs text-[color:var(--muted)]">
                ETA: {item.eta}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function MilestoneMap({
  steps,
}: {
  steps: {
    title: string;
    detail: string;
    status: "done" | "in-progress" | "next";
  }[];
}) {
  return (
    <div className="card p-5">
      <p className="text-sm font-semibold text-[color:var(--foreground)] mb-3">
        Milestone map
      </p>
      <div className="relative grid gap-4 md:grid-cols-5">
        {steps.map((step, idx) => (
          <div
            key={step.title}
            className="relative flex flex-col items-start gap-2 rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)] p-3"
          >
            <div className="flex items-center gap-2">
              <span
                className={clsx(
                  "inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white shadow-md",
                  step.status === "done"
                    ? "bg-emerald-500"
                    : step.status === "in-progress"
                      ? "bg-amber-500"
                      : "bg-slate-400",
                )}
              >
                {idx + 1}
              </span>
              <p className="text-sm font-semibold text-[color:var(--foreground)]">
                {step.title}
              </p>
            </div>
            <p className="text-xs text-[color:var(--muted)]">{step.detail}</p>
            <span
              className={clsx(
                "pill text-[11px]",
                step.status === "done"
                  ? "border-emerald-300 text-emerald-700"
                  : step.status === "in-progress"
                    ? "border-amber-300 text-amber-700"
                    : "border-slate-300 text-slate-700",
              )}
            >
              {step.status === "done"
                ? "Completed"
                : step.status === "in-progress"
                  ? "In progress"
                  : "Queued"}
            </span>
          </div>
        ))}
        <div className="pointer-events-none absolute inset-x-3 top-7 hidden md:block border-t border-dashed border-[color:var(--border)]" />
      </div>
    </div>
  );
}
