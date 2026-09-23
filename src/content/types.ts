import type { StaticImageData } from "next/image";

/**
 * The five territories the portfolio keeps returning to.
 * Every project declares which ones it touches — the Work map lights them up.
 */
export type Axis = "design" | "technology" | "business" | "ai" | "people";

/**
 * Any string wrapped in [BRACKETS] is rendered as a visible placeholder
 * (see <Text />). Replace it with real content when you have it.
 */
export type Copy = string;

export type Project = {
  slug: string;
  name: string;
  aka?: string;
  /** One line, in plain words. What it is. */
  line: Copy;
  year: Copy;
  role: Copy[];
  with?: Copy;
  axes: Axis[];
  /** Brand color of the project, used sparingly (hover strip, case header). */
  color: string;
  ink: string;
  logo?: StaticImageData;
  /** The question behind the project. The case study starts here. */
  question: Copy;
  context: Copy[];
  whatIDid: Copy[];
  whyItMatters: Copy;
  chapters: { title: string; body: Copy }[];
};

export type LabEntry = {
  id: string;
  title: Copy;
  line: Copy;
  tags: LabTag[];
  status: Copy;
  note: Copy;
  image?: StaticImageData;
};

export type LabTag = "pwa" | "physical" | "sport-data" | "photo" | "social" | "meta";

export type PathEntry = {
  when: Copy;
  title: Copy;
  body: Copy;
  track: "main" | "off";
  image?: StaticImageData;
};

export type Question = {
  q: Copy;
  /** Where I tried to answer it. Slugs of projects, or free text. */
  triedIn: string[];
};

export type Tool = {
  name: string;
  /** Which stages of idea → prototype → product the tool lives in. */
  stages: (0 | 1 | 2)[];
};

export type SiteContent = {
  locale: "en" | "es";
  meta: { title: string; description: string };
  person: {
    name: string;
    age: string;
    city: string;
    timezone: string;
    email: Copy;
    links: { label: string; href: string }[];
  };
  nav: { id: string; label: string }[];
  hero: {
    kicker: string;
    who: Copy;
    hint: string;
    hintTouch: string;
    fixed: string;
    pairs: { surface: string; depth: string }[];
  };
  intro: {
    statement: Copy;
    facts: { k: string; v: Copy }[];
    photoCaption: Copy;
  };
  thinking: {
    title: string;
    lede: Copy;
    questions: Question[];
    award: { kicker: string; title: string; body: Copy[]; link: Copy };
    shelf: { title: string; items: string[] };
  };
  work: { title: string; lede: Copy; axes: Record<Axis, string>; projects: Project[] };
  lab: { title: string; lede: Copy; tags: Record<LabTag, string>; entries: LabEntry[] };
  path: { title: string; lede: Copy; tracks: { main: string; off: string }; entries: PathEntry[] };
  method: {
    title: string;
    lede: Copy;
    stages: { name: string; body: Copy }[];
    tools: Tool[];
    aiNote: Copy;
  };
  next: {
    title: string;
    labelPrefix: string;
    labels: string[];
    labelResolution: string;
    body: Copy[];
    spaces: string[];
    contactTitle: string;
  };
  footer: Copy;
};
