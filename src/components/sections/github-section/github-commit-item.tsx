import {
  ArrowUpRight,
  GitBranch,
  GitCommitHorizontal,
} from "lucide-react";

import type { GitHubCommitActivity } from "@/lib/github/types";

import {
  formatRelativeGitHubDate,
  getFirstLine,
} from "./github-formatters";

interface GitHubCommitItemProps {
  commit: GitHubCommitActivity;
}

export function GitHubCommitItem({
  commit,
}: GitHubCommitItemProps) {
  return (
    <article
      className={[
        "group relative flex gap-4",
        "border-b border-border/60 py-5",
        "first:pt-0 last:border-b-0 last:pb-0",
      ].join(" ")}
    >
      <div className="relative flex shrink-0 flex-col items-center">
        <span
          className={[
            "relative z-10 flex size-9 items-center justify-center",
            "rounded-full border border-border",
            "bg-background text-primary",
            "transition-colors duration-200",
            "group-hover:border-primary/40",
            "group-hover:bg-primary group-hover:text-primary-foreground",
          ].join(" ")}
        >
          <GitCommitHorizontal
            className="size-4"
            aria-hidden="true"
          />
        </span>

        <span
          aria-hidden="true"
          className={[
            "absolute top-9 h-[calc(100%+1.25rem)] w-px",
            "bg-border group-last:hidden",
          ].join(" ")}
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h4
              className={[
                "line-clamp-2 text-sm font-medium",
                "leading-6 text-foreground",
              ].join(" ")}
            >
              <a
                href={commit.commitUrl}
                target="_blank"
                rel="noreferrer"
                className={[
                  "transition-colors",
                  "hover:text-primary",
                ].join(" ")}
                data-cursor="pointer"
              >
                {getFirstLine(commit.message)}
              </a>
            </h4>

            <a
              href={commit.repositoryUrl}
              target="_blank"
              rel="noreferrer"
              className={[
                "mt-1 inline-flex text-xs",
                "text-muted-foreground transition-colors",
                "hover:text-foreground",
              ].join(" ")}
            >
              {commit.repository}
            </a>
          </div>

          <ArrowUpRight
            className={[
              "mt-1 size-4 shrink-0 text-muted-foreground",
              "opacity-0 transition-all duration-200",
              "group-hover:-translate-y-0.5",
              "group-hover:translate-x-0.5",
              "group-hover:opacity-100",
            ].join(" ")}
            aria-hidden="true"
          />
        </div>

        <div
          className={[
            "mt-3 flex flex-wrap items-center gap-x-3 gap-y-2",
            "text-[11px] text-muted-foreground",
          ].join(" ")}
        >
          <code
            className={[
              "rounded-md border border-border/70",
              "bg-muted/60 px-1.5 py-0.5",
              "font-mono text-foreground",
            ].join(" ")}
          >
            {commit.shortSha}
          </code>

          <span className="inline-flex items-center gap-1">
            <GitBranch className="size-3" aria-hidden="true" />
            {commit.branch}
          </span>

          <time dateTime={commit.createdAt}>
            {formatRelativeGitHubDate(commit.createdAt)}
          </time>
        </div>
      </div>
    </article>
  );
}