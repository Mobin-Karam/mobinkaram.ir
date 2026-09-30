import type { Metadata } from "next";
import { Suspense } from "react";
import { ProjectsClient, projects } from "@/features/projects";
import { routing } from "@/i18n/routing";

// ============================================================================
// Metadata
// ============================================================================

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://mobinkaram.ir";
  const isFa = locale === "fa";
  
  return {
    metadataBase: new URL(baseUrl),
    title: isFa ? "پروژه‌ها | مبین کرم" : "Mobin Karam | Projects",
    description: isFa
      ? "مهندس نرم افزار ایرانی، متخصص React، Next.js و TypeScript. طراحی و توسعه اپلیکیشن‌های وب مدرن و مقیاس‌پذیر."
      : "Software engineer specializing in React, Next.js, and TypeScript. Building modern, scalable web applications.",
    keywords: isFa
      ? [
          "مهندس نرم افزار",
          "برنامه نویس فول استک",
          "توسعه دهنده وب",
          "مهندس نرم افزار ایرانی",
          "برنامه نویس جاوااسکریپت",
          "توسعه دهنده React",
          "توسعه دهنده Node.js",
          "مهندس نرم افزار فرانت اند",
          "آموزش React",
          "آموزش TypeScript",
          "آموزش Next.js",
          "مبین کرم",
          "مبین کرم کیست",
          "پروژه های مبین کرم",
          "معماری نرم افزار",
          "بهینه سازی سایت",
        ]
      : [
          "software engineer portfolio",
          "full stack developer",
          "react developer portfolio",
          "typescript developer",
          "next.js developer",
          "frontend developer",
          "software engineer blog",
          "react performance optimization",
          "typescript best practices",
          "Mobin Karam",
        ],
    authors: [{ name: "Mobin Karam", url: baseUrl }],
    creator: "Mobin Karam",
    publisher: "Mobin Karam",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        en: `${baseUrl}/en`,
        fa: `${baseUrl}/fa`,
      },
      types: {
        "application/rss+xml": `${baseUrl}/rss`,
      },
    },
    openGraph: {
      type: "website",
      locale: isFa ? "fa_IR" : "en_US",
      alternateLocale: isFa ? "en_US" : "fa_IR",
      url: `${baseUrl}/${locale}`,
      siteName: "Mobin Karam",
      title: isFa
        ? "مبین کرم | مهندس نرم افزار"
        : "Mobin Karam | Software Engineer",
      description: isFa
        ? "تبدیل ایده‌های دیجیتال به محصول واقعی و فروش‌ساز"
        : "Turning digital ideas into real products and revenue",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: isFa ? "مبین کرم" : "Mobin Karam",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isFa
        ? "مبین کرم | توسعه‌دهنده فرانت‌اند"
        : "Mobin Karam | Frontend Developer",
      description: isFa
        ? "مهندس نرم افزار متخصص React و Next.js"
        : "Software engineer specializing in React and Next.js",
      images: ["/og-image.png"],
    },
    icons: {
      icon: "/favicon.png",
    },
    manifest: "/manifest.webmanifest",
  };
}

// ============================================================================
// Page
// ============================================================================

interface Props {
  searchParams: Promise<{
    search?: string;
    filter?: string;
  }>;
}

export default async function ProjectsPage({ searchParams }: Props) {
  const query = await searchParams;
  const allStacks = Array.from(new Set(projects.flatMap((p) => p.stack))).sort(
    (a, b) => a.localeCompare(b),
  );

  const initialSearch = query.search ?? "";
  const initialFilter = query.filter ?? "all";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "پروژه‌های من",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.slice(0, 10).map((project, index) => ({
        "@type": "CreativeWork",
        position: index + 1,
        name: project.name,
        description: project.description,
        keywords: project.stack.join(", "),
        url: project.link,
      })),
    },
  };

  return (
    <>
      {/* SEO JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* IMPORTANT: Suspense wrapper fixes build error */}
      <Suspense fallback={null}>
        <ProjectsClient
          projects={projects}
          allStacks={allStacks}
          initialSearch={initialSearch}
          initialFilter={initialFilter}
        />
      </Suspense>
    </>
  );
}
