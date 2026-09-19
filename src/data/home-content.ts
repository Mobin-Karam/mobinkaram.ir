export type HomeLocale = "en" | "fa";

export type SkillItem = {
  name: string;
  level: string;
  percent: number;
};

export type SoftSkillItem = {
  title: string;
  desc: string;
};

export type ProjectItem = {
  id: string;
  name: string;
  description: string;
  stack: string[];
  github: string;
  demo?: string;
};

export type ResultMetric = {
  value: string;
  label: string;
};

export type TestimonialItem = {
  quote: string;
  name: string;
  role: string;
};

export type ExperienceJob = {
  period: string;
  title: string;
  company: string;
  tasks: string[];
};

export type JourneyStep = {
  name: string;
  subtitle: string;
  desc: string;
  current: boolean;
  future: boolean;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type ContactLink = {
  label: string;
  value: string;
  href: string;
};


export type StorySectionKey =
  | "hero"
  | "skills"
  | "projects"
  | "results"
  | "testimonials"
  | "experience"
  | "journey"
  | "faq"
  | "contact";

export type StorySectionGuide = {
  label: string;
  message: string;
  prompt: string;
};

export type PortfolioStory = {
  assistantName: string;
  assistantRole: string;
  assistantGreeting: string;
  assistantPlaceholder: string;
  assistantHint: string;
  unknownPrompt: string;
  unsupportedLanguage: string;
  heroChatLabel: string;
  heroChatHint: string;
  trustTitle: string;
  trustItems: string[];
  presets: Array<{
    label: string;
    prompt: string;
    target: StorySectionKey;
  }>;
  sections: Record<StorySectionKey, StorySectionGuide>;
};

export type HomeContent = {
  story: PortfolioStory;
  skills: {
    title: string;
    description: string;
    technical: string;
    complementary: string;
    levels: {
      excellent: string;
      good: string;
      average: string;
      basic: string;
    };
    items: Record<string, SkillItem>;
    softSkills: Record<string, SoftSkillItem>;
  };
  projects: {
    title: string;
    description: string;
    live: string;
    viewCode: string;
    all: string;
    items: ProjectItem[];
  };
  results: {
    title: string;
    description: string;
    metrics: Record<string, ResultMetric>;
    successStories: string;
    viewAll: string;
    cta: {
      title: string;
      description: string;
      button: string;
    };
  };
  testimonials: {
    title: string;
    items: TestimonialItem[];
  };
  experience: {
    title: string;
    jobs: ExperienceJob[];
  };
  journey: {
    title: string;
    description: string;
    currentLabel: string;
    futureLabel: string;
    steps: JourneyStep[];
  };
  faq: {
    label: string;
    title: string;
    description: string;
    items: FAQItem[];
  };
  contact: {
    title: string;
    description: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    telegram: string;
    links: {
      email: ContactLink;
      phone: ContactLink;
      linkedin: ContactLink;
      github: ContactLink;
      telegram: ContactLink;
    };
  };
};

export const homeContent: Record<HomeLocale, HomeContent> = {
  en: {
    story: {
      assistantName: "Portfolio Guide",
      assistantRole: "Local portfolio assistant",
      assistantGreeting:
        "Hi — tell me what you want to see. I can take you directly to my skills, projects, results, experience, learning journey, FAQ, or contact section.",
      assistantPlaceholder: "Try: Show me your backend skills",
      assistantHint: "Local portfolio brain • your question is not sent to an external AI API.",
      unknownPrompt:
        "I couldn't match that confidently yet. Ask about Mobin, skills, frontend, backend, NestJS, databases, security, projects, results, experience, learning, collaboration, or contact.",
      unsupportedLanguage:
        "I currently understand English and Persian only. Please ask your question in English or Persian. فعلاً فقط انگلیسی و فارسی را متوجه می‌شوم؛ لطفاً سؤال را به یکی از این دو زبان بنویسید.",
      heroChatLabel: "Want to know more?",
      heroChatHint: "Ask the local version of me",
      trustTitle: "Private portfolio assistant",
      trustItems: [
        "Runs in your browser",
        "Answers from this portfolio only",
        "No external AI request",
      ],
      presets: [
        { label: "What can you build?", prompt: "Show me your skills", target: "skills" },
        { label: "Show projects", prompt: "Take me to your projects", target: "projects" },
        { label: "Your experience", prompt: "Show me your experience", target: "experience" },
        { label: "Cybersecurity path", prompt: "Show me your learning journey", target: "journey" },
        { label: "Work together", prompt: "How can I contact you?", target: "contact" },
      ],
      sections: {
        hero: {
          label: "Start here",
          message:
            "I build production-focused web products with Next.js, React, TypeScript and NestJS, while bringing security thinking and AI-assisted engineering into the workflow.",
          prompt: "Scroll to see how I work and what I build.",
        },
        skills: {
          label: "What I use",
          message:
            "This is my working toolkit. I focus on frontend product engineering, NestJS backends, PostgreSQL and Prisma, responsive UI, security fundamentals, Linux, Docker and modern delivery workflows.",
          prompt: "Keep scrolling — the technical and complementary skills will reveal as you move.",
        },
        projects: {
          label: "What I build",
          message:
            "I prefer real products over demo-only UI. These projects show how I turn requirements into usable interfaces, architecture, performance and business-facing features.",
          prompt: "Scroll vertically and the project rail moves horizontally for you.",
        },
        results: {
          label: "What changes",
          message:
            "I care about measurable outcomes: faster loading, better discoverability, fewer UX problems, cleaner architecture and a product that is easier to maintain.",
          prompt: "The metrics appear one by one as you continue scrolling.",
        },
        testimonials: {
          label: "What people say",
          message:
            "Good engineering is not only code. I try to understand what the client actually wants, translate it into a usable experience, and communicate clearly while building it.",
          prompt: "Scroll to move through feedback without leaving this viewport.",
        },
        experience: {
          label: "Where I worked",
          message:
            "My experience spans frontend engineering, backend/API development and cybersecurity work. I use that combination to think across the whole product instead of only one layer.",
          prompt: "Each role replaces the previous one as you scroll.",
        },
        journey: {
          label: "Where I'm going",
          message:
            "I keep expanding from web engineering into networking, cybersecurity, infrastructure and secure system design. The goal is to build systems that are useful, scalable and defensible.",
          prompt: "Follow the timeline as it grows with your scroll.",
        },
        faq: {
          label: "Ask before we work",
          message:
            "These are the questions I usually want answered early too: scope, responsiveness, architecture, existing systems, collaboration style and what success should look like.",
          prompt: "Open any question — this section stays intentionally calmer and interactive.",
        },
        contact: {
          label: "Let's talk",
          message:
            "If you have a product to build, a system to improve, or a role where product engineering and security awareness matter, this is the fastest way to reach me.",
          prompt: "Choose the channel that works best for you.",
        },
      },
    },
    skills: {
      title: "Skills & $Expertise$",
      description:
        "A combination of $technical skills$ and $soft skills$ that together create a reliable and professional experience.",
      technical: "Technical Skills",
      complementary: "Complementary Skills",
      levels: {
        excellent: "Excellent",
        good: "Good",
        average: "Average",
        basic: "Basic",
      },
      items: {
        nextjs: { name: "Next.js", level: "Advanced", percent: 90 },
        react: { name: "React.js", level: "Advanced", percent: 90 },
        nestjs: { name: "NestJS", level: "Advanced", percent: 85 },
        typescript: {
          name: "TypeScript",
          level: "Intermediate",
          percent: 70,
        },
        javascript: {
          name: "JavaScript",
          level: "Advanced",
          percent: 90,
        },
        htmlcss: {
          name: "HTML5 / CSS3",
          level: "Advanced",
          percent: 95,
        },
      },
      softSkills: {
        backend: {
          title: "Backend & API Development",
          desc: "Designing production REST APIs with NestJS, PostgreSQL, Prisma ORM, authentication, validation and modular service architecture.",
        },
        database: {
          title: "Database Management",
          desc: "Working with MongoDB, PostgreSQL, MySQL, and Prisma ORM for data design and management.",
        },
        security: {
          title: "Cybersecurity",
          desc: "Risk analysis, internet security, and implementing secure systems with JWT and authentication.",
        },
        mobile: {
          title: "Mobile Development",
          desc: "Building mobile applications with React Native and Progressive Web Applications.",
        },
        devops: {
          title: "Development Tools",
          desc: "Working with Git, Linux, Python, and modern software development tools.",
        },
      },
    },
    projects: {
      title: "Portfolio & $Frontend Projects$",
      description:
        "A collection of web design and development projects with $focus on SEO$, $performance optimization$, $user experience$, and $scalable architecture$.",
      live: "Live Demo",
      viewCode: "View Code",
      all: "All Projects",
      items: [
        {
          id: "gulify",
          name: "Gulify",
          description: "Online flower shop connected to Bale messaging.",
          stack: [
            "Next.js",
            "Tailwind CSS",
            "Server Actions",
            "shadcn/ui",
            "Framer Motion",
          ],
          github: "https://github.com/Mobin-Karam/flower-shop",
          demo: "https://gulify.ir",
        },
      ],
    },
    results: {
      title: "Results & $Achievements$",
      description:
        "A collection of measurable results I've created for my clients.",
      metrics: {
        seo: { value: "40%", label: "Average SEO Improvement" },
        speed: { value: "3x", label: "Faster Loading" },
        projects: { value: "2+", label: "Projects Delivered" },
        satisfaction: { value: "98%", label: "Client Satisfaction" },
      },
      successStories: "Client Success Stories",
      viewAll: "View All Results",
      cta: {
        title: "Ready to Start Your Next Project?",
        description: "Contact me to discuss how we can improve your website.",
        button: "Contact Me",
      },
    },
    testimonials: {
      title: "Client & $Colleague$ Testimonials",
      items: [
        {
          quote:
            "Mobin creates user experiences that reflect the client's actual needs and works closely with the requested direction.",
          name: "Meghdad Ghorbani",
          role: "Owner, Korddaneh Store",
        },
      ],
    },
    experience: {
      title: "Work Experience & $Professional Growth$",
      jobs: [
        {
          period: "2022 — 2025 · Iran",
          title: "Frontend Developer",
          company: "WADSoftware",
          tasks: [
            "Developed modern, scalable applications with React, Next.js, and TypeScript",
            "Built responsive UI with Tailwind CSS and CSS3",
            "Optimized frontend performance and Core Web Vitals",
            "Worked with HTML5, JavaScript and JS libraries",
          ],
        },
        {
          period: "2023 — 2025 · Iran",
          title: "Backend Developer",
          company: "WADSoftware",
          tasks: [
            "Developed modular APIs with NestJS",
            "Designed and managed databases with MongoDB and PostgreSQL",
            "Implemented authentication with JWT",
            "Built scalable REST APIs",
          ],
        },
        {
          period: "2025 — Present · Iran — Hormozgan",
          title: "Cyber Security Specialist",
          company: "Koonj",
          tasks: [
            "Analyzed and managed cybersecurity risks",
            "Internet security and infrastructure",
            "Developed mobile applications with React Native",
            "Worked with Python and Linux",
          ],
        },
      ],
    },
    journey: {
      title: "Learning Path & $Professional Growth$",
      description:
        "From $first steps in HTML and CSS$ to $fullstack development$; a journey driven by persistence and passion.",
      currentLabel: "Learning",
      futureLabel: "Future Goal",
      steps: [
        {
          name: "HTML & CSS",
          subtitle: "Layout, Responsive Design & Semantic Structure",
          desc: "Solid foundation in web standards, semantic markup, Flexbox, CSS Grid, and mobile-first responsive design.",
          current: false,
          future: false,
        },
        {
          name: "JavaScript",
          subtitle: "Core Concepts, Async Patterns & DOM",
          desc: "ES6+ features, asynchronous programming, closures, and direct DOM manipulation.",
          current: false,
          future: false,
        },
        {
          name: "React",
          subtitle: "Component Architecture & State Management",
          desc: "Component-based architecture, hooks, Context API, and UI systems.",
          current: false,
          future: false,
        },
        {
          name: "TypeScript",
          subtitle: "Type Safety & Scalable Code",
          desc: "Static typing, generics, and type-safe patterns.",
          current: false,
          future: false,
        },
        {
          name: "Next.js",
          subtitle: "SSR, Performance & Scalable Structure",
          desc: "Production applications with App Router and Server Components.",
          current: false,
          future: false,
        },
        {
          name: "Fullstack",
          subtitle: "Complete Application Architecture",
          desc: "Expanding into backend development and complete architecture.",
          current: false,
          future: false,
        },
        {
          name: "Cybersecurity",
          subtitle: "Network Security, Risk Analysis & Cyber Defense",
          desc: "Currently learning cybersecurity, network security, risk analysis, penetration testing, and secure system design to protect infrastructure and data.",
          current: true,
          future: true,
        },
      ],
    },
    faq: {
      label: "Questions & Answers",
      title: "Frequently asked <highlight>questions</highlight>",
      description:
        "Answers to common questions about my development process, services, technologies, availability, and project collaboration.",
      items: [
        {
          question: "What kind of projects do you work on?",
          answer:
            "I build modern websites, dashboards, business platforms, portfolio websites, and scalable web applications with a strong focus on performance, responsive design, security, and user experience.",
        },
        {
          question: "Which technologies do you mainly use?",
          answer:
            "My primary stack includes Next.js, React, TypeScript, NestJS, Tailwind CSS, PostgreSQL, MongoDB, Prisma, and modern API development tools.",
        },
        {
          question: "Can you improve an existing website or application?",
          answer:
            "Yes. I can audit an existing product, improve its interface, resolve responsive issues, optimize performance, reorganize its architecture, and make the codebase easier to maintain.",
        },
        {
          question: "Do you build responsive interfaces?",
          answer:
            "Yes. Every interface is designed to work properly across mobile phones, tablets, laptops, and large desktop screens using a mobile-first and accessibility-conscious approach.",
        },
        {
          question: "Can you work with an existing design system?",
          answer:
            "Yes. I can implement an existing design system or improve one by creating reusable components, consistent spacing, typography, colors, interaction states, and responsive behavior.",
        },
        {
          question: "Are you available for freelance or collaborative work?",
          answer:
            "Yes. I am open to selected freelance projects, frontend development roles, product collaborations, and opportunities involving modern web applications or secure digital systems.",
        },
      ],
    },
    contact: {
      title: "Let's Work Together",
      description:
        "Currently open to frontend roles and collaborative opportunities. If you have a project in mind, I'd love to discuss it.",
      email: "Email",
      phone: "Phone",
      linkedin: "LinkedIn",
      github: "GitHub",
      telegram: "Telegram",
      links: {
        email: {
          label: "Email",
          value: "mohammadmobinkaram@gmail.com",
          href: "mailto:mohammadmobinkaram@gmail.com",
        },
        phone: {
          label: "Phone",
          value: "+98 993 559 3099",
          href: "tel:+989935593099",
        },
        linkedin: {
          label: "LinkedIn",
          value: "LinkedIn",
          href: "https://www.linkedin.com/in/mobin-karam/",
        },
        github: {
          label: "GitHub",
          value: "GitHub",
          href: "https://github.com/Mobin-Karam",
        },
        telegram: {
          label: "Telegram",
          value: "Telegram",
          href: "https://t.me/linoxch",
        },
      },
    },
  },

  fa: {
    story: {
      assistantName: "راهنمای پورتفولیو",
      assistantRole: "دستیار محلی پورتفولیو",
      assistantGreeting:
        "سلام — بگویید دوست دارید کدام بخش را ببینید. می‌توانم شما را مستقیم به مهارت‌ها، پروژه‌ها، نتایج، تجربه کاری، مسیر یادگیری، سوالات یا تماس ببرم.",
      assistantPlaceholder: "مثلاً: مهارت‌های بک‌اندت را نشان بده",
      assistantHint: "مغز محلی پورتفولیو • پیام شما به API خارجی هوش مصنوعی ارسال نمی‌شود.",
      unknownPrompt:
        "هنوز نتوانستم سؤال را با اطمینان به اطلاعات پورتفولیو مرتبط کنم. درباره مبین، مهارت‌ها، فرانت‌اند، بک‌اند، NestJS، دیتابیس، امنیت، پروژه‌ها، نتایج، تجربه، مسیر یادگیری، همکاری یا تماس بپرسید.",
      unsupportedLanguage:
        "فعلاً فقط فارسی و انگلیسی را متوجه می‌شوم. لطفاً سؤال را به فارسی یا انگلیسی بنویسید. I currently understand Persian and English only.",
      heroChatLabel: "می‌خواهید بیشتر بدانید؟",
      heroChatHint: "از نسخه محلی من بپرسید",
      trustTitle: "دستیار خصوصی پورتفولیو",
      trustItems: [
        "در مرورگر شما اجرا می‌شود",
        "فقط از اطلاعات همین پورتفولیو پاسخ می‌دهد",
        "درخواست به AI خارجی ارسال نمی‌شود",
      ],
      presets: [
        { label: "چه چیزهایی می‌سازی؟", prompt: "مهارت‌هایت را نشان بده", target: "skills" },
        { label: "پروژه‌ها", prompt: "پروژه‌هایت را نشان بده", target: "projects" },
        { label: "تجربه کاری", prompt: "تجربه کارت را نشان بده", target: "experience" },
        { label: "مسیر امنیت", prompt: "مسیر یادگیری امنیت را نشان بده", target: "journey" },
        { label: "همکاری", prompt: "چطور با تو تماس بگیرم؟", target: "contact" },
      ],
      sections: {
        hero: {
          label: "از اینجا شروع کنید",
          message:
            "من محصولات واقعی وب را با Next.js، React، TypeScript و NestJS می‌سازم و در فرایند توسعه از نگاه امنیتی و ابزارهای هوش مصنوعی هم استفاده می‌کنم.",
          prompt: "اسکرول کنید تا ببینید چطور کار می‌کنم و چه چیزهایی می‌سازم.",
        },
        skills: {
          label: "ابزارهای کاری من",
          message:
            "این بخش ابزارهای اصلی من را نشان می‌دهد: مهندسی فرانت‌اند، بک‌اند با NestJS، PostgreSQL و Prisma، رابط واکنش‌گرا، امنیت، Linux، Docker و فرایندهای مدرن توسعه.",
          prompt: "با ادامه اسکرول، مهارت‌های فنی و تکمیلی مرحله‌به‌مرحله ظاهر می‌شوند.",
        },
        projects: {
          label: "چیزهایی که می‌سازم",
          message:
            "من پروژه واقعی را به رابط نمایشی ترجیح می‌دهم. این پروژه‌ها نشان می‌دهند چطور نیاز واقعی را به تجربه کاربری، معماری، عملکرد و قابلیت‌های تجاری تبدیل می‌کنم.",
          prompt: "شما عمودی اسکرول می‌کنید و پروژه‌ها برایتان افقی حرکت می‌کنند.",
        },
        results: {
          label: "نتیجه‌ای که مهم است",
          message:
            "برای من خروجی قابل اندازه‌گیری مهم است: سرعت بهتر، سئوی بهتر، مشکلات UX کمتر، معماری تمیزتر و محصولی که توسعه آینده آن ساده‌تر باشد.",
          prompt: "با اسکرول، هر نتیجه به‌صورت جداگانه ظاهر می‌شود.",
        },
        testimonials: {
          label: "نظر دیگران",
          message:
            "مهندسی خوب فقط کد نیست. تلاش می‌کنم خواسته واقعی کارفرما را بفهمم، آن را به تجربه قابل استفاده تبدیل کنم و در طول ساخت ارتباط شفاف داشته باشم.",
          prompt: "با اسکرول بازخوردها عوض می‌شوند، بدون اینکه از این نما خارج شوید.",
        },
        experience: {
          label: "تجربه کاری من",
          message:
            "تجربه من بین فرانت‌اند، توسعه بک‌اند و API و امنیت سایبری قرار دارد. این ترکیب کمک می‌کند محصول را فقط از یک لایه نبینم.",
          prompt: "با هر مرحله اسکرول، تجربه کاری بعدی جایگزین قبلی می‌شود.",
        },
        journey: {
          label: "مسیر بعدی من",
          message:
            "در کنار توسعه وب، مسیرم را به سمت شبکه، امنیت سایبری، زیرساخت و طراحی سیستم امن گسترش می‌دهم تا سیستم‌هایی مفید، مقیاس‌پذیر و قابل دفاع بسازم.",
          prompt: "با اسکرول، خط مسیر و مراحل یادگیری پیش می‌روند.",
        },
        faq: {
          label: "قبل از همکاری",
          message:
            "این‌ها سوال‌هایی هستند که خودم هم در شروع پروژه مهم می‌دانم: محدوده کار، واکنش‌گرایی، معماری، سیستم فعلی، شیوه همکاری و تعریف موفقیت.",
          prompt: "هر سوال را باز کنید؛ این بخش عمداً آرام‌تر و تعاملی است.",
        },
        contact: {
          label: "بیایید صحبت کنیم",
          message:
            "اگر محصولی برای ساخت، سیستمی برای بهبود یا موقعیتی دارید که مهندسی محصول و توجه به امنیت در آن مهم است، از اینجا سریع می‌توانید با من ارتباط بگیرید.",
          prompt: "روش ارتباط مناسب خودتان را انتخاب کنید.",
        },
      },
    },
    skills: {
      title: "مهارت‌ها و $تخصص‌ها$",
      description:
        "ترکیبی از $مهارت‌های فنی$ و $توانایی‌های نرم$ که در کنار هم تجربه‌ای قابل اعتماد و حرفه‌ای می‌سازند.",
      technical: "مهارت‌های فنی",
      complementary: "مهارت‌های تکمیلی",
      levels: {
        excellent: "عالی",
        good: "خوب",
        average: "متوسط",
        basic: "پایه",
      },
      items: {
        nextjs: { name: "Next.js", level: "پیشرفته", percent: 90 },
        react: { name: "React.js", level: "پیشرفته", percent: 90 },
        nestjs: { name: "NestJS", level: "پیشرفته", percent: 85 },
        typescript: { name: "TypeScript", level: "متوسط", percent: 70 },
        javascript: { name: "JavaScript", level: "پیشرفته", percent: 90 },
        htmlcss: { name: "HTML5 / CSS3", level: "پیشرفته", percent: 95 },
      },
      softSkills: {
        backend: {
          title: "توسعه بک‌اند و API",
          desc: "طراحی REST APIهای پروداکشن با NestJS، PostgreSQL، Prisma ORM، احراز هویت، اعتبارسنجی و معماری ماژولار.",
        },
        database: {
          title: "مدیریت پایگاه داده",
          desc: "کار با MongoDB، PostgreSQL، MySQL و Prisma ORM برای طراحی و مدیریت داده‌ها.",
        },
        security: {
          title: "امنیت سایبری",
          desc: "تحلیل ریسک، امنیت اینترنت و پیاده‌سازی سیستم‌های امن با JWT و احراز هویت.",
        },
        mobile: {
          title: "توسعه موبایل",
          desc: "ساخت اپلیکیشن‌های موبایل با React Native و Progressive Web Applications.",
        },
        devops: {
          title: "ابزارهای توسعه",
          desc: "کار با Git، Linux، Python و ابزارهای مدرن توسعه نرم‌افزار.",
        },
      },
    },
    projects: {
      title: "نمونه‌کارها و $پروژه‌های فرانت‌اند$",
      description:
        "مجموعه‌ای از پروژه‌های طراحی و توسعه وب با $تمرکز بر سئو$، $بهینه‌سازی عملکرد$، $تجربه کاربری$ و $معماری مقیاس‌پذیر$.",
      live: "مشاهده آنلاین",
      viewCode: "مشاهده کد",
      all: "مشاهده همه پروژه‌ها",
      items: [
        {
          id: "gulify",
          name: "Gulify",
          description: "فروشگاه گل آنلاین با اتصال به بله",
          stack: [
            "Next.js",
            "Tailwind CSS",
            "Server Actions",
            "shadcn/ui",
            "Framer Motion",
          ],
          github: "https://github.com/Mobin-Karam/flower-shop",
          demo: "https://gulify.ir",
        },
      ],
    },
    results: {
      title: "نتایج و $دستاوردها$",
      description:
        "مجموعه‌ای از نتایج قابل اندازه‌گیری که برای مشتریان خود ایجاد کرده‌ام.",
      metrics: {
        seo: { value: "40%", label: "میانگین بهبود سئو" },
        speed: { value: "3x", label: "بارگذاری سریع‌تر" },
        projects: { value: "2+", label: "پروژه تحویل شده" },
        satisfaction: { value: "99%", label: "رضایت مشتری" },
      },
      successStories: "داستان موفقیت مشتریان",
      viewAll: "مشاهده تمام نتایج",
      cta: {
        title: "آماده‌اید پروژه بعدی را شروع کنیم؟",
        description:
          "با من تماس بگیرید تا درباره چگونگی بهبود وب‌سایتتان صحبت کنیم.",
        button: "تماس با من",
      },
    },
    testimonials: {
      title: "نظرات $مشتریان$ و همکاران",
      items: [
        {
          quote:
            "مبین در طراحی تجربه کاربری واقعی و دل بخواه کارفرما، بصورت واقعی و طبق درخواست کارفرما عمل میکند",
          name: "مقداد قربانی",
          role: "صاحب فروشگاه کورددانه",
        },
      ],
    },
    experience: {
      title: "سوابق کاری و $تجربه حرفه‌ای$",
      jobs: [
        {
          period: "۲۰۲۲ — ۲۰۲۵ · ایران",
          title: "توسعه‌دهنده فرانت‌اند",
          company: "WADSoftware",
          tasks: [
            "توسعه اپلیکیشن‌های مدرن و مقیاس‌پذیر با React، Next.js و TypeScript",
            "پیاده‌سازی رابط کاربری ریسپانسیو با Tailwind CSS و CSS3",
            "بهینه‌سازی عملکرد فرانت‌اند و Core Web Vitals",
            "کار با HTML5، JavaScript و کتابخانه‌های JS",
          ],
        },
        {
          period: "۲۰۲۳ — ۲۰۲۵ · ایران",
          title: "توسعه‌دهنده بک‌اند",
          company: "WADSoftware",
          tasks: [
            "توسعه APIهای ماژولار با NestJS",
            "طراحی و مدیریت پایگاه داده با MongoDB و PostgreSQL",
            "پیاده‌سازی احراز هویت با JWT",
            "توسعه REST APIs مقیاس‌پذیر",
          ],
        },
        {
          period: "۲۰۲۵ — اکنون · ایران — هرمزگان",
          title: "متخصص امنیت سایبری",
          company: "Koonj",
          tasks: [
            "تحلیل و مدیریت ریسک‌های امنیت سایبری",
            "امنیت اینترنت و زیرساخت‌ها",
            "توسعه اپلیکیشن‌های موبایل با React Native",
            "کار با Python و Linux",
          ],
        },
      ],
    },
    journey: {
      title: "مسیر یادگیری و $توسعه حرفه‌ای$",
      description:
        "از $اولین قدم‌ها در HTML و CSS$ تا رسیدن به $توسعه فول‌استک$؛ مسیری که با پشتکار و علاقه طی شده.",
      currentLabel: "در حال یادگیری",
      futureLabel: "هدف آینده",
      steps: [
        {
          name: "HTML و CSS",
          subtitle: "چیدمان، طراحی ریسپانسیو و ساختار معنایی",
          desc: "پایه‌ای محکم در استانداردهای وب، فلکسباکس، گرید CSS و اصول طراحی ریسپانسیو.",
          current: false,
          future: false,
        },
        {
          name: "جاوااسکریپت",
          subtitle: "مفاهیم پایه، الگوهای async و DOM",
          desc: "ویژگی‌های ES6+، برنامه‌نویسی ناهمگام، closureها و دستکاری DOM.",
          current: false,
          future: false,
        },
        {
          name: "ری‌اکت",
          subtitle: "معماری کامپوننت‌ها و مدیریت state",
          desc: "معماری مبتنی بر کامپوننت، هوک‌ها، Context API و سیستم‌های UI.",
          current: false,
          future: false,
        },
        {
          name: "تایپ‌اسکریپت",
          subtitle: "امنیت تایپ و کد مقیاس‌پذیر",
          desc: "تایپ استاتیک، جنریک‌ها و الگوهای تایپ-امن.",
          current: false,
          future: false,
        },
        {
          name: "نکست‌جی‌اس",
          subtitle: "SSR، بهینه‌سازی و ساختار مقیاس‌پذیر",
          desc: "اپلیکیشن‌های پروداکشنی با App Router و سرور کامپوننت‌ها.",
          current: false,
          future: false,
        },
        {
          name: "فول‌استک",
          subtitle: "معماری کامل اپلیکیشن‌ها",
          desc: "در حال گسترش به توسعه بک‌اند و معماری کامل.",
          current: false,
          future: false,
        },
        {
          name: "امنیت سایبری",
          subtitle: "امنیت شبکه، تحلیل ریسک و دفاع سایبری",
          desc: "در حال یادگیری امنیت سایبری، امنیت شبکه، تحلیل ریسک، تست نفوذ و طراحی سیستم‌های امن برای محافظت از زیرساخت‌ها و داده‌ها.",
          current: true,
          future: true,
        },
      ],
    },
    faq: {
      label: "پرسش و پاسخ",
      title: "پرسش‌های <highlight>متداول</highlight>",
      description:
        "پاسخ پرسش‌های رایج درباره فرایند توسعه، خدمات، فناوری‌ها، زمان همکاری و نحوه اجرای پروژه‌ها.",
      items: [
        {
          question: "روی چه نوع پروژه‌هایی کار می‌کنید؟",
          answer:
            "من وب‌سایت‌های مدرن، داشبوردهای مدیریتی، پلتفرم‌های تجاری، وب‌سایت‌های شخصی و برنامه‌های وب مقیاس‌پذیر را با تمرکز بر سرعت، طراحی واکنش‌گرا، امنیت و تجربه کاربری توسعه می‌دهم.",
        },
        {
          question: "بیشتر از چه فناوری‌هایی استفاده می‌کنید؟",
          answer:
            "فناوری‌های اصلی من شامل Next.js، React، TypeScript، NestJS، Tailwind CSS، PostgreSQL، MongoDB، Prisma و ابزارهای مدرن توسعه API هستند.",
        },
        {
          question: "آیا می‌توانید یک وب‌سایت یا برنامه موجود را بهبود دهید؟",
          answer:
            "بله. می‌توانم محصول فعلی را بررسی کنم، رابط کاربری آن را بهبود دهم، مشکلات واکنش‌گرایی را برطرف کنم، سرعت را افزایش دهم و ساختار کد را برای نگهداری و توسعه آینده بهتر سازمان‌دهی کنم.",
        },
        {
          question: "آیا رابط‌های کاربری واکنش‌گرا طراحی می‌کنید؟",
          answer:
            "بله. تمام رابط‌ها با رویکرد موبایل‌محور طراحی می‌شوند تا در تلفن همراه، تبلت، لپ‌تاپ و نمایشگرهای بزرگ عملکرد و ظاهر مناسبی داشته باشند.",
        },
        {
          question: "آیا می‌توانید با یک دیزاین سیستم موجود کار کنید؟",
          answer:
            "بله. می‌توانم دیزاین سیستم موجود را پیاده‌سازی یا بهبود دهم و برای آن کامپوننت‌های قابل استفاده مجدد، فاصله‌گذاری منظم، تایپوگرافی، رنگ‌ها و حالت‌های تعاملی استاندارد ایجاد کنم.",
        },
        {
          question: "آیا برای پروژه‌های فریلنسری یا همکاری آماده هستید؟",
          answer:
            "بله. برای پروژه‌های منتخب فریلنسری، موقعیت‌های توسعه فرانت‌اند، همکاری در توسعه محصول و فرصت‌های مرتبط با برنامه‌های مدرن وب و سیستم‌های امن آماده همکاری هستم.",
        },
      ],
    },
    contact: {
      title: "بیایید با هم همکاری کنیم",
      description:
        "در حال حاضر آماده همکاری در نقش‌های فرانت‌اند و فرصت‌های مشارکتی هستم. اگر پروژه‌ای در ذهن دارید، خوشحال می‌شوم صحبت کنیم.",
      email: "ایمیل",
      phone: "تلفن",
      linkedin: "لینکدین",
      github: "گیت‌هاب",
      telegram: "تلگرام",
      links: {
        email: {
          label: "ایمیل",
          value: "mohammadmobinkaram@gmail.com",
          href: "mailto:mohammadmobinkaram@gmail.com",
        },
        phone: {
          label: "تلفن",
          value: "۰۹۹۳۵۵۹۳۰۹۹",
          href: "tel:+989935593099",
        },
        linkedin: {
          label: "لینکدین",
          value: "LinkedIn",
          href: "https://www.linkedin.com/in/mobin-karam/",
        },
        github: {
          label: "گیت‌هاب",
          value: "GitHub",
          href: "https://github.com/Mobin-Karam",
        },
        telegram: {
          label: "تلگرام",
          value: "Telegram",
          href: "https://t.me/linoxch",
        },
      },
    },
  },
};

export function getHomeContent(locale: string): HomeContent {
  return locale.toLowerCase().startsWith("fa")
    ? homeContent.fa
    : homeContent.en;
}
