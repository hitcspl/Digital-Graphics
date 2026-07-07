"use client";

import React, { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Instagram, ArrowUp, ArrowRight, Youtube, Facebook } from "lucide-react";
import { MagneticButton } from "../ui/MagneticButton";
import { useNavigation } from "@/navigation/NavigationEngine";

export function Footer() {
  const location = useLocation();
  const isProudMoments = location.pathname === "/proud-moments";

  const textRef = useRef<HTMLDivElement>(null);
  const { navigateTo, scrollToTop } = useNavigation();
  
  // Animation Refs
  const isHovered = useRef(false);
  const targetMousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const autoX = useRef(0); // Start at left edge
  const autoDirection = useRef(1); // 1 for right, -1 for left

  // Dynamic Theme Definitions
  const brandText = isProudMoments ? "Proud Moments" : "Digital Graphics";
  const buttonText = isProudMoments ? "Digital Graphics" : "Proud Moments";
  const buttonLink = isProudMoments ? "/" : "/proud-moments";
  
  // Luxury Material Finish
  const textStrokeColor = isProudMoments ? "#CFA04A" : "#3B82F6"; 
  
  // Rich, multi-layered high-contrast gradient
  const champagneGoldGradient = `linear-gradient(135deg, #B98733 0%, #DDBB62 12%, #FFFDF4 25%, #ECD48A 40%, #CFA04A 55%, #FFF6DA 70%, #EEDFA9 85%, #B98733 100%)`;
  const premiumBlueGradient = `linear-gradient(105deg, #1E3A8A 0%, #3B82F6 15%, #93C5FD 25%, #2563EB 38%, #1E40AF 46%, #60A5FA 58%, #BFDBFE 70%, #1D4ED8 85%, #1E3A8A 100%)`;
  
  // High-luminance accents
  const primaryTextColor = isProudMoments
    ? "text-[#CFA04A] dark:text-[#ECD48A]"
    : "text-blue-600 dark:text-blue-500";
    
  // Upgraded button text for maximum readability and strong color contrast
  const buttonBorderText = isProudMoments
    ? "border-[#CFA04A] text-[#8C6215] dark:border-[#ECD48A] dark:text-[#FFFDF4]"
    : "border-blue-600 text-blue-800 dark:border-blue-500 dark:text-blue-50";
    
  const buttonBgFill = isProudMoments
    ? "bg-[#CFA04A] dark:bg-[#ECD48A]"
    : "bg-blue-600 dark:bg-blue-500";
    
  const linkHoverColor = isProudMoments
    ? "hover:text-[#B98733] dark:hover:text-[#FFF6DA]"
    : "hover:text-blue-700 dark:hover:text-blue-400";
    
  const backToTopClasses = isProudMoments
    ? "border-[#CFA04A] text-[#CFA04A] dark:border-[#ECD48A] dark:text-[#ECD48A] hover:bg-[#FFFDF4] dark:hover:bg-[#B98733]/10"
    : "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20";

  const facebookHoverClasses = isProudMoments
    ? "hover:border-blue-500 hover:text-blue-500 dark:hover:border-blue-500 dark:hover:text-blue-500"
    : "hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400";

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();
    let initialized = false;

    const animate = (time: number) => {
      // Calculate delta time for constant speed regardless of monitor refresh rate
      const dt = time - lastTime;
      lastTime = time;

      const element = textRef.current;
      if (element) {
        const rect = element.getBoundingClientRect();
        const centerY = rect.height / 2;

        if (!initialized) {
          currentPos.current = { x: 0, y: centerY };
          autoX.current = 0;
          initialized = true;
        }

        if (isHovered.current) {
          // HOVER STATE: Smoothly track the mouse
          currentPos.current.x += (targetMousePos.current.x - currentPos.current.x) * 0.12;
          currentPos.current.y += (targetMousePos.current.y - currentPos.current.y) * 0.12;
          
          // Sync autoX so it resumes exactly from here
          autoX.current = currentPos.current.x; 
        } else {
          // Dynamic Adaptive Speed: Adjust base pace depending on screen size
          // Small mobile screens get an ultra-slow pace (0.04) while desktops use (0.10)
          const isMobile = window.innerWidth < 768;
          const currentSpeedSetting = isMobile ? 0.04 : 0.10;

          // AUTO STATE: Move at a constant rate in the current direction
          autoX.current += (currentSpeedSetting * dt) * autoDirection.current;

          // Bounce logic: Switch direction at the edges of the text
          if (autoX.current > rect.width) {
            autoX.current = rect.width;
            autoDirection.current = -1; // Go Left
          } else if (autoX.current < 0) {
            autoX.current = 0;
            autoDirection.current = 1;  // Go Right
          }

          // Gently ease back into the vertical center and follow the ping-pong track
          currentPos.current.x += (autoX.current - currentPos.current.x) * 0.15;
          currentPos.current.y += (centerY - currentPos.current.y) * 0.08;
        }

        // Apply via CSS variables to bypass React render cycle
        element.style.setProperty("--mask-x", `${currentPos.current.x}px`);
        element.style.setProperty("--mask-y", `${currentPos.current.y}px`);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!textRef.current) return;
    const rect = textRef.current.getBoundingClientRect();
    targetMousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    isHovered.current = true;
    handleMouseMove(e); // Initialize mouse pos immediately
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
    
    // Resume auto-movement seamlessly depending on where the mouse left
    if (currentPos.current.x > (textRef.current?.getBoundingClientRect().width || 0) / 2) {
      autoDirection.current = -1; // Head back left if on the right half
    } else {
      autoDirection.current = 1;  // Head right if on the left half
    }
  };

  return (
    <footer className="bg-white text-black dark:bg-[#050505] dark:text-white pt-16 px-4 md:px-8 font-sans overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        
        {/* TOP SECTION: Spotlight Logo */}
        <div className="w-full pb-10 flex justify-center items-center cursor-default select-none overflow-hidden px-2">
          <div 
            ref={textRef} 
            className="relative w-full flex justify-center mx-auto touch-none"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            
            {/* Base Outlined Text */}
            <div 
              className="text-[clamp(2.5rem,10.5vw,13rem)] leading-none font-black tracking-tighter uppercase whitespace-nowrap text-transparent pb-6 select-none transform-gpu"
              style={{ WebkitTextStroke: `1px ${textStrokeColor}` }}
            >
              {brandText}
            </div>

            {/* Masked Spotlight Text */}
            <div
              className={`absolute top-0 left-0 right-0 bottom-0 flex justify-center items-start text-[clamp(2.5rem,10.5vw,13rem)] leading-none font-black tracking-tighter uppercase whitespace-nowrap text-transparent pointer-events-none pb-6 select-none transform-gpu`}
              style={{
                backgroundImage: isProudMoments ? champagneGoldGradient : premiumBlueGradient,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                maskImage: `radial-gradient(circle clamp(200px, 30vw, 550px) at var(--mask-x, 50%) var(--mask-y, 50%), black 0%, rgba(0,0,0,0.85) 15%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.05) 70%, transparent 100%)`,
                WebkitMaskImage: `radial-gradient(circle clamp(200px, 30vw, 550px) at var(--mask-x, 50%) var(--mask-y, 50%), black 0%, rgba(0,0,0,0.85) 15%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.05) 70%, transparent 100%)`,
              }}
            >
              {brandText}
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION */}
        <div className="border-y border-neutral-200 dark:border-neutral-800 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* CTA Column */}
          <div className="lg:col-span-5 flex flex-col gap-3 justify-center">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-black dark:text-white">
              Ready to start?
            </h2>
            <p className={`text-4xl md:text-5xl font-semibold tracking-tight transition-colors duration-300 ${primaryTextColor}`}>
              Let's scale together.
            </p>
            <div className="mt-4">
              <MagneticButton 
                onClick={() => navigateTo(buttonLink)}
                className={`group relative flex items-center gap-3 px-6 py-3 border text-xs font-bold tracking-widest uppercase overflow-hidden transition-colors duration-300 hover:text-white dark:hover:text-black cursor-pointer ${buttonBorderText}`}
                strength={0.25}
              >
                {/* Animated Background Fill */}
                <div className={`absolute inset-0 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out transform-gpu ${buttonBgFill}`} />
                
                {/* Button Content */}
                <span className="relative z-10 flex items-center gap-2">
                  {buttonText}
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300 transform-gpu" />
                </span>
              </MagneticButton>
            </div>
          </div>

          {/* Contact Info Columns */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 lg:pt-4">
            
            {/* Email */}
            <div className="flex flex-col gap-4 md:pr-6">
              <p className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${primaryTextColor}`}>Email</p>
              <div className="flex flex-col gap-2">
                <a
                  href="mailto:digitalgraphicsranchi@gmail.com"
                  className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${linkHoverColor}`}
                >
                  digitalgraphicsranchi@gmail.com
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-4 border-t md:border-t-0 md:border-l border-neutral-200 dark:border-neutral-800 pt-6 md:pt-0 md:px-6">
              <p className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${primaryTextColor}`}>Phone</p>
              <div className="flex flex-col gap-2">
                <a href="tel:6205114112" className={`text-sm font-medium transition-colors ${linkHoverColor}`}>6205114112</a>
                <a href="tel:0651-3555666" className={`text-sm font-medium transition-colors ${linkHoverColor}`}>0651-3555666</a>
              </div>
            </div>

            {/* Office */}
            <div className="flex flex-col gap-4 border-t md:border-t-0 md:border-l border-neutral-200 dark:border-neutral-800 pt-6 md:pt-0 md:pl-6">
              <p className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${primaryTextColor}`}>Office</p>
              <div className="flex flex-col gap-2 text-sm font-medium leading-relaxed">
                <p>507, Gridhar Plaza (5th Floor),</p>
                <p>Harmu Rd, Ranchi,</p>
                <p>Jharkhand 834001</p>
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM SECTION: Legal & Socials */}
        <div className="pt-8 pb-12 flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Copyright & Links */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-[10px] font-bold tracking-widest uppercase text-neutral-400 dark:text-neutral-500 text-center md:text-left">
            <p>© {new Date().getFullYear()} {brandText} Inc.</p>
            <div className="flex gap-6">
              <a href="#privacy" className="hover:text-black dark:hover:text-white transition-colors">Privacy</a>
              <a href="#terms" className="hover:text-black dark:hover:text-white transition-colors">Terms</a>
            </div>
          </div>

          {/* Credits, Back to Top, Socials */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            
            <p className="text-[10px] font-bold tracking-widest uppercase text-neutral-400 dark:text-neutral-500">
              Made by <a href="https://www.hitcs.in/" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors">HITCS Pvt. Ltd</a>
            </p>

            <button 
              onClick={scrollToTop}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase transition-colors ${backToTopClasses}`}
            >
              Back to Top <ArrowUp className="w-3 h-3" />
            </button>

            <div className="flex items-center gap-3">
              {/* Instagram */}
              <a 
                target="_blank" 
                href="https://www.instagram.com/digitalgraphicsranchi/" 
                className="p-2 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 transition-all duration-300 hover:border-pink-600 hover:text-pink-600 dark:hover:border-pink-400 dark:hover:text-pink-400" 
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              {/* Facebook */}
              <a 
                target="_blank" 
                href="https://www.facebook.com/DigitalGraphicsRanchi" 
                className={`p-2 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 transition-all duration-300 ${facebookHoverClasses}`} 
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>

              {/* YouTube */}
              <a 
                target="_blank" 
                href="https://www.youtube.com/channel/UCgbQmUTDPvfVNurxywKJ8EQ" 
                className="p-2 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 transition-all duration-300 hover:border-red-600 hover:text-red-600 dark:hover:border-red-500 dark:hover:text-red-500" 
                aria-label="Youtube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}