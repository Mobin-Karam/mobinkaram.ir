"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const search = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  async function submit(event: React.FormEvent) {
    event.preventDefault(); setLoading(true); setError(undefined);
    const response = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username, password }) });
    const result = await response.json() as { error?: string };
    setLoading(false);
    if (!response.ok) return setError(result.error || "Unable to sign in.");
    router.replace(search.get("callbackUrl") || "/fa/admin/blog"); router.refresh();
  }
  return <main className="mx-auto flex min-h-[70vh] w-full max-w-md items-center px-4"><form onSubmit={submit} className="w-full space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm"><h1 className="font-serif text-3xl font-black">Admin sign in</h1><input required autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="GitHub username" className="w-full rounded-xl border border-border bg-background px-3 py-2" /><input required autoComplete="current-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full rounded-xl border border-border bg-background px-3 py-2" />{error ? <p role="alert" className="text-sm text-destructive">{error}</p> : null}<button disabled={loading} className="w-full rounded-xl bg-primary px-4 py-2 font-semibold text-primary-foreground">{loading ? "Signing in…" : "Sign in"}</button></form></main>;
}
