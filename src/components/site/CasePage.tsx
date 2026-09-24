import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { getContent, getProject, routes, type Locale } from "@/content";
import { CtaButton } from "@/components/contact/CtaButton";
import { FloatingCta } from "@/components/contact/FloatingCta";
import { Reveal } from "@/components/ui/Reveal";
import { plain } from "@/components/ui/RichText";
import { Maybe, Todo } from "@/components/ui/Todo";
import { isTodo, showTodos } from "@/lib/todo";
import { Nav } from "./Nav";
import styles from "./CasePage.module.css";

/*
 * Case template, always in this order:
 * problem → my role → process (with the question that guided it) → outcome → what I learned
 * → next project → Let's talk. Blocks with nothing real yet disappear in production.
 */
function Block({ label, items, num }: { label: string; items: string[]; num: string }) {
  const real = items.filter((t) => !isTodo(t));
  if (!real.length && !showTodos) return null;
  return (
    <Reveal as="section" className={styles.block}>
      <h2 className={`meta ${styles.blockLabel}`}>
        <span>{num}</span> {label}
      </h2>
      <div className={styles.blockBody}>
        {items.map((t, i) => (isTodo(t) ? <Todo key={i} value={t} /> : <p key={i}>{t}</p>))}
      </div>
    </Reveal>
  );
}

export function CasePage({ locale, slug }: { locale: Locale; slug: string }) {
  const c = getContent(locale);
  const p = getProject(slug, locale);
  if (!p) notFound();

  const other: Locale = locale === "es" ? "en" : "es";
  const all = c.projects.list;
  const i = all.findIndex((x) => x.slug === slug);
  const next = all[(i + 1) % all.length];
  const L = c.ui.caseLabels;
  const role = p.role.filter((r) => !isTodo(r)).join(", ");
  const question = p.case.question !== undefined ? c.thinking.questions[p.case.question]?.q : undefined;

  return (
    <>
      <Nav
        locale={locale}
        homeHref={routes.home(locale)}
        altHref={routes.project(other, slug)}
        name={c.person.name}
        ui={c.ui}
        items={[]}
        tint={{ bg: p.color, fg: p.ink }}
      />

      <main id="contenido" className={styles.case}>
        <header className={styles.hero} style={{ ["--pc" as string]: p.color, ["--pi" as string]: p.ink }}>
          <Link href={`${routes.home(locale)}#proyectos`} className={`meta ${styles.back}`}>
            <ArrowLeft size={14} aria-hidden /> {c.ui.backToProjects}
          </Link>
          <div className={styles.heroBody}>
            {p.aka && <p className="meta">{p.aka}</p>}
            <h1 className={styles.name}>{p.name}</h1>
            <p className={styles.line}>{plain(p.problem)}</p>
          </div>
          <dl className={styles.meta}>
            {(showTodos || !isTodo(p.year)) && (
              <div>
                <dt className="meta">{L.year}</dt>
                <dd>
                  <Maybe value={p.year} />
                </dd>
              </div>
            )}
            {(showTodos || role) && (
              <div>
                <dt className="meta">{L.role}</dt>
                <dd>{role || <Todo value={p.role.join(" ")} />}</dd>
              </div>
            )}
            {p.facts?.map((f) => (
              <div key={f.label}>
                <dt className="meta">{f.label}</dt>
                <dd>
                  <Maybe value={f.value} />
                </dd>
              </div>
            ))}
            {p.with && (
              <div>
                <dt className="meta">{L.with}</dt>
                <dd>{p.with}</dd>
              </div>
            )}
          </dl>
        </header>

        {p.logo && (
          <figure className={styles.logo} style={{ background: p.mediaBg }}>
            <Image src={p.logo} alt={`${p.name} — logo`} sizes="(min-width: 900px) 50vw, 90vw" />
          </figure>
        )}

        <div className={styles.blocks}>
          <Block num="01" label={L.problem} items={p.case.problem} />
          <Block num="02" label={L.role} items={p.case.role} />

          {question && (
            <Reveal as="aside" className={styles.question}>
              <p className="meta">{L.question}</p>
              <p className={styles.questionText}>
                <Link href={`${routes.home(locale)}#pienso`}>{question}</Link>
              </p>
            </Reveal>
          )}

          <Block num="03" label={L.process} items={p.case.process} />
          <Block num="04" label={L.result} items={p.case.result} />
          <Block num="05" label={L.learned} items={p.case.learned} />
        </div>

        <Reveal className={styles.cta}>
          <p className={styles.ctaText}>{c.projects.ctaLine}</p>
          <CtaButton label={c.ui.cta} aria={c.ui.ctaAria} />
        </Reveal>

        <Link
          href={routes.project(locale, next.slug)}
          className={styles.next}
          style={{ ["--nc" as string]: next.color, ["--ni" as string]: next.ink }}
        >
          <span className="meta">{c.ui.nextProject}</span>
          <span className={styles.nextName}>
            {next.name} <ArrowRight aria-hidden />
          </span>
        </Link>
      </main>

      <FloatingCta label={c.ui.cta} aria={c.ui.ctaAria} hasHero={false} />
    </>
  );
}
