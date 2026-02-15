import { CalendarDays, Clock3, User } from "lucide-react";
import clsx from "clsx";

type Props = {
  author: string;
  date?: string;
  readingMinutes?: number;
  avatarUrl?: string;
  className?: string;
};

export function ArticleMeta({
  author,
  date,
  readingMinutes,
  avatarUrl,
  className,
}: Props) {
  const fallbackAvatar = "https://github.com/Mobin-Karam.png";
  const avatar = avatarUrl && avatarUrl.length > 2 ? avatarUrl : fallbackAvatar;
  const formattedDate = date
    ? new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
        new Date(date),
      )
    : undefined;

  return (
    <div
      className={clsx(
        "flex flex-wrap items-center gap-3 text-xs text-[color:var(--muted)]",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <img
          src={avatar}
          alt={author}
          className="h-10 w-10 rounded-full border border-[color:var(--border)] object-cover shadow-sm"
          loading="lazy"
        />
        <div className="leading-tight">
          <div className="text-sm font-semibold text-[color:var(--foreground)]">
            {author}
          </div>
        </div>
      </div>
      {readingMinutes ? (
        <span className="pill flex items-center gap-1 text-[11px]">
          <Clock3 size={14} />
          {readingMinutes} min read
        </span>
      ) : null}
      {formattedDate ? (
        <span className="flex items-center gap-1">
          <CalendarDays size={14} />
          {formattedDate}
        </span>
      ) : null}
    </div>
  );
}
