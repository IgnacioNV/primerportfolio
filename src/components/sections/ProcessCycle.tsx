"use client";

import { useEffect, useRef, useState } from "react";
import { Lock, RotateCcw } from "lucide-react";
import type { SiteContent } from "@/content";
import styles from "./ProcessCycle.module.css";

type Props = { process: SiteContent["thinking"]["process"] };

/**
 * The principle, then the cycle — as a pinned, full-screen moment.
 * As the block scrolls in, the page "turns off the lights" (paper → night);
 * once it fills the screen it stays fixed and each further bit of scroll
 * unlocks the next step (Idea → … → Product), and finally the loop.
 * Everything is in the DOM from the start; locking is only visual.
 * With reduced motion: no pinning, everything unlocked.
 */
export function ProcessCycle({ process }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState(0);
  const [enter, setEnter] = useState(0);
  const [still, setStill] = useState(false);
  const total = process.steps.length;

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t = window.setTimeout(() => {
        setStill(true);
        setEnter(1);
        setLit(total + 1);
      }, 0);
      return () => window.clearTimeout(t);
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Lights go off while the block rises through the lower 60% of the screen.
      setEnter(Math.max(0, Math.min(1, (vh - r.top) / (vh * 0.6))));
      // Then, pinned: 0 → 1 over the rest of the track.
      const p = Math.max(0, Math.min(1, -r.top / Math.max(1, r.height - vh)));
      setLit(Math.min(total + 1, Math.floor(p * (total + 1.6))));
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

  const fill = total > 1 ? Math.max(0, Math.min(1, (lit - 1) / (total - 1))) : 1;

  return (
    <div
      ref={track}
      className={`${styles.track} ${still ? styles.still : ""}`}
      style={{ ["--steps" as string]: total, ["--enter" as string]: enter, ["--fill" as string]: fill }}
      data-night=""
    >
      <div className={styles.stage}>
        <div className={`section-inner ${styles.inner}`}>
          <div className={styles.head}>
            <p className={`meta ${styles.kicker}`}>{process.kicker}</p>
            <p className={styles.principle}>{process.principle}</p>
            <p className={styles.intro}>{process.intro}</p>
          </div>

          <ol className={styles.steps}>
            {process.steps.map((s, i) => {
              const on = i < lit;
              return (
                <li key={s.name} className={`${styles.step} ${on ? styles.on : ""} ${on && i === lit - 1 ? styles.current : ""}`}>
                  <span className={styles.dot} aria-hidden>
                    <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                    <Lock size={14} className={styles.lock} />
                  </span>
                  <span className={styles.name}>{s.name}</span>
                  <span className={styles.body}>{s.body}</span>
                </li>
              );
            })}
          </ol>

          <p className={`${styles.loop} ${lit > total ? styles.loopOn : ""}`}>
            <RotateCcw size={18} aria-hidden className={styles.loopIcon} />
            {process.loop}
          </p>
        </div>
      </div>
    </div>
  );
}
