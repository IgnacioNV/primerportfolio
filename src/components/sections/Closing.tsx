import { ArrowUp, ArrowUpRight, Download } from "lucide-react";
import type { SiteContent } from "@/content";
import { publicExists } from "@/lib/assets";
import { isTodo } from "@/lib/todo";
import { ContactForm } from "@/components/contact/ContactForm";
import { EmailCopy } from "@/components/contact/EmailCopy";
import { CtaZone } from "@/components/contact/CtaZone";
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

        <div className={styles.cta}>
          <Reveal className={styles.ctaText}>
            <h3 className={styles.ctaTitle}>{closing.ctaTitle}</h3>
            <p className={styles.ctaBody}>{closing.ctaBody}</p>
            <dl className={styles.channels}>
              <div>
                <dt className="meta">{c.ui.contact.emailLabel}</dt>
                <dd>
                  {email ? (
                    <EmailCopy email={email} subject={c.ui.contact.subject} copy={c.ui.contact.copy} copied={c.ui.contact.copied} />
                  ) : (
                    <Todo value={person.email} />
                  )}
                </dd>
              </div>
              {person.links.map((l) => (
                <div key={l.href}>
                  <dt className="meta">{l.label}</dt>
                  <dd>
                    <a className="link" href={l.href} target="_blank" rel="noreferrer">
                      {l.label === "GitHub" && <BrandIcon name="github" size={14} />} {l.href.replace(/^https:\/\/(www\.)?/, "").replace(/\/$/, "").slice(0, 40)}
                      <ArrowUpRight size={14} aria-hidden />
                    </a>
                  </dd>
                </div>
              ))}
              {hasCv ? (
                <div>
                  <dt className="meta">CV</dt>
                  <dd>
                    <a className="link" href={cvPath} download>
                      <Download size={14} aria-hidden /> {closing.cvLabel}
                    </a>
                  </dd>
                </div>
              ) : (
                <Todo value={person.cv || "TODO(nacho): CV"} />
              )}
            </dl>
          </Reveal>
          <CtaZone className={styles.inlineForm}>
            <h3 className="sr-only">{c.ui.contact.title}</h3>
            <ContactForm ui={c.ui.contact} email={email} />
          </CtaZone>
        </div>

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
