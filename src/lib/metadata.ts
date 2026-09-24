import type { Metadata } from "next";
import { getContent, routes, type Locale } from "@/content";

/**
 * Absolute base for canonical / hreflang / OG URLs.
 * Set NEXT_PUBLIC_SITE_URL once there's a domain; on Vercel it falls back to the production URL.
 */
export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000"),
);

/** Title, description, OG and hreflang alternates in the right language. */
export function homeMetadata(locale: Locale): Metadata {
  const c = getContent(locale);
  return {
    metadataBase: siteUrl,
    title: { default: c.meta.title, template: `%s — ${c.person.name}` },
    description: c.meta.description,
    alternates: {
      canonical: routes.home(locale),
      languages: { es: routes.home("es"), en: routes.home("en") },
    },
    openGraph: {
      title: c.meta.title,
      description: c.meta.description,
      locale: c.meta.ogLocale,
      type: "website",
      siteName: c.person.name,
    },
  };
}
