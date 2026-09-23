"use client";

import { createContext, useContext, useSyncExternalStore } from "react";
import type { Keyword, KeywordId, Locale, SiteContent } from "@/content";
import { keywordStore } from "./store";
import { KeywordCounter } from "./KeywordCounter";

type Ctx = { keywords: Record<KeywordId, Keyword>; found: KeywordId[] };
const KeywordContext = createContext<Ctx | null>(null);

export function useKeywords() {
  const ctx = useContext(KeywordContext);
  if (!ctx) throw new Error("useKeywords outside KeywordProvider");
  return ctx;
}

type Props = {
  locale: Locale;
  keywords: Record<KeywordId, Keyword>;
  ui: SiteContent["ui"]["keywords"];
  cta: string;
  children: React.ReactNode;
};

export function KeywordProvider({ keywords, ui, cta, children }: Props) {
  const found = useSyncExternalStore(keywordStore.subscribe, keywordStore.getSnapshot, keywordStore.getServerSnapshot);
  return (
    <KeywordContext.Provider value={{ keywords, found }}>
      {children}
      <KeywordCounter keywords={keywords} found={found} ui={ui} cta={cta} />
    </KeywordContext.Provider>
  );
}
