import type { Metadata } from "next";
import { getContent, routes, type Locale } from "@/content";

/** Title, description, OG and hreflang alternates in the right language. */
export function homeMetadata(locale: Locale): Metadata {
  const c = getContent(locale);
  return {
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
