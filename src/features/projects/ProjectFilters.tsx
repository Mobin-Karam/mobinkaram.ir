"use client";

import { motion } from "framer-motion";
import { Check, Layers3 } from "lucide-react";

interface ProjectFiltersProps {
  stacks: string[];
  active: string;
  onChange: (value: string) => void;
}

export function ProjectFilters({
  stacks,
  active,
  onChange,
}: ProjectFiltersProps) {
  const options = ["all", ...stacks];

  return (
    <div
      className={[
        "flex items-center gap-1.5",
        "overflow-x-auto p-0.5",
        "scrollbar-none",
        "[-ms-overflow-style:none]",
        "[scrollbar-width:none]",
        "[&::-webkit-scrollbar]:hidden",
      ].join(" ")}
    >
      {options.map((option) => {
        const selected = option === active;
        const label = option === "all" ? "All projects" : option;

        return (
          <button
            key={option}
            type="button"
            onClick={() => {
              onChange(option);
            }}
            aria-pressed={selected}
            className={[
              "relative isolate inline-flex h-9",
              "shrink-0 items-center gap-1.5",
              "rounded-full px-3",
              "text-xs font-medium",
              "outline-none transition-colors",
              "focus-visible:ring-2 focus-visible:ring-ring",
              selected
                ? "text-foreground"
                : [
                    "text-muted-foreground",
                    "hover:bg-muted/70",
                    "hover:text-foreground",
                  ].join(" "),
            ].join(" ")}
          >
            {selected && (
              <motion.span
                layoutId="active-project-filter"
                className={[
                  "absolute inset-0 -z-10",
                  "rounded-full border border-border/70",
                  "bg-background shadow-sm",
                ].join(" ")}
                transition={{
                  type: "spring",
                  stiffness: 420,
                  damping: 34,
                }}
              />
            )}

            {option === "all" ? (
              <Layers3 className="size-3.5" />
            ) : selected ? (
              <Check className="size-3.5" />
            ) : null}

            {label}
          </button>
        );
      })}
    </div>
  );
}
