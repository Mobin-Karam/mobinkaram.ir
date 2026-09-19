"use client";

import { useCallback, useRef, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, Code2, ExternalLink, Layers3 } from "lucide-react";
import { useTranslations } from "next-intl";
import { FaGithub } from "react-icons/fa6";

import type { Project } from "./projects";

interface ProjectCardProps {
  project: Project;
  index?: number;
  featured?: boolean;
}

const PROJECT_THEMES = [
  {
    surface: "from-blue-500/[0.14] via-blue-500/[0.025] to-transparent",
    orb: "bg-blue-500/20",
    icon: "border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400",
    accent: "bg-blue-500",
    line: "via-blue-500/50",
    hover: "hover:border-blue-500/35",
    badge:
      "border-blue-500/15 bg-blue-500/[0.07] text-blue-700 dark:text-blue-300",
  },
  {
    surface: "from-emerald-500/[0.14] via-emerald-500/[0.025] to-transparent",
    orb: "bg-emerald-500/20",
    icon: "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    accent: "bg-emerald-500",
    line: "via-emerald-500/50",
    hover: "hover:border-emerald-500/35",
    badge:
      "border-emerald-500/15 bg-emerald-500/[0.07] text-emerald-700 dark:text-emerald-300",
  },
  {
    surface: "from-violet-500/[0.14] via-violet-500/[0.025] to-transparent",
    orb: "bg-violet-500/20",
    icon: "border-violet-500/20 bg-violet-500/10 text-violet-600 dark:text-violet-400",
    accent: "bg-violet-500",
    line: "via-violet-500/50",
    hover: "hover:border-violet-500/35",
    badge:
      "border-violet-500/15 bg-violet-500/[0.07] text-violet-700 dark:text-violet-300",
  },
  {
    surface: "from-amber-500/[0.15] via-amber-500/[0.025] to-transparent",
    orb: "bg-amber-500/20",
    icon: "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400",
    accent: "bg-amber-500",
    line: "via-amber-500/50",
    hover: "hover:border-amber-500/35",
    badge:
      "border-amber-500/15 bg-amber-500/[0.07] text-amber-800 dark:text-amber-300",
  },
  {
    surface: "from-rose-500/[0.14] via-rose-500/[0.025] to-transparent",
    orb: "bg-rose-500/20",
    icon: "border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-400",
    accent: "bg-rose-500",
    line: "via-rose-500/50",
    hover: "hover:border-rose-500/35",
    badge:
      "border-rose-500/15 bg-rose-500/[0.07] text-rose-700 dark:text-rose-300",
  },
  {
    surface: "from-cyan-500/[0.14] via-cyan-500/[0.025] to-transparent",
    orb: "bg-cyan-500/20",
    icon: "border-cyan-500/20 bg-cyan-500/10 text-cyan-700 dark:text-cyan-400",
    accent: "bg-cyan-500",
    line: "via-cyan-500/50",
    hover: "hover:border-cyan-500/35",
    badge:
      "border-cyan-500/15 bg-cyan-500/[0.07] text-cyan-800 dark:text-cyan-300",
  },
] as const;

function getThemeIndex(name: string): number {
  let hash = 0;

  for (let index = 0; index < name.length; index += 1) {
    hash = (hash * 31 + name.charCodeAt(index)) | 0;
  }

  return Math.abs(hash) % PROJECT_THEMES.length;
}

