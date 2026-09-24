import type { SiteContent } from "./types";
import { projectAssets } from "./shared";

/*
 * ─────────────────────────────────────────────────────────────
 *  Todo el texto en español (idioma por defecto, ruta "/").
 *  Lo que empieza con "TODO(nacho):" falta completar: en desarrollo
 *  se ve marcado y en producción no se muestra.
 *  Palabras clave: [[id:texto visible]] — ver `keywords` abajo.
 * ─────────────────────────────────────────────────────────────
 */

export const es: SiteContent = {
  locale: "es",
  meta: {
    title: "Ignacio Nuñez Valcarce — Diseño de producto y marca",
    description:
      "Estudio Diseño en la UdeSA y trabajo en marca y producto digital en Inspira RRHH. Me interesa el problema detrás del problema, y construir lo que lo resuelve.",
    ogLocale: "es_AR",
  },

  ui: {
    cta: "Charlemos",
    ctaAria: "Charlemos: abrir datos de contacto",
    seeProjects: "Ver proyectos",
    seeCase: "Ver caso",
    backToProjects: "Todos los proyectos",
    nextProject: "Siguiente proyecto",
    skipToContent: "Saltar al contenido",
    menu: "Menú",
    close: "Cerrar",
    langName: "Español",
    langSwitch: "Read in English",
    caseLabels: {
      problem: "El problema",
      role: "Mi rol",
      process: "Proceso",
      question: "La pregunta que me guió",
      result: "Resultado",
      learned: "Qué aprendí",
      year: "Año",
      with: "Con",
    },
    contact: {
      title: "Charlemos.",
      body: "Proyectos, pasantías, una idea a medio cocinar o una pregunta. Respondo rápido.",
      copy: "Copiar mail",
      copied: "Copiado",
      write: "Escribirme",
      subject: "Hola Nacho —",
      noEmail: "Por ahora, la forma más rápida es LinkedIn.",
    },
    keywords: {
      counter: "palabras",
      title: "Palabras que me definen",
      hint: "Están escondidas a lo largo de la página, siempre al lado de la prueba.",
      done: "Las encontraste todas. Ya sabés bastante de mí; charlemos del resto.",
    },
    lightbox: { open: "Ampliar foto", prev: "Foto anterior", next: "Foto siguiente", close: "Cerrar" },
    filterLabel: "Filtrar experimentos",
    filterAll: "Todo",
  },

  person: {
    name: "Ignacio Nuñez Valcarce",
    city: "Buenos Aires",
    timezone: "America/Argentina/Buenos_Aires",
    email: "TODO(nacho): mail",
    cv: "TODO(nacho): /cv/cv-ignacio-nunez-valcarce.pdf",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/ignacio-nu%C3%B1ez-valcarce-7b870a211/" },
      { label: "GitHub", href: "https://github.com/IgnacioNV" },
    ],
  },

  nav: [
    { id: "proyectos", creative: "Hacer", label: "Proyectos" },
    { id: "pienso", creative: "Pensar", label: "Cómo pienso" },
    { id: "laboratorio", creative: "Probar", label: "Laboratorio" },
    { id: "quien-soy", creative: "Rastro", label: "Quién soy" },
    { id: "contacto", creative: "Siguiente", label: "Contacto" },
  ],

  keywords: {
    innovacion: {
      label: "innovación",
      evidence: "SIMA usa machine learning para detectar esclerosis múltiple; Trevian, escaneo con iPhone e impresión 3D.",
      section: "proyectos",
    },
    producto: {
      label: "producto",
      evidence: "SIMA, Trevian, Study Buddy e Inspira: productos digitales, no solo pantallas.",
      section: "proyectos",
    },
    creatividad: {
      label: "creatividad",
      evidence: "La identidad de NIHOL salió de entrevistas: nombre, logo, paleta y tono.",
      section: "proyectos",
    },
    estrategia: {
      label: "estrategia",
      evidence: "Identidad y experiencia digital de una consultora de RRHH, pensada para quien decide.",
      section: "proyectos",
    },
    pensamiento: {
      label: "pensamiento crítico",
      evidence: "Siete preguntas antes de abrir Figma, y un video premiado sobre interfaces y adicción.",
      section: "pienso",
    },
    proyectos: {
      label: "proyectos",
      evidence: "Siete experimentos que arranqué por mi cuenta, sin que nadie me los pida.",
      section: "laboratorio",
    },
    liderazgo: {
      label: "liderazgo",
      evidence: "Capitán en la Selección Metropolitana y en la Argentina. Discurso en el Gran Rex ante más de 3.000 personas.",
      section: "quien-soy",
    },
    equipo: {
      label: "trabajo en equipo",
      evidence: "Cerca de 10 años de vóley federado y tres campeonatos nacionales con mi club.",
      section: "quien-soy",
    },
    emprendedora: {
      label: "mentalidad emprendedora",
      evidence: "Detectar un problema, investigarlo, diseñarlo y construir el prototipo. El perfil founder que busco.",
      section: "contacto",
    },
  },

  hero: {
    kicker: "Diseño de producto · Marca · Buenos Aires",
    line: "Me interesa más lo que una interfaz le hace a las personas que cómo se ve.",
    aside: "(Igual me importa cómo se ve.)",
    sub: "Estudio Diseño en la UdeSA y trabajo en marca y producto digital en Inspira RRHH. Busco el problema detrás del problema, y después lo construyo.",
    proofs: ["Premio World ORT STEM Communication 2025", "Diseño · UdeSA", "Brand & producto · Inspira RRHH"],
    languages: ["Español", "Inglés", "Italiano"],
    portrait: {
      src: "/fotos/hero.jpg",
      alt: "Retrato de Ignacio Nuñez Valcarce",
    },
    visual: {
      fixed: "Esto es",
      pairs: [
        { surface: "un botón.", depth: "una decisión." },
        { surface: "un feed.", depth: "un hábito." },
        { surface: "un logo.", depth: "una memoria." },
        { surface: "una app.", depth: "una rutina." },
        { surface: "una plantilla.", depth: "un cuerpo." },
        { surface: "un formulario.", depth: "una duda." },
        { surface: "un portfolio.", depth: "una pregunta." },
      ],
      hint: "Mové el cursor: ahí es donde miro. Clic para otro.",
      hintTouch: "Arrastrá de costado para mirar abajo. Tocá para otro.",
      label: "Ejemplo interactivo: en la superficie se lee una cosa y debajo, otra.",
      nextLabel: "Ver otro ejemplo",
    },
  },

  projects: {
    title: "Lo que hice.",
    lede: "Cinco proyectos de [[producto:producto]], marca e [[innovacion:innovación]]. En todos arranqué por la misma pregunta: qué le pasa a la persona del otro lado.",
    moreTitle: "También",
    ctaLine: "¿Querés ver más de alguno? Te lo cuento en una charla.",
    list: [
      {
        slug: "sima",
        name: "SIMA",
        aka: "Sclerosis Intelligent Medical Assistant",
        year: "2024",
        role: ["UX/UI", "Branding"],
        problem: "Ayudar a detectar esclerosis múltiple a partir de información clínica, con machine learning.",
        with: "Fundación Noemí Frida Kraut",
        tier: "lg",
        ...projectAssets.sima,
        case: {
          problem: [
            "SIMA es una plataforma que usa inteligencia artificial y machine learning para ayudar a detectar esclerosis múltiple a partir de información clínica.",
            "La desarrollamos junto con la Fundación Noemí Frida Kraut y pasó por una experiencia de MVP.",
          ],
          role: ["Me encargué del UX/UI y del branding.", "TODO(nacho): detalle de pantallas, flujos y decisiones de identidad"],
          question: 2,
          process: ["TODO(nacho): proceso de SIMA (investigación, flujos, iteraciones)"],
          result: ["TODO(nacho): qué salió de la experiencia de MVP"],
          learned: [
            "Es el proyecto donde más se cruza lo que me importa: diseño, tecnología, inteligencia artificial, salud e impacto social.",
            "TODO(nacho): aprendizajes concretos",
          ],
        },
      },
      {
        slug: "inspira",
        name: "Inspira RRHH",
        year: "2026 — hoy",
        role: ["Marca", "Web", "Sistema visual"],
        problem: "Identidad, [[estrategia:estrategia]] y web para una consultora de RRHH, pensadas para quien decide.",
        with: "Inspira Recursos Humanos",
        tier: "lg",
        ...projectAssets.inspira,
        case: {
          problem: [
            "Inspira trabaja en selección, evaluaciones psicotécnicas, capacitaciones y coaching.",
            "Estoy diseñando su web y su sistema visual, pensando sobre todo en la gente de RRHH que toma decisiones.",
          ],
          role: [
            "Marca y producto digital. Los valores que busco transmitir: personas, solvencia, seriedad, calidez, confianza y trato humano.",
          ],
          question: 6,
          process: ["TODO(nacho): proceso de Inspira"],
          result: ["TODO(nacho): link a la web cuando esté publicada"],
          learned: ["Es un cliente real: acá aprendo cómo se relaciona el diseño con una organización y con objetivos comerciales."],
        },
      },
      {
        slug: "trevian",
        name: "Trevian",
        facts: [{ label: "Tipografía", value: "Onest" }],
        year: "2025",
        role: ["TODO(nacho): tu rol en Trevian"],
        problem: "Una plantilla ortopédica a medida sin ir a ningún lado: la plantilla viene a vos.",
        tier: "md",
        ...projectAssets.trevian,
        case: {
          problem: [
            "Una plantilla ortopédica personalizada. El pie se escanea con el LiDAR del iPhone, los datos se procesan con algoritmos e IA, y la plantilla se fabrica en 3D para esa persona.",
            "La experiencia incluye el escaneo, el procesamiento y la fabricación, con profesionales como kinesiólogos en el medio.",
          ],
          role: ["TODO(nacho): qué diseñaste en Trevian (app, flujo de escaneo, marca, servicio)"],
          question: 2,
          process: [
            "Escanear el pie → procesar los datos → fabricar la plantilla → un profesional en el circuito.",
            "TODO(nacho): proceso de Trevian",
          ],
          result: ["TODO(nacho): resultado de Trevian"],
          learned: [
            "Mezcla diseño de producto, tecnología, experiencia de usuario, fabricación digital y salud. Es menos una pantalla y más un servicio entero.",
            "TODO(nacho): aprendizajes concretos",
          ],
        },
      },
      {
        slug: "nihol",
        name: "NIHOL",
        aka: "Fundación Nietos del Holocausto",
        year: "TODO(nacho): año de NIHOL",
        role: ["Naming", "Identidad visual", "Tono de comunicación"],
        problem: "Una identidad con [[creatividad:creatividad]] y cuidado, construida desde las historias de la gente de la fundación.",
        with: "Fundación Nietos del Holocausto",
        tier: "md",
        ...projectAssets.nihol,
        case: {
          problem: ["El proyecto nació de entrevistas y charlas con personas vinculadas a la fundación."],
          role: ["Nombre, identidad visual, logo, paleta, tipografía y tono de comunicación."],
          question: 0,
          process: [
            "TODO(nacho): qué apareció en las entrevistas",
            "TODO(nacho): cómo llegaste al nombre NIHOL",
          ],
          result: ["TODO(nacho): el sistema final (logo, paleta, tipografía) y por qué"],
          learned: [
            "Mi trabajo no se limita a interfaces: me interesa investigar, escuchar y construir una identidad a partir de las personas y sus historias.",
          ],
        },
      },
      {
        slug: "study-buddy",
        name: "Study Buddy",
        year: "2023",
        role: ["UX/UI", "Diseño"],
        problem: "Que estudiantes de 10 a 18 años estudien y se organicen mejor, con Feynman y Pomodoro.",
        with: "ORT Argentina",
        tier: "sm",
        ...projectAssets["study-buddy"],
        case: {
          problem: [
            "Un proyecto de ORT: una app para que estudiantes de entre 10 y 18 años, más o menos, estudien y se organicen.",
            "Usaba ideas como el método Feynman y la técnica Pomodoro.",
          ],
          role: ["Mi rol fue principalmente UX/UI y diseño."],
          question: 3,
          process: ["TODO(nacho): proceso de Study Buddy"],
          result: ["TODO(nacho): resultado de Study Buddy"],
          learned: ["Fue una de mis primeras aproximaciones al diseño de productos digitales. El punto de partida."],
        },
      },
    ],
  },

  thinking: {
    title: "Arranco por preguntas, no por pantallas.",
    lede: "Para mí el diseño no es solo cómo se ve algo: es una forma de entender una experiencia y después cambiarla. Esto es [[pensamiento:pensamiento crítico]] aplicado: las preguntas a las que siempre vuelvo.",
    hint: "Elegí una pregunta y fijate dónde la apliqué.",
    appliedIn: "La apliqué en",
    reset: "Ver todas",
    questions: [
      { q: "¿Por qué una persona hace lo que hace?", projects: ["nihol", "study-buddy"] },
      { q: "¿Qué está sintiendo, de verdad?", projects: ["nihol", "sima"] },
      { q: "¿Cuál es el problema real detrás del aparente?", projects: ["sima", "trevian"] },
      { q: "¿Cómo cambia una experiencia cuando cambiás la interfaz?", projects: ["study-buddy", "inspira"] },
      { q: "¿Puede la tecnología cambiar un comportamiento? ¿Debería?", projects: ["study-buddy", "trevian"] },
      { q: "¿Cómo hacés algo útil y, además, significativo?", projects: ["sima", "nihol"] },
      { q: "¿Qué decisiones invisibles toma un diseñador?", projects: ["inspira", "nihol"] },
    ],
    award: {
      kicker: "World ORT STEM Communication Award · 2025",
      title: "¿Consumimos experiencias o consumimos adicciones?",
      body: [
        "Un video sobre diseño de interfaces, adicción, ansiedad y redes sociales. La pregunta de fondo: qué responsabilidad tenemos cuando diseñamos experiencias digitales.",
        "Se apoya en Jonathan Haidt y en ideas de Lacan. Ganó el World ORT STEM Communication Award 2025.",
      ],
      link: "TODO(nacho): link al video",
      linkLabel: "Ver el video",
    },
  },

  lab: {
    title: "Cosas que construyo para averiguar.",
    lede: "[[proyectos:Proyectos]] chicos, prototipos e ideas que arranco por mi cuenta. Así aprendo: elijo algo que quiero que exista y trato de hacerlo.",
    tags: {
      pwa: "PWA",
      social: "Social",
      "sport-data": "Deporte y datos",
      physical: "Físico",
      photo: "Foto",
      meta: "Meta",
    },
    entries: [
      {
        id: "L-01",
        title: "Compañero de viaje offline",
        line: "Una experiencia para un viaje por Puglia y Grecia que funciona sin señal.",
        tags: ["pwa"],
        status: "TODO(nacho): estado",
        note: "TODO(nacho): qué querías averiguar",
      },
      {
        id: "L-02",
        title: "Intercambio de figuritas",
        line: "Una app para cambiar figuritas del Mundial.",
        tags: ["pwa", "social"],
        status: "TODO(nacho): estado",
        note: "TODO(nacho): qué querías averiguar",
      },
      {
        id: "L-03",
        title: "Juego musical tipo Hitster",
        line: "Una PWA inspirada en Hitster, para jugar con música.",
        tags: ["pwa", "social"],
        status: "TODO(nacho): estado",
        note: "TODO(nacho): qué querías averiguar",
      },
      {
        id: "L-04",
        title: "Estadística de vóley, menos a mano",
        line: "Automatizar parte del análisis estadístico que hoy se hace a mano con herramientas como Data Volley.",
        tags: ["sport-data"],
        status: "Idea",
        note: "Años de vóley federado me mostraron desde adentro cómo funcionan los equipos, el rendimiento y los datos.",
      },
      {
        id: "L-05",
        title: "Objetos para una habitación",
        line: "Conceptos de objetos físicos que mezclan habitaciones y tecnología.",
        tags: ["physical"],
        status: "TODO(nacho): estado",
        note: "TODO(nacho): detalle",
      },
      {
        id: "L-06",
        title: "Fotografía",
        line: "Calle, gente, paisajes. Arrancó cuando mi abuelo me regaló una cámara profesional.",
        tags: ["photo"],
        status: "En curso",
        note: "TODO(nacho): selección de fotos (la galería de Quién soy aparece con 6 o más fotos en src/data/fotos.ts)",
      },
      {
        id: "L-07",
        title: "Este portfolio",
        line: "Diseñado en el navegador y construido con Next.js, con Claude como colaborador.",
        tags: ["meta"],
        status: "v2",
        note: "El portfolio no solo debería mostrar proyectos. Debería ser uno.",
      },
    ],
  },

  about: {
    title: "Quién soy.",
    lede: "Diseño, código, vóley, guitarra y una cámara. No necesariamente en ese orden.",
    portrait: {
      src: "/fotos/roma.jpg",
      alt: "Ignacio con anteojos de sol frente al Coliseo, en Roma",
      caption: "Roma. Modo turista.",
    },
    story: [
      "Soy de Buenos Aires. Hice la secundaria en ORT con orientación TIC (programación, diseño, tecnología) y ahora estudio Diseño en la UdeSA.",
      "En el medio aprendí algo que no está en ningún programa: casi 10 años de vóley federado, primero en GEBA y después en Club Ciudad de Buenos Aires, con tres campeonatos nacionales. Ahí entendí de verdad cómo funciona el [[equipo:trabajo en equipo]], la presión y los datos.",
      "Fui capitán en convocatorias a la Selección Metropolitana y a la Selección Argentina, y di el discurso de graduación de ORT en el Gran Rex, junto con otra estudiante, frente a más de 3.000 personas. Algo de [[liderazgo:liderazgo]] tuvo que haber.",
      "Toco la guitarra desde los 12. Saco fotos desde que mi abuelo me regaló una cámara profesional.",
    ],
    stats: [
      { value: 3000, prefix: "+", label: "personas en el Gran Rex" },
      { value: 3, label: "campeonatos nacionales" },
      { value: 10, prefix: "~", label: "años de vóley federado" },
    ],
    photos: [
      { src: "/fotos/voley-01.jpg", alt: "El equipo de vóley levantando la copa después de ganar un campeonato" },
      { src: "/fotos/trabajando-01.jpg", alt: "TODO(nacho): foto trabajando" },
      { src: "/fotos/guitarra.jpg", alt: "TODO(nacho): foto con la guitarra" },
    ],
    timelineTitle: "Trayectoria",
    timeline: [
      { when: "2013 — 2019", title: "Scuola Italiana Cristoforo Colombo", body: "Primaria." },
      {
        when: "2020 — 2025",
        title: "ORT Argentina, orientación TIC",
        body: "Programación, diseño, tecnología y comunicación. Promedio cercano a 9,5; mis mejores notas, en Inglés, TIC y Programación.",
      },
      { when: "TODO(nacho): año", title: "ORT London", body: "TODO(nacho): qué fue ORT London" },
      {
        when: "2025",
        title: "World ORT Ecology Summer School, Panamá",
        body: "Curso de ecología tropical en el Parque Nacional Soberanía.",
      },
      { when: "2025", title: "World ORT STEM Communication Award", body: "Por un video sobre diseño de interfaces, adicción y ansiedad." },
      { when: "2025", title: "Discurso de graduación en el Gran Rex", body: "En nombre de los egresados de ORT, ante más de 3.000 personas." },
      { when: "2026 —", title: "Diseño en la UdeSA", body: "Pensamiento proyectual, y alrededor: negocios, tecnología, análisis y código." },
      { when: "Sep 2026 —", title: "Inspira Recursos Humanos", body: "Diseñador de marca y producto digital." },
    ],
    educationTitle: "Formación",
    education: [
      { name: "Universidad de San Andrés", detail: "Diseño", years: "2026 —", logo: "/logos/udesa.svg", hover: "Diseño · 2026–" },
      { name: "ORT Argentina", detail: "Secundaria técnica, orientación TIC", years: "2020 — 2025", logo: "/logos/ort.svg", hover: "TIC · 2020–2025" },
    ],
    languagesTitle: "Idiomas",
    languages: [
      { name: "Español", level: "Nativo" },
      { name: "Inglés", level: "Intermedio alto (B2) · Cambridge B2 First (FCE)", logo: "/logos/cambridge.svg" },
      { name: "Italiano", level: "Avanzado · fluido — lo estudié de los 4 a los 12 en la Scuola Italiana" },
    ],
    toolsTitle: "Con qué trabajo",
    toolsLede:
      "No soy ingeniero de software ni quiero presentarme así. Programar es mi forma de no depender de otro para saber si una idea funciona. La IA la uso para crear, no para que diseñe por mí.",
    stages: ["Entender", "Prototipar", "Construir"],
    tools: [
      { name: "Conversaciones", icon: "", stages: [0] },
      { name: "Entrevistas", icon: "", stages: [0] },
      { name: "Investigación", icon: "", stages: [0] },
      { name: "Figma", icon: "figma", stages: [1] },
      { name: "Figma Make", icon: "figma", stages: [1] },
      { name: "Illustrator", icon: "illustrator", stages: [1] },
      { name: "HTML / CSS / JS", icon: "html", stages: [1, 2] },
      { name: "React", icon: "react", stages: [2] },
      { name: "Next.js", icon: "next", stages: [2] },
      { name: "GitHub", icon: "github", stages: [2] },
      { name: "Premiere Pro", icon: "premiere", stages: [2] },
      { name: "Cursor", icon: "cursor", stages: [1, 2] },
      { name: "Claude", icon: "claude", stages: [1, 2] },
    ],
    nowTitle: "Ahora mismo",
    nowLabels: { reading: "Leyendo", listening: "Escuchando", building: "Construyendo" },
    galleryTitle: "Fotos que saqué",
    galleryLede: "Calle, gente, paisajes.",
  },

  closing: {
    title: "Hacia dónde voy.",
    body: [
      "Todavía no elegí una etiqueta, y es a propósito. Me interesa el lugar entre diseño, tecnología y negocio: detectar un problema, investigarlo, entender a las personas, pensar una estrategia, diseñar la solución y construir un prototipo que funcione.",
      "Eso es [[emprendedora:mentalidad emprendedora]]: algo entre product designer, product manager e innovador. En productos digitales, startups, empresas de tecnología, o en proyectos propios.",
    ],
    spacesTitle: "Territorios que exploro",
    spaces: [
      "Product Design",
      "UX/UI",
      "Diseño de interacción",
      "Product Management",
      "Estrategia",
      "Innovación",
      "Startups",
      "IA",
      "Branding",
      "Investigación de usuarios",
      "Psicología del comportamiento",
      "Negocios digitales",
    ],
    ctaTitle: "¿Tenés un problema interesante?",
    ctaBody: "Busco pasantías y primeros roles en producto y UX, y proyectos freelance de marca y web. Si algo de esto te sirve, charlemos.",
    cvLabel: "Descargar CV",
  },

  footer: "v2 · 2026. Diseñado y construido en Buenos Aires, con Next.js y Claude.",
};
