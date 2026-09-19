// components/PageShell.tsx

import Header from "./layout/header/Header";

export default function PageShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-background min-h-screen">
      <Header />
      {children}
    </div>
  );
}