export default function ProjectCard({
  project,
  index = 0,
  featured = false,
}: ProjectCardProps) {
  const t = useTranslations("projects.card");

  const cardRef = useRef<HTMLElement>(null);

  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);

  const smoothX = useSpring(pointerX, {
    stiffness: 180,
    damping: 28,
  });

  const smoothY = useSpring(pointerY, {
    stiffness: 180,
    damping: 28,
  });

  const theme = PROJECT_THEMES[getThemeIndex(project.name)];

  const visibleStack = featured
    ? project.stack.slice(0, 7)
    : project.stack.slice(0, 5);

  const remainingStack = project.stack.length - visibleStack.length;

  const projectNumber = String(index + 1).padStart(2, "0");

  const handlePointerMove = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      const card = cardRef.current;

      if (!card) return;

      const bounds = card.getBoundingClientRect();

      const x = ((event.clientX - bounds.left) / bounds.width) * 100;

      const y = ((event.clientY - bounds.top) / bounds.height) * 100;

      pointerX.set(x);
      pointerY.set(y);
    },
    [pointerX, pointerY],
  );

  const resetPointer = useCallback(() => {
    pointerX.set(50);
    pointerY.set(50);
  }, [pointerX, pointerY]);

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handlePointerMove}
      onMouseLeave={resetPointer}
      initial={{
        opacity: 0,
        y: 24,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      whileHover={{
        y: -7,
      }}
      transition={{
        opacity: {
          duration: 0.45,
          delay: Math.min(index * 0.06, 0.3),
        },
        y: {
          type: "spring",
          stiffness: 280,
          damping: 24,
        },
      }}
      className={[
        "group relative isolate flex h-full",
        "min-h-[23rem] flex-col overflow-hidden",
        "rounded-[1.65rem] border border-border/70",
        "bg-card/80 backdrop-blur-xl",
        theme.hover,
        "shadow-[0_18px_55px_-40px_rgba(0,0,0,0.55)]",
        "transition-[border-color,box-shadow]",
        "duration-300",
        "hover:shadow-[0_30px_80px_-42px_rgba(0,0,0,0.65)]",
        featured ? "md:min-h-[25rem]" : "",
      ].join(" ")}
    >
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-0 -z-30",
          "bg-gradient-to-br",
          theme.surface,
        ].join(" ")}
      />

      <motion.div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute -z-20",
          "size-72 rounded-full",
          "bg-foreground/[0.055]",
          "opacity-0 blur-3xl",
          "transition-opacity duration-300",
          "group-hover:opacity-100",
        ].join(" ")}
        style={{
          left: smoothX,
          top: smoothY,
          x: "-50%",
          y: "-50%",
        }}
      />

      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute",
          "-end-24 -top-24 -z-20",
          "size-64 rounded-full blur-3xl",
          theme.orb,
          "transition-transform duration-700",
          "group-hover:scale-125",
        ].join(" ")}
      />

      <div
        aria-hidden="true"
        className={[
          "absolute inset-x-8 top-0 h-px",
          "bg-gradient-to-r from-transparent",
          theme.line,
          "to-transparent",
        ].join(" ")}
      />

      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-0 -z-10",
          "opacity-[0.025] dark:opacity-[0.04]",
          "[background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)]",
          "[background-size:28px_28px]",
        ].join(" ")}
      />

      <div className="flex h-full flex-col p-5 sm:p-6 lg:p-7">
        <div className="flex items-start justify-between gap-4">
          <motion.div
            whileHover={{
              rotate: -5,
              scale: 1.05,
            }}
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 20,
            }}
            className={[
              "flex size-11 shrink-0 items-center",
              "justify-center rounded-[0.9rem] border",
              "shadow-sm backdrop-blur-sm",
              theme.icon,
            ].join(" ")}
          >
            <Code2 aria-hidden="true" className="size-[18px]" />
          </motion.div>

          <div
            className={[
              "inline-flex items-center gap-2",
              "rounded-full border border-border/60",
              "bg-background/55 px-2.5 py-1.5",
              "font-mono text-[10px] font-medium",
              "uppercase tracking-[0.1em]",
              "text-muted-foreground backdrop-blur-md",
            ].join(" ")}
          >
            <span
              aria-hidden="true"
              className={["size-1.5 rounded-full", theme.accent].join(" ")}
            />

            {t("projectNumber", {
              number: projectNumber,
            })}
          </div>
        </div>

        <div className={["mt-8", featured ? "max-w-3xl" : ""].join(" ")}>
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
              <motion.li
                key={technology}
                whileHover={{
                  y: -2,
                }}
                className={[
                  "rounded-full border px-2.5 py-1",
                  "font-mono text-[10px] font-medium",
                  "backdrop-blur-sm sm:text-[11px]",
                  theme.badge,
                ].join(" ")}
              >
                {technology}
              </motion.li>
            ))}

            {remainingStack > 0 && (
              <li
                aria-label={t("moreTechnologies", {
                  count: remainingStack,
                })}
                className={[
                  "rounded-full border border-border/70",
                  "bg-background/60 px-2.5 py-1",
                  "font-mono text-[10px] font-medium",
                  "text-muted-foreground backdrop-blur-sm",
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
                  "rounded-xl bg-foreground px-4",
                  "text-sm font-semibold text-background",
                  "outline-none transition-all duration-200",
                  "hover:-translate-y-0.5 hover:opacity-90",
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
                  "rounded-xl border border-border/80",
                  "bg-background/60 px-4",
                  "text-sm font-semibold text-foreground",
                  "outline-none backdrop-blur-sm",
                  "transition-all duration-200",
                  "hover:-translate-y-0.5",
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
    </motion.article>
  );
}
