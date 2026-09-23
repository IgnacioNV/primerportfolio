"use client";

import { createContext, useContext } from "react";
import type { Keyword, KeywordId, Locale, SiteContent } from "@/content";

type Ctx = { keywords: Record<KeywordId, Keyword> };
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

export function KeywordProvider({ keywords, children }: Props) {
  return <KeywordContext.Provider value={{ keywords }}>{children}</KeywordContext.Provider>;
}
