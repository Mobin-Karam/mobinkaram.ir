type Props = {
  title: string;
  eyebrow?: string;
  description?: string;
  align?: "start" | "center";
};

export function SectionHeading({
  title,
  eyebrow,
  description,
  align = "start",
}: Props) {
  return (
    <div
      className={`flex flex-col gap-2 ${align === "center" ? "items-center text-center" : ""}`}
    >
      {eyebrow ? (
        <span className="pill inline-flex w-fit">{eyebrow}</span>
      ) : null}
      <h2 className="text-xl font-semibold tracking-tight text-[color:var(--foreground)]">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-sm text-[color:var(--muted)]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
