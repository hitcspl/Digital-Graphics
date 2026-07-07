import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate, useReducedMotion, useMotionValueEvent  } from 'framer-motion';
import type { MotionValue, Variants } from "framer-motion";
import { SEO, type OpenGraphData, type TwitterCardData } from "../components/SEO";
import { proudMomentsPageStructuredData } from "../components/structured-data";

interface SvgProps {
  accent: string;
}

type VisualComponent = React.FC<SvgProps>;


export interface VisualComponentProps {
  accent?: string;
}

interface StorytellingSectionProps {
  CHAPTERS: Chapter[];
  VISUALS: VisualComponent[];
  activeIndex: number;
  sectionRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

const proudMomentsOpenGraph: OpenGraphData = {
  type: "website",
  url: "https://digitalgraphicsindia.com/proud-moments",
  title: "Proud Moments by Digital Graphics | Trophy Design, Awards & Corporate Gifting",
  description:
    "Celebrating achievements with meaningful design. Digital Graphics creates custom trophies, awards, medals, and commemorative mementos for brands, sports events, and corporate recognition in Ranchi, Jharkhand.",
  image: "https://digitalgraphicsindia.com/og-proud-moments.jpg",
  imageWidth: 1200,
  imageHeight: 630,
  imageAlt: "Proud Moments by Digital Graphics - Trophy and Award Design Showcase",
  siteName: "Digital Graphics India",
  locale: "en_IN",
};

const proudMomentsTwitterCard: TwitterCardData = {
  card: "summary_large_image",
  url: "https://digitalgraphicsindia.com/proud-moments",
  title: "Proud Moments by Digital Graphics | Trophy Design, Awards & Corporate Gifting",
  description:
    "Celebrating achievements with meaningful design. Digital Graphics creates custom trophies, awards, medals, and commemorative mementos for brands, sports events, and corporate recognition.",
  image: "https://digitalgraphicsindia.com/og-proud-moments.jpg",
  imageAlt: "Proud Moments by Digital Graphics - Trophy and Award Design Showcase",
  site: "@digitalgraphics",
};

interface SvgProps {
  accent: string;
}

interface WhyChooseUsProps {
  accent?: string;
}

// --- Premium Physics & Constants ---
const WORDS = [
  "Recognition",
  "Achievements",
  "Milestones",
  "Success",
  "Legacies",
];

const EASE = [0.16, 1, 0.3, 1] as const;

const BLUR_REVEAL = {
  initial: { opacity: 0, filter: "blur(10px)", y: 10 },
  animate: { opacity: 1, filter: "blur(0px)", y: 0 }
};

// --- Custom Detailed SVGs (Solid + Line Art Style) ---
// Inspired by the provided reference image: thin strokes, solid fills, and colored accents.
const FloatingAwards = () => {
  const awards = [
    {
      id: 'trophy',
      // Detailed Trophy with framing and floating stars
      path: (
        <>
          {/* Decorative Corner Frames */}
          <path d="M20 20 L20 15 L25 15 M80 20 L80 15 L75 15 M20 80 L20 85 L25 85 M80 80 L80 85 L75 85" stroke="currentColor" strokeWidth="1.5" />
          
          {/* Solid Base */}
          <path d="M35 75 H65 V80 H35 Z" fill="currentColor" stroke="none" />
          <path d="M40 65 H60 V75 H40 Z" stroke="currentColor" strokeWidth="1.5" />
          
          {/* Solid Stem */}
          <path d="M48 50 H52 V65 H48 Z" fill="currentColor" stroke="none" />
          
          {/* Outlined Cup */}
          <path d="M30 25 H70 V40 C70 51 61 58 50 58 C39 58 30 51 30 40 Z" stroke="currentColor" strokeWidth="1.5" />
          
          {/* Handles */}
          <path d="M30 32 C18 32 18 22 30 22 M70 32 C82 32 82 22 70 22" stroke="currentColor" strokeWidth="1.5" />
          
          {/* Colored Solid Accents (Amber Star & Blue Sparks) */}
          <path d="M50 32 L52 38 L58 39 L53 43 L55 49 L50 46 L45 49 L47 43 L42 39 L48 38 Z" fill="#F59E0B" stroke="none" />
          <circle cx="22" cy="45" r="2" fill="#3B82F6" stroke="none" />
          <circle cx="78" cy="55" r="2" fill="#3B82F6" stroke="none" />
        </>
      ),
      className: "top-[10%] left-[5%] md:left-[15%] w-24 h-24 md:w-32 md:h-32 opacity-60",
      delay: 0.2
    },
    {
      id: 'target',
      // Goal/Target with floating UI elements
      path: (
        <>
          {/* Floating UI Window */}
          <rect x="15" y="15" width="35" height="25" rx="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M22 25 H43 M22 30 H35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          
          {/* Target Rings */}
          <circle cx="65" cy="55" r="22" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="65" cy="55" r="14" fill="currentColor" stroke="none" />
          
          {/* Colored Arrow */}
          <path d="M30 85 L65 55" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
          <path d="M55 55 L65 55 L65 65 Z" fill="#3B82F6" stroke="none" />
          
          {/* Floating Solid Star */}
          <path d="M85 18 L87 23 L92 24 L88 28 L89 33 L85 30 L81 33 L82 28 L78 24 L83 23 Z" fill="#F59E0B" stroke="none" />
        </>
      ),
className: "hidden md:block bottom-[22%] right-[5%] md:right-[15%] w-24 h-24 md:w-32 md:h-32 opacity-60",
      delay: 0.4
    },
    {
      id: 'medal',
      // Medal with floating heart/social bubble
      path: (
        <>
          {/* Floating Heart Bubble */}
          <rect x="65" y="15" width="20" height="16" rx="4" stroke="currentColor" strokeWidth="1.5" />
          <path d="M75 22 C75 20 72 20 72 22 C72 24 75 27 75 27 C75 27 78 24 78 22 C78 20 75 20 75 22 Z" fill="#EF4444" stroke="none" />
          <path d="M70 31 L75 37 L78 31" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          
          {/* Solid Ribbon Top */}
          <path d="M35 25 L65 25 L60 50 L40 50 Z" fill="currentColor" stroke="none" />
          
          {/* Outlined Ribbon Tails */}
          <path d="M25 30 L35 25 L40 50 L30 55 Z" stroke="#3B82F6" strokeWidth="1.5" />
          <path d="M75 30 L65 25 L60 50 L70 55 Z" stroke="#3B82F6" strokeWidth="1.5" />
          
          {/* Outlined Coin */}
          <circle cx="50" cy="65" r="22" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="50" cy="65" r="16" stroke="currentColor" strokeWidth="1.5" />
          
          {/* Solid Star Center */}
          <path d="M50 56 L52 61 L58 62 L53 66 L55 72 L50 69 L45 72 L47 66 L42 62 L48 61 Z" fill="#F59E0B" stroke="none" />
        </>
      ),
      className: "top-[10%] right-[5%] md:right-[15%] w-20 h-20 md:w-28 md:h-28 opacity-60",
      delay: 0.6
    },
    {
      id: 'plaque',
      // Certificate/Plaque with solid wax seal
      path: (
        <>
          {/* Outlined Frame */}
          <rect x="15" y="15" width="70" height="70" rx="4" stroke="currentColor" strokeWidth="1.5" />
          <rect x="22" y="22" width="56" height="56" rx="2" stroke="currentColor" strokeWidth="1.5" />
          
          {/* Colored Text Lines */}
          <path d="M35 38 H65 M35 48 H55 M35 58 H50" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
          
          {/* Solid Wax Seal */}
          <circle cx="70" cy="70" r="14" fill="#F59E0B" stroke="none" />
          {/* Inner ring to contrast the wax seal */}
          <circle cx="70" cy="70" r="8" stroke="#FFFFFF" strokeWidth="1.5" className="dark:stroke-black stroke-white" />
          
          {/* Floating UI Dots */}
          <circle cx="10" cy="50" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="90" cy="30" r="1.5" fill="currentColor" stroke="none" />
        </>
      ),
      className: "bottom-[27%] left-[5%] md:left-[15%] w-20 h-20 md:w-28 md:h-28 opacity-60 hidden sm:block",
      delay: 0.8
    }

  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
      {awards.map((award) => (
        <motion.div
          key={award.id}
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, delay: award.delay, ease: EASE }}
          className={`absolute flex flex-col items-center justify-center ${award.className}`}
        >
          <motion.div
            animate={{ 
              y: [0, -15, 0], 
              rotateZ: [-1, 1, -1] 
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-full h-full relative flex items-center justify-center"
          >
            <svg
              viewBox="0 0 100 100"
              fill="none"
              className="w-full h-full text-neutral-800 dark:text-neutral-200"
            >
              {award.path}
            </svg>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

function AwardsHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  // Cleaned up duplicate timers - Single source of truth for the interval
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 3500); // Adjusted to 3.5s for a better reading pace

    return () => clearInterval(interval);
  }, []);

  // --- Lighting & Mouse Physics ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 });
  
  const lightPosition = useMotionTemplate`radial-gradient(circle 800px at ${springX}px ${springY}px, rgba(37,99,235,0.06), transparent 80%)`;
  const darkLightPosition = useMotionTemplate`radial-gradient(circle 800px at ${springX}px ${springY}px, rgba(37,99,235,0.12), transparent 80%)`;

  // --- Scroll Parallax ---
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const yearsParallax = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textParallax = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[80svh] w-full pt-28 lg:pt-32 pb-10 flex items-start lg:items-center justify-center bg-[#FCFCFC] dark:bg-[#070707] overflow-hidden font-sans selection:bg-blue-600/30 px-4 md:px-8"
    >
      {/* Background Texture: Subtle Grain */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.02] z-50 mix-blend-difference" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      {/* Background Texture: Blueprint Grid */}
      <div className="absolute inset-0 pointer-events-none z-0 
        bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] 
        bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]" 
      />

      {/* Dynamic Ambient Lighting */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-10 hidden dark:block"
        style={{ background: darkLightPosition }}
      />
      <motion.div 
        className="absolute inset-0 pointer-events-none z-10 dark:hidden block"
        style={{ background: lightPosition }}
      />

      {/* Background Parallax: Huge Embossed Years */}
      <motion.div 
        style={{ y: yearsParallax }}
        className="absolute inset-0 flex flex-col justify-between py-10 pointer-events-none z-0 overflow-hidden opacity-40 dark:opacity-20"
      >
        {['2022', '2023', '2024', '2025'].map((year, i) => (
          <motion.div
            key={year}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: i * 0.2 }}
            className="text-[18vw] leading-[0.8] font-bold text-transparent tracking-tighter text-center"
            style={{ 
              WebkitTextStroke: '1px rgba(150, 150, 150, 0.15)',
            }}
          >
            {year}
          </motion.div>
        ))}
      </motion.div>

