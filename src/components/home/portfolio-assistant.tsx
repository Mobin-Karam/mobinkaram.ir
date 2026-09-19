"use client";

import {
  useMemo,
  useState,
  type FormEvent,
} from "react";
import {
  Bot,
  ChevronDown,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { AnimatePresence, m } from "framer-motion";
import { useLocale } from "next-intl";

import {
  getHomeContent,
  type StorySectionKey,
} from "@/data/home-content";

const SECTION_WORDS: Record<StorySectionKey, string[]> = {
  hero: ["home", "start", "hero", "intro", "خانه", "شروع"],
  skills: [
    "skill",
    "skills",
    "stack",
    "nestjs",
    "nextjs",
    "react",
    "backend",
    "frontend",
    "مهارت",
    "بک",
    "فرانت",
  ],
  projects: [
    "project",
    "projects",
    "work",
    "portfolio",
    "پروژه",
    "نمونه",
  ],
  results: [
    "result",
    "results",
    "metric",
    "seo",
    "speed",
    "نتیجه",
    "سئو",
    "سرعت",
  ],
  testimonials: [
    "testimonial",
    "review",
    "client",
    "feedback",
    "نظر",
    "مشتری",
    "بازخورد",
  ],
  experience: [
    "experience",
    "job",
    "work history",
    "career",
    "تجربه",
    "سابقه",
    "کار",
  ],
  journey: [
    "journey",
    "learn",
    "learning",
    "security",
    "cyber",
    "network",
    "مسیر",
    "یادگیری",
    "امنیت",
    "شبکه",
  ],
  faq: [
    "faq",
    "question",
    "questions",
    "help",
    "سوال",
    "پرسش",
  ],
  contact: [
    "contact",
    "email",
    "phone",
    "hire",
    "work together",
    "تماس",
    "ایمیل",
    "همکاری",
  ],
};

function findTarget(input: string): StorySectionKey | null {
  const normalized = input.trim().toLowerCase();

  if (!normalized) return null;

  for (const [section, words] of Object.entries(
    SECTION_WORDS,
  ) as Array<[StorySectionKey, string[]]>) {
    if (words.some((word) => normalized.includes(word))) {
      return section;
    }
  }

  return null;
}

function scrollToSection(target: StorySectionKey) {
  document
    .getElementById(target === "hero" ? "home" : target)
    ?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
}

export function PortfolioAssistant() {
  const locale = useLocale();
  const content = getHomeContent(locale).story;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [status, setStatus] = useState(
    content.assistantGreeting,
  );

  const direction =
    locale === "fa" || locale === "ar" || locale === "ku"
      ? "rtl"
      : "ltr";

  const presets = useMemo(
    () => content.presets.slice(0, 5),
    [content.presets],
  );

  function navigate(
    target: StorySectionKey,
    prompt?: string,
  ) {
    setStatus(content.sections[target].message);
    setValue(prompt ?? "");
    scrollToSection(target);
    setOpen(false);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const target = findTarget(value);

    if (!target) {
      setStatus(content.unknownPrompt);
      return;
    }

    setStatus(
      content.sections[target].message,
    );

    scrollToSection(target);

    window.setTimeout(() => {
      setOpen(false);
    }, 240);
  }

  return (
    <div
      dir={direction}
      className="portfolio-assistant"
    >
      <AnimatePresence initial={false}>
        {open ? (
          <m.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            transition={{
              duration: 0.22,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="portfolio-assistant__panel"
          >
            <header className="flex items-start justify-between gap-4 border-b border-border/70 p-4">
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Sparkles className="size-4" />
                </span>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">
                    {content.assistantName}
                  </p>
                  <p className="truncate text-[11px] text-muted-foreground">
                    {content.assistantRole}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid size-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Close portfolio guide"
              >
                <X className="size-4" />
              </button>
            </header>

            <div className="max-h-[min(54vh,420px)] overflow-y-auto p-4">
              <div className="rounded-2xl rounded-ss-md bg-muted px-4 py-3 text-sm leading-6">
                {status}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {presets.map((preset) => (
                  <button
                    key={preset.target}
                    type="button"
                    onClick={() =>
                      navigate(
                        preset.target,
                        preset.prompt,
                      )
                    }
                    className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <form
              onSubmit={submit}
              className="border-t border-border/70 p-3"
            >
              <div className="flex items-end gap-2 rounded-2xl border border-border bg-background p-2 focus-within:border-primary/50">
                <textarea
                  value={value}
                  onChange={(event) =>
                    setValue(event.target.value)
                  }
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter" &&
                      !event.shiftKey
                    ) {
                      event.preventDefault();
                      event.currentTarget.form?.requestSubmit();
                    }
                  }}
                  rows={1}
                  placeholder={content.assistantPlaceholder}
                  className="max-h-28 min-h-9 flex-1 resize-none bg-transparent px-2 py-1.5 text-sm outline-none placeholder:text-muted-foreground"
                />

                <button
                  type="submit"
                  className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground"
                  aria-label="Go"
                >
                  <Send className="size-4" />
                </button>
              </div>

              <p className="mt-2 px-1 text-[10px] leading-4 text-muted-foreground">
                {content.assistantHint}
              </p>
            </form>
          </m.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="portfolio-assistant__trigger"
        aria-expanded={open}
        aria-label={content.assistantName}
      >
        <Bot className="size-5" />
        <span className="hidden text-xs font-semibold sm:inline">
          {content.assistantName}
        </span>
        <ChevronDown
          className={[
            "hidden size-3.5 transition-transform sm:block",
            open ? "rotate-180" : "",
          ].join(" ")}
        />
      </button>
    </div>
  );
}
