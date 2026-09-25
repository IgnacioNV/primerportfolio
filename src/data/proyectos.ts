import type { Image, Pdf, Video } from "./types";

/*
 * Media for each project's case page. Add files under /public/proyectos/<slug>/
 * and list them here; empty lists render nothing.
 */
export type ProjectMedia = {
  gallery: Image[];
  video?: Video;
  manual?: Pdf;
};

export const proyectos: Record<string, ProjectMedia> = {
  sima: { gallery: [] },
  inspira: { gallery: [] },
  trevian: { gallery: [] },
  nihol: { gallery: [] },
  "study-buddy": { gallery: [] },
};
