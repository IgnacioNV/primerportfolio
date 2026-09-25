import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import stem from "@/assets/img/stem-award.png";
import type { Locale, SiteContent } from "@/content";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { Todo } from "@/components/ui/Todo";
import { RichText } from "@/components/ui/RichText";
import { isTodo } from "@/lib/todo";
import { ThinkingQuestions } from "./ThinkingQuestions";
import styles from "./Thinking.module.css";

export function Thinking({ locale, c, index }: { locale: Locale; c: SiteContent; index: number }) {
  const nav = c.nav.find((n) => n.id === "pienso")!;
  const { award } = c.thinking;

  return (
    <section id="pienso" className="section">
      <div className="section-inner">
        <SectionHead index={index} creative={nav.creative} label={nav.label} title={c.thinking.opening} lede={c.thinking.openingSub} />

        <div className={styles.qHead}>
          <h3 className={styles.qTitle}>{c.thinking.title}</h3>
          <p className={styles.qLede}>
            <RichText>{c.thinking.lede}</RichText>
          </p>
        </div>

        <ThinkingQuestions locale={locale} thinking={c.thinking} projects={c.projects.list} />

        <Reveal as="article" className={styles.award} aria-labelledby="award-title">
          <div className={styles.awardMedia}>
            <Image src={stem} alt={award.title} sizes="(min-width: 1100px) 1100px, 100vw" placeholder="blur" />
          </div>
          <div className={styles.awardText}>
            <p className={`meta ${styles.awardKicker}`}>{award.kicker}</p>
            <h3 id="award-title" className={styles.awardTitle}>
              {award.title}
            </h3>
            {award.body.map((b) => (
              <p key={b}>{b}</p>
            ))}
            {isTodo(award.link) ? (
              <Todo value={award.link} />
            ) : (
              <a className="btn btn-ghost" href={award.link} target="_blank" rel="noreferrer">
                {award.linkLabel} <ArrowUpRight size={16} aria-hidden />
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
