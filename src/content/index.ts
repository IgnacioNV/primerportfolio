import { es } from "./es";
import { en } from "./en";
import type { Locale, SiteContent } from "./types";
import { isTodo, showTodos } from "@/lib/todo";

export const locales: Locale[] = ["es", "en"];
export const defaultLocale: Locale = "es";

/**
 * In production, every "TODO(nacho): …" string becomes "" before it reaches
 * any component — so pending notes are neither rendered nor shipped in the
 * page payload. Components already treat "" as "missing".
 */
function stripTodos<T>(value: T): T {
  if (typeof value === "string") return (isTodo(value) ? "" : value) as T;
  if (Array.isArray(value)) return value.map(stripTodos) as T;
  if (value && typeof value === "object" && Object.getPrototypeOf(value) === Object.prototype) {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, stripTodos(v)])) as T;
  }
  return value;
}

const dictionaries: Record<Locale, SiteContent> = showTodos ? { es, en } : { es: stripTodos(es), en: stripTodos(en) };

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
