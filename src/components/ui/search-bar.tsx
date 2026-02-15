"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { searchContent, type SearchResult } from "@/lib/search";
import type { Locale } from "@/i18n/config";
import { Search } from "lucide-react";
import clsx from "clsx";

type Props = {
  locale: Locale;
  index: SearchResult[];
  placeholder: string;
};

export function SearchBar({ locale, index, placeholder }: Props) {
  const [query, setQuery] = useState("");

  const results = useMemo(
    () => searchContent(locale, query, index),
    [locale, query, index],
  );

  return (
    <div className="relative w-full">
      <div className="flex items-center gap-2 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-2 shadow-sm">
        <Search size={18} className="text-[color:var(--muted)]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-[color:var(--foreground)] outline-none placeholder:text-[color:var(--muted)]"
        />
        <span className="pill hidden md:inline">
          {results.length} results
        </span>
      </div>

      {query && (
        <div className="absolute z-20 mt-2 w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] shadow-lg">
          {results.length === 0 ? (
            <div className="px-3 py-4 text-sm text-[color:var(--muted)]">
              No matches found.
            </div>
          ) : (
            <ul className="divide-y divide-[color:var(--border)]">
              {results.map((item) => (
                <li key={`${item.type}-${item.slug}`}>
                  <Link
                    href={buildHref(locale, item)}
                    className="flex flex-col gap-1 px-3 py-3 hover:bg-[color:var(--background)]"
                    onClick={() => setQuery("")}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold">
                        {item.title}
                      </span>
                      <span
                        className={clsx(
                          "pill",
                          "text-[11px]",
                          "bg-[color:var(--background)]",
                        )}
                      >
                        {item.type}
                      </span>
                    </div>
                    <p className="text-xs text-[color:var(--muted)]">
                      {item.summary}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-[color:var(--background)] px-2 py-1 text-[10px] text-[color:var(--muted)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function buildHref(locale: Locale, item: SearchResult) {
  switch (item.type) {
    case "project":
      return `/${locale}/projects/${item.slug}`;
    case "lab":
      return `/${locale}/lab/${item.slug}`;
    case "log":
      return `/${locale}/build-log/${item.slug}`;
  }
}
