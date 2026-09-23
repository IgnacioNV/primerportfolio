import { Fragment } from "react";
import styles from "./Text.module.css";

/**
 * Renders copy, turning any [PLACEHOLDER] into a visible blue tag.
 * Keeps unfinished content honest: nothing on the page pretends to be real.
 */
export function Text({ children }: { children: string }) {
  const parts = children.split(/(\[[^\]]+\])/g);
  return (
    <>
      {parts.map((part, i) =>
        /^\[[^\]]+\]$/.test(part) ? (
          <span key={i} data-ph className={styles.placeholder} title="Placeholder — fill in src/content/en.ts">
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

export function isPlaceholder(s: string) {
  return /^\[[^\]]+\]$/.test(s.trim());
}

export function ImageSlot({ label = "[PROJECT IMAGE]", ratio = "16 / 10" }: { label?: string; ratio?: string }) {
  return (
    <div className={styles.slot} style={{ aspectRatio: ratio }}>
      <span>{label}</span>
    </div>
  );
}
