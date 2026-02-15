"use client";

import type { TrackerItem } from "@/data/tracker";

const statusColor: Record<TrackerItem["status"], string> = {
  done: "#10b981",
  "in-progress": "#f59e0b",
  next: "#94a3b8",
};

type Point = { x: number; y: number };

export function RoadmapSvg({ steps }: { steps: TrackerItem[] }) {
  if (!steps.length) return null;

  // Layout: snake/zig-zag so it wraps naturally on smaller viewports.
  const cols = Math.min(4, Math.max(2, steps.length));
  const rows = Math.ceil(steps.length / cols);
  const width = 1100;
  const height = 140 + rows * 140;
  const marginX = 80;
  const usableWidth = width - marginX * 2;
  const gapX = usableWidth / Math.max(1, cols - 1);
  const rowGap = 140;

  const positions: Point[] = steps.map((_, idx) => {
    const row = Math.floor(idx / cols);
    const col = idx % cols;
    const reverse = row % 2 === 1;
    const effectiveCol = reverse ? cols - 1 - col : col;
    const x = marginX + effectiveCol * gapX;
    const y = 80 + row * rowGap;
    return { x, y };
  });

  const path = positions.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4 shadow-[var(--glow)]">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full max-w-full"
        role="img"
        aria-label="Koonj roadmap"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="5"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
          </marker>
        </defs>

        <polyline
          points={path}
          fill="none"
          stroke="var(--border)"
          strokeWidth={2}
          strokeDasharray="6 6"
          markerEnd="url(#arrow)"
        />

        {steps.map((step, idx) => {
          const pos = positions[idx];
          const color = statusColor[step.status];
          return (
            <g key={step.title}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={16}
                fill={color}
                stroke="white"
                strokeWidth={3}
              />
              <text
                x={pos.x}
                y={pos.y + 5}
                textAnchor="middle"
                fontSize="12"
                fill="#0b1021"
                fontWeight={700}
              >
                {idx + 1}
              </text>
              <text
                x={pos.x}
                y={pos.y + 32}
                textAnchor="middle"
                fontSize="12"
                fill="var(--foreground)"
                fontWeight={700}
              >
                {step.title}
              </text>
              <text
                x={pos.x}
                y={pos.y + 52}
                textAnchor="middle"
                fontSize="11"
                fill="var(--muted)"
              >
                {step.detail}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="mt-3 flex flex-wrap gap-3 text-xs text-[color:var(--muted)]">
        <LegendDot color="#10b981" label="Done" />
        <LegendDot color="#f59e0b" label="In progress" />
        <LegendDot color="#94a3b8" label="Queued" />
      </div>
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className="inline-block h-3 w-3 rounded-full"
        style={{ background: color }}
      />
      <span>{label}</span>
    </span>
  );
}
