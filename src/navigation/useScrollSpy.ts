// src/navigation/useScrollSpy.ts
//
// Single, high-performance scroll-spy driving active-navigation highlighting.
//
// One IntersectionObserver only. No scroll/resize listeners (the observer is
// inherently passive). Deterministic single active section, never re-renders
// unless the active id actually changes, and proper cleanup on unmount/route
// change.
//
// How it works:
//  - A thin observation band is centered on the viewport (rootMargin
//    `-50% 0px -50% 0px` widened to a small non-zero height). The section
//    crossing the viewport center is the active one, so:
//      * At the absolute top the band sits inside the Hero (which has no id in
//        the list) -> no active item.
//      * The sticky navbar (top of the viewport) is outside the band, so
//        sections hidden behind it can never be marked active.
//      * Exactly one section occupies the center at any time; if two momentarily
//        share the band, the first in document order wins (no flicker).

import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

/** Half-height of the centered observation band, as a % of the viewport. */
const BAND_HALF = 8;

export function useScrollSpy(sectionIds: string[]): string {
  const { pathname } = useLocation();
  const [activeId, setActiveId] = useState("");
  const intersecting = useRef<Set<string>>(new Set());
  // Tracks the last emitted active id so we only call setState on real changes,
  // avoiding unnecessary re-renders during scroll.
  const current = useRef("");

  useEffect(() => {
    if (pathname !== "/") {
      // Leaving the homepage: clear active links on the very next frame.
      current.current = "";
      intersecting.current.clear();
      const raf = requestAnimationFrame(() => setActiveId(""));
      return () => cancelAnimationFrame(raf);
    }

    intersecting.current.clear();
    current.current = "";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) intersecting.current.add(entry.target.id);
          else intersecting.current.delete(entry.target.id);
        }
        // Deterministic single winner: first section in document order.
        const next = sectionIds.find((id) => intersecting.current.has(id)) ?? "";
        if (next !== current.current) {
          current.current = next;
          setActiveId(next);
        }
      },
      {
        // Centered band: only the section occupying the viewport center is active.
        rootMargin: `-${50 - BAND_HALF}% 0px -${50 - BAND_HALF}% 0px`,
        threshold: 0,
      }
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;
      const hidden =
        el.offsetParent === null ||
        getComputedStyle(el).visibility === "hidden" ||
        el.getBoundingClientRect().height === 0;
      if (!hidden) observer.observe(el);
    }

    return () => {
      observer.disconnect();
    };
  }, [sectionIds, pathname]);

  return activeId;
}
