 "use client";

import { useEffect, useState } from "react";
import { defaultPrefs, readPrefs, updatePrefs, type UserPrefs } from "@/lib/prefs";

export function useUserPrefs() {
  const [prefs, setPrefs] = useState<UserPrefs>(defaultPrefs);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setPrefs(readPrefs());
    setReady(true);
  }, []);

  const setPartial = (partial: Partial<UserPrefs>) => {
    const next = updatePrefs(partial);
    setPrefs(next);
  };

  return { prefs, setPrefs: setPartial, ready };
}
