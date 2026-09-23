import { getContent, routes, type Locale } from "@/content";
import { publicExists } from "@/lib/assets";
import { Nav } from "./Nav";
import { Hero } from "@/components/hero/Hero";
import { LensVisual } from "@/components/hero/LensVisual";
import { FloatingCta } from "@/components/contact/FloatingCta";
import { Projects } from "@/components/sections/Projects";
import { Thinking } from "@/components/sections/Thinking";

/*
 * Order follows the visitor, not the designer:
 * 0 Hero (who, 0–5 s) → 1 Projects (is the work good?) → 2 How I think (judgment?)
 * → 3 Lab (initiative?) → 4 About (as a person?) → 5 Where I'm going + contact.
 */
export function HomePage({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const other: Locale = locale === "es" ? "en" : "es";

  return (
    <>
      <Nav locale={locale} homeHref={routes.home(locale)} altHref={routes.home(other)} name={c.person.name} ui={c.ui} items={c.nav} />

      <main id="contenido">
        <Hero
          hero={c.hero}
          name={c.person.name}
          ui={c.ui}
          hasPortrait={publicExists(c.hero.portrait.src)}
          visual={<LensVisual {...c.hero.visual} />}
        />
        <Projects locale={locale} c={c} index={1} />
        <Thinking locale={locale} c={c} index={2} />
      </main>

      <FloatingCta label={c.ui.cta} aria={c.ui.ctaAria} />
    </>
  );
}
