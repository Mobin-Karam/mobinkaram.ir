"use client";

import { useEffect } from "react";

/**
 * Calls `onOutside` when a click/touch happens outside of the given element.
 * Useful for dropdowns, modals, and popovers.
 */
export function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  onOutside: () => void,
) {
  useEffect(() => {
    function handler(event: MouseEvent | TouchEvent) {
      const target = event.target as HTMLElement | null;
      if (!ref.current || !target) return;
      if (!ref.current.contains(target)) {
        onOutside();
      }
    }
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [ref, onOutside]);
}
