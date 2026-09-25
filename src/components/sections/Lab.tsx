import type { SiteContent } from "@/content";
import { SectionHead } from "@/components/ui/SectionHead";
import { LabBoard, type LabMedia } from "./LabBoard";
import { laboratorio } from "@/data/laboratorio";
import { publicExists } from "@/lib/assets";

/** Dark on purpose: finished work lives on paper, experiments on the workbench. */
export function Lab({ c, index }: { c: SiteContent; index: number }) {
  // Only media that exists on disk reaches the (client) board.
  const media: Record<string, LabMedia> = {};
  for (const [id, m] of Object.entries(laboratorio)) {
    const locale = c.locale;
    if (m.image && publicExists(m.image.src)) media[id] = { image: { ...m.image, altText: m.image.alt[locale] } };
    else if (m.video && publicExists(m.video.src)) media[id] = { video: m.video, videoAlt: m.video.alt[locale] };
  }
  const nav = c.nav.find((n) => n.id === "laboratorio")!;
  return (
    <section id="laboratorio" className="section night">
      <div className="section-inner">
        <SectionHead index={index} creative={nav.creative} label={nav.label} title={c.lab.title} lede={c.lab.lede} />
        <LabBoard lab={c.lab} allLabel={c.ui.filterAll} groupLabel={c.ui.filterLabel} media={media} />
      </div>
    </section>
  );
}
