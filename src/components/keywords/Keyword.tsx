"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { KeywordId } from "@/content";
import { useKeywords } from "./KeywordProvider";
import { keywordStore } from "./store";
import styles from "./Keyword.module.css";

/**
 * A word that defines me, next to its proof. When it scrolls into view the
 * highlight paints itself once and it counts as discovered. Hover, focus or
 * tap shows the evidence.
 */
export function Keyword({ id, children }: { id: KeywordId; children: React.ReactNode }) {
  const { keywords } = useKeywords();
  const ref = useRef<HTMLButtonElement>(null);
  const [painted, setPainted] = useState(false);
  const [open, setOpen] = useState(false);
  const [alignRight, setAlignRight] = useState(false);
  const tipId = useId();
  const kw = keywords[id];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        setPainted(true);
        keywordStore.discover(id);
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.9 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [id]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDoc = (e: PointerEvent) => {
      if (!ref.current?.parentElement?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDoc);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDoc);
    };
  }, [open]);

  // Open toward whichever side has room.
  const show = () => {
    const r = ref.current?.getBoundingClientRect();
    if (r) setAlignRight(r.left + 316 > window.innerWidth);
    setOpen(true);
  };

  if (!kw) return <>{children}</>;

  return (
    <span className={styles.wrap} data-keyword={id}>
      <button
        ref={ref}
        type="button"
        className={`${styles.word} ${painted ? styles.painted : ""}`}
        aria-describedby={tipId}
        aria-expanded={open}
        onClick={() => (open ? setOpen(false) : show())}
        onMouseEnter={show}
        onMouseLeave={() => setOpen(false)}
        onFocus={show}
        onBlur={() => setOpen(false)}
      >
        {children}
      </button>
      <span id={tipId} role="tooltip" className={`${styles.tip} ${open ? styles.tipOpen : ""} ${alignRight ? styles.tipRight : ""}`}>
        <span className={styles.tipLabel}>{kw.label}</span>
        {kw.evidence}
      </span>
    </span>
  );
}
