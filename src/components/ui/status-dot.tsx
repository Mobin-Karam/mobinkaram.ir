import clsx from "clsx";

export function StatusDot({
  label,
  tone = "green",
}: {
  label: string;
  tone?: "green" | "amber";
}) {
  return (
    <span className="pill flex items-center gap-2">
      <span className="relative inline-flex h-3.5 w-3.5 items-center justify-center">
        <span
          className={clsx(
            "absolute inline-flex h-3.5 w-3.5 animate-ping rounded-full opacity-60",
            tone === "green" ? "bg-emerald-400" : "bg-amber-300",
          )}
        />
        <span
          className={clsx(
            "relative inline-flex h-2.5 w-2.5 rounded-full shadow",
            tone === "green" ? "bg-emerald-500" : "bg-amber-400",
          )}
        />
      </span>
      <span className="text-xs font-semibold text-[color:var(--foreground)]">
        {label}
      </span>
    </span>
  );
}
