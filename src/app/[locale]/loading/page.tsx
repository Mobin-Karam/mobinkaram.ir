export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="flex min-h-[45dvh] items-center justify-center px-4"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="size-8 animate-spin rounded-full border-2 border-border border-t-primary" />

        <span className="sr-only">Loading</span>
      </div>
    </div>
  );
}
