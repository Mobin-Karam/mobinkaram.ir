"use client";

import type { HomeContent, StorySectionKey } from "@/data/home-content";

export type BrainLanguage = "en" | "fa" | "mixed" | "unsupported";

export type BrainIntent =
  | "greeting"
  | "identity"
  | "capabilities"
  | "skills"
  | "frontend"
  | "backend"
  | "database"
  | "mobile"
  | "devops"
  | "security"
  | "ai"
  | "projects"
  | "project-detail"
  | "results"
  | "experience"
  | "journey"
  | "testimonials"
  | "collaboration"
  | "contact"
  | "faq"
  | "unknown";

export type BrainSource = {
  section: StorySectionKey;
  label: string;
  detail?: string;
};

export type BrainReply = {
  answer: string;
  language: BrainLanguage;
  intent: BrainIntent;
  confidence: number;
  sources: BrainSource[];
  suggestedPrompts: string[];
};

type KnowledgeUnit = {
  id: string;
  section: StorySectionKey;
  title: string;
  text: string;
  keywords: string[];
  weight: number;
};

type RankedUnit = {
  unit: KnowledgeUnit;
  score: number;
};

const PERSIAN_CHARS = /[\u0600-\u06FF]/u;
const LATIN_CHARS = /[A-Za-z]/u;
const OTHER_SCRIPTS =
  /[\u0400-\u052F\u3040-\u30FF\u3400-\u9FFF\uAC00-\uD7AF\u0E00-\u0E7F\u0900-\u097F]/u;

