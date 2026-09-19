"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  type SpringOptions,
} from "framer-motion";

const followerSpring: SpringOptions = {
  stiffness: 230,
  damping: 25,
  mass: 0.55,
};

const INTERACTIVE_SELECTOR = [
  "a",
  "button",
  "summary",
  "[role='button']",
  "[role='link']",
  "[data-cursor='pointer']",
  "[data-cursor='grab']",
].join(",");

type CursorVariant = "default" | "interactive" | "hidden";

export default function SmoothCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>("default");

  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);

  const followerX = useSpring(pointerX, followerSpring);
  const followerY = useSpring(pointerY, followerSpring);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateState = () => {
      setEnabled(finePointer.matches && !reducedMotion.matches);
    };

    updateState();

    finePointer.addEventListener("change", updateState);
    reducedMotion.addEventListener("change", updateState);

    return () => {
      finePointer.removeEventListener("change", updateState);
      reducedMotion.removeEventListener("change", updateState);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const updateVariant = (target: EventTarget | null) => {
      if (!(target instanceof Element)) {
        setVariant("default");
        return;
      }

      const customCursorElement = target.closest<HTMLElement>("[data-cursor]");

      if (customCursorElement?.dataset.cursor === "hidden") {
        setVariant("hidden");
        return;
      }

      const interactiveElement = target.closest(INTERACTIVE_SELECTOR);

      if (interactiveElement) {
        setVariant("interactive");
        return;
      }

      setVariant("default");
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;

      pointerX.set(event.clientX);
      pointerY.set(event.clientY);

      setVisible(true);
      updateVariant(event.target);
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;

      setPressed(true);
    };

    const handlePointerUp = () => {
      setPressed(false);
    };

    const handlePointerLeave = () => {
      setVisible(false);
      setPressed(false);
    };

    const handlePointerEnter = () => {
      setVisible(true);
    };

    const handleBlur = () => {
      setVisible(false);
      setPressed(false);
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    window.addEventListener("pointerdown", handlePointerDown, {
      passive: true,
    });

    window.addEventListener("pointerup", handlePointerUp, {
      passive: true,
    });

    document.documentElement.addEventListener(
      "pointerleave",
      handlePointerLeave,
    );

    document.documentElement.addEventListener(
      "pointerenter",
      handlePointerEnter,
    );

    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);

      window.removeEventListener("pointerdown", handlePointerDown);

      window.removeEventListener("pointerup", handlePointerUp);

      document.documentElement.removeEventListener(
        "pointerleave",
        handlePointerLeave,
      );

      document.documentElement.removeEventListener(
        "pointerenter",
        handlePointerEnter,
      );

      window.removeEventListener("blur", handleBlur);
    };
  }, [enabled, pointerX, pointerY]);

  if (!enabled) return null;

  const isHidden = variant === "hidden";
  const isInteractive = variant === "interactive";

  return (
    <div
      aria-hidden="true"
      className={["pointer-events-none fixed inset-0", "z-[9999]"].join(" ")}
    >
      <motion.div
        className="fixed left-0 top-0 will-change-transform"
        style={{
          x: followerX,
          y: followerY,
        }}
        animate={{
          opacity: visible && !isHidden ? 1 : 0,
          scale: pressed ? 0.82 : isInteractive ? 1.12 : 1,
          rotate: isInteractive ? -6 : 0,
        }}
        transition={{
          opacity: {
            duration: 0.12,
          },
          scale: {
            type: "spring",
            stiffness: 420,
            damping: 24,
          },
          rotate: {
            type: "spring",
            stiffness: 320,
            damping: 25,
          },
        }}
      >
        <motion.div
          animate={{
            x: isInteractive ? 12 : 18,
            y: isInteractive ? 11 : 16,
          }}
          transition={{
            type: "spring",
            stiffness: 360,
            damping: 26,
          }}
        >
          <FollowerArrow />
        </motion.div>
      </motion.div>
    </div>
  );
}

export { SmoothCursor };

function FollowerArrow() {
  return (
    <svg
      width="21"
      height="27"
      viewBox="0 0 21 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={[
        "overflow-visible",
        "drop-shadow-[0_2px_3px_rgba(0,0,0,0.25)]",
      ].join(" ")}
    >
      <path
        d="M2.5 2.5L18.1 16.9C18.85 17.6 18.45 18.85 17.43 18.95L11.2 19.63L8.3 25.05C7.85 25.9 6.58 25.75 6.33 24.82L2.5 2.5Z"
        fill="var(--background)"
        stroke="var(--foreground)"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />

      <path
        d="M3.75 4.05L16.75 16.15C17.15 16.52 16.95 17.18 16.4 17.24L10.08 17.93L7.43 22.93L3.75 4.05Z"
        fill="var(--foreground)"
        stroke="var(--background)"
        strokeWidth="0.9"
        strokeLinejoin="round"
      />
    </svg>
  );
}
