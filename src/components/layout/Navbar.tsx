"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../ui/ThemeToggle";
import { MagneticButton } from "../ui/MagneticButton";
import { useNavigation } from "@/navigation/NavigationEngine";
import { useScrollSpy } from "@/navigation/useScrollSpy";

const links = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#capabilities" },
  { label: "Clients", href: "#clients" },
  { label: "Work", href: "#work" },
  { label: "Testimonials", href: "#testimonials" },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Scroll threshold to trigger the blurred glass effect on the navbar
const SCROLLED_THRESHOLD = 50;

// Shared focus-visible treatment for keyboard users.
const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

// Staggered entrance, single uniform exit.
const mobileLinkVariants = {
  initial: { y: "100%" },
  animate: (i: number) => ({
    y: 0,
    transition: { duration: 0.8, delay: i * 0.05, ease: EASE },
  }),
  exit: { y: "100%", transition: { duration: 0.4, ease: EASE } },
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const reduce = !!useReducedMotion();

  const {
    menuOpen,
    toggleMenu,
    closeMenu,
    navigateTo,
    navigateToSection,
    flushPendingNavigation,
  } = useNavigation();

  // Stable id list so the scroll-spy observer is not re-created every render.
  const sectionIds = useMemo(
    () => links.map((l) => l.href.replace("#", "")),
    []
  );
  const activeSection = useScrollSpy(sectionIds);
  const isContactActive = activeSection === "contact";

  // --- Smart scroll listener for background blur only ---
  const scrolledRef = useRef(false);
  const tickingRef = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const nextScrolled = y > SCROLLED_THRESHOLD;
        
        if (nextScrolled !== scrolledRef.current) {
          scrolledRef.current = nextScrolled;
          setScrolled(nextScrolled);
        }
        tickingRef.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // --- Focus management + Escape-to-close for the mobile menu ---
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (menuOpen) {
      const t = window.setTimeout(() => firstLinkRef.current?.focus(), 60);
      return () => window.clearTimeout(t);
    }
    toggleRef.current?.focus();
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, closeMenu]);

  const surfaceVisible = scrolled || menuOpen;
  const transition = reduce ? { duration: 0 } : { duration: 0.45, ease: EASE };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[999] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus-visible:ring-2 focus-visible:ring-foreground/70"
      >
        Skip to main content
      </a>

      <motion.header
        initial={false}
        className="fixed inset-x-0 top-0 z-[100]"
      >
        {/* Animated surface layer: backdrop blur, opacity and shadow cross-fade */}
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={{
            opacity: surfaceVisible ? 1 : 0,
            backdropFilter: surfaceVisible ? "blur(12px)" : "blur(0px)",
            boxShadow: surfaceVisible
              ? "0 1px 0 rgba(127,127,127,0.10), 0 12px 32px -16px rgba(0,0,0,0.30)"
              : "0 0 0 rgba(0,0,0,0)",
          }}
          transition={transition}
          className="pointer-events-none absolute inset-0 -z-10 border-b border-border/40"
          style={{
            backgroundColor: "color-mix(in srgb, var(--background) 80%, transparent)",
          }}
        />

        <div className="relative z-10 mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6 md:h-20 lg:px-12">
          {/* Logo: engine handles scroll-to-top + URL reset */}
          <button
            type="button"
            onClick={() => navigateTo("/")}
            aria-label="Digital Graphics — home"
            className={cn(
              "group relative z-[100] flex flex-col justify-center rounded-md text-left",
              FOCUS_RING
            )}
          >
            <span className="font-serif text-2xl leading-[0.8] tracking-tighter text-foreground md:text-3xl">
              Digital
            </span>
            <span className="ml-[2px] mt-1 text-[8px] font-semibold uppercase tracking-[0.45em] text-muted-foreground">
              Graphics
            </span>
          </button>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-8 lg:flex"
          >
            {links.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => navigateToSection(link.href)}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "group relative rounded-md text-[12px] font-medium uppercase tracking-[0.2em] transition-colors duration-300",
                    isActive
                      ? "text-foreground"
                      : "text-foreground/65 hover:text-foreground",
                    FOCUS_RING
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute inset-x-0 -bottom-1 h-[1px] bg-foreground transition-transform duration-500 ease-out",
                      isActive
                        ? "scale-x-100"
                        : "origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100"
                    )}
                  />
                </button>
              );
            })}
          </nav>

          <div className="relative z-[100] flex items-center gap-4 md:gap-6">
            <ThemeToggle />
            <div className="hidden items-center gap-6 md:flex">
              <MagneticButton
                onClick={() => navigateToSection("#contact")}
                aria-current={isContactActive ? "location" : undefined}
                className={cn(
                  "h-10 rounded-full bg-foreground px-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-background transition-colors hover:bg-primary",
                  isContactActive && "bg-primary",
                  FOCUS_RING
                )}
              >
                Let's Build Together
              </MagneticButton>

              {/* Desktop Proud Moments Magic Shine Button */}
              <button
                type="button"
                onClick={() => navigateTo("/proud-moments")}
                aria-label="Proud Moments"
                className={cn(
                  "group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-full p-[1.5px] transition-transform hover:scale-105 active:scale-95",
                  FOCUS_RING
                )}
              >
                <span 
                  className="absolute inset-[-1000%] animate-spin bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#CFA04A_50%,transparent_100%)]" 
                  style={{ animationDuration: '4s' }} 
                />
