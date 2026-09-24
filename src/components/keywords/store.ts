import type { KeywordId } from "@/content";

/*
 * Discovered keywords, shared by every <Keyword> and the indicator.
 * In memory only, on purpose: every page load starts at 0.
 */
let found: KeywordId[] = [];
const listeners = new Set<() => void>();
const EMPTY: KeywordId[] = [];

export const keywordStore = {
  subscribe(fn: () => void) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
  getSnapshot: (): KeywordId[] => found,
  getServerSnapshot: (): KeywordId[] => EMPTY,
  discover(id: KeywordId) {
    if (found.includes(id)) return;
    found = [...found, id];
    listeners.forEach((l) => l());
  },
};
