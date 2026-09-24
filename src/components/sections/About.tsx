import Image from "next/image";
import type { Locale, Photo, SiteContent } from "@/content";
import { now } from "@/content/now";
import { fotos, MIN_FOTOS } from "@/data/fotos";
import { publicExists } from "@/lib/assets";
import { isTodo, showTodos } from "@/lib/todo";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/RichText";
import { Maybe, Todo } from "@/components/ui/Todo";
import { CountUp } from "@/components/ui/CountUp";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { Gallery } from "./Gallery";
import styles from "./About.module.css";

/** Photos that exist are shown; missing ones become a TODO slot in dev and vanish in prod. */
function PhotoSlot({ photo, exists, className = "" }: { photo: Photo; exists: boolean; className?: string }) {
  if (!exists) {
    return showTodos ? (
      <div className={`${styles.slot} ${className}`}>
        <Todo value={`TODO(nacho): ${photo.src}`} />
      </div>
    ) : null;
  }
  return (
    <figure className={`${styles.photo} ${className}`}>
      <div className={styles.photoImg}>
        <Image src={photo.src} alt={isTodo(photo.alt) ? "" : photo.alt} fill sizes="(min-width: 900px) 33vw, 90vw" />
      </div>
      {photo.caption && !isTodo(photo.caption) && <figcaption className="meta">{photo.caption}</figcaption>}
    </figure>
  );
}

export function About({ locale, c, index }: { locale: Locale; c: SiteContent; index: number }) {
  const nav = c.nav.find((n) => n.id === "quien-soy")!;
  const a = c.about;
  const n = now[locale];
  const numberLocale = locale === "es" ? "es-AR" : "en-US";
  const gallery: Photo[] = fotos.filter((f) => publicExists(f.src)).map((f) => ({ src: f.src, alt: f.alt[locale] }));
  const showGallery = gallery.length >= MIN_FOTOS;
  const nowItems = (["reading", "listening", "building"] as const).filter((k) => showTodos || !isTodo(n[k]));

  return (
    <section id="quien-soy" className="section">
      <div className="section-inner">
        <SectionHead index={index} creative={nav.creative} label={nav.label} title={a.title} lede={a.lede} />

        {/* Story + portrait */}
        <div className={styles.intro}>
          <div className={styles.story}>
            {a.story.map((p, i) => (
              <Reveal as="p" key={i} delay={i * 60}>
                <RichText>{p}</RichText>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <PhotoSlot photo={a.portrait} exists={publicExists(a.portrait.src)} className={styles.portrait} />
          </Reveal>
        </div>

        {/* Numbers that count */}
        <ul className={styles.stats}>
          {a.stats.map((s) => (
            <li key={s.label}>
              <span className={styles.statValue}>
                <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} locale={numberLocale} />
              </span>
              <span className={styles.statLabel}>{s.label}</span>
            </li>
          ))}
        </ul>

        {/* Photos of me */}
        <div className={styles.photos}>
          {a.photos.map((p) => (
            <PhotoSlot key={p.src} photo={p} exists={publicExists(p.src)} />
          ))}
        </div>

        {/* Path | Education, languages, right now */}
        <div className={styles.columns}>
          <div>
            <h3 className={`meta ${styles.colTitle}`}>{a.timelineTitle}</h3>
            <ol className={styles.timeline}>
              {a.timeline
                .filter((t) => showTodos || !isTodo(t.body) || !isTodo(t.when))
                .map((t) => (
                  <Reveal as="li" key={t.title}>
                    <span className={`meta ${styles.when}`}>
                      <Maybe value={t.when} />
                    </span>
                    <div>
                      <p className={styles.tTitle}>{t.title}</p>
                      <p className={styles.tBody}>
                        <Maybe value={t.body} />
                      </p>
                    </div>
                  </Reveal>
                ))}
            </ol>
          </div>

          <div className={styles.side}>
            <div>
              <h3 className={`meta ${styles.colTitle}`}>{a.educationTitle}</h3>
              <ul className={styles.edu}>
                {a.education.map((e) => {
                  const hasLogo = publicExists(e.logo);
                  return (
                    <li key={e.name} className={styles.eduItem}>
                      <div className={styles.eduLogo}>
                        {hasLogo ? (
                          // eslint-disable-next-line @next/next/no-img-element -- official SVG logos, no optimization needed
                          <img src={e.logo} alt={e.name} />
                        ) : (
                          <>
                            <span className={styles.eduFallback}>{e.name}</span>
                            <Todo value={`TODO(nacho): SVG oficial en ${e.logo}`} />
                          </>
                        )}
                        <span className={`meta ${styles.eduHover}`} aria-hidden>
                          {e.hover}
                        </span>
                      </div>
                      <p className={styles.eduText}>
                        <strong>{e.name}</strong>
                        <br />
                        {e.detail} · <Maybe value={e.years} />
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              <h3 className={`meta ${styles.colTitle}`}>{a.languagesTitle}</h3>
              <dl className={styles.langs}>
                {a.languages
                  .filter((l) => showTodos || !l.unconfirmed)
                  .map((l) => (
                    <div key={l.name}>
                      <dt>{l.name}</dt>
                      <dd>
                        <Maybe value={l.level} />
                      </dd>
                    </div>
                  ))}
              </dl>
            </div>

            {nowItems.length > 0 && (
              <div className={styles.now}>
                <h3 className={`meta ${styles.colTitle}`}>
                  <span className={styles.pulse} aria-hidden /> {a.nowTitle}
                </h3>
                <dl className={styles.langs}>
                  {nowItems.map((k) => (
                    <div key={k}>
                      <dt>{a.nowLabels[k]}</dt>
                      <dd>
                        <Maybe value={n[k]} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </div>

        {/* Tools across idea → prototype → product */}
        <div className={styles.tools}>
          <div className={styles.toolsHead}>
            <h3 className={styles.toolsTitle}>{a.toolsTitle}</h3>
            <p className={styles.toolsLede}>
              <RichText>{a.toolsLede}</RichText>
            </p>
          </div>
          <div className={styles.chart}>
            <div className={styles.stages} aria-hidden>
              {a.stages.map((s, i) => (
                <span key={s} className="meta">
                  {String(i + 1).padStart(2, "0")} {s}
                </span>
              ))}
            </div>
            <ul className={styles.toolRows}>
              {a.tools.map((t, i) => {
                const from = Math.min(...t.stages);
                const to = Math.max(...t.stages);
                return (
                  <Reveal
                    as="li"
                    key={t.name}
                    delay={i * 40}
                    className={styles.tool}
                    style={{ gridColumn: `${from + 1} / ${to + 2}`, gridRow: i + 1 }}
                  >
                    <BrandIcon name={t.icon} size={16} />
                    <span>{t.name}</span>
                    <span className="sr-only">: {t.stages.map((s) => a.stages[s]).join(", ")}</span>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>

        {/* My photography */}
        {(showGallery || showTodos) && (
          <div className={styles.gallery}>
            <div className={styles.toolsHead}>
              <h3 className={styles.toolsTitle}>{a.galleryTitle}</h3>
              <p className={styles.toolsLede}>
                {a.galleryLede}{" "}
                {!showGallery && <Todo value={`TODO(nacho): la galería necesita ${MIN_FOTOS} fotos en src/data/fotos.ts (hay ${gallery.length}); en producción está oculta`} />}
              </p>
            </div>
            <Gallery photos={gallery} ui={c.ui.lightbox} />
          </div>
        )}
      </div>
    </section>
  );
}
