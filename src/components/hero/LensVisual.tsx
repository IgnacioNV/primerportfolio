"use client";

import { useEffect, useRef, useState } from "react";
import type { SiteContent } from "@/content";
import styles from "./LensVisual.module.css";

type Props = SiteContent["hero"]["visual"];

/**
 * Placeholder hero visual (to be replaced by the desktop-hero).
 * Two identical layers of type; the top one is only visible through a lens
 * that follows the cursor: on the surface "a button", underneath "a decision".
 */
export function LensVisual({ fixed, pairs, hint, hintTouch, label }: Props) {
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
    let visible = true;
    const t0 = performance.now();

    const baseRadius = () => Math.max(56, Math.min(130, stage.clientWidth * 0.09));
    const wordBox = () => {
      const r = stage.getBoundingClientRect();
      const w = stage.querySelector<HTMLElement>("[data-swap]")?.getBoundingClientRect();
      return w ? { x: w.left - r.left, y: w.top - r.top, w: w.width, h: w.height } : null;
    };
    const place = () => {
      const w = wordBox();
      if (w) {
        pos.x = target.x = w.x + w.w * 0.3;
        pos.y = target.y = w.y + w.h * 0.5;
      }
      radius = targetRadius = baseRadius();
    };
    const paint = () => {
      depth.style.clipPath = `circle(${radius.toFixed(1)}px at ${pos.x.toFixed(1)}px ${pos.y.toFixed(1)}px)`;
    };
    place();
    paint();

    const onMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      target.x = e.clientX - r.left;
      target.y = e.clientY - r.top;
      lastMove = performance.now();
      if (reduced) {
        pos.x = target.x;
        pos.y = target.y;
        paint();
      }
    };
    const onDown = () => (targetRadius = baseRadius() * 0.82);
    const onUp = () => (targetRadius = baseRadius());

    const loop = (now: number) => {
      if (visible) {
        // Nobody is looking? The lens keeps looking, across the word that changes.
        if (now - lastMove > 2400) {
          const w = wordBox();
          const t = (now - t0) / 1000;
          if (w) {
            target.x = w.x + w.w * (0.5 + 0.42 * Math.sin(t * 0.5));
            target.y = w.y + w.h * (0.5 + 0.2 * Math.sin(t * 1.1 + 1));
          }
        }
        pos.x += (target.x - pos.x) * 0.14;
        pos.y += (target.y - pos.y) * 0.14;
        radius += (targetRadius - radius) * 0.12;
        paint();
      }
      raf = requestAnimationFrame(loop);
    };

    // Only animate while on screen.
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(stage);

    stage.addEventListener("pointermove", onMove);
    if (!reduced) {
      stage.addEventListener("pointerdown", onDown);
      window.addEventListener("pointerup", onUp);
      raf = requestAnimationFrame(loop);
    }
    window.addEventListener("resize", place);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
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
    }, 200);
  };

  const words = (text: string) => (
    <p className={styles.type}>
      <span className={styles.fixed}>{fixed}</span>{" "}
      <span data-swap className={`${styles.swap} ${flip ? styles.out : ""}`}>
        {text}
      </span>
    </p>
  );

  return (
    <figure className={styles.wrap}>
      <div
        ref={stageRef}
        className={styles.stage}
        onClick={next}
        role="button"
        tabIndex={0}
        aria-label={`${label} ${fixed} ${pair.surface} → ${fixed} ${pair.depth}`}
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
      <figcaption className={`meta ${styles.hint}`}>
        <span className={styles.count}>
          {String(index + 1).padStart(2, "0")}/{String(pairs.length).padStart(2, "0")}
        </span>
        <span className={styles.hintPointer}>{hint}</span>
        <span className={styles.hintTouch}>{hintTouch}</span>
      </figcaption>
    </figure>
  );
}
