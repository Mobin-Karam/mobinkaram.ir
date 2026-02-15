import "server-only";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/mdx/mdx-components";
import type { Post, PostFrontmatter } from "@/types/post";
import { assetUrl } from "./github-content";

export async function compilePost(locale: "en" | "fa", source: string) {
  const { content, frontmatter } = await compileMDX<PostFrontmatter>({
    source,
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
