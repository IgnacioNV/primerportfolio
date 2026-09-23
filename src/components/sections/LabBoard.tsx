"use client";

import { useState } from "react";
import type { LabTag, SiteContent } from "@/content";
import { Maybe } from "@/components/ui/Todo";
import styles from "./Lab.module.css";

/* Slight, fixed tilts: notes pinned on a workbench, not a grid of tiles. */
const TILT = [-1.6, 1.1, -0.6, 1.8, -1.2, 0.7, -0.4];

export function LabBoard({ lab, allLabel, groupLabel }: { lab: SiteContent["lab"]; allLabel: string; groupLabel: string }) {
  const [tag, setTag] = useState<LabTag | "all">("all");
  const tags = (Object.keys(lab.tags) as LabTag[]).filter((t) => lab.entries.some((e) => e.tags.includes(t)));
  const count = (t: LabTag | "all") => (t === "all" ? lab.entries.length : lab.entries.filter((e) => e.tags.includes(t)).length);

  return (
    <>
      <div className={styles.filters} role="group" aria-label={groupLabel}>
        {(["all", ...tags] as const).map((t) => (
          <button key={t} type="button" className={`meta ${styles.filter}`} aria-pressed={tag === t} onClick={() => setTag(t)}>
            {t === "all" ? allLabel : lab.tags[t]} <span className={styles.fcount}>{count(t)}</span>
          </button>
        ))}
      </div>

      <ul className={styles.board}>
        {lab.entries.map((e, i) => {
          const match = tag === "all" || e.tags.includes(tag);
          return (
            <li
              key={e.id}
              className={`${styles.note} ${match ? "" : styles.dim}`}
              style={{ ["--tilt" as string]: `${TILT[i % TILT.length]}deg` }}
              aria-hidden={!match || undefined}
            >
              <div className={styles.noteTop}>
                <span className="meta">{e.id}</span>
                <span className={`meta ${styles.status}`}>
                  <Maybe value={e.status} />
                </span>
              </div>
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
