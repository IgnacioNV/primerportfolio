import { ArrowUp, ArrowUpRight, Download, Mail } from "lucide-react";
import type { SiteContent } from "@/content";
import { publicExists } from "@/lib/assets";
import { isTodo } from "@/lib/todo";
import { CtaButton } from "@/components/contact/CtaButton";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/RichText";
import { Todo } from "@/components/ui/Todo";
import { BrandIcon } from "@/components/ui/BrandIcon";
import styles from "./Closing.module.css";

export function Closing({ c, index }: { c: SiteContent; index: number }) {
  const nav = c.nav.find((n) => n.id === "contacto")!;
  const { closing, person } = c;
  const email = isTodo(person.email) ? null : person.email;
  const cvPath = person.cv.replace("TODO(nacho):", "").trim();
  const hasCv = publicExists(cvPath);

  return (
    <section id="contacto" className="section">
      <div className="section-inner">
        <SectionHead index={index} creative={nav.creative} label={nav.label} title={closing.title} />

        <div className={styles.cols}>
          <div className={styles.body}>
            {closing.body.map((b, i) => (
              <Reveal as="p" key={i} delay={i * 80}>
                <RichText>{b}</RichText>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <h3 className={`meta ${styles.spacesTitle}`}>{closing.spacesTitle}</h3>
            <ul className={styles.spaces}>
              {closing.spaces.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className={styles.cta}>
          <h3 className={styles.ctaTitle}>{closing.ctaTitle}</h3>
          <p className={styles.ctaBody}>{closing.ctaBody}</p>
          <div className={styles.actions}>
            <CtaButton label={c.ui.cta} aria={c.ui.ctaAria} />
            {email && (
              <a className="btn btn-ghost" href={`mailto:${email}?subject=${encodeURIComponent(c.ui.contact.subject)}`}>
                <Mail size={16} aria-hidden /> {email}
              </a>
            )}
            {person.links.map((l) => (
              <a key={l.href} className="btn btn-ghost" href={l.href} target="_blank" rel="noreferrer">
                {l.label === "GitHub" && <BrandIcon name="github" size={16} />} {l.label} <ArrowUpRight size={16} aria-hidden />
              </a>
            ))}
            {hasCv ? (
              <a className="btn btn-ghost" href={cvPath} download>
                <Download size={16} aria-hidden /> {closing.cvLabel}
              </a>
            ) : (
              <Todo value={person.cv} />
            )}
            {!email && <Todo value={person.email} />}
          </div>
        </Reveal>

        <footer className={styles.footer}>
          <span className="meta">{c.footer}</span>
          <a href="#hero" className="meta">
            <ArrowUp size={14} aria-hidden /> {c.person.name}
          </a>
        </footer>
      </div>
    </section>
  );
}
