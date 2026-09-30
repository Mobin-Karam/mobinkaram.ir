export type TechLogo = {
  name: string;
  icon: string;
  className: string;
  size?: "sm" | "md" | "lg";
};

export const TECH_LOGOS: TechLogo[] = [
  {
    name: "ChatGPT",
    icon: "simple-icons:openai",
    className: "left-[13%] top-[8%]",
    size: "md",
  },
  {
    name: "Claude",
    icon: "simple-icons:claude",
    className: "right-[17%] top-[9%]",
    size: "md",
  },
  {
    name: "n8n",
    icon: "simple-icons:n8n",
    className: "left-[2%] top-[20%]",
    size: "lg",
  },
  {
    name: "NestJS",
    icon: "simple-icons:nestjs",
    className: "right-[3%] top-[18%]",
    size: "lg",
  },
  {
    name: "React",
    icon: "simple-icons:react",
    className: "left-[2%] top-[39%]",
    size: "md",
  },
  {
    name: "TypeScript",
    icon: "simple-icons:typescript",
    className: "right-[7%] top-[39%]",
    size: "md",
  },
  {
    name: "Python",
    icon: "simple-icons:python",
    className: "left-[4%] top-[58%]",
    size: "md",
  },
  {
    name: "Docker",
    icon: "simple-icons:docker",
    className: "right-[4%] top-[58%]",
    size: "md",
  },
  {
    name: "PostgreSQL",
    icon: "simple-icons:postgresql",
    className: "left-[17%] bottom-[15%]",
  },
  {
    name: "Prisma",
    icon: "simple-icons:prisma",
    className: "right-[18%] bottom-[14%]",
  },
  {
    name: "Kubernetes",
    icon: "simple-icons:kubernetes",
    className: "left-[33%] top-[14%]",
  },
  {
    name: "OWASP",
    icon: "simple-icons:owasp",
    className: "right-[34%] top-[13%]",
  },
  {
    name: "Tailwind CSS",
    icon: "simple-icons:tailwindcss",
    className: "left-[34%] bottom-[6%]",
  },
  {
    name: "Linux",
    icon: "simple-icons:linux",
    className: "right-[35%] bottom-[6%]",
  },
];

export const SIZE = {
  sm: "size-10 xl:size-11",
  md: "size-12 xl:size-14",
  lg: "size-14 xl:size-16",
} as const;
