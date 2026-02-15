import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { SectionHeading } from "@/components/ui/primitives";
import { SearchBar } from "@/components/ui/search-bar";
import { getFeaturedProject, getProjects } from "@/data/projects";
import { getLabEntries } from "@/data/lab";
import { getBuildLogs } from "@/data/logs";
import { getNowBlocks } from "@/data/now";
import { buildSearchIndex } from "@/lib/search";
import { type Locale } from "@/i18n/config";
import { readingList } from "@/data/reading";
import { timeline } from "@/data/timeline";
import { getGithubHighlights } from "@/lib/github";
import clsx from "clsx";
import { LazySection, Skeleton } from "@/components/ui/primitives";
import { AnnouncementBanner } from "@/components/home/announcement-banner";
import { RoadmapSvg } from "@/components/ui/roadmap-svg";
import { koonjTracker } from "@/data/tracker";

export default async function LocaleHome({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const featured = getFeaturedProject(locale);
  const otherProjects = getProjects(locale).filter(
    (p) => p.meta.slug !== featured?.meta.slug,
  );
  const lab = getLabEntries(locale).slice(0, 2);
  const logs = getBuildLogs(locale).slice(0, 3);
  const nowBlocks = getNowBlocks(locale) ?? [];
  const searchIndex = buildSearchIndex(locale);
  const github = await getGithubHighlights();
  const bannerSlides = [
    {
      id: "koonj",
      content: (
        <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-3">
          <span className="pill text-[10px]">Koonj</span>
          <p className="text-sm font-semibold text-[color:var(--foreground)]">
            Koonj Phase 2 is live. Plugins and analytics are in progress.
          </p>
        </div>
      ),
    },
    {
      id: "rss",
      content: (
        <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-3">
          <span className="pill text-[10px]">RSS</span>
          <p className="text-sm text-[color:var(--foreground)]">
            Get updates from /rss.xml for new logs, lab notes, and projects.
          </p>
        </div>
      ),
    },
    {
      id: "lab",
      content: (
        <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-3">
          <span className="pill text-[10px]">Lab</span>
          <p className="text-sm text-[color:var(--foreground)]">
            Fresh navigation and state-model experiments are in the Lab now.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-10">
      <AnnouncementBanner slides={bannerSlides} />
      <Hero
        locale={locale}
        headline={t("hero.headline")}
        sub={t("hero.sub")}
        ctaProjects="Case studies"
        ctaLab="Enter the lab"
      />

      <div className="grid gap-4 md:grid-cols-[2fr,1fr]">
        <LazySection minHeight={220} skeleton={<Skeleton className="h-52" />}>
          <div className="card p-5">
            <SectionHeading
              eyebrow={t("sections.featured")}
              title={featured?.meta.title ?? ""}
              description={featured?.meta.summary ?? ""}
            />
            {featured ? (
              <div className="mt-4 space-y-3">
                <div className="flex flex-wrap gap-2">
                  {featured.meta.tags.map((tag) => (
                    <span key={tag} className="pill">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-muted">
                  {featured.meta.stack.join(" • ")}
                </p>
                <p className="text-xs text-[color:var(--muted)]">
                  {featured.meta.readingMinutes} min read ·{" "}
                  {featured.meta.author}
                </p>
                <Link
                  href={`/${locale}/projects/${featured.meta.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[color:var(--accent-strong)]"
                >
                  Read the case study
                  <ArrowRight size={14} />
                </Link>
              </div>
            ) : null}
          </div>
        </LazySection>
        <LazySection minHeight={180} skeleton={<Skeleton className="h-40" />}>
          <div className="card p-5">
            <SectionHeading eyebrow="Search" title={t("search.placeholder")} />
            <div className="mt-3">
              <SearchBar
                locale={locale}
                index={searchIndex}
                placeholder={t("search.placeholder")}
              />
            </div>
          </div>
        </LazySection>
      </div>

      <LazySection minHeight={220} skeleton={<Skeleton className="h-52" />}>
        <div className="card p-5">
          <SectionHeading
            eyebrow={t("sections.nowBuilding")}
            title="Live status"
          />
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {nowBlocks.map((block) => (
              <div
                key={block.title}
                className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)] p-4"
              >
                <p className="text-sm font-semibold text-[color:var(--foreground)]">
                  {block.title}
                </p>
                <ul className="mt-2 space-y-2 text-sm text-[color:var(--muted)]">
                  {block.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </LazySection>

      <LazySection minHeight={220} skeleton={<Skeleton className="h-56" />}>
        <div className="card p-5">
          <SectionHeading
            eyebrow="Koonj"
            title="Koonj roadmap"
            description="Where the product is heading next."
          />
          <div className="mt-4">
            <RoadmapSvg steps={koonjTracker} />
          </div>
          <Link
            href={`/${locale}/koonj-status`}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-[color:var(--accent)] px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5"
          >
            Open tracker
            <ArrowRight size={14} />
          </Link>
        </div>
      </LazySection>

      {/* <div className="card p-5">
        <LazySection minHeight={260} skeleton={<Skeleton className="h-64" />}>
          <SectionHeading
            eyebrow="GitHub"
            title="Pinned GitHub repos"
            description="Live from Koonj-Inc and my personal account."
          />
          <div className="mt-4 grid gap-4 md:grid-cols-[1.2fr,1fr]">
            <div className="space-y-3">
              {github.repos.map((repo) => (
                <Link
                  key={repo.url}
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] p-3 hover:-translate-y-0.5 hover:shadow-lg transition"
                >
                  <div className="flex items-center justify-between text-xs text-[color:var(--muted)] ltr-text">
                    <span>{repo.owner === "org" ? "Koonj-Inc" : "Mobin-Karam"}</span>
                    <span>{repo.lang ?? "—"}</span>
                  </div>
                  <p className="text-sm font-semibold text-[color:var(--foreground)]">
                    {repo.name}
                  </p>
                  <p className="text-xs text-[color:var(--muted)] line-clamp-2">
                    {repo.description || "No description"}
                  </p>
                  <div className="mt-2 flex gap-3 text-xs text-[color:var(--muted)] ltr-text">
                    <span>★ {repo.stars}</span>
                    <span>⑂ {repo.forks}</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)] p-4">
              <p className="text-sm font-semibold text-[color:var(--foreground)]">
                <span className="ltr-text">Koonj-Inc</span>
              </p>
              <p className="text-xs text-[color:var(--muted)]">
                {github.org?.public_repos ?? 0} repos · {github.org?.followers ?? 0} followers
              </p>
              <hr className="my-3 border-[color:var(--border)]" />
              <p className="text-sm font-semibold text-[color:var(--foreground)]">
                <span className="ltr-text">Mobin-Karam</span>
              </p>
              <p className="text-xs text-[color:var(--muted)]">
                {github.user?.public_repos ?? 0} repos · {github.user?.followers ?? 0} followers
              </p>
              <p className="mt-2 text-xs text-[color:var(--muted)]">
                Uses a read-only PAT for live data.
              </p>
            </div>
          </div>
        </LazySection>
      </div> */}

      {/* <div className="grid gap-4 md:grid-cols-2">
        <div className="card p-5">
          <SectionHeading
            eyebrow={t("sections.engineeringLab")}
            title="Latest patterns"
          />
          <div className="mt-4 space-y-3">
            {lab.map((entry) => (
              <Link
                key={entry.meta.slug}
                href={`/${locale}/lab/${entry.meta.slug}`}
                className="block rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] p-3 hover:-translate-y-0.5 hover:shadow-lg transition"
              >
                <p className="text-sm font-semibold text-[color:var(--foreground)]">
                  {entry.meta.title}
                </p>
                <p className="text-xs text-[color:var(--muted)]">
                  {entry.meta.summary}
                </p>
                <p className="mt-1 text-[11px] text-[color:var(--muted)]">
                  {entry.meta.readingMinutes} min read • {entry.meta.date}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {entry.meta.tags.map((tag) => (
                    <span key={tag} className="pill text-[10px]">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
          <Link
            href={`/${locale}/lab`}
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--accent-strong)]"
          >
            See all
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="card p-5">
          <SectionHeading
            eyebrow={t("sections.buildLog")}
            title="Build journal"
          />
          <div className="mt-4 space-y-3">
            {logs.map((log) => (
              <Link
                key={log.meta.slug}
                href={`/${locale}/build-log/${log.meta.slug}`}
                className="flex flex-col rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] p-3 hover:-translate-y-0.5 hover:shadow-lg transition"
              >
                <div className="flex items-center justify-between text-xs text-[color:var(--muted)]">
                  <span>{log.meta.date}</span>
                  <span>{log.meta.readingMinutes} min read</span>
                  <span>{log.meta.tags.join(" / ")}</span>
                </div>
                <p className="text-sm font-semibold text-[color:var(--foreground)]">
                  {log.meta.title}
                </p>
                <p className="text-xs text-[color:var(--muted)]">
                  {log.meta.summary}
                </p>
              </Link>
            ))}
          </div>
          <Link
            href={`/${locale}/build-log`}
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--accent-strong)]"
          >
            All logs
            <ArrowRight size={14} />
          </Link>
        </div>
      </div> */}

      {/* <div className="card p-5">
        <SectionHeading eyebrow={t("sections.stack")} title="Engineering stack" />
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {otherProjects.slice(0, 2).map((project) => (
            <Link
              key={project.meta.slug}
              href={`/${locale}/projects/${project.meta.slug}`}
              className="rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] p-3 hover:-translate-y-0.5 hover:shadow-lg transition"
            >
              <p className="text-sm font-semibold text-[color:var(--foreground)]">
                {project.meta.title}
              </p>
              <p className="text-xs text-[color:var(--muted)]">
                {project.meta.summary}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.meta.stack.slice(0, 3).map((tool) => (
                  <span key={tool} className="pill text-[10px]">
                    {tool}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
        <Link
          href={`/${locale}/stack`}
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--accent-strong)]"
        >
          Stack details
          <ArrowRight size={14} />
        </Link>
      </div> */}

      {/* <div className="grid gap-4 md:grid-cols-2">
        <div className="card p-5">
          <LazySection minHeight={200} skeleton={<Skeleton className="h-52" />}>
            <SectionHeading eyebrow={t("sections.timeline")} title="Timeline" />
            <div className="mt-4 space-y-3">
              {timeline.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-3 rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] p-3"
                >
                  <div className="min-w-[70px] text-right text-xs text-[color:var(--muted)] ltr-text">
                    {item.timeframe}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={clsx(
                          "pill text-[10px] uppercase",
                          item.category === "shipping"
                            ? "border-green-500"
                            : item.category === "build"
                              ? "border-amber-500"
                              : "border-blue-500",
                        )}
                      >
                        {item.category}
                      </span>
                      <p className="text-sm font-semibold text-[color:var(--foreground)]">
                        {item.title}
                      </p>
                    </div>
                    <p className="text-xs text-[color:var(--muted)]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </LazySection>
        </div>

        <div className="card p-5">
          <LazySection minHeight={200} skeleton={<Skeleton className="h-52" />}>
            <SectionHeading
              eyebrow={t("sections.reading")}
              title="Reading list"
            />
            <div className="mt-4 space-y-3">
              {readingList.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-3 rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] p-3"
                >
                  <div className="flex flex-col items-center gap-1">
                    <span
                      className={clsx(
                        "h-2 w-2 rounded-full",
                        item.status === "done"
                          ? "bg-emerald-500"
                          : item.status === "reading"
                            ? "bg-amber-400"
                            : "bg-slate-400",
                      )}
                    />
                    <span className="text-[10px] text-[color:var(--muted)] uppercase">
                      {item.status}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-[color:var(--foreground)]">
                      {item.title}
                    </p>
                    <p className="text-xs text-[color:var(--muted)] ltr-text">
                      {item.author}
                    </p>
                    <p className="text-xs text-[color:var(--muted)]">
                      {item.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </LazySection>
        </div>
      </div> */}

      {/* <div className="card p-5">
        <SectionHeading
          eyebrow={t("sections.roadmap")}
          title="Koonj tracker"
          description="Current milestone, what's done, and what's next."
        />
        <Link
          href={`/${locale}/koonj-status`}
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-[color:var(--accent)] px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5"
        >
          Open tracker
          <ArrowRight size={14} />
        </Link>
      </div> */}
    </div>
  );
}
