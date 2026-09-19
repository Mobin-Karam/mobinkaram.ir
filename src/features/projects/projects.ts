export type Project = {
  id: string;
  name: string;
  description: string;
  stack: string[];

  /**
   * Main project thumbnail.
   */
  image: string;

  /**
   * Optional project gallery.
   */
  images?: string[];

  /**
   * Repository or organization URL.
   *
   * Use an empty string when the source code is private.
   */
  github: string;

  /**
   * Public production or preview URL.
   */
  demo?: string;

  /**
   * Internal portfolio details page or external project URL.
   */
  link: string;

  author?: string;
};

export const projects: Project[] = [
  {
    id: "gulify",
    name: "Gulify",
    description:
      "فروشگاه آنلاین گل و هدیه با تجربه کاربری مدرن و امکان ارتباط و ثبت سفارش از طریق پیام‌رسان بله.",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Server Actions",
      "Shadcn UI",
      "Framer Motion",
    ],
    author: "Mobin Karam",
    image: "/projects/gulify/cover.png",
    images: [
      "/projects/gulify/cover.png",
      "/projects/gulify/01.png",
      "/projects/gulify/02.png",
      "/projects/gulify/03.png",
      "/projects/gulify/04.png",
    ],
    github: "https://github.com/Mobin-Karam/flower-shop",
    demo: "https://gulify.ir",
    link: "/projects/gulify",
  },

  {
    id: "barez",
    name: "Barez",
    description:
      "پلتفرم ERP چندمستاجری برای کسب‌وکارهای خدماتی با مدیریت سفارش، مشتری، پرداخت، کارکنان، نقش‌ها، اعلان‌ها و داشبوردهای اختصاصی.",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "NestJS",
      "Prisma",
      "PostgreSQL",
      "TanStack Query",
      "Tailwind CSS",
      "Shadcn UI",
      "PWA",
      "Tauri",
    ],
    author: "Mobin Karam",
    image: "/projects/barez/cover.png",
    images: [
      "/projects/barez/cover.png",
      "/projects/barez/dashboard.png",
      "/projects/barez/orders.png",
      "/projects/barez/customer-app.png",
      "/projects/barez/mobile.png",
    ],

    /*
     * Keep this empty if the repository is private.
     */
    github: "",

    demo: "https://bareztech.ir",
    link: "/projects/barez",
  },

  {
    id: "divtime",
    name: "DivTime",
    description:
      "اپلیکیشن مدیریت زمان برای توسعه‌دهندگان، دانشجویان، معلمان و تیم‌ها با تایمر، ثبت فعالیت و ابزارهای تمرکز و بهره‌وری.",
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "WebSocket",
      "REST API",
      "PWA",
    ],
    author: "Mobin Karam",
    image: "/projects/divtime/cover.png",
    images: [
      "/projects/divtime/cover.png",
      "/projects/divtime/timer.png",
      "/projects/divtime/dashboard.png",
      "/projects/divtime/activities.png",
    ],
    github: "https://github.com/Mobin-Karam/divtime",
    demo: "https://divtime.ir",
    link: "/projects/divtime",
  },

  {
    id: "didar",
    name: "Didar",
    description:
      "پروژه‌ای برای ایجاد یک تجربه دیجیتال مدرن با تمرکز بر رابط کاربری واکنش‌گرا، معماری قابل توسعه و تجربه کاربری ساده.",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn UI",
      "Framer Motion",
    ],
    author: "Mobin Karam",
    image: "/projects/didar/cover.png",
    images: [
      "/projects/didar/cover.png",
      "/projects/didar/01.png",
      "/projects/didar/02.png",
    ],
    github: "https://github.com/Mobin-Karam/didar",

    /*
     * Add the production URL when available.
     */
    demo: undefined,

    link: "/projects/didar",
  },

  {
    id: "koonj",
    name: "Koonj",
    description:
      "پلتفرم موبایلی اجتماعی و ماجراجویی با تمرکز بر ارتباط انسانی، کشف مکان‌ها، روایت داستان و تجربه‌های تعاملی آرام و هدفمند.",
    stack: [
      "React Native",
      "TypeScript",
      "Next.js",
      "Node.js",
      "REST API",
      "PostgreSQL",
      "Linux",
      "Cybersecurity",
    ],
    author: "Koonj Inc",
    image: "/projects/koonj/cover.png",
    images: [
      "/projects/koonj/cover.png",
      "/projects/koonj/mobile.png",
      "/projects/koonj/community.png",
      "/projects/koonj/explore.png",
    ],
    github: "https://github.com/Koonj-Inc",
    demo: "https://koonj.ir",
    link: "/projects/koonj",
  },
];
