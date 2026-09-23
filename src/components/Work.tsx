"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Axis, SiteContent } from "@/content";
import { Text } from "./Text";
import styles from "./Work.module.css";

const AXES: Axis[] = ["design", "technology", "business", "ai", "people"];

/**
 * Selected work. Above the list sits a map of five territories.
 * Hover a project (or scroll to it on a phone) and the map shows which
 * territories it touches. Together, the projects cover the whole map —
 * that's the profile, shown instead of told.
 */
export function Work({ work }: Pick<SiteContent, "work">) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [inView, setInView] = useState<string | null>(null);
  const listRef = useRef<HTMLOListElement>(null);

  // Touch screens have no hover: the row closest to the middle is "active".
  useEffect(() => {
    if (window.matchMedia("(hover: hover)").matches) return;
    const rows = listRef.current?.querySelectorAll<HTMLElement>("[data-slug]");
    if (!rows) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setInView(e.target.getAttribute("data-slug"));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    rows.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, []);

  const activeSlug = hovered ?? inView;
  const active = work.projects.find((p) => p.slug === activeSlug);
  const count = (a: Axis) => work.projects.filter((p) => p.axes.includes(a)).length;

  return (
    <div className="section-inner">
      <header className="section-head">
        <div>
          <p className="mono section-num">02 — Make</p>
          <h2 className="section-title">{work.title}</h2>
        </div>
        <p className="section-lede">
          <Text>{work.lede}</Text>
        </p>
      </header>

      <div className={styles.map} aria-hidden>
        {AXES.map((a) => {
          const on = active ? active.axes.includes(a) : false;
          return (
            <div key={a} className={`${styles.axis} ${on ? styles.on : ""} ${active && !on ? styles.off : ""}`}>
              <span className={styles.dot} />
              <span className={styles.axisName}>{work.axes[a]}</span>
              {!active && <span className={`mono ${styles.axisCount}`}>×{count(a)}</span>}
            </div>
          );
        })}
      </div>

      <ol ref={listRef} className={styles.list} onMouseLeave={() => setHovered(null)}>
        {work.projects.map((p, i) => (
          <li
            key={p.slug}
            data-slug={p.slug}
            className={`${styles.row} ${activeSlug === p.slug ? styles.rowActive : ""}`}
            style={{ ["--pc" as string]: p.color, ["--pi" as string]: p.ink }}
            onMouseEnter={() => setHovered(p.slug)}
          >
            <Link href={`/work/${p.slug}`} className={styles.link} onFocus={() => setHovered(p.slug)}>
              <span className={`mono ${styles.idx}`}>{String(i + 1).padStart(2, "0")}</span>
              <span className={styles.name}>{p.name}</span>
              <span className={styles.info}>
                <span className={styles.line}>
                  <Text>{p.line}</Text>
                </span>
                <span className={`mono ${styles.meta}`}>
                  <Text>{p.year}</Text> · {p.role.filter((r) => !r.startsWith("[")).join(", ")}
                </span>
              </span>
              <span className={styles.arrow} aria-hidden>
                →
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
