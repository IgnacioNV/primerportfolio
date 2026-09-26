/*
 * Pieces for the "Trayectoria" gallery, by timeline id (see `timeline` in es.ts / en.ts).
 * No entry = a typographic piece (the year, framed). `logo` = shown on the mat, not cropped.
 * Alts come from each item's title.
 */
export type Piece = { src: string; width: number; height: number; logo?: boolean };

export const trayectoria: Record<string, Piece> = {
  udesa: { src: "/logos/udesa.svg", width: 265, height: 60, logo: true },
  "gran-rex": { src: "/fotos/gran-rex.jpg", width: 1179, height: 937 },
  clayss: { src: "/proyectos/sima/clayss-panel.jpg", width: 1620, height: 1080 },
  stem: { src: "/trayectoria/stem-award.jpg", width: 1600, height: 900 },
  panama: { src: "/fotos/panama.jpg", width: 1200, height: 1600 },
  "clases-ux": { src: "/fotos/clase-ux.jpg", width: 1204, height: 1600 },
  ort: { src: "/logos/ort.png", width: 206, height: 121, logo: true },
  ciudad: { src: "/fotos/voley-01.jpg", width: 599, height: 362 },
};
