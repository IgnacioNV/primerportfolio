# /public — dónde va cada archivo

| Carpeta | Qué va | Se referencia en |
|---|---|---|
| `fotos/` | Fotos tuyas: hero, trabajando, vóley, guitarra, galería | `src/data/hero.ts`, `src/data/fotos.ts`, contenido de Quién soy |
| `proyectos/<slug>/` | Imágenes, videos y manuales de cada proyecto (`sima`, `inspira`, `trevian`, `nihol`, `study-buddy`) | `src/data/proyectos.ts` |
| `laboratorio/` | Imágenes o videos cortos de los experimentos | `src/data/laboratorio.ts` |
| `videos/` | Videos que no son de un proyecto (por ejemplo el del premio STEM) | `src/data/proyectos.ts` o donde corresponda |
| `docs/` | PDFs generales (CV, etc.) | `src/content/*.ts` |
| `logos/` | Logos de instituciones (solo Formación) | `src/content/*.ts` |

Sumar contenido = copiar el archivo acá y agregar una entrada en el archivo de datos. No hace falta tocar componentes.

- **Imágenes:** JPG o PNG de buena resolución. Next las sirve en AVIF/WebP con el tamaño justo.
- **Videos:** MP4 (H.264) comprimido + un `poster` (JPG).
- **PDF:** además del archivo, 3 o 4 páginas exportadas como imágenes para la vista previa.
