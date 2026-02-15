"use client";

type Platform = "x" | "telegram" | "reddit";

/**
 * Opens a share link for X, Telegram, or Reddit with provided title/url.
 */
export function useShare(currentUrl?: string) {
  const shareUrl =
    currentUrl || (typeof window !== "undefined" ? window.location.href : "");

  const share = (platform: Platform, title: string) => {
    if (!shareUrl) return;
    const text = `${title} — ${shareUrl}`;
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(shareUrl);
    let url = "";
    if (platform === "x") {
      url = `https://twitter.com/intent/tweet?text=${encodedText}`;
    } else if (platform === "telegram") {
      url = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
    } else {
      url = `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedText}`;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return { share };
}
