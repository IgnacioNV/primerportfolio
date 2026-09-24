"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { useContact } from "./ContactProvider";
import { useVisibleCtas } from "./ctaPresence";
import styles from "./FloatingCta.module.css";

/**
 * Mobile only (the bar has no room for a CTA on phones). Shown only when no
 * other "Charlemos" is on screen, the hero is out of view and the form is closed.
 */
export function FloatingCta({ label, aria, hasHero }: { label: string; aria: string; hasHero: boolean }) {
  const { open, isOpen } = useContact();
  const others = useVisibleCtas();
  // Pages with a hero start with it on screen: hidden until we know otherwise.
  const [heroVisible, setHeroVisible] = useState(hasHero);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setHeroVisible(e.isIntersecting));
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  const show = !heroVisible && others === 0 && !isOpen;

  return (
    <button
      type="button"
      className={`btn btn-primary ${styles.fab} ${show ? styles.show : ""}`}
      onClick={open}
      aria-label={aria}
      aria-haspopup="dialog"
      aria-hidden={!show || undefined}
      tabIndex={show ? 0 : -1}
    >
      <MessageCircle size={18} aria-hidden />
      {label}
    </button>
  );
}
