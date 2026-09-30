export type TableOfContentsItem = { id: string; title: string; level: 2 | 3 };

export function extractTableOfContents(source: string): TableOfContentsItem[] {
  return source.split("\n").flatMap((line) => {
    const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) return [];
    const title = match[2].replace(/[`*_]/g, "").trim();
    const id = title.normalize("NFKC").toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, "").trim().replace(/\s+/g, "-");
    return id ? [{ id, title, level: match[1].length as 2 | 3 }] : [];
  });
}
