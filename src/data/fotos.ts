/*
 * Galería "Fotos que saqué".
 * Para sumar una foto: copiala a /public/fotos/ y agregá una línea acá.
 * La galería se muestra recién cuando hay al menos MIN_FOTOS fotos que existen.
 */
export const MIN_FOTOS = 6;

export type Foto = {
  /** Ruta dentro de /public */
  src: string;
  alt: { es: string; en: string };
};

export const fotos: Foto[] = [
  {
    src: "/fotos/fotografia-01.jpg",
    alt: {
      es: "Una lancha cruzando el mar frente a una escollera de piedras, con casas sobre un acantilado",
      en: "A speedboat crossing the sea in front of a stone breakwater, with houses on a cliff",
    },
  },
  // { src: "/fotos/fotografia-02.jpg", alt: { es: "…", en: "…" } },
];
