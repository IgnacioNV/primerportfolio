"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";

type Props = { name: string; city: string; timezone: string; tint?: { bg: string; fg: string } };

export function Header({ name, city, timezone, tint }: Props) {
  const [time, setTime] = useState<string | null>(null);
  const [esNote, setEsNote] = useState(false);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: timezone, hour: "2-digit", minute: "2-digit" });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, [timezone]);

  return (
    <header
      className={styles.header}
      style={tint ? ({ ["--h-bg" as string]: tint.bg, ["--h-fg" as string]: tint.fg } as React.CSSProperties) : undefined}
    >
      <Link href="/" className={styles.name}>
        {name}
      </Link>
      <div className={styles.right}>
        <span className={`mono ${styles.clock}`} aria-label={`Local time in ${city}`}>
          {city} <span className={styles.time}>{time ?? "--:--"}</span>
        </span>
        <div className={`mono ${styles.lang}`}>
          <span aria-current="true">EN</span>
          <span className={styles.slash}>/</span>
          <button
            type="button"
            className={styles.es}
            aria-disabled="true"
            onClick={() => setEsNote((v) => !v)}
            onBlur={() => setEsNote(false)}
          >
            ES
          </button>
          {esNote && <span className={styles.note}>Pronto. La versión en español está en camino.</span>}
        </div>
      </div>
    </header>
  );
}
