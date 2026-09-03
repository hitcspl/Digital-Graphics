"use client";

import React, { useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface VintageLetter {
  id: string;
  dispatchDate: string;
  content: string;
  signee: string;
  initialCap: string;
}

export interface LetterCardProps {
  letter: VintageLetter;
  index: number;
  logo: LogoItem;
}

const vintageArchive: VintageLetter[] = [
  {
    id: "01",
    dispatchDate: "17.11.2026",
    content: "We needed a team that could keep up with our day to day promotions and offers without constant follow ups, and Digital Graphics took that off our plate completely. Even our last minute requests have always been delivered the same day. Our customers now recognise our posts instantly, and we've seen stronger engagement and more walk ins.",
    signee: "Suvidha Supermart",
    
    initialCap: "W",
  },
  {
    id: "02",
    dispatchDate: "08.09.2025",
    content: "During our time working with Digital Graphics, they consistently delivered creative that matched our brand voice and turned things around quickly. One of our reels crossed 1M+ views, and our overall engagement, reach, and brand visibility improved noticeably across our social media platforms.",
    signee: "Osum",
    initialCap: "D",
  },
  {
    id: "03",
    dispatchDate: "21.02.2026",
    content: "Working with Digital Graphics changed how we approach our brand online. Our social presence is now consistent, intentional, and on brand. In six months, we saw a noticeable increase in inquiries, 6× follower growth, and 26K engagement in just 15 days on one campaign. What stood out most was how well they understood our business.",
    signee: "Annapurna Trading",
    initialCap: "W",
  },
  {
    id: "04",
    dispatchDate: "18.07.2024",
    content: "Digital Graphics has been our go to team for content, from ideation to final static posts and reels. They understand our vision without lengthy briefs, and even last minute event changes have always been delivered on time. Their consistency and creativity have made working with them genuinely easy.",
    signee: "JCI",
    initialCap: "D",
  },
  {
    id: "05",
    dispatchDate: "30.10.2025",
    content: "We run on tight event schedules, and Digital Graphics has never let that become a problem. Whether it's a reel needed within hours or a complete content plan for a chapter meeting, they consistently deliver clean, professional work on time while maintaining the same quality every time.",
    signee: "BNI",
    initialCap: "W",
  },
  {
    id: "06",
    dispatchDate: "05.03.2024",
    content: "From creative ideation to execution, Digital Graphics has made our content far more polished than before. Despite handling requests from multiple committees and urgent same day revisions, they've never missed a deadline. That level of reliability is genuinely hard to find.",
    signee: "RGC",
    initialCap: "F",
  },
];

export interface LogoItem {
  src: string;
  darkSrc?: string;
  name: string;
}

const Logos: LogoItem[] = [
  { src: "/testimonial/suvidha-supermart1.png", name: "Suvidha Supermart" },
  { src: "/testimonial/osum1.png", name: "Osum" },
  { src: "/testimonial/annapurna-trading1.png", darkSrc: "/testimonial/annapurna-trading.jpg", name: "Annapurna Trading" },
  { src: "/testimonial/jci1.png", name: "JCI" },
  { src: "/testimonial/bni1.png", name: "BNI" },
  { src: "/testimonial/rgc1.png", name: "RGC" },
];

export { Logos as logos };

function LetterCard({ letter, logo }: LetterCardProps) {
  const [imgError, setImgError] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const check = () => setIsDark(root.classList.contains("dark"));
    check();

    const observer = new MutationObserver(check);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const resolvedSrc = isDark && logo?.darkSrc ? logo.darkSrc : logo?.src;

  const showPlaceholder =
    !logo || imgError || !resolvedSrc || resolvedSrc.trim() === "";

  return (
    <article className="w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] shrink-0 snap-center bg-white dark:bg-neutral-950/70 border border-neutral-200 dark:border-neutral-800 p-5 sm:p-6 md:p-7 flex flex-col justify-between relative transition-all duration-500 ease-out hover:bg-neutral-100/80 dark:hover:bg-neutral-900/50 hover:border-neutral-200 dark:hover:border-neutral-700 group rounded-xl overflow-hidden">

      {/* SUBHEADER FRAME */}
      <div className="w-full flex justify-between items-baseline mb-6 sm:mb-8 text-[10px] sm:text-xs font-mono tracking-wider text-neutral-400 dark:text-neutral-500 relative z-10">
        <div className="space-y-0.5">
          <p className="font-bold text-neutral-600 dark:text-neutral-400">
            {letter.dispatchDate}
          </p>
        </div>
      </div>

      {/* REVIEW TYPOGRAPHY BODY */}
      <div className="flex-grow flex flex-col justify-start my-1 text-left relative z-10">

        <div
          className="absolute -top-3 -left-1 sm:-top-4 sm:-left-2 text-7xl sm:text-8xl font-serif text-neutral-200 dark:text-neutral-800 pointer-events-none select-none z-0 transition-colors duration-500 group-hover:text-neutral-300 dark:group-hover:text-neutral-700"
          aria-hidden="true"
        >
          &ldquo;
        </div>

        <p className="font-serif text-sm sm:text-base leading-relaxed text-neutral-900 dark:text-neutral-300 antialiased tracking-wide relative z-10">
          <span className="font-serif text-3xl sm:text-4xl font-bold float-left mr-2 mt-0 pt-1 leading-none text-neutral-900 dark:text-white">
            {letter.initialCap}
          </span>
          {letter.content.substring(1)}
          <span className="font-serif text-xl sm:text-2xl font-bold text-neutral-400 dark:text-neutral-500 ml-1 leading-none inline-block align-middle">
            &rdquo;
          </span>
        </p>
      </div>

      {/* CENTERED DIVIDER LINE */}
      <div className="self-center relative w-[50%] group-hover:w-full h-[1px] bg-neutral-200 dark:bg-neutral-800 my-4 transition-all duration-500 ease-out overflow-hidden z-10">
        <div
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 delay-100 bg-gradient-to-r from-transparent via-neutral-500 dark:via-neutral-300 to-transparent"
          aria-hidden="true"
        />
      </div>

      {/* CLOSING CREDENTIAL FOOTER SIGNATURE & LOGO */}
      <footer className="relative z-10 mt-1 flex w-full items-center justify-between gap-3 sm:gap-4">
        <div className="min-w-0 flex-1 text-left">
          <span
            className="
              block
              truncate
              font-sans
              font-semibold
              text-sm
              xs:text-[15px]
              sm:text-base
              tracking-normal
              text-neutral-800
              dark:text-zinc-200
            "
          >
            {letter.signee}
          </span>
        </div>

        <div
          className="flex h-10 w-[72px] shrink-0 items-center justify-end transition-transform duration-500 group-hover:scale-105 sm:h-11 sm:w-[88px]"
          aria-label={
            showPlaceholder
              ? "Logo placeholder"
              : `${logo.name} logo`
          }
        >
          {showPlaceholder ? (
            <span
              className="block h-full w-full"
              aria-hidden="true"
            />
          ) : (
            <img
              src={resolvedSrc}
              alt={`${logo.name} logo`}
              className="max-h-full max-w-full object-contain object-right drop-shadow-sm dark:drop-shadow-none"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          )}
        </div>
      </footer>
    </article>
  );
}

export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const pointerStartX = useRef(0);
  const trackTransformX = useRef(0);
  const animationFrameId = useRef<number | null>(0);
  const velocityX = useRef(0);

  const tripleArchive = [...vintageArchive, ...vintageArchive, ...vintageArchive];

  useEffect(() => {
    const runMarqueeEngine = () => {
      if (!trackRef.current) return;

      if (!isDragging) {
        if (Math.abs(velocityX.current) > 0.1) {
          trackTransformX.current += velocityX.current;
          velocityX.current *= 0.94;
        } else if (!isHovered) {
          trackTransformX.current -= 0.75;
        }
      }

      const thirdWidth = trackRef.current.scrollWidth / 3;
      if (trackTransformX.current < -thirdWidth) {
        trackTransformX.current = 0;
      } else if (trackTransformX.current > 0) {
        trackTransformX.current = -thirdWidth;
      }

      trackRef.current.style.transform = `translate3d(${trackTransformX.current}px, 0, 0)`;
      animationFrameId.current = requestAnimationFrame(runMarqueeEngine);
    };

    animationFrameId.current = requestAnimationFrame(runMarqueeEngine);
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [isDragging, isHovered]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    pointerStartX.current = e.clientX;
    velocityX.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !trackRef.current) return;
    const currentX = e.clientX;
    const deltaX = currentX - pointerStartX.current;
    pointerStartX.current = currentX;

    trackTransformX.current += deltaX;
    velocityX.current = deltaX;
  };

  const shiftTrack = (direction: "left" | "right") => {
    const impulse = direction === "left" ? 400 : -400;
    velocityX.current = impulse * 0.15;
  };

  return (
    <section id="testimonials" className="bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 py-10 sm:py-16 md:py-20 overflow-hidden transition-colors duration-300 select-none relative scroll-mt-[70px] md:scroll-mt-[80px]">

      {/* MICRO-CALIBRATED GRAPH CANVAS DOT PATTERN */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#e1e1e1_1.5px,transparent_1.5px)] dark:bg-[radial-gradient(#262626_1.5px,transparent_1.5px)] [background-size:20px_20px]" />

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col items-center relative z-10">

        {/* ============================================================================ */}
        {/* COMPACT GIANT EDITORIAL HEADER                                               */}
        {/* ============================================================================ */}
        <header className="w-full text-left md:text-center flex flex-col items-start md:items-center mb-10 md:mb-14">
          <span className="text-[10px] font-sans font-extrabold tracking-[0.3em] text-neutral-400 dark:text-neutral-500 uppercase mb-2">
            TESTIMONIAL ARCHIVES
          </span>

          <h2 className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-none text-neutral-950 dark:text-white max-w-4xl">
            What our <span className="italic font-normal font-serif text-neutral-500 dark:text-neutral-400">clients</span> say.
          </h2>
        </header>

        {/* ============================================================================ */}
        {/* THE CAROUSEL SLIDER CONTROLLER WINDOW                                        */}
        {/* ============================================================================ */}
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={() => setIsDragging(false)}
          onPointerCancel={() => setIsDragging(false)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => { setIsHovered(false); setIsDragging(false); }}
          className={cn(
            "w-full overflow-hidden relative py-2 touch-pan-y rounded-lg",
            isDragging ? "cursor-grabbing" : "cursor-grab"
          )}
        >
          <div
            ref={trackRef}
            className="flex gap-4 sm:gap-6 md:gap-8 w-max will-change-transform"
            style={{ transform: `translate3d(0px, 0, 0)` }}
          >
            {tripleArchive.map((letter, index) => {
              const logo = Logos[index % Logos.length];

              return (
                <LetterCard
                  key={`${letter.id}-${index}`}
                  letter={letter}
                  index={index}
                  logo={logo}
                />
              );
            })}
          </div>
        </div>

        {/* ============================================================================ */}
        {/* COMPACT REBALANCED NAVIGATION ACTION CONTROLS BAR                            */}
        {/* ============================================================================ */}
        <footer className="w-full mt-8 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[9px] uppercase font-bold tracking-widest text-neutral-400 dark:text-neutral-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
            <span>LIVE FEED</span>
          </div>

          <div className="flex items-center gap-2 relative z-20">
            <button
              onClick={() => shiftTrack("left")}
              className="w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-400 bg-white dark:bg-neutral-900 transition-all hover:bg-neutral-950 hover:text-white dark:hover:bg-white dark:hover:text-black active:scale-95 shadow-sm"
              aria-label="Shift Left"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={2} />
            </button>
            <button
              onClick={() => shiftTrack("right")}
              className="w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-400 bg-white dark:bg-neutral-900 transition-all hover:bg-neutral-950 hover:text-white dark:hover:bg-white dark:hover:text-black active:scale-95 shadow-sm"
              aria-label="Shift Right"
            >
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>
        </footer>

      </div>
    </section>
  );
}
