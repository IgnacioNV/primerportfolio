"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import type { Keyword, KeywordId, SiteContent } from "@/content";
import { CtaButton } from "@/components/contact/CtaButton";
import { setOverlayCta, useInPageCtas } from "@/components/contact/ctaPresence";
import styles from "./KeywordCounter.module.css";

type Props = {
  keywords: Record<KeywordId, Keyword>;
  found: KeywordId[];
  ui: SiteContent["ui"]["keywords"];
  cta: string;
};

/**
 * "3/11 words" — a quiet collectible. Opens a list: found words link to their
 * section, pending ones stay grey. At 11/11, a short note and "Let's talk".
 */
export function KeywordCounter({ keywords, found, ui, cta }: Props) {
  const ids = Object.keys(keywords) as KeywordId[];
  const total = ids.length;
  const [open, setOpen] = useState(false);
  const [bump, setBump] = useState(false);
  const prev = useRef(found.length);
  const panelRef = useRef<HTMLDivElement>(null);

  // Little bump when a new word is found.
  useEffect(() => {
    if (found.length > prev.current) {
      prev.current = found.length;
      const t0 = window.setTimeout(() => setBump(true), 0);
      const t1 = window.setTimeout(() => setBump(false), 700);
      return () => {
        window.clearTimeout(t0);
        window.clearTimeout(t1);
      };
    }
  }, [found.length]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDoc = (e: PointerEvent) => {
      if (!panelRef.current?.parentElement?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDoc);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDoc);
    };
  }, [open]);

  const done = found.length >= total;
  // One "Let's talk" at a time: the 11/11 button only shows when no other one is on screen.
  const inPage = useInPageCtas();
  const showCta = open && done && inPage === 0;
  useEffect(() => {
    setOverlayCta(showCta);
    return () => setOverlayCta(false);
  }, [showCta]);

  return (
    <div className={styles.root}>
      {open && (
        <div ref={panelRef} className={styles.panel} id="keyword-panel" role="dialog" aria-label={ui.title}>
          <p className={`meta ${styles.title}`}>{ui.title}</p>
          <p className={styles.hint}>{done ? ui.done : ui.hint}</p>
          <ul className={styles.list}>
            {ids.map((id) => {
              const isFound = found.includes(id);
              return (
                <li key={id}>
                  {isFound ? (
                    <a href={`#${keywords[id].section}`} onClick={() => setOpen(false)} className={styles.found}>
                      <Check size={14} aria-hidden /> {keywords[id].label}
                    </a>
                  ) : (
                    <span className={styles.pending} aria-hidden>
                      {"•".repeat(Math.min(8, keywords[id].label.length))}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
          {showCta && <CtaButton label={cta} small track={false} />}
        </div>
      )}
      <button
        type="button"
        className={`${styles.pill} ${bump ? styles.bump : ""} ${done ? styles.done : ""}`}
        aria-expanded={open}
        aria-controls="keyword-panel"
        onClick={() => setOpen((v) => !v)}
      >
        <span className={styles.dots} aria-hidden>
          {ids.map((id) => (
            <span key={id} className={found.includes(id) ? styles.dotOn : ""} />
          ))}
        </span>
        <span className={styles.count}>
          {found.length}/{total}
        </span>
        <span className={styles.label}>{ui.counter}</span>
      </button>
    </div>
  );
}
