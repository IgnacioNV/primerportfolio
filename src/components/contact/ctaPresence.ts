"use client";

import { useEffect, useId, useSyncExternalStore, type RefObject } from "react";

/*
 * Rule: never more than one "Charlemos" on screen.
 * Every in-page CTA (hero, end of projects, end of a case, the inline form,
 * the 11/11 message) registers here while it's visible. The nav button and the
 * mobile floating button read the count and step aside when it's > 0.
 */
const visible = new Set<string>();
const listeners = new Set<() => void>();
let count = 0;

function emit() {
  count = visible.size;
  listeners.forEach((l) => l());
}

const store = {
  subscribe(fn: () => void) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
  get: () => count,
  server: () => 0,
};

/** How many in-page CTAs are visible right now. */
export function useVisibleCtas() {
  return useSyncExternalStore(store.subscribe, store.get, store.server);
}

/** Register an element as an in-page CTA while it's on screen. */
export function useRegisterCta(ref: RefObject<HTMLElement | null>, enabled = true) {
  const id = useId();
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    // Counts as soon as any pixel is on screen: better a beat with none than two at once.
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) visible.add(id);
      else visible.delete(id);
      emit();
    });
    io.observe(el);
    return () => {
      io.disconnect();
      if (visible.delete(id)) emit();
    };
  }, [ref, id, enabled]);
}