const COMMON_PERSIAN_WORDS = new Set([
  // ─────────────────────────────────────────────
  // ضمایر
  // ─────────────────────────────────────────────
  "من",
  "تو",
  "او",
  "ما",
  "شما",
  "آنها",
  "ایشان",
  "خودم",
  "خودت",
  "خودش",
  "خودمان",
  "خودتان",
  "خودشان",

  // ─────────────────────────────────────────────
  // کلمات پرسشی
  // ─────────────────────────────────────────────
  "چی",
  "چیه",
  "چیست",
  "چه",
  "چرا",
  "چطور",
  "چطوری",
  "چگونه",
  "کجا",
  "کجاست",
  "کی",
  "کیه",
  "کدام",
  "کدوم",
  "چند",
  "چقدر",
  "چندتا",
  "چه‌طور",
  "چه‌جوری",

  // ─────────────────────────────────────────────
  // افعال بسیار رایج
  // ─────────────────────────────────────────────
  "است",
  "هست",
  "هستم",
  "هستی",
  "هستید",
  "هستیم",
  "هستن",
  "هستند",
  "بود",
  "بودم",
  "بودی",
  "بودیم",
  "بودید",
  "بودند",
  "باشد",
  "باشه",
  "باشم",
  "باشی",
  "باشید",

  "دارم",
  "داری",
  "داره",
  "داریم",
  "دارید",
  "دارند",
  "داشت",
  "داشتم",
  "داشتیم",

  "کن",
  "کنم",
  "کنی",
  "کنه",
  "کنید",
  "کنیم",
  "کنند",
  "کرد",
  "کردم",
  "کردی",
  "کرده",
  "کردیم",
  "کردید",
  "کردند",

  "بکن",
  "بکنم",
  "بکنی",
  "بکنید",
  "بکنیم",

  "می‌کنم",
  "میکنم",
  "می‌کنی",
  "میکنی",
  "می‌کند",
  "میکند",
  "می‌کنه",
  "میکنه",
  "می‌کنیم",
  "میکنیم",
  "می‌کنید",
  "میکنید",

  "شد",
  "شده",
  "شدم",
  "شدی",
  "شدیم",
  "شدید",
  "شدند",
  "بشه",
  "بشود",

  "می‌شه",
  "میشه",
  "می‌شود",
  "میشود",

  "بگو",
  "بگید",
  "بگویید",
  "گفت",
  "گفته",
  "میگه",
  "می‌گه",

  "بده",
  "بدید",
  "بدهید",
  "داد",
  "داده",

  "بگیر",
  "بگیرید",
  "گرفت",
  "گرفته",

  "ببین",
  "ببینم",
  "ببینید",
  "دید",
  "دیده",

  "بساز",
  "بسازم",
  "بسازی",
  "بسازید",
  "ساخت",
  "ساخته",

  "بزن",
  "بزنم",
  "بزنی",
  "بزنید",

  "برو",
  "برم",
  "بری",
  "برید",
  "رفته",

  "بیا",
  "بیام",
  "بیای",
  "بیاید",
  "اومد",
  "آمد",
  "آمده",

  "می‌خوام",
  "میخوام",
  "می‌خواهم",
  "میخواهم",
  "می‌خوای",
  "میخوای",
  "می‌خواهی",
  "میخواهی",

  "میتونی",
  "می‌تونی",
  "می‌توانی",
  "میتوانی",
  "میتونید",
  "می‌تونید",
  "می‌توانید",
  "میتوانید",

  // ─────────────────────────────────────────────
  // حروف اضافه
  // ─────────────────────────────────────────────
  "از",
  "به",
  "با",
  "در",
  "بر",
  "برای",
  "تا",
  "روی",
  "رو",
  "زیر",
  "بالا",
  "پایین",
  "داخل",
  "خارج",
  "بین",
  "میان",
  "کنار",
  "جلوی",
  "پشت",
  "نزدیک",
  "درباره",
  "مورد",
  "توی",
  "تو",
  "سمت",
  "طرف",

  // ─────────────────────────────────────────────
  // حروف ربط
  // ─────────────────────────────────────────────
  "و",
  "یا",
  "ولی",
  "اما",
  "اگر",
  "اگه",
  "پس",
  "چون",
  "که",
  "هم",
  "همچنین",
  "بعد",
  "قبل",
  "وقتی",
  "زمانی",
  "وقتی‌که",
  "ضمن",
  "حتی",

  // ─────────────────────────────────────────────
  // اشاره و تعیین‌کننده‌ها
  // ─────────────────────────────────────────────
  "این",
  "اون",
  "آن",
  "اینا",
  "اونا",
  "اینها",
  "آنها",
  "همین",
  "همون",
  "همان",
  "چنین",
  "هر",
  "همه",
  "هیچ",
  "بعضی",
  "برخی",
  "دیگر",
  "دیگه",

  // ─────────────────────────────────────────────
  // پاسخ‌ها و کلمات مکالمه‌ای
  // ─────────────────────────────────────────────
  "بله",
  "آره",
  "اره",
  "نه",
  "خیر",
  "باشه",
  "اوکی",
  "اوکیه",
  "خوب",
  "خب",
  "حالا",
  "الان",
  "فعلا",
  "فعلاً",
  "بعدا",
  "بعداً",
  "مثلا",
  "مثلاً",
  "یعنی",
  "خب",
  "البته",
  "حتما",
  "حتماً",
  "احتمالا",
  "احتمالاً",
  "واقعا",
  "واقعاً",
  "تقریبا",
  "تقریباً",

  // ─────────────────────────────────────────────
  // ادب و درخواست
  // ─────────────────────────────────────────────
  "لطفا",
  "لطفاً",
  "خواهش",
  "ممنون",
  "مرسی",
  "تشکر",
  "سپاس",
  "سلام",
  "درود",
  "خداحافظ",

  // ─────────────────────────────────────────────
  // صفات رایج
  // ─────────────────────────────────────────────
  "خوب",
  "بهتر",
  "بهترین",
  "بد",
  "بزرگ",
  "کوچک",
  "زیاد",
  "کم",
  "ساده",
  "سخت",
  "آسان",
  "جدید",
  "قدیمی",
  "کامل",
  "مهم",
  "اصلی",
  "خاص",
  "عمومی",
  "درست",
  "غلط",
  "ممکن",
  "لازم",
  "مناسب",
  "قوی",
  "ضعیف",
  "سریع",
  "کند",
  "حرفه‌ای",
  "حرفه ای",

  // ─────────────────────────────────────────────
  // زمان
  // ─────────────────────────────────────────────
  "امروز",
  "فردا",
  "دیروز",
  "الان",
  "اکنون",
  "صبح",
  "ظهر",
  "عصر",
  "شب",
  "روز",
  "هفته",
  "ماه",
  "سال",
  "زمان",
  "ساعت",
  "دقیقه",

  // ─────────────────────────────────────────────
  // مقدار
  // ─────────────────────────────────────────────
  "یک",
  "یکی",
  "دو",
  "سه",
  "چند",
  "چندتا",
  "خیلی",
  "زیاد",
  "کم",
  "تمام",
  "کل",
  "کامل",
  "بیشتر",
  "کمتر",
  "حدود",
  "تقریبا",
  "تقریباً",

  // ─────────────────────────────────────────────
  // کلمات مرتبط با کار و Portfolio
  // ─────────────────────────────────────────────
  "پروژه",
  "پروژه‌ها",
  "پروژه‌هایم",
  "نمونه",
  "نمونه‌کار",
  "نمونه‌کارها",
  "کار",
  "کارها",
  "مهارت",
  "مهارت‌ها",
  "تجربه",
  "تجربیات",
  "رزومه",
  "سوابق",
  "تخصص",
  "تخصص‌ها",
  "توانایی",
  "توانایی‌ها",
  "تکنولوژی",
  "تکنولوژی‌ها",
  "فناوری",
  "ابزار",
  "ابزارها",

  // ─────────────────────────────────────────────
  // برنامه‌نویسی و Software Engineering
  // ─────────────────────────────────────────────
  "برنامه",
  "برنامه‌نویسی",
  "برنامه نویسی",
  "کدنویسی",
  "کد",
  "نرم‌افزار",
  "نرم افزار",
  "توسعه",
  "توسعه‌دهنده",
  "توسعه دهنده",
  "طراحی",
  "ساخت",
  "پیاده‌سازی",
  "پیاده سازی",
  "معماری",
  "سیستم",
  "اپلیکیشن",
  "وب",
  "وبسایت",
  "وب‌سایت",
  "سایت",
  "فرانت‌اند",
  "فرانت اند",
  "بک‌اند",
  "بک اند",
  "فول‌استک",
  "فول استک",
  "دیتابیس",
  "پایگاه‌داده",
  "پایگاه داده",
  "سرور",
  "کلاینت",
  "API",
  "api",

  // ─────────────────────────────────────────────
  // تکنولوژی‌ها
  // ─────────────────────────────────────────────
  "React",
  "react",
  "Next",
  "next",
  "NextJS",
  "nextjs",
  "NestJS",
  "nestjs",
  "TypeScript",
  "typescript",
  "JavaScript",
  "javascript",
  "Python",
  "python",
  "Node",
  "node",
  "NodeJS",
  "nodejs",
  "Docker",
  "docker",
  "Kubernetes",
  "kubernetes",
  "PostgreSQL",
  "postgresql",
  "Linux",
  "linux",
  "Git",
  "git",
  "GitHub",
  "github",

  // ─────────────────────────────────────────────
  // امنیت سایبری
  // ─────────────────────────────────────────────
  "امنیت",
  "امنیتی",
  "سایبری",
  "امنیت‌سایبری",
  "امنیت سایبری",
  "شبکه",
  "شبکه‌ها",
  "SOC",
  "soc",
  "هک",
  "هکر",
  "آسیب‌پذیری",
  "آسیب پذیری",
  "تست‌نفوذ",
  "تست نفوذ",
  "نفوذ",
  "دفاع",
  "حمله",
  "تهدید",
  "رمزنگاری",
  "فایروال",
  "لینوکس",
  "CTF",
  "ctf",

  // ─────────────────────────────────────────────
  // AI
  // ─────────────────────────────────────────────
  "هوش",
  "مصنوعی",
  "هوش‌مصنوعی",
  "هوش مصنوعی",
  "AI",
  "ai",
  "مدل",
  "مدل‌ها",
  "عامل",
  "ایجنت",
  "Agent",
  "agent",
  "LLM",
  "llm",
  "اتوماسیون",
  "خودکارسازی",

  // ─────────────────────────────────────────────
  // ارتباط و استخدام
  // ─────────────────────────────────────────────
  "تماس",
  "ارتباط",
  "همکاری",
  "استخدام",
  "شغل",
  "کاری",
  "فرصت",
  "فرصت‌کاری",
  "فرصت کاری",
  "پیشنهاد",
  "شرکت",
  "تیم",
  "مشتری",
  "فریلنس",
  "فریلنسری",
  "ایمیل",
  "پیام",
  "لینکدین",
  "گیتهاب",

  // ─────────────────────────────────────────────
  // کلمات رایج در درخواست کاربران
  // ─────────────────────────────────────────────
  "معرفی",
  "معرفی‌کن",
  "معرفی کن",
  "نشون",
  "نشان",
  "نمایش",
  "لیست",
  "فهرست",
  "توضیح",
  "توضیح‌بده",
  "توضیح بده",
  "بگو",
  "بگوید",
  "اطلاعات",
  "جزئیات",
  "بیشتر",
  "درباره",
  "مربوط",
  "مرتبط",
  "مثال",
  "نمونه",
  "لینک",
  "آدرس",

  // ─────────────────────────────────────────────
  // ضمایر متصل/محاوره‌ای رایج
  // ─────────────────────────────────────────────
  "اینم",
  "اونم",
  "منم",
  "توام",
  "شماهم",
  "برام",
  "برات",
  "براش",
  "برامون",
  "براتون",
  "براشون",

  // ─────────────────────────────────────────────
  // filler words
  // ─────────────────────────────────────────────
  "خب",
  "خوب",
  "آها",
  "آخه",
  "راستی",
  "اصلا",
  "اصلاً",
  "کلا",
  "کلاً",
  "تقریبا",
  "تقریباً",
  "فقط",
  "حتی",
  "دیگه",
  "دیگر",
  "باز",
  "دوباره",
  "همیشه",
  "گاهی",
  "شاید",
  "احتمالا",
  "احتمالاً",
]);

