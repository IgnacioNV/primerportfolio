import type { SiteContent } from "./types";

import sima from "@/assets/img/sima.png";
import trevian from "@/assets/img/trevian.png";
import nihol from "@/assets/img/nihol.png";
import studybuddy from "@/assets/img/studybuddy.png";
import photography from "@/assets/img/photography.png";
import volleyball from "@/assets/img/volleyball.png";
import panama from "@/assets/img/panama.png";

/*
 * ─────────────────────────────────────────────────────────────
 *  All the copy of the site lives here.
 *  Anything written like [THIS] shows up on the page as a blue
 *  placeholder so it's impossible to forget. Replace, don't delete.
 *  To add Spanish: copy this file to es.ts and translate.
 * ─────────────────────────────────────────────────────────────
 */

export const en: SiteContent = {
  locale: "en",
  meta: {
    title: "Ignacio Nuñez Valcarce",
    description:
      "Design student at UdeSA, Buenos Aires. Interested in the problem behind the problem — and in building what fixes it.",
  },

  person: {
    name: "Ignacio Nuñez Valcarce",
    age: "18",
    city: "Buenos Aires",
    timezone: "America/Argentina/Buenos_Aires",
    email: "[EMAIL]",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/ignacio-nu%C3%B1ez-valcarce-7b870a211/" },
      { label: "GitHub", href: "https://github.com/IgnacioNV" },
    ],
  },

  nav: [
    { id: "look", label: "Look" },
    { id: "think", label: "Think" },
    { id: "make", label: "Make" },
    { id: "try", label: "Try" },
    { id: "trace", label: "Trace" },
    { id: "next", label: "Next" },
  ],

  hero: {
    kicker: "Fig. 0 — Look closer",
    who: "Ignacio Nuñez Valcarce. Design student in Buenos Aires. More interested in what an interface does to people than in how it looks — though I care about both.",
    hint: "Move the cursor. That's where I look. Click for another.",
    hintTouch: "Drag sideways to look underneath. Tap for another.",
    fixed: "This is",
    pairs: [
      { surface: "a button.", depth: "a decision." },
      { surface: "a feed.", depth: "a habit." },
      { surface: "a logo.", depth: "a memory." },
      { surface: "a study app.", depth: "a routine." },
      { surface: "an insole.", depth: "a body." },
      { surface: "a form.", depth: "a doubt." },
      { surface: "a portfolio.", depth: "a question." },
    ],
  },

  intro: {
    statement:
      "I study Design at Universidad de San Andrés, after a technology track at ORT. I'm most interested in the problem behind the problem: why people do what they do — and what we could build about it.",
    facts: [
      { k: "Based in", v: "Buenos Aires, AR" },
      { k: "Studying", v: "Design — UdeSA" },
      { k: "Before", v: "ORT Argentina, TIC track" },
      { k: "Now", v: "Brand & digital product, Inspira RRHH" },
      { k: "Label", v: "Not picked yet. On purpose." },
    ],
    photoCaption: "Rome, [YEAR]. Tourist mode.",
  },

  thinking: {
    title: "I start with questions, not screens.",
    lede:
      "Design isn't only how something looks. For me it's a way of understanding an experience — and then changing it. These are the questions I keep coming back to.",
    // Edit freely: `triedIn` links each question to where I tried to answer it.
    questions: [
      { q: "Why does a person do what they do?", triedIn: ["nihol", "study-buddy"] },
      { q: "What are they actually feeling?", triedIn: ["nihol", "award"] },
      { q: "What's the real problem behind the apparent one?", triedIn: ["sima", "trevian"] },
      { q: "How does an experience change when we change an interface?", triedIn: ["study-buddy", "award"] },
      { q: "Can technology change a behavior? Should it?", triedIn: ["award", "study-buddy"] },
      { q: "How do you make something useful and also meaningful?", triedIn: ["sima", "nihol"] },
      { q: "Which invisible decisions does a designer make?", triedIn: ["inspira", "this site"] },
    ],
    award: {
      kicker: "Case in point — World ORT STEM Communication Award, 2025",
      title: "¿Consumimos experiencias o consumimos adicciones?",
      body: [
        "Do we consume experiences, or addictions? A short video about interface design, addiction, anxiety and social media — and about our responsibility when we design digital experiences.",
        "It pulls from Jonathan Haidt and from ideas of Lacan. It won the World ORT STEM Communication Award in 2025.",
      ],
      link: "[VIDEO LINK]",
    },
    shelf: {
      title: "What I read around",
      items: [
        "Don Norman",
        "Cognitive psychology",
        "Neuroscience",
        "Behavior",
        "Philosophy",
        "Semiotics",
        "Design theory",
        "Jonathan Haidt",
      ],
    },
  },

  work: {
    title: "Things I made.",
    lede:
      "Five projects. Each one sits somewhere different between design, technology, business, AI and people. Hover one to see where.",
    axes: {
      design: "Design",
      technology: "Technology",
      business: "Business",
      ai: "AI",
      people: "People",
    },
    projects: [
      {
        slug: "sima",
        name: "SIMA",
        aka: "Sclerosis Intelligent Medical Assistant",
        line: "A platform that uses machine learning to help detect multiple sclerosis from clinical data.",
        year: "2024",
        role: ["UX/UI", "Branding"],
        with: "Fundación Noemí Frida Kraut",
        axes: ["design", "technology", "ai", "people"],
        color: "#FF8A00",
        ink: "#FFFFFF",
        logo: sima,
        question: "[THE QUESTION THAT STARTED SIMA]",
        context: [
          "SIMA is a platform that uses artificial intelligence and machine learning to help detect multiple sclerosis from clinical information.",
          "It was developed together with Fundación Noemí Frida Kraut and went through an MVP experience.",
        ],
        whatIDid: ["I worked on the UX/UI and the branding.", "[DETAIL: screens, flows, identity decisions]"],
        whyItMatters:
          "It's the project where more of what I care about overlaps: design, technology, artificial intelligence, health and social impact.",
        chapters: [
          { title: "Who it's for", body: "[WHO USES SIMA AND IN WHAT MOMENT]" },
          { title: "Process", body: "[ADD CASE STUDY]" },
          { title: "The MVP", body: "[WHAT THE MVP EXPERIENCE WAS AND WHAT CAME OUT OF IT]" },
          { title: "What I learned", body: "[ADD]" },
        ],
      },
      {
        slug: "trevian",
        name: "Trevian",
        aka: "also known as Onest",
        line: "A custom orthopedic insole: scanned with an iPhone, processed with algorithms, 3D-printed. The insole comes to you.",
        year: "2025",
        role: ["Product design", "UX/UI", "[ROLE]"],
        axes: ["design", "technology", "ai", "business"],
        color: "#03021F",
        ink: "#8FF5DA",
        logo: trevian,
        question: "What if the insole came to you, instead of you going to it?",
        context: [
          "A personalized orthopedic insole. The foot is scanned using iPhone LiDAR, the data is processed with algorithms / AI, and the insole is 3D-fabricated to fit that one person.",
          "The experience covers the scan, the processing and the fabrication, with professionals like kinesiologists taking part.",
        ],
        whatIDid: ["[DETAIL: what I designed — the app, the scan flow, the brand, the service]"],
        whyItMatters:
          "It mixes product design, technology, user experience, digital fabrication and health. It's less about a screen and more about a whole service.",
        chapters: [
          { title: "The experience, step by step", body: "Scan the foot → process the data → fabricate the insole → a professional in the loop. [ADD DETAIL PER STEP]" },
          { title: "Process", body: "[ADD CASE STUDY]" },
          { title: "Open questions", body: "[ADD]" },
        ],
      },
      {
        slug: "nihol",
        name: "NIHOL",
        aka: "Fundación Nietos del Holocausto",
        line: "A brand identity for the Holocaust Grandchildren Foundation, built from interviews with the people behind it.",
        year: "[YEAR]",
        role: ["Naming", "Visual identity", "Tone of voice"],
        with: "Fundación Nietos del Holocausto",
        axes: ["design", "people"],
        color: "#2E1A00",
        ink: "#F5B640",
        logo: nihol,
        question: "[THE QUESTION BEHIND NIHOL]",
        context: [
          "The project started from interviews and conversations with people connected to the foundation.",
        ],
        whatIDid: ["Name, visual identity, logo, color palette, typography and tone of communication."],
        whyItMatters:
          "It shows my work isn't only digital interfaces. I care about researching, listening, and building an identity out of people and their stories.",
        chapters: [
          { title: "Listening first", body: "[WHAT CAME UP IN THE INTERVIEWS]" },
          { title: "From stories to a name", body: "[HOW NIHOL WAS NAMED]" },
          { title: "The system", body: "[LOGO, PALETTE, TYPE — AND WHY]" },
        ],
      },
      {
        slug: "inspira",
        name: "Inspira RRHH",
        line: "Identity and digital experience for an HR company — selection, psychometric evaluations, training and coaching.",
        year: "2026 — now",
        role: ["Brand", "Web", "Visual system"],
        with: "Inspira Recursos Humanos",
        axes: ["design", "business", "people", "technology"],
        color: "#1B1B1B",
        ink: "#FFFFFF",
        question: "How do you make a company feel solid and warm at the same time?",
        context: [
          "Inspira works in recruitment, psychometric evaluations, training and coaching.",
          "I'm designing their website and visual system, thinking mostly about HR people who make decisions.",
        ],
        whatIDid: [
          "Brand values I'm working toward: people, solvency, seriousness, warmth, trust, human treatment.",
          "[DETAIL: site, system, what's shipped]",
        ],
        whyItMatters:
          "A real client. It's where I'm learning how design relates to an organization and to commercial goals.",
        chapters: [
          { title: "Who decides", body: "[HR DECISION-MAKERS: WHAT THEY NEED TO SEE]" },
          { title: "Process", body: "[ADD CASE STUDY]" },
          { title: "Status", body: "Work in progress. [LINK WHEN LIVE]" },
        ],
      },
      {
        slug: "study-buddy",
        name: "Study Buddy",
        line: "An app that helps students from roughly 10 to 18 study and get organized, using the Feynman technique and Pomodoro.",
        year: "2023",
        role: ["UX/UI", "Design"],
        with: "ORT Argentina",
        axes: ["design", "people"],
        color: "#021A4A",
        ink: "#FFFFFF",
        logo: studybuddy,
        question: "[THE QUESTION BEHIND STUDY BUDDY]",
        context: [
          "A school project at ORT: an app for students roughly between 10 and 18 years old to help them study and organize.",
          "It used ideas like the Feynman technique and Pomodoro.",
        ],
        whatIDid: ["My role was mainly UX/UI and design.", "[DETAIL]"],
        whyItMatters: "One of my first approaches to designing a digital product. The starting point.",
        chapters: [
          { title: "Process", body: "[ADD CASE STUDY]" },
          { title: "Looking back", body: "[WHAT I'D DO DIFFERENTLY NOW]" },
        ],
      },
    ],
  },

  lab: {
    title: "Things I build to find out.",
    lede:
      "Smaller projects, prototypes and ideas. This is how I learn: pick something I want to exist, and try to make it.",
    tags: {
      pwa: "PWA",
      physical: "Physical",
      "sport-data": "Sport & data",
      photo: "Photo",
      social: "Social",
      meta: "Meta",
    },
    entries: [
      {
        id: "L-01",
        title: "Offline trip companion",
        line: "An experience for a trip through Puglia and Greece that works without signal.",
        tags: ["pwa"],
        status: "[STATUS]",
        note: "[WHAT I WANTED TO FIND OUT]",
      },
      {
        id: "L-02",
        title: "World Cup sticker swap",
        line: "An app to trade World Cup stickers.",
        tags: ["pwa", "social"],
        status: "[STATUS]",
        note: "[WHAT I WANTED TO FIND OUT]",
      },
      {
        id: "L-03",
        title: "Hitster-style music game",
        line: "A PWA inspired by Hitster, for playing with music.",
        tags: ["pwa", "social"],
        status: "[STATUS]",
        note: "[WHAT I WANTED TO FIND OUT]",
      },
      {
        id: "L-04",
        title: "Volleyball stats, less manual",
        line: "Automating part of the statistical analysis that today is done by hand with tools like Data Volley.",
        tags: ["sport-data"],
        status: "Idea",
        note: "Years of federated volleyball showed me how teams, performance and data actually work from the inside.",
        image: volleyball,
      },
      {
        id: "L-05",
        title: "Objects for a room",
        line: "Concepts for physical objects that mix rooms and technology.",
        tags: ["physical"],
        status: "[STATUS]",
        note: "[ADD]",
      },
      {
        id: "L-06",
        title: "Photography",
        line: "Street, people, landscapes. It started when my grandfather gave me a professional camera.",
        tags: ["photo"],
        status: "Ongoing",
        note: "[ADD A SELECTION OF PHOTOS]",
        image: photography,
      },
      {
        id: "L-07",
        title: "This website",
        line: "Designed in the browser, built with Next.js, with Claude as a collaborator. It's a project too.",
        tags: ["meta"],
        status: "v1",
        note: "The portfolio shouldn't only show projects. It should be one.",
      },
    ],
  },

  path: {
    title: "Where I come from.",
    lede: "Two tracks, running at the same time. Neither makes sense without the other.",
    tracks: { main: "School & work", off: "Off-screen" },
    entries: [
      {
        when: "2013 — 2019",
        title: "Scuola Italiana Cristoforo Colombo",
        body: "Primary school.",
        track: "main",
      },
      {
        when: "2020 — 2025",
        title: "ORT Argentina — TIC track",
        body: "Programming, design, technology and communication. Average around 9.5/10, best marks in English, TIC and Programming.",
        track: "main",
      },
      {
        when: "[YEAR]",
        title: "ORT London",
        body: "[ADD WHAT IT WAS]",
        track: "main",
      },
      {
        when: "2024",
        title: "World ORT — Panamá",
        body: "Selected to join a summer school on ecology.",
        track: "main",
        image: panama,
      },
      {
        when: "2025",
        title: "World ORT STEM Communication Award",
        body: "For a video about interface design, addiction and anxiety.",
        track: "main",
      },
      {
        when: "2025",
        title: "Graduation speech, Gran Rex",
        body: "Gave the ORT graduation speech with another student, on behalf of the graduates, to an audience of over 3,000 people.",
        track: "main",
      },
      {
        when: "2026 —",
        title: "Universidad de San Andrés — Design",
        body: "Building project thinking, and adding business, technology, analysis and code around it.",
        track: "main",
      },
      {
        when: "Sep 2026 —",
        title: "Inspira Recursos Humanos",
        body: "Brand & digital product designer.",
        track: "main",
      },
      {
        when: "2018 —",
        title: "Volleyball",
        body: "Around 10 years playing, federated since 2018: GEBA, then Club Ciudad de Buenos Aires. Three national championships with my club; called up many times to the Argentine and Metropolitan teams, as captain.",
        track: "off",
      },
      {
        when: "Since 12",
        title: "Guitar",
        body: "Music and design share more than it seems.",
        track: "off",
      },
      {
        when: "Since a kid",
        title: "Photography",
        body: "My grandfather gave me a professional camera. I haven't stopped since.",
        track: "off",
      },
    ],
  },

  method: {
    title: "Idea → prototype → product.",
    lede:
      "I'm not a software engineer and I don't want to present myself as one. Code is how I stop depending on someone else to find out if an idea works.",
    stages: [
      { name: "Understand", body: "Talk to people. Find the problem behind the problem." },
      { name: "Prototype", body: "Make it concrete fast enough to be wrong early." },
      { name: "Build", body: "Turn it into something that actually works." },
    ],
    tools: [
      { name: "Conversations", stages: [0] },
      { name: "Figma", stages: [1] },
      { name: "Figma Make", stages: [1] },
      { name: "HTML / CSS / JS", stages: [1, 2] },
      { name: "React", stages: [2] },
      { name: "Next.js", stages: [2] },
      { name: "GitHub", stages: [2] },
      { name: "Cursor", stages: [1, 2] },
      { name: "Claude", stages: [0, 1, 2] },
    ],
    aiNote:
      "AI is changing how I work. I want to use it as a tool for making — not as a machine that designs for me.",
  },

  next: {
    title: "Where I'm going.",
    labelPrefix: "Job title:",
    labels: ["UX Designer", "Product Designer", "Product Manager", "Founder", "Researcher"],
    labelResolution: "Not picking one yet. I'd rather pick problems.",
    body: [
      "I'm exploring how to combine design, technology, business, AI and human behavior. The profile I'm after: someone who can spot a problem, research it, understand the people in it, think a strategy, design a solution and build a working prototype.",
      "Somewhere between product designer, product manager, innovator and founder. In digital products, startups, tech companies — or my own projects.",
    ],
    spaces: [
      "Product Design",
      "UX/UI",
      "Interaction",
      "Product Management",
      "Strategy",
      "Innovation",
      "Startups",
      "AI",
      "Branding",
      "User research",
      "Behavioral psychology",
      "Digital business",
    ],
    contactTitle: "Say hi.",
  },

  footer: "v1 — September 2026. Designed and built in Buenos Aires, with Next.js and Claude.",
};
