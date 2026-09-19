export const BLOG_CONTENT = {
  owner: process.env.BLOG_CONTENT_OWNER || "Mobin-Karam",
  repo: process.env.BLOG_CONTENT_REPO || "mobinkaram-content",
  branch: process.env.BLOG_CONTENT_BRANCH || "main",
  revalidateSeconds: Number(process.env.BLOG_CONTENT_REVALIDATE || 300),
  defaultAuthorPath: "authors/mobin.json",
  categoriesPath: "categories/categories.json",
} as const;

export const BLOG_CONTENT_TAG = "github-blog-content";

export function getRepoFullName() {
  return `${BLOG_CONTENT.owner}/${BLOG_CONTENT.repo}`;
}

export function getRawContentBase() {
  return `https://raw.githubusercontent.com/${BLOG_CONTENT.owner}/${BLOG_CONTENT.repo}/${BLOG_CONTENT.branch}`;
}
