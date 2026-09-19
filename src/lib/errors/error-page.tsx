"use client";

import { motion } from "framer-motion";

import type { AppErrorType } from "@/lib/errors/error-types";
import { cn } from "@/lib/utils";

import { ErrorActions } from "./error-actions";
import { ErrorCode } from "./error-code";
import { ErrorDetails } from "./error-details";
import { ErrorIcon } from "./error-icon";

interface ErrorPageProps {
  type?: AppErrorType;
  code?: string | number;
  eyebrow?: string;
  title: string;
  description: string;
  error?: Error & {
    digest?: string;
  };
  requestId?: string;
  details?: unknown;
  showRetry?: boolean;
  showBack?: boolean;
  showHome?: boolean;
  showLogin?: boolean;
  showContact?: boolean;
  onRetry?: () => void;
  fullScreen?: boolean;
  className?: string;
}

export function ErrorPage({
  type = "unknown",
  code,
  eyebrow,
  title,
  description,
  error,
  requestId,
  details,
  showRetry = false,
  showBack = true,
  showHome = true,
  showLogin = false,
  showContact = false,
  onRetry,
  fullScreen = true,
  className,
}: ErrorPageProps) {
  return (
    <section
      role="alert"
      aria-live="assertive"
      className={cn(
        "relative overflow-hidden border-t border-border px-4 py-20 sm:px-6 md:px-8",
        fullScreen &&
          "flex min-h-[calc(100dvh-5rem)] items-center justify-center",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-0 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/35 to-transparent" />

        <div className="absolute -end-40 top-20 size-80 rounded-full bg-primary/5 blur-3xl" />

        <div className="absolute -start-40 bottom-10 size-80 rounded-full bg-accent/5 blur-3xl" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--background))_72%)] opacity-70" />
      </div>

      <motion.div
        initial={{
          opacity: 0,
          y: 18,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mx-auto flex w-full max-w-3xl flex-col items-center text-center"
      >
        <ErrorIcon type={type} />

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {eyebrow && (
            <span className="text-sm font-medium text-primary">{eyebrow}</span>
          )}

          <ErrorCode code={code} />
        </div>

        <h1 className="mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          {title}
        </h1>

        <p className="mt-5 max-w-xl text-pretty text-base leading-8 text-muted-foreground sm:text-lg">
          {description}
        </p>

        <ErrorActions
          showRetry={showRetry}
          showBack={showBack}
          showHome={showHome}
          showLogin={showLogin}
          showContact={showContact}
          onRetry={onRetry}
        />

        <ErrorDetails error={error} requestId={requestId} details={details} />
      </motion.div>
    </section>
  );
}
