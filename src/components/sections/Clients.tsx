import { useEffect, useRef, useState } from "react"
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react"
// import { cn } from "@/lib/utils";

const logos: LogoItem[] = [
  { src: "/client-marquee/AMBIKA.png", name: "Ambika" },
  { src: "/client-marquee/bni1.png", name: "BNI Ranchi" },
  { src: "/client-marquee/CAPTAIN.png", name: "Captain 600 EQR" },
  { src: "/client-marquee/CUTPIECE-BAZAR.png", name: "Cutpiece Bazar" },
  { src: "/client-marquee/DH.png", name: "DH" },
  { src: "/client-marquee/EXPOUTSAV.png", name: "Expoutsav" },
  { src: "/client-marquee/GOVT-OF-JHARKHAND.png", name: "Govt. of Jharkhand" },
  { src: "/client-marquee/HEALTH-FREAK.png", name: "Health Freaks" },
  { src: "/client-marquee/IB-GROUP.png", name: "IB Group" },
  { src: "/client-marquee/IVA.png", name: "IVA" },
  { src: "/client-marquee/JALAN.png", name: "Jalan" },
  { src: "/client-marquee/jci1.png", name: "jci1" },
  { src: "/client-marquee/JPZ.png", name: "JPZ" },
  { src: "/client-marquee/JSW.png", name: "JSW" },
  { src: "/client-marquee/KALYAN.png", name: "Kalyan Jewellers" },
  { src: "/client-marquee/KV.png", name: "Kashav Vastralay" },
  { src: "/client-marquee/LIONS.png", name: "Lions International" },
  { src: "/client-marquee/NIFFT.png", name: "NIFFT" },
  { src: "/client-marquee/NOVA-IVF.png", name: "Nova IVF Fertility" },
  { src: "/client-marquee/NPP.png", name: "NPP" },
  { src: "/client-marquee/osum1.png", name: "osum1" },
  { src: "/client-marquee/PARAS.png", name: "Paras HEC Hospital" },
  { src: "/client-marquee/PVUN.png", name: "PVUN" },
  { src: "/client-marquee/rgc1.png", name: "rgc1" },
  { src: "/client-marquee/SAHRAY-BHAWAN.png", name: "Sahyog Bhawan" },
  { src: "/client-marquee/SBU.png", name: "SBU" },
  { src: "/client-marquee/suvidha-supermart1.png", name: "suvidha-supermart1" },
  { src: "/client-marquee/UYDS.png", name: "UYDS" },
]

export function ClientSection() {
  return (
    <section
      id="clients"
      className="w-full scroll-mt-[70px] overflow-hidden border-b border-border/40 bg-background dark:border-border/70 md:scroll-mt-[80px]"
    >
      <div className="flex flex-col items-center justify-center py-6 text-center md:py-10 lg:py-18">
        <h2 className="px-6 font-serif text-5xl leading-[0.9] tracking-tight text-foreground italic md:text-7xl lg:text-8xl">
          OUR WORK <br className="md:hidden" />
          <span className="font-sans text-4xl font-medium tracking-tighter not-italic md:text-6xl lg:text-7xl">
            speaks!
          </span>
        </h2>
      </div>

      <div className="flex flex-col border-t border-border/40 dark:border-border/70">
        <SmoothMarquee items={logos.slice(0, 14)} direction="left" />
        <SmoothMarquee items={logos.slice(14, 28)} direction="right" />
      </div>
    </section>
  )
}


interface LogoItem {
  src: string
  name: string
}

