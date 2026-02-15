import "server-only";

const owner = process.env.CONTENT_ENGINEER_OWNER ?? "Mobin-Karam";
const repo = process.env.CONTENT_ENGINEER_REPO ?? "mobinkaram-engineer-content";
const branch = process.env.CONTENT_ENGINEER_BRANCH ?? "main";
const token = process.env.GITHUB_CONTENT_TOKEN ?? process.env.GITHUB_TOKEN;

const apiBase = `https://api.github.com/repos/${owner}/${repo}/contents`;

async function fetchDir(path: string) {
  try {
    const res = await fetch(`${apiBase}/${path}?ref=${branch}`, {
      headers: {
        Accept: "application/vnd.github+json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: "force-cache",
      next: { revalidate: 1800 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

async function fetchFile(path: string) {
  try {
    const res = await fetch(`${apiBase}/${path}?ref=${branch}`, {
      headers: {
        Accept: "application/vnd.github+json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: "force-cache",
      next: { revalidate: 1800 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data?.content) return null;
    return Buffer.from(data.content, "base64").toString("utf8");
  } catch {
    return null;
  }
}

export async function listEngineerFiles(category: "projects" | "lab" | "logs", locale: "en" | "fa") {
  const path =
    category === "projects"
      ? `case-studies/${locale}`
      : category === "lab"
        ? `lab/${locale}`
        : `build-log/${locale}`;
  const entries = await fetchDir(path);
  return entries.filter((e: any) => e.type === "file" && e.name.endsWith(".mdx"));
}

export async function getEngineerFile(category: "projects" | "lab" | "logs", locale: "en" | "fa", slug: string) {
  const path =
    category === "projects"
      ? `case-studies/${locale}/${slug}.mdx`
      : category === "lab"
        ? `lab/${locale}/${slug}.mdx`
        : `build-log/${locale}/${slug}.mdx`;
  return fetchFile(path);
}
