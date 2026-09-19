import type { AppErrorType } from "./error-types";

export function getErrorPath(type: AppErrorType, locale: string): string {
  const prefix = `/${locale}`;

  switch (type) {
    case "unauthorized":
      return `${prefix}/unauthorized`;

    case "forbidden":
      return `${prefix}/forbidden`;

    case "notFound":
      return `${prefix}/not-found`;

    case "rateLimit":
      return `${prefix}/too-many-requests`;

    case "maintenance":
      return `${prefix}/maintenance`;

    case "offline":
    case "network":
      return `${prefix}/offline`;

    case "server":
    case "timeout":
    case "unknown":
    default:
      return `${prefix}/server-error`;
  }
}
