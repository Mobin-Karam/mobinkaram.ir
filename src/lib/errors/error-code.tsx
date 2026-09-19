interface ErrorCodeProps {
  code?: string | number;
}

export function ErrorCode({ code }: ErrorCodeProps) {
  if (!code) return null;

  return (
    <span className="inline-flex rounded-full border border-border bg-muted/60 px-3 py-1 font-mono text-xs font-medium text-muted-foreground">
      {code}
    </span>
  );
}
