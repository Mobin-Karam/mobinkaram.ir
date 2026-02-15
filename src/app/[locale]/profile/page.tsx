import Link from "next/link";
import { SectionHeading } from "@/components/ui/primitives";
import { getNowBlocks } from "@/data/now";
import { stackReasons } from "@/data/stack";
import type { Locale } from "@/i18n/config";
import { LazySection, Skeleton } from "@/components/ui/primitives";
import { PreferencesPanel } from "@/components/ui/preferences-panel";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  SiTypescript,
  SiNextdotjs,
  SiNestjs,
  SiPostgresql,
  SiExpo,
  SiTailwindcss,
  SiPlausibleanalytics,
} from "react-icons/si";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const now = getNowBlocks(locale);

  const story = [
    "Product engineer building for small communities at Koonj.",
    "Full-stack across Next.js, React Native, NestJS, Postgres, and realtime infra.",
    "This page shows what I'm doing now, my stack, and how I work.",
  ];

  const quickLinks = [
    { label: "Now", href: `/${locale}/now`, desc: "Live focus and activity" },
    { label: "Stack", href: `/${locale}/stack`, desc: "Tools and reasoning" },
    { label: "About", href: `/${locale}/about`, desc: "Philosophy and goals" },
    { label: "Architecture", href: `/${locale}/architecture`, desc: "System design snapshots" },
    { label: "Security", href: `/${locale}/security`, desc: "Secure-by-default habits" },
    { label: "Contact", href: `/${locale}/contact`, desc: "Reach me fast" },
  ];

  const iconFor = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("typescript"))
      return <SiTypescript className="text-sky-500" />;
    if (n.includes("next"))
      return <SiNextdotjs className="text-black dark:text-white" />;
    if (n.includes("nest")) return <SiNestjs className="text-red-500" />;
    if (n.includes("postgres"))
      return <SiPostgresql className="text-sky-700" />;
    if (n.includes("expo"))
      return <SiExpo className="text-gray-800 dark:text-gray-200" />;
    if (n.includes("tailwind"))
      return <SiTailwindcss className="text-cyan-500" />;
    if (n.includes("plausible"))
      return <SiPlausibleanalytics className="text-indigo-500" />;
    return <span className="text-[color:var(--muted)]">•</span>;
  };

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Profile"
        title="Current focus, stack, and how I work"
        description="Condensed overview of work, learning, and philosophy."
      />
      <LazySection minHeight={200} skeleton={<Skeleton className="h-48" />}>
        <div className="card p-5 space-y-3">
          <h3 className="text-lg font-semibold text-[color:var(--foreground)]">
            About snapshot
          </h3>
          <ul className="space-y-2 text-sm text-[color:var(--muted)]">
            {story.map((s) => (
              <li key={s}>• {s}</li>
            ))}
          </ul>
          <div className="grid gap-2 md:grid-cols-3">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-3 hover:-translate-y-0.5 hover:shadow-md transition flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-semibold text-[color:var(--foreground)]">
                    {link.label}
                  </p>
                  <p className="text-xs text-[color:var(--muted)]">
                    {link.desc}
                  </p>
                </div>
                <ArrowRight size={16} className="text-[color:var(--muted)]" />
              </Link>
            ))}
          </div>
        </div>
      </LazySection>
      <LazySection minHeight={200} skeleton={<Skeleton className="h-48" />}>
        <div className="card p-5 space-y-3">
          <h3 className="text-lg font-semibold text-[color:var(--foreground)]">
            Current focus
          </h3>
          <div className="grid gap-3 md:grid-cols-3">
            {now.slice(0, 3).map((block) => (
              <div
                key={block.title}
                className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-3"
              >
                <p className="text-sm font-semibold text-[color:var(--foreground)]">
                  {block.title}
                </p>
                <ul className="mt-2 space-y-1 text-xs text-[color:var(--muted)]">
                  {block.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </LazySection>
      <LazySection minHeight={220} skeleton={<Skeleton className="h-52" />}>
        <div className="card p-5 space-y-3">
          <h3 className="text-lg font-semibold text-[color:var(--foreground)]">
            Stack highlights
          </h3>
          <div className="grid gap-3 md:grid-cols-2">
            {stackReasons.slice(0, 6).map((item) => (
              <div
                key={item.name}
                className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-3"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-[color:var(--foreground)]">
                    <span className="mr-2">{iconFor(item.name)}</span>
                    {item.name}
                  </p>
                  <span className="pill text-[10px]">Core</span>
                </div>
                <p className="mt-2 text-sm text-[color:var(--muted)]">
                  {item.why}
                </p>
              </div>
            ))}
          </div>
        </div>
      </LazySection>
      <PreferencesPanel />
    </div>
  );
}
