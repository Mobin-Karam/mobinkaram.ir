import type { ReactNode } from "react";
import { Vazirmatn } from "next/font/google";

import "./globals.css";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { BackToTop } from "@/components/ui/back-to-top";
import { Metadata } from "next";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
  display: "swap",
});

interface RootLayoutProps {
  children: ReactNode;
}


export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="fa"
      dir="rtl"
      suppressHydrationWarning
      className="scroll-smooth"
    >
      <body
        suppressHydrationWarning
        className={[
          vazirmatn.variable,
          "min-h-dvh",
          "bg-background text-foreground",
          "font-sans antialiased",
          "transition-colors duration-300",
        ].join(" ")}
      >
        {children}
        <SmoothCursor />

        <BackToTop />
      </body>
    </html>
  );
}
