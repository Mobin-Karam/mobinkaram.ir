"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

interface BackToTopProps {
  showAfter?: number;
}

export function BackToTop({ showAfter = 500 }: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      setIsVisible(window.scrollY > showAfter);
    };

    updateVisibility();

    window.addEventListener("scroll", updateVisibility, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", updateVisibility);
    };
  }, [showAfter]);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.button
          type="button"
          aria-label="Back to top"
          title="Back to top"
          onClick={scrollToTop}
          data-cursor="pointer"
          initial={{
            opacity: 0,
            scale: 0.7,
            y: 16,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.7,
            y: 16,
          }}
          whileHover={{
            y: -4,
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.92,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
          }}
          className={[
            "fixed bottom-5 end-5 z-50",
            "flex size-12 items-center justify-center",
            "rounded-full border border-border/70",
            "bg-background/85 text-foreground",
            "shadow-[0_12px_35px_-12px_rgba(0,0,0,0.45)]",
            "backdrop-blur-xl",
            "transition-colors duration-200",
            "hover:border-primary/40 hover:bg-primary",
            "hover:text-primary-foreground",
            "focus-visible:outline-none",
            "focus-visible:ring-2 focus-visible:ring-primary",
            "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            "sm:bottom-7 sm:end-7 sm:size-13",
          ].join(" ")}
        >
          <ArrowUp className="size-5" strokeWidth={2} />

          <span
            aria-hidden="true"
            className={[
              "absolute inset-1 rounded-full",
              "border border-current/10",
            ].join(" ")}
          />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
