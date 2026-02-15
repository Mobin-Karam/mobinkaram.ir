import "server-only";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/mdx/mdx-components";
import type { Post, PostFrontmatter } from "@/types/post";
import { assetUrl } from "./github-content";

// Some MDX content uses expressions like "<400 lines" which MDX parses as
// invalid JSX (tag names cannot start with a digit). To keep authoring simple,
// we sanitise any "<digit" (including Persian digits) into a literal "&lt;digit".
function sanitizeNumericTags(source: string) {
  return source.replace(/<([0-9\u06f0-\u06f9])/g, "&lt;$1");
}

export async function compilePost(locale: "en" | "fa", source: string) {
  const safeSource = sanitizeNumericTags(source);
  const { content, frontmatter } = await compileMDX<PostFrontmatter>({
    source: safeSource,
    options: {
      parseFrontmatter: true,
      mdxOptions: { remarkPlugins: [remarkGfm] },
    },
    components: mdxComponents,
  });

  const fm = frontmatter as PostFrontmatter;
  const readingTime = fm.readingTime ?? Math.max(3, Math.round((source.length / 1000) * 2));

  const post: Post = {
    ...fm,
    locale,
    content: "", // not used because we return JSX content separately
    cover: fm.cover ? assetUrl(fm.cover) : undefined,
    readingTime,
  };

  return { content, frontmatter: post };
}
