"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { useContact } from "./ContactProvider";
import styles from "./FloatingCta.module.css";

/**
 * Mobile only. On phones the bar has no room for the CTA, so this takes over
 * the moment the hero's own "Charlemos" leaves the screen — one is always visible.
 */
/** `afterHero`: wait until the hero CTA scrolls away (home). Otherwise visible from the start (case pages). */
export function FloatingCta({ label, aria, afterHero = true }: { label: string; aria: string; afterHero?: boolean }) {
  const { open } = useContact();
  const [show, setShow] = useState(!afterHero);

  useEffect(() => {
    const hero = afterHero ? document.getElementById("hero-cta") : null;
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting), { threshold: 0 });
    io.observe(hero);
    return () => io.disconnect();
  }, [afterHero]);

  return (
    <button
      type="button"
      className={`btn btn-primary ${styles.fab} ${show ? styles.show : ""}`}
      onClick={open}
      aria-label={aria}
      aria-haspopup="dialog"
      tabIndex={show ? 0 : -1}
    >
      <MessageCircle size={18} aria-hidden />
      {label}
    </button>
  );
}
