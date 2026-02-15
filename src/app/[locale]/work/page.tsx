import { SectionHeading } from "@/components/ui/section-heading";
import type { Locale } from "@/i18n/config";
import { PreferencesPanel } from "@/components/ui/preferences-panel";
import Link from "next/link";
import { Github, Linkedin, Globe2, Rss } from "lucide-react";

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  const strengths = [
    "Product-minded engineering: shipping MVPs with measurable outcomes",
    "System thinking across web, mobile, backend, and infra",
    "Documentation-first approach (MDX, diagrams, decisions)",
  ];

  const workflow = [
    { title: "Discover", detail: "Define the problem, success metrics, constraints." },
    { title: "Design systems", detail: "Interfaces + contracts first; align web/native." },
    { title: "Build small", detail: "Ship thin slices, instrument from day 1." },
    { title: "Observe", detail: "Telemetry, logs, and user feedback loops." },
    { title: "Refine", detail: "Kill, simplify, or scale based on data." },
  ];

  const personality = [
    "Bias for clarity: fewer moving parts, better observability.",
    "Calm velocity: consistent weekly progress beats heroic bursts.",
    "Community-first: tools that help small groups coordinate and earn.",
  ];

  const profiles = [
    { label: "GitHub", href: "https://github.com/Mobin-Karam", icon: Github },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/mobin-karam/", icon: Linkedin },
    { label: "Quera Profile", href: "https://quera.org/profile/mobinkaram", icon: Globe2 },
    { label: "Quera QCV", href: "https://quera.org/qcv/", icon: Globe2 },
    { label: "RSS", href: "/rss.xml", icon: Rss },
  ];

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Work overview"
        title="How I build and what I care about"
        description="A snapshot of my operating system as a product engineer."
      />

      <div className="grid gap-4 md:grid-cols-2">
        <div className="card p-5 space-y-3">
          <h3 className="text-lg font-semibold text-[color:var(--foreground)]">Strengths</h3>
          <ul className="space-y-2 text-sm text-[color:var(--muted)]">
            {strengths.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
        <div className="card p-5 space-y-3">
          <h3 className="text-lg font-semibold text-[color:var(--foreground)]">Personality signals</h3>
          <ul className="space-y-2 text-sm text-[color:var(--muted)]">
            {personality.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card p-5 space-y-3">
        <h3 className="text-lg font-semibold text-[color:var(--foreground)]">Workflow</h3>
        <div className="grid gap-3 md:grid-cols-5">
          {workflow.map((step, idx) => (
            <div
              key={step.title}
              className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-3"
            >
              <div className="pill text-[10px]">Step {idx + 1}</div>
              <p className="mt-2 text-sm font-semibold text-[color:var(--foreground)]">
                {step.title}
              </p>
              <p className="text-xs text-[color:var(--muted)]">{step.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-5 space-y-3">
        <h3 className="text-lg font-semibold text-[color:var(--foreground)]">Profiles & presence</h3>
        <div className="flex flex-wrap gap-2">
          {profiles.map((p) => {
            const Icon = p.icon;
            return (
              <Link
                key={p.href}
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="pill nav-btn hover:-translate-y-0.5 hover:shadow-md transition"
              >
                <Icon size={14} />
                {p.label}
              </Link>
            );
          })}
        </div>
      </div>

      <PreferencesPanel />
    </div>
  );
}
