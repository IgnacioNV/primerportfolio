"use client";

import Image from "next/image";
import { useState } from "react";
import type { LabTag, SiteContent } from "@/content";
import { Text } from "./Text";
import styles from "./Lab.module.css";

/**
 * The lab is darker on purpose: finished work lives on paper,
 * experiments live on the workbench. Filters sort by kind of curiosity.
 */
export function Lab({ lab }: Pick<SiteContent, "lab">) {
  const [tag, setTag] = useState<LabTag | "all">("all");
  const [open, setOpen] = useState<string | null>(null);
  const tags = Object.keys(lab.tags) as LabTag[];

  return (
    <div className="section-inner">
      <header className="section-head">
        <div>
          <p className="mono section-num">03 — Try</p>
          <h2 className="section-title">{lab.title}</h2>
        </div>
        <p className="section-lede">
          <Text>{lab.lede}</Text>
        </p>
      </header>

      <div className={styles.filters} role="group" aria-label="Filter experiments">
        {(["all", ...tags] as const).map((t) => (
          <button
            key={t}
            type="button"
            className={`mono ${styles.filter}`}
            aria-pressed={tag === t}
            onClick={() => setTag(t)}
          >
            {t === "all" ? "All" : lab.tags[t]}
            <span className={styles.fcount}>
              {t === "all" ? lab.entries.length : lab.entries.filter((e) => e.tags.includes(t)).length}
            </span>
          </button>
        ))}
      </div>

      <ul className={styles.list}>
        {lab.entries.map((e) => {
          const match = tag === "all" || e.tags.includes(tag);
          const isOpen = open === e.id;
          return (
            <li key={e.id} className={`${styles.entry} ${match ? "" : styles.dim} ${isOpen ? styles.open : ""}`}>
              <button
                type="button"
                className={styles.head}
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : e.id)}
                tabIndex={match ? 0 : -1}
              >
                <span className={`mono ${styles.id}`}>{e.id}</span>
                <span className={styles.title}>
                  <Text>{e.title}</Text>
                </span>
                <span className={styles.line}>
                  <Text>{e.line}</Text>
                </span>
                <span className={`mono ${styles.status}`}>
                  <Text>{e.status}</Text>
                </span>
                <span className={styles.plus} aria-hidden>
                  +
                </span>
              </button>
              <div className={styles.body}>
                <div className={styles.bodyInner}>
                  <p className={styles.note}>
                    <Text>{e.note}</Text>
                  </p>
                  <p className={`mono ${styles.tags}`}>{e.tags.map((t) => lab.tags[t]).join(" · ")}</p>
                  {e.image && (
                    <Image src={e.image} alt={e.title} className={styles.img} sizes="(min-width: 900px) 30vw, 80vw" />
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
