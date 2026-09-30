"use client";

import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  FolderKanban,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProjectGrid } from "./ProjectGrid";
import { ProjectSearch } from "./ProjectSearch";
import { ProjectFilters } from "./ProjectFilters";

import type { Project } from "../data/projects";

interface ProjectsClientProps {
  projects: Project[];
  allStacks: string[];
  initialSearch?: string;
  initialFilter?: string;
}

export function ProjectsClient({
  projects,
  allStacks,
  initialSearch = "",
  initialFilter = "all",
}: ProjectsClientProps) {
  const t = useTranslations("projectsPage");

  const router = useRouter();
  const pathname = usePathname();

  const [search, setSearch] = useState(initialSearch);
  const [filter, setFilter] = useState(initialFilter);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const deferredSearch = useDeferredValue(search);
  const isFirstUrlSync = useRef(true);

  const normalizedSearch = deferredSearch.trim().toLocaleLowerCase();

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const searchableContent = [
        project.name,
        project.description,
        project.author ?? "",
        ...project.stack,
      ]
        .join(" ")
        .toLocaleLowerCase();

      const matchesSearch =
        normalizedSearch.length === 0 ||
        searchableContent.includes(normalizedSearch);

      const matchesFilter = filter === "all" || project.stack.includes(filter);

      return matchesSearch && matchesFilter;
    });
  }, [filter, normalizedSearch, projects]);

  const hasActiveFilters = search.trim().length > 0 || filter !== "all";

  useEffect(() => {
    if (isFirstUrlSync.current) {
      isFirstUrlSync.current = false;
      return;
    }

    const timeoutId = window.setTimeout(() => {
      const params = new URLSearchParams();
      const trimmedSearch = search.trim();

      if (trimmedSearch) {
        params.set("search", trimmedSearch);
      }

      if (filter !== "all") {
        params.set("filter", filter);
      }

      const query = params.toString();
      const nextUrl = query ? `${pathname}?${query}` : pathname;

      router.replace(nextUrl, {
        scroll: false,
      });
    }, 300);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [filter, pathname, router, search]);

  function clearSearch() {
    setSearch("");
  }

  function clearAllFilters() {
    setSearch("");
    setFilter("all");
    setMobileFiltersOpen(false);
  }

  return (
    <main
      className={[
        "relative min-h-screen overflow-x-clip",
        "bg-background",
        "pb-16 pt-24 sm:pt-28",
      ].join(" ")}
    >
      {/* Main background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-30 bg-background"
      />

      {/* Grid pattern */}
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-0 -z-20",
          "bg-size-[32px_32px]",
          "opacity-[0.025] dark:opacity-[0.055]",
          "bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)]",
          "[mask-image:linear-gradient(to_bottom,black,transparent_75%)]",
        ].join(" ")}
      />

      {/* Background decorations */}
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute -end-48 top-0 -z-10 hidden sm:block",
          "size-[28rem] rounded-full",
          "bg-primary/10 blur-[130px]",
        ].join(" ")}
      />

      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute -start-52 top-[30rem] -z-10 hidden sm:block",
          "size-[25rem] rounded-full",
          "bg-blue-500/10 blur-[130px]",
        ].join(" ")}
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8 border border-border bg-card font-mono shadow-[7px_7px_0_color-mix(in_srgb,var(--color-border)_75%,transparent)]">
          <div className="flex items-center gap-2 border-b border-border bg-muted px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground"><span className="size-2 rounded-full bg-destructive" /><span className="size-2 rounded-full bg-warning" /><span className="size-2 rounded-full bg-success" /><span className="ms-2">portfolio@mobinkaram:~/projects</span></div>
          <div className="p-5 sm:p-7"><p className="text-xs text-primary">$ ls --interactive --stack</p><div className="mt-3 flex flex-wrap items-end justify-between gap-4"><div><h1 className="text-3xl font-bold tracking-tight sm:text-5xl">{t("title")}</h1><p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">{t("description")}</p></div><div className="flex items-center gap-2 text-xs text-muted-foreground"><FolderKanban className="size-4 text-primary" />{projects.length} repositories <Sparkles className="ms-2 size-4 text-primary" /> live index</div></div></div>
        </header>

        {/* Search and filters */}
        <section
          aria-label={t("filtersAriaLabel")}
          className={[
            "sticky z-40",
            "top-[4.75rem]",
            "sm:top-[5.5rem]",
            "mt-1 sm:mt-1",
          ].join(" ")}
        >
          <div
            className={[
              "relative",
              "border border-border bg-card",
              "bg-background/90 p-2",
              "shadow-[0_16px_50px_-30px_rgba(0,0,0,0.5)]",
              "font-mono",
            ].join(" ")}
          >
            <div className="flex items-center gap-2">
              <div className="min-w-0 flex-1">
                <ProjectSearch
                  value={search}
                  onChange={setSearch}
                  onClear={clearSearch}
                  resultCount={filteredProjects.length}
                />
              </div>

              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => {
                  setMobileFiltersOpen((current) => !current);
                }}
                aria-label={
                  mobileFiltersOpen ? t("hideFilters") : t("showFilters")
                }
                aria-expanded={mobileFiltersOpen}
                className={[
                  "relative size-11 shrink-0 rounded-xl",
                  "md:hidden",
                  filter !== "all"
                    ? "border-primary/40 bg-primary/5 text-primary"
                    : "",
                ].join(" ")}
              >
                {mobileFiltersOpen ? (
                  <X aria-hidden="true" className="size-4" />
                ) : (
                  <SlidersHorizontal aria-hidden="true" className="size-4" />
                )}

                {filter !== "all" && !mobileFiltersOpen && (
                  <span
                    aria-hidden="true"
                    className={[
                      "absolute end-1.5 top-1.5",
                      "size-1.5 rounded-full bg-primary",
                    ].join(" ")}
                  />
                )}
              </Button>
            </div>

            {/* Desktop filters */}
            <div className="mt-2 hidden md:block">
              <ProjectFilters
                stacks={allStacks}
                active={filter}
                onChange={setFilter}
              />
            </div>

            {/* Mobile filters */}
            {mobileFiltersOpen && (
                <div className="overflow-hidden md:hidden">
                  <div className="mt-2 border-t border-border/60 pt-2">
                    <ProjectFilters
                      stacks={allStacks}
                      active={filter}
                      onChange={(value) => {
                        setFilter(value);
                        setMobileFiltersOpen(false);
                      }}
                    />
                  </div>
                </div>
            )}
          </div>
        </section>
        {/* Results information */}
        <div
          className={[
            "mb-5 mt-6 flex min-h-9 font-mono",
            "items-center justify-between gap-3",
            "sm:mt-8",
          ].join(" ")}
        >
          <p
            aria-live="polite"
            className="text-xs text-muted-foreground sm:text-sm"
          >
            {t.rich("showingResults", {
              count: filteredProjects.length,
              visible: filteredProjects.length,
              total: projects.length,
              strong: (chunks) => (
                <span className="font-semibold text-foreground">{chunks}</span>
              ),
            })}
          </p>

          {hasActiveFilters && (
              <button
                type="button"
                onClick={clearAllFilters}
                className={[
                  "inline-flex shrink-0 items-center gap-1.5",
                  "rounded-full px-3 py-1.5",
                  "text-xs font-medium",
                  "text-muted-foreground",
                  "outline-none transition-colors",
                  "hover:bg-muted hover:text-foreground",
                  "focus-visible:ring-2 focus-visible:ring-ring",
                  "focus-visible:ring-offset-2",
                ].join(" ")}
              >
                <X aria-hidden="true" className="size-3.5" />
                <span className="hidden sm:inline">{t("clearFilters")}</span>
                <span className="sm:hidden">{t("clear")}</span>
              </button>
          )}
        </div>

        {/* Project results */}
        {filteredProjects.length > 0 ? (
            <section aria-label={t("projectsAriaLabel")}>
              <ProjectGrid projects={filteredProjects} />
            </section>
          ) : (
            <EmptyProjects search={search} filter={filter} onClear={clearAllFilters} />
          )}
      </div>
    </main>
  );
}

