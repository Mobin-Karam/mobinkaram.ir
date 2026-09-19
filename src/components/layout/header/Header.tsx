"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navItems = [
  { href: "/", label: "خانه" },
  { href: "/aboutme", label: "درباره من" },
  { href: "/products", label: "خدمات" },
  { href: "/projects", label: "پروژه‌ها" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">

        {/* Logo */}
        <Link href="/" className="group">
          <h1 className="text-lg font-semibold tracking-tight">
مبین کرم
          </h1>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}

                {active && (
                  <motion.div
                    layoutId="active-line"
                    className="absolute -bottom-[18px] left-0 h-0.5 w-full rounded-full bg-primary"
                    transition={{
                      type: "spring",
                      stiffness: 450,
                      damping: 35,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          <div className="flex items-center rounded-lg border bg-muted p-1">
            <button className="rounded-md bg-background px-3 py-1.5 text-sm font-medium shadow-sm">
              FA
            </button>

            <button className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition hover:text-foreground">
              EN
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}

