import Image from "next/image";
import type { SiteContent } from "@/content";
import { Reveal } from "./Reveal";
import { Text } from "./Text";
import styles from "./Path.module.css";

/**
 * Two tracks side by side: school & work on one, the rest of life on the other.
 * Volleyball taught teams, performance and data before any class did.
 */
export function Path({ path }: Pick<SiteContent, "path">) {
  const main = path.entries.filter((e) => e.track === "main");
  const off = path.entries.filter((e) => e.track === "off");

  const renderEntry = (e: (typeof path.entries)[number], i: number) => (
    <Reveal as="li" key={e.title} className={styles.entry} delay={i * 30}>
      <span className={`mono ${styles.when}`}>
        <Text>{e.when}</Text>
      </span>
      <div>
        <h3 className={styles.title}>
          <Text>{e.title}</Text>
        </h3>
        <p className={styles.body}>
          <Text>{e.body}</Text>
        </p>
        {e.image && (
          <Image src={e.image} alt={e.title} className={styles.img} sizes="220px" placeholder="blur" />
        )}
      </div>
    </Reveal>
  );

  return (
    <div className="section-inner">
      <header className="section-head">
        <div>
          <p className="mono section-num">04 — Trace</p>
          <h2 className="section-title">{path.title}</h2>
        </div>
        <p className="section-lede">
          <Text>{path.lede}</Text>
        </p>
      </header>

      <div className={styles.tracks}>
        <section className={styles.track}>
          <h3 className={`mono ${styles.trackName}`}>{path.tracks.main}</h3>
          <ol>{main.map(renderEntry)}</ol>
        </section>
        <section className={`${styles.track} ${styles.off}`}>
          <h3 className={`mono ${styles.trackName}`}>{path.tracks.off}</h3>
          <ol>{off.map(renderEntry)}</ol>
        </section>
      </div>
    </div>
  );
}
