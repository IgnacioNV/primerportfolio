"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import styles from "./HeroVisual.module.css";

export type Layer = { src: string | StaticImageData; alt: string; bg?: string; contain?: boolean };

type Props = {
  /** Photo on top. null = not uploaded yet (dev shows a placeholder). */
  top: Layer | null;
  /** Work underneath; rotates each time you look. */
  under: Layer[];
  label: string;
  toggle: string;
};

const REST = 7; // % of the work that always peeks out: the edge is the invitation.
const PEEK = 24;

/**
 * "Look at what's behind." No instructions in text — the interaction explains
 * itself (Don Norman's signifiers):
 *  - a sliver of work always shows at the edge, with a handle on the seam;
 *  - ~1 s after load the photo slides open a little and closes again (once);
 *  - on desktop the cursor becomes a lens over the image;
 *  - on touch, a ⇄ button in the corner.
 * Hover/drag moves the seam; tap, Enter or ⇄ toggles; arrow keys nudge it.
 */
export function HeroVisual({ top, under, label, toggle }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [reveal, setReveal] = useState(REST);
  const [animate, setAnimate] = useState(true);
  const [index, setIndex] = useState(0);
  const [lens, setLens] = useState<{ x: number; y: number } | null>(null);
  const interacted = useRef(false);
  const drag = useRef<{ startX: number; moved: boolean } | null>(null);

  const rest = useCallback(() => {
    setAnimate(true);
    setReveal((r) => {
      if (r > 30) setIndex((i) => (i + 1) % Math.max(1, under.length));
      return REST;
    });
  }, [under.length]);

  const toggleOpen = useCallback(() => {
    interacted.current = true;
    setAnimate(true);
    setReveal((r) => {
      if (r > 50) {
        setIndex((i) => (i + 1) % Math.max(1, under.length));
        return REST;
      }
      return 100;
    });
  }, [under.length]);

  // One-time peek after load.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const a = window.setTimeout(() => !interacted.current && setReveal(PEEK), 1000);
    const b = window.setTimeout(() => !interacted.current && setReveal(REST), 1900);
    return () => {
      window.clearTimeout(a);
      window.clearTimeout(b);
    };
  }, []);

  const pct = (clientX: number) => {
    const r = ref.current!.getBoundingClientRect();
    return Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100));
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") {
      interacted.current = true;
      const r = ref.current!.getBoundingClientRect();
      setLens({ x: e.clientX - r.left, y: e.clientY - r.top });
      setAnimate(false);
      setReveal(Math.max(REST, pct(e.clientX)));
      return;
    }
    if (drag.current) {
      if (Math.abs(e.clientX - drag.current.startX) > 6) drag.current.moved = true;
      if (drag.current.moved) {
        setAnimate(false);
        setReveal(Math.max(REST, pct(e.clientX)));
      }
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") return;
    interacted.current = true;
    drag.current = { startX: e.clientX, moved: false };
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") {
      toggleOpen();
      return;
    }
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    if (!d.moved) toggleOpen();
    else {
      setAnimate(true);
      setReveal((r) => (r > 50 ? 100 : REST));
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    interacted.current = true;
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      setAnimate(true);
      setReveal((r) => Math.min(100, Math.max(REST, r + (e.key === "ArrowRight" ? 12 : -12))));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleOpen();
    }
  };

  const current = under[index % Math.max(1, under.length)];

  return (
    <div className={styles.wrap}>
      <div
        ref={ref}
        className={`${styles.frame} ${animate ? styles.animate : ""}`}
        style={{ ["--reveal" as string]: `${reveal}%` }}
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(reveal)}
        aria-valuetext={reveal > 50 ? current?.alt : top?.alt}
        onPointerMove={onPointerMove}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={(e) => {
          if (e.pointerType === "mouse") {
            setLens(null);
            rest();
          }
        }}
        onKeyDown={onKeyDown}
      >
        {/* Underneath: the work */}
        <div className={styles.under} style={{ background: current?.bg ?? "var(--c-surface)" }}>
          {current && (
            <Image
              key={typeof current.src === "string" ? current.src : current.src.src}
              src={current.src}
              alt={current.alt}
              fill
              sizes="(min-width: 900px) 40vw, 80vw"
              className={current.contain ? styles.contain : styles.cover}
            />
          )}
        </div>

        {/* On top: me */}
        <div className={styles.top}>
          {top ? (
            <Image src={top.src} alt={top.alt} fill priority sizes="(min-width: 900px) 40vw, 80vw" className={styles.cover} />
          ) : (
            <div className={styles.placeholder}>TODO(nacho): /public/fotos/hero.jpg</div>
          )}
        </div>

        {/* The seam */}
        <span className={styles.seam} aria-hidden>
          <span className={styles.knob}>
            <ArrowLeftRight size={16} />
          </span>
        </span>

        {lens && <span className={styles.lens} style={{ transform: `translate(${lens.x}px, ${lens.y}px)` }} aria-hidden />}
      </div>

      <button type="button" className={styles.swap} onClick={toggleOpen} aria-label={toggle}>
        <ArrowLeftRight size={16} aria-hidden />
      </button>
    </div>
  );
}
