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
  sima: {
    gallery: [
      {
        src: "/proyectos/sima/pantalla-login.png",
        alt: { es: "Pantalla de ingreso de SIMA, con el aviso de que falta la contraseña", en: "SIMA sign-in screen, warning that the password is missing" },
        width: 1920,
        height: 1080,
      },
      {
        src: "/proyectos/sima/pantalla-pacientes.png",
        alt: { es: "Pantalla de pacientes de SIMA, con sus registros y los registros pendientes", en: "SIMA patients screen, with their records and pending records" },
        width: 1920,
        height: 1080,
      },
      {
        src: "/proyectos/sima/pantalla-analisis.png",
        alt: { es: "Registro de un análisis en SIMA, con un resultado de 83%", en: "An analysis record in SIMA, showing a result of 83%" },
        width: 1920,
        height: 1080,
      },
      {
        src: "/proyectos/sima/pantalla-analisis-detalle.png",
        alt: { es: "Registro de un análisis en SIMA con el panel de detalle abierto", en: "An analysis record in SIMA with the detail panel open" },
        width: 1920,
        height: 1080,
      },
      {
        src: "/proyectos/sima/clayss-presentando.jpg",
        alt: { es: "Ignacio presentando SIMA con micrófono en el seminario de CLAYSS, en la UCA", en: "Ignacio presenting SIMA with a microphone at the CLAYSS seminar, at UCA" },
        width: 1620,
        height: 1080,
      },
      {
        src: "/proyectos/sima/clayss-equipo.jpg",
        alt: { es: "El equipo de SIMA en el escenario del Auditorio San Agustín", en: "The SIMA team on stage at the San Agustín Auditorium" },
        width: 1620,
        height: 1080,
      },
      {
        src: "/proyectos/sima/clayss-auditorio.jpg",
        alt: { es: "El público del seminario frente al escenario donde presentamos SIMA", en: "The seminar audience in front of the stage where we presented SIMA" },
        width: 1620,
        height: 1080,
      },
      {
        src: "/proyectos/sima/clayss-panel.jpg",
        alt: { es: "El equipo de SIMA junto a la mesa del panel, bajo el cartel de la Pontificia Universidad Católica Argentina", en: "The SIMA team next to the panel table, under the Pontificia Universidad Católica Argentina sign" },
        width: 1620,
        height: 1080,
      },
      {
        src: "/proyectos/sima/clayss-entrevista.jpg",
        alt: { es: "Ignacio respondiendo una entrevista sobre SIMA después de la presentación", en: "Ignacio answering an interview about SIMA after the presentation" },
        width: 1080,
        height: 1620,
      },
    ],
  },
  inspira: { gallery: [] },
  trevian: {
    gallery: [
      {
        src: "/proyectos/trevian/mapa-presion.jpg",
        alt: { es: "Una notebook mostrando el mapa de presión de la pisada", en: "A laptop showing the foot pressure map" },
        width: 1500,
        height: 2000,
      },
      {
        src: "/proyectos/trevian/mapa-presion-detalle.jpg",
        alt: { es: "Detalle del mapa de presión de la pisada en la pantalla", en: "Close-up of the foot pressure map on screen" },
        width: 1500,
        height: 2000,
      },
      {
        src: "/proyectos/trevian/equipo.jpg",
        alt: { es: "El equipo de Trevian alrededor de la notebook", en: "The Trevian team around the laptop" },
        width: 2000,
        height: 1500,
      },
      {
        src: "/proyectos/trevian/splash.jpg",
        alt: { es: "Pantalla de inicio de la app de Trevian, con el isotipo verde sobre azul oscuro", en: "Trevian app splash screen, with the green symbol on dark blue" },
        width: 1179,
        height: 2191,
      },
    ],
  },
  nihol: { gallery: [] },
  "study-buddy": { gallery: [] },
  freshal: {
    gallery: [],
    manual: {
      src: "/proyectos/freshal/freshal-manual-de-marca.pdf",
      pages: [
        {
          src: "/proyectos/freshal/manual-01.jpg",
          alt: {
            es: "Portada del manual de marca de Freshal: el logo en naranja, el slogan «Sabor que nace. Sabor que cuida.» y dos hojas verdes",
            en: "Cover of the Freshal brand manual: the orange logo, the slogan “Sabor que nace. Sabor que cuida.” and two green leaves",
          },
          width: 1920,
          height: 1080,
        },
      ],
      label: { es: "Descargar el manual completo", en: "Download the full manual" },
      open: { es: "Ver el manual completo", en: "View the full manual" },
      sizeMb: 3.6,
    },
  },
};
