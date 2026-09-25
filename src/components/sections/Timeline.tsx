"use client";

import { useEffect, useRef } from "react";
import { Maybe } from "@/components/ui/Todo";
import styles from "./Timeline.module.css";

export type TimelineItem = {
  when: string;
  title: string;
  body: string;
  current?: boolean;
};

/**
 * Newest first. A continuous line joins every step and draws itself as you
 * scroll; current steps get a filled dot and a "Now" label.
 */
export function Timeline({ items, nowLabel }: { items: TimelineItem[]; nowLabel: string }) {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--p", "1");
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const probe = window.innerHeight * 0.7;
      const p = Math.min(1, Math.max(0, (probe - r.top) / r.height));
      el.style.setProperty("--p", p.toFixed(3));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <ol ref={ref} className={styles.timeline}>
      {items.map((t) => (
        <li key={t.title} className={`${styles.item} ${t.current ? styles.current : ""}`}>
          <span className={styles.dot} aria-hidden />
          <div className={styles.meta}>
            <span className="meta">
              <Maybe value={t.when} />
            </span>
            {t.current && <span className={`meta ${styles.now}`}>{nowLabel}</span>}
          </div>
          <div className={styles.content}>
            <p className={styles.title}>{t.title}</p>
            <p className={styles.body}>
              <Maybe value={t.body} />
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