function SmoothMarquee({
  items,
  direction = "left",
}: {
  items: LogoItem[]
  direction?: "left" | "right"
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [contentWidth, setContentWidth] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // --- Drag state (does not use React state for position, to stay 60/120fps) ---
  const isDragging = useRef(false)
  const dragStartX = useRef(0)
  const dragStartBaseX = useRef(0)
  const dragVelocity = useRef(0)
  const lastDragX = useRef(0)
  const lastDragTime = useRef(0)

  // Measure the exact width of one set of logos for seamless wrapping
  useEffect(() => {
    const calculateWidth = () => {
      if (containerRef.current && containerRef.current.children[0]) {
        setContentWidth(
          containerRef.current.children[0].getBoundingClientRect().width
        )
      }
    }

    calculateWidth()
    window.addEventListener("resize", calculateWidth)
    return () => window.removeEventListener("resize", calculateWidth)
  }, [])

  // Set up the motion values
  const baseX = useMotionValue(0)

  // The Spring gives us that premium, buttery-smooth deceleration/acceleration on hover
  const velocity = useSpring(direction === "left" ? -1 : 1, {
    stiffness: 80,
    damping: 25,
    mass: 1,
  })

  // Adjust velocity target based on hover/drag state
  useEffect(() => {
    if (isDragging.current) return
    velocity.set(isHovered ? 0 : direction === "left" ? -1 : 1)
  }, [isHovered, direction, velocity])

  // Fix starting position for right-moving marquees to prevent initial jump
  useEffect(() => {
    if (direction === "right" && contentWidth && baseX.get() === 0) {
      baseX.set(-contentWidth)
    }
  }, [contentWidth, direction, baseX])

  // The rendering loop runs natively outside of React state for perfect 60/120fps
   useAnimationFrame((_t, delta) => {
    if (!contentWidth) return

    if (isDragging.current) {
      // Position is driven directly by pointer move handlers while dragging.
      return
    }

    // Mobile stays calm; medium/large screens get a bit more pace (but not the old 1.5)
    const width = typeof window !== "undefined" ? window.innerWidth : 1024
    let baseSpeed = 0.45 // small screens (< 768px)
    if (width >= 1024) {
      baseSpeed = 1.1 // lg and up
    } else if (width >= 768) {
      baseSpeed = 0.9 // md
    }

    // Inertial coast-out after a drag/flick release
    let effectiveVelocity = velocity.get()
    if (Math.abs(dragVelocity.current) > 0.01) {
      effectiveVelocity = dragVelocity.current
      dragVelocity.current *= 0.94
      if (Math.abs(dragVelocity.current) < 0.02) dragVelocity.current = 0
    }

    const moveBy = effectiveVelocity * baseSpeed * (delta / 16)

    let newX = baseX.get() + moveBy

    // Seamless wrap logic based on exact pixel measurements
    if (newX <= -contentWidth) {
      newX += contentWidth
    } else if (newX >= 0) {
      newX -= contentWidth
    }

    baseX.set(newX)
  })

  const x = useTransform(baseX, (v) => `${v}px`)

  // --- Pointer handlers for smooth left/right drag scrubbing ---
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true
    setIsHovered(true)
    dragVelocity.current = 0
    dragStartX.current = e.clientX
    dragStartBaseX.current = baseX.get()
    lastDragX.current = e.clientX
    lastDragTime.current = performance.now()
    ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !contentWidth) return

    const delta = e.clientX - dragStartX.current
    let newX = dragStartBaseX.current + delta

    // Keep it within a sane wrap range while dragging too
    while (newX <= -contentWidth) newX += contentWidth
    while (newX >= 0) newX -= contentWidth

    baseX.set(newX)

    const now = performance.now()
    const dt = Math.max(now - lastDragTime.current, 1)
    const instantVelocity = ((e.clientX - lastDragX.current) / dt) * 16
    dragVelocity.current = instantVelocity
    lastDragX.current = e.clientX
    lastDragTime.current = now
  }

  const endDrag = () => {
    isDragging.current = false
    setIsHovered(false)
  }

  return (
    <div
      className="flex w-full touch-pan-y select-none overflow-hidden border-b border-border/40 dark:border-white/10 last:border-b-0"
      style={{ cursor: "grab" }}
      onMouseEnter={() => !isDragging.current && setIsHovered(true)}
      onMouseLeave={() => !isDragging.current && setIsHovered(false)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={() => {
        if (isDragging.current) endDrag()
      }}
    >
      <motion.div ref={containerRef} className="flex w-max" style={{ x }}>
        {[1, 2, 3].map((set) => (
          <div key={set} className="flex w-max shrink-0" ref={set === 1 ? trackRef : undefined}>
            {items.map((item, i) => (
              <div
                key={`${set}-${i}`}
                className="group flex h-24 w-40 shrink-0 items-center justify-center border-r border-border/40 dark:border-white/10 transition-colors duration-500 hover:bg-muted/30 md:h-36 md:w-72 lg:h-40 lg:w-80"
              >
                <div className="relative h-14 w-32 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 md:h-20 md:w-44 lg:h-24 lg:w-52">
                  <img
                    src={item.src}
                    alt={`${item.name} - Digital Graphics Brand Partner`}
                    width={200}
                    height={90}
                    draggable={false}
                    className="h-full w-full object-contain"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).style.display = "none"
                    }}
                  />
                  <span className="sr-only">{item.name} Logo</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  )
}