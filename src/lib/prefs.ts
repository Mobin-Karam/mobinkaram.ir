export type UserPrefs = {
  theme: "system" | "light" | "dark";
  locale: "en" | "fa";
  noticeDismissed: boolean;
  bannerAutoplay: boolean;
  cookieConsent: "unset" | "accepted" | "declined";
};

const COOKIE_NAME = "mk_prefs";
const MAX_AGE = 60 * 60 * 24 * 180; // 180 days

export const defaultPrefs: UserPrefs = {
  theme: "system",
  locale: "en",
  noticeDismissed: false,
  bannerAutoplay: true,
  cookieConsent: "unset",
};

function parseCookie(): Partial<UserPrefs> {
  if (typeof document === "undefined") return {};
  const raw = document.cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${COOKIE_NAME}=`));
  if (!raw) return {};
  try {
    return JSON.parse(decodeURIComponent(raw.split("=")[1]));
  } catch {
    return {};
  }
}

export function readPrefs(): UserPrefs {
  return { ...defaultPrefs, ...parseCookie() };
}

export function writePrefs(prefs: UserPrefs) {
  if (typeof document === "undefined") return;
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(prefs))}; Path=/; Max-Age=${MAX_AGE}; SameSite=Lax`;
}

export function updatePrefs(partial: Partial<UserPrefs>) {
  const next = { ...readPrefs(), ...partial };
  writePrefs(next);
  return next;
}