const STOP_WORDS = new Set([
  // ─────────────────────────────────────────────
  // English — Articles / Determiners
  // ─────────────────────────────────────────────
  "a",
  "an",
  "the",
  "this",
  "that",
  "these",
  "those",
  "some",
  "any",
  "each",
  "every",
  "either",
  "neither",
  "both",
  "all",
  "another",
  "other",
  "others",
  "such",

  // ─────────────────────────────────────────────
  // English — Pronouns
  // ─────────────────────────────────────────────
  "i",
  "me",
  "my",
  "mine",
  "myself",

  "you",
  "your",
  "yours",
  "yourself",
  "yourselves",

  "he",
  "him",
  "his",
  "himself",

  "she",
  "her",
  "hers",
  "herself",

  "it",
  "its",
  "itself",

  "we",
  "us",
  "our",
  "ours",
  "ourselves",

  "they",
  "them",
  "their",
  "theirs",
  "themselves",

  "someone",
  "somebody",
  "something",
  "anyone",
  "anybody",
  "anything",
  "everyone",
  "everybody",
  "everything",
  "nobody",
  "nothing",

  // ─────────────────────────────────────────────
  // English — Question words
  // ─────────────────────────────────────────────
  "what",
  "whats",
  "what's",

  "when",
  "where",
  "which",
  "who",
  "whom",
  "whose",
  "why",
  "how",

  // ─────────────────────────────────────────────
  // English — Be verbs
  // ─────────────────────────────────────────────
  "am",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "being",

  // contractions after simple token normalization
  "im",
  "i'm",
  "youre",
  "you're",
  "hes",
  "he's",
  "shes",
  "she's",
  "its",
  "it's",
  "were",
  "we're",
  "theyre",
  "they're",
  "isnt",
  "isn't",
  "arent",
  "aren't",
  "wasnt",
  "wasn't",
  "werent",
  "weren't",

  // ─────────────────────────────────────────────
  // English — Auxiliary verbs
  // ─────────────────────────────────────────────
  "do",
  "does",
  "did",
  "doing",
  "done",

  "have",
  "has",
  "had",
  "having",

  "can",
  "could",
  "may",
  "might",
  "must",
  "shall",
  "should",
  "will",
  "would",

  "cannot",
  "cant",
  "can't",

  "couldnt",
  "couldn't",

  "shouldnt",
  "shouldn't",

  "wouldnt",
  "wouldn't",

  "wont",
  "won't",

  "dont",
  "don't",

  "doesnt",
  "doesn't",

  "didnt",
  "didn't",

  "havent",
  "haven't",

  "hasnt",
  "hasn't",

  "hadnt",
  "hadn't",

  // ─────────────────────────────────────────────
  // English — Prepositions
  // ─────────────────────────────────────────────
  "about",
  "above",
  "across",
  "after",
  "against",
  "along",
  "among",
  "around",
  "at",
  "before",
  "behind",
  "below",
  "beneath",
  "beside",
  "besides",
  "between",
  "beyond",
  "by",
  "down",
  "during",
  "for",
  "from",
  "in",
  "inside",
  "into",
  "near",
  "of",
  "off",
  "on",
  "onto",
  "out",
  "outside",
  "over",
  "through",
  "throughout",
  "to",
  "toward",
  "towards",
  "under",
  "underneath",
  "until",
  "up",
  "upon",
  "with",
  "within",
  "without",

  // ─────────────────────────────────────────────
  // English — Conjunctions
  // ─────────────────────────────────────────────
  "and",
  "or",
  "but",
  "so",
  "because",
  "although",
  "though",
  "while",
  "whereas",
  "if",
  "unless",
  "whether",
  "than",
  "then",
  "yet",
  "nor",

  // ─────────────────────────────────────────────
  // English — Common adverbs / filler words
  // ─────────────────────────────────────────────
  "also",
  "just",
  "only",
  "even",
  "really",
  "very",
  "quite",
  "rather",
  "too",
  "again",
  "already",
  "still",
  "ever",
  "never",
  "always",
  "sometimes",
  "usually",
  "often",
  "maybe",
  "perhaps",
  "probably",
  "possibly",
  "actually",
  "basically",
  "generally",
  "simply",
  "mostly",
  "almost",
  "enough",
  "much",
  "many",
  "more",
  "most",
  "less",
  "least",
  "few",
  "little",

  // ─────────────────────────────────────────────
  // English — Conversational / request noise
  // ─────────────────────────────────────────────
  "please",
  "pls",
  "plz",
  "thanks",
  "thank",
  "thankyou",

  "hello",
  "hi",
  "hey",

  "ok",
  "okay",
  "yeah",
  "yes",
  "no",
  "nope",

  "tell",
  "show",
  "give",
  "provide",
  "explain",
  "describe",
  "list",
  "find",
  "look",
  "see",
  "let",
  "know",

  // ─────────────────────────────────────────────
  // English — Generic request phrases
  // ─────────────────────────────────────────────
  "want",
  "wants",
  "wanted",

  "need",
  "needs",
  "needed",

  "like",
  "would",
  "help",

  "make",
  "makes",
  "made",

  "get",
  "gets",
  "got",

  // ─────────────────────────────────────────────
  // Persian — Pronouns
  // ─────────────────────────────────────────────
  "من",
  "تو",
  "او",
  "ما",
  "شما",
  "ایشان",
  "آنها",
  "اونا",

  "خود",
  "خودم",
  "خودت",
  "خودش",
  "خودمان",
  "خودمون",
  "خودتان",
  "خودتون",
  "خودشان",
  "خودشون",

  // ─────────────────────────────────────────────
  // Persian — Question words
  // ─────────────────────────────────────────────
  "چی",
  "چیه",
  "چیست",
  "چه",
  "چرا",

  "چطور",
  "چطوری",
  "چگونه",
  "چه‌طور",
  "چه طور",
  "چجوری",
  "چه‌جوری",

  "کجا",
  "کجاست",

  "کی",
  "کیه",
  "کدام",
  "کدوم",

  "چند",
  "چندتا",
  "چقدر",

  // ─────────────────────────────────────────────
  // Persian — Prepositions
  // ─────────────────────────────────────────────
  "از",
  "به",
  "با",
  "برای",
  "در",
  "بر",
  "تا",
  "روی",
  "رو",
  "زیر",
  "بالای",
  "پایین",
  "داخل",
  "خارج",
  "میان",
  "بین",
  "کنار",
  "نزدیک",
  "دور",
  "جلو",
  "جلوی",
  "پشت",
  "سمت",
  "طرف",
  "درباره",
  "راجع",
  "راجع‌به",
  "راجع به",
  "مورد",
  "توی",

  // ─────────────────────────────────────────────
  // Persian — Conjunctions
  // ─────────────────────────────────────────────
  "و",
  "یا",
  "اما",
  "ولی",
  "که",
  "اگر",
  "اگه",
  "چون",
  "پس",
  "هم",
  "همچنین",
  "نیز",
  "حتی",
  "ضمن",
  "وقتی",
  "زمانی",
  "بعد",
  "قبل",

  // ─────────────────────────────────────────────
  // Persian — Demonstratives / determiners
  // ─────────────────────────────────────────────
  "این",
  "اون",
  "آن",
  "اینا",
  "اونا",
  "اینها",
  "آنها",
  "همین",
  "همون",
  "همان",
  "چنین",
  "هر",
  "همه",
  "هیچ",
  "بعضی",
  "برخی",
  "دیگر",
  "دیگه",

  // ─────────────────────────────────────────────
  // Persian — Be verbs
  // ─────────────────────────────────────────────
  "است",
  "هست",
  "هستم",
  "هستی",
  "هستیم",
  "هستید",
  "هستند",
  "هستن",

  "بود",
  "بودم",
  "بودی",
  "بودیم",
  "بودید",
  "بودند",

  "باشد",
  "باشه",
  "باشم",
  "باشی",
  "باشیم",
  "باشید",
  "باشند",

  // ─────────────────────────────────────────────
  // Persian — Have
  // ─────────────────────────────────────────────
  "دارم",
  "داری",
  "داره",
  "داریم",
  "دارید",
  "دارند",

  "داشتم",
  "داشتی",
  "داشت",
  "داشتیم",
  "داشتید",
  "داشتند",

  // ─────────────────────────────────────────────
  // Persian — Common auxiliary verbs
  // ─────────────────────────────────────────────
  "شد",
  "شده",
  "شدم",
  "شدی",
  "شدیم",
  "شدید",
  "شدند",

  "بشه",
  "بشود",
  "بشود",
  "بشیم",
  "بشید",

  "میشه",
  "می‌شه",
  "میشود",
  "می‌شود",

  // ─────────────────────────────────────────────
  // Persian — Make / do
  // ─────────────────────────────────────────────
  "کن",
  "کنم",
  "کنی",
  "کنه",
  "کنیم",
  "کنید",
  "کنند",

  "کرد",
  "کردم",
  "کردی",
  "کرده",
  "کردیم",
  "کردید",
  "کردند",

  "بکن",
  "بکنم",
  "بکنی",
  "بکنه",
  "بکنیم",
  "بکنید",

  "میکنم",
  "می‌کنم",
  "میکنی",
  "می‌کنی",
  "میکنه",
  "می‌کنه",
  "میکند",
  "می‌کند",
  "میکنیم",
  "می‌کنیم",
  "میکنید",
  "می‌کنید",
  "میکنند",
  "می‌کنند",

  // ─────────────────────────────────────────────
  // Persian — Want / can
  // ─────────────────────────────────────────────
  "میخوام",
  "می‌خوام",
  "میخواهم",
  "می‌خواهم",

  "میخوای",
  "می‌خوای",
  "میخواهی",
  "می‌خواهی",

  "میخواید",
  "می‌خواید",
  "میخواهید",
  "می‌خواهید",

  "میتونم",
  "می‌تونم",
  "میتوانم",
  "می‌توانم",

  "میتونی",
  "می‌تونی",
  "میتوانی",
  "می‌توانی",

  "میتونید",
  "می‌تونید",
  "میتوانید",
  "می‌توانید",

  // ─────────────────────────────────────────────
  // Persian — Generic request verbs
  // ─────────────────────────────────────────────
  "بگو",
  "بگید",
  "بگویید",

  "بده",
  "بدید",
  "بدهید",

  "نشون",
  "نشان",
  "نمایش",

  "ببین",
  "ببینم",
  "ببینید",

  "بیار",
  "بیارید",
  "بیاور",
  "بیاورید",

  "بگیر",
  "بگیرم",
  "بگیرید",

  "بساز",
  "بسازم",
  "بسازی",
  "بسازید",

  "بزن",
  "بزنم",
  "بزنی",
  "بزنید",

  // ─────────────────────────────────────────────
  // Persian — Conversational noise
  // ─────────────────────────────────────────────
  "سلام",
  "درود",
  "خداحافظ",

  "لطفا",
  "لطفاً",

  "ممنون",
  "مرسی",
  "تشکر",
  "سپاس",

  "بله",
  "آره",
  "اره",
  "خیر",
  "نه",

  "باشه",
  "اوکی",
  "اوکیه",

  "خب",
  "خوب",
  "آها",
  "آخه",
  "حالا",
  "الان",
  "فعلا",
  "فعلاً",

  "راستی",
  "یعنی",
  "مثلا",
  "مثلاً",
  "اصلا",
  "اصلاً",
  "کلا",
  "کلاً",

  // ─────────────────────────────────────────────
  // Persian — Common modifiers / filler
  // ─────────────────────────────────────────────
  "فقط",
  "خیلی",
  "زیاد",
  "کم",
  "بیشتر",
  "کمتر",
  "تقریبا",
  "تقریباً",
  "حدود",

  "واقعا",
  "واقعاً",

  "احتمالا",
  "احتمالاً",

  "شاید",
  "حتما",
  "حتماً",

  "دوباره",
  "باز",
  "همیشه",
  "گاهی",

  // ─────────────────────────────────────────────
  // Persian — Common attached conversational forms
  // ─────────────────────────────────────────────
  "برام",
  "برات",
  "براش",
  "برامون",
  "براتون",
  "براشون",

  "منم",
  "توام",
  "اونم",
  "اینم",

  // ─────────────────────────────────────────────
  // Persian — Generic nouns that add little
  // ─────────────────────────────────────────────
  "چیز",
  "چیزی",
  "مورد",
  "موارد",
  "اطلاعات",
]);

