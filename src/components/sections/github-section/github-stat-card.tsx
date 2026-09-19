import type { LucideIcon } from "lucide-react";

import { formatCompactNumber } from "./github-formatters";

interface GitHubStatCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
}

export function GitHubStatCard({
  label,
  value,
  icon: Icon,
}: GitHubStatCardProps) {
  return (
    <div
      className={[
        "group relative overflow-hidden",
        "rounded-2xl border border-border/70",
        "bg-card/60 p-4 backdrop-blur-sm",
        "transition-all duration-300",
        "hover:-translate-y-1 hover:border-primary/30",
        "hover:bg-card hover:shadow-lg",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-2xl font-semibold tracking-tight text-foreground">
            {formatCompactNumber(value)}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            {label}
          </p>
        </div>

        <span
          className={[
            "flex size-9 items-center justify-center",
            "rounded-xl bg-primary/10 text-primary",
            "transition-transform duration-300",
            "group-hover:scale-110",
          ].join(" ")}
        >
          <Icon className="size-4" aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}