import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/ui/globals.css";
import SideNav from "./ui/sidenav";
import { useEffect, useState } from "react";
import Home from "./page";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mobin Karam",
  description: "Personal and Portfolio website of MobinKaram",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
