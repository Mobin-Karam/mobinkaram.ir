"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Download, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";

import { InstallButton } from "./install-button";
import FlagLanguage from "./flag-langauge";

const locales = ["fa", "en"] as const;

const mobileMenuVariants: Variants = {
  hidden: {
    opacity: 0,
    height: 0,
    y: -8,
  },
  visible: {
    opacity: 1,
    height: "auto",
    y: 0,
    transition: {
      height: {
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      },
      opacity: {
        duration: 0.2,
      },
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    y: -8,
    transition: {
      duration: 0.25,
      ease: [0.4, 0, 1, 1],
    },
  },
};

const mobileItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -8,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export function SiteHeader() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const pathnameParts = pathname.split("/");
  const pathnameLocale = pathnameParts[1];

  const currentLocale = locales.includes(
    pathnameLocale as (typeof locales)[number],
  )
    ? (pathnameLocale as (typeof locales)[number])
    : "fa";

  const isRtl = currentLocale === "fa";

  const navItems = [
    {
      href: `/${currentLocale}`,
      label: t("home"),
      exact: true,
    },
    {
      href: `/${currentLocale}/projects`,
      label: t("projects"),
      exact: false,
    },
    {
      href: `/${currentLocale}/blog`,
      label: t("blog"),
      exact: false,
    },
  ];

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.removeProperty("overflow");
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [mobileOpen]);

  function getLocalePath(locale: (typeof locales)[number]) {
    const restOfPath = pathnameParts.slice(2).join("/");
    return restOfPath ? `/${locale}/${restOfPath}` : `/${locale}`;
  }

  function isActiveRoute(href: string, exact: boolean) {
    if (exact) {
      return pathname === href || pathname === `${href}/`;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  function toggleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  const resumePath =
    currentLocale === "fa"
      ? "/resume/mobin-karam-fa.pdf"
      : "/resume/mobin-karam-en.pdf";

  return (
    <>
      <motion.header
        dir={isRtl ? "rtl" : "ltr"}
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.65,
          delay: 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={[
          "fixed inset-x-0 top-0 z-50",
          "pointer-events-none",
          "px-3 pt-3 sm:px-5 sm:pt-4",
        ].join(" ")}
      >
        <motion.div
          layout
          transition={{
            layout: {
              type: "spring",
              stiffness: 280,
              damping: 28,
            },
          }}
          className={[
            "pointer-events-auto relative mx-auto",
            "w-full max-w-6xl overflow-hidden",
            "rounded-[1.35rem] border",
            "transition-[background-color,border-color,box-shadow]",
            "duration-300",
            scrolled || mobileOpen
              ? [
                  "border-border/80",
                  "bg-background/90",
                  "shadow-[0_14px_45px_-18px_rgba(0,0,0,0.3)]",
                  "backdrop-blur-2xl",
                ].join(" ")
              : [
                  "border-border/60",
                  "bg-background/70",
                  "shadow-[0_8px_30px_-22px_rgba(0,0,0,0.3)]",
                  "backdrop-blur-xl",
                ].join(" "),
          ].join(" ")}
        >
          <div
            className={[
              "flex h-14 items-center justify-between",
              "px-2.5 sm:h-16 sm:px-3",
            ].join(" ")}
          >
            {/* Logo */}
            <Link
              href={`/${currentLocale}`}
              aria-label={t("home")}
              className={[
                "group flex shrink-0 items-center gap-2",
                "rounded-xl px-2 py-2",
                "outline-none transition-colors",
                "hover:bg-muted/70",
                "focus-visible:ring-2 focus-visible:ring-ring",
              ].join(" ")}
            >
              <motion.span
                whileHover={{
                  rotate: -6,
                  scale: 1.04,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                className={[
                  "flex size-8 items-center justify-center",
                  "rounded-[0.7rem] bg-foreground",
                  "text-xs font-bold text-background",
                  "shadow-sm",
                ].join(" ")}
              >
                MK
              </motion.span>

              <span
                className={[
                  "hidden text-sm font-semibold",
                  "tracking-[-0.02em] text-foreground",
                  "sm:block",
                ].join(" ")}
              >
                {t("logoName")}
              </span>
            </Link>

            {/* Desktop navigation */}
            <nav
              aria-label="Primary navigation"
              className={[
                "absolute left-1/2 hidden",
                "-translate-x-1/2 items-center",
                "rounded-full border border-border/60",
                "bg-muted/50 p-1",
                "md:flex",
              ].join(" ")}
            >
              {navItems.map((item) => {
                const active = isActiveRoute(item.href, item.exact);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "relative isolate",
                      "rounded-full px-4 py-2",
                      "text-sm font-medium",
                      "outline-none transition-colors",
                      "focus-visible:ring-2",
                      "focus-visible:ring-ring",
                      active
                        ? "text-foreground"
                        : [
                            "text-muted-foreground",
                            "hover:text-foreground",
                          ].join(" "),
                    ].join(" ")}
                  >
                    {active && (
                      <motion.span
                        layoutId="desktop-active-nav"
                        className={[
                          "absolute inset-0 -z-10",
                          "rounded-full border border-border/70",
                          "bg-background shadow-sm",
                        ].join(" ")}
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 34,
                        }}
                      />
                    )}

                    <span className="relative z-10">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-1.5">
              <div className="hidden lg:block">
                <InstallButton />
              </div>

              <AnimatePresence initial={false}>
                {scrolled && (
                  <motion.a
                    href={resumePath}
                    download
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      width: 0,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      width: "auto",
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      width: 0,
                    }}
                    transition={{
                      duration: 0.25,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={[
                      "hidden h-9 items-center gap-1.5",
                      "overflow-hidden whitespace-nowrap",
                      "rounded-full border border-border/70",
                      "bg-background px-3",
                      "text-xs font-medium",
                      "text-muted-foreground shadow-sm",
                      "outline-none transition-colors",
                      "hover:bg-muted hover:text-foreground",
                      "focus-visible:ring-2 focus-visible:ring-ring",
                      "sm:inline-flex",
                    ].join(" ")}
                  >
                    <Download className="size-3.5 shrink-0" />

                    <span>{t("resume")}</span>
                  </motion.a>
                )}
              </AnimatePresence>

              {/* Language control */}
              <FlagLanguage />

              {/* Theme */}
              <motion.button
                type="button"
                whileTap={{
                  scale: 0.9,
                }}
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className={[
                  "relative flex size-9 items-center",
                  "justify-center overflow-hidden",
                  "rounded-full border border-border/70",
                  "bg-background text-muted-foreground",
                  "shadow-sm outline-none",
                  "transition-colors",
                  "hover:bg-muted hover:text-foreground",
                  "focus-visible:ring-2 focus-visible:ring-ring",
                ].join(" ")}
              >
                {mounted && (
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={resolvedTheme}
                      initial={{
                        opacity: 0,
                        rotate: -70,
                        scale: 0.5,
                      }}
                      animate={{
                        opacity: 1,
                        rotate: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        rotate: 70,
                        scale: 0.5,
                      }}
                      transition={{
                        duration: 0.2,
                      }}
                    >
                      {resolvedTheme === "dark" ? (
                        <Sun className="size-4" />
                      ) : (
                        <Moon className="size-4" />
                      )}
                    </motion.span>
                  </AnimatePresence>
                )}
              </motion.button>

              {/* Mobile menu */}
              <motion.button
                type="button"
                whileTap={{
                  scale: 0.9,
                }}
                onClick={() => {
                  setMobileOpen((previous) => !previous);
                }}
                aria-label={
                  mobileOpen ? "Close navigation menu" : "Open navigation menu"
                }
                aria-expanded={mobileOpen}
                className={[
                  "relative flex size-9 items-center",
                  "justify-center overflow-hidden",
                  "rounded-full border border-border/70",
                  "bg-background text-muted-foreground",
                  "shadow-sm outline-none",
                  "transition-colors",
                  "hover:bg-muted hover:text-foreground",
                  "focus-visible:ring-2 focus-visible:ring-ring",
                  "md:hidden",
                ].join(" ")}
              >
                <AnimatePresence initial={false} mode="wait">
                  <motion.span
                    key={mobileOpen ? "close" : "menu"}
                    initial={{
                      opacity: 0,
                      rotate: -45,
                      scale: 0.6,
                    }}
                    animate={{
                      opacity: 1,
                      rotate: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      rotate: 45,
                      scale: 0.6,
                    }}
                    transition={{
                      duration: 0.18,
                    }}
                  >
                    {mobileOpen ? (
                      <X className="size-[18px]" />
                    ) : (
                      <Menu className="size-[18px]" />
                    )}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>

          {/* Mobile menu */}
          <AnimatePresence initial={false}>
            {mobileOpen && (
              <motion.div
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="overflow-hidden md:hidden"
              >
                <motion.nav
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.06,
                        delayChildren: 0.06,
                      },
                    },
                  }}
                  initial="hidden"
                  animate="visible"
                  className={[
                    "border-t border-border/70",
                    "px-3 pb-3 pt-2",
                  ].join(" ")}
                >
                  <div className="space-y-1">
                    {navItems.map((item) => {
                      const active = isActiveRoute(item.href, item.exact);

                      return (
                        <motion.div
                          key={item.href}
                          variants={mobileItemVariants}
                        >
                          <Link
                            href={item.href}
                            aria-current={active ? "page" : undefined}
                            className={[
                              "relative flex min-h-12",
                              "items-center justify-between",
                              "rounded-xl px-4",
                              "text-sm font-medium",
                              "outline-none transition-colors",
                              "focus-visible:ring-2",
                              "focus-visible:ring-ring",
                              active
                                ? ["bg-foreground", "text-background"].join(" ")
                                : [
                                    "text-muted-foreground",
                                    "hover:bg-muted",
                                    "hover:text-foreground",
                                  ].join(" "),
                            ].join(" ")}
                          >
                            <span>{item.label}</span>

                            {active && (
                              <motion.span
                                layoutId="mobile-active-dot"
                                className={[
                                  "size-1.5 rounded-full",
                                  "bg-background",
                                ].join(" ")}
                              />
                            )}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>

                  <motion.div
                    variants={mobileItemVariants}
                    className={[
                      "mt-3 grid grid-cols-2 gap-2",
                      "border-t border-border/60 pt-3",
                    ].join(" ")}
                  >
                    <a
                      href={resumePath}
                      download
                      className={[
                        "inline-flex min-h-11 items-center",
                        "justify-center gap-2 rounded-xl",
                        "border border-border/70 bg-background",
                        "px-3 text-sm font-medium",
                        "text-foreground shadow-sm",
                        "outline-none transition-colors",
                        "hover:bg-muted",
                        "focus-visible:ring-2",
                        "focus-visible:ring-ring",
                      ].join(" ")}
                    >
                      <Download className="size-4" />
                      <span>{t("resume")}</span>
                    </a>

                    <div
                      className={[
                        "flex min-h-11 items-center",
                        "rounded-xl border border-border/70",
                        "bg-muted/50 p-1",
                      ].join(" ")}
                    >
                      {locales.map((locale) => {
                        const active = locale === currentLocale;

                        return (
                          <Link
                            key={locale}
                            href={getLocalePath(locale)}
                            className={[
                              "relative isolate flex h-9",
                              "flex-1 items-center justify-center",
                              "rounded-lg text-xs font-semibold",
                              "uppercase outline-none",
                              "transition-colors",
                              "focus-visible:ring-2",
                              "focus-visible:ring-ring",
                              active
                                ? "text-foreground"
                                : [
                                    "text-muted-foreground",
                                    "hover:text-foreground",
                                  ].join(" "),
                            ].join(" ")}
                          >
                            {active && (
                              <motion.span
                                layoutId="mobile-language"
                                className={[
                                  "absolute inset-0 -z-10",
                                  "rounded-lg bg-background",
                                  "shadow-sm",
                                ].join(" ")}
                              />
                            )}

                            {locale}
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>

                  <motion.div
                    variants={mobileItemVariants}
                    className="mt-2 lg:hidden"
                  >
                    <InstallButton />
                  </motion.div>
                </motion.nav>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.header>

      {/* Mobile backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.button
            type="button"
            aria-label="Close navigation menu"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() => setMobileOpen(false)}
            className={[
              "fixed inset-0 z-40",
              "bg-background/60 backdrop-blur-sm",
              "md:hidden",
            ].join(" ")}
          />
        )}
      </AnimatePresence>
    </>
  );
}
