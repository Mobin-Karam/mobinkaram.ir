import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "پروژه‌ها | نمونه‌کارها و آزمایش‌ها",
  description:
    "مجموعه‌ای از پروژه‌ها، نمونه‌کارها و آزمایش‌های توسعه وب شامل React، Next.js و ابزارهای مدرن فرانت‌اند.",
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section dir="rtl" className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10 space-y-8">
        {children}
      </div>
    </section>
  )
}