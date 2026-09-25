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
let inPage = 0;
/** A floating CTA (the 11/11 keyword panel) that is on screen. */
let overlay = false;
let total = 0;

function emit() {
  inPage = visible.size;
  total = inPage + (overlay ? 1 : 0);
  listeners.forEach((l) => l());
}

const subscribe = (fn: () => void) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};

/** Every visible CTA, in-page or floating. The nav and mobile buttons step aside when > 0. */
export function useVisibleCtas() {
  return useSyncExternalStore(subscribe, () => total, () => 0);
}

/** Only the in-page ones (hero, end of projects, case, inline form). */
export function useInPageCtas() {
  return useSyncExternalStore(subscribe, () => inPage, () => 0);
}

/** A floating CTA announces itself here (not through an IntersectionObserver). */
export function setOverlayCta(on: boolean) {
  if (overlay === on) return;
  overlay = on;
  emit();
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
