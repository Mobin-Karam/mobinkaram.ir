export type StackReason = {
  name: string;
  why: string;
  notes?: string;
  links?: { label: string; href: string }[];
};

export const stackReasons: StackReason[] = [
  {
    name: "TypeScript",
    why: "Contracts across mobile, web, and backend stay consistent; faster refactors for product iterations.",
    notes: "Pair TS with zod for boundary validation.",
  },
  {
    name: "Next.js (App Router)",
    why: "Server components + file-based routing let me document systems close to code and ship quickly.",
    notes: "MDX + App Router gives me a doc-like feeling for this site.",
  },
  {
    name: "NestJS",
    why: "Opinionated modules and providers keep teams aligned; perfect for CQRS and background jobs.",
    notes: "Prisma + Postgres for relational core, Redis for short-lived coordination.",
  },
  {
    name: "PostgreSQL",
    why: "Predictable relational guarantees; extensions (Timescale, pgvector) cover analytics + search.",
  },
  {
    name: "Expo",
    why: "Fast mobile delivery with OTA updates; consistent developer experience for contributors.",
    notes: "Combine with React Query + Zustand for predictable data flows.",
  },
  {
    name: "Tailwind + CSS variables",
    why: "Design tokens + RTL/LTR-aware utilities keep the UI consistent while staying expressive.",
  },
  {
    name: "Plausible",
    why: "Lightweight, privacy-friendly analytics; perfect for personal product telemetry.",
  },
];
