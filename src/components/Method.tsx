"use client";

import { useState } from "react";
import type { SiteContent } from "@/content";
import { Reveal } from "./Reveal";
import { Text } from "./Text";
import styles from "./Method.module.css";

/**
 * A small Gantt chart of tools across idea → prototype → product.
 * The point it makes: one person can cover the whole line.
 */
export function Method({ method }: Pick<SiteContent, "method">) {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className={styles.method}>
      <header className={styles.head}>
        <h3 className={styles.title}>{method.title}</h3>
        <p className="section-lede">
          <Text>{method.lede}</Text>
        </p>
      </header>

      <div className={styles.chart}>
        <div className={styles.stages}>
          {method.stages.map((s, i) => (
            <div key={s.name} className={`${styles.stage} ${hover === i ? styles.stageOn : ""}`}>
              <span className="mono">
                {String(i + 1).padStart(2, "0")} — {s.name}
              </span>
              <p>
                <Text>{s.body}</Text>
              </p>
            </div>
          ))}
        </div>

        <ul className={styles.tools}>
          {method.tools.map((t, i) => {
            const from = Math.min(...t.stages);
            const to = Math.max(...t.stages);
            return (
              <Reveal
                as="li"
                key={t.name}
                delay={i * 50}
                className={styles.tool}
                style={{ gridColumn: `${from + 1} / ${to + 2}`, gridRow: i + 1 }}
                onMouseEnter={() => setHover(from === to ? from : null)}
                onMouseLeave={() => setHover(null)}
              >
                <span>{t.name}</span>
              </Reveal>
            );
          })}
        </ul>
      </div>

      <p className={styles.ai}>
        <Text>{method.aiNote}</Text>
      </p>
    </div>
  );
}
