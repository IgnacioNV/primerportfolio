import type { Alt } from "./types";

/*
 * Hero visual: my photo on top, work underneath (rotates).
 * Files that don't exist yet are simply not shown.
 */
export const hero: { portrait: { src: string; alt: Alt }; under: { src: string; alt: Alt }[] } = {
  portrait: {
    src: "/fotos/hero.jpg",
    alt: {
      es: "Ignacio presentando SIMA con micrófono en el Seminario Internacional de CLAYSS, en la UCA",
      en: "Ignacio presenting SIMA with a microphone at the CLAYSS International Seminar, at UCA",
    },
  },
  under: [
    // { src: "/fotos/hero-debajo-1.jpg", alt: { es: "…", en: "…" } },
  ],
};
