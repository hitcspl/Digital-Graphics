import React, { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { MoveRight, Layers } from "lucide-react"

const MagneticButton = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || !textRef.current) return

    const { clientX, clientY } = e
    const { height, width, left, top } =
      buttonRef.current.getBoundingClientRect()

    const x = clientX - (left + width / 2)
    const y = clientY - (top + height / 2)

    gsap.to(buttonRef.current, {
      x: x * 0.4,
      y: y * 0.4,
      duration: 1,
      ease: "power3.out",
    })

    gsap.to(textRef.current, {
      x: x * 0.2,
      y: y * 0.2,
      duration: 1,
      ease: "power3.out",
    })
  }

  const handleMouseLeave = () => {
    if (!buttonRef.current || !textRef.current) return

    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    })

    gsap.to(textRef.current, {
      x: 0,
      y: 0,
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    })
  }

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative flex h-12 w-fit items-center justify-center overflow-hidden border border-border/80 bg-background/50 px-8 backdrop-blur-md transition-all duration-500 hover:border-foreground hover:bg-foreground hover:text-background ${className}`}
    >
      <span
        ref={textRef}
        className="relative z-10 flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] uppercase"
      >
        {children}
      </span>
    </button>
  )
}

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const stackRef = useRef<HTMLDivElement>(null)

  // FIX: declare the animation ref
  const floatAnimRef = useRef<gsap.core.Tween | null>(null)

  const [images, setImages] = useState([
    "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200&auto=format&fit=crop",
  ])

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    const ctx = gsap.context(() => {
      // Entrance reveal
      if (!reduceMotion) {
        gsap.fromTo(
          ".reveal",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: "power4.out",
          }
        )
      } else {
        gsap.set(".reveal", { opacity: 1, y: 0 })
      }

      // FIX: create floating animation for stack
      if (stackRef.current && !reduceMotion) {
        floatAnimRef.current = gsap.to(stackRef.current, {
          y: -12,
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
      }
    }, containerRef)

    return () => {
      floatAnimRef.current?.kill()
      ctx.revert()
    }
  }, [])

  const handleImageClick = () => {
    gsap.to(".stack-image-0", {
      x: 100,
      opacity: 0,
      scale: 0.9,
      duration: 0.5,
      onComplete: () => {
        setImages((prev) => [...prev.slice(1), prev[0]])
        gsap.set(".stack-image-0", { x: 0, opacity: 1, scale: 1 })
      },
    })
  }

  return (
    <section
      ref={containerRef}
      id="top"
      className="relative flex min-h-[100dvh] w-full scroll-mt-[70px] flex-col justify-center overflow-hidden bg-background bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-zinc-200/40 via-background to-background pt-24 pb-20 text-foreground md:scroll-mt-[80px] md:pt-32 md:pb-12 dark:from-zinc-900/40"
    >
      <div className="z-10 mx-auto grid w-full max-w-[1500px] grid-cols-1 items-center gap-12 px-6 md:gap-8 md:px-12 lg:grid-cols-12 lg:px-16">
        {/* Typographic Hero */}
        <div className="reveal col-span-12 lg:col-span-8">
          <h1 className="flex flex-col font-sans text-[clamp(2.5rem,8vw,8rem)] leading-[1.1] font-bold tracking-[-0.03em] uppercase md:leading-[0.9]">
            <span>Digital</span>
            <span className="font-serif font-normal text-primary italic">
              Creative
            </span>
            <span>Experiences</span>
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-8 sm:mt-6 lg:mt-12">
            <p className="max-w-75 text-sm leading-relaxed text-muted-foreground">
              We don't just create graphics. We craft visual identities,
              campaigns, and experiences that make brands impossible to ignore.
            </p>
            <MagneticButton>
              Explore Our Work <MoveRight className="h-4 w-4" />
            </MagneticButton>
          </div>
        </div>

        {/* Interactive Stack */}
        <div className="reveal col-span-12 flex justify-start sm:justify-center lg:col-span-4 lg:justify-end">
          <div
            ref={stackRef}
            className="group relative h-[320px] w-[240px] cursor-pointer md:h-[430px] md:w-[320px] lg:h-[450px] lg:w-[360px]"
            onClick={handleImageClick}
            onMouseEnter={() => floatAnimRef.current?.pause()}
            onMouseLeave={() => floatAnimRef.current?.play()}
          >
            {images.map((src, i) => (
              <div
                key={`${src}-${i}`}
                className={`stack-image-${i} absolute inset-0 overflow-hidden rounded-sm shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${i === 0 ? "z-30 scale-100 rotate-0 opacity-100" : ""} ${i === 1 ? "z-20 translate-x-[15px] translate-y-[15px] scale-[0.92] rotate-[3deg] opacity-80 group-hover:translate-x-[35px] group-hover:rotate-[6deg]" : ""} ${i === 2 ? "z-10 translate-x-[30px] translate-y-[30px] scale-[0.84] rotate-[6deg] opacity-40 group-hover:translate-x-[70px] group-hover:rotate-[12deg]" : ""} `}
              >
                <div className="absolute inset-0 z-10 bg-gradient-to-tr from-black/40 to-transparent mix-blend-overlay" />

                <img
                  src={src}
                  alt={`Digital Graphics Creative Work - Image ${i + 1}`}
                  width={i === 0 ? 1200 : 800}
                  height={i === 0 ? 900 : 600}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={i === 0 ? "high" : "auto"}
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />

                {i === 0 && (
                  <div className="absolute bottom-5 left-5 z-20 flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-[9px] font-bold tracking-widest text-white uppercase opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                    <Layers className="h-3 w-3" /> Click Next
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
