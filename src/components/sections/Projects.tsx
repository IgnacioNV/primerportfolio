import type { Locale, SiteContent } from "@/content";
import { routes } from "@/content";
import { CtaButton } from "@/components/contact/CtaButton";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "./ProjectCard";
import styles from "./Projects.module.css";

type Props = { locale: Locale; c: SiteContent; index: number };

/** 5–30 seconds: is the work good? Three big, two smaller. Each card: role + problem + door to the case. */
export function Projects({ locale, c, index }: Props) {
  const nav = c.nav.find((n) => n.id === "proyectos")!;
  const featured = c.projects.list.filter((p) => p.tier !== "sm");
  const more = c.projects.list.filter((p) => p.tier === "sm");

  return (
    <section id="proyectos" className="section">
      <div className="section-inner">
        <SectionHead index={index} creative={nav.creative} label={nav.label} title={c.projects.title} lede={c.projects.lede} />

        <div className={styles.featured}>
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80} className={p.tier === "lg" ? styles.first : ""}>
              <ProjectCard project={p} href={routes.project(locale, p.slug)} seeCase={c.ui.seeCase} size={p.tier} index={i + 1} />
            </Reveal>
          ))}
        </div>

        <h3 className={`meta ${styles.moreTitle}`}>{c.projects.moreTitle}</h3>
        <div className={styles.more2}>
          {more.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80}>
              <ProjectCard project={p} href={routes.project(locale, p.slug)} seeCase={c.ui.seeCase} size="sm" index={featured.length + i + 1} />
            </Reveal>
          ))}
        </div>

        <Reveal className={styles.ctaRow}>
          <p>{c.projects.ctaLine}</p>
          <CtaButton label={c.ui.cta} aria={c.ui.ctaAria} />
        </Reveal>
      </div>
    </section>
  );
}
