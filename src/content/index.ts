import { en } from "./en";
import type { SiteContent } from "./types";

export type Locale = "en" | "es";

// Spanish is not written yet. When es.ts exists, add it here —
// every component already reads copy through getContent().
const dictionaries: Partial<Record<Locale, SiteContent>> = { en };

export function getContent(locale: Locale = "en"): SiteContent {
  return dictionaries[locale] ?? en;
}

export function getProject(slug: string, locale: Locale = "en") {
  return getContent(locale).work.projects.find((p) => p.slug === slug);
}

export type { SiteContent };
export * from "./types";
