"use client";

import { useEffect, useState } from "react";

type Device = { browser: string; os: string };

function parseUA(ua: string): Device {
  const lowered = ua.toLowerCase();
  let browser = "Unknown";
  if (lowered.includes("edg/")) browser = "Edge";
  else if (lowered.includes("chrome/")) browser = "Chrome";
  else if (lowered.includes("safari/") && !lowered.includes("chrome")) browser = "Safari";
  else if (lowered.includes("firefox/")) browser = "Firefox";
  else if (lowered.includes("opr/") || lowered.includes("opera")) browser = "Opera";

  let os = "Unknown OS";
  if (lowered.includes("windows nt")) os = "Windows";
  else if (lowered.includes("mac os x")) os = "macOS";
  else if (lowered.includes("android")) os = "Android";
  else if (lowered.includes("iphone") || lowered.includes("ipad")) os = "iOS";
  else if (lowered.includes("linux")) os = "Linux";

  return { browser, os };
}

export function useClientDevice() {
  const [device, setDevice] = useState<Device>({ browser: "—", os: "—" });

  useEffect(() => {
    if (typeof navigator === "undefined") return;
    setDevice(parseUA(navigator.userAgent));
  }, []);

  return device;
}
