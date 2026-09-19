import { getRawContentBase } from "./config";

export function resolveContentMediaUrl(src?: string | null) {
  if (!src) return undefined;
  if (/^https?:\/\//i.test(src)) return src;
  if (src.startsWith("data:")) return src;

  const path = src.replace(/^\/+/, "");
  return `${getRawContentBase()}/${encodeURI(path)}`;
}
