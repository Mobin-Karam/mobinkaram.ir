 "use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { BarChart3 } from "lucide-react";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

type Stat = { label: string; days?: number | null; count: number };

type Props = {
  stats: Stat[];
};

export function BlogStats({ stats }: Props) {
  const labels = stats.map((s) => s.label);
  const data = {
    labels,
    datasets: [
      {
        label: "Posts published",
        data: stats.map((s) => s.count),
        backgroundColor: "rgba(59, 130, 246, 0.35)",
        borderColor: "rgba(59, 130, 246, 0.9)",
        borderWidth: 1.5,
        borderRadius: 6,
        hoverBackgroundColor: "rgba(59, 130, 246, 0.55)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(15,23,42,0.9)",
        borderColor: "#1f2937",
        borderWidth: 1,
        titleColor: "#f8fafc",
        bodyColor: "#e2e8f0",
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "var(--muted)" },
      },
      y: {
        beginAtZero: true,
        grid: { color: "rgba(148, 163, 184, 0.15)" },
        ticks: { stepSize: 1, color: "var(--muted)" },
      },
    },
  };

  return (
    <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4 shadow-[var(--glow)]">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[color:var(--foreground)]">
        <BarChart3 size={16} />
        Publishing cadence
      </div>
      <div className="h-56">
        <Bar data={data} options={options as any} />
      </div>
    </div>
  );
}
