import type { SiteContent } from "@/content";
import { SectionHead } from "@/components/ui/SectionHead";
import { LabBoard } from "./LabBoard";

/** Dark on purpose: finished work lives on paper, experiments on the workbench. */
export function Lab({ c, index }: { c: SiteContent; index: number }) {
  const nav = c.nav.find((n) => n.id === "laboratorio")!;
  return (
    <section id="laboratorio" className="section night">
      <div className="section-inner">
        <SectionHead index={index} creative={nav.creative} label={nav.label} title={c.lab.title} lede={c.lab.lede} />
        <LabBoard lab={c.lab} allLabel={c.ui.filterAll} groupLabel={c.ui.filterLabel} />
      </div>
    </section>
  );
}
