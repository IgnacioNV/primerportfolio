"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Locale, SiteContent } from "@/content";
import { routes } from "@/content";
import styles from "./Thinking.module.css";

type Props = { locale: Locale; thinking: SiteContent["thinking"]; projects: SiteContent["projects"]["list"] };

/**
 * The questions are a filter: pick one and the projects where I applied it
 * light up, the rest step back. Judgment, shown as a relationship.
 */
export function ThinkingQuestions({ locale, thinking, projects }: Props) {
  const [active, setActive] = useState<number | null>(null);
  const lit = active === null ? null : new Set(thinking.questions[active].projects);

  return (
    <div className={styles.layout}>
      <div>
        <p className={`meta ${styles.hint}`} id="questions-hint">
          {thinking.hint}
        </p>
        <ol className={styles.questions} aria-describedby="questions-hint">
          {thinking.questions.map((item, i) => (
            <li key={item.q}>
              <button
                type="button"
                className={styles.q}
                aria-pressed={active === i}
                aria-controls="applied-projects"
                onClick={() => setActive(active === i ? null : i)}
              >
                <span className={`meta ${styles.n}`}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.text}>{item.q}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <aside className={styles.applied} id="applied-projects" aria-live="polite">
        <p className={`meta ${styles.appliedTitle}`}>
          {active === null ? <>&nbsp;</> : thinking.appliedIn}
          {active !== null && (
            <button type="button" className={styles.reset} onClick={() => setActive(null)}>
              {thinking.reset}
            </button>
          )}
        </p>
        <ul>
          {projects.map((p) => {
            const on = lit ? lit.has(p.slug) : false;
            const off = lit ? !lit.has(p.slug) : false;
            return (
              <li key={p.slug} className={`${styles.proj} ${on ? styles.on : ""} ${off ? styles.off : ""}`}>
                <Link href={routes.project(locale, p.slug)} tabIndex={off ? -1 : 0} aria-hidden={off || undefined}>
                  <span className={styles.swatch} style={{ background: p.color }} aria-hidden />
                  <span className={styles.projName}>{p.name}</span>
                  <ArrowUpRight size={16} aria-hidden className={styles.arrow} />
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
}
