import "server-only";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/mdx/mdx-components";

function sanitizeNumericTags(source: string) {
  return source.replace(/<([0-9\u06f0-\u06f9])/g, "&lt;$1");
}

export async function compileEngineerMDX(source: string) {
  return compileMDX<{ [key: string]: any }>({
    source: sanitizeNumericTags(source),
    options: {
      parseFrontmatter: true,
      mdxOptions: { remarkPlugins: [remarkGfm] },
    },
    components: mdxComponents,
  });
}
