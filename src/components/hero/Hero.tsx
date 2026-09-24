import { ArrowRight } from "lucide-react";
import type { SiteContent } from "@/content";
import { CtaButton } from "@/components/contact/CtaButton";
import { HeroTitle } from "./HeroTitle";
import styles from "./Hero.module.css";

type Props = {
  hero: SiteContent["hero"];
  ui: SiteContent["ui"];
  /**
   * The visual on the right (photo with the work underneath). Swappable on
   * purpose: the "desktop-hero" concept will replace it without touching the rest.
   * null = nothing to show yet → the text takes the full width.
   */
  visual: React.ReactNode | null;
};

/** 0–5 s: who, what, why believe it, what to do. ~25 visible words. */
export function Hero({ hero, ui, visual }: Props) {
  return (
    <section id="hero" className={styles.hero} aria-labelledby="hero-title">
      <div className={`${styles.grid} ${visual ? "" : styles.textOnly}`}>
        {visual && <div className={styles.visual}>{visual}</div>}

        <div className={styles.text} id="hero-title">
          <HeroTitle title={hero.title} start={hero.titleStart} struck={hero.titleStruck} replacement={hero.titleReplacement} />
          <p className={styles.sub}>{hero.sub}</p>

          <ul className={styles.proofs}>
            {hero.proofs.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>

          <div className={styles.actions}>
            <CtaButton label={ui.cta} aria={ui.ctaAria} />
            <a href="#proyectos" className={styles.secondary}>
              {ui.seeProjects} <ArrowRight size={16} aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
