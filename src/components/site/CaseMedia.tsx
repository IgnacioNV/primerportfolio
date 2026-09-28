import Image from "next/image";
import { Download, ExternalLink } from "lucide-react";
import type { Locale } from "@/content";
import type { ProjectMedia } from "@/data/proyectos";
import { publicExists } from "@/lib/assets";
import { MediaVideo } from "@/components/ui/MediaVideo";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./CasePage.module.css";

/**
 * Gallery, video and brand manual of a case — only files that exist are shown.
 * `part` splits them around the text: "first" is the lead piece (video, else the
 * first image, else the manual) and "rest" is everything after it.
 */
export function CaseMedia({ media, locale, part = "all" }: { media: ProjectMedia | undefined; locale: Locale; part?: "all" | "first" | "rest" }) {
  if (!media) return null;
  let gallery = media.gallery.filter((g) => publicExists(g.src));
  let video = media.video && publicExists(media.video.src) ? media.video : null;
  let manual = media.manual && publicExists(media.manual.src) ? media.manual : null;
  const lead = video ? "video" : gallery.length ? "gallery" : manual ? "manual" : null;
  if (part === "first") {
    if (lead !== "video") video = null;
    gallery = lead === "gallery" ? gallery.slice(0, 1) : [];
    if (lead !== "manual") manual = null;
  } else if (part === "rest") {
    if (lead === "video") video = null;
    if (lead === "gallery") gallery = gallery.slice(1);
    if (lead === "manual") manual = null;
  }
  if (!gallery.length && !video && !manual) return null;
  const manualPages = manual ? manual.pages.filter((p) => publicExists(p.src)) : [];

  return (
    <div className={styles.media}>
      {video && (
        <Reveal className={styles.mediaVideo}>
          <MediaVideo video={video} alt={video.alt[locale]} className={styles.videoEl} />
        </Reveal>
      )}

      {gallery.length > 0 && (
        <ul className={styles.gallery}>
          {gallery.map((g) => (
            <Reveal as="li" key={g.src}>
              <Image src={g.src} alt={g.alt[locale]} width={g.width} height={g.height} sizes="(min-width: 900px) 50vw, 100vw" />
            </Reveal>
          ))}
        </ul>
      )}

      {manual && (
        <Reveal className={styles.manual}>
          <ul className={`${styles.manualPages} ${manualPages.length === 1 ? styles.manualSingle : ""}`}>
            {manualPages.map((p) => (
              <li key={p.src}>
                {/* The preview opens the full PDF in the browser's own viewer. */}
                <a href={manual.src} target="_blank" rel="noopener" className={styles.manualPage} aria-label={`${p.alt[locale]} — ${manual.open[locale]}`}>
                  <Image src={p.src} alt="" width={p.width} height={p.height} sizes="(min-width: 900px) 60vw, 100vw" />
                  <span className={`meta ${styles.manualOpen}`} aria-hidden>
                    <ExternalLink size={14} /> {manual.open[locale]}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <a className="btn btn-ghost" href={manual.src} download>
            <Download size={16} aria-hidden /> {manual.label[locale]} <span className="meta">PDF · {manual.sizeMb} MB</span>
          </a>
        </Reveal>
      )}
    </div>
  );
}
