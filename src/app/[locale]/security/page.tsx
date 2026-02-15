import { SectionHeading, Pill, LazySection, Skeleton } from "@/components/ui/primitives";
import { locales, type Locale } from "@/i18n/config";

const pillars = [
  {
    title: "Auth & access",
    items: [
      "JWT + refresh rotation with short-lived access tokens",
      "Role-based and capability-based guards in services",
      "Device/session revoke flows documented in Build Log",
    ],
  },
  {
    title: "Data protection",
    items: [
      "Secrets managed via environment vaults, never in repo",
      "PII minimised; encryption at rest where supported",
      "Backups + recovery drills scheduled in Koonj tracker",
    ],
  },
  {
    title: "App security",
    items: [
      "Input validation with class-validator and Zod at edges",
      "OWASP Top 10 checklist baked into PR templates",
      "Dependency scanning in CI (npm audit + curation)",
    ],
  },
  {
    title: "Infrastructure",
    items: [
      "Nginx reverse proxy with rate limits and secure headers",
      "Zero-downtime deploys; health checks + rollback hooks",
      "Logging/metrics/alerts wired to observability dashboard",
    ],
  },
];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function SecurityPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = params;
  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="Security"
        title="Secure-by-default habits"
        description="Practical controls applied across code, data, and infrastructure."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {pillars.map((pillar) => (
          <div
            key={pillar.title}
            className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 shadow-sm"
          >
            <p className="text-sm font-semibold text-[color:var(--foreground)]">
              {pillar.title}
            </p>
            <ul className="mt-3 space-y-2 text-sm text-[color:var(--muted)]">
              {pillar.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <LazySection minHeight={200} skeleton={<Skeleton className="h-48" />}>
        <div className="card p-5">
          <SectionHeading
            eyebrow="Signal"
            title="What I check before shipping"
            description="Small list that keeps the stack healthy."
          />
          <div className="mt-3 flex flex-wrap gap-2">
            <Pill>Threat model</Pill>
            <Pill>Secrets scan</Pill>
            <Pill>Static analysis</Pill>
            <Pill>Dependency audit</Pill>
            <Pill>Security headers</Pill>
          </div>
          <div className="mt-4 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4 text-sm text-[color:var(--muted)]">
            <p className="text-[color:var(--foreground)] font-semibold text-sm mb-2">Release gates</p>
            <ul className="list-disc space-y-1 pl-4">
              <li>All env vars sourced from secret store, no defaults in code.</li>
              <li>OWASP quick pass: authz on every handler; input validation at edges.</li>
              <li>Security headers + rate limits verified in staging before promote.</li>
              <li>Backups last restore test &lt; 30 days; rollback plan documented.</li>
            </ul>
          </div>
        </div>
      </LazySection>
    </div>
  );
}
