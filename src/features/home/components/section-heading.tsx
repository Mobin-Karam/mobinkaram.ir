import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "start" | "center";
  className?: string;
};

function renderHighlightedText(text: string): ReactNode {
  const parts = text.split(
    /(\$.*?\$|<highlight>.*?<\/highlight>)/g,
  );

  return parts.map((part, index) => {
    const dollar =
      part.startsWith("$") && part.endsWith("$");
    const tag =
      part.startsWith("<highlight>") &&
      part.endsWith("</highlight>");

    if (dollar) {
      return (
        <span key={`${part}-${index}`} className="text-primary">
          {part.slice(1, -1)}
        </span>
      );
    }

    if (tag) {
      return (
        <span key={`${part}-${index}`} className="text-primary">
          {part
            .replace("<highlight>", "")
            .replace("</highlight>", "")}
        </span>
      );
    }

    return <span key={`${part}-${index}`}>{part}</span>;
  });
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <header
      className={[
        "max-w-3xl",
        centered ? "mx-auto text-center" : "text-start",
        className,
      ].join(" ")}
    >
      {eyebrow ? (
        <span className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.2em] text-primary sm:mb-4 sm:text-xs">
          {eyebrow}
        </span>
      ) : null}

      <h2 className="text-balance text-3xl font-semibold tracking-[-0.035em] text-foreground sm:text-4xl md:text-5xl xl:text-[3.35rem] xl:leading-[1.08]">
        {renderHighlightedText(title)}
      </h2>

      {description ? (
        <p className="mt-4 max-w-2xl text-pretty text-sm leading-7 text-muted-foreground sm:mt-5 sm:text-base sm:leading-8 lg:text-lg">
          {renderHighlightedText(description)}
        </p>
      ) : null}
    </header>
  );
}
