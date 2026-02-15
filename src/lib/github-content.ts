import "server-only";

const owner = process.env.CONTENT_REPO_OWNER ?? "Mobin-Karam";
const repo = process.env.CONTENT_REPO_NAME ?? "mobinkaram-content";
const branch = process.env.CONTENT_REPO_BRANCH ?? "main";
const token = process.env.GITHUB_CONTENT_TOKEN ?? process.env.GITHUB_TOKEN ?? process.env.GITHUB_PAT;

const apiBase = `https://api.github.com/repos/${owner}/${repo}/contents`;

async function githubFetch(path: string): Promise<any | null> {
  const res = await fetch(`${apiBase}/${path}?ref=${branch}`, {
    headers: {
      Accept: "application/vnd.github+json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    cache: "force-cache",
    next: { revalidate: 1800 },
  });
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`GitHub fetch failed for ${path}: ${res.status}`);
  }
  return res.json();
}

function decodeContent(encoded: string) {
  return Buffer.from(encoded, "base64").toString("utf8");
}

export async function listPostFiles(locale: string) {
  const data = await githubFetch(`posts/${locale}`);
  if (!data || !Array.isArray(data)) return [];
  return data.filter((item: any) => item.type === "file" && item.name.endsWith(".mdx"));
}

export async function getPostFile(locale: string, slug: string) {
  const data = await githubFetch(`posts/${locale}/${slug}.mdx`);
  if (!data?.content) return null;
  return decodeContent(data.content as string);
}

export async function getAuthorFile(id = "mobin") {
  const data = await githubFetch(`authors/${id}.json`);
  if (!data?.content) return null;
  return JSON.parse(decodeContent(data.content as string));
}

export function assetUrl(relativePath: string) {
  if (!relativePath) return undefined;
  if (relativePath.startsWith("http")) return relativePath;
  const clean = relativePath.replace(/^\//, "");
  return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${clean}`;
}
