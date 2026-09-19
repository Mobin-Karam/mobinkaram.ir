import {
  AlertTriangle,
  Ban,
  Clock3,
  FileQuestion,
  LockKeyhole,
  ServerCrash,
  ShieldAlert,
  WifiOff,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import type { AppErrorType } from "@/lib/errors/error-types";
import { cn } from "@/lib/utils";

interface ErrorIconProps {
  type: AppErrorType;
  className?: string;
}

const icons: Record<AppErrorType, LucideIcon> = {
  unknown: AlertTriangle,
  notFound: FileQuestion,
  unauthorized: LockKeyhole,
  forbidden: ShieldAlert,
  validation: Ban,
  network: WifiOff,
  offline: WifiOff,
  timeout: Clock3,
  rateLimit: Clock3,
  server: ServerCrash,
  maintenance: Wrench,
};

export function ErrorIcon({
  type,
  className,
}: ErrorIconProps) {
  const Icon = icons[type];

  return (
    <div
      className={cn(
        "relative flex size-20 items-center justify-center",
        "rounded-[1.75rem] border border-border",
        "bg-card shadow-sm sm:size-24",
        className,
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-2 rounded-[1.35rem] bg-primary/5" />

      <Icon className="relative size-9 text-primary sm:size-11" />
    </div>
  );
}