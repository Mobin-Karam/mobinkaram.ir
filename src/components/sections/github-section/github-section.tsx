import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  ExternalLink,
  GitCommitHorizontal,
  GitFork,
  MapPin,
  Star,
  Users,
} from "lucide-react";

import { FaGithub } from "react-icons/fa6";

import { getGitHubShowcase } from "@/lib/github/get-github-showcase";

import { GitHubCommitItem } from "./github-commit-item";
import {
  formatGitHubDate,
  formatRelativeGitHubDate,
} from "./github-formatters";
import { GitHubRepositoryCard } from "./github-repository-card";
import { GitHubStatCard } from "./github-stat-card";

export async function GitHubSection() {
  const data = await getGitHubShowcase();

  const { profile, statistics, featuredRepositories, commits, languages } =
    data;

  return (
    <section
      id="github"
      aria-labelledby="github-heading"
      className={[
        "relative overflow-hidden",
        "border-t border-border",
        "px-4 py-24",
        "sm:px-6 md:px-8",
        "lg:py-32",
      ].join(" ")}
    >
      {/* Background decorations */}
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-0",
          "bg-[radial-gradient(circle_at_15%_20%,hsl(var(--primary)/0.08),transparent_28%),radial-gradient(circle_at_85%_75%,hsl(var(--accent)/0.07),transparent_30%)]",
        ].join(" ")}
      />

      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-0 opacity-[0.035]",
          "bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)]",
          "bg-[size:48px_48px]",
        ].join(" ")}
      />

      <div className="relative mx-auto w-full max-w-7xl">
        {/* Section heading */}
        <div
          className={[
            "flex flex-col justify-between gap-8",
            "lg:flex-row lg:items-end",
          ].join(" ")}
        >
          <div className="max-w-3xl">
            <div
              className={[
                "inline-flex items-center gap-2",
                "rounded-full border border-border/70",
                "bg-card/60 px-3 py-1.5",
                "text-xs font-medium text-muted-foreground",
                "backdrop-blur-sm",
              ].join(" ")}
            >
              <FaGithub className="size-3.5 text-foreground" aria-hidden="true" />
              Open-source activity
            </div>

            <h2
              id="github-heading"
              className={[
                "mt-5 text-balance",
                "text-3xl font-semibold tracking-tight",
                "text-foreground",
                "sm:text-4xl lg:text-5xl",
              ].join(" ")}
            >
              Building in public on{" "}
              <span className="text-primary">GitHub.</span>
            </h2>

            <p
              className={[
                "mt-5 max-w-2xl text-pretty",
                "text-base leading-8 text-muted-foreground",
                "sm:text-lg",
              ].join(" ")}
            >
              A live overview of my public repositories, recent commits,
              technologies, and open-source activity.
            </p>
          </div>

          <a
            href={profile.html_url}
            target="_blank"
            rel="noreferrer"
            data-cursor="pointer"
            data-cursor-label="GitHub"
            className={[
              "group inline-flex w-fit items-center gap-2",
              "rounded-full border border-foreground/15",
              "bg-foreground px-5 py-3",
              "text-sm font-medium text-background",
              "shadow-lg transition-all duration-300",
              "hover:-translate-y-1 hover:shadow-xl",
              "focus-visible:outline-none",
              "focus-visible:ring-2 focus-visible:ring-primary",
              "focus-visible:ring-offset-2",
              "focus-visible:ring-offset-background",
            ].join(" ")}
          >
            View GitHub profile
            <ArrowUpRight
              className={[
                "size-4 transition-transform duration-300",
                "group-hover:-translate-y-0.5",
                "group-hover:translate-x-0.5",
              ].join(" ")}
              aria-hidden="true"
            />
          </a>
        </div>

        {/* Profile and statistics */}
        <div
          className={[
            "mt-12 grid gap-5",
            "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1.85fr)]",
          ].join(" ")}
        >
          <article
            className={[
              "relative overflow-hidden rounded-3xl",
              "border border-border/70",
              "bg-card/65 p-6 backdrop-blur-md",
              "sm:p-7",
            ].join(" ")}
          >
            <div
              aria-hidden="true"
              className={[
                "pointer-events-none absolute -end-16 -top-16",
                "size-44 rounded-full bg-primary/10 blur-3xl",
              ].join(" ")}
            />

            <div className="relative flex items-start gap-4">
              <div
                className={[
                  "relative size-16 shrink-0 overflow-hidden",
                  "rounded-2xl border border-border",
                  "bg-muted",
                  "shadow-md",
                ].join(" ")}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={profile.avatar_url}
                  alt={`${profile.name ?? profile.login}'s GitHub avatar`}
                  width={64}
                  height={64}
                  loading="lazy"
                  className="size-full object-cover"
                />
              </div>

              <div className="min-w-0">
                <h3 className="truncate text-xl font-semibold text-foreground">
                  {profile.name ?? profile.login}
                </h3>

                <a
                  href={profile.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className={[
                    "mt-0.5 inline-flex text-sm",
                    "text-muted-foreground transition-colors",
                    "hover:text-primary",
                  ].join(" ")}
                >
                  @{profile.login}
                </a>
              </div>
            </div>

            {profile.bio ? (
              <p className="relative mt-5 text-sm leading-7 text-muted-foreground">
                {profile.bio}
              </p>
            ) : null}

            <div className="relative mt-5 flex flex-wrap gap-3 text-xs text-muted-foreground">
              {profile.location ? (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-3.5" aria-hidden="true" />
                  {profile.location}
                </span>
              ) : null}

              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="size-3.5" aria-hidden="true" />
                Joined {formatGitHubDate(profile.created_at)}
              </span>
            </div>

            {languages.length > 0 ? (
              <div className="relative mt-6 border-t border-border/60 pt-5">
                <p className="text-xs font-medium text-foreground">
                  Most-used languages
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {languages.map((language) => (
                    <span
                      key={language.name}
                      className={[
                        "inline-flex items-center gap-2",
                        "rounded-full border border-border/70",
                        "bg-background/70 px-3 py-1.5",
                        "text-xs text-muted-foreground",
                      ].join(" ")}
                    >
                      <span className="size-1.5 rounded-full bg-primary" />

                      {language.name}

                      <span className="text-foreground">
                        {language.percentage}%
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </article>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <GitHubStatCard
              label="Public repositories"
              value={statistics.repositories}
              icon={BookOpen}
            />

            <GitHubStatCard
              label="Recent commits"
              value={statistics.recentCommits}
              icon={GitCommitHorizontal}
            />

            <GitHubStatCard
              label="Total stars"
              value={statistics.stars}
              icon={Star}
            />

            <GitHubStatCard
              label="Total forks"
              value={statistics.forks}
              icon={GitFork}
            />

            <GitHubStatCard
              label="Followers"
              value={statistics.followers}
              icon={Users}
            />

            <GitHubStatCard
              label="Following"
              value={statistics.following}
              icon={Users}
            />
          </div>
        </div>

        {/* Repositories */}
        {featuredRepositories.length > 0 ? (
          <div className="mt-20">
            <div className="flex items-end justify-between gap-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
                  Selected work
                </p>

                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                  Public repositories
                </h3>
              </div>

              <a
                href={`${profile.html_url}?tab=repositories`}
                target="_blank"
                rel="noreferrer"
                className={[
                  "hidden items-center gap-1.5",
                  "text-sm text-muted-foreground",
                  "transition-colors hover:text-foreground",
                  "sm:inline-flex",
                ].join(" ")}
              >
                All repositories
                <ExternalLink className="size-3.5" aria-hidden="true" />
              </a>
            </div>

            <div
              className={[
                "mt-7 grid gap-4",
                "md:grid-cols-2 xl:grid-cols-3",
              ].join(" ")}
            >
              {featuredRepositories.map((repository) => (
                <GitHubRepositoryCard
                  key={repository.id}
                  repository={repository}
                />
              ))}
            </div>
          </div>
        ) : null}

        {/* Commits */}
        <div
          className={[
            "mt-20 grid gap-6",
            "lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.8fr)]",
          ].join(" ")}
        >
          <div
            className={[
              "rounded-3xl border border-border/70",
              "bg-card/55 p-5 backdrop-blur-sm",
              "sm:p-7",
            ].join(" ")}
          >
            <div
              className={[
                "flex items-start justify-between gap-5",
                "border-b border-border/60 pb-5",
              ].join(" ")}
            >
              <div>
                <div className="flex items-center gap-2">
                  <GitCommitHorizontal
                    className="size-4 text-primary"
                    aria-hidden="true"
                  />

                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">
                    Activity stream
                  </p>
                </div>

                <h3 className="mt-2 text-xl font-semibold text-foreground">
                  Recent public commits
                </h3>
              </div>

              <span
                className={[
                  "rounded-full border border-border",
                  "bg-background px-3 py-1",
                  "text-xs text-muted-foreground",
                ].join(" ")}
              >
                {commits.length} commits
              </span>
            </div>

            <div className="mt-6">
              {commits.length > 0 ? (
                commits
                  .slice(0, 10)
                  .map((commit) => (
                    <GitHubCommitItem key={commit.id} commit={commit} />
                  ))
              ) : (
                <div className="py-12 text-center">
                  <GitCommitHorizontal
                    className="mx-auto size-8 text-muted-foreground"
                    aria-hidden="true"
                  />

                  <p className="mt-4 text-sm font-medium text-foreground">
                    No recent public commits
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    New public commits will appear after the next cache update.
                  </p>
                </div>
              )}
            </div>
          </div>

          <aside
            className={[
              "relative overflow-hidden rounded-3xl",
              "border border-border/70",
              "bg-foreground p-6 text-background",
              "sm:p-7",
            ].join(" ")}
          >
            <div
              aria-hidden="true"
              className={[
                "absolute -end-16 -top-16 size-48",
                "rounded-full bg-background/10 blur-3xl",
              ].join(" ")}
            />

            <div className="relative">
              <FaGithub className="size-8" aria-hidden="true" />

              <h3 className="mt-8 text-2xl font-semibold tracking-tight">
                Follow the work.
              </h3>

              <p className="mt-4 text-sm leading-7 text-background/65">
                Explore my repositories, development experiments, open-source
                work, and latest public changes directly on GitHub.
              </p>

              <dl className="mt-8 space-y-4 border-t border-background/15 pt-6">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-xs text-background/55">
                    Last GitHub activity
                  </dt>

                  <dd className="text-xs font-medium">
                    {commits[0]
                      ? formatRelativeGitHubDate(commits[0].createdAt)
                      : "No recent activity"}
                  </dd>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <dt className="text-xs text-background/55">
                    Portfolio cache
                  </dt>

                  <dd className="text-xs font-medium">
                    Updated every 24 hours
                  </dd>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <dt className="text-xs text-background/55">
                    Data visibility
                  </dt>

                  <dd className="text-xs font-medium">Public activity</dd>
                </div>
              </dl>

              <a
                href={profile.html_url}
                target="_blank"
                rel="noreferrer"
                data-cursor="pointer"
                data-cursor-label="Follow"
                className={[
                  "group mt-8 flex w-full items-center",
                  "justify-between rounded-2xl",
                  "bg-background px-4 py-3",
                  "text-sm font-medium text-foreground",
                  "transition-transform duration-300",
                  "hover:-translate-y-1",
                ].join(" ")}
              >
                Follow @{profile.login}
                <ArrowUpRight
                  className={[
                    "size-4 transition-transform duration-300",
                    "group-hover:-translate-y-0.5",
                    "group-hover:translate-x-0.5",
                  ].join(" ")}
                  aria-hidden="true"
                />
              </a>
            </div>
          </aside>
        </div>

        <p className="mt-6 text-center text-[11px] text-muted-foreground">
          GitHub data is fetched securely by the server and cached for 24 hours.
          Last server refresh:{" "}
          <time dateTime={data.fetchedAt}>
            {formatGitHubDate(data.fetchedAt)}
          </time>
          .
        </p>
      </div>
    </section>
  );
}
