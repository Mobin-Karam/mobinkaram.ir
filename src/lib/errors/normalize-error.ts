import type {
  ApiErrorPayload,
  AppErrorType,
  NormalizedAppError,
} from "./error-types";

type AxiosLikeError = {
  code?: string;
  message?: string;
  response?: {
    status?: number;
    data?: ApiErrorPayload;
    headers?: Record<string, string | number | undefined>;
  };
  request?: unknown;
};

function getErrorType(status?: number, code?: string): AppErrorType {
  if (code === "OFFLINE") return "offline";
  if (code === "NETWORK_ERROR") return "network";
  if (code === "TIMEOUT") return "timeout";
  if (code === "MAINTENANCE") return "maintenance";

  switch (status) {
    case 400:
    case 422:
      return "validation";

    case 401:
      return "unauthorized";

    case 403:
      return "forbidden";

    case 404:
      return "notFound";

    case 408:
    case 504:
      return "timeout";

    case 429:
      return "rateLimit";

    case 500:
    case 501:
    case 502:
    case 503:
      return "server";

    default:
      return "unknown";
  }
}

function normalizeMessage(message: unknown): string | undefined {
  if (Array.isArray(message)) {
    return message.filter(Boolean).join(", ");
  }

  if (typeof message === "string") {
    return message;
  }

  return undefined;
}

function isAxiosLikeError(error: unknown): error is AxiosLikeError {
  return (
    typeof error === "object" &&
    error !== null &&
    ("response" in error || "request" in error || "code" in error)
  );
}

export function normalizeError(error: unknown): NormalizedAppError {
  if (!error) {
    return {
      type: "unknown",
    };
  }

  if (typeof navigator !== "undefined" && !navigator.onLine) {
    return {
      type: "offline",
      code: "OFFLINE",
    };
  }

  if (isAxiosLikeError(error)) {
    const status = error.response?.status;
    const payload = error.response?.data;
    const code = payload?.code ?? error.code;

    const retryAfterHeader =
      error.response?.headers?.["retry-after"] ??
      error.response?.headers?.["Retry-After"];

    const retryAfter =
      payload?.retryAfter ??
      (retryAfterHeader ? Number(retryAfterHeader) : undefined);

    if (
      error.code === "ECONNABORTED" ||
      error.code === "ETIMEDOUT" ||
      error.code === "TIMEOUT"
    ) {
      return {
        type: "timeout",
        status,
        code: "TIMEOUT",
        message: normalizeMessage(payload?.message ?? error.message),
        requestId: payload?.requestId ?? payload?.traceId,
        retryAfter,
        details: payload?.details,
      };
    }

    if (!error.response && error.request) {
      return {
        type: "network",
        code: "NETWORK_ERROR",
        message: error.message,
      };
    }

    return {
      type: getErrorType(status, code),
      status,
      code,
      message: normalizeMessage(
        payload?.message ?? payload?.error ?? error.message,
      ),
      requestId: payload?.requestId ?? payload?.traceId,
      retryAfter,
      details: payload?.details,
    };
  }

  if (error instanceof Error) {
    const errorWithMetadata = error as Error & {
      status?: number;
      statusCode?: number;
      code?: string;
      digest?: string;
      requestId?: string;
      cause?: unknown;
    };

    const status =
      errorWithMetadata.status ?? errorWithMetadata.statusCode;

    return {
      type: getErrorType(status, errorWithMetadata.code),
      status,
      code: errorWithMetadata.code,
      message: errorWithMetadata.message,
      requestId:
        errorWithMetadata.requestId ?? errorWithMetadata.digest,
      details: errorWithMetadata.cause,
    };
  }

  if (typeof error === "string") {
    return {
      type: "unknown",
      message: error,
    };
  }

  return {
    type: "unknown",
    details: error,
  };
}