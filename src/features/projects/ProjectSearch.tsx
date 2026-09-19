"use client";

import { Search, X } from "lucide-react";
import { useTranslations } from "next-intl";

interface ProjectSearchProps {
  value: string;
  resultCount: number;
  onChange: (value: string) => void;
  onClear: () => void;
}

export function ProjectSearch({
  value,
  resultCount,
  onChange,
  onClear,
}: ProjectSearchProps) {
  const t = useTranslations("projectsPage")
  return (
    <div className="relative min-w-0 flex-1">
      <Search
        aria-hidden="true"
        className={[
          "pointer-events-none absolute",
          "left-3.5 top-1/2 size-4",
          "-translate-y-1/2",
          "text-muted-foreground",
        ].join(" ")}
      />

      <input
        type="search"
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
        }}
      placeholder={t("searchPlaceholder")}
        aria-label="Search projects"
        className={[
          "h-11 w-full rounded-xl",
          "border border-transparent",
          "bg-muted/50",
          "pl-10 pr-20",
          "text-sm text-foreground",
          "outline-none transition-all",
          "placeholder:text-muted-foreground",
          "hover:bg-muted/70",
          "focus:border-border",
          "focus:bg-background",
          "focus:ring-2 focus:ring-ring/40",
          "[&::-webkit-search-cancel-button]:hidden",
        ].join(" ")}
      />

      <div
        className={[
          "absolute right-2 top-1/2",
          "flex -translate-y-1/2 items-center gap-1",
        ].join(" ")}
      >
        {value && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear project search"
            className={[
              "flex size-7 items-center justify-center",
              "rounded-lg text-muted-foreground",
              "outline-none transition-colors",
              "hover:bg-muted hover:text-foreground",
              "focus-visible:ring-2 focus-visible:ring-ring",
            ].join(" ")}
          >
            <X className="size-3.5" />
          </button>
        )}

        <span
          className={[
            "hidden min-w-8 rounded-md",
            "bg-background/80 px-1.5 py-1",
            "text-center font-mono text-[10px]",
            "text-muted-foreground shadow-sm",
            "ring-1 ring-border/70 sm:block",
          ].join(" ")}
        >
          {resultCount}
        </span>
      </div>
    </div>
  );
}
