// src/components/ScrollManager.tsx
//
// Centralized ScrollManager — the single authority for ALL scroll behaviour.
//
// No other component scrolls the window. Navigation decisions are made by the
// Navigation Engine (which only changes the URL / menu state); this component
// reacts to those changes and is the sole executor of scrolling. It guarantees:
//   1. Browser native scroll restoration is disabled (no restored positions).
//   2. On a pathname change (no hash): instant scroll to the top, so the previous
//      page is never visible mid-scroll and there is zero flash.
//   3. On a hash change: smooth scroll to the target, but only once the target
//      element actually exists in the DOM (polled via requestAnimationFrame),
//      i.e. after React has committed/painted the destination content.
//   4. On a same-path hash removal (logo on home): smooth scroll to the top.
//   5. Deep links and browser back/forward are handled, since react-router
//      updates `useLocation` for those too.
//   6. Sticky navbar height is compensated so sections stop precisely under it.
//   7. Imperative scroll commands from the engine (same-page top / re-scroll)
//      are honoured.

import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { onScrollCommand, type ScrollCommand } from "../navigation/navigationBus";

/** Extra breathing room (px) left beneath the sticky header when aligning. */
const SECTION_OFFSET = 24;
/** Max rAF attempts (~1s) to wait for a not-yet-mounted scroll target. */
const SCROLL_RETRIES = 60;

function getHeaderHeight(): number {
  const header = document.querySelector("header");
  return header ? header.getBoundingClientRect().height : 80;
}

function scrollToTop(behavior: ScrollBehavior = "instant"): void {
  window.scrollTo({ top: 0, left: 0, behavior });
}

function scrollToSection(id: string): void {
  const element = document.getElementById(id);
  if (!element) return;
  const headerHeight = getHeaderHeight();
  const top =
    element.getBoundingClientRect().top + window.scrollY - headerHeight - SECTION_OFFSET;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}

function waitForElement(id: string, attempts: number, onFound: () => void): void {
  if (attempts <= 0) return;
  if (document.getElementById(id)) {
    onFound();
    return;
  }
  requestAnimationFrame(() => waitForElement(id, attempts - 1, onFound));
}

export function ScrollManager() {
  const { pathname, hash } = useLocation();
  const prev = useRef({ pathname, hash });
  const isFirstRender = useRef(true);

  // 1. Take over scroll restoration from the browser.
  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // Handle imperative scroll commands from the Navigation Engine.
  useEffect(() => {
    const handleCommand = (command: ScrollCommand) => {
      if (command.type === "top") {
        scrollToTop("smooth");
        return;
      }
      waitForElement(command.id, SCROLL_RETRIES, () => scrollToSection(command.id));
    };
    return onScrollCommand(handleCommand);
  }, []);

  // React to URL changes only after React has committed the new DOM.
  useLayoutEffect(() => {
    const previous = prev.current;
    const pathChanged = previous.pathname !== pathname;
    const hashChanged = previous.hash !== hash;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      prev.current = { pathname, hash };
      // Deep link on first load: scroll to the section once it exists.
      if (hash) {
        const id = hash.replace(/^#/, "");
        requestAnimationFrame(() =>
          waitForElement(id, SCROLL_RETRIES, () => scrollToSection(id))
        );
      }
      // No hash on first load: manual restoration already leaves us at the top.
      return;
    }

    prev.current = { pathname, hash };

    // Ignore no-op re-renders (e.g. StrictMode double-invoke).
    if (!pathChanged && !hashChanged) return;

    if (hash) {
      // Section target (covers same-page hash swap and cross-page landing).
      const id = hash.replace(/^#/, "");
      requestAnimationFrame(() =>
        waitForElement(id, SCROLL_RETRIES, () => scrollToSection(id))
      );
    } else if (pathChanged) {
      // True route change: jump to top instantly to avoid any flash of the
      // previous page's scroll position.
      scrollToTop("instant");
    } else {
      // Same path, hash removed (logo / back-to-top on home): smooth scroll up.
      scrollToTop("smooth");
    }
  }, [pathname, hash]);

  return null;
}
