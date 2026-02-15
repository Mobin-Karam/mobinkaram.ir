import Link from "next/link";
import { Mail, Github, Linkedin, MessageCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/primitives";
import { locales, type Locale } from "@/i18n/config";

const contacts = [
  {
    label: "Email",
    href: "mailto:hello@mobinkaram.ir",
    icon: Mail,
    note: "Fastest way to reach me for collaborations.",
  },
  {
    label: "GitHub",
    href: "https://github.com/Mobin-Karam",
    icon: Github,
    note: "Code, experiments, and Koonj organization work.",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mobin-karam/",
    icon: Linkedin,
    note: "Professional profile and updates.",
  },
  {
    label: "Quera",
    href: "https://quera.org/profile/mobinkaram",
    icon: MessageCircle,
    note: "Persian community presence and Q&A.",
  },
];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function ContactPage({
  params,
}: {
  params: { locale: Locale };
}) {
  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="Contact"
        title="Let’s build something practical"
        description="I reply quickly to concise, technical messages. Best for architecture reviews, build help, or collaboration."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {contacts.map(({ label, href, icon: Icon, note }) => (
          <Link
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="flex items-start gap-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4 transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--surface-strong)] text-[color:var(--accent-strong)] shadow-inner">
              <Icon size={18} />
            </span>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-[color:var(--foreground)]">{label}</p>
              <p className="text-xs text-[color:var(--muted)]">{note}</p>
              <p className="text-[11px] text-[color:var(--accent-strong)] ltr-text">{href}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
