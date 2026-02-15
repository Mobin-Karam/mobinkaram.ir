import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/i18n/config";

type GitHubEvent = {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
};

export async function GitHubActivity({
  username,
  locale,
}: {
  username: string;
  locale: Locale;
}) {
  let events: GitHubEvent[] = [];

  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/events/public`,
      {
        headers: {
          Accept: "application/vnd.github+json",
        },
        // Cache for an hour; keep page fast.
        next: { revalidate: 3600 },
      },
    );

    if (res.ok) {
      const json = (await res.json()) as GitHubEvent[];
      events = json.slice(0, 4);
    }
  } catch {
    // ignore and fallback
  }

  if (!events.length) {
    return (
      <p className="text-sm text-[color:var(--muted)]">
        Recent GitHub activity is not available right now.
      </p>
    );
  }

  return (
    <ul className="grid gap-3 md:grid-cols-2">
      {events.map((event) => (
        <li
          key={event.id}
          className="rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] p-3"
        >
          <div className="flex items-center justify-between text-xs text-[color:var(--muted)]">
            <span>{event.repo.name}</span>
            <span>{new Date(event.created_at).toLocaleDateString()}</span>
          </div>
          <p className="mt-1 text-sm font-semibold text-[color:var(--foreground)]">
            {event.type.replace("Event", "")}
          </p>
          <a
            href={`https://github.com/${event.repo.name}`}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-[color:var(--accent-strong)] hover:text-[color:var(--accent)]"
          >
            <ArrowUpRight size={14} />
            Open on GitHub
          </a>
        </li>
      ))}
    </ul>
  );
}
