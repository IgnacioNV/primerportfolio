"use client";

import { useEffect, useState } from "react";
import styles from "./HeroTitle.module.css";

type Props = { title: string; start: string; struck: string; replacement: string };

type Phase = "ssr" | "type1" | "strike" | "collapse" | "type2" | "done";

/**
 * H1 that corrects itself once (~2 s): "Diseño pantallas." → "pantallas" gets
 * crossed out → "decisiones, no solo pantallas." The full sentence is always in
 * the DOM (sr-only) for SEO and screen readers; the animation is aria-hidden.
 * Without JS, or with reduced motion, the final sentence is shown directly.
 */
export function HeroTitle({ title, start, struck, replacement }: Props) {
  const [phase, setPhase] = useState<Phase>("ssr");
  const [n1, setN1] = useState(0);
  const [n2, setN2] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t = window.setTimeout(() => setPhase("done"), 0);
      return () => window.clearTimeout(t);
    }
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));
    let t = 250;
    at(0, () => setPhase("type1"));
    for (let i = 1; i <= struck.length; i++) at((t += 38), () => setN1(i));
    at((t += 220), () => setPhase("strike"));
    at((t += 420), () => setPhase("collapse"));
    at((t += 280), () => setPhase("type2"));
    for (let i = 1; i <= replacement.length; i++) at((t += 24), () => setN2(i));
    at((t += 60), () => setPhase("done"));
    return () => timers.forEach(window.clearTimeout);
  }, [struck, replacement]);

  const showOld = phase === "type1" || phase === "strike" || phase === "collapse";
  const typing = phase === "type1" || phase === "type2";

  return (
    <h1 className={styles.title}>
      <span className="sr-only">{title}</span>
      <span className={styles.visual} data-phase={phase} aria-hidden>
        {/* The final sentence always sets the height, so typing never moves the layout. */}
        <span className={styles.final}>{title}</span>
        {phase !== "ssr" && phase !== "done" && (
          <span className={styles.anim}>
            {start}{" "}
            {showOld && (
              <span className={`${styles.old} ${phase !== "type1" ? styles.struck : ""} ${phase === "collapse" ? styles.gone : ""}`}>
                {struck.slice(0, n1)}
              </span>
            )}
            {phase === "type2" && <span className={styles.new}>{replacement.slice(0, n2)}</span>}
            {typing && <span className={styles.caret} />}
          </span>
        )}
      </span>
    </h1>
  );
}
