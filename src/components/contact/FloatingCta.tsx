"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { useContact } from "./ContactProvider";
import styles from "./FloatingCta.module.css";

/** Mobile only: appears once the hero (and its own CTA) is out of view. */
/** `afterHero`: wait until #hero scrolls away (home). Otherwise visible from the start (case pages). */
export function FloatingCta({ label, aria, afterHero = true }: { label: string; aria: string; afterHero?: boolean }) {
  const { open } = useContact();
  const [show, setShow] = useState(!afterHero);

  useEffect(() => {
    const hero = afterHero ? document.getElementById("hero") : null;
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
