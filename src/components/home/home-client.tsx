"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";

import { HeroSection } from "@/components/home/hero-section";
import { ContactSection } from "@/components/home/contact-section";
import { PortfolioChat } from "@/components/home/portfolio-chat";

export function HomeClient() {
  return (
    <>
      <main className="home-story overflow-x-clip">
        <HeroSection />
        <ContactSection />
      </main>
      <PortfolioChat />
    </>
  );
}
