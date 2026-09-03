"use client"

import React, { useRef, useEffect, useLayoutEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { Instagram, ArrowUp, ArrowRight, Youtube, Facebook } from "lucide-react"
import { MagneticButton } from "../ui/MagneticButton"
import { useNavigation } from "@/navigation/NavigationEngine"

/**
 * Measures the natural pixel-width of `text` (rendered with the exact same
 * font styles as the visible hero text) and derives a font-size that makes
 * the text occupy `widthRatio` of the container's content width.
 *
 * This is what makes the fix text-agnostic and screen-agnostic:
 * "Digital Graphics" and "Proud Moments" have different natural widths,
 * and vw-based clamp() can't know that — direct measurement can.
 */
function useFitText(
  containerRef: React.RefObject<HTMLElement | null>,
  text: string,
  {
    minFontSize = 30, // px – hard floor, protects ultra-small phones
    maxFontSize = 560, // px – hard ceiling, protects 8K/absurd displays
    widthRatio = 0.94, // target: text occupies 94% of container width
    fallback = "clamp(2.3rem, 10.2vw, 11rem)",
  }: {
    minFontSize?: number
    maxFontSize?: number
    widthRatio?: number
    fallback?: string
  } = {}
) {
  const measureRef = useRef<HTMLSpanElement>(null)
  const [fontSize, setFontSize] = useState<number | null>(null)

  useLayoutEffect(() => {
    const container = containerRef.current
    const measureEl = measureRef.current
    if (!container || !measureEl) return

    const REFERENCE_PX = 100 // arbitrary reference size to measure natural width at

    const recalc = () => {
      const containerWidth = container.clientWidth
      if (!containerWidth) return

      measureEl.style.fontSize = `${REFERENCE_PX}px`
      const naturalWidth = measureEl.scrollWidth
      if (!naturalWidth) return

      const targetWidth = containerWidth * widthRatio
      const next = Math.min(
        Math.max((targetWidth / naturalWidth) * REFERENCE_PX, minFontSize),
        maxFontSize
      )
      setFontSize(Math.round(next * 100) / 100)
    }

    recalc()

    const ro = new ResizeObserver(() => {
      // rAF avoids layout thrash / jitter while dragging a window edge
      requestAnimationFrame(recalc)
    })
    ro.observe(container)
    window.addEventListener("orientationchange", recalc)

    return () => {
      ro.disconnect()
      window.removeEventListener("orientationchange", recalc)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, minFontSize, maxFontSize, widthRatio])

  const style: React.CSSProperties = {
    fontSize: fontSize !== null ? `${fontSize}px` : fallback,
  }

  return { measureRef, style }
}

export function Footer() {
  const location = useLocation()
  const isProudMoments = location.pathname === "/proud-moments"

  const textRef = useRef<HTMLDivElement>(null)
  const { navigateTo, scrollToTop } = useNavigation()

  // Animation Refs
  const isHovered = useRef(false)
  const targetMousePos = useRef({ x: 0, y: 0 })
  const currentPos = useRef({ x: 0, y: 0 })
  const autoX = useRef(0) // Start at left edge
  const autoDirection = useRef(1) // 1 for right, -1 for left

  // Dynamic Theme Definitions
  const brandText = isProudMoments ? "Proud Moments" : "Digital Graphics"
  const buttonLink = isProudMoments ? "/" : "/proud-moments"

  // Luxury Material Finish
  const textStrokeColor = isProudMoments ? "#CFA04A" : "#3B82F6"

  // Rich, multi-layered high-contrast gradient
  const champagneGoldGradient = `linear-gradient(135deg, #B98733 0%, #DDBB62 12%, #FFFDF4 25%, #ECD48A 40%, #CFA04A 55%, #FFF6DA 70%, #EEDFA9 85%, #B98733 100%)`
  const premiumBlueGradient = `linear-gradient(105deg, #1E3A8A 0%, #3B82F6 15%, #93C5FD 25%, #2563EB 38%, #1E40AF 46%, #60A5FA 58%, #BFDBFE 70%, #1D4ED8 85%, #1E3A8A 100%)`

  // High-luminance accents
  const primaryTextColor = isProudMoments
    ? "text-[#CFA04A] dark:text-[#ECD48A]"
    : "text-blue-600 dark:text-blue-500"

  // Upgraded button text for maximum readability and strong color contrast
  const buttonBorderText = isProudMoments
    ? "border-[#CFA04A] text-[#8C6215] dark:border-[#ECD48A] dark:text-[#FFFDF4]"
    : "border-blue-600 text-blue-800 dark:border-blue-500 dark:text-blue-50"

  const linkHoverColor = isProudMoments
    ? "hover:text-[#B98733] dark:hover:text-[#FFF6DA]"
    : "hover:text-blue-700 dark:hover:text-blue-400"

  const backToTopClasses = isProudMoments
    ? "border-[#CFA04A] text-[#CFA04A] dark:border-[#ECD48A] dark:text-[#ECD48A] hover:bg-[#FFFDF4] dark:hover:bg-[#B98733]/10"
    : "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"

  const facebookHoverClasses = isProudMoments
    ? "hover:border-blue-500 hover:text-blue-500 dark:hover:border-blue-500 dark:hover:text-blue-500"
    : "hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400"

  // Text-fit: measures brandText against the wrapper's real width and returns
  // a fontSize that fills ~94% of it, on every screen, with no clipping.
  const { measureRef, style: fitStyle } = useFitText(textRef, brandText, {
    minFontSize: 30,
    maxFontSize: 560,
    widthRatio: 0.94,
  })

  useEffect(() => {
    let animationFrameId: number
    let lastTime = performance.now()
    let initialized = false

    const animate = (time: number) => {
      // Calculate delta time for constant speed regardless of monitor refresh rate
      const dt = time - lastTime
      lastTime = time

      const element = textRef.current
      if (element) {
        const rect = element.getBoundingClientRect()
        const centerY = rect.height / 2

        if (!initialized) {
          currentPos.current = { x: 0, y: centerY }
          autoX.current = 0
          initialized = true
        }

        if (isHovered.current) {
          // HOVER STATE: Smoothly track the mouse
          currentPos.current.x +=
            (targetMousePos.current.x - currentPos.current.x) * 0.12
          currentPos.current.y +=
            (targetMousePos.current.y - currentPos.current.y) * 0.12

          // Sync autoX so it resumes exactly from here
          autoX.current = currentPos.current.x
        } else {
          // Dynamic Adaptive Speed: Adjust base pace depending on screen size
          // Small mobile screens get an ultra-slow pace (0.04) while desktops use (0.10)
          const isMobile = window.innerWidth < 768
          const currentSpeedSetting = isMobile ? 0.04 : 0.1

          // AUTO STATE: Move at a constant rate in the current direction
          autoX.current += currentSpeedSetting * dt * autoDirection.current

          // Bounce logic: Switch direction at the edges of the text
          // (rect.width now reflects the fitted font-size automatically,
          // so the bounce range always matches the actual rendered text)
          if (autoX.current > rect.width) {
            autoX.current = rect.width
            autoDirection.current = -1 // Go Left
          } else if (autoX.current < 0) {
            autoX.current = 0
            autoDirection.current = 1 // Go Right
          }

          // Gently ease back into the vertical center and follow the ping-pong track
          currentPos.current.x += (autoX.current - currentPos.current.x) * 0.15
          currentPos.current.y += (centerY - currentPos.current.y) * 0.08
        }

        // Apply via CSS variables to bypass React render cycle
        element.style.setProperty("--mask-x", `${currentPos.current.x}px`)
        element.style.setProperty("--mask-y", `${currentPos.current.y}px`)
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!textRef.current) return
    const rect = textRef.current.getBoundingClientRect()
    targetMousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  const handleMouseEnter = (e: React.MouseEvent) => {
    isHovered.current = true
    handleMouseMove(e) // Initialize mouse pos immediately
  }

  const handleMouseLeave = () => {
    isHovered.current = false

    // Resume auto-movement seamlessly depending on where the mouse left
    if (
      currentPos.current.x >
      (textRef.current?.getBoundingClientRect().width || 0) / 2
    ) {
      autoDirection.current = -1 // Head back left if on the right half
    } else {
      autoDirection.current = 1 // Head right if on the left half
    }
  }

  return (
    <footer className="overflow-hidden bg-white px-4 pt-16 font-sans text-black md:px-8 dark:bg-[#050505] dark:text-white">
      <div className="mx-auto max-w-[1400px]">
        {/*
          TOP SECTION: Spotlight Logo — FULL-BLEED
          This block intentionally breaks out of the 1400px content max-width
          using the left-1/2 / -translate-x-1/2 / w-screen trick, so the hero
          can actually use the full viewport on big monitors/TVs instead of
          being starved (and clipped) by the 1400px cap above.
          The footer's own `overflow-hidden` keeps this 100%-safe against
          horizontal scrollbars.
        */}
        <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden px-3 pb-10 sm:px-4 lg:px-6">
          <div
            ref={textRef}
            className="relative mx-auto flex w-full max-w-none touch-none cursor-default items-center justify-center select-none"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Hidden measuring node — invisible, mirrors the exact type
                styles of the real text, used only to compute natural width */}
            <span
              ref={measureRef}
              aria-hidden="true"
              className="pointer-events-none invisible absolute top-0 left-0 -z-10 whitespace-nowrap font-black tracking-tighter uppercase"
            >
              {brandText}
            </span>

            {/* Base Outlined Text */}
            <div
              className="transform-gpu pb-6 leading-none font-black tracking-tighter whitespace-nowrap text-transparent uppercase select-none"
              style={{ WebkitTextStroke: `1px ${textStrokeColor}`, ...fitStyle }}
            >
              {brandText}
            </div>

            {/* Masked Spotlight Text */}
            <div
              className="pointer-events-none absolute top-0 right-0 bottom-0 left-0 flex transform-gpu items-start justify-center pb-6 leading-none font-black tracking-tighter whitespace-nowrap text-transparent uppercase select-none"
              style={{
                ...fitStyle,
                backgroundImage: isProudMoments
                  ? champagneGoldGradient
                  : premiumBlueGradient,
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
        <div className="grid grid-cols-1 gap-12 border-y border-neutral-200 py-12 lg:grid-cols-12 lg:gap-8 dark:border-neutral-800">
          {/* CTA Column */}
          <div className="flex flex-col justify-center gap-3 lg:col-span-5">
            <h2 className="text-4xl font-semibold tracking-tight text-black md:text-5xl dark:text-white">
              Ready to start?
            </h2>
            <p
              className={`text-4xl font-semibold tracking-tight transition-colors duration-300 md:text-5xl ${primaryTextColor}`}
            >
              Let's scale together.
            </p>
            {!isProudMoments && (
              <div className="mt-4">
                <MagneticButton
                  onClick={() => navigateTo(buttonLink)}
                  className={`group relative isolate flex transform-gpu cursor-pointer items-center justify-center gap-2.5 overflow-hidden border px-4 py-2 will-change-transform transition-colors duration-300 sm:gap-4 sm:px-6 sm:py-3 ${buttonBorderText}`}
                  strength={0.25}
                >
                  {/* Button Content */}
                  <span className="pointer-events-none relative z-10 flex items-center gap-2.5 sm:gap-4">
                    <img
                      src="/Proud Moments-Logo 2 (2).png"
                      alt="Proud Moments Logo"
                      className="h-6 w-auto scale-110 transform-gpu object-contain transition-transform duration-300 ease-out sm:h-7 sm:scale-100 sm:group-hover:scale-110"
                    />

                    <ArrowRight className="h-4 w-4 transform-gpu transition-transform duration-300 ease-out sm:h-5 sm:w-5 sm:group-hover:translate-x-2" />
                  </span>
                </MagneticButton>
              </div>
            )}
          </div>

          {/* Contact Info Columns */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-0 lg:col-span-7 lg:pt-4">
            {/* Email */}
            <div className="flex flex-col gap-4 md:pr-6">
              <p
                className={`text-[10px] font-bold tracking-widest uppercase transition-colors duration-300 ${primaryTextColor}`}
              >
                Email
              </p>
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
            <div className="flex flex-col gap-4 border-t border-neutral-200 pt-6 md:border-t-0 md:border-l md:px-6 md:pt-0 dark:border-neutral-800">
              <p
                className={`text-[10px] font-bold tracking-widest uppercase transition-colors duration-300 ${primaryTextColor}`}
              >
                Phone
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href="tel:6205114112"
                  className={`text-sm font-medium transition-colors ${linkHoverColor}`}
                >
                  6205114112
                </a>
                <a
                  href="tel:0651-3555666"
                  className={`text-sm font-medium transition-colors ${linkHoverColor}`}
                >
                  0651-3555666
                </a>
              </div>
            </div>

            {/* Office */}
            <div className="flex flex-col gap-4 border-t border-neutral-200 pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-6 dark:border-neutral-800">
              <p
                className={`text-[10px] font-bold tracking-widest uppercase transition-colors duration-300 ${primaryTextColor}`}
              >
                Office
              </p>
              <div className="flex flex-col gap-2 text-sm leading-relaxed font-medium">
                <p>507, Gridhar Plaza (5th Floor),</p>
                <p>Harmu Rd, Ranchi,</p>
                <p>Jharkhand 834001</p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Legal & Socials */}
        <div className="flex flex-col items-center justify-between gap-6 pt-8 pb-12 md:flex-row">
          {/* Copyright & Links */}
          <div className="flex flex-col items-center gap-4 text-center text-[10px] font-bold tracking-widest text-neutral-400 uppercase md:flex-row md:gap-8 md:text-left dark:text-neutral-500">
            <p>
              © {new Date().getFullYear()} {brandText} Inc.
            </p>
          </div>

          {/* Credits, Back to Top, Socials */}
          <div className="flex flex-col items-center gap-6 md:flex-row">
            <p className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase dark:text-neutral-500">
              Made by{" "}
              <a
                href="https://www.hitcs.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-zinc-800 dark:hover:text-zinc-300"
              >
                HITCS Pvt. Ltd
              </a>
            </p>

           <button
  onClick={scrollToTop}
  className={`flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-[10px] font-bold tracking-widest uppercase transition-all duration-200
    hover:bg-black/10 dark:hover:bg-white/10
    ${backToTopClasses}`}
>
  Back to Top <ArrowUp className="h-3 w-3" />
</button>

            <div className="flex items-center gap-3">
              {/* Instagram */}
              <a
                target="_blank"
                href="https://www.instagram.com/digitalgraphicsranchi/"
                rel="noopener noreferrer"
                className="rounded-full border border-neutral-200 p-2 text-neutral-600 transition-all duration-300 hover:border-pink-600 hover:text-pink-600 dark:border-neutral-800 dark:text-neutral-400 dark:hover:border-pink-400 dark:hover:text-pink-400"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>

              {/* Facebook */}
              <a
                target="_blank"
                href="https://www.facebook.com/DigitalGraphicsRanchi"
                rel="noopener noreferrer"
                className={`rounded-full border border-neutral-200 p-2 text-neutral-600 transition-all duration-300 dark:border-neutral-800 dark:text-neutral-400 ${facebookHoverClasses}`}
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>

              {/* YouTube */}
              <a
                target="_blank"
                href="https://www.youtube.com/channel/UCgbQmUTDPvfVNurxywKJ8EQ"
                rel="noopener noreferrer"
                className="rounded-full border border-neutral-200 p-2 text-neutral-600 transition-all duration-300 hover:border-red-600 hover:text-red-600 dark:border-neutral-800 dark:text-neutral-400 dark:hover:border-red-500 dark:hover:text-red-500"
                aria-label="Youtube"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}