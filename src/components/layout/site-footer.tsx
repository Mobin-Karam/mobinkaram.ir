"use client";

import Link from "next/link";
import { ArrowUp, Github, Linkedin, Rss, Globe2 } from "lucide-react";
import { useClientDevice } from "@/hooks/use-client-device";
import { Button, Pill } from "@/components/ui/primitives";

export function SiteFooter() {
  const device = useClientDevice();
  const goTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="mt-12 flex flex-col gap-4 rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 shadow-[var(--glow)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-[color:var(--foreground)]">
            Mobin Karam — Developer OS
          </p>
          <p className="text-xs text-[color:var(--muted)]">
            Case studies, build log, and lab experiments for Koonj and beyond.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="nav-btn">
            <Link
              href="https://github.com/Mobin-Karam"
              target="_blank"
              rel="noreferrer"
            >
              <Github size={14} />
              GitHub
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="nav-btn">
            <Link
              href="https://www.linkedin.com/in/mobin-karam/"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin size={14} />
              LinkedIn
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="nav-btn">
            <Link
              href="https://quera.org/profile/mobinkaram"
              target="_blank"
              rel="noreferrer"
            >
              <Globe2 size={14} />
              Quera
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="nav-btn">
            <Link href="/rss.xml" target="_blank" rel="noreferrer">
              <Rss size={14} />
              RSS
            </Link>
          </Button>
          <Button
            onClick={goTop}
            variant="ghost"
            size="sm"
            className="nav-btn"
            aria-label="Back to top"
          >
            <ArrowUp size={14} />
            Top
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[color:var(--muted)]">
        <span>Built with Next.js, TypeScript, MDX, Tailwind — with love & AI.</span>
        <span>Hosted on Liara · Analytics via Plausible · RSS ready.</span>
        <span className="flex items-center gap-1">
          You&rsquo;re browsing on
          <strong className="font-semibold text-[color:var(--foreground)]">
            {device.os}
          </strong>
          using
          <strong className="font-semibold text-[color:var(--foreground)]">
            {device.browser}
          </strong>
        </span>
      </div>
    </footer>
  );
}
