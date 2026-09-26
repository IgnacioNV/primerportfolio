"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Piece } from "@/data/trayectoria";
import { Maybe } from "@/components/ui/Todo";
import styles from "./Museum.module.css";

export type Exhibit = {
  id: string;
  when: string;
  title: string;
  body: string;
  current?: boolean;
  piece?: Piece;
};

type Props = {
  /** Oldest first: you walk through the years from left to right. */
  items: Exhibit[];
  title: string;
  nowLabel: string;
  hint: string;
};

/** First year in a "2013 — 2019" / "2026 —" / "3.er año" label, for the big year on the wall. */
const yearOf = (when: string) => when.match(/\d{4}/)?.[0] ?? when;

/**
 * "Trayectoria" as a gallery room. The section pins to the screen and the
 * vertical scroll walks you sideways past each piece. Every piece has its own
 * spotlight that turns on as it reaches the center of the room.
 * Reduced motion: no pinning — a plain horizontal row, every light on.
 */
export function Museum({ items, title, nowLabel, hint }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLOListElement>(null);
  const [still, setStill] = useState(false);
  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = track.current;
    const r = rail.current;
    if (!t || !r) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = window.setTimeout(() => setStill(true), 0);
      r.querySelectorAll<HTMLElement>("[data-piece]").forEach((el) => el.style.setProperty("--lit", "1"));
      return () => window.clearTimeout(id);
    }

    let raf = 0;
    let dist = 0;
    const pieces = [...r.querySelectorAll<HTMLElement>("[data-piece]")];

    const measure = () => {
      dist = Math.max(0, r.scrollWidth - window.innerWidth);
      setDistance(dist);
    };

    const update = () => {
      raf = 0;
      const box = t.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.max(0, Math.min(1, -box.top / Math.max(1, box.height - vh)));
      r.style.transform = `translate3d(${-p * dist}px, 0, 0)`;
      t.style.setProperty("--p", p.toFixed(4));
      // Each spotlight: full at the center of the room, off at ~0.6 screens away.
      const mid = window.innerWidth / 2;
      let best = 0;
      let bestD = Infinity;
      pieces.forEach((el, i) => {
        const b = el.getBoundingClientRect();
        const d = Math.abs(b.left + b.width / 2 - mid);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
        const lit = Math.max(0, 1 - d / (window.innerWidth * 0.6));
        el.style.setProperty("--lit", lit.toFixed(3));
      });
      setActive(best);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    update();
    const ro = new ResizeObserver(onResize);
    ro.observe(r);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const current = items[active];

  return (
    <div
      ref={track}
      className={`${styles.track} ${still ? styles.still : ""}`}
      style={still ? undefined : { height: `calc(100svh + ${distance}px)` }}
      data-night=""
    >
      <div className={styles.room}>
        {/* The hall sign, and the year of the piece in front of you, big on the wall. */}
        <div className={styles.sign}>
          <h3 className={`meta ${styles.signTitle}`}>{title}</h3>
          <p className={`meta ${styles.hint}`} aria-hidden>
            {hint}
          </p>
        </div>
        <p className={styles.bigYear} aria-hidden key={current?.id}>
          {current ? yearOf(current.when) : ""}
        </p>

        <ol ref={rail} className={styles.rail}>
          {items.map((it) => (
            <li key={it.id} className={styles.exhibit} data-piece="">
              <span className={styles.beam} aria-hidden />
              <figure className={styles.frame}>
                {it.piece ? (
                  <div
                    className={`${styles.mat} ${it.piece.logo ? styles.logoMat : ""}`}
                    style={{ aspectRatio: it.piece.logo ? "4 / 5" : `${it.piece.width} / ${it.piece.height}` }}
                  >
                    <Image
                      src={it.piece.src}
                      alt={it.piece.logo ? "" : it.title}
                      fill
                      sizes="(min-width: 900px) 30vw, 70vw"
                      className={it.piece.logo ? styles.logo : styles.photo}
                    />
                  </div>
                ) : (
                  <div className={`${styles.mat} ${styles.typeMat}`} style={{ aspectRatio: "4 / 5" }} aria-hidden>
                    <span className={styles.typeYear}>{yearOf(it.when)}</span>
                  </div>
                )}
              </figure>
              <div className={styles.plaque}>
                <p className={`meta ${styles.when}`}>
                  <Maybe value={it.when} />
                  {it.current && <span className={styles.now}>{nowLabel}</span>}
                </p>
                <p className={styles.title}>{it.title}</p>
                <p className={styles.body}>
                  <Maybe value={it.body} />
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/* The floor: how far along the room you are. */}
        <span className={styles.floor} aria-hidden>
          <span className={styles.floorFill} />
        </span>
      </div>
    </div>
  );
}
