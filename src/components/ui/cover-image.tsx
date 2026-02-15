 "use client";

// Reusable cover renderer for case studies, lab notes, and build logs.
// Shows the provided cover image when available; otherwise renders a branded gradient card.
type Props = {
  title: string;
  cover?: string;
};

export function CoverImage({ title, cover }: Props) {
  if (cover) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={cover}
        alt={title}
        className="w-full max-h-96 rounded-3xl border border-[color:var(--border)] object-cover shadow-[var(--glow)]"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
    );
  }

  return null;
}
