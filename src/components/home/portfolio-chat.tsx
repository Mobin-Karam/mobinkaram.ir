"use client";

import Image from "next/image";
import {
  FormEvent,
  KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";
import {
  ArrowDown,
  ArrowUp,
  Check,
  ChevronDown,
  CircleStop,
  Cpu,
  LockKeyhole,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { AnimatePresence, m } from "framer-motion";
import { useLocale } from "next-intl";

import { getHomeContent, type StorySectionKey } from "@/data/home-content";
import {
  askPortfolioBrain,
  type BrainReply,
} from "@/components/home/portfolio-brain";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  reply?: BrainReply;
};

type ThinkingStage = "idle" | "searching" | "matching" | "answering";

const STORAGE_KEY = "mobin-local-portfolio-chat-v2";

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function scrollToSection(section: StorySectionKey) {
  const id = section === "hero" ? "home" : section;

  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function stageLabel(stage: ThinkingStage, fa: boolean) {
  if (stage === "searching") {
    return fa ? "در حال جست‌وجوی دانش محلی…" : "Searching local knowledge…";
  }

  if (stage === "matching") {
    return fa
      ? "در حال پیدا کردن اطلاعات مرتبط…"
      : "Matching relevant portfolio facts…";
  }

  if (stage === "answering") {
    return fa ? "در حال ساخت پاسخ…" : "Building a grounded answer…";
  }

  return "";
}

function AssistantAvatar() {
  return (
    <span className="relative grid size-8 shrink-0 place-items-center overflow-hidden rounded-lg border border-border bg-background shadow-sm sm:size-9">
      <Image
        src="/favicon.png"
        alt=""
        fill
        sizes="36px"
        className="object-contain p-1"
      />
    </span>
  );
}

export function PortfolioChat() {
  const locale = useLocale();
  const content = getHomeContent(locale);
  const story = content.story;
  const fa = locale === "fa";

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [stage, setStage] = useState<ThinkingStage>("idle");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [mounted, setMounted] = useState(false);

  const endRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const runIdRef = useRef(0);

  const presets = useMemo(() => story.presets.slice(0, 6), [story.presets]);

  useEffect(() => {
    setMounted(true);

    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);

      if (!saved) return;

      const parsed = JSON.parse(saved) as ChatMessage[];

      if (Array.isArray(parsed)) {
        setMessages(parsed.slice(-30));
      }
    } catch {
      // Browser storage is optional.
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(messages.slice(-30)),
      );
    } catch {
      // Ignore private-mode/storage failures.
    }
  }, [messages, mounted]);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    window.requestAnimationFrame(() => {
      endRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    });
  }, [messages, stage, open]);

  useEffect(() => {
    if (!open) return;

    const timeout = window.setTimeout(() => {
      textareaRef.current?.focus();
    }, 160);

    return () => window.clearTimeout(timeout);
  }, [open]);

  function stopThinking() {
    runIdRef.current += 1;
    setStage("idle");
  }

  async function ask(question: string) {
    const trimmed = question.trim();

    if (!trimmed || stage !== "idle") {
      return;
    }

    const runId = ++runIdRef.current;

    setMessages((current) => [
      ...current,
      {
        id: makeId(),
        role: "user",
        content: trimmed,
      },
    ]);

    setInput("");
    setOpen(true);

    setStage("searching");
    await new Promise((resolve) => window.setTimeout(resolve, 260));
    if (runId !== runIdRef.current) return;

    setStage("matching");
    await new Promise((resolve) => window.setTimeout(resolve, 300));
    if (runId !== runIdRef.current) return;

    const reply = askPortfolioBrain(content, trimmed);

    setStage("answering");
    await new Promise((resolve) => window.setTimeout(resolve, 240));
    if (runId !== runIdRef.current) return;

    setMessages((current) => [
      ...current,
      {
        id: makeId(),
        role: "assistant",
        content: reply.answer,
        reply,
      },
    ]);

    setStage("idle");
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void ask(input);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  }

  function clearChat() {
    stopThinking();
    setMessages([]);

    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore.
    }
  }

  const hasConversation = messages.length > 0;

  return (
    <div dir={fa ? "rtl" : "ltr"} className="portfolio-chat-root">
      {open ? (
        <div className="portfolio-chat-screen">
          <header className="portfolio-chat-topbar">
            <div className="flex min-w-0 items-center gap-3">
              <AssistantAvatar />

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <strong className="truncate text-sm font-semibold tracking-[-0.01em]">
                    {story.assistantName}
                  </strong>

                  <span className="hidden items-center gap-1 rounded-full border border-border px-2 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline-flex">
                    <ShieldCheck className="size-3" />
                    {fa ? "محلی و خصوصی" : "Local & private"}
                  </span>
                </div>

                <p className="truncate text-[11px] text-muted-foreground">
                  {fa
                    ? "نسخه پاسخ‌گوی پورتفولیوی مبین"
                    : "Mobin’s portfolio replica"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {hasConversation ? (
                <button
                  type="button"
                  onClick={clearChat}
                  className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {fa ? "پاک کردن" : "Clear"}
                </button>
              ) : null}

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid size-9 place-items-center rounded-full border border-transparent text-muted-foreground transition-colors hover:border-border hover:bg-muted hover:text-foreground"
                aria-label={fa ? "بستن گفتگو" : "Close chat"}
              >
                <X className="size-4" />
              </button>
            </div>
          </header>

          <main className="portfolio-chat-messages">
            {!hasConversation ? (
              <div className="portfolio-chat-empty">
                <AssistantAvatar />

                <h2 className="mt-5 text-balance text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                  {fa ? "درباره مبین بپرسید" : "Ask about Mobin"}
                </h2>

                <p className="mx-auto mt-3 max-w-2xl text-pretty text-sm leading-7 text-muted-foreground sm:text-base">
                  {story.assistantGreeting}
                </p>

                <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground">
                  <LockKeyhole className="size-3.5 text-primary" />
                  <span>{story.assistantHint}</span>
                </div>

                <div className="mx-auto mt-8 grid w-full max-w-3xl gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {presets.map((preset) => (
                    <button
                      key={`${preset.target}-${preset.prompt}`}
                      type="button"
                      onClick={() => void ask(preset.prompt)}
                      className="group rounded-xl border border-border bg-card p-4 text-start transition-colors hover:border-primary/35 hover:bg-muted/45"
                    >
                      <span className="block text-sm font-semibold">
                        {preset.label}
                      </span>
                      <span className="mt-1.5 block text-xs leading-5 text-muted-foreground">
                        {preset.prompt}
                      </span>
                      <ArrowDown className="mt-3 size-3.5 -rotate-90 text-muted-foreground transition-transform group-hover:translate-x-0.5 rtl:rotate-90" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mx-auto w-full max-w-3xl space-y-7 py-6 sm:py-10">
                {messages.map((message) => (
                  <article
                    key={message.id}
                    className={[
                      "flex",
                      message.role === "user" ? "justify-end" : "justify-start",
                    ].join(" ")}
                  >
                    {message.role === "user" ? (
                      <div className="max-w-[88%] rounded-3xl rounded-ee-md bg-muted px-4 py-3 text-sm leading-6 sm:max-w-[75%]">
                        {message.content}
                      </div>
                    ) : (
                      <div className="flex w-full items-start gap-3">
                        <AssistantAvatar />

                        <div className="min-w-0 flex-1 pt-1">
                          <p className="whitespace-pre-line text-sm leading-7 text-foreground sm:text-[15px]">
                            {message.content}
                          </p>

                          {message.reply ? (
                            <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                              <span className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-1">
                                <Check className="size-3 text-success" />
                                {fa ? "پاسخ مستند" : "Grounded"}
                              </span>

                              <span className="rounded-full border border-border px-2 py-1">
                                {Math.round(message.reply.confidence * 100)}%{" "}
                                {fa ? "اطمینان" : "match"}
                              </span>
                            </div>
                          ) : null}

                          {message.reply?.sources.length ? (
                            <div className="mt-5">
                              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                                {fa ? "بخش‌های مرتبط" : "Related sections"}
                              </p>

                              <div className="flex flex-wrap gap-2">
                                {message.reply.sources.map((source) => (
                                  <button
                                    key={`${message.id}-${source.section}`}
                                    type="button"
                                    onClick={() => {
                                      setOpen(false);

                                      window.setTimeout(
                                        () => scrollToSection(source.section),
                                        180,
                                      );
                                    }}
                                    className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium transition-colors hover:border-primary/40 hover:text-primary"
                                  >
                                    <Search className="size-3" />
                                    <span>{source.label}</span>
                                    {source.detail ? (
                                      <span className="hidden text-muted-foreground sm:inline">
                                        · {source.detail}
                                      </span>
                                    ) : null}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ) : null}

                          {message.reply?.suggestedPrompts.length ? (
                            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                              {message.reply.suggestedPrompts
                                .slice(0, 3)
                                .map((prompt) => (
                                  <button
                                    key={`${message.id}-${prompt}`}
                                    type="button"
                                    onClick={() => void ask(prompt)}
                                    className="text-xs text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                                  >
                                    {prompt}
                                  </button>
                                ))}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    )}
                  </article>
                ))}

                {stage !== "idle" ? (
                  <div className="flex items-center gap-3">
                    <AssistantAvatar />

                    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-xs text-muted-foreground shadow-sm">
                      {stage === "searching" ? (
                        <Search className="size-3.5 animate-pulse" />
                      ) : stage === "matching" ? (
                        <Cpu className="size-3.5 animate-pulse" />
                      ) : (
                        <Sparkles className="size-3.5 animate-pulse" />
                      )}

                      <span>{stageLabel(stage, fa)}</span>

                      <span className="portfolio-thinking-dots">
                        <i />
                        <i />
                        <i />
                      </span>
                    </div>
                  </div>
                ) : null}

                <div ref={endRef} />
              </div>
            )}
          </main>

          <div className="portfolio-chat-full-composer">
            <div className="mx-auto w-full max-w-3xl">
              <Composer
                input={input}
                setInput={setInput}
                submit={submit}
                handleKeyDown={handleKeyDown}
                textareaRef={textareaRef}
                stage={stage}
                stopThinking={stopThinking}
                fa={fa}
                placeholder={story.assistantPlaceholder}
              />

              <div className="mt-2 flex items-center justify-center gap-2 text-[10px] text-muted-foreground">
                <ShieldCheck className="size-3" />
                <span>{story.trustItems.join(" • ")}</span>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {!open ? (
        <div className="portfolio-chat-dock">
          <Composer
            input={input}
            setInput={setInput}
            submit={submit}
            handleKeyDown={handleKeyDown}
            textareaRef={textareaRef}
            stage={stage}
            stopThinking={stopThinking}
            fa={fa}
            placeholder={story.assistantPlaceholder}
            onFocus={() => setOpen(true)}
          />

          <p className="mt-1.5 hidden text-center text-[10px] text-muted-foreground sm:block">
            {story.assistantHint}
          </p>
        </div>
      ) : null}
    </div>
  );
}

type ComposerProps = {
  input: string;
  setInput: (value: string) => void;
  submit: (event: FormEvent<HTMLFormElement>) => void;
  handleKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  stage: ThinkingStage;
  stopThinking: () => void;
  fa: boolean;
  placeholder: string;
  onFocus?: () => void;
};

function Composer({
  input,
  setInput,
  submit,
  handleKeyDown,
  textareaRef,
  stage,
  stopThinking,
  fa,
  placeholder,
  onFocus,
}: ComposerProps) {
  return (
    <form onSubmit={submit} className="portfolio-chat-composer">
      <button
        type="button"
        onClick={onFocus}
        className="portfolio-chat-brand-button"
        aria-label={fa ? "باز کردن گفتگوی پورتفولیو" : "Open portfolio chat"}
      >
        <AssistantAvatar />
      </button>

      <textarea
        ref={textareaRef}
        value={input}
        onFocus={onFocus}
        onChange={(event) => setInput(event.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        placeholder={placeholder}
        className="portfolio-chat-input"
      />

      <div className="hidden items-center gap-1 rounded-full px-2 py-1 text-[11px] font-medium text-muted-foreground sm:flex">
        <ShieldCheck className="size-3.5" />
        <span>{fa ? "Local" : "Local"}</span>
        <ChevronDown className="size-3" />
      </div>

      {stage !== "idle" ? (
        <button
          type="button"
          onClick={stopThinking}
          className="portfolio-chat-send"
          aria-label={fa ? "توقف" : "Stop"}
        >
          <CircleStop className="size-4" />
        </button>
      ) : (
        <button
          type="submit"
          disabled={!input.trim()}
          className="portfolio-chat-send disabled:opacity-35"
          aria-label={fa ? "ارسال" : "Send"}
        >
          <ArrowUp className="size-4" />
        </button>
      )}
    </form>
  );
}