      {/* Custom Detailed Illustration Orbs */}
      <FloatingAwards />

      {/* MAIN CENTERED TYPOGRAPHY */}
      <motion.div 
        style={{ y: textParallax }}
        className="relative z-30 w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center mt-6 md:mt-0 px-2"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: EASE }}
          className="flex items-center justify-center gap-3 md:gap-4 mb-6 md:mb-8"
        >
          <div className="w-6 md:w-12 h-[1px] bg-neutral-300 dark:bg-neutral-700" />
          <span className="font-mono text-[11px] md:text-xs tracking-[0.3em] text-neutral-500 uppercase">
            The Digital Gallery
          </span>
          <div className="w-6 md:w-12 h-[1px] bg-neutral-300 dark:bg-neutral-700" />
        </motion.div>

        {/* Poster Headline - Increased base mobile text from 4xl to 5xl */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight text-neutral-900 dark:text-white leading-[1.1] mb-5 md:mb-7 w-full flex flex-col items-center">
          <motion.span variants={BLUR_REVEAL} initial="initial" animate="animate" className="block w-full">
            Celebrating
          </motion.span>
          
          {/* Rolling Word Container - Increased vertical margin (my-3) to prevent clipping at smaller screen sizes */}
          <div className="relative w-full flex justify-center h-[1.1em] my-3 overflow-visible">
            <AnimatePresence>
              <motion.span
                key={WORDS[currentWordIndex]}
className="absolute italic font-serif lowercase text-center pr-[0.15em] pl-[0.05em] text-transparent bg-clip-text 
                           bg-[linear-gradient(110deg,#7A5C22_0%,#997A36_35%,#D1BA84_50%,#997A36_65%,#7A5C22_100%)] 
                           dark:bg-[linear-gradient(110deg,#C99C47_0%,#E9D39B_35%,#FFF6DE_50%,#D8B86D_65%,#8F6B24_100%)] 
                           will-change-transform"
                                           initial={{ y: "40%", opacity: 0, filter: "blur(4px)" }}
                animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                exit={{ y: "-40%", opacity: 0, filter: "blur(4px)" }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
              >
                {WORDS[currentWordIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
          
          <motion.span
            variants={BLUR_REVEAL}
            initial="initial"
            animate="animate"
            transition={{ duration: 1.4, ease: EASE, delay: 0.1 }}
            className="block w-full"
          >
            Moments.
          </motion.span>
        </h1>
        
        {/* Premium Description - Increased from text-sm to text-base for mobile readability */}
        <motion.p
          variants={BLUR_REVEAL}
          initial="initial"
          animate="animate"
          transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
          className="max-w-2xl text-neutral-600 dark:text-neutral-400 text-base md:text-lg lg:text-xl font-light leading-relaxed mb-16 px-4"
        >
          At Digital Graphics, we understand the power of appreciation. That's why we've launched <strong className="font-medium text-neutral-800 dark:text-neutral-200">Proud Moment by Digital Graphics</strong> — a brand dedicated to celebrating achievements with meaningful design.
        </motion.p>
      </motion.div>
    </section>
  );
}

const CHAPTERS: Chapter[] = [
  {
    id: "01",
    title: "Custom Trophy Design",
    desc: "Unique designs tailored to your event theme — materials, shapes, and engravings that tell a story.",
    accent: "#FFB800",
    points: [
      "100% Custom Shapes & Concepts",
      "Premium Acrylic, Metal & Wood Finishes",
      "Precision Laser Engraving",
      "Brand & Event Personalization"
    ]
  },
  {
    id: "02",
    title: "Elegant Crystal Awards",
    desc: "Elegant and timeless — wood, crystal, or metal awards personalized with your branding and message.",
    accent: "#00E5FF",
    points: [
      "Ultra-Clear Premium Crystal",
      "Deep Laser Engraved Detailing",
      "Luxury Presentation Boxes",
      "Executive & Corporate Collections"
    ]
  },
  {
    id: "03",
    title: "Bespoke Medals",
    desc: "Perfect for sports, academics, and more. Fully custom options in gold, silver, and bronze.",
    accent: "#FF3366",
    points: [
      "Custom Die-Cast Medal Designs",
      "Gold, Silver & Bronze Finishes",
      "Premium Ribbon Customization",
      "Sports, Schools & Institutions"
    ]
  },
  {
    id: "04",
    title: "Commemorative Mementos",
    desc: "Elegant keepsakes that serve as memorable tokens of appreciation or participation.",
    accent: "#00FF66",
    points: [
      "Minimal Contemporary Designs",
      "Premium Engraving & Etching",
      "Corporate & Personal Milestones",
      "Long-Lasting Quality Materials"
    ]
  },
  {
    id: "05",
    title: "Corporate Gifting",
    desc: "Build strong business relationships with personalized, premium corporate gifting solutions.",
    accent: "#7B61FF",
    points: [
      "Premium Executive Gift Sets",
      "Complete Brand Customization",
      "Luxury Packaging Experience",
      "Bulk Orders with Consistent Quality"
    ]
  }
];

const SvgDesign: React.FC<SvgProps> = ({ accent }) => (   <svg viewBox="0 0 400 400" className="w-full h-full max-w-[280px] md:max-w-[380px] text-neutral-900 dark:text-white" fill="none">     {/* Background Floating UI Elements */}     <motion.g animate={{ y: [-6, 6, -6] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>       {/* Solid UI Card */}       <rect x="230" y="50" width="110" height="70" rx="12" fill="currentColor" opacity="0.05" />       <rect x="230" y="50" width="110" height="70" rx="12" stroke="currentColor" strokeWidth="3" />       <line x1="250" y1="75" x2="280" y2="75" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />       <line x1="250" y1="95" x2="310" y2="95" stroke={accent} strokeWidth="3" strokeLinecap="round" />       <circle cx="315" cy="75" r="8" fill="currentColor" />     </motion.g>     <motion.g animate={{ y: [4, -4, 4] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>       <circle cx="80" cy="100" r="16" stroke={accent} strokeWidth="3" />       <path d="M 60 80 L 70 90 M 100 80 L 90 90" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />     </motion.g>     {/* Sleek Desk & Monitor */}     <path d="M 40 320 L 360 320" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />     <path d="M 90 320 L 130 250 M 190 320 L 150 250" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />     <rect x="70" y="120" width="160" height="110" rx="8" stroke="currentColor" strokeWidth="3" />     <path d="M 70 200 L 230 200" stroke="currentColor" strokeWidth="2" />         {/* Abstract Trophy on Screen */}     <path d="M 120 150 L 180 150 L 165 180 L 135 180 Z" stroke={accent} strokeWidth="3" strokeLinejoin="round" />     <line x1="150" y1="180" x2="150" y2="195" stroke={accent} strokeWidth="3" strokeLinecap="round" />     {/* Modern Character Design (Soft rounded features, bold strokes) */}     <g stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">       <circle cx="280" cy="170" r="22" />       {/* Top knot/Hair detail */}       <circle cx="305" cy="150" r="8" fill="currentColor" />       <path d="M 240 320 C 240 240, 260 220, 280 220 C 300 220, 320 240, 320 320" />       {/* Dynamic Arm reaching to stylus */}       <path d="M 270 240 C 240 260, 210 270, 180 280" />     </g>         {/* Stylus/Pen */}     <line x1="150" y1="290" x2="185" y2="278" stroke={accent} strokeWidth="4" strokeLinecap="round" />   </svg> );

export const SvgTrophy = ({ accent }: { accent: string }) => (
  <svg viewBox="0 0 400 400" className="w-full h-full max-w-[280px] md:max-w-[360px] lg:max-w-[420px] text-neutral-900 dark:text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Editorial Frame with Corner Accents */}
    <rect x="15" y="15" width="370" height="370" stroke="currentColor" strokeWidth="1" opacity="0.2" />
    <path d="M 10 25 L 25 10 M 390 25 L 375 10 M 10 375 L 25 390 M 390 375 L 375 390" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="15" cy="15" r="3" fill="currentColor" />
    <circle cx="385" cy="15" r="3" fill="currentColor" />
    <circle cx="15" cy="385" r="3" fill="currentColor" />
    <circle cx="385" cy="385" r="3" fill="currentColor" />

    {/* Subtle Grid Background */}
    <g opacity="0.05" stroke="currentColor" strokeWidth="1">
      <line x1="100" y1="15" x2="100" y2="385" />
      <line x1="200" y1="15" x2="200" y2="385" />
      <line x1="300" y1="15" x2="300" y2="385" />
      <line x1="15" y1="100" x2="385" y2="100" />
      <line x1="15" y1="200" x2="385" y2="200" />
      <line x1="15" y1="300" x2="385" y2="300" />
    </g>

    {/* Floating UI & Geometric Nodes */}
    <motion.g animate={{ y: [-4, 4, -4] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
      {/* Browser Window */}
      <rect x="40" y="50" width="100" height="60" rx="4" stroke="currentColor" strokeWidth="1.5" fill="var(--bg, transparent)" />
      <path d="M 40 65 L 140 65" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="50" cy="57.5" r="1.5" fill="currentColor" />
      <circle cx="58" cy="57.5" r="1.5" fill="currentColor" />
      <circle cx="66" cy="57.5" r="1.5" fill="currentColor" />
      <line x1="50" y1="80" x2="110" y2="80" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="50" y1="92" x2="90" y2="92" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
    </motion.g>

    <motion.g animate={{ y: [4, -4, 4] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
      {/* Network Nodes */}
      <circle cx="320" cy="70" r="10" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="350" cy="110" r="6" fill={accent} />
      <circle cx="280" cy="100" r="4" fill="currentColor" />
      <line x1="320" y1="80" x2="350" y2="104" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="312" y1="76" x2="284" y2="96" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
    </motion.g>

    {/* Sparkle Stars */}
    <motion.g animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 3, repeat: Infinity }}>
      <path d="M 230 40 Q 230 55 245 55 Q 230 55 230 70 Q 230 55 215 55 Q 230 55 230 40 Z" fill={accent} />
      <path d="M 120 140 Q 120 148 128 148 Q 120 148 120 156 Q 120 148 112 148 Q 120 148 120 140 Z" fill="currentColor" />
    </motion.g>

    {/* Workstation & Minimal Figure */}
    {/* Desk */}
    <line x1="60" y1="340" x2="340" y2="340" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    {/* Laptop */}
    <rect x="220" y="300" width="80" height="40" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M 200 340 L 320 340" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <circle cx="260" cy="320" r="4" fill="currentColor" opacity="0.2" />

    {/* Designer Figure */}
    <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Head & Glasses */}
      <circle cx="160" cy="200" r="22" fill="var(--bg, transparent)" />
      <path d="M 160 178 C 145 178, 135 190, 138 210 C 140 225, 150 230, 160 230 C 180 230, 185 200, 160 178" fill="currentColor" />
      <circle cx="155" cy="200" r="6" fill="var(--bg, white)" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="173" cy="200" r="6" fill="var(--bg, white)" stroke="currentColor" strokeWidth="1.5" />
      <line x1="161" y1="200" x2="167" y2="200" strokeWidth="1.5" />
      {/* Torso & Blazer */}
      <path d="M 110 340 C 110 270, 130 240, 160 240 C 190 240, 210 270, 210 340" />
      <path d="M 130 250 L 160 300 L 190 250" strokeWidth="1.5" />
      <path d="M 160 300 L 160 340" strokeWidth="1.5" />
      {/* Arm sketching */}
      <path d="M 210 280 C 230 290, 240 310, 230 330 L 250 330" />
    </g>

    {/* Large Floating Wireframe Trophy */}
    <motion.g animate={{ y: [-6, 6, -6] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
      {/* Hologram base rays */}
      <path d="M 260 290 L 230 200 M 260 290 L 260 190 M 260 290 L 290 200" stroke={accent} strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
      
      {/* Main Trophy Construction */}
      <polygon points="220,130 300,130 280,180 240,180" fill={accent} opacity="0.1" stroke={accent} strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="220" y1="130" x2="300" y2="130" stroke={accent} strokeWidth="3" strokeLinecap="round" />
      <path d="M 240 180 L 260 210 L 280 180" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <polygon points="245,210 275,210 285,225 235,225" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      
      {/* Floating measurement / UI guides around trophy */}
      <line x1="310" y1="130" x2="330" y2="130" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <line x1="310" y1="180" x2="330" y2="180" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <line x1="320" y1="130" x2="320" y2="180" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      <text x="335" y="158" fill="currentColor" fontSize="10" fontFamily="sans-serif" letterSpacing="1">H.90</text>
      
      {/* Star on trophy */}
      <path d="M 260 145 L 263 152 L 270 152 L 264 157 L 266 164 L 260 160 L 254 164 L 256 157 L 250 152 L 257 152 Z" stroke={accent} strokeWidth="1" fill="none" strokeLinejoin="round" />
    </motion.g>
  </svg>
);

export const SvgCrystal = ({ accent }: { accent: string }) => (
  <svg viewBox="0 0 400 400" className="w-full h-full max-w-[280px] md:max-w-[360px] lg:max-w-[420px] text-neutral-900 dark:text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Editorial Frame with Corner Diamonds */}
    <rect x="15" y="15" width="370" height="370" stroke="currentColor" strokeWidth="1" opacity="0.2" />
    <path d="M 15 30 L 30 15 M 385 30 L 370 15 M 15 370 L 30 385 M 385 370 L 370 385" stroke="currentColor" strokeWidth="1.5" />
    
    {/* Floating Geometry / Background Orbits */}
    <motion.g animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "200px 200px" }}>
      <circle cx="100" cy="100" r="150" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" opacity="0.3" />
      <circle cx="300" cy="100" r="4" fill={accent} />
      <path d="M 80 250 L 95 250 M 87.5 242.5 L 87.5 257.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="320" cy="280" r="8" stroke={accent} strokeWidth="1.5" />
    </motion.g>

    {/* Sparkles */}
    <motion.g animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
      <path d="M 120 70 Q 120 90 140 90 Q 120 90 120 110 Q 120 90 100 90 Q 120 90 120 70 Z" fill={accent} />
      <path d="M 290 140 Q 290 150 300 150 Q 290 150 290 160 Q 290 150 280 150 Q 290 150 290 140 Z" fill="currentColor" />
    </motion.g>

    {/* Modern Character Silhouettes */}
    <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="200" cy="290" r="24" fill="var(--bg, transparent)" />
      {/* Abstract sleek body */}
      <path d="M 130 400 C 130 350, 160 325, 200 325 C 240 325, 270 350, 270 400" fill="currentColor" opacity="0.05" />
      <path d="M 130 400 C 130 350, 160 325, 200 325 C 240 325, 270 350, 270 400" />
      
      {/* Expressive Arms presenting the crystal */}
      <path d="M 145 345 C 120 310, 130 250, 160 230" />
      <path d="M 255 345 C 280 310, 270 250, 240 230" />
      
      {/* Solid dots for hands/gloves touch */}
      <circle cx="160" cy="230" r="5" fill="currentColor" />
      <circle cx="240" cy="230" r="5" fill="currentColor" />
    </g>

    {/* The Crystal Award (Geometric & Faceted) */}
    <motion.g animate={{ y: [-8, 8, -8] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
      {/* Radiant Light Lines behind Crystal */}
      <g stroke={accent} strokeWidth="1" strokeLinecap="round" opacity="0.5">
        <line x1="200" y1="160" x2="200" y2="70" />
        <line x1="200" y1="160" x2="130" y2="110" />
        <line x1="200" y1="160" x2="270" y2="110" />
        <line x1="200" y1="160" x2="110" y2="160" />
        <line x1="200" y1="160" x2="290" y2="160" />
      </g>

      {/* Crystal Base Polygon */}
      <polygon points="200,80 250,140 230,220 170,220 150,140" fill="currentColor" opacity="0.8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <polygon points="200,80 250,140 230,220 170,220 150,140" fill={accent} opacity="0.2" />
      
      {/* Facet Lines */}
      <polygon points="200,80 200,160 150,140" fill={accent} opacity="0.4" />
      <polygon points="200,80 200,160 250,140" fill="var(--bg, white)" opacity="0.2" />
      <polygon points="150,140 200,160 170,220" fill="var(--bg, white)" opacity="0.1" />
      <polygon points="250,140 200,160 230,220" fill={accent} opacity="0.6" />
      <polygon points="170,220 200,160 230,220" fill="currentColor" opacity="0.9" />

      {/* Edge Highlights */}
      <path d="M 200 80 L 200 160 M 150 140 L 200 160 M 250 140 L 200 160 M 170 220 L 200 160 M 230 220 L 200 160" stroke="var(--bg, white)" strokeWidth="1.5" strokeLinejoin="round" />
    </motion.g>
  </svg>
);

export const SvgMedal = ({ accent }: { accent: string }) => (
  <svg viewBox="0 0 400 400" className="w-full h-full max-w-[280px] md:max-w-[360px] lg:max-w-[420px] text-neutral-900 dark:text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Editorial Frame with Cut Corners */}
    <path d="M 15 40 L 40 15 L 360 15 L 385 40 L 385 360 L 360 385 L 40 385 L 15 360 Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M 25 50 L 50 25 M 375 50 L 350 25 M 25 350 L 50 375 M 375 350 L 350 375" stroke="currentColor" strokeWidth="1" opacity="0.3" />

    {/* Dynamic Background Elements / Confetti */}
    <motion.g animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
      <path d="M 50 120 C 100 80, 200 70, 350 130" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" opacity="0.5" strokeLinecap="round" />
      <circle cx="80" cy="180" r="3" fill={accent} />
      <path d="M 320 200 L 330 210 M 330 200 L 320 210" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="340" cy="100" r="10" stroke={accent} strokeWidth="1.5" />
      <rect x="70" y="80" width="8" height="8" transform="rotate(45 70 80)" fill="currentColor" />
    </motion.g>

    {/* Floating Chat / Achievement Bubbles */}
    <motion.g animate={{ y: [-4, 4, -4] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
      <path d="M 280 180 h 40 a 10 10 0 0 1 10 10 v 20 a 10 10 0 0 1 -10 10 h -25 l -10 10 v -10 h -5 a 10 10 0 0 1 -10 -10 v -20 a 10 10 0 0 1 10 -10 z" fill="var(--bg, transparent)" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Heart Icon inside bubble */}
      <path d="M 293 195 C 293 190, 300 190, 300 195 C 300 190, 307 190, 307 195 C 307 202, 300 208, 300 208 C 300 208, 293 202, 293 195 Z" fill={accent} />
    </motion.g>

    <motion.g animate={{ y: [4, -4, 4] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
      <path d="M 60 220 h 40 a 10 10 0 0 1 10 10 v 20 a 10 10 0 0 1 -10 10 h -5 v 10 l -10 -10 h -25 a 10 10 0 0 1 -10 -10 v -20 a 10 10 0 0 1 10 -10 z" fill="currentColor" opacity="0.05" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Check Icon */}
      <path d="M 72 240 L 78 246 L 88 234" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </motion.g>

    {/* Athlete/Winner Figure */}
    <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="200" cy="270" r="24" fill="var(--bg, transparent)" />
      {/* Hair detail */}
      <path d="M 176 270 C 176 250, 224 250, 224 270" fill="currentColor" />
      <path d="M 130 400 C 130 330, 160 300, 200 300 C 240 300, 270 330, 270 400" fill="var(--bg, transparent)" />
      
      {/* Hand holding medal over heart */}
      <path d="M 140 350 C 150 320, 180 320, 200 330" />
      <circle cx="200" cy="330" r="5" fill="currentColor" />
    </g>

    {/* Large Editorial Style Medal */}
    <motion.g animate={{ y: [-6, 6, -6], rotate: [-1, 1, -1] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} style={{ transformOrigin: "200px 100px" }}>
      {/* Crisp Ribbon */}
      <path d="M 130 60 L 200 150 M 270 60 L 200 150" stroke={accent} strokeWidth="24" strokeLinecap="square" opacity="0.15" />
      <path d="M 140 60 L 200 150 M 260 60 L 200 150" stroke={accent} strokeWidth="8" strokeLinecap="square" />
      <path d="M 130 60 L 200 150 M 270 60 L 200 150" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
      
      {/* Medal Body */}
      <circle cx="200" cy="170" r="45" fill="var(--bg, white)" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="200" cy="170" r="38" fill="currentColor" opacity="0.03" />
      <circle cx="200" cy="170" r="32" stroke={accent} strokeWidth="1.5" strokeDasharray="4 4" />
      
      {/* Center Star/Icon */}
      <path d="M 200 148 L 206 162 L 220 164 L 210 174 L 212 188 L 200 182 L 188 188 L 190 174 L 180 164 L 194 162 Z" fill={accent} stroke={accent} strokeWidth="1.5" strokeLinejoin="round" />
      
      {/* Small floating sparkles around medal */}
      <path d="M 255 125 Q 260 130 265 130 Q 260 130 260 135 Q 260 130 255 130 Q 260 130 255 125 Z" fill="currentColor" />
      <path d="M 140 180 Q 145 185 150 185 Q 145 185 145 190 Q 145 185 140 185 Q 145 185 140 180 Z" fill={accent} />
    </motion.g>
  </svg>
);

export const SvgMemento = ({ accent }: { accent: string }) => (
  <svg viewBox="0 0 400 400" className="w-full h-full max-w-[280px] md:max-w-[360px] lg:max-w-[420px] text-neutral-900 dark:text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Minimal Dual Frame */}
    <rect x="20" y="20" width="360" height="360" stroke="currentColor" strokeWidth="1" />
    <rect x="26" y="26" width="348" height="348" stroke="currentColor" strokeWidth="1" opacity="0.3" />

    {/* Stage/Ground line */}
    <path d="M 40 340 L 360 340" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    
    {/* Architectural Monolith Memento in Background */}
    <motion.g animate={{ y: [-3, 3, -3] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
      {/* Pedestal Base */}
      <rect x="150" y="280" width="100" height="15" stroke="currentColor" strokeWidth="1.5" fill="var(--bg, transparent)" strokeLinejoin="round" />
      <rect x="160" y="265" width="80" height="15" stroke="currentColor" strokeWidth="1.5" fill="var(--bg, transparent)" strokeLinejoin="round" />
      
      {/* Main Glass/Stone Slab */}
      <path d="M 170 120 L 230 120 L 230 265 L 170 265 Z" fill="currentColor" opacity="0.05" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      
      {/* 3D Depth Lines */}
      <path d="M 230 120 L 245 105 L 245 250 L 230 265" fill={accent} opacity="0.1" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M 170 120 L 185 105 L 245 105" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      
      {/* Geometric accents inside memento */}
      <circle cx="200" cy="160" r="14" stroke={accent} strokeWidth="1.5" />
      <circle cx="200" cy="160" r="6" fill={accent} />
      <line x1="185" y1="200" x2="215" y2="200" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="185" y1="210" x2="205" y2="210" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Sparkling Light on Monolith */}
      <path d="M 155 125 Q 165 130 175 130 Q 165 130 165 140 Q 165 130 155 130 Q 165 130 155 125 Z" fill="currentColor" />
    </motion.g>

    {/* Abstract Floating Connection Nodes & Calendar/Date */}
    <motion.g animate={{ y: [4, -4, 4] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
      <path d="M 80 120 L 120 80 M 280 80 L 320 120" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" strokeLinecap="round" />
      <circle cx="120" cy="80" r="4" fill={accent} />
      <circle cx="280" cy="80" r="4" fill={accent} />
      <circle cx="80" cy="120" r="3" fill="currentColor" />
      <circle cx="320" cy="120" r="3" fill="currentColor" />
      
      {/* Minimal Calendar Icon Floating */}
      <rect x="290" y="140" width="30" height="30" rx="3" stroke="currentColor" strokeWidth="1.5" fill="var(--bg, transparent)" />
      <path d="M 290 150 L 320 150 M 298 137 L 298 143 M 312 137 L 312 143" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="305" cy="160" r="2" fill={accent} />
    </motion.g>

    {/* Two people exchanging / shaking hands - Bold Editorial Outlines */}
    <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Left Person */}
      <circle cx="110" cy="210" r="20" fill="var(--bg, transparent)" />
      {/* Short Hair */}
      <path d="M 90 210 C 90 185, 130 185, 130 210" fill="currentColor" />
      <path d="M 50 340 C 50 270, 80 250, 110 250 C 130 250, 145 260, 155 280" fill="var(--bg, transparent)" />
      <path d="M 100 280 C 130 300, 160 300, 185 285" /> 
      
      {/* Right Person */}
      <circle cx="290" cy="210" r="20" fill="var(--bg, transparent)" />
      {/* Glasses & Hair detail */}
      <circle cx="280" cy="210" r="5" fill="none" />
      <circle cx="294" cy="210" r="5" fill="none" />
      <line x1="285" y1="210" x2="289" y2="210" />
      <path d="M 350 340 C 350 270, 320 250, 290 250 C 270 250, 255 260, 245 280" fill="var(--bg, transparent)" />
      <path d="M 300 280 C 270 300, 240 300, 215 285" />

      {/* Solid Handshake Accent Block */}
      <path d="M 185 285 L 200 270 L 215 285" stroke={accent} strokeWidth="4" fill="none" strokeLinejoin="miter" />
      <circle cx="200" cy="270" r="4" fill={accent} stroke="none" />
    </g>
  </svg>
);

export const SvgGift = ({ accent }: { accent: string }) => (
  <svg viewBox="0 0 400 400" className="w-full h-full max-w-[280px] md:max-w-[360px] lg:max-w-[420px] text-neutral-900 dark:text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Elegant Crosshair Frame */}
    <line x1="20" y1="20" x2="40" y2="20" stroke="currentColor" strokeWidth="1.5" />
    <line x1="20" y1="20" x2="20" y2="40" stroke="currentColor" strokeWidth="1.5" />
    <line x1="380" y1="20" x2="360" y2="20" stroke="currentColor" strokeWidth="1.5" />
    <line x1="380" y1="20" x2="380" y2="40" stroke="currentColor" strokeWidth="1.5" />
    <line x1="20" y1="380" x2="40" y2="380" stroke="currentColor" strokeWidth="1.5" />
    <line x1="20" y1="380" x2="20" y2="360" stroke="currentColor" strokeWidth="1.5" />
    <line x1="380" y1="380" x2="360" y2="380" stroke="currentColor" strokeWidth="1.5" />
    <line x1="380" y1="380" x2="380" y2="360" stroke="currentColor" strokeWidth="1.5" />

    {/* Background Minimal Plant / Decor */}
    <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6">
      <path d="M 320 280 C 320 280, 290 250, 310 210 C 330 210, 340 250, 320 280 Z" />
      <path d="M 320 280 C 320 280, 350 260, 360 230 C 340 220, 330 250, 320 280 Z" />
      <path d="M 320 280 C 320 280, 280 280, 270 250 C 290 240, 310 260, 320 280 Z" />
      <path d="M 320 280 L 320 310" />
      <rect x="305" y="310" width="30" height="30" rx="2" fill="var(--bg, transparent)" />
      <line x1="305" y1="325" x2="335" y2="325" stroke={accent} strokeWidth="1.5" />
    </g>

    {/* Floating Abstract UI/Message Bubbles */}
    <motion.g animate={{ y: [-5, 5, -5] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
      {/* Video/Play Card */}
      <rect x="60" y="80" width="60" height="40" rx="6" stroke="currentColor" strokeWidth="1.5" fill="var(--bg, transparent)" />
      <polygon points="85,92 85,108 98,100" fill={accent} stroke={accent} strokeWidth="1.5" strokeLinejoin="round" />
      
      {/* Solid Message Bubble */}
      <path d="M 250 60 h 50 a 10 10 0 0 1 10 10 v 20 a 10 10 0 0 1 -10 10 h -35 l -10 10 v -10 h -5 a 10 10 0 0 1 -10 -10 v -20 a 10 10 0 0 1 10 -10 z" fill="currentColor" opacity="0.05" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="265" y1="80" x2="295" y2="80" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="265" y1="90" x2="285" y2="90" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
    </motion.g>

    <motion.g animate={{ y: [4, -4, 4] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
      <path d="M 120 140 Q 130 145 140 145 Q 130 145 130 155 Q 130 145 120 145 Q 130 145 120 140 Z" fill="currentColor" />
      <circle cx="280" cy="150" r="14" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="280" cy="150" r="4" fill={accent} />
    </motion.g>

    {/* Modern Person Presenting Box */}
    <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="200" cy="150" r="22" fill="var(--bg, transparent)" />
      {/* Hair Top Knot / Bun */}
      <circle cx="200" cy="122" r="8" fill="currentColor" />
      {/* Suit/Blazer */}
      <path d="M 120 340 C 120 250, 160 210, 200 210 C 240 210, 280 250, 280 340" fill="var(--bg, transparent)" />
      <path d="M 175 220 L 200 270 L 225 220" />
      
      {/* Sleek arms stretching out to hold box */}
      <path d="M 150 260 C 130 290, 140 320, 160 310" />
      <path d="M 250 260 C 270 290, 260 320, 240 310" />
      
      {/* Hands */}
      <circle cx="160" cy="310" r="5" fill="currentColor" />
      <circle cx="240" cy="310" r="5" fill="currentColor" />
    </g>

    {/* Premium Corporate Gift Box (Geometric & High Contrast) */}
    <motion.g animate={{ y: [-4, 4, -4] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
      {/* Light glow behind box */}
      <circle cx="200" cy="270" r="40" fill={accent} opacity="0.1" />
      
      {/* Box Lid */}
      <polygon points="140,250 200,225 260,250 200,275" fill="currentColor" opacity="0.9" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      
      {/* Box Body (Left & Right sides) */}
      <polygon points="145,260 198,282 198,330 145,308" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <polygon points="255,260 202,282 202,330 255,308" fill="var(--bg, transparent)" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      
      {/* Bold Accent Ribbon on sides */}
      <line x1="200" y1="282" x2="200" y2="330" stroke={accent} strokeWidth="3" />
      <path d="M 172 250 L 172 320" stroke={accent} strokeWidth="2" opacity="0.5" />
      <path d="M 228 250 L 228 320" stroke={accent} strokeWidth="2" opacity="0.5" />

      {/* Ribbon Crossing Lid */}
      <path d="M 160 242 L 240 275 M 240 242 L 160 275" stroke={accent} strokeWidth="2" />
      
      {/* Elegant Ribbon Bow */}
      <path d="M 200 240 C 170 210, 150 230, 200 250 C 250 230, 230 210, 200 240 Z" fill={accent} stroke={accent} strokeWidth="1.5" strokeLinejoin="round" opacity="0.9" />
      <circle cx="200" cy="245" r="3" fill="var(--bg, white)" />
    </motion.g>
  </svg>
);

const VISUALS = [SvgDesign, SvgCrystal, SvgMedal, SvgMemento, SvgGift];

const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ accent = "currentColor" }) => {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } }
  };

  const stagger: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  return (
    <section className="relative w-full py-16 md:py-24 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white overflow-hidden">
      
      {/* Container */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* UPPER PART: Enhanced Editorial Header */}
        <div className="relative pb-12 md:pb-20 border-b border-neutral-200 dark:border-neutral-800">
          
          {/* Abstract Animated Geometry in Background of Header */}
          <div className="absolute right-0 top-0 w-64 h-64 md:w-96 md:h-96 opacity-5 dark:opacity-10 pointer-events-none overflow-hidden">
            <motion.svg viewBox="0 0 100 100" className="w-full h-full" animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}>
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="2 4" />
              <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" fill="none" />
              <path d="M 50 10 L 50 90 M 10 50 L 90 50" stroke="currentColor" strokeWidth="0.5" />
              <rect x="20" y="20" width="60" height="60" stroke="currentColor" strokeWidth="0.5" fill="none" transform="rotate(45 50 50)" />
            </motion.svg>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 relative z-10"
          >
            {/* Title Area */}
            <div className="max-w-3xl">
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 0V12M0 6H12" stroke={accent} strokeWidth="1.5" />
                </svg>
                <span className="text-[10px] md:text-xs font-semibold tracking-[0.25em] uppercase text-neutral-500">
                  The Proud Moment
                </span>
              </motion.div>
              
              <motion.h2 
                variants={fadeUp}
                className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter leading-[1.1]"
              >
                Why Choose <br className="hidden md:block" />
                <span className="font-medium italic pr-2" style={{ color: accent }}>Digital Graphics?</span>
              </motion.h2>
            </div>

            {/* Narrative Paragraph */}
            <motion.div variants={fadeUp} className="max-w-md lg:w-[400px]">
              <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[2px] before:bg-neutral-200 dark:before:bg-neutral-800">
                <div className="absolute left-0 top-2 w-[2px] h-8 bg-currentColor" style={{ backgroundColor: accent }} />
                <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed font-light">
                  We believe every achievement deserves more than a generic token. We ensure every piece carries 
                  <strong className="font-medium text-neutral-900 dark:text-white"> emotional and brand value</strong>, 
                  whether it's a grand ceremony or a quiet moment of gratitude.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* LOWER PART: Compact, Space-Efficient Feature Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-0 border-b border-neutral-200 dark:border-neutral-800"
        >
          {/* Feature 01 */}
          <motion.div 
            variants={fadeUp} 
            className="group relative flex flex-row md:flex-col gap-5 md:gap-6 p-6 md:p-8 lg:p-10 border-b md:border-b-0 md:border-r border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900/30 transition-colors"
          >
            <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 group-hover:border-currentColor transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" stroke={accent} />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-mono text-neutral-400">01</span>
                <h3 className="text-lg md:text-xl font-medium tracking-tight group-hover:text-currentColor transition-colors" style={{ color: accent }}>Thoughtful Design</h3>
              </div>
              <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed font-light">
                Moving beyond standard templates to create architectural forms that elevate recognition into an art piece.
              </p>
            </div>
          </motion.div>

          {/* Feature 02 */}
          <motion.div 
            variants={fadeUp} 
            className="group relative flex flex-row md:flex-col gap-5 md:gap-6 p-6 md:p-8 lg:p-10 border-b md:border-b-0 md:border-r border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900/30 transition-colors"
          >
            <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 group-hover:border-currentColor transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke={accent} />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-mono text-neutral-400">02</span>
                <h3 className="text-lg md:text-xl font-medium tracking-tight group-hover:text-currentColor transition-colors" style={{ color: accent }}>Premium Craft</h3>
              </div>
              <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed font-light">
                Meticulously crafted from the highest grade materials, ensuring the tactile weight matches its visual presence.
              </p>
            </div>
          </motion.div>

          {/* Feature 03 */}
          <motion.div 
            variants={fadeUp} 
            className="group relative flex flex-row md:flex-col gap-5 md:gap-6 p-6 md:p-8 lg:p-10 hover:bg-neutral-50 dark:hover:bg-neutral-900/30 transition-colors"
          >
            <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 group-hover:border-currentColor transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" stroke={accent} />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-mono text-neutral-400">03</span>
                <h3 className="text-lg md:text-xl font-medium tracking-tight group-hover:text-currentColor transition-colors" style={{ color: accent }}>Personalization</h3>
              </div>
              <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed font-light">
                Seamlessly integrating your brand's identity into the physical piece, keeping recognition deeply connected.
              </p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};


export interface Chapter {
  id: string | number;
  title: string;
  desc: string;
  intro?: string;
  accent: string;
  points?: string[];
}
 
export type VisualComponentType = React.ComponentType<{ accent: string }>;
 

interface MobileCardProps {
  chapter: Chapter;
  index: number;
  total: number;
  stageProgress: MotionValue<number>;
  visual: VisualComponentType;
  reducedMotion: boolean;
}


const SEGMENT_VH = 68;
const HOLD_FRACTION = 0.65;

function useLenisMobileOnly(): void {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let lenis: any;
    let rafId = 0;
    let destroyed = false;

    const mq = window.matchMedia("(max-width: 767px)");

    const teardown = () => {
      if (rafId) cancelAnimationFrame(rafId);
      lenis?.destroy?.();
      lenis = undefined;
    };

    const setup = async () => {
      if (!mq.matches || destroyed) return;
      try {
        const mod = await import("lenis");
        const Lenis = mod.default;

        lenis = new Lenis({
          duration: 1.1,
          easing: (t: number) => 1 - Math.pow(1 - t, 3),
          smoothWheel: true,
          touchMultiplier: 1.1,
        });

        const raf = (time: number) => {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);
      } catch {
        // Fall back natively if module unavailable
      }
    };

    const handleChange = () => {
      teardown();
      setup();
    };

    setup();
    mq.addEventListener("change", handleChange);

    return () => {
      destroyed = true;
      mq.removeEventListener("change", handleChange);
      teardown();
    };
  }, []);
}

/* ============================================================
   MOBILE CARD — High-Performance Stack Logic & Anti-Aliasing
   ============================================================ */
const MobileCard: React.FC<MobileCardProps> = React.memo(
  ({ chapter, index, total, stageProgress, visual: VisualComponent, reducedMotion }) => {
    const holdEnd = index + HOLD_FRACTION;
    const entryStart = index - (1 - HOLD_FRACTION);

    let opacityInputRange: number[];
    let opacityRange: number[];
    let motionInputRange: number[];
    let yRange: string[];
    let scaleRange: number[];

    if (index === 0) {
      motionInputRange = [0, holdEnd, index + 1];
      opacityInputRange = motionInputRange;
      opacityRange = [1, 1, 0];
      yRange = ["0px", "0px", "-24px"];
      scaleRange = [1, 1, 0.985];
    } else if (index === total - 1) {
      motionInputRange = [entryStart, index, total];
      opacityInputRange = motionInputRange;
      opacityRange = [1, 1, 1];
      yRange = ["32px", "0px", "0px"];
      scaleRange = [0.985, 1, 1];
    } else {
      motionInputRange = [entryStart, index, holdEnd, index + 1];
      opacityInputRange = motionInputRange;
      opacityRange = [1, 1, 1, 0];
      yRange = ["32px", "0px", "0px", "-24px"];
      scaleRange = [0.985, 1, 1, 0.985];
    }

    const opacity = useTransform(stageProgress, opacityInputRange, opacityRange);
    const y = useTransform(stageProgress, motionInputRange, yRange);
    const scale = useTransform(stageProgress, motionInputRange, scaleRange);
    const svgY = useTransform(stageProgress, [index, index + 1], ["6%", "-6%"]);

    return (
      <motion.div
        className="absolute inset-0 w-full h-full shadow-[0_24px_60px_-15px_rgba(28,25,23,0.05)] dark:shadow-none isolate"
        style={{
          opacity: reducedMotion ? 1 : opacity,
          y: reducedMotion ? 0 : y,
          scale: reducedMotion ? 1 : scale,
          zIndex: total - index,
          willChange: "transform, opacity",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          transform: "translate3d(0, 0, 0)",
          WebkitTransformStyle: "preserve-3d",
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          contain: "layout paint size",
          transition: reducedMotion ? `opacity 0.3s ${EASE}` : undefined,
        }}
      >
        {/* 1. OPAQUE BASE & CLIPPING MASK (Fixes square glitch and bleed-through) */}
        <div className="relative w-full h-full bg-stone-50 dark:bg-[#1C1C1C] rounded-[1.75rem] overflow-hidden isolate">
          
          {/* 2. SVG BACKGROUND LAYER */}
          <div
            className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.32] dark:opacity-[0.30] pointer-events-none"
            style={{
  color: chapter.accent,
  filter: "contrast(1.05) saturate(0.9)",
}}
          >
            <motion.div
              className="w-[70%] h-[70%] flex items-center justify-center"
              style={{ y: reducedMotion ? "0%" : svgY }}
            >
              <VisualComponent accent={chapter.accent} />
            </motion.div>
          </div>

          {/* 3. CONTENT OVERLAY (Translucent bg + blur, letting parent clip the corners) */}
<div className="relative z-10 flex flex-col h-full p-7 sm:p-9 justify-between select-none">
              <div className="my-auto space-y-4 rounded-2xl px-4 py-4
                bg-stone-50/55 dark:bg-[#1C1C1C]/55
                backdrop-blur-[2px]">
              {chapter.intro && (
                <p className="text-[11px] font-semibold tracking-[0.15em] text-neutral-400 dark:text-neutral-500 uppercase">
                  {chapter.intro}
                </p>
              )}

              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-neutral-900 dark:text-zinc-50 leading-[1.12] text-balance">
                {chapter.title}
              </h2>

              <p className="text-sm sm:text-base text-zinc-950 dark:text-neutral-200 leading-relaxed font-light text-balance pt-2">
                {chapter.desc}
              </p>
            </div>

            <div
  className="pt-6 mt-6 rounded-2xl px-4 py-4
             bg-stone-50/55 dark:bg-[#1C1C1C]/55
             backdrop-blur-[2px]
             border-t border-neutral-200/60 dark:border-white/[0.06]"
>
              {chapter.points?.slice(0, 3).map((point, idx) => (
                <div key={idx} className="flex items-start gap-3.5">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={chapter.accent}
                    strokeWidth="2.5"
                    className="flex-shrink-0 mt-[4px] opacity-80"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[13px] font-medium text-neutral-600 dark:text-neutral-300 tracking-wide">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 4. CRISP BORDER OVERLAY (Drawn over everything so it never aliases) */}
          <div className="absolute inset-0 z-20 pointer-events-none rounded-[1.75rem] border border-neutral-200/60 dark:border-white/[0.1] shadow-inner" />
        </div>
      </motion.div>
    );
  }
);
MobileCard.displayName = "MobileCard";

/* ============================================================
   MAIN STORYTELLING CONTAINER COMPONENT
   ============================================================ */
const StorytellingSection: React.FC<StorytellingSectionProps> = ({
  CHAPTERS,
  VISUALS,
  activeIndex,
  sectionRefs,
}) => {
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const totalChapters = CHAPTERS.length;
  const reducedMotion = useReducedMotion() ?? false;

  useLenisMobileOnly();

  const { scrollYProgress } = useScroll({
    target: mobileContainerRef,
    offset: ["start start", "end end"],
  });

  const stageProgress = useTransform(scrollYProgress, (v) => v * totalChapters);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  useMotionValueEvent(stageProgress, "change", (latest) => {
    const idx = Math.min(totalChapters - 1, Math.max(0, Math.floor(latest)));
    setActiveCardIndex((prev) => (prev === idx ? prev : idx));
  });

  const mountedIndices = useMemo(() => {
    const set = new Set<number>();
    for (let i = activeCardIndex - 1; i <= activeCardIndex + 1; i++) {
      if (i >= 0 && i < totalChapters) set.add(i);
    }
    return set;
  }, [activeCardIndex, totalChapters]);

  const progressBarWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="relative w-full text-neutral-900 dark:text-zinc-50 font-sans">
      {/* MOBILE SCROLLER LAYER */}
      <div
        ref={mobileContainerRef}
        className="block md:hidden relative w-full"
        style={{ height: `${totalChapters * SEGMENT_VH}vh` }}
      >
        <div className="absolute top-0 left-0 w-full h-full flex flex-col pointer-events-none z-0">
          {CHAPTERS.map((_, i) => (
            <div
              key={i}
              ref={(el) => {
                sectionRefs.current[i] = el;
              }}
              className="flex-1 w-full"
            />
          ))}
        </div>

        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col px-4 justify-center bg-stone-100 dark:bg-black isolate">
          <motion.div
            className="absolute inset-0 z-0 transition-colors duration-700 ease-in-out opacity-40 dark:opacity-20"
            style={{
              background: `radial-gradient(circle at 50% 15%, ${
                CHAPTERS[activeIndex]?.accent || "#fff"
              }20, transparent 65%)`,
            }}
          />

          <div className="absolute top-8 left-0 w-full px-8 flex items-center justify-between z-50 text-neutral-400 dark:text-neutral-600 pb-safe">
            <span className="text-[10px] font-mono tracking-widest font-medium">
              {String(activeCardIndex + 1).padStart(2, "0")}
            </span>
            <div className="flex-1 mx-5 h-[1px] bg-neutral-200 dark:bg-white/[0.08] relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-neutral-800 dark:bg-zinc-200"
                style={{ width: progressBarWidth }}
              />
            </div>
            <span className="text-[10px] font-mono tracking-widest font-medium">
              {String(totalChapters).padStart(2, "0")}
            </span>
          </div>

          <div className="relative w-full max-w-[414px] mx-auto px-6 h-[66vh] z-10 isolate flex items-center justify-center">
            {CHAPTERS.map((chapter, i) => {
              if (!mountedIndices.has(i)) return null;
              return (
                <MobileCard
                  key={chapter.id}
                  chapter={chapter}
                  index={i}
                  total={totalChapters}
                  stageProgress={stageProgress}
                  visual={VISUALS[i]}
                  reducedMotion={reducedMotion}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* DESKTOP VIEW SCROLLER LAYER */}
      <div className="hidden md:flex w-full relative">
        <div className="w-1/2 h-screen sticky top-0 z-20 flex items-center justify-center bg-stone-50 dark:bg-zinc-950 border-r border-stone-200 dark:border-zinc-900">
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            {CHAPTERS.map((chapter, index) => {
              const VisualComponent = VISUALS[index];
              return (
                <motion.div
                  key={chapter.id}
                  animate={{
                    opacity: activeIndex === index ? 1 : 0,
                    scale: activeIndex === index ? 1 : 0.92,
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <VisualComponent accent={chapter.accent} />
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="w-1/2 relative z-10 flex flex-col bg-stone-50 dark:bg-zinc-950">
          {CHAPTERS.map((chapter, index) => (
            <div
              key={chapter.id}
              ref={(el) => {
                sectionRefs.current[index] = el;
              }}
              className="w-full min-h-screen flex flex-col justify-center px-16 lg:px-24"
            >
              <h2 className="text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] mb-6">
                {chapter.title}
              </h2>
              <p className="text-lg text-neutral-500 dark:text-neutral-400 font-light leading-relaxed mb-8">
                {chapter.desc}
              </p>

              {chapter.points && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-4 pt-8 border-t border-stone-200 dark:border-zinc-800/50">
                  {chapter.points.map((point, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 py-2 border-b border-stone-200/50 dark:border-zinc-800/50 last:border-b-0 lg:last:border-b"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={chapter.accent}
                        strokeWidth="2.5"
                        className="flex-shrink-0"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default function ProudMoments() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<Array<HTMLDivElement | null>>([]);

  // --- BULLETPROOF SCROLL TRACKER ---
  // Calculates exactly which section is intersecting the 40% height mark of the screen.
  useEffect(() => {
    const handleScroll = () => {
      const triggerY = window.innerHeight * 0.4;
      let closestIndex = 0;
      let minDistance = Infinity;

      sectionRefs.current.forEach((section, index) => {
        if (!section) return;
        const rect = section.getBoundingClientRect();
        
        // If the 40% line is currently inside this section's top/bottom bounds, it's active.
        if (rect.top <= triggerY && rect.bottom >= triggerY) {
          closestIndex = index;
          minDistance = 0;
        } 
        // Fallback for extreme tops/bottoms of page
        else if (minDistance !== 0) {
          const distance = Math.min(Math.abs(rect.top - triggerY), Math.abs(rect.bottom - triggerY));
          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
          }
        }
      });
      
      setActiveIndex(closestIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initialize on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full bg-stone-50 dark:bg-zinc-950 text-neutral-900 dark:text-zinc-50 font-sans">
      <SEO
        title="Proud Moments"
        description="Celebrating achievements with meaningful design. Digital Graphics creates custom trophies, awards, medals, and commemorative mementos for brands, sports events, and corporate recognition."
        keywords="trophy design, awards, medals, corporate gifts, recognition, custom trophies, crystal awards, Ranchi, Jharkhand"
        canonical="https://digitalgraphicsindia.com/proud-moments"
        robots="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        openGraph={proudMomentsOpenGraph}
        twitterCard={proudMomentsTwitterCard}
        language="en"
        charset="UTF-8"
        structuredData={proudMomentsPageStructuredData()}
      />
      <AwardsHero />
      {/* Main Layout Container */}
      <StorytellingSection
    CHAPTERS={CHAPTERS}
    VISUALS={VISUALS}
    activeIndex={activeIndex}
    sectionRefs={sectionRefs}
/>

      <WhyChooseUs />
    </div>
  );
}