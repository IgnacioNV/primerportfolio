"use client";

import { useEffect, useRef, type ElementType } from "react";
import styles from "./SplitTitle.module.css";

/**
 * Section titles enter word by word — reading pace, not decoration.
 * The full string stays in the DOM for screen readers.
 */
export function SplitTitle({ text, as: Tag = "h2", className = "" }: { text: string; as?: ElementType; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add(styles.in);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const words = text.split(" ");
  return (
    <Tag ref={ref} className={`${styles.title} ${className}`} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className={styles.word} aria-hidden style={{ ["--i" as string]: i }}>
          <span>{w}</span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
