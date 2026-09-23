"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import type { Locale, SiteContent } from "@/content";
import { CtaButton } from "@/components/contact/CtaButton";
import styles from "./Nav.module.css";

type Props = {
  locale: Locale;
  homeHref: string;
  altHref: string;
  name: string;
  ui: SiteContent["ui"];
  /** Sections for the rail/menu. Empty on case pages. */
  items: SiteContent["nav"];
  /** Case pages tint the bar with the project's color. */
  tint?: { bg: string; fg: string };
};

/** Sections that sit on a dark surface: the bar flips with them. */
const NIGHT = new Set(["laboratorio"]);

export function Nav({ locale, homeHref, altHref, name, ui, items, tint }: Props) {
  const [active, setActive] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!items.length) return;
    const sections = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el);

    const onScroll = () => {
      const probe = window.innerHeight * 0.35;
      let current: HTMLElement | null = null;
      for (const s of sections) if (s.getBoundingClientRect().top <= probe) current = s;
      setActive(current?.id ?? null);
      if (current) {
        const r = current.getBoundingClientRect();
        setProgress(Math.min(1, Math.max(0, (probe - r.top) / r.height)));
      }
      // The bar reads the surface right under it.
      const under = sections.find((s) => {
        const r = s.getBoundingClientRect();
        return r.top <= 30 && r.bottom > 30;
      });
      document.documentElement.dataset.surface = under && NIGHT.has(under.id) ? "night" : "paper";
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      delete document.documentElement.dataset.surface;
    };
  }, [items]);

  // Close the mobile menu with Esc.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const activeIndex = items.findIndex((i) => i.id === active);
  const style = tint ? ({ ["--bar-bg" as string]: tint.bg, ["--bar-fg" as string]: tint.fg } as React.CSSProperties) : undefined;

  return (
    <>
      <header className={`${styles.bar} ${tint ? styles.tinted : ""}`} style={style}>
        <Link href={homeHref} className={styles.name}>
          {name}
        </Link>

        <div className={styles.right}>
          <nav aria-label={ui.langSwitch} className={`meta ${styles.lang}`}>
            <span aria-current="true">{locale.toUpperCase()}</span>
            <span aria-hidden className={styles.slash}>
              /
            </span>
            <Link href={altHref} hrefLang={locale === "es" ? "en" : "es"} lang={locale === "es" ? "en" : "es"} aria-label={ui.langSwitch}>
              {locale === "es" ? "EN" : "ES"}
            </Link>
          </nav>

          <CtaButton label={ui.cta} aria={ui.ctaAria} small arrow={false} className={styles.cta} />

          {items.length > 0 && (
            <button
              type="button"
              className={styles.menuBtn}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
              <span className="sr-only">{open ? ui.close : ui.menu}</span>
            </button>
          )}
        </div>
      </header>

      {items.length > 0 && (
        <>
          {/* Desktop rail: creative name + clear label, with reading progress. */}
          <nav className={styles.rail} aria-label={ui.menu}>
            <ol>
              {items.map((item, i) => {
                const state = item.id === active ? styles.active : i < activeIndex ? styles.done : "";
                return (
                  <li key={item.id} className={state}>
                    <a href={`#${item.id}`} aria-current={item.id === active ? "location" : undefined}>
                      <span className={styles.creative}>
                        {String(i + 1).padStart(2, "0")} {item.creative}
                      </span>
                      <span className={styles.label}>{item.label}</span>
                    </a>
                    {item.id === active && <span className={styles.bar2} style={{ transform: `scaleX(${progress})` }} aria-hidden />}
                  </li>
                );
              })}
            </ol>
          </nav>

          {/* Mobile menu sheet */}
          <div id="mobile-menu" className={`${styles.sheet} ${open ? styles.sheetOpen : ""}`} hidden={!open}>
            <ol>
              {items.map((item, i) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} onClick={() => setOpen(false)}>
                    <span className="meta">
                      {String(i + 1).padStart(2, "0")} {item.creative}
                    </span>
                    <span className={styles.sheetLabel}>{item.label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </>
      )}
    </>
  );
}
