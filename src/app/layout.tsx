import type { ReactNode } from "react";
import localFont from "next/font/local";

import "./globals.css";
import { BackToTop } from "@/components/ui/back-to-top";

const vazirmatn = localFont({
  src: "../../public/fonts/Vazirmatn/Vazirmatn-VariableFont_wght.ttf",
  variable: "--font-vazirmatn",
  display: "swap",
  preload: true,
  fallback: ["Tahoma", "Arial", "sans-serif"],
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
      data-scroll-behavior="smooth"
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
        <BackToTop />
      </body>
    </html>
  );
}
