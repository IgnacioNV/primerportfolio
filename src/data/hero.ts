import type { Alt } from "./types";

/*
 * Hero visual: my photo on top, work underneath (rotates).
 * Files that don't exist yet are simply not shown.
 */
export const hero: { portrait: { src: string; alt: Alt }; under: { src: string; alt: Alt }[] } = {
  portrait: {
    src: "/fotos/hero.jpg",
    alt: { es: "Retrato de Ignacio Nuñez Valcarce", en: "Portrait of Ignacio Nuñez Valcarce" },
  },
  under: [
    // { src: "/fotos/hero-debajo-1.jpg", alt: { es: "…", en: "…" } },
  ],
};
