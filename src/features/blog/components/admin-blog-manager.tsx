"use client";

import { useMemo, useState } from "react";
import type { BlogPostMeta } from "@/types/blog";

type Draft = {
  title: string; slug: string; locale: "en" | "fa"; description: string;
  category: string; tags: string; cover: string; content: string; published: boolean;
};

const emptyDraft: Draft = { title: "", slug: "", locale: "fa", description: "", category: "web-development", tags: "", cover: "", content: "", published: false };

export function AdminBlogManager({ posts }: { posts: BlogPostMeta[] }) {
  const [query, setQuery] = useState("");
  const [visibility, setVisibility] = useState<"all" | "published" | "draft">("all");
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [status, setStatus] = useState<string>();
  const [saving, setSaving] = useState(false);
  const shown = useMemo(() => posts.filter((post) => {
    const matchesQuery = `${post.title} ${post.category} ${(post.tags || []).join(" ")}`.toLowerCase().includes(query.toLowerCase());
    const matchesVisibility = visibility === "all" || (visibility === "published" ? post.published !== false : post.published === false);
    return matchesQuery && matchesVisibility;
  }), [posts, query, visibility]);
  const coverPreview = draft.cover.startsWith("http") ? draft.cover : `https://raw.githubusercontent.com/Mobin-Karam/mobinkaram-content/main/${draft.cover.replace(/^\/+/, "")}`;
  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => setDraft((current) => ({ ...current, [key]: value }));

  async function save(published: boolean) {
    setSaving(true); setStatus(undefined);
    const response = await fetch("/api/admin/blog", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...draft, published, tags: draft.tags.split(",").map((tag) => tag.trim()).filter(Boolean) }) });
    const result = await response.json() as { error?: string; created?: boolean };
    setSaving(false);
    if (!response.ok) return setStatus(result.error || "Unable to save the post.");
    setStatus(result.created ? "Post created in GitHub. Reload to see it in the list." : "Post updated in GitHub. Reload to see it in the list.");
  }

  async function edit(post: BlogPostMeta) {
    setStatus("Loading Markdown content…");
    const response = await fetch(`/api/admin/blog?locale=${post.locale}&path=${encodeURIComponent(post.path)}`);
    const loaded = await response.json() as { body?: string; error?: string };
    if (!response.ok || typeof loaded.body !== "string") return setStatus(loaded.error || "Unable to load this post.");
    setDraft({ title: post.title, slug: post.fileStem, locale: post.locale, description: post.description, category: post.category, tags: (post.tags || []).join(", "), cover: post.cover || "", content: loaded.body, published: post.published !== false });
    setStatus(undefined);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function remove(post: BlogPostMeta) {
    if (!window.confirm(`Delete “${post.title}” from GitHub? This cannot be undone from the CMS.`)) return;
    setStatus("Deleting post…");
    const response = await fetch("/api/admin/blog", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ locale: post.locale, category: post.category, slug: post.fileStem }) });
    if (!response.ok) {
      const result = await response.json() as { error?: string };
      return setStatus(result.error || "Unable to delete this post.");
    }
    setStatus("Post deleted from GitHub. Reload to refresh the list.");
  }

  return <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
    <h1 className="font-serif text-4xl font-black">Blog CMS</h1><p className="mt-2 text-muted-foreground">Posts are committed directly to the GitHub content repository.</p>
    <section className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.8fr)]">
      <form className="space-y-4 rounded-2xl border border-border bg-card p-5" onSubmit={(event) => { event.preventDefault(); void save(draft.published); }}>
        <h2 className="font-serif text-2xl font-black">Create or edit post</h2>
        <input required value={draft.title} onChange={(e) => set("title", e.target.value)} placeholder="Title" className="w-full rounded-xl border border-border bg-background px-3 py-2" />
        <input required value={draft.slug} onChange={(e) => set("slug", e.target.value)} placeholder="Slug" className="w-full rounded-xl border border-border bg-background px-3 py-2" dir="ltr" />
        <div className="grid grid-cols-2 gap-3"><select value={draft.locale} onChange={(e) => set("locale", e.target.value as Draft["locale"])} className="rounded-xl border border-border bg-background px-3 py-2"><option value="fa">Persian</option><option value="en">English</option></select><input required value={draft.category} onChange={(e) => set("category", e.target.value)} placeholder="Category" className="rounded-xl border border-border bg-background px-3 py-2" /></div>
        <textarea required value={draft.description} onChange={(e) => set("description", e.target.value)} placeholder="SEO description" rows={3} className="w-full rounded-xl border border-border bg-background px-3 py-2" />
        <input value={draft.tags} onChange={(e) => set("tags", e.target.value)} placeholder="Tags, comma separated" className="w-full rounded-xl border border-border bg-background px-3 py-2" />
        <input value={draft.cover} onChange={(e) => set("cover", e.target.value)} placeholder="Cover image path" className="w-full rounded-xl border border-border bg-background px-3 py-2" dir="ltr" />
        {draft.cover ? <>
          {/* The configured GitHub content host is runtime-configurable, so this stays an unoptimized preview. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={coverPreview} alt="Cover preview" className="max-h-48 w-full rounded-xl border border-border object-cover" />
        </> : null}
        <div className="grid gap-3 md:grid-cols-2"><textarea required value={draft.content} onChange={(e) => set("content", e.target.value)} placeholder="Markdown content" rows={14} className="w-full rounded-xl border border-border bg-background px-3 py-2 font-mono text-sm" /><div className="rounded-xl border border-border bg-background p-4"><p className="text-xs font-bold uppercase text-muted-foreground">Preview</p><h3 className="mt-3 text-xl font-bold">{draft.title || "Post title"}</h3><p className="mt-3 whitespace-pre-wrap text-sm text-muted-foreground">{draft.content || "Markdown preview appears here."}</p></div></div>
        <div className="flex flex-wrap gap-3"><button disabled={saving} type="button" onClick={() => void save(false)} className="rounded-xl border border-border px-4 py-2 font-semibold">Save draft</button><button disabled={saving} className="rounded-xl bg-primary px-4 py-2 font-semibold text-primary-foreground">{saving ? "Saving…" : "Publish"}</button></div>
        {status ? <p role="status" className="text-sm text-muted-foreground">{status}</p> : null}
      </form>
      <section className="rounded-2xl border border-border bg-card p-5"><div className="flex flex-wrap items-center justify-between gap-3"><h2 className="font-serif text-2xl font-black">Posts ({posts.length})</h2><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search" className="w-36 rounded-xl border border-border bg-background px-3 py-2 text-sm" /><select value={visibility} onChange={(e) => setVisibility(e.target.value as typeof visibility)} className="rounded-xl border border-border bg-background px-3 py-2 text-sm"><option value="all">All</option><option value="published">Published</option><option value="draft">Drafts</option></select></div><div className="mt-5 space-y-3">{shown.length ? shown.map((post) => <article key={post.path} className="rounded-xl border border-border p-3"><p className="font-semibold">{post.title}</p><p className="mt-1 text-xs text-muted-foreground">{post.locale} · {post.category} · {post.published === false ? "Draft" : "Published"}</p><div className="mt-3 flex gap-4"><button type="button" onClick={() => void edit(post)} className="text-sm font-semibold text-primary">Edit</button><button type="button" onClick={() => void remove(post)} className="text-sm font-semibold text-destructive">Delete</button></div></article>) : <p className="rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground">No posts match this filter.</p>}</div></section>
    </section>
  </main>;
}
