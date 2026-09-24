import Image from "next/image";
import { ArrowDown } from "lucide-react";
import type { SiteContent } from "@/content";
import { CtaButton } from "@/components/contact/CtaButton";
import { RichText } from "@/components/ui/RichText";
import { Todo } from "@/components/ui/Todo";
import { isTodo } from "@/lib/todo";
import styles from "./Hero.module.css";

type Props = {
  hero: SiteContent["hero"];
  name: string;
  ui: SiteContent["ui"];
  /** Whether /public/fotos/hero.jpg exists (checked at build time). */
  hasPortrait: boolean;
  /**
   * The interactive piece. Swappable on purpose: today it's the lens,
   * later the "desktop-hero" concept replaces it without touching the rest.
   */
  visual: React.ReactNode;
};

/**
 * 0–5 seconds: who he is and what he does. Everything important is plain,
 * server-rendered text — readable before any animation runs.
 */
export function Hero({ hero, name, ui, hasPortrait, visual }: Props) {
  const languages = hero.languages.filter((l) => !isTodo(l));
  return (
    <section id="hero" className={styles.hero} aria-labelledby="hero-name">
      <div className={`${styles.grid} ${hasPortrait ? "" : styles.noPortrait}`}>
        <div className={styles.text}>
          <p className={`meta ${styles.kicker}`}>{hero.kicker}</p>
          <h1 id="hero-name" className={styles.name}>
            {name}
          </h1>
          <p className={styles.line}>
            {hero.line} <span className={styles.aside}>{hero.aside}</span>
          </p>
          <p className={styles.sub}>
            <RichText>{hero.sub}</RichText>
          </p>

          <ul className={styles.proofs}>
            {hero.proofs.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>

          <div className={styles.actions} id="hero-cta">
            <CtaButton label={ui.cta} aria={ui.ctaAria} />
            <a href="#proyectos" className={styles.secondary}>
              {ui.seeProjects} <ArrowDown size={16} aria-hidden />
            </a>
          </div>

          <p className={`meta ${styles.langs}`}>
            {languages.join(" · ")}{" "}
            {hero.languages.filter(isTodo).map((l) => (
              <Todo key={l} value={l} />
            ))}
          </p>
        </div>

        {hasPortrait ? (
          <div className={styles.portrait}>
            <Image src={hero.portrait.src} alt={hero.portrait.alt} fill priority sizes="(min-width: 900px) 34vw, 90vw" />
          </div>
        ) : (
          <Todo value="TODO(nacho): foto del hero en /public/fotos/hero.jpg" />
        )}
      </div>

      <div className={styles.visual}>{visual}</div>
    </section>
  );
}
