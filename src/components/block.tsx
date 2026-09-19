// components/Block.tsx
type BlockProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Block({
  children,
  className = "",
}: BlockProps) {
  return (
    <section
      className={`border-b border-border px-6 py-12 ${className}`}
    >
      {children}
    </section>
  );
}