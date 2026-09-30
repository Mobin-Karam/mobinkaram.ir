"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

import type { TableOfContentsItem } from "@/lib/blog/toc";
import type { BlogLocale } from "@/types/blog";

export default function DesktopTableOfContents({ items, locale }: { items: TableOfContentsItem[]; locale: BlogLocale }) {
  const [open, setOpen] = useState(true);
  const label = locale === "fa" ? "فهرست این نوشته" : "On this page";

  return (
    <section aria-label={label} className="mt-7 border-t border-border pt-4">
      <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} className="flex min-h-11 w-full items-center justify-between gap-3 text-start text-sm font-bold hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <span>{label}</span>
        <ChevronDown className={`size-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      {open ? (
        <ol className="mt-2 max-h-[calc(100dvh-15rem)] space-y-1 overflow-y-auto overscroll-contain border-s border-border pe-2 ps-3 text-sm leading-6">
          {items.map((item) => (
            <li key={item.id} className={item.level === 3 ? "ps-3" : ""}>
              <a href={`#${item.id}`} className="flex min-h-10 items-center text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                {item.title}
              </a>
            </li>
          ))}
        </ol>
      ) : null}
    </section>
  );
}
