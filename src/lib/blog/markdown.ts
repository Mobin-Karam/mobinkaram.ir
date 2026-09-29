import matter from "gray-matter";

/** Parses untrusted remote post text without rendering it. Rendering remains server-side in MdxContent. */
export function parsePostMarkdown(source: string) {
  const parsed = matter(source);
  return { frontmatter: parsed.data, body: parsed.content.trim() };
}