interface EmptyProjectsProps {
  search: string;
  filter: string;
  onClear: () => void;
}

function EmptyProjects({ search, filter, onClear }: EmptyProjectsProps) {
  const t = useTranslations("projectsPage.empty");

  const trimmedSearch = search.trim();

  return (
    <section
      className={[
        "relative flex min-h-[22rem] overflow-hidden",
        "flex-col items-center justify-center",
        "rounded-3xl border border-dashed",
        "border-border/80 bg-muted/20",
        "px-5 py-14 text-center",
        "sm:min-h-[26rem] sm:px-8",
      ].join(" ")}
    >
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-x-0 top-0",
          "h-28",
          "bg-gradient-to-b from-primary/5 to-transparent",
        ].join(" ")}
      />

      <div
        className={[
          "relative flex size-14 items-center justify-center",
          "rounded-2xl border border-border/70",
          "bg-background shadow-sm",
          "sm:size-16",
        ].join(" ")}
      >
        <Search
          aria-hidden="true"
          className="size-5 text-muted-foreground sm:size-6"
        />
      </div>

      <h2
        className={[
          "relative mt-5",
          "text-xl font-semibold tracking-tight",
          "text-foreground sm:text-2xl",
        ].join(" ")}
      >
        {t("title")}
      </h2>

      <p
        className={[
          "relative mt-2 max-w-md",
          "text-sm leading-6 text-muted-foreground",
          "sm:leading-7",
        ].join(" ")}
      >
        {trimmedSearch
          ? filter !== "all"
            ? t("searchWithFilter", {
                search: trimmedSearch,
                filter,
              })
            : t("search", {
                search: trimmedSearch,
              })
          : t("filter", {
              filter,
            })}
      </p>

      <Button
        type="button"
        variant="outline"
        onClick={onClear}
        className="relative mt-6 rounded-full px-5"
      >
        {t("reset")}
      </Button>
    </section>
  );
}
