import "server-only";

type Category = {
  slug: string;
  title: { en: string; fa: string };
  description: { en: string; fa: string };
  icon?: string;
  iconPath?: string;
};

const owner = process.env.CONTENT_REPO_OWNER ?? "Mobin-Karam";
const repo = process.env.CONTENT_REPO_NAME ?? "mobinkaram-content";
const branch = process.env.CONTENT_REPO_BRANCH ?? "main";
const token = process.env.GITHUB_CONTENT_TOKEN ?? process.env.GITHUB_TOKEN ?? process.env.GITHUB_PAT;
const apiBase = `https://api.github.com/repos/${owner}/${repo}/contents`;

async function fetchCategoriesFile() {
  const res = await fetch(`${apiBase}/categories/categories.json?ref=${branch}`, {
    headers: {
      Accept: "application/vnd.github+json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    cache: "force-cache",
    next: { revalidate: 1800 },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub fetch failed ${res.status} for categories`);
  const data = await res.json();
  const decoded = Buffer.from(data.content, "base64").toString("utf8");
  return JSON.parse(decoded) as Category[];
}

export async function getCategories(): Promise<Category[]> {
  const cats = await fetchCategoriesFile();
  return cats ?? [];
}

export type { Category };
