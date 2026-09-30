import type { ComponentPropsWithoutRef } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { resolveContentMediaUrl } from "@/lib/blog/media";
import ArticleImage from "./ArticleImage";
import { CodeCopyButton } from "@/components/mdx/code-copy";

const components = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      {...props}
      className="mb-5 mt-12 scroll-mt-28 border-t border-border pt-8 text-3xl font-bold tracking-[-0.03em] sm:mt-16 sm:text-4xl"
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3
      {...props}
      className="mb-4 mt-9 scroll-mt-28 text-2xl font-bold tracking-tight sm:mt-11 sm:text-3xl"
    />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p {...props} className="mb-6 text-[16px] leading-8 text-foreground/90 sm:text-[17px] sm:leading-9" />
  ),
  a: ({ href, ...props }: ComponentPropsWithoutRef<"a">) => {
    const external = Boolean(href && /^https?:\/\//i.test(href));
    return (
      <a
        {...props}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="font-medium text-primary underline decoration-primary/40 underline-offset-4"
      />
    );
  },
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul {...props} className="mb-7 list-disc space-y-2 ps-6 text-[16px] leading-8 text-foreground/90 sm:text-[17px] sm:leading-9" />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol {...props} className="mb-7 list-decimal space-y-2 ps-6 text-[16px] leading-8 text-foreground/90 sm:text-[17px] sm:leading-9" />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote {...props} className="my-9 border-s-4 border-primary ps-5 text-xl font-bold leading-8 sm:my-12 sm:ps-7 sm:text-2xl" />
  ),
  pre: ({ children, ...props }: ComponentPropsWithoutRef<"pre">) => (
    <pre {...props} dir="ltr" className="group relative my-8 overflow-x-auto rounded-xl border border-border bg-[#0b1020] p-4 pe-16 text-left text-xs leading-6 text-slate-100 sm:p-5 sm:pe-20 sm:text-sm">
      <CodeCopyButton />
      {children}
    </pre>
  ),
  code: ({ className, ...props }: ComponentPropsWithoutRef<"code">) => (
    <code
      {...props}
      className={[
        "font-mono text-[0.92em]",
        className?.includes("language-") || className?.includes("hljs")
          ? ""
          : "rounded bg-muted px-1.5 py-0.5",
        className ?? "",
      ].join(" ")}
    />
  ),
  img: ({ src, alt }: ComponentPropsWithoutRef<"img">) => (
    <ArticleImage src={resolveContentMediaUrl(typeof src === "string" ? src : undefined)} alt={alt || ""} />
  ),
  hr: (props: ComponentPropsWithoutRef<"hr">) => <hr {...props} className="my-10 border-border" />,
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="my-8 overflow-x-auto rounded-xl border border-border">
      <table {...props} className="w-full min-w-[640px] border-collapse text-sm" />
    </div>
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => <th {...props} className="border-b border-border bg-muted/60 px-4 py-3 text-start font-semibold" />,
  td: (props: ComponentPropsWithoutRef<"td">) => <td {...props} className="border-b border-border px-4 py-3 align-top" />,
};

function sanitizeNumericTags(source: string) {
  return source.replace(/<(?=\s*\/?\s*[0-9\u06f0-\u06f9])/g, "&lt;");
}

export default async function MdxContent({ source }: { source: string }) {
  const { content } = await compileMDX({
    source: sanitizeNumericTags(source),
    components,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }], rehypeHighlight],
      },
    },
  });

  return <div className="article-reading-content">{content}</div>;
}
