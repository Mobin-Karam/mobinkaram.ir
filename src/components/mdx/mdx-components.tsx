import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1
      className="mt-6 mb-3 text-3xl font-bold leading-tight tracking-tight text-[color:var(--foreground)]"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="mt-5 mb-2 text-2xl font-semibold leading-snug text-[color:var(--foreground)]"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-4 mb-2 text-xl font-semibold leading-snug text-[color:var(--foreground)]"
      {...props}
    />
  ),
  h4: (props) => (
    <h4
      className="mt-4 mb-2 text-lg font-semibold leading-snug text-[color:var(--foreground)]"
      {...props}
    />
  ),
  p: (props) => (
    <p className="mb-4 text-[15px] leading-8 text-[color:var(--muted)]" {...props} />
  ),
  ul: (props) => (
    <ul
      className="mb-4 list-disc space-y-2 pl-6 text-[15px] leading-7 text-[color:var(--muted)]"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="mb-4 list-decimal space-y-2 pl-6 text-[15px] leading-7 text-[color:var(--muted)]"
      {...props}
    />
  ),
  li: (props) => <li {...props} />,
  strong: (props) => (
    <strong className="font-semibold text-[color:var(--foreground)]" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="mb-4 border-l-4 border-[color:var(--accent)] bg-[color:var(--background)] px-4 py-2 text-sm text-[color:var(--muted)]"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded bg-[color:var(--surface-strong)] px-1.5 py-0.5 text-[13px] text-[color:var(--foreground)]"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="mb-6 mt-4 overflow-x-auto rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-strong)] p-5 text-[13px] leading-7 text-[color:var(--foreground)] shadow-inner"
      {...props}
    />
  ),
  hr: (props) => (
    <hr className="my-8 border-t border-[color:var(--border)]" {...props} />
  ),
  img: (props) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      className="my-6 w-full max-w-3xl self-center rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] shadow-md"
      loading="lazy"
    />
  ),
  table: (props) => (
    <div className="mb-6 overflow-x-auto rounded-xl border border-[color:var(--border)]">
      <table className="min-w-[520px] w-full border-collapse text-sm text-[color:var(--foreground)]" {...props} />
    </div>
  ),
  thead: (props) => <thead className="bg-[color:var(--surface-strong)]" {...props} />,
  th: (props) => (
    <th className="border-b border-[color:var(--border)] px-4 py-3 text-left font-semibold" {...props} />
  ),
  td: (props) => (
    <td className="border-b border-[color:var(--border)] px-4 py-3 text-[color:var(--muted)]" {...props} />
  ),
  a: (props) => (
    <a
      {...props}
      target="_blank"
      rel="noreferrer"
      className="text-[color:var(--accent-strong)] underline underline-offset-4 hover:text-[color:var(--accent)]"
    />
  ),
};
