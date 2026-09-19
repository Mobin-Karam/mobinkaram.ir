import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "خدمات و محصولات | مبین کرم",
  description:
    "چهار مسیر برای راه‌اندازی و رشد حضور دیجیتال فروشگاه یا برندت: طراحی پیج اینستاگرام، راه‌اندازی کانال تلگرام، راه‌اندازی کامل کسب‌وکار دیجیتال و مدیریت شبکه‌های اجتماعی.",
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
