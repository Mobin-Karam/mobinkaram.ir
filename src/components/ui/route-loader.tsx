export function RouteLoader({ label = "Loading" }: { label?: string }) {
  return (
    <div className="flex min-h-[45dvh] flex-col items-center justify-center gap-5" role="status" aria-live="polite">
      <div className="flex items-end gap-2" aria-hidden="true">
        {Array.from({ length: 6 }, (_, index) => (
          <span
            key={index}
            className="route-loader-square size-3 bg-primary sm:size-3.5"
            style={{ animationDelay: `${index * 90}ms` }}
          />
        ))}
      </div>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}
