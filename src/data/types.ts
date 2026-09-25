/* Shared shapes for media referenced from /public. Every alt comes in both languages. */
export type Alt = { es: string; en: string };

export type Image = {
  /** Path inside /public, e.g. "/proyectos/sima/pantalla-01.jpg" */
  src: string;
  alt: Alt;
  width: number;
  height: number;
};

export type Video = {
  src: string; // MP4 (H.264)
  poster: string; // JPG shown before playing
  alt: Alt; // what the video shows
  /**
   * "decorative": short, muted, loops, plays inline, pauses off-screen and with reduced motion.
   * "audio": has sound → controls, never autoplays.
   */
  kind: "decorative" | "audio";
  width: number;
  height: number;
};

export type Pdf = {
  src: string;
  /** 3–4 pages exported as images, shown as a preview. */
  pages: Image[];
  label: Alt; // e.g. { es: "Descargar manual", en: "Download manual" }
  /** Size in MB, shown next to the button. */
  sizeMb: number;
};