const SYNONYMS: Record<string, string[]> = {
  backend: [
    "backend",
    "back-end",
    "server",
    "api",
    "rest",
    "nestjs",
    "nest",
    "jwt",
    "auth",
    "بک",
    "بک‌اند",
    "بک اند",
    "سرور",
    "ای‌پی‌آی",
    "api",
  ],
  frontend: [
    "frontend",
    "front-end",
    "ui",
    "ux",
    "react",
    "nextjs",
    "next.js",
    "tailwind",
    "html",
    "css",
    "فرانت",
    "فرانت‌اند",
    "فرانت اند",
    "رابط",
  ],
  security: [
    "security",
    "cyber",
    "cybersecurity",
    "owasp",
    "risk",
    "secure",
    "jwt",
    "امنیت",
    "سایبری",
    "ریسک",
    "ایمن",
  ],
  database: [
    "database",
    "db",
    "postgres",
    "postgresql",
    "mysql",
    "mongodb",
    "prisma",
    "orm",
    "دیتابیس",
    "پایگاه",
    "داده",
  ],
  mobile: [
    "mobile",
    "react native",
    "pwa",
    "tauri",
    "android",
    "ios",
    "موبایل",
    "اندروید",
    "اپلیکیشن",
  ],
  devops: [
    "devops",
    "docker",
    "linux",
    "kubernetes",
    "git",
    "deployment",
    "infra",
    "infrastructure",
    "دوآپس",
    "لینوکس",
    "داکر",
    "زیرساخت",
  ],
  ai: [
    "ai",
    "artificial intelligence",
    "chatgpt",
    "claude",
    "qwen",
    "kimi",
    "n8n",
    "agent",
    "automation",
    "هوش",
    "مصنوعی",
    "عامل",
    "اتوماسیون",
  ],
  project: [
    "project",
    "projects",
    "portfolio",
    "product",
    "build",
    "built",
    "پروژه",
    "پروژه‌ها",
    "نمونه",
    "محصول",
    "ساخت",
  ],
  result: [
    "result",
    "results",
    "seo",
    "speed",
    "performance",
    "metric",
    "achievement",
    "نتیجه",
    "دستاورد",
    "سئو",
    "سرعت",
    "عملکرد",
  ],
  experience: [
    "experience",
    "job",
    "career",
    "work",
    "company",
    "role",
    "تجربه",
    "سابقه",
    "شغل",
    "کار",
    "شرکت",
  ],
  contact: [
    "contact",
    "email",
    "phone",
    "linkedin",
    "github",
    "telegram",
    "hire",
    "reach",
    "تماس",
    "ایمیل",
    "تلفن",
    "تلگرام",
    "همکاری",
  ],
  learning: [
    "journey",
    "learning",
    "learn",
    "future",
    "roadmap",
    "network",
    "مسیر",
    "یادگیری",
    "آینده",
    "شبکه",
  ],
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[يى]/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/[\u200c\u200f\u200e]/g, " ")
    .replace(/[^\p{L}\p{N}+#./-]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokens(value: string) {
  return normalize(value)
    .split(" ")
    .filter(Boolean)
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

function unique<T>(values: T[]) {
  return Array.from(new Set(values));
}

function hasAny(value: string, candidates: string[]) {
  const normalized = normalize(value);

  return candidates.some((candidate) =>
    normalized.includes(normalize(candidate)),
  );
}

function detectLanguage(question: string): BrainLanguage {
  const normalized = normalize(question);

  if (!normalized) return "en";

  if (OTHER_SCRIPTS.test(question)) {
    return "unsupported";
  }

  const hasLatin = LATIN_CHARS.test(question);
  const hasArabicScript = PERSIAN_CHARS.test(question);

  if (hasLatin && hasArabicScript) {
    return "mixed";
  }

  if (hasLatin) {
    return "en";
  }

  if (hasArabicScript) {
    const words = normalized.split(" ");
    const hasPersianSpecificChar = /[پچژگک‌ی]/u.test(question);
    const hasPersianWord = words.some((word) => COMMON_PERSIAN_WORDS.has(word));

    return hasPersianSpecificChar || hasPersianWord ? "fa" : "unsupported";
  }

  return "unsupported";
}

function isFaReply(language: BrainLanguage, content: HomeContent) {
  if (language === "fa") return true;
  if (language === "en") return false;

  return content.story.assistantName.includes("راهنما");
}

function buildKnowledge(content: HomeContent): KnowledgeUnit[] {
  const units: KnowledgeUnit[] = [];

  units.push({
    id: "identity",
    section: "hero",
    title: content.story.sections.hero.label,
    text: content.story.sections.hero.message,
    keywords: [
      "mobin",
      "mobin karam",
      "who",
      "developer",
      "engineer",
      "full stack",
      "software",
      "مبین",
      "کیستی",
      "کیست",
      "مهندس",
      "توسعه دهنده",
    ],
    weight: 1.15,
  });

  Object.entries(content.skills.items).forEach(([key, skill]) => {
    units.push({
      id: `skill-${key}`,
      section: "skills",
      title: skill.name,
      text: `${skill.name} ${skill.level} ${skill.percent}%`,
      keywords: [
        key,
        skill.name,
        "skill",
        "technology",
        "stack",
        "مهارت",
        "تکنولوژی",
      ],
      weight: 1.25,
    });
  });

  Object.entries(content.skills.softSkills).forEach(([key, item]) => {
    units.push({
      id: `area-${key}`,
      section: "skills",
      title: item.title,
      text: item.desc,
      keywords: [key, item.title, ...Object.values(SYNONYMS).flat()],
      weight: 1.15,
    });
  });

  content.projects.items.forEach((project) => {
    units.push({
      id: `project-${project.id}`,
      section: "projects",
      title: project.name,
      text: `${project.description} ${project.stack.join(" ")}`,
      keywords: [
        project.name,
        project.id,
        ...project.stack,
        ...SYNONYMS.project,
      ],
      weight: 1.4,
    });
  });

  Object.entries(content.results.metrics).forEach(([key, metric]) => {
    units.push({
      id: `result-${key}`,
      section: "results",
      title: metric.label,
      text: `${metric.value} ${metric.label}`,
      keywords: [key, metric.value, metric.label, ...SYNONYMS.result],
      weight: 1.1,
    });
  });

  content.testimonials.items.forEach((item, index) => {
    units.push({
      id: `testimonial-${index}`,
      section: "testimonials",
      title: item.name,
      text: `${item.quote} ${item.role}`,
      keywords: [
        item.name,
        item.role,
        "testimonial",
        "feedback",
        "client",
        "نظر",
        "بازخورد",
        "مشتری",
      ],
      weight: 1,
    });
  });

  content.experience.jobs.forEach((job, index) => {
    units.push({
      id: `job-${index}`,
      section: "experience",
      title: `${job.title} — ${job.company}`,
      text: `${job.period} ${job.tasks.join(" ")}`,
      keywords: [job.title, job.company, job.period, ...SYNONYMS.experience],
      weight: 1.35,
    });
  });

  content.journey.steps.forEach((step, index) => {
    units.push({
      id: `journey-${index}`,
      section: "journey",
      title: step.name,
      text: `${step.subtitle} ${step.desc}`,
      keywords: [
        step.name,
        step.subtitle,
        ...SYNONYMS.learning,
        ...SYNONYMS.security,
      ],
      weight: step.current ? 1.3 : 1,
    });
  });

  content.faq.items.forEach((item, index) => {
    units.push({
      id: `faq-${index}`,
      section: "faq",
      title: item.question,
      text: item.answer,
      keywords: [
        item.question,
        "faq",
        "question",
        "work together",
        "responsive",
        "سوال",
        "همکاری",
      ],
      weight: 1,
    });
  });

  units.push({
    id: "contact",
    section: "contact",
    title: content.contact.title,
    text: [
      content.contact.description,
      content.contact.links.email.value,
      content.contact.links.phone.value,
      content.contact.links.linkedin.label,
      content.contact.links.github.label,
      content.contact.links.telegram.label,
    ].join(" "),
    keywords: SYNONYMS.contact,
    weight: 1.35,
  });

  return units;
}

function expandedTokens(question: string) {
  const queryTokens = tokens(question);
  const expanded = [...queryTokens];

  Object.entries(SYNONYMS).forEach(([concept, values]) => {
    if (values.some((value) => hasAny(question, [value]))) {
      expanded.push(concept);
      expanded.push(...tokens(values.join(" ")));
    }
  });

  return unique(expanded);
}

function scoreUnit(
  question: string,
  queryTokens: string[],
  unit: KnowledgeUnit,
) {
  const title = normalize(unit.title);
  const text = normalize(unit.text);
  const keywordText = normalize(unit.keywords.join(" "));
  let score = 0;

  for (const token of queryTokens) {
    if (title.includes(token)) score += 6;
    if (keywordText.includes(token)) score += 4;
    if (text.includes(token)) score += 1.5;
  }

  if (normalize(question).includes(title) && title.length > 2) {
    score += 8;
  }

  return score * unit.weight;
}

function rankKnowledge(content: HomeContent, question: string) {
  const queryTokens = expandedTokens(question);

  return buildKnowledge(content)
    .map((unit) => ({
      unit,
      score: scoreUnit(question, queryTokens, unit),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);
}

function detectIntent(question: string, ranked: RankedUnit[]): BrainIntent {
  const q = normalize(question);

  if (/^(hi|hello|hey|سلام|درود|hey there)\b/u.test(q)) {
    return "greeting";
  }

  if (
    hasAny(q, [
      "who are you",
      "who is mobin",
      "about you",
      "introduce yourself",
      "yourself",
      "کی هستی",
      "مبین کیست",
      "درباره خودت",
      "معرفی",
    ])
  ) {
    return "identity";
  }

  if (
    hasAny(q, [
      "can you build",
      "what can you build",
      "what do you do",
      "services",
      "capabilities",
      "چه میسازی",
      "چه کار میکنی",
      "چه کاری",
      "توانایی",
      "خدمات",
    ])
  ) {
    return "capabilities";
  }

  if (hasAny(q, SYNONYMS.contact)) {
    return hasAny(q, [
      "hire",
      "work together",
      "freelance",
      "collaborate",
      "همکاری",
      "استخدام",
      "فریلنس",
    ])
      ? "collaboration"
      : "contact";
  }

  if (hasAny(q, SYNONYMS.ai)) return "ai";
  if (hasAny(q, SYNONYMS.security)) return "security";
  if (hasAny(q, SYNONYMS.backend)) return "backend";
  if (hasAny(q, SYNONYMS.frontend)) return "frontend";
  if (hasAny(q, SYNONYMS.database)) return "database";
  if (hasAny(q, SYNONYMS.mobile)) return "mobile";
  if (hasAny(q, SYNONYMS.devops)) return "devops";

  const top = ranked[0]?.unit;

  if (top?.id.startsWith("project-")) {
    return "project-detail";
  }

  if (hasAny(q, SYNONYMS.project)) return "projects";
  if (hasAny(q, SYNONYMS.result)) return "results";
  if (hasAny(q, SYNONYMS.experience)) return "experience";
  if (hasAny(q, SYNONYMS.learning)) return "journey";

  if (
    hasAny(q, [
      "review",
      "testimonial",
      "feedback",
      "client say",
      "نظر",
      "بازخورد",
      "مشتری",
    ])
  ) {
    return "testimonials";
  }

  if (
    hasAny(q, [
      "faq",
      "question",
      "responsive",
      "existing project",
      "سوال",
      "ریسپانسیو",
      "پروژه موجود",
    ])
  ) {
    return "faq";
  }

  if (
    hasAny(q, [
      "skill",
      "skills",
      "stack",
      "technology",
      "technologies",
      "مهارت",
      "استک",
      "تکنولوژی",
    ])
  ) {
    return "skills";
  }

  if (top?.section === "skills") return "skills";
  if (top?.section === "projects") return "projects";
  if (top?.section === "results") return "results";
  if (top?.section === "experience") return "experience";
  if (top?.section === "journey") return "journey";
  if (top?.section === "contact") return "contact";
  if (top?.section === "faq") return "faq";
  if (top?.section === "testimonials") {
    return "testimonials";
  }

  return "unknown";
}

function sectionSource(
  content: HomeContent,
  section: StorySectionKey,
  detail?: string,
): BrainSource {
  return {
    section,
    label: content.story.sections[section].label,
    detail,
  };
}

function compactList(values: string[], fa: boolean) {
  const separator = fa ? "، " : ", ";
  return values.join(separator);
}

function skillsByArea(content: HomeContent, concept: keyof typeof SYNONYMS) {
  const aliases = SYNONYMS[concept];

  return Object.values(content.skills.softSkills).filter((item) =>
    hasAny(`${item.title} ${item.desc}`, aliases),
  );
}

function findSpecificProject(content: HomeContent, question: string) {
  const q = normalize(question);

  return content.projects.items.find((project) => {
    const name = normalize(project.name);
    const id = normalize(project.id);

    return (
      q.includes(name) ||
      q.includes(id) ||
      tokens(name).some((token) => q.includes(token))
    );
  });
}

function findSpecificJob(content: HomeContent, question: string) {
  const q = normalize(question);

  return content.experience.jobs.find((job) =>
    tokens(`${job.company} ${job.title}`).some(
      (token) => token.length > 3 && q.includes(token),
    ),
  );
}

function buildSuggestions(intent: BrainIntent, fa: boolean) {
  const en: Partial<Record<BrainIntent, string[]>> = {
    greeting: [
      "What can you build?",
      "Show me your projects",
      "What is your security experience?",
    ],
    identity: [
      "What can you build?",
      "What is your stack?",
      "Show your experience",
    ],
    skills: [
      "What backend technologies do you use?",
      "What about cybersecurity?",
      "Show me your projects",
    ],
    frontend: [
      "What backend technologies do you use?",
      "Show me frontend projects",
      "What results have you achieved?",
    ],
    backend: [
      "How do you work with databases?",
      "What security skills do you have?",
      "Show related experience",
    ],
    database: [
      "What backend stack do you use?",
      "Do you use Prisma?",
      "Show related experience",
    ],
    security: [
      "What are you learning now?",
      "Show cybersecurity experience",
      "What is your backend stack?",
    ],
    ai: [
      "How do you use AI in engineering?",
      "Show your technical skills",
      "What can you build?",
    ],
    projects: [
      "Tell me about Gulify",
      "What stack do you use?",
      "What results have you achieved?",
    ],
    experience: [
      "What did you do in backend?",
      "What is your security experience?",
      "Show projects",
    ],
    collaboration: [
      "How can I contact you?",
      "What can you build?",
      "Show your experience",
    ],
    contact: [
      "What can you build?",
      "Show projects",
      "What is your experience?",
    ],
  };

  const faMap: Partial<Record<BrainIntent, string[]>> = {
    greeting: [
      "چه چیزهایی می‌سازی؟",
      "پروژه‌هایت را نشان بده",
      "تجربه امنیتی‌ات چیست؟",
    ],
    identity: [
      "چه چیزهایی می‌سازی؟",
      "استک فنی‌ات چیست؟",
      "تجربه کارت را نشان بده",
    ],
    skills: [
      "برای بک‌اند از چه چیزهایی استفاده می‌کنی؟",
      "در امنیت چه مهارتی داری؟",
      "پروژه‌هایت را نشان بده",
    ],
    frontend: [
      "بک‌اندت چطور است؟",
      "پروژه‌های فرانت‌اند را نشان بده",
      "چه نتایجی ساخته‌ای؟",
    ],
    backend: [
      "با دیتابیس چطور کار می‌کنی؟",
      "مهارت امنیتی‌ات چیست؟",
      "تجربه مرتبط را نشان بده",
    ],
    database: [
      "استک بک‌اندت چیست؟",
      "از Prisma استفاده می‌کنی؟",
      "تجربه مرتبط را نشان بده",
    ],
    security: [
      "الان چه چیزی یاد می‌گیری؟",
      "تجربه امنیت سایبری را نشان بده",
      "استک بک‌اندت چیست؟",
    ],
    ai: [
      "چطور از AI در مهندسی استفاده می‌کنی؟",
      "مهارت‌های فنی را نشان بده",
      "چه چیزهایی می‌سازی؟",
    ],
    projects: [
      "درباره Gulify بگو",
      "از چه استکی استفاده می‌کنی؟",
      "چه نتایجی ساخته‌ای؟",
    ],
    experience: [
      "در بک‌اند چه کار کردی؟",
      "تجربه امنیتی‌ات چیست؟",
      "پروژه‌ها را نشان بده",
    ],
    collaboration: [
      "چطور با تو تماس بگیرم؟",
      "چه چیزهایی می‌سازی؟",
      "تجربه کارت را نشان بده",
    ],
    contact: [
      "چه چیزهایی می‌سازی؟",
      "پروژه‌ها را نشان بده",
      "تجربه کارت چیست؟",
    ],
  };

  return (
    (fa ? faMap[intent] : en[intent]) ??
    (fa
      ? ["مهارت‌هایت چیست؟", "پروژه‌ها را نشان بده", "چطور تماس بگیرم؟"]
      : ["What are your skills?", "Show projects", "How can I contact you?"])
  );
}

function answerForIntent(
  content: HomeContent,
  question: string,
  language: BrainLanguage,
  intent: BrainIntent,
  ranked: RankedUnit[],
): BrainReply {
  const fa = isFaReply(language, content);
  const specificProject = findSpecificProject(content, question);
  const specificJob = findSpecificJob(content, question);

  const topSources = unique(
    ranked.slice(0, 4).map((item) => item.unit.section),
  ).slice(0, 3);

  const sources: BrainSource[] = topSources.map((section) =>
    sectionSource(content, section),
  );

  let answer = "";
  let explicitSources = sources;

  switch (intent) {
    case "greeting":
      answer = fa
        ? "سلام. من نسخه محلی پورتفولیوی مبین هستم. می‌توانم درباره مهارت‌ها، پروژه‌ها، تجربه کاری، NestJS و بک‌اند، فرانت‌اند، دیتابیس، امنیت سایبری، مسیر یادگیری، نتایج و راه‌های همکاری پاسخ بدهم."
        : "Hi. I’m Mobin’s local portfolio assistant. I can answer about his skills, projects, experience, NestJS/backend work, frontend, databases, cybersecurity, learning path, results, and how to work with him.";
      explicitSources = [sectionSource(content, "hero")];
      break;

    case "identity":
      answer = fa
        ? `مبین یک مهندس نرم‌افزار و توسعه‌دهنده فول‌استک است که روی Next.js، React، TypeScript و NestJS کار می‌کند و نگاه امنیتی و ابزارهای AI را هم وارد فرایند مهندسی می‌کند. ${content.story.sections.hero.message}`
        : `Mobin is a software engineer and full-stack developer working with Next.js, React, TypeScript, and NestJS, while bringing security thinking and AI-assisted engineering into the workflow. ${content.story.sections.hero.message}`;
      explicitSources = [
        sectionSource(content, "hero"),
        sectionSource(content, "skills"),
      ];
      break;

    case "capabilities":
      answer = fa
        ? `بر اساس اطلاعات این پورتفولیو، مبین می‌تواند روی رابط‌های وب مدرن و واکنش‌گرا، فرانت‌اند با Next.js و React، بک‌اند ماژولار با NestJS، PostgreSQL و Prisma، احراز هویت، PWA/موبایل، بهینه‌سازی عملکرد و کارهای مرتبط با امنیت سایبری کار کند. برای کاری که خارج از این موارد باشد، این دستیار ادعا نمی‌کند مگر اینکه در پورتفولیو ثبت شده باشد.`
        : `Based on this portfolio, Mobin can work on modern responsive web interfaces, Next.js/React frontend engineering, modular NestJS backends, PostgreSQL and Prisma, authentication, PWA/mobile work, performance optimization, and cybersecurity-related engineering. For work outside that evidence, this assistant won’t claim experience that isn’t recorded here.`;
      explicitSources = [
        sectionSource(content, "skills"),
        sectionSource(content, "projects"),
        sectionSource(content, "experience"),
      ];
      break;

    case "frontend": {
      const names = Object.values(content.skills.items)
        .filter((item) => hasAny(item.name, SYNONYMS.frontend))
        .map((item) => item.name);

      answer = fa
        ? `در فرانت‌اند، استک ثبت‌شده شامل ${compactList(names, true)} است. تجربه کاری هم شامل ساخت اپلیکیشن‌های مدرن با React، Next.js و TypeScript، رابط واکنش‌گرا با Tailwind/CSS و بهینه‌سازی Core Web Vitals است.`
        : `For frontend work, the recorded stack includes ${compactList(names, false)}. The experience section also lists modern React/Next.js/TypeScript applications, responsive Tailwind/CSS interfaces, and Core Web Vitals optimization.`;
      explicitSources = [
        sectionSource(content, "skills", "Frontend stack"),
        sectionSource(content, "experience", "Frontend experience"),
      ];
      break;
    }

    case "backend": {
      const areas = skillsByArea(content, "backend");

      answer = fa
        ? `تمرکز بک‌اند ثبت‌شده روی NestJS، PostgreSQL، Prisma ORM، REST API، JWT/احراز هویت، اعتبارسنجی و معماری ماژولار است.${areas[0] ? ` ${areas[0].desc}` : ""}`
        : `The recorded backend focus is NestJS, PostgreSQL, Prisma ORM, REST APIs, JWT/authentication, validation, and modular service architecture.${areas[0] ? ` ${areas[0].desc}` : ""}`;
      explicitSources = [
        sectionSource(content, "skills", "Backend & API"),
        sectionSource(content, "experience", "Backend role"),
      ];
      break;
    }

    case "database": {
      const area = Object.values(content.skills.softSkills).find((item) =>
        hasAny(`${item.title} ${item.desc}`, SYNONYMS.database),
      );

      answer = fa
        ? `در بخش دیتابیس، پورتفولیو PostgreSQL، MongoDB، MySQL و Prisma ORM را ثبت کرده است.${area ? ` ${area.desc}` : ""}`
        : `For databases, the portfolio records PostgreSQL, MongoDB, MySQL, and Prisma ORM.${area ? ` ${area.desc}` : ""}`;
      explicitSources = [
        sectionSource(content, "skills", "Database management"),
        sectionSource(content, "experience"),
      ];
      break;
    }

    case "mobile": {
      const area = skillsByArea(content, "mobile")[0];

      answer = fa
        ? `در موبایل و تجربه‌های نزدیک به آن، پورتفولیو React Native و PWA را ثبت کرده است.${area ? ` ${area.desc}` : ""}`
        : `For mobile and adjacent app work, the portfolio records React Native and Progressive Web Applications.${area ? ` ${area.desc}` : ""}`;
      explicitSources = [
        sectionSource(content, "skills", "Mobile development"),
        sectionSource(content, "experience"),
      ];
      break;
    }

    case "devops":
      answer = fa
        ? "در ابزار و زیرساخت، موارد ثبت‌شده شامل Linux، Docker، Git، Python و آشنایی با ابزارهای توسعه مدرن است. Kubernetes نیز در فضای تکنولوژی پورتفولیو نمایش داده می‌شود؛ این دستیار فقط همان سطحی را ادعا می‌کند که در داده‌های سایت ثبت شده است."
        : "For tooling and infrastructure, the recorded experience includes Linux, Docker, Git, Python, and modern development tooling. Kubernetes is also represented in the portfolio’s technology space; this assistant only claims the level supported by the site data.";
      explicitSources = [
        sectionSource(content, "skills", "Development tools"),
        sectionSource(content, "journey"),
      ];
      break;

    case "security":
      answer = fa
        ? `امنیت سایبری یک مسیر جدی در تجربه و یادگیری مبین است. تجربه ثبت‌شده شامل تحلیل و مدیریت ریسک، امنیت اینترنت و زیرساخت، JWT و سیستم‌های امن است و مسیر یادگیری نیز روی شبکه، امنیت و طراحی سیستم امن ادامه دارد.`
        : `Cybersecurity is a serious part of Mobin’s experience and learning direction. The recorded work includes risk analysis/management, internet and infrastructure security, JWT and secure systems, while the learning path continues into networking, security, and secure system design.`;
      explicitSources = [
        sectionSource(content, "experience", "Cybersecurity role"),
        sectionSource(content, "skills", "Cybersecurity"),
        sectionSource(content, "journey", "Security learning path"),
      ];
      break;

    case "ai":
      answer = fa
        ? "در این پورتفولیو، AI به‌عنوان بخشی از فرایند مهندسی و اتوماسیون دیده می‌شود، نه جایگزین مهندسی. مبین از ابزارهای AI برای کمک به طراحی، توسعه، تحلیل و سرعت‌دادن به workflow استفاده می‌کند؛ اما این مغز محلی خودش یک LLM خارجی نیست و پاسخ‌ها را فقط از داده‌های سایت می‌سازد."
        : "In this portfolio, AI is treated as part of the engineering and automation workflow rather than a replacement for engineering. Mobin uses AI-assisted tools to support design, development, analysis, and workflow speed; this local brain itself is not an external LLM and builds answers only from site data.";
      explicitSources = [
        sectionSource(content, "hero", "AI-assisted engineering"),
        sectionSource(content, "skills"),
      ];
      break;

    case "project-detail":
      if (specificProject) {
        answer = fa
          ? `${specificProject.name}: ${specificProject.description}. استک ثبت‌شده این پروژه شامل ${compactList(specificProject.stack, true)} است.${specificProject.demo ? " نسخه آنلاین هم در پورتفولیو لینک شده است." : ""}`
          : `${specificProject.name}: ${specificProject.description}. Its recorded stack includes ${compactList(specificProject.stack, false)}.${specificProject.demo ? " A live version is also linked from the portfolio." : ""}`;
        explicitSources = [
          sectionSource(content, "projects", specificProject.name),
        ];
      } else {
        answer = content.story.sections.projects.message;
        explicitSources = [sectionSource(content, "projects")];
      }
      break;

    case "projects":
      answer = fa
        ? `پروژه‌های ثبت‌شده فعلی: ${compactList(
            content.projects.items.map((project) => project.name),
            true,
          )}. ${content.projects.description}`
        : `Currently recorded projects: ${compactList(
            content.projects.items.map((project) => project.name),
            false,
          )}. ${content.projects.description}`;
      explicitSources = [sectionSource(content, "projects")];
      break;

    case "results":
      answer = fa
        ? `نتایج ثبت‌شده شامل ${Object.values(content.results.metrics)
            .map((metric) => `${metric.value} ${metric.label}`)
            .join("؛ ")} است.`
        : `Recorded results include ${Object.values(content.results.metrics)
            .map((metric) => `${metric.value} ${metric.label}`)
            .join("; ")}.`;
      explicitSources = [sectionSource(content, "results")];
      break;

    case "experience":
      if (specificJob) {
        answer = fa
          ? `${specificJob.title} در ${specificJob.company} — ${specificJob.period}. کارهای ثبت‌شده این نقش: ${specificJob.tasks.join("؛ ")}.`
          : `${specificJob.title} at ${specificJob.company} — ${specificJob.period}. Recorded work in this role: ${specificJob.tasks.join("; ")}.`;
      } else {
        answer = fa
          ? `تجربه‌های ثبت‌شده شامل ${content.experience.jobs
              .map((job) => `${job.title} در ${job.company}`)
              .join(
                "، ",
              )} است. این تجربه بین فرانت‌اند، بک‌اند/API و امنیت سایبری پخش شده است.`
          : `Recorded experience includes ${content.experience.jobs
              .map((job) => `${job.title} at ${job.company}`)
              .join(
                ", ",
              )}. The experience spans frontend, backend/API work, and cybersecurity.`;
      }
      explicitSources = [
        sectionSource(content, "experience", specificJob?.company),
      ];
      break;

    case "journey":
      answer = fa
        ? `مسیر یادگیری ثبت‌شده از پایه‌های وب شروع شده و به توسعه فول‌استک، شبکه و امنیت سایبری ادامه پیدا می‌کند. بخش‌های فعلی/آینده: ${compactList(
            content.journey.steps
              .filter((step) => step.current || step.future)
              .map((step) => step.name),
            true,
          )}.`
        : `The recorded learning journey starts from web fundamentals and extends into full-stack engineering, networking, and cybersecurity. Current/future focus: ${compactList(
            content.journey.steps
              .filter((step) => step.current || step.future)
              .map((step) => step.name),
            false,
          )}.`;
      explicitSources = [sectionSource(content, "journey")];
      break;

    case "testimonials":
      answer = fa
        ? content.testimonials.items
            .map((item) => `${item.name} (${item.role}): «${item.quote}»`)
            .join("\n\n")
        : content.testimonials.items
            .map((item) => `${item.name} (${item.role}): “${item.quote}”`)
            .join("\n\n");
      explicitSources = [sectionSource(content, "testimonials")];
      break;

    case "collaboration":
      answer = fa
        ? `برای همکاری، بهترین نقطه شروع توضیح کوتاه درباره محصول، مشکل یا نقش موردنظر است. بر اساس پورتفولیو، مبین برای کارهایی که به توسعه محصول وب، Next.js/React، NestJS، دیتابیس، عملکرد و نگاه امنیتی نیاز دارند مناسب‌تر است. راه‌های تماس در بخش تماس قرار دارند.`
        : `For collaboration, the best starting point is a short description of the product, problem, or role. Based on this portfolio, Mobin is best aligned with work involving web product engineering, Next.js/React, NestJS, databases, performance, and security-aware development. Contact channels are available in the Contact section.`;
      explicitSources = [
        sectionSource(content, "skills"),
        sectionSource(content, "experience"),
        sectionSource(content, "contact"),
      ];
      break;

    case "contact":
      answer = fa
        ? `راه‌های تماس ثبت‌شده: ایمیل ${content.contact.links.email.value}، تلفن ${content.contact.links.phone.value}، و لینک‌های LinkedIn، GitHub و Telegram در بخش تماس.`
        : `Recorded contact options: email ${content.contact.links.email.value}, phone ${content.contact.links.phone.value}, plus LinkedIn, GitHub, and Telegram links in the Contact section.`;
      explicitSources = [sectionSource(content, "contact")];
      break;

    case "faq": {
      const topFaq = ranked.find((item) => item.unit.id.startsWith("faq-"));
      const index = topFaq ? Number(topFaq.unit.id.replace("faq-", "")) : -1;
      const item = index >= 0 ? content.faq.items[index] : undefined;

      answer = item
        ? `${item.question}\n\n${item.answer}`
        : content.story.sections.faq.message;

      explicitSources = [sectionSource(content, "faq")];
      break;
    }

    case "skills":
    default:
      answer = fa
        ? `مهارت‌های فنی ثبت‌شده شامل ${compactList(
            Object.values(content.skills.items).map((item) => item.name),
            true,
          )} است. حوزه‌های تکمیلی هم شامل ${compactList(
            Object.values(content.skills.softSkills).map((item) => item.title),
            true,
          )} می‌شود.`
        : `Recorded technical skills include ${compactList(
            Object.values(content.skills.items).map((item) => item.name),
            false,
          )}. Complementary areas include ${compactList(
            Object.values(content.skills.softSkills).map((item) => item.title),
            false,
          )}.`;
      explicitSources = [sectionSource(content, "skills")];
      break;
  }

  const topScore = ranked[0]?.score ?? 0;
  const confidence =
    intent === "unknown"
      ? 0.25
      : Math.min(0.98, 0.62 + Math.min(topScore, 20) / 60);

  return {
    answer,
    language,
    intent,
    confidence,
    sources: uniqueSources(explicitSources),
    suggestedPrompts: buildSuggestions(intent, fa),
  };
}

function uniqueSources(sources: BrainSource[]) {
  const seen = new Set<StorySectionKey>();

  return sources.filter((source) => {
    if (seen.has(source.section)) return false;
    seen.add(source.section);
    return true;
  });
}

export function askPortfolioBrain(
  content: HomeContent,
  question: string,
): BrainReply {
  const language = detectLanguage(question);

  if (language === "unsupported") {
    return {
      answer: content.story.unsupportedLanguage,
      language,
      intent: "unknown",
      confidence: 1,
      sources: [],
      suggestedPrompts: [
        "What can you build?",
        "Show me your projects",
        "مهارت‌هایت چیست؟",
        "تجربه کارت را نشان بده",
      ],
    };
  }

  const ranked = rankKnowledge(content, question);

  const intent = detectIntent(question, ranked);

  if (intent === "unknown" && (!ranked[0] || ranked[0].score < 2.5)) {
    const fa = isFaReply(language, content);

    return {
      answer: fa
        ? `${content.story.unknownPrompt} اگر سؤال درباره موضوعی خارج از اطلاعات این پورتفولیو باشد، من حدس نمی‌زنم و پاسخ ساختگی نمی‌دهم.`
        : `${content.story.unknownPrompt} If the question is outside the information in this portfolio, I won’t guess or invent an answer.`,
      language,
      intent: "unknown",
      confidence: 0.2,
      sources: [],
      suggestedPrompts: buildSuggestions("greeting", fa),
    };
  }

  return answerForIntent(content, question, language, intent, ranked);
}
