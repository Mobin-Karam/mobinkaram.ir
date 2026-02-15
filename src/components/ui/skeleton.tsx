import clsx from "clsx";

type Props = {
  className?: string;
};

export function Skeleton({ className }: Props) {
  return (
    <div
      className={clsx(
        "animate-pulse rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)]",
        className,
      )}
    />
  );
}

export function SkeletonLines({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-full bg-[color:var(--border)]"
          style={{ height: 10, width: `${90 - i * 8}%` }}
        />
      ))}
    </div>
  );
}
