import { SectionHeading, LazySection, Skeleton, Pill } from "@/components/ui/primitives";
import { locales, type Locale } from "@/i18n/config";

const layers = [
  {
    title: "Application layer",
    points: [
      "Next.js App Router + TypeScript for UI and server actions",
      "Design systems documented in the Engineering Lab",
      "Feature flags + experiment hooks for staged rollout",
    ],
  },
  {
    title: "API & services",
    points: [
      "NestJS modular monorepo, typed contracts shared with frontend",
      "CQRS-lite for write/read separation where scale demands it",
      "Background workers for queues, emails, and webhooks",
    ],
  },
  {
    title: "Data layer",
    points: [
      "PostgreSQL for relational domain data (migrations + schemas tracked)",
      "MongoDB for documents, analytics events, and lab experiments",
      "Redis for caching and rate limits",
    ],
  },
  {
    title: "Delivery & observability",
    points: [
      "CI/CD with GitHub Actions (unit + type checks + preview deploys)",
      "Reverse proxy via Nginx, TLS everywhere, zero-downtime deploys",
      "Logging/metrics tracing hooks exposed in the Lab section",
    ],
  },
];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function ArchitecturePage({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = params;

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="Architecture"
        title="How the system is put together"
        description="From UI down to infrastructure — the stack and reasoning behind it."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {layers.map((layer) => (
          <div
            key={layer.title}
            className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 shadow-sm"
          >
            <p className="text-sm font-semibold text-[color:var(--foreground)]">
              {layer.title}
            </p>
            <ul className="mt-3 space-y-2 text-sm text-[color:var(--muted)]">
              {layer.points.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[color:var(--accent-strong)]" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <LazySection minHeight={220} skeleton={<Skeleton className="h-52" />}>
        <div className="card p-5">
          <SectionHeading
            eyebrow="Artifacts"
            title="Diagrams & checklists"
            description="Sequence diagrams, deployment topology, and hardening steps are shipped as living documents in Engineering Lab."
          />
          <div className="mt-3 flex flex-wrap gap-2">
            <Pill>System diagram</Pill>
            <Pill>API surface</Pill>
            <Pill>Data flow</Pill>
            <Pill>CI/CD</Pill>
            <Pill>Disaster readiness</Pill>
          </div>
        </div>
      </LazySection>
    </div>
  );
}