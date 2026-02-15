import Link from "next/link";
import { SectionHeading } from "@/components/ui/primitives";
import { getProjects } from "@/data/projects";
import { getLabEntries } from "@/data/lab";
import { getBuildLogs } from "@/data/logs";
import type { Locale } from "@/i18n/config";
import { LazySection, Skeleton } from "@/components/ui/primitives";
import { ArrowRight } from "lucide-react";

export default async function BuildHubPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const projects = getProjects(locale);
  const lab = getLabEntries(locale);
  const logs = getBuildLogs(locale);

  const quickLinks = [
    { label: "Case studies", href: `/${locale}/projects`, desc: "Shipped products", count: projects.length },
    { label: "Engineering lab", href: `/${locale}/lab`, desc: "Patterns & experiments", count: lab.length },
    { label: "Build log", href: `/${locale}/build-log`, desc: "Daily notes", count: logs.length },
    { label: "Architecture", href: `/${locale}/architecture`, desc: "System design snapshots" },
    { label: "Security", href: `/${locale}/security`, desc: "Secure-by-default checks" },
  ];

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Engineer hub"
        title="Case studies • Experiments • Build log • Systems"
        description="One page to see what I shipped, tested, hardened, and learned."
      />

      <div className="grid gap-2 md:grid-cols-3">
        {quickLinks.map((q) => (
          <Link
            key={q.href}
            href={q.href}
            className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4 hover:-translate-y-0.5 hover:shadow-md transition flex items-center justify-between"
          >
            <div>
              <p className="text-sm font-semibold text-[color:var(--foreground)]">{q.label}</p>
              <p className="text-xs text-[color:var(--muted)]">{q.desc}</p>
            </div>
          {q.count !== undefined ? (
            <div className="text-right text-xs text-[color:var(--muted)] flex items-center gap-1">
              <span>{q.count}</span>
              <ArrowRight size={14} />
            </div>
          ) : (
            <ArrowRight size={14} className="text-[color:var(--muted)]" />
          )}
        </Link>
      ))}
    </div>

      <div className="card p-5">
        <SectionHeading
          eyebrow="Systems"
          title="Architecture & Security"
          description="How the platform is assembled and protected in production."
        />
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <Link
            href={`/${locale}/architecture`}
            className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4 hover:-translate-y-0.5 hover:shadow-lg transition block"
          >
            <p className="text-sm font-semibold text-[color:var(--foreground)]">Architecture</p>
            <p className="text-xs text-[color:var(--muted)]">
              Layers, delivery, observability, and design decisions.
            </p>
          </Link>
          <Link
            href={`/${locale}/security`}
            className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4 hover:-translate-y-0.5 hover:shadow-lg transition block"
          >
            <p className="text-sm font-semibold text-[color:var(--foreground)]">Security</p>
            <p className="text-xs text-[color:var(--muted)]">
              Auth, data protection, and release gates I enforce before shipping.
            </p>
          </Link>
        </div>
      </div>

      <LazySection minHeight={240} skeleton={<Skeleton className="h-60" />}>
        <div className="card p-5">
          <SectionHeading eyebrow="Case studies" title="Shipped products" />
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {projects.map((p) => (
              <Link
                key={p.meta.slug}
                href={`/${locale}/projects/${p.meta.slug}`}
                className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4 hover:-translate-y-0.5 hover:shadow-lg transition"
              >
                <div className="flex items-center justify-between text-xs text-[color:var(--muted)]">
                  <span>{p.meta.year}</span>
                  <span>{p.meta.status ?? ""}</span>
                </div>
                <p className="text-sm font-semibold text-[color:var(--foreground)]">{p.meta.title}</p>
                <p className="text-xs text-[color:var(--muted)] line-clamp-2">{p.meta.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </LazySection>

      <LazySection minHeight={240} skeleton={<Skeleton className="h-60" />}>
        <div className="card p-5">
          <SectionHeading eyebrow="Engineering lab" title="Patterns and experiments" />
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {lab.map((entry) => (
              <Link
                key={entry.meta.slug}
                href={`/${locale}/lab/${entry.meta.slug}`}
                className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4 hover:-translate-y-0.5 hover:shadow-lg transition"
              >
                <div className="flex items-center justify-between text-xs text-[color:var(--muted)]">
                  <span>{entry.meta.area}</span>
                  <span>{entry.meta.date}</span>
                </div>
                <p className="text-sm font-semibold text-[color:var(--foreground)]">{entry.meta.title}</p>
                <p className="text-xs text-[color:var(--muted)] line-clamp-2">{entry.meta.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </LazySection>

      <LazySection minHeight={240} skeleton={<Skeleton className="h-60" />}>
        <div className="card p-5">
          <SectionHeading eyebrow="Build log" title="Rapid notes" />
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {logs.map((log) => (
              <Link
                key={log.meta.slug}
                href={`/${locale}/build-log/${log.meta.slug}`}
                className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4 hover:-translate-y-0.5 hover:shadow-lg transition"
              >
                <div className="flex items-center justify-between text-xs text-[color:var(--muted)]">
                  <span>{log.meta.date}</span>
                  <span>{log.meta.readingMinutes} min</span>
                </div>
                <p className="text-sm font-semibold text-[color:var(--foreground)]">{log.meta.title}</p>
                <p className="text-xs text-[color:var(--muted)] line-clamp-2">{log.meta.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </LazySection>
    </div>
  );
}
