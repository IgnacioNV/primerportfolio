"use client";

import { useLayoutEffect, useRef, useState } from "react";
import type { LabTag, SiteContent } from "@/content";
import Image from "next/image";
import { Maybe } from "@/components/ui/Todo";
import { MediaVideo } from "@/components/ui/MediaVideo";
import type { Image as ImageData, Video } from "@/data/types";
import styles from "./Lab.module.css";

/* Slight, fixed tilts: notes pinned on a workbench, not a grid of tiles. */
const TILT = [-1.6, 1.1, -0.6, 1.8, -1.2, 0.7, -0.4];

export type LabMedia = { image?: ImageData & { altText: string }; video?: Video; videoAlt?: string };

type Props = { lab: SiteContent["lab"]; allLabel: string; groupLabel: string; media: Record<string, LabMedia> };

/**
 * Filtering reorders the bench: matching notes move to the front (keeping their
 * original order), the rest follow, dimmed. The move is animated with FLIP
 * (~300 ms); with reduced motion it just happens. "All" restores the order.
 */
export function LabBoard({ lab, allLabel, groupLabel, media }: Props) {
  const [tag, setTag] = useState<LabTag | "all">("all");
  const listRef = useRef<HTMLUListElement>(null);
  const before = useRef<Map<string, DOMRect> | null>(null);

  const tags = (Object.keys(lab.tags) as LabTag[]).filter((t) => lab.entries.some((e) => e.tags.includes(t)));
  const matches = (e: (typeof lab.entries)[number]) => tag === "all" || e.tags.includes(tag);
  const count = (t: LabTag | "all") => (t === "all" ? lab.entries.length : lab.entries.filter((e) => e.tags.includes(t)).length);
  const ordered = tag === "all" ? lab.entries : [...lab.entries.filter(matches), ...lab.entries.filter((e) => !matches(e))];

  const choose = (t: LabTag | "all") => {
    // F(irst): remember where every note is before the reorder.
    const map = new Map<string, DOMRect>();
    listRef.current?.querySelectorAll<HTMLElement>("[data-id]").forEach((el) => map.set(el.dataset.id!, el.getBoundingClientRect()));
    before.current = map;
    setTag(t);
  };

  // L(ast), I(nvert), P(lay).
  useLayoutEffect(() => {
    const prev = before.current;
    before.current = null;
    if (!prev || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    listRef.current?.querySelectorAll<HTMLElement>("[data-id]").forEach((el) => {
      const a = prev.get(el.dataset.id!);
      if (!a) return;
      const b = el.getBoundingClientRect();
      const dx = a.left - b.left;
      const dy = a.top - b.top;
      if (!dx && !dy) return;
      el.animate([{ translate: `${dx}px ${dy}px` }, { translate: "0 0" }], { duration: 300, easing: "cubic-bezier(0.2, 0.7, 0.1, 1)" });
    });
  }, [tag]);

  const n = count(tag);
  const announce =
    tag === "all"
      ? lab.result.all.replace("{n}", String(n))
      : (n === 1 ? lab.result.one : lab.result.other).replace("{n}", String(n)).replace("{tag}", lab.tags[tag]);

  return (
    <>
      <div className={styles.filters} role="group" aria-label={groupLabel}>
        {(["all", ...tags] as const).map((t) => (
          <button key={t} type="button" className={`meta ${styles.filter}`} aria-pressed={tag === t} onClick={() => choose(t)}>
            {t === "all" ? allLabel : lab.tags[t]} <span className={styles.fcount}>{count(t)}</span>
          </button>
        ))}
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {announce}
      </p>

      <ul ref={listRef} className={styles.board}>
        {ordered.map((e) => {
          const i = lab.entries.indexOf(e);
          return (
            <li
              key={e.id}
              data-id={e.id}
              className={`${styles.note} ${matches(e) ? "" : styles.dim}`}
              style={{ ["--tilt" as string]: `${TILT[i % TILT.length]}deg` }}
            >
              <div className={styles.noteTop}>
                <span className="meta">{e.id}</span>
                <span className={`meta ${styles.status}`}>
                  <Maybe value={e.status} />
                </span>
              </div>
              {media[e.id]?.image && (
                <Image
                  className={styles.media}
                  src={media[e.id].image!.src}
                  alt={media[e.id].image!.altText}
                  width={media[e.id].image!.width}
                  height={media[e.id].image!.height}
                  sizes="(min-width: 900px) 25vw, 90vw"
                />
              )}
              {media[e.id]?.video && <MediaVideo video={media[e.id].video!} alt={media[e.id].videoAlt ?? ""} className={styles.media} />}
              <h3 className={styles.title}>{e.title}</h3>
              <p className={styles.line}>
                <Maybe value={e.line} />
              </p>
              <p className={styles.noteText}>
                <Maybe value={e.note} />
              </p>
              <p className={`meta ${styles.tags}`}>{e.tags.map((t) => lab.tags[t]).join(" · ")}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}
