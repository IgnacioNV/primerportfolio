import type { SiteContent } from "@/content";
import { Reveal } from "./Reveal";
import { Text, isPlaceholder } from "./Text";
import styles from "./Next.module.css";

/**
 * The ending is an open question, not a closed title.
 * Labels get crossed out one by one as the section arrives.
 */
export function Next({ next, person, footer }: Pick<SiteContent, "next" | "person" | "footer">) {
  return (
    <div className="section-inner">
      <p className="mono section-num">05 — Next</p>
      <h2 className="section-title">{next.title}</h2>

      <Reveal className={styles.label}>
        <span className="mono">{next.labelPrefix}</span>
        <p className={styles.labels}>
          {next.labels.map((l, i) => (
            <span key={l} className={styles.struck} style={{ ["--i" as string]: i }}>
              {l}
            </span>
          ))}
        </p>
        <p className={styles.resolution} style={{ ["--i" as string]: next.labels.length }}>
          {next.labelResolution}
        </p>
      </Reveal>

      <div className={styles.cols}>
        <Reveal className={styles.body}>
          {next.body.map((b) => (
            <p key={b}>
              <Text>{b}</Text>
            </p>
          ))}
        </Reveal>
        <Reveal delay={120} className={styles.spaces}>
          <span className="mono">Territories I&apos;m exploring</span>
          <ul>
            {next.spaces.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </Reveal>
      </div>

      <div className={styles.contact}>
        <h3 className={styles.contactTitle}>{next.contactTitle}</h3>
        {isPlaceholder(person.email) ? (
          <p className={styles.email}>
            <Text>{person.email}</Text>
          </p>
        ) : (
          <a className={styles.email} href={`mailto:${person.email}`}>
            {person.email}
          </a>
        )}
        <ul className={styles.links}>
          {person.links.map((l) => (
            <li key={l.href}>
              <a href={l.href} target="_blank" rel="noreferrer">
                {l.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </div>

      <footer className={`mono ${styles.footer}`}>
        <span>
          <Text>{footer}</Text>
        </span>
        <a href="#look">Back to the top ↑</a>
      </footer>
    </div>
  );
}
