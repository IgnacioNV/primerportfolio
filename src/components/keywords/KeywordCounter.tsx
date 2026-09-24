"use client";

import { useEffect, useRef, useState } from "react";
import type { Keyword, KeywordId, SiteContent } from "@/content";
import { CtaButton } from "@/components/contact/CtaButton";
import styles from "./KeywordCounter.module.css";

/** Slot order, as listed in the brief. */
const ORDER: KeywordId[] = [
  "creatividad",
  "innovacion",
  "proyectos",
  "emprendedora",
  "liderazgo",
  "equipo",
  "pensamiento",
  "estrategia",
  "producto",
  "autodidacta",
  "curioso",
];

type Props = {
  keywords: Record<KeywordId, Keyword>;
  found: KeywordId[];
  ui: SiteContent["ui"]["keywords"];
  cta: string;
};

/**
 * "Words that define me": 11 empty slots that fill in, one word at a time,
 * as you find them next to their proof. Reads as a portrait being completed,
 * not a score. The count is there, but small.
 */
export function KeywordCounter({ keywords, found, ui, cta }: Props) {
  const ids = ORDER.filter((id) => keywords[id]);
  const total = ids.length;
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(false);
  const [pop, setPop] = useState<KeywordId | null>(null);
  const prev = useRef(found.length);
  const rootRef = useRef<HTMLDivElement>(null);
  const done = found.length >= total;

  // Every new word → a small pop on its slot.
  useEffect(() => {
    if (found.length <= prev.current) return;
    prev.current = found.length;
    const newest = found[found.length - 1];
    const a = window.setTimeout(() => setPop(newest), 0);
    const b = window.setTimeout(() => setPop(null), 700);
    return () => {
      window.clearTimeout(a);
      window.clearTimeout(b);
    };
  }, [found]);

  // The very first word → a short hint, once. Its own effect, so words found
  // together don't cancel it.
  const anyFound = found.length > 0;
  useEffect(() => {
    if (!anyFound) return;
    const a = window.setTimeout(() => setToast(true), 0);
    const b = window.setTimeout(() => setToast(false), 3600);
    return () => {
      window.clearTimeout(a);
      window.clearTimeout(b);
    };
  }, [anyFound]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDoc = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDoc);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDoc);
    };
  }, [open]);

  const progress = ui.progress.replace("{n}", String(found.length)).replace("{total}", String(total));

  return (
    <div ref={rootRef} className={`${styles.root} ${open ? styles.open : ""} ${done ? styles.done : ""}`}>
      {toast && (
        <p className={styles.toast} role="status">
          {ui.firstFound}
        </p>
      )}

      <button
        type="button"
        className={`${styles.card} ${pop ? styles.pop : ""}`}
        aria-expanded={open}
        aria-controls="keyword-slots"
        onClick={() => setOpen((v) => !v)}
      >
        <span className={styles.head}>
          <span className={styles.title}>{ui.title}</span>
          <span className={styles.count} aria-hidden>
            {found.length}/{total}
          </span>
          <span className="sr-only">{progress}</span>
        </span>
        {/* Compact view: one tick per word. */}
        <span className={styles.ticks} aria-hidden>
          {ids.map((id) => (
            <span key={id} className={found.includes(id) ? styles.tickOn : ""} />
          ))}
        </span>
      </button>

      {/* Expanded (or always, on wide screens): the words themselves. */}
      <div id="keyword-slots" className={styles.slotsWrap}>
        <ul className={styles.slots}>
          {ids.map((id) => {
            const isFound = found.includes(id);
            return (
              <li key={id} className={`${styles.slot} ${isFound ? styles.filled : ""} ${pop === id ? styles.slotPop : ""}`}>
                {isFound ? (
                  <a href={`#${keywords[id].section}`} onClick={() => setOpen(false)}>
                    {keywords[id].label}
                  </a>
                ) : (
                  <span aria-hidden>———</span>
                )}
              </li>
            );
          })}
        </ul>
        {done && (
          <div className={styles.final}>
            <p>{ui.done}</p>
            <CtaButton label={cta} small />
          </div>
        )}
      </div>
    </div>
  );
}
