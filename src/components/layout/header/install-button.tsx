"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
};

export function InstallButton() {
  const [canInstall, setCanInstall] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setCanInstall(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler as EventListener);
    return () => window.removeEventListener("beforeinstallprompt", handler as EventListener);
  }, []);

  if (!canInstall) return null;

  return (
    <button
      onClick={async () => {
        await canInstall.prompt();
        setCanInstall(null);
      }}
      className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-border rounded-lg transition hover:bg-muted"
    >
      <Download className="h-3.5 w-3.5" />
      Install
    </button>
  );
}
