"use client";

import { useEffect, useState } from "react";
import styles from "./ProcessNav.module.css";

type Item = { id: string; label: string };

/** Sections that sit on a dark surface — the header and rail flip with them. */
const NIGHT = new Set(["try"]);

/**
 * The navigation is the process: look → think → make → try → trace → next.
 * It tells you where you are in the story, not just where the links are.
 */
export function ProcessNav({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const onScroll = () => {
      const probe = window.innerHeight * 0.4;
      let current = sections[0];
      for (const s of sections) {
        if (s.getBoundingClientRect().top <= probe) current = s;
      }
      if (!current) return;
      const r = current.getBoundingClientRect();
      setActive(current.id);
      setProgress(Math.min(1, Math.max(0, (probe - r.top) / r.height)));
      document.documentElement.dataset.surface = NIGHT.has(current.id) ? "night" : "paper";
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

  const activeIndex = items.findIndex((i) => i.id === active);

  return (
    <>
      <nav className={styles.rail} aria-label="Sections">
        <ol>
          {items.map((item, i) => (
            <li key={item.id} className={item.id === active ? styles.active : i < activeIndex ? styles.done : ""}>
              <a href={`#${item.id}`}>
                <span className={styles.num}>{String(i).padStart(2, "0")}</span>
                <span className={styles.label}>{item.label}</span>
              </a>
              {item.id === active && (
                <span className={styles.bar} style={{ transform: `scaleX(${progress})` }} aria-hidden />
              )}
            </li>
          ))}
        </ol>
      </nav>

      <nav className={`${styles.pill} ${open ? styles.open : ""}`} aria-label="Sections">
        {open && (
          <ol>
            {items.map((item, i) => (
              <li key={item.id}>
                <a href={`#${item.id}`} onClick={() => setOpen(false)} className={item.id === active ? styles.active : ""}>
                  <span className={styles.num}>{String(i).padStart(2, "0")}</span> {item.label}
                </a>
              </li>
            ))}
          </ol>
        )}
        <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
          <span className={styles.num}>{String(Math.max(0, activeIndex)).padStart(2, "0")}</span>
          <span>{items[activeIndex]?.label}</span>
          <span className={styles.track} aria-hidden>
            <span style={{ transform: `scaleX(${(activeIndex + progress) / items.length})` }} />
          </span>
        </button>
      </nav>
    </>
  );
}
