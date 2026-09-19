export function formatGitHubDate(value: string, locale = "en"): string {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function formatRelativeGitHubDate(value: string, locale = "en"): string {
  const date = new Date(value);
  const now = new Date();

  const differenceInSeconds = Math.round(
    (date.getTime() - now.getTime()) / 1000,
  );

  const formatter = new Intl.RelativeTimeFormat(locale, {
    numeric: "auto",
  });

  const ranges: Array<{
    limit: number;
    divisor: number;
    unit: Intl.RelativeTimeFormatUnit;
  }> = [
    {
      limit: 60,
      divisor: 1,
      unit: "second",
    },
    {
      limit: 60 * 60,
      divisor: 60,
      unit: "minute",
    },
    {
      limit: 60 * 60 * 24,
      divisor: 60 * 60,
      unit: "hour",
    },
    {
      limit: 60 * 60 * 24 * 30,
      divisor: 60 * 60 * 24,
      unit: "day",
    },
    {
      limit: 60 * 60 * 24 * 365,
      divisor: 60 * 60 * 24 * 30,
      unit: "month",
    },
  ];

  const absoluteDifference = Math.abs(differenceInSeconds);

  for (const range of ranges) {
    if (absoluteDifference < range.limit) {
      return formatter.format(
        Math.round(differenceInSeconds / range.divisor),
        range.unit,
      );
    }
  }

  return formatter.format(
    Math.round(differenceInSeconds / (60 * 60 * 24 * 365)),
    "year",
  );
}

export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function getFirstLine(value: string): string {
  return value.split("\n")[0]?.trim() || "Untitled commit";
}
