import type { Image, Video } from "./types";

/* Media for Lab notes, by id (L-01 … L-07). Files go in /public/laboratorio/. */
export const laboratorio: Record<string, { image?: Image; video?: Video }> = {};
