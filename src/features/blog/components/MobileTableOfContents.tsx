"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

import type { TableOfContentsItem } from "@/lib/blog/toc";
import type { BlogLocale } from "@/types/blog";

export default function MobileTableOfContents({ items, locale }: { items: TableOfContentsItem[]; locale: BlogLocale }) {
  const [open, setOpen] = useState(false);
  const label = locale === "fa" ? "عنوان‌های این نوشته" : "In this post";

  return (
    <details open={open} onToggle={(event) => setOpen(event.currentTarget.open)} className="mx-auto mt-8 max-w-3xl rounded-xl border border-border bg-card lg:hidden">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 text-sm font-bold marker:content-none">
        {label}
        <ChevronDown className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </summary>
      <ol className="border-t border-border px-4 py-2 text-sm leading-6">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? "ps-3" : ""}>
            <a href={`#${item.id}`} onClick={() => setOpen(false)} className="flex min-h-11 items-center text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    </details>
  );
}
