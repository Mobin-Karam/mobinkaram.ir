export type AppErrorType =
  | "unknown"
  | "notFound"
  | "unauthorized"
  | "forbidden"
  | "validation"
  | "network"
  | "offline"
  | "timeout"
  | "rateLimit"
  | "server"
  | "maintenance";

export interface NormalizedAppError {
  type: AppErrorType;
  status?: number;
  code?: string;
  message?: string;
  requestId?: string;
  retryAfter?: number;
  details?: unknown;
}

export interface ApiErrorPayload {
  statusCode?: number;
  status?: number;
  code?: string;
  message?: string | string[];
  error?: string;
  requestId?: string;
  traceId?: string;
  retryAfter?: number;
  details?: unknown;
}