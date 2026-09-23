import { es } from "./es";
import { en } from "./en";
import type { Locale, SiteContent } from "./types";

export const locales: Locale[] = ["es", "en"];
export const defaultLocale: Locale = "es";

const dictionaries: Record<Locale, SiteContent> = { es, en };

export function getContent(locale: Locale): SiteContent {
  return dictionaries[locale];
}

export function getProject(slug: string, locale: Locale) {
  return getContent(locale).projects.list.find((p) => p.slug === slug);
}

/* ── Routes ──────────────────────────────────────────────────
 * Spanish lives at the root ("/", "/proyectos/sima"),
 * English under "/en" ("/en", "/en/projects/sima").
 */
export const routes = {
  home: (l: Locale) => (l === "es" ? "/" : "/en"),
  project: (l: Locale, slug: string) => (l === "es" ? `/proyectos/${slug}` : `/en/projects/${slug}`),
};

export * from "./types";
