"use client";

import Link from "next/link";
import { useState } from "react";
import type { ProjectMeta } from "@/data/projects";
import clsx from "clsx";

export function ProjectGrid({
  projects,
  locale,
}: {
  projects: { meta: ProjectMeta }[];
  locale: string;
}) {
  const allTags = Array.from(
    new Set(projects.flatMap((p) => p.meta.tags)),
  ).sort();
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? projects.filter((p) => p.meta.tags.includes(activeTag))
    : projects;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTag(null)}
          className={clsx(
            "pill",
            !activeTag && "border-[color:var(--accent)] text-[color:var(--foreground)]",
          )}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={clsx(
              "pill",
              activeTag === tag &&
                "border-[color:var(--accent)] text-[color:var(--foreground)]",
            )}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {filtered.map((project) => (
          <Link
            key={project.meta.slug}
            href={`/${locale}/projects/${project.meta.slug}`}
            className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4 transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            <div className="flex items-center justify-between text-xs text-[color:var(--muted)]">
              <span>{project.meta.year}</span>
              {project.meta.status ? (
                <span className="pill text-[10px] uppercase">
                  {project.meta.status}
                </span>
              ) : null}
            </div>
            <p className="mt-1 text-sm font-semibold text-[color:var(--foreground)]">
              {project.meta.title}
            </p>
            <p className="text-xs text-[color:var(--muted)] line-clamp-3">
              {project.meta.summary}
            </p>
            <div className="mt-2 flex items-center gap-3 text-[11px] text-[color:var(--muted)]">
              <span>{project.meta.readingMinutes} min read</span>
              <span className="pill text-[10px]">{project.meta.author}</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.meta.tags.slice(0, 4).map((tag) => (
                <span key={tag} className="pill text-[10px]">
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