<span
  className="
    relative flex h-full w-full items-center justify-center
    rounded-full
    cursor-pointer
    border border-[#D2B06B]/60
    dark:border-[#E8D29B]/20
    bg-background/95
    px-5
    backdrop-blur-3xl
    transition-colors
    group-hover:bg-background/80
  "
>
                    <img
                    src="/Proud Moments-Logo 2 (2).png"
                    alt="Proud Moments"
                    className="h-6 w-auto object-contain transition-transform group-hover:scale-104"
                  />
                </span>
              </button>
            </div>

            <button
              ref={toggleRef}
              type="button"
              onClick={toggleMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className={cn(
                "flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-md lg:hidden",
                FOCUS_RING
              )}
            >
              <div
                className={cn(
                  "h-[1.5px] w-5 bg-foreground transition-transform duration-500 ease-[0.22,1,0.36,1]",
                  menuOpen && "translate-y-[6.5px] rotate-45"
                )}
              />
              <div
                className={cn(
                  "h-[1.5px] w-5 bg-foreground transition-opacity duration-500",
                  menuOpen && "opacity-0"
                )}
              />
              <div
                className={cn(
                  "h-[1.5px] w-5 bg-foreground transition-transform duration-500 ease-[0.22,1,0.36,1]",
                  menuOpen && "-translate-y-[6.5px] -rotate-45"
                )}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Overlay */}
      <AnimatePresence onExitComplete={flushPendingNavigation}>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed inset-0 z-[90] flex h-dvh w-full flex-col bg-background pt-24 lg:hidden"
          >
            <div className="flex flex-1 flex-col justify-center px-6 sm:px-12 md:px-16">
              <div className="flex flex-col gap-2 mb-10">
                {links.map((link, i) => {
                  const id = link.href.replace("#", "");
                  const isActive = activeSection === id;
                  return (
                    <div key={link.href} className="overflow-hidden py-1">
                      <motion.button
                        ref={i === 0 ? firstLinkRef : undefined}
                        type="button"
                        custom={i}
                        variants={mobileLinkVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        onClick={() => navigateToSection(link.href)}
                        aria-current={isActive ? "location" : undefined}
                        className={cn(
                          "flex w-full items-center rounded-md py-2 text-4xl sm:text-5xl md:text-6xl font-serif text-foreground/80 transition-colors hover:text-foreground",
                          isActive && "text-foreground",
                          FOCUS_RING
                        )}
                      >
                        {link.label}
                      </motion.button>
                    </div>
                  );
                })}
              </div>

              {/* 'Let's Build Together' CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="mb-4"
              >
                <button
                  type="button"
                  onClick={() => navigateToSection("#contact")}
                  aria-current={isContactActive ? "location" : undefined}
                  className={cn(
                    "group flex w-full items-center justify-center h-14 rounded-full px-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-background transition-all active:scale-[0.98] hover:bg-primary",
                    isContactActive ? "bg-primary" : "bg-foreground",
                    FOCUS_RING
                  )}
                >
                  Let's Build Together
                </button>
              </motion.div>

              {/* Mobile Proud Moments Magic Shine Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.6 }}
              >
                <button
  type="button"
  onClick={() => navigateTo("/proud-moments")}
  aria-label="Proud Moments"
  className={cn(
    "group relative flex w-full items-center justify-center",
    "h-20 sm:h-24", // Standardized heights
    "overflow-hidden rounded-full p-[1.5px]",
    "transition-all duration-300 hover:scale-[1.01] active:scale-[0.98]",
    "shadow-md",
    FOCUS_RING
  )}
>
  {/* Magic Border Animation */}
  <span
    className={cn(
      "absolute inset-[-1000%] animate-spin",
      "bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#B89A52_50%,transparent_100%)]",
      "dark:bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#E8D29B_50%,transparent_100%)]"
    )}
    style={{ animationDuration: "4s" }}
  />

  {/* Inner Content Container */}
  <span
    className={cn(
      "relative z-10 flex h-full w-full items-center justify-center",
      "rounded-full cursor-pointer", // Changed to full to match the outer container
      "bg-white dark:bg-black", // Forced solid background colors
      "transition-colors duration-300",
      "group-hover:bg-white/90 dark:group-hover:bg-black/90",
      "border border-[#B89A52]/30 dark:border-[#E8D29B]/20"
    )}
  >
    <img
      src="/Proud Moments-Logo 2 (2).png"
      alt="Proud Moments"
      // Added style to force high-quality rendering and prevent blur
      style={{ imageRendering: '-webkit-optimize-contrast' }}
      className="h-9 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105 will-change-transform"
    />
  </span>
</button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}