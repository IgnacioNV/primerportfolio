import Image from "next/image";
import Link from "next/link";
import stem from "@/assets/img/stem-award.png";
import type { SiteContent } from "@/content";
import { Reveal } from "./Reveal";
import { Text, isPlaceholder } from "./Text";
import styles from "./Thinking.module.css";

export function Thinking({ thinking, work }: Pick<SiteContent, "thinking" | "work">) {
  const nameOf = (slug: string) => work.projects.find((p) => p.slug === slug)?.name;

  return (
    <div className="section-inner">
      <header className="section-head">
        <div>
          <p className="mono section-num">01 — Think</p>
          <h2 className="section-title">{thinking.title}</h2>
        </div>
        <p className="section-lede">
          <Text>{thinking.lede}</Text>
        </p>
      </header>

      <ol className={styles.questions}>
        {thinking.questions.map((item, i) => (
          <Reveal as="li" key={item.q} className={styles.q} delay={i * 40}>
            <span className={`mono ${styles.n}`}>Q{i + 1}</span>
            <p className={styles.text}>{item.q}</p>
            <p className={styles.tried}>
              <span className="mono">Tried in →</span>
              {item.triedIn.map((t) => {
                const name = nameOf(t);
                if (name) {
                  return (
                    <Link key={t} href={`/work/${t}`} className={styles.chip}>
                      {name}
                    </Link>
                  );
                }
                if (t === "award") {
                  return (
                    <a key={t} href="#award" className={styles.chip}>
                      The video
                    </a>
                  );
                }
                return (
                  <span key={t} className={`${styles.chip} ${styles.here}`}>
                    {t}
                  </span>
                );
              })}
            </p>
          </Reveal>
        ))}
      </ol>

      <Reveal as="article" id="award" className={styles.award}>
        <div className={styles.awardMedia}>
          <Image src={stem} alt={thinking.award.title} sizes="(min-width: 900px) 45vw, 100vw" placeholder="blur" />
        </div>
        <div className={styles.awardText}>
          <p className="mono">{thinking.award.kicker}</p>
          <h3 className={styles.awardTitle}>{thinking.award.title}</h3>
          {thinking.award.body.map((b) => (
            <p key={b}>
              <Text>{b}</Text>
            </p>
          ))}
          {isPlaceholder(thinking.award.link) ? (
            <p>
              <Text>{thinking.award.link}</Text>
            </p>
          ) : (
            <a className={styles.watch} href={thinking.award.link} target="_blank" rel="noreferrer">
              Watch the video ↗
            </a>
          )}
        </div>
      </Reveal>

      <Reveal className={styles.shelf}>
        <span className="mono">{thinking.shelf.title}</span>
        <p>
          {thinking.shelf.items.map((it, i) => (
            <span key={it}>
              {it}
              {i < thinking.shelf.items.length - 1 && <span className={styles.sep}> / </span>}
            </span>
          ))}
        </p>
      </Reveal>
    </div>
  );
}
