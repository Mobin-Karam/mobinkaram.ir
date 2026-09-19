export function GitHubSectionSkeleton() {
  return (
    <section
      aria-label="Loading GitHub activity"
      className={[
        "relative overflow-hidden",
        "border-t border-border",
        "px-4 py-24",
        "sm:px-6 md:px-8 lg:py-32",
      ].join(" ")}
    >
      <div className="mx-auto w-full max-w-7xl animate-pulse">
        <div className="h-7 w-40 rounded-full bg-muted" />

        <div className="mt-5 h-12 max-w-xl rounded-2xl bg-muted" />

        <div className="mt-4 h-6 max-w-2xl rounded-xl bg-muted/70" />

        <div
          className={[
            "mt-12 grid gap-5",
            "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1.85fr)]",
          ].join(" ")}
        >
          <div className="h-72 rounded-3xl bg-muted" />

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-28 rounded-2xl bg-muted" />
            ))}
          </div>
        </div>

        <div className="mt-20 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-72 rounded-3xl bg-muted" />
          ))}
        </div>
      </div>
    </section>
  );
}
