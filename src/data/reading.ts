export type ReadingItem = {
  title: string;
  author: string;
  note: string;
  link?: string;
  status: "reading" | "done" | "queued";
};

export const readingList: ReadingItem[] = [
  {
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    note: "Re-reading chapters on streams vs batches for Koonj analytics.",
    status: "reading",
  },
  {
    title: "Systems Performance 2/e",
    author: "Brendan Gregg",
    note: "For CPU/memory profiling strategy on low-end Android devices.",
    status: "queued",
  },
  {
    title: "Building Mobile Apps at Scale",
    author: "Gergely Orosz",
    note: "Case studies on release discipline; mapping to Expo OTA flows.",
    status: "done",
  }
];
