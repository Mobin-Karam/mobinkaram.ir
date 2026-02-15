"use client";

export function CodeCopyButton() {
  const onClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const pre = e.currentTarget.closest("pre");
    if (!pre) return;
    const code = pre.querySelector("code");
    const text = code?.textContent ?? "";
    if (!text) return;
    await navigator.clipboard.writeText(text);
    e.currentTarget.textContent = "Copied";
    window.setTimeout(() => {
      e.currentTarget.textContent = "Copy";
    }, 1200);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute right-3 top-3 rounded-full border border-[color:var(--border)] bg-[color:var(--background)] px-2 py-1 text-[11px] font-semibold text-[color:var(--muted)] opacity-0 shadow-sm transition hover:-translate-y-0.5 hover:text-[color:var(--foreground)] group-hover:opacity-100"
    >
      Copy
    </button>
  );
}
