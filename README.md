# primerportfolio — v1

Portfolio personal de Ignacio Nuñez Valcarce. Next.js 16 + React 19 + TypeScript + CSS Modules.
No hay otras dependencias: ni Tailwind ni librerías de animación. Todo el movimiento es CSS más un poco de JS propio.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## La idea

El portfolio no muestra proyectos solamente: es un proyecto en sí. El concepto central es **mirar debajo de la superficie**.

- **00 Look.** Una lente sigue al cursor. En la superficie dice *"This is a button."* y debajo dice *"This is a decision."*. Es la tesis del sitio en un solo gesto: diseñar es mirar qué hay debajo de la interfaz. Con un clic cambia el par (logo → memory, feed → habit, form → doubt…). Si nadie la mueve, la lente recorre sola la palabra que cambia.
- **01 Think.** Las preguntas que te hacés, cada una conectada con el proyecto donde intentaste responderla. Abajo está el video del World ORT STEM Award como ejemplo concreto de cómo pensás.
- **02 Make.** Cinco proyectos. Arriba hay un mapa con cinco territorios (Design · Technology · Business · AI · People). Al pasar por un proyecto (o scrollear hasta él en mobile) se prenden los territorios que toca. Juntos cubren todo el mapa: el perfil híbrido se ve, no hace falta decirlo.
- **03 Try.** El laboratorio, en fondo oscuro a propósito: el trabajo terminado vive sobre papel y los experimentos en el banco de trabajo. Tiene filtros por tipo de curiosidad.
- **04 Trace.** Dos recorridos en paralelo: escuela y trabajo por un lado, y por otro vóley, guitarra y fotografía. Debajo, un diagrama de herramientas sobre *idea → prototype → product*.
- **05 Next.** Las etiquetas (UX Designer, PM, Founder…) se tachan una por una y la sección termina en *"I'd rather pick problems."*.

La navegación también es el proceso: look → think → make → try → trace → next.

**Sistema visual:** papel e tinta, más un solo azul de anotación, como la birome que corrige un borrador. El azul solo aparece en lo que "mira debajo": la lente, los estados activos, los links y los placeholders. Tipografías: Instrument Sans, Instrument Serif (para las preguntas y los pensamientos) y JetBrains Mono (para las anotaciones).

## Cómo editar

**Todo el texto está en [`src/content/en.ts`](src/content/en.ts).** No hace falta tocar componentes para cambiar contenido.

- Lo que está escrito `[ASÍ]` aparece en la página como una etiqueta azul. Son los placeholders que tenés que completar.
- Para agregar un proyecto, sumá un objeto a `work.projects`. Su case study se genera solo en `/work/<slug>`.
- Para agregar un experimento, sumá un objeto a `lab.entries`.
- Las imágenes van en `src/assets/img/` y se importan arriba de `en.ts`.

### Español

La estructura ya lo soporta. Hay que copiar `en.ts` a `es.ts`, traducirlo y registrarlo en [`src/content/index.ts`](src/content/index.ts). Después falta la ruta `/es` y conectar el toggle EN/ES del header, que hoy muestra "Pronto".

## Estructura

```
src/
  app/
    page.tsx               home (orden de secciones)
    work/[slug]/page.tsx   case study
    globals.css            tokens + tipografía compartida
  components/              una sección = un componente + su .module.css
  content/
    types.ts               la forma del contenido
    en.ts                  el contenido
    index.ts               getContent(locale)
  assets/img/
```

## Pendiente (placeholders)

- Email de contacto
- Link al video del STEM Award
- Pregunta disparadora de SIMA, NIHOL y Study Buddy
- Año de NIHOL y de ORT London (y qué fue ORT London)
- Case studies completos: proceso, imágenes, aprendizajes
- Estado de cada experimento del lab
- Selección de fotos propias
