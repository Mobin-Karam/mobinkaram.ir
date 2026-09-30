"use client";

import type { ReactNode } from "react";
import { m, useTransform } from "framer-motion";

import { useSceneProgress } from "./scroll-scene";

type RevealDirection =
  | "up"
  | "down"
  | "left"
  | "right"
  | "scale"
  | "fade";

type ScrollRevealProps = {
  children: ReactNode;
  start: number;
  end: number;
  className?: string;
  direction?: RevealDirection;
  distance?: number;
  exit?: boolean;
  exitStart?: number;
  exitEnd?: number;
};

export function ScrollReveal({
  children,
  start,
  end,
  className = "",
  direction = "up",
  distance = 56,
  exit = false,
  exitStart = 0.88,
  exitEnd = 0.98,
}: ScrollRevealProps) {
  const { progress, reducedMotion } = useSceneProgress();

  const safeExitStart = Math.max(exitStart, end + 0.01);
  const safeExitEnd = Math.max(exitEnd, safeExitStart + 0.01);

  const input = exit
    ? [start, end, safeExitStart, safeExitEnd]
    : [start, end];

  const opacity = useTransform(
    progress,
    input,
    exit ? [0, 1, 1, 0] : [0, 1],
  );

  const y = useTransform(
    progress,
    input,
    direction === "up"
      ? exit
        ? [distance, 0, 0, -distance * 0.35]
        : [distance, 0]
      : direction === "down"
        ? exit
          ? [-distance, 0, 0, distance * 0.35]
          : [-distance, 0]
        : input.map(() => 0),
  );

  const x = useTransform(
    progress,
    input,
    direction === "left"
      ? exit
        ? [distance, 0, 0, -distance * 0.3]
        : [distance, 0]
      : direction === "right"
        ? exit
          ? [-distance, 0, 0, distance * 0.3]
          : [-distance, 0]
        : input.map(() => 0),
  );

  const scale = useTransform(
    progress,
    input,
    direction === "scale"
      ? exit
        ? [0.94, 1, 1, 0.98]
        : [0.94, 1]
      : input.map(() => 1),
  );

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      className={className}
      style={{
        opacity,
        x,
        y,
        scale,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </m.div>
  );
}
