"use client";

import Link from "next/link";
import { ArrowUp, Github, Linkedin, Rss } from "lucide-react";

export function SiteFooter() {
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
          <Link
            href="https://github.com/Mobin-Karam"
            target="_blank"
            rel="noreferrer"
            className="pill nav-btn hover:-translate-y-0.5 hover:shadow-md transition"
          >
            <Github size={14} />
            GitHub
          </Link>
          <Link
            href="https://www.linkedin.com/in/mobin-karam/"
            target="_blank"
            rel="noreferrer"
            className="pill nav-btn hover:-translate-y-0.5 hover:shadow-md transition"
          >
            <Linkedin size={14} />
            LinkedIn
          </Link>
          <Link
            href="/rss.xml"
            target="_blank"
            rel="noreferrer"
            className="pill nav-btn hover:-translate-y-0.5 hover:shadow-md transition"
          >
            <Rss size={14} />
            RSS
          </Link>
          <button
            onClick={goTop}
            className="pill nav-btn hover:-translate-y-0.5 hover:shadow-md transition"
            aria-label="Back to top"
          >
            <ArrowUp size={14} />
            Top
          </button>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[color:var(--muted)]">
        <span>Built with Next.js, TypeScript, MDX, Tailwind.</span>
        <span>Hosting on Vercel · Analytics via Plausible · RSS ready.</span>
      </div>
    </footer>
  );
}
