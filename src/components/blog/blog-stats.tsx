import { BarChart3 } from "lucide-react";

type Stat = { label: string; days?: number | null; count: number };

type Props = {
  stats: Stat[];
};

export function BlogStats({ stats }: Props) {
  const max = Math.max(1, ...stats.map((s) => s.count));

  return (
    <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4 shadow-[var(--glow)]">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[color:var(--foreground)]">
        <BarChart3 size={16} />
        Publishing cadence
      </div>
      <div className="space-y-2 text-sm">
        {stats.map((s) => {
          const pct = Math.max(6, Math.round((s.count / max) * 100));
          return (
            <div key={s.label} className="space-y-1">
              <div className="flex items-center justify-between text-[11px] uppercase text-[color:var(--muted)]">
                <span>{s.label}</span>
                <span className="font-semibold text-[color:var(--foreground)]">{s.count}</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-[color:var(--background)]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[color:var(--accent-strong)] to-[color:var(--accent-weak)]"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
