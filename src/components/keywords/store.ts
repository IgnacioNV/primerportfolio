import type { KeywordId } from "@/content";

/*
 * Tiny external store for discovered keywords, shared by every <Keyword>
 * and the counter. Persisted in sessionStorage so switching language or
 * opening a case and coming back doesn't reset the game.
 */
const KEY = "portfolio:keywords";
let found: KeywordId[] = [];
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (raw) found = JSON.parse(raw);
  } catch {
    /* storage blocked: the game still works for this page view */
  }
}

export const keywordStore = {
  subscribe(fn: () => void) {
    load();
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
  getSnapshot(): KeywordId[] {
    load();
    return found;
  },
  getServerSnapshot(): KeywordId[] {
    return EMPTY;
  },
  discover(id: KeywordId) {
    load();
    if (found.includes(id)) return;
    found = [...found, id];
    try {
      window.sessionStorage.setItem(KEY, JSON.stringify(found));
    } catch {
      /* ignore */
    }
    listeners.forEach((l) => l());
  },
};

const EMPTY: KeywordId[] = [];
