// src/navigation/NavigationEngine.tsx
//
// Centralized Navigation Engine — the SOLE authority for navigation.
//
// No component in the app is permitted to call `navigate()`, `window.scrollTo()`
// or `scrollIntoView()` directly. Every navigation intent (route change, hash
// navigation, menu closing, top-scroll, active-link reset) is proxied through
// the methods exposed by `useNavigation()`.
//
// Scrolling itself is delegated entirely to the ScrollManager via the navigation
// bus (see navigationBus.ts), so this engine only ever changes the URL / menu
// state — never the scroll position. This eliminates race conditions where the
// URL updates before React has committed the destination content.
//
// Navigation sequencing (esp. from the mobile menu):
//   Click  ->  menu exit animation  ->  onExitComplete  ->  navigate
//          ->  page renders  ->  ScrollManager scrolls  ->  menu state already closed.
// Navigation never starts until the overlay's exit animation has fully finished
// (driven by AnimatePresence's onExitComplete), so the overlay can never intercept
// the scroll/click and scrolling never happens while the menu is open.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { emitScrollCommand } from "./navigationBus";

const HOME_PATH = "/";

function normalizeHash(hash: string): string {
  return hash.startsWith("#") ? hash : `#${hash}`;
}

function stripHash(hash: string): string {
  return hash.replace(/^#/, "");
}

export interface NavigationEngine {
  menuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
  /**
   * Navigate to a route path (e.g. "/proud-moments"). If already on that route,
   * smooth-scrolls to the top instead. Always closes the menu first. Resets any
   * hash on the home route (so the logo always lands on a clean "/").
   */
  navigateTo: (path: string) => void;
  /**
   * Navigate to an in-page section by hash (e.g. "#about"). On home, updates the
   * URL hash and smooth-scrolls once the target exists; from another page it
   * routes home with the hash and scrolls after the home content mounts.
   */
  navigateToSection: (hash: string) => void;
  /** Smoothly scroll to the absolute top of the current page. */
  scrollToTop: () => void;
  /**
   * Called by the menu's AnimatePresence `onExitComplete`. Runs the navigation
   * that was deferred when the menu started closing, and clears the pending slot.
   * Safe to call when no navigation is pending (no-op).
   */
  flushPendingNavigation: () => void;
}

const NavigationEngineContext = createContext<NavigationEngine | null>(null);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  // Holds the navigation deferred while the menu exit animation plays.
  // Only one pending action is ever kept, so rapid/duplicate clicks collapse
  // into a single navigation.
  const pendingAction = useRef<(() => void) | null>(null);
  // True from the moment the menu starts closing until its exit animation has
  // fully finished. While true, any navigation click is deferred (not run
  // immediately) so we never navigate/scroll before the animation ends — even
  // after `menuOpen` has already flipped to false.
  const isClosing = useRef(false);

  const clearPending = useCallback(() => {
    pendingAction.current = null;
  }, []);

  const openMenu = useCallback(() => {
    clearPending();
    isClosing.current = false;
    setMenuOpen(true);
  }, [clearPending]);

  const closeMenu = useCallback(() => {
    isClosing.current = true;
    setMenuOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen((open) => {
      // Opening a freshly opened menu discards any stale deferred nav.
      if (!open) {
        clearPending();
        isClosing.current = false;
      } else {
        isClosing.current = true;
      }
      return !open;
    });
  }, [clearPending]);

  // Defer `action` until the menu's exit animation completes. If the menu is
  // already closed (and not mid-close), run it immediately. Duplicate clicks
  // overwrite the single pending slot, preventing double navigation.
  const runAfterMenuClose = useCallback(
    (action: () => void) => {
      if (menuOpen || isClosing.current) {
        pendingAction.current = action;
        isClosing.current = true;
        setMenuOpen(false);
      } else {
        action();
      }
    },
    [menuOpen]
  );

  // Invoked by AnimatePresence onExitComplete — runs the deferred navigation
  // exactly when the overlay has finished animating out.
  const flushPendingNavigation = useCallback(() => {
    isClosing.current = false;
    const action = pendingAction.current;
    pendingAction.current = null;
    if (action) action();
  }, []);

  useEffect(() => {
    return () => {
      pendingAction.current = null;
      isClosing.current = false;
    };
  }, []);

  const scrollToTop = useCallback(() => {
    // Same-page scroll: the URL does not change, so ask the ScrollManager to
    // perform a smooth scroll to the top.
    emitScrollCommand({ type: "top" });
  }, []);

  const navigateTo = useCallback(
    (path: string) => {
      const perform = () => {
        if (path === location.pathname) {
          if (location.hash !== "") {
            // Same route but carrying a stale hash: clear it. Removing the hash
            // makes the ScrollManager treat this as a same-page scroll-to-top.
            navigate(HOME_PATH, { replace: true });
          } else {
            // Already here with a clean URL: just smooth-scroll to the top.
            emitScrollCommand({ type: "top" });
          }
          return;
        }
        // True route change: the ScrollManager resets to the top instantly once
        // the destination mounts (no restored scroll position).
        navigate(path);
      };
      runAfterMenuClose(perform);
    },
    [navigate, location.pathname, location.hash, runAfterMenuClose]
  );

  const navigateToSection = useCallback(
    (hash: string) => {
      const target = normalizeHash(hash);
      const targetId = stripHash(target);

      const perform = () => {
        if (location.pathname === HOME_PATH) {
          if (location.hash === target) {
            // Already on this section: re-issue a scroll so clicking the active
            // link still scrolls smoothly to the top of the section.
            emitScrollCommand({ type: "to", id: targetId });
          } else {
            // Stay on home, update the hash; ScrollManager reacts and scrolls
            // once the target is in the DOM.
            navigate(HOME_PATH + target, { replace: true });
          }
          return;
        }
        // Cross-page: route home with the hash payload. The ScrollManager waits
        // for the home content (and therefore the target) to mount before
        // scrolling — no jumping or partial alignment.
        navigate(HOME_PATH + target);
      };
      runAfterMenuClose(perform);
    },
    [navigate, location.pathname, location.hash, runAfterMenuClose]
  );

  const value = useMemo<NavigationEngine>(
    () => ({
      menuOpen,
      openMenu,
      closeMenu,
      toggleMenu,
      navigateTo,
      navigateToSection,
      scrollToTop,
      flushPendingNavigation,
    }),
    [
      menuOpen,
      openMenu,
      closeMenu,
      toggleMenu,
      navigateTo,
      navigateToSection,
      scrollToTop,
      flushPendingNavigation,
    ]
  );

  return (
    <NavigationEngineContext.Provider value={value}>
      {children}
    </NavigationEngineContext.Provider>
  );
}

export function useNavigation(): NavigationEngine {
  const ctx = useContext(NavigationEngineContext);
  if (!ctx) {
    throw new Error("useNavigation must be used within a <NavigationProvider>.");
  }
  return ctx;
}
