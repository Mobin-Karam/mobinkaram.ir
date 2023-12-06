import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/ui/globals.css";
import SideNav from "./ui/sidenav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mobin Karam | Home",
  description: "Personal and Portfolio website of MobinKaram",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="max-w-screen-2xl lg:bg-slate-400 transition-all duration-500">
          <div className="lg:grid lg:grid-cols-5 flex flex-col-reverse w-full transition-all duration-600">
            <div className="lg:col-start-1  lg:col-end-2 ">
              <SideNav />
            </div>
            <div className="w-full h-screen lg:col-start-2 lg:col-end-6">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
