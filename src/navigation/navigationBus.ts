// src/navigation/navigationBus.ts
//
// Decoupling layer between the Navigation Engine and the ScrollManager.
// The engine is the sole authority for *deciding* what should happen (navigate,
// scroll to top, scroll to a section), but it never touches the scroll position
// directly. Instead it emits declarative commands through this bus, and the
// ScrollManager is the single executor that actually scrolls. This guarantees
// that scrolling only happens after React has committed the new DOM and that no
// component performs a scroll on its own.

export type ScrollCommand =
  | { type: "top" }
  | { type: "to"; id: string };

type ScrollCommandListener = (command: ScrollCommand) => void;

const listeners = new Set<ScrollCommandListener>();

export function emitScrollCommand(command: ScrollCommand): void {
  listeners.forEach((listener) => listener(command));
}

export function onScrollCommand(listener: ScrollCommandListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
