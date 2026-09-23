import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getContent, getProject } from "@/content";
import { Header } from "@/components/Header";
import { Reveal } from "@/components/Reveal";
import { ImageSlot, Text } from "@/components/Text";
import styles from "./case.module.css";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getContent("en").work.projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  return p ? { title: p.name, description: p.line } : {};
}

/*
 * A case study is a story in a fixed order:
 * the question → the context → what I did → why it matters → the chapters.
 * Everything not written yet shows as a placeholder.
 */
export default async function CasePage({ params }: Params) {
  const { slug } = await params;
  const c = getContent("en");
  const project = getProject(slug);
  if (!project) notFound();

  const all = c.work.projects;
  const i = all.findIndex((p) => p.slug === slug);
  const next = all[(i + 1) % all.length];

  return (
    <>
      <Header
        name={c.person.name}
        city={c.person.city}
        timezone={c.person.timezone}
        tint={{ bg: project.color, fg: project.ink }}
      />

      <main className={styles.case} style={{ ["--pc" as string]: project.color, ["--pi" as string]: project.ink }}>
        <header className={styles.hero}>
          <Link href="/#make" className={`mono ${styles.back}`}>
            ← All work
          </Link>
          <div className={styles.heroBody}>
            <p className="mono">
              {String(i + 1).padStart(2, "0")} / {String(all.length).padStart(2, "0")}
              {project.aka && <> — {project.aka}</>}
            </p>
            <h1 className={styles.name}>{project.name}</h1>
            <p className={styles.line}>
              <Text>{project.line}</Text>
            </p>
          </div>
          <dl className={styles.meta}>
            <div>
              <dt className="mono">Year</dt>
              <dd>
                <Text>{project.year}</Text>
              </dd>
            </div>
            <div>
              <dt className="mono">Role</dt>
              <dd>
                {project.role.map((r, k) => (
                  <span key={r}>
                    <Text>{r}</Text>
                    {k < project.role.length - 1 && ", "}
                  </span>
                ))}
              </dd>
            </div>
            {project.with && (
              <div>
                <dt className="mono">With</dt>
                <dd>
                  <Text>{project.with}</Text>
                </dd>
              </div>
            )}
            <div>
              <dt className="mono">Territories</dt>
              <dd>{project.axes.map((a) => c.work.axes[a]).join(" · ")}</dd>
            </div>
          </dl>
        </header>

        <section className={styles.question}>
          <p className="mono">The question</p>
          <Reveal as="h2" className={styles.questionText}>
            <Text>{project.question}</Text>
          </Reveal>
        </section>

        <section className={styles.grid}>
          <Reveal className={styles.block}>
            <h3 className="mono">Context</h3>
            {project.context.map((t) => (
              <p key={t}>
                <Text>{t}</Text>
              </p>
            ))}
          </Reveal>
          <Reveal className={styles.block} delay={80}>
            <h3 className="mono">What I did</h3>
            {project.whatIDid.map((t) => (
              <p key={t}>
                <Text>{t}</Text>
              </p>
            ))}
          </Reveal>
        </section>

        <section className={styles.visual}>
          {project.logo ? (
            <figure className={styles.logo}>
              <Image src={project.logo} alt={`${project.name} logo`} sizes="(min-width: 900px) 60vw, 100vw" />
            </figure>
          ) : (
            <ImageSlot label="[PROJECT IMAGE — logo or key visual]" />
          )}
        </section>

        <section className={styles.why}>
          <p className="mono">Why it matters to me</p>
          <Reveal as="p" className={styles.whyText}>
            <Text>{project.whyItMatters}</Text>
          </Reveal>
        </section>

        <section className={styles.chapters}>
          {project.chapters.map((ch, k) => (
            <Reveal as="article" key={ch.title} className={styles.chapter}>
              <span className={`mono ${styles.chNum}`}>{String(k + 1).padStart(2, "0")}</span>
              <div>
                <h3 className={styles.chTitle}>{ch.title}</h3>
                <p>
                  <Text>{ch.body}</Text>
                </p>
              </div>
              <ImageSlot />
            </Reveal>
          ))}
        </section>

        <Link href={`/work/${next.slug}`} className={styles.next} style={{ ["--nc" as string]: next.color, ["--ni" as string]: next.ink }}>
          <span className="mono">Next project</span>
          <span className={styles.nextName}>{next.name} →</span>
        </Link>
      </main>
    </>
  );
}
