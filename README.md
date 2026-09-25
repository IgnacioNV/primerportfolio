# primerportfolio — v4

Portfolio de Ignacio Nuñez Valcarce. Next.js 16 · React 19 · TypeScript · CSS Modules · Lucide.

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

## Chequeo de letras cortadas

```bash
npm run dev
node scripts/text-check.mjs text-check    # capturas + hojas de contacto en ./text-check
```

## Formulario de contacto (Resend)

Todos los "Charlemos" abren el mismo formulario, que envía a `POST /api/contact`. En **Vercel → Project → Settings → Environment Variables** configurá:

| Variable | Valor |
|---|---|
| `RESEND_API_KEY` | API key de [resend.com](https://resend.com) (plan gratis: 3.000 mails/mes) |
| `CONTACT_TO_EMAIL` | Donde te llegan los mensajes. Sin dominio verificado en Resend tiene que ser el mail de tu cuenta de Resend. |
| `CONTACT_FROM_EMAIL` | Opcional. Por ejemplo `Portfolio <hola@tudominio.com>`, una vez que verifiques un dominio. |
| `NEXT_PUBLIC_SITE_URL` | Opcional. El dominio final, para canonical, hreflang y OG. |

Después de guardarlas, hacé *Redeploy*. El mail llega con **reply-to** de quien escribió, así que respondés directo.

- En local, sin esas variables, el mensaje se imprime en la consola en lugar de enviarse.
- **Antispam:** campo honeypot, tiempo mínimo de llenado y límite de 5 envíos cada 10 minutos por IP. El límite vive en memoria, así que en serverless es por instancia.

## Idiomas

- Español (default): `/`, `/proyectos/[slug]`
- Inglés: `/en`, `/en/projects/[slug]`

Son dos *route groups* (`app/(es)` y `app/(en)`), cada uno con su layout raíz, así que `<html lang>`, title, description y OG salen en el idioma correcto. No hay librería de i18n.

## Dónde se edita cada cosa

| Qué | Archivo |
|---|---|
| Todo el texto en español | `src/content/es.ts` |
| Todo el texto en inglés | `src/content/en.ts` |
| "Ahora mismo" (leyendo / escuchando / construyendo) | `src/content/now.ts` |
| Colores y logos de proyectos | `src/content/shared.ts` |
| Fotos del hero (foto + trabajo debajo) | `src/data/hero.ts` |
| Galería, video y manual de cada caso | `src/data/proyectos.ts` → archivos en `public/proyectos/<slug>/` |
| Imágenes o videos del Laboratorio | `src/data/laboratorio.ts` → `public/laboratorio/` |
| Galería "Fotos que saqué" | `src/data/fotos.ts` (aparece con 6 o más) |
| Fotos | `public/fotos/` (ver su README con los nombres esperados) |
| Logos de formación (SVG oficiales) | `public/logos/udesa.svg`, `public/logos/ort.svg` |
| CV | `public/cv/cv-ignacio-nunez-valcarce.pdf` |
| Tokens (color, tipografía, espaciado) | `src/app/globals.css` |

## TODO(nacho)

Todo lo que falta está escrito como `"TODO(nacho): …"`:

```bash
grep -rn "TODO(nacho)" src public
```

- **En desarrollo** se ve como una etiqueta amarilla rayada.
- **En producción** esos textos se vacían antes de llegar a los componentes: no se renderizan ni viajan en el HTML.
- Una foto, un logo o el CV que todavía no existe en `/public` tampoco se muestra.

## Palabras clave

En el contenido, `[[liderazgo:capitán]]` convierte "capitán" en la palabra clave `liderazgo`. La evidencia del tooltip está en `keywords` de cada idioma. Cada palabra tiene que aparecer marcada **una sola vez**. El contador guarda el progreso en `sessionStorage`.

## Estructura

```
src/
  app/(es)/…  app/(en)/en/…   rutas por idioma
  components/
    hero/        Hero aislado + LensVisual (reemplazable por el desktop-hero)
    contact/     Modal "Charlemos", botón CTA, botón flotante mobile
    keywords/    Palabra clave, contador, store
    sections/    Proyectos, Cómo pienso, Laboratorio, Quién soy, Cierre
    site/        Nav, HomePage, CasePage, RootDocument
    ui/          Reveal, SplitTitle, CountUp, RichText, Todo, BrandIcon
  content/       es.ts, en.ts, now.ts, shared.ts, types.ts
  lib/           todo.ts, assets.ts, metadata.ts
```

## Reemplazar el hero

`<Hero visual={…} />` recibe el visual como prop. Para el desktop-hero, cambiá `visual={<LensVisual … />}` en `components/site/HomePage.tsx`; el nombre, la línea, las pruebas y el CTA no se tocan.

## Decisiones

- **Sin Framer Motion.** Los reveals, contadores, subrayados y títulos por palabra usan IntersectionObserver y `transform`/`opacity`.
- **Charlemos abre un modal, no un `mailto:`.** Mucha gente usa webmail y ahí `mailto:` no hace nada. El modal permite copiar el mail, abrir el cliente de correo con el asunto "Hola Nacho —" o ir a LinkedIn.
- **Íconos.** Las acciones usan Lucide. Las herramientas usan trazos de Simple Icons (CC0) copiados en `BrandIcon.tsx`, así no se suma una segunda librería.
- **El azul `#2A36FF`** se usa solo en CTAs, links, estados interactivos y palabras clave. En la sección oscura se usa un tinte más claro para cumplir el contraste AA.
- **`prefers-reduced-motion`:** apaga los desplazamientos, los resaltados aparecen ya pintados y los números muestran el valor final.
