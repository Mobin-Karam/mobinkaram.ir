import Link from "next/link";
import { ArrowUpRight, PlayCircle, Mail } from "lucide-react";
import { StatusDot } from "@/components/ui/status-dot";
import type { Locale } from "@/i18n/config";
import { getFeaturedProject } from "@/data/projects";

type Props = {
  locale: Locale;
  headline: string;
  sub: string;
  ctaProjects: string;
  ctaLab: string;
  contactLabel?: string;
};

export function Hero({
  locale,
  headline,
  sub,
  ctaProjects,
  ctaLab,
  contactLabel = "Contact",
}: Props) {
  const featured = getFeaturedProject(locale);

  return (
    <section className="mb-10 rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-[var(--shadow-glow)]">
      <div className="flex flex-col gap-4">
        <StatusDot label={sub} tone="amber" />
        <h1 className="text-2xl font-bold leading-tight tracking-tight text-[color:var(--foreground)] sm:text-3xl">
          {headline}
        </h1>
        {featured ? (
          <div className="flex flex-wrap items-center gap-3 text-sm text-[color:var(--muted)]">
            <span className="pill">Featured: {featured.meta.title}</span>
            <span className="pill">{featured.meta.status}</span>
            <span className="pill">{featured.meta.year}</span>
          </div>
        ) : null}
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-2 rounded-full bg-[color:var(--accent)] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[var(--glow)] transition hover:-translate-y-0.5"
          >
            <PlayCircle size={16} />
            {ctaProjects}
          </Link>
          <Link
            href={`/${locale}/lab`}
            className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-2 text-sm font-semibold text-[color:var(--foreground)] transition hover:-translate-y-0.5 hover:border-[color:var(--accent)]"
          >
            <ArrowUpRight size={16} />
            {ctaLab}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-4 py-2 text-sm font-semibold text-[color:var(--foreground)] transition hover:-translate-y-0.5 hover:border-[color:var(--accent-strong)]"
          >
            <Mail size={16} />
            {contactLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
