import type { BlogDateParts, BlogLocale } from "@/types/blog";

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

export function parseBlogDate(value: string) {
  const match = ISO_DATE.exec(value);
  if (!match) throw new Error(`Invalid blog date: ${value}`);

  const [, year, month, day] = match;
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));

  if (
    Number.isNaN(date.getTime()) ||
    date.getUTCFullYear() !== Number(year) ||
    date.getUTCMonth() + 1 !== Number(month) ||
    date.getUTCDate() !== Number(day)
  ) {
    throw new Error(`Invalid blog date: ${value}`);
  }

  return date;
}

export function getLocalizedDateParts(
  isoDate: string,
  locale: BlogLocale,
): BlogDateParts {
  const date = parseBlogDate(isoDate);

  if (locale === "en") {
    return {
      year: String(date.getUTCFullYear()),
      month: pad2(date.getUTCMonth() + 1),
      day: pad2(date.getUTCDate()),
    };
  }

  const formatter = new Intl.DateTimeFormat("en-u-ca-persian-nu-latn", {
    calendar: "persian",
    timeZone: "UTC",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const parts = formatter.formatToParts(date);

  return {
    year: part(parts, "year"),
    month: pad2(part(parts, "month")),
    day: pad2(part(parts, "day")),
  };
}

export function formatBlogDate(isoDate: string, locale: BlogLocale) {
  const date = parseBlogDate(isoDate);

  return new Intl.DateTimeFormat(
    locale === "fa" ? "fa-IR-u-ca-persian" : "en-US",
    {
      timeZone: "UTC",
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  ).format(date);
}

export function normalizeDateSegment(value: string) {
  if (!/^\d{1,4}$/.test(value)) return value;
  return value.length <= 2 ? value.padStart(2, "0") : value;
}

function part(
  parts: Intl.DateTimeFormatPart[],
  type: Intl.DateTimeFormatPartTypes,
) {
  const value = parts.find((item) => item.type === type)?.value;
  if (!value) throw new Error(`Unable to format Persian calendar part: ${type}`);
  return value;
}

function pad2(value: number | string) {
  return String(value).padStart(2, "0");
}
