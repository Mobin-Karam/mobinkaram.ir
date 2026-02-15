import Link from "next/link";
import { SectionHeading } from "@/components/ui/primitives";
import { getNowBlocks } from "@/data/now";
import { stackReasons } from "@/data/stack";
import { getPostIndex } from "@/lib/blog";
import { getGithubHighlights } from "@/lib/github";
import type { Locale } from "@/i18n/config";
import { LazySection, Skeleton } from "@/components/ui/primitives";
import { PreferencesPanel } from "@/components/ui/preferences-panel";
import { ArrowLeft, ArrowRight, Github, Users, BookOpen, Star, GitFork } from "lucide-react";
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
  const posts = await getPostIndex(locale as "en" | "fa");
  const gh = await getGithubHighlights();

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

      <LazySection minHeight={240} skeleton={<Skeleton className="h-60" />}>
        <div className="relative overflow-hidden rounded-3xl border border-[color:var(--border)] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 text-white shadow-[0_20px_80px_-40px_rgba(0,0,0,0.8)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.15),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(16,185,129,0.15),transparent_30%)]" />
          <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={(gh.user as any)?.avatar_url ?? "https://github.com/Mobin-Karam.png"}
                alt="GitHub avatar"
                className="h-20 w-20 rounded-2xl border border-white/10 shadow-lg"
                loading="lazy"
              />
              <div className="space-y-1">
                <p className="text-sm uppercase tracking-wide text-slate-200">GitHub Profile</p>
                <div className="flex items-center gap-2 text-2xl font-semibold">
                  <Github size={20} />
                  <span>{gh.user?.name ?? "Mobin Karam"}</span>
                </div>
                <Link
                  href={gh.user?.html_url ?? "https://github.com/Mobin-Karam"}
                  target="_blank"
                  className="inline-flex items-center gap-2 text-sm text-slate-200 underline decoration-slate-400/60 decoration-dashed hover:text-white"
                >
                  {gh.user?.login ?? "Mobin-Karam"}
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center text-sm">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <Users className="mx-auto h-4 w-4 text-emerald-300" />
                <p className="text-lg font-semibold">{gh.user?.followers ?? "—"}</p>
                <p className="text-xs text-slate-200">Followers</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <BookOpen className="mx-auto h-4 w-4 text-sky-300" />
                <p className="text-lg font-semibold">{gh.user?.public_repos ?? "—"}</p>
                <p className="text-xs text-slate-200">Repos</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <Star className="mx-auto h-4 w-4 text-amber-300" />
                <p className="text-lg font-semibold">
                  {gh.repos.reduce((acc, r) => acc + (r.stars ?? 0), 0)}
                </p>
                <p className="text-xs text-slate-200">Stars (pinned)</p>
              </div>
            </div>
          </div>
          {gh.repos.length ? (
            <div className="relative mt-4 grid gap-2 md:grid-cols-3">
              {gh.repos.slice(0, 3).map((repo) => (
                <Link
                  key={repo.url}
                  href={repo.url}
                  target="_blank"
                  className="group rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-white transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10"
                >
                  <div className="flex items-center justify-between text-xs text-slate-200">
                    <span>{repo.owner === "org" ? "Koonj Inc" : "Personal"}</span>
                    <span className="flex items-center gap-2">
                      <Star size={14} /> {repo.stars}
                      <GitFork size={14} /> {repo.forks}
                    </span>
                  </div>
                  <p className="mt-1 text-base font-semibold">{repo.name}</p>
                  <p className="text-[12px] text-slate-200 line-clamp-2">{repo.description}</p>
                  <p className="mt-2 text-[11px] uppercase text-slate-300">
                    {repo.lang ?? "TypeScript"}
                  </p>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </LazySection>

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

      <LazySection minHeight={200} skeleton={<Skeleton className="h-48" />}>
        <div className="card p-5 space-y-3">
          <h3 className="text-lg font-semibold text-[color:var(--foreground)]">
            Latest writing
          </h3>
          <div className="grid gap-3 md:grid-cols-2">
            {posts.slice(0, 2).map((post) => (
              <Link
                key={post.slug}
                href={`/${locale}/blog/${(post as any).category ?? "engineering"}/${post.slug}`}
                className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-3 hover:-translate-y-0.5 hover:shadow-md transition"
              >
                <div className="flex items-center justify-between text-[11px] text-[color:var(--muted)]">
                  <span>{post.date}</span>
                  <span>{post.readingTime ?? 5} min</span>
                </div>
                <p className="text-sm font-semibold text-[color:var(--foreground)]">
                  {post.title}
                </p>
                <p className="text-xs text-[color:var(--muted)] line-clamp-2">
                  {post.description}
                </p>
              </Link>
            ))}
          </div>
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--accent-strong)]"
          >
            View all posts
            <ArrowRight size={14} />
          </Link>
        </div>
      </LazySection>
    </div>
  );
}
