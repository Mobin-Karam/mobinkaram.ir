import type { ComponentPropsWithoutRef } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { resolveContentMediaUrl } from "@/lib/blog/media";

const components = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      {...props}
      className="mb-5 mt-12 scroll-mt-28 border-t border-border pt-8 font-serif text-3xl font-black tracking-[-0.03em] sm:mt-16 sm:text-4xl"
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3
      {...props}
      className="mb-4 mt-9 scroll-mt-28 font-serif text-2xl font-black tracking-tight sm:mt-11 sm:text-3xl"
    />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p {...props} className="mb-6 text-[15px] leading-8 text-foreground/85 sm:text-base lg:text-[17px] lg:leading-9" />
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
    <ul {...props} className="mb-7 list-disc space-y-2 ps-6 text-[15px] leading-7 text-foreground/85 sm:text-base" />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol {...props} className="mb-7 list-decimal space-y-2 ps-6 text-[15px] leading-7 text-foreground/85 sm:text-base" />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote {...props} className="my-9 border-s-4 border-primary ps-5 font-serif text-xl font-bold leading-8 sm:my-12 sm:ps-7 sm:text-2xl" />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre {...props} dir="ltr" className="my-8 overflow-x-auto rounded-xl border border-border bg-muted/40 p-4 text-left text-xs leading-6 sm:p-5 sm:text-sm" />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code {...props} className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.92em]" />
  ),
  img: ({ src, alt, ...props }: ComponentPropsWithoutRef<"img">) => (
    // Content is intentionally hosted in the trusted GitHub content repository.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      src={resolveContentMediaUrl(typeof src === "string" ? src : undefined)}
      alt={alt || ""}
      loading="lazy"
      className="my-8 h-auto w-full rounded-2xl border border-border bg-muted object-cover"
    />
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

export default async function MdxContent({ source }: { source: string }) {
  const { content } = await compileMDX({
    source,
    components,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
      },
    },
  });

  return <div>{content}</div>;
}
