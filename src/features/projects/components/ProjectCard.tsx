"use client";

import { ArrowUpRight, Code2, ExternalLink, Layers3 } from "lucide-react";
import { useTranslations } from "next-intl";
import { FaGithub } from "react-icons/fa6";

import type { Project } from "../data/projects";

interface ProjectCardProps {
  project: Project;
  index?: number;
  featured?: boolean;
}

export default function ProjectCard({
  project,
  index = 0,
  featured = false,
}: ProjectCardProps) {
  const t = useTranslations("projects.card");

  const visibleStack = featured
    ? project.stack.slice(0, 7)
    : project.stack.slice(0, 5);

  const remainingStack = project.stack.length - visibleStack.length;

  const projectNumber = String(index + 1).padStart(2, "0");

  return (
    <article
      className={[
        "group relative isolate flex h-full [content-visibility:auto] [contain-intrinsic-size:auto_420px]",
        "min-h-[23rem] flex-col overflow-hidden rounded-xl",
        "border border-border bg-card",
        "transition-colors duration-200 hover:border-primary/60",
        featured ? "md:min-h-[25rem]" : "",
      ].join(" ")}
    >
      <div
        aria-hidden="true"
        className={[
          "absolute inset-x-6 top-0 h-px",
          "bg-gradient-to-r from-transparent",
          "via-primary/60",
          "to-transparent",
        ].join(" ")}
      />

      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-x-0 top-0 -z-10 h-24",
          "bg-gradient-to-b from-primary/[0.045] to-transparent",
        ].join(" ")}
      />

      <div className="flex h-full flex-col p-5 sm:p-6 lg:p-7">
        <div className="flex items-start justify-between gap-4">
          <div
            className={[
              "flex size-11 shrink-0 items-center",
            "justify-center rounded-lg border border-primary/20",
            "bg-primary/10 text-primary",
            ].join(" ")}
          >
            <Code2 aria-hidden="true" className="size-[18px]" />
          </div>

          <div
            className={[
              "inline-flex items-center gap-2",
              "rounded-md border border-border bg-muted px-2.5 py-1.5",
              "font-mono text-[10px] font-medium",
              "uppercase tracking-[0.1em]",
              "text-muted-foreground",
            ].join(" ")}
          >
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-primary"
            />

            {t("projectNumber", {
              number: projectNumber,
            })}
          </div>
        </div>

        <div className={["mt-7", featured ? "max-w-3xl" : ""].join(" ")}>
          {project.author && (
            <p
              className={[
                "mb-2.5 text-xs font-medium uppercase",
                "tracking-[0.15em]",
                "text-muted-foreground",
              ].join(" ")}
            >
              {project.author}
            </p>
          )}

          <h2
            className={[
              "text-balance text-[1.35rem] font-semibold",
              "leading-tight tracking-[-0.035em]",
              "text-foreground sm:text-2xl",
              featured ? "lg:text-3xl" : "",
            ].join(" ")}
          >
            {project.name}
          </h2>

          <p
            className={[
              "mt-4 line-clamp-4 text-pretty",
              "text-sm leading-7 text-muted-foreground",
              featured ? "max-w-2xl sm:text-base sm:leading-8" : "",
            ].join(" ")}
          >
            {project.description}
          </p>
        </div>

        <div className="mt-7">
          <div
            className={[
              "mb-3 flex items-center gap-2",
              "text-xs font-medium text-muted-foreground",
            ].join(" ")}
          >
            <Layers3 aria-hidden="true" className="size-3.5" />

            {t("technologyStack")}
          </div>

          <ul
            aria-label={t("stackAriaLabel", {
              project: project.name,
            })}
            className="flex flex-wrap gap-1.5"
          >
            {visibleStack.map((technology) => (
              <li
                key={technology}
                className={[
                  "rounded-md border border-border bg-muted px-2.5 py-1",
                  "font-mono text-[10px] font-medium",
                  "text-muted-foreground sm:text-[11px]",
                ].join(" ")}
              >
                {technology}
              </li>
            ))}

            {remainingStack > 0 && (
              <li
                aria-label={t("moreTechnologies", {
                  count: remainingStack,
                })}
                className={[
                  "rounded-md border border-border bg-muted px-2.5 py-1",
                  "font-mono text-[10px] font-medium",
                  "text-muted-foreground",
                  "sm:text-[11px]",
                ].join(" ")}
              >
                +{remainingStack}
              </li>
            )}
          </ul>
        </div>

        {(project.demo || project.github) && (
          <div
            className={[
              "mt-auto grid gap-2 pt-7",
              "border-t border-border/50",
              project.demo && project.github ? "sm:grid-cols-2" : "grid-cols-1",
            ].join(" ")}
          >
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("openProjectAriaLabel", {
                  project: project.name,
                })}
                className={[
                  "group/link inline-flex min-h-11",
                  "items-center justify-center gap-2",
                  "rounded-lg bg-foreground px-4",
                  "text-sm font-semibold text-background",
                  "outline-none transition-colors duration-200 hover:opacity-90",
                  "focus-visible:ring-2",
                  "focus-visible:ring-ring",
                  "focus-visible:ring-offset-2",
                  "focus-visible:ring-offset-background",
                ].join(" ")}
              >
                <ExternalLink aria-hidden="true" className="size-4" />

                <span>{t("viewProject")}</span>

                <ArrowUpRight
                  aria-hidden="true"
                  className={[
                    "size-3.5 transition-transform",
                    "group-hover/link:translate-x-0.5",
                    "group-hover/link:-translate-y-0.5",
                    "rtl:rotate-[-90deg]",
                  ].join(" ")}
                />
              </a>
            )}

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("openSourceAriaLabel", {
                  project: project.name,
                })}
                className={[
                  "group/source inline-flex min-h-11",
                  "items-center justify-center gap-2",
                  "rounded-lg border border-border bg-background px-4",
                  "text-sm font-semibold text-foreground",
                  "outline-none transition-colors duration-200",
                  "hover:border-foreground/20",
                  "hover:bg-muted/80",
                  "focus-visible:ring-2",
                  "focus-visible:ring-ring",
                ].join(" ")}
              >
                <FaGithub
                  aria-hidden="true"
                  className={[
                    "size-4 transition-transform",
                    "group-hover/source:scale-110",
                  ].join(" ")}
                />

                <span>{t("sourceCode")}</span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
