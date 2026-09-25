"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import type { KeywordId } from "@/content";
import { useKeywords } from "./KeywordProvider";
import { keywordStore } from "./store";
import styles from "./Keyword.module.css";

/**
 * A word that defines me, next to its proof. When it scrolls into view the
 * highlight paints itself once and it counts as discovered. Hover, focus or
 * tap shows the evidence.
 *
 * The tooltip is rendered outside the paragraph (in <body>) and linked with
 * aria-describedby, so screen readers don't read the evidence in the middle
 * of the sentence. It looks and behaves exactly the same.
 */
const noop = () => () => {};
const useMounted = () => useSyncExternalStore(noop, () => true, () => false);

type Pos = { top: number; left?: number; right?: number; night: boolean };
export function Keyword({ id, children }: { id: KeywordId; children: React.ReactNode }) {
  const { keywords } = useKeywords();
  const ref = useRef<HTMLButtonElement>(null);
  const [painted, setPainted] = useState(false);
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<Pos | null>(null);
  const mounted = useMounted();
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

  // Anchor the floating tooltip to the word; open toward whichever side has room.
  const measure = () => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const night = !!el.closest(".night");
    setPos(
      r.left + 316 > window.innerWidth
        ? { top: r.top - 10, right: window.innerWidth - r.right, night }
        : { top: r.top - 10, left: r.left, night },
    );
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDoc = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDoc);
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDoc);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [open]);

  const show = () => {
    measure();
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
      {mounted &&
        createPortal(
          <span
            id={tipId}
            role="tooltip"
            className={`${styles.tip} ${open ? styles.tipOpen : ""} ${pos?.night ? styles.tipNight : ""}`}
            style={pos ? { top: pos.top, left: pos.left, right: pos.right } : undefined}
          >
            <span className={styles.tipLabel}>{kw.label}</span>
            {kw.evidence}
          </span>,
          document.body,
        )}
    </span>
  );
}
