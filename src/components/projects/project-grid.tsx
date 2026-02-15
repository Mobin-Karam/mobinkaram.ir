import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { ProjectMeta } from "@/lib/engineer-data";

export function ProjectGrid({ projects, locale }: { projects: { meta: ProjectMeta }[]; locale: Locale }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {projects.map((p) => (
        <Link
          key={p.meta.slug}
          href={`/${locale}/projects/${p.meta.slug}`}
          className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4 hover:-translate-y-0.5 hover:shadow-lg transition"
        >
          <div className="flex items-center justify-between text-xs text-[color:var(--muted)]">
            <span>{p.meta.year ?? ""}</span>
            <span>{p.meta.status ?? ""}</span>
          </div>
          <p className="text-sm font-semibold text-[color:var(--foreground)]">{p.meta.title}</p>
          <p className="text-xs text-[color:var(--muted)] line-clamp-2">{p.meta.summary}</p>
          <div className="mt-2 flex flex-wrap gap-2 text-[10px] text-[color:var(--muted)]">
            {p.meta.tags?.slice(0, 3).map((tag) => (
              <span key={tag} className="pill text-[10px]">
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-[color:var(--accent-strong)]">
            Read case study
            <ArrowRight size={12} />
          </div>
        </Link>
      ))}
    </div>
  );
}
