"use client";

import { useEffect, useState } from "react";

const NATIVE_QUERY = "(max-width: 1023px)";

export function useMobileStory() {
  const [nativeScroll, setNativeScroll] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(NATIVE_QUERY);

    const update = () => {
      setNativeScroll(media.matches);
    };

    update();
    media.addEventListener("change", update);

    return () => {
      media.removeEventListener("change", update);
    };
  }, []);

  return nativeScroll;
}
