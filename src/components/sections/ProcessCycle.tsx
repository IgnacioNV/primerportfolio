"use client";

import { useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import type { SiteContent } from "@/content";
import styles from "./ProcessCycle.module.css";

type Props = { process: SiteContent["thinking"]["process"] };

/**
 * The principle, then the cycle. Steps light up one by one as you scroll
 * through the block, and the loop arrow closes the circle at the end:
 * it's a cycle, not a checklist. With reduced motion everything is lit.
 */
export function ProcessCycle({ process }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState(0);
  const total = process.steps.length;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t = window.setTimeout(() => setLit(total + 1), 0);
      return () => window.clearTimeout(t);
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      // 0 when the block enters at 85% of the viewport, 1 when its end reaches 60%.
      const start = window.innerHeight * 0.85;
      const end = window.innerHeight * 0.6;
      const p = (start - r.top) / (r.height + start - end);
      setLit(Math.max(0, Math.min(total + 1, Math.floor(p * (total + 1.5)))));
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
  }, [total]);

  return (
    <div ref={ref} className={styles.wrap}>
      <div className={styles.head}>
        <p className={`meta ${styles.kicker}`}>{process.kicker}</p>
        <p className={styles.principle}>{process.principle}</p>
        <p className={styles.intro}>{process.intro}</p>
      </div>

      <ol className={styles.steps}>
        {process.steps.map((s, i) => (
          <li key={s.name} className={`${styles.step} ${i < lit ? styles.on : ""}`}>
            <span className={styles.dot} aria-hidden>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className={styles.name}>{s.name}</span>
            <span className={styles.body}>{s.body}</span>
          </li>
        ))}
      </ol>

      <p className={`${styles.loop} ${lit > total ? styles.loopOn : ""}`}>
        <RotateCcw size={18} aria-hidden className={styles.loopIcon} />
        {process.loop}
      </p>
    </div>
  );
}
