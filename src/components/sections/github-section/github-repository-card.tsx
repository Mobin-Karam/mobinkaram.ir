import {
  ArrowUpRight,
  CircleDot,
  Code2,
  GitFork,
  Star,
} from "lucide-react";

import type { GitHubRepository } from "@/lib/github/types";

import {
  formatCompactNumber,
  formatRelativeGitHubDate,
} from "./github-formatters";

interface GitHubRepositoryCardProps {
  repository: GitHubRepository;
}

export function GitHubRepositoryCard({
  repository,
}: GitHubRepositoryCardProps) {
  return (
    <article
      className={[
        "group relative flex h-full flex-col overflow-hidden",
        "rounded-3xl border border-border/70",
        "bg-card/55 p-5 backdrop-blur-sm",
        "transition-all duration-300",
        "hover:-translate-y-1 hover:border-primary/30",
        "hover:bg-card hover:shadow-xl",
        "sm:p-6",
      ].join(" ")}
      data-cursor="pointer"
      data-cursor-label="Open"
    >
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-x-8 top-0 h-px",
          "bg-gradient-to-r from-transparent via-primary/60 to-transparent",
          "opacity-0 transition-opacity duration-300",
          "group-hover:opacity-100",
        ].join(" ")}
      />

      <div className="flex items-start justify-between gap-4">
        <span
          className={[
            "flex size-10 shrink-0 items-center justify-center",
            "rounded-2xl border border-border",
            "bg-background text-primary",
          ].join(" ")}
        >
          <Code2 className="size-4" aria-hidden="true" />
        </span>

        <ArrowUpRight
          className={[
            "size-4 text-muted-foreground",
            "transition-all duration-300",
            "group-hover:-translate-y-0.5",
            "group-hover:translate-x-0.5",
            "group-hover:text-foreground",
          ].join(" ")}
          aria-hidden="true"
        />
      </div>

      <div className="mt-5">
        <h3 className="line-clamp-1 font-semibold text-foreground">
          <a
            href={repository.html_url}
            target="_blank"
            rel="noreferrer"
            className="after:absolute after:inset-0"
          >
            {repository.name}
          </a>
        </h3>

        <p className="mt-2 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-muted-foreground">
          {repository.description ??
            "A public project available on my GitHub profile."}
        </p>
      </div>

      {repository.topics.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {repository.topics.slice(0, 3).map((topic) => (
            <span
              key={topic}
              className={[
                "rounded-full border border-border/70",
                "bg-background/70 px-2.5 py-1",
                "text-[10px] font-medium text-muted-foreground",
              ].join(" ")}
            >
              {topic}
            </span>
          ))}
        </div>
      ) : null}

      <div
        className={[
          "mt-auto flex flex-wrap items-center gap-x-4 gap-y-2",
          "border-t border-border/60 pt-4",
          "text-xs text-muted-foreground",
        ].join(" ")}
      >
        {repository.language ? (
          <span className="inline-flex items-center gap-1.5">
            <CircleDot
              className="size-3.5 text-primary"
              aria-hidden="true"
            />
            {repository.language}
          </span>
        ) : null}

        <span className="inline-flex items-center gap-1.5">
          <Star className="size-3.5" aria-hidden="true" />
          {formatCompactNumber(repository.stargazers_count)}
        </span>

        <span className="inline-flex items-center gap-1.5">
          <GitFork className="size-3.5" aria-hidden="true" />
          {formatCompactNumber(repository.forks_count)}
        </span>

        <span className="ms-auto">
          {formatRelativeGitHubDate(
            repository.pushed_at ?? repository.updated_at,
          )}
        </span>
      </div>
    </article>
  );
}