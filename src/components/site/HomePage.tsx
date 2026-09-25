import { getContent, routes, type Locale } from "@/content";
import { publicExists } from "@/lib/assets";
import { Nav } from "./Nav";
import { Hero } from "@/components/hero/Hero";
import { HeroVisual, type Layer } from "@/components/hero/HeroVisual";
import { showTodos } from "@/lib/todo";
import { hero as heroMedia } from "@/data/hero";
import { FloatingCta } from "@/components/contact/FloatingCta";
import { Projects } from "@/components/sections/Projects";
import { Thinking } from "@/components/sections/Thinking";
import { Lab } from "@/components/sections/Lab";
import { About } from "@/components/sections/About";
import { Closing } from "@/components/sections/Closing";

/*
 * Order follows the visitor, not the designer:
 * 0 Hero (who, 0–5 s) → 1 Projects (is the work good?) → 2 How I think (judgment?)
 * → 3 Lab (initiative?) → 4 About (as a person?) → 5 Where I'm going + contact.
 */
export function HomePage({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const other: Locale = locale === "es" ? "en" : "es";

  // Hero visual: my photo on top, work underneath. Until the photos exist,
  // the work falls back to the real project logos; without a portrait the
  // visual stays hidden in production (the text takes the full width).
  const hasPortrait = publicExists(heroMedia.portrait.src);
  const underPhotos: Layer[] = heroMedia.under.filter((u) => publicExists(u.src)).map((u) => ({ src: u.src, alt: u.alt[locale] }));
  const under: Layer[] = underPhotos.length
    ? underPhotos
    : c.projects.list
        .filter((p) => p.logo)
        .map((p) => ({ src: p.logo!, alt: `${p.name} — logo`, bg: p.mediaBg, contain: true }));
  const heroVisual =
    hasPortrait || showTodos ? (
      <HeroVisual
        top={hasPortrait ? { src: heroMedia.portrait.src, alt: heroMedia.portrait.alt[locale] } : null}
        under={under}
        label={c.hero.visual.label}
        toggle={c.hero.visual.toggle}
      />
    ) : null;

  return (
    <>
      <Nav locale={locale} homeHref={routes.home(locale)} altHref={routes.home(other)} name={c.person.name} ui={c.ui} items={c.nav} />

      <main id="contenido">
        <Hero hero={c.hero} name={c.person.name} ui={c.ui} visual={heroVisual} />
        <Projects locale={locale} c={c} index={1} />
        <Thinking locale={locale} c={c} index={2} />
        <Lab c={c} index={3} />
        <About locale={locale} c={c} index={4} />
        <Closing c={c} index={5} />
      </main>

      <FloatingCta label={c.ui.cta} aria={c.ui.ctaAria} hasHero />
    </>
  );
}
