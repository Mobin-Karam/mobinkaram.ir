export type TechEvolutionEntry = {
  year: string;
  focus: string;
  gained: string[];
  dropped?: string[];
};

export const techEvolution: TechEvolutionEntry[] = [
  {
    year: "2023",
    focus: "Stabilizing web delivery",
    gained: ["Next.js", "Tailwind"],
    dropped: ["CRA"],
  },
  {
    year: "2024",
    focus: "Mobile + realtime",
    gained: ["Expo", "React Query", "WebSockets"],
    dropped: ["Redux Saga"],
  },
  {
    year: "2025",
    focus: "Resilience & payments",
    gained: ["NestJS", "CQRS", "PostgreSQL extensions"],
  },
  {
    year: "2026",
    focus: "Edge observability",
    gained: ["OpenTelemetry", "otel-collector", "Feature flags"],
  },
];
