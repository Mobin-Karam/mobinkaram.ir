"use client";

import Image from "next/image";
import { MessageCircleMore } from "lucide-react";
import { useLocale } from "next-intl";

import {
  getHomeContent,
  type StorySectionKey,
} from "@/data/home-content";

type SectionGuideProps = {
  section: StorySectionKey;
  className?: string;
  compact?: boolean;
};

export function SectionGuide({
  section,
  className = "",
  compact = false,
}: SectionGuideProps) {
  const locale = useLocale();
  const content = getHomeContent(locale);
  const guide = content.story.sections[section];

  return (
    <aside
      className={[
        "section-guide",
        compact ? "section-guide--compact" : "",
        className,
      ].join(" ")}
      aria-label={guide.label}
    >
      <div className="section-guide__portrait" aria-hidden="true">
        <Image
          src="/images/me-transparent.png"
          alt=""
          fill
          sizes="80px"
          className="object-contain object-bottom"
        />
      </div>

      <div className="section-guide__bubble">
        <div className="mb-2 flex items-center gap-2 text-primary">
          <MessageCircleMore className="size-4" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">
            {guide.label}
          </span>
        </div>

        <p className="text-sm leading-6 text-foreground/90">
          {guide.message}
        </p>

        {!compact ? (
          <p className="mt-3 text-xs leading-5 text-muted-foreground">
            {guide.prompt}
          </p>
        ) : null}
      </div>
    </aside>
  );
}
