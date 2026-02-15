export type TimelineItem = {
  title: string;
  timeframe: string;
  description: string;
  category: "build" | "learning" | "shipping";
};

export const timeline: TimelineItem[] = [
  {
    title: "Koonj Phase 1 launch",
    timeframe: "Q4 2025",
    description: "Shipped MVP with paid memberships, chat, and live events.",
    category: "shipping",
  },
  {
    title: "Navigation overhaul",
    timeframe: "Jan 2026",
    description: "Hybrid tabs + modal architecture to cut churn during onboarding.",
    category: "build",
  },
  {
    title: "Public developer OS",
    timeframe: "Feb 2026",
    description: "This bilingual engineering workspace goes live.",
    category: "shipping",
  },
  {
    title: "Edge observability rollout",
    timeframe: "Planned — Mar 2026",
    description: "Full OTel traces for payments and realtime infra.",
    category: "build",
  },
];
