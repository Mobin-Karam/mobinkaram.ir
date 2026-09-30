export function iconifyUrl(icon: string) {
  return `https://api.iconify.design/${icon}.svg`;
}


export function HighlightedText({ text }: { text: string }) {
  const parts = text.split(/(\$.*?\$)/g);

  return (
    <>
      {parts.map((part, index) => {
        const highlighted =
          part.length >= 2 && part.startsWith("$") && part.endsWith("$");

        return highlighted ? (
          <span key={index} className="text-primary">
            {part.slice(1, -1)}
          </span>
        ) : (
          <span key={index}>{part}</span>
        );
      })}
    </>
  );
}