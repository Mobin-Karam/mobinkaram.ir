"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="pill nav-btn hover:-translate-y-0.5 hover:shadow-md transition"
      aria-label="Go back"
    >
      <ArrowLeft size={14} />
      Back
    </button>
  );
}
