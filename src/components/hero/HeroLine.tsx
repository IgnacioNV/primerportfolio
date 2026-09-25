"use client";

import { useEffect, useState } from "react";
import styles from "./HeroLine.module.css";

type Props = { title: string; start: string; struck: string; replacement: string };

type Phase = "ssr" | "type1" | "strike" | "collapse" | "type2" | "done";

/**
 * The line under the name corrects itself once (~3.6 s, starting 400 ms after
 * the name): "Diseño pantallas." → "pantallas" gets crossed out →
 * "decisiones, no solo pantallas." Screen readers get the sentence once
 * (sr-only); everything animated is aria-hidden. Without JS, or with reduced
 * motion, the final sentence is shown directly.
 */
export function HeroLine({ title, start, struck, replacement }: Props) {
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
    let t = 400; // after the name has appeared
    at(t, () => setPhase("type1"));
    for (let i = 1; i <= struck.length; i++) at((t += 80), () => setN1(i));
    at((t += 350), () => setPhase("strike"));
    at((t += 750), () => setPhase("collapse"));
    at((t += 450), () => setPhase("type2"));
    for (let i = 1; i <= replacement.length; i++) at((t += 42), () => setN2(i));
    at((t += 80), () => setPhase("done"));
    return () => timers.forEach(window.clearTimeout);
  }, [struck, replacement]);

  const showOld = phase === "type1" || phase === "strike" || phase === "collapse";
  const typing = phase === "type1" || phase === "type2";

  return (
    <p className={styles.title}>
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
    </p>
  );
}
