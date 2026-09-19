"use client";

import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { useLocale } from "next-intl";

import { getHomeContent } from "@/data/home-content";
import { SectionGuide } from "@/components/home/section-guide";
import { SectionHeading } from "@/components/home/section-heading";

export function ContactSection() {
  const locale = useLocale();
  const content = getHomeContent(locale).contact;

  return (
    <div className="story-shell">
      <div className="story-grid">
        <div className="story-main">
          <SectionHeading
            eyebrow="08 / Let's talk"
            title={content.title}
            description={content.description}
          />

          <a
            href={content.links.email.href}
            className="group mt-7 inline-flex items-center gap-3 border-b border-foreground/25 pb-2 text-base font-semibold hover:border-primary hover:text-primary sm:text-lg"
          >
            <Mail className="size-5" />
            <span className="break-all">{content.links.email.value}</span>
            <ArrowUpRight className="size-4 rtl:-scale-x-100" />
          </a>

          <a
            href={content.links.phone.href}
            className="group flex items-center justify-between gap-5 border-b border-border py-5"
          >
            <span className="flex items-center gap-4">
              <span className="grid size-10 place-items-center rounded-xl border border-border text-primary">
                <Phone className="size-4" />
              </span>
              <span>
                <span className="block text-xs text-muted-foreground">
                  {content.phone}
                </span>
                <span className="mt-1 block text-sm font-semibold">
                  {content.links.phone.value}
                </span>
              </span>
            </span>
            <ArrowUpRight className="size-4 text-muted-foreground rtl:-scale-x-100" />
          </a>

          {[
            content.links.linkedin,
            content.links.github,
            content.links.telegram,
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between gap-5 border-b border-border py-4 last:border-b-0"
            >
              <span className="text-sm font-medium group-hover:text-primary">
                {link.label}
              </span>
              <ArrowUpRight className="size-4 text-muted-foreground rtl:-scale-x-100" />
            </a>
          ))}
        </div>

        <SectionGuide section="contact" />
      </div>
    </div>
  );
}
