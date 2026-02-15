export type TrackerItem = {
  title: string;
  status: "done" | "in-progress" | "next";
  detail: string;
  eta?: string;
};

export const koonjTracker: TrackerItem[] = [
  {
    title: "Membership snapshots + audit trail",
    status: "done",
    detail: "Versioned memberships with immutable pricing history.",
  },
  {
    title: "Role automation plugins",
    status: "in-progress",
    detail: "Allow community owners to chain triggers (payment → role → notifications).",
    eta: "March 2026",
  },
  {
    title: "Payment analytics dashboard",
    status: "in-progress",
    detail: "Cohort-based churn and LTV per community.",
    eta: "April 2026",
  },
  {
    title: "Real-time presence v2",
    status: "next",
    detail: "Presence service rewrite with heartbeat fences and region-aware fan-out.",
    eta: "May 2026",
  },
];
