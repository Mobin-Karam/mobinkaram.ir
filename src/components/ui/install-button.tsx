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
      className="pill nav-btn hover:-translate-y-0.5 hover:shadow-md transition ltr-text"
    >
      <Download size={14} />
      Install app
    </button>
  );
}
