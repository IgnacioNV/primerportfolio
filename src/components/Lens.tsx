"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Lens.module.css";

type Pair = { surface: string; depth: string };
type Props = { kicker: string; who: string; hint: string; hintTouch: string; fixed: string; pairs: Pair[] };

/**
 * Fig. 0 — Look closer.
 * Two identical layers of type. The top one is only visible through a lens
 * that follows the cursor: on the surface, "a button"; underneath, "a decision".
 * It's the whole portfolio in one gesture — design is looking under the interface.
 */
export function Lens({ kicker, who, hint, hintTouch, fixed, pairs }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const depthRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [flip, setFlip] = useState(false);
  const pair = pairs[index];

  useEffect(() => {
    const stage = stageRef.current;
    const depth = depthRef.current;
    if (!stage || !depth) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pos = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    let radius = 0;
    let targetRadius = 0;
    let lastMove = -Infinity;
    let raf = 0;
    let t0 = performance.now();

    const baseRadius = () => Math.max(70, Math.min(170, stage.clientWidth * 0.11));

    const place = () => {
      const r = stage.getBoundingClientRect();
      pos.x = target.x = r.width * 0.3;
      pos.y = target.y = r.height * 0.62;
      radius = targetRadius = baseRadius();
    };
    place();

    const onMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      target.x = e.clientX - r.left;
      target.y = e.clientY - r.top;
      lastMove = performance.now();
      targetRadius = baseRadius();
    };
    const onDown = () => (targetRadius = baseRadius() * 0.82);
    const onUp = () => (targetRadius = baseRadius());

    const loop = (now: number) => {
      // When nobody is looking, the lens keeps looking by itself.
      if (now - lastMove > 2400) {
        // Drift across the word that changes — that's where the difference is.
        const t = (now - t0) / 1000;
        const r = stage.getBoundingClientRect();
        const word = stage.querySelector<HTMLElement>("[data-swap]")?.getBoundingClientRect();
        if (word) {
          target.x = word.left - r.left + word.width * (0.5 + 0.42 * Math.sin(t * 0.5));
          target.y = word.top - r.top + word.height * (0.45 + 0.25 * Math.sin(t * 1.1 + 1));
        }
      }
      const k = reduced ? 1 : 0.14;
      pos.x += (target.x - pos.x) * k;
      pos.y += (target.y - pos.y) * k;
      radius += (targetRadius - radius) * 0.12;
      depth.style.clipPath = `circle(${radius.toFixed(1)}px at ${pos.x.toFixed(1)}px ${pos.y.toFixed(1)}px)`;
      raf = requestAnimationFrame(loop);
    };

    if (reduced) {
      // Static lens: still readable, no drifting.
      depth.style.clipPath = `circle(${radius}px at ${pos.x}px ${pos.y}px)`;
      stage.addEventListener("pointermove", (e) => {
        onMove(e);
        depth.style.clipPath = `circle(${radius}px at ${target.x}px ${target.y}px)`;
      });
    } else {
      t0 = performance.now();
      raf = requestAnimationFrame(loop);
      stage.addEventListener("pointermove", onMove);
      stage.addEventListener("pointerdown", onDown);
      window.addEventListener("pointerup", onUp);
    }
    window.addEventListener("resize", place);

    return () => {
      cancelAnimationFrame(raf);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("resize", place);
    };
  }, []);

  const next = () => {
    setFlip(true);
    window.setTimeout(() => {
      setIndex((i) => (i + 1) % pairs.length);
      setFlip(false);
    }, 220);
  };

  const words = (text: string) => (
    <p className={styles.type}>
      <span className={styles.fixed}>{fixed}</span>
      <span data-swap className={`${styles.swap} ${flip ? styles.out : ""}`}>{text}</span>
    </p>
  );

  return (
    <div className={styles.hero}>
      <div className={styles.top}>
        <span className="mono">{kicker}</span>
        <span className={`mono ${styles.count}`}>
          {String(index + 1).padStart(2, "0")} / {String(pairs.length).padStart(2, "0")}
        </span>
      </div>
      <p className={styles.who}>{who}</p>

      <div
        ref={stageRef}
        className={styles.stage}
        onClick={next}
        role="button"
        tabIndex={0}
        aria-label={`${fixed} ${pair.surface} Underneath: ${fixed} ${pair.depth} Activate for another example.`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            next();
          }
        }}
      >
        <div className={styles.surface} aria-hidden>
          {words(pair.surface)}
        </div>
        <div ref={depthRef} className={styles.depth} aria-hidden>
          {words(pair.depth)}
        </div>
      </div>

      <p className={`mono ${styles.hint}`}>
        <span className={styles.hintPointer}>{hint}</span>
        <span className={styles.hintTouch}>{hintTouch}</span>
      </p>
    </div>
  );
}
