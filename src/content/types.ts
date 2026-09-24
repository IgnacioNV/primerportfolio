import type { StaticImageData } from "next/image";

export type Locale = "es" | "en";

/**
 * Missing data is written as a string that starts with "TODO(nacho):".
 * `grep -rn "TODO(nacho)" src` lists everything pending.
 * In development it shows as a small marker; in production the element is not rendered.
 */
export type Text = string;

/**
 * Rich text: plain text with inline keywords.
 *   "Fui [[liderazgo:capitán]] en ..."  → "capitán" becomes the highlighted keyword "liderazgo".
 */
export type Rich = string;

export type KeywordId =
  | "creatividad"
  | "innovacion"
  | "proyectos"
  | "emprendedora"
  | "liderazgo"
  | "equipo"
  | "pensamiento"
  | "estrategia"
  | "producto";

export type Keyword = {
  /** The word as it appears in the counter list. */
  label: string;
  /** Short evidence shown in the tooltip. */
  evidence: string;
  /** Section id where it lives (the counter links there). */
  section: string;
};

export type LabTag = "pwa" | "social" | "sport-data" | "physical" | "photo" | "meta";

export type Photo = {
  /** Path inside /public. Missing files are hidden in production. */
  src: string;
  alt: string;
  caption?: Text;
};

export type Project = {
  slug: string;
  name: string;
  aka?: string;
  year: Text;
  role: Text[];
  /** The problem, in one line. Shown on the card. */
  problem: Rich;
  with?: Text;
  color: string;
  ink: string;
  /** Background behind the logo on cards (some logos come on white). */
  mediaBg: string;
  logo?: StaticImageData;
  /** Card size on the home: two large, two medium, the rest small. */
  tier: "lg" | "md" | "sm";
  /** Extra facts shown in the case header (e.g. typeface). */
  facts?: { label: string; value: Text }[];
  case: {
    problem: Text[];
    role: Text[];
    /** Index into thinking.questions — the question that guided the process. */
    question?: number;
    process: Text[];
    result: Text[];
    learned: Text[];
  };
};

export type SiteContent = {
  locale: Locale;
  meta: { title: string; description: string; ogLocale: string };

  ui: {
    cta: string;
    ctaAria: string;
    seeProjects: string;
    seeCase: string;
    backToProjects: string;
    nextProject: string;
    skipToContent: string;
    menu: string;
    close: string;
    langName: string;
    langSwitch: string;
    caseLabels: {
      problem: string;
      role: string;
      process: string;
      question: string;
      result: string;
      learned: string;
      year: string;
      with: string;
    };
    contact: {
      title: string;
      body: string;
      fields: { firstName: string; lastName: string; email: string; company: string; phone: string; message: string };
      optional: string;
      messagePlaceholder: string;
      errors: { required: string; email: string; messageMin: string; rateLimited: string };
      submit: string;
      sending: string;
      success: string;
      errorPrefix: string;
      errorFallback: string;
      copy: string;
      copied: string;
      subject: string;
      emailLabel: string;
    };
    keywords: {
      counter: string;
      title: string;
      hint: string;
      done: string;
    };
    lightbox: { open: string; prev: string; next: string; close: string };
    filterAll: string;
    filterLabel: string;
  };

  person: {
    name: string;
    city: string;
    timezone: string;
    email: Text;
    cv: Text;
    links: { label: string; href: string }[];
  };

  /** Creative name + clear label. */
  nav: { id: string; creative: string; label: string }[];

  keywords: Record<KeywordId, Keyword>;

  hero: {
    /** Full H1, always in the HTML (SEO, screen readers). */
    title: string;
    /** Animation pieces: `start` + typed `struck` (crossed out) → `replacement`. */
    titleStart: string;
    titleStruck: string;
    titleReplacement: string;
    sub: string;
    proofs: string[];
    portrait: Photo;
    /** Work revealed under the photo, rotating. Missing files fall back to project logos. */
    under: Photo[];
    visual: {
      label: string;
      toggle: string;
    };
  };

  projects: {
    title: string;
    lede: Rich;
    moreTitle: string;
    ctaLine: string;
    list: Project[];
  };

  thinking: {
    /** Big opening statement of the section. */
    opening: string;
    openingSub: string;
    title: string;
    lede: Rich;
    hint: string;
    appliedIn: string;
    reset: string;
    questions: { q: string; projects: string[] }[];
    award: { kicker: string; title: string; body: Text[]; link: Text; linkLabel: string };
  };

  lab: {
    title: string;
    lede: Rich;
    tags: Record<LabTag, string>;
    entries: { id: string; title: string; line: Text; tags: LabTag[]; status: Text; note: Text }[];
  };

  about: {
    title: string;
    lede: Rich;
    portrait: Photo;
    story: Rich[];
    stats: { value: number; prefix?: string; suffix?: string; label: string }[];
    photos: Photo[];
    timelineTitle: string;
    timeline: { when: Text; title: string; body: Text }[];
    educationTitle: string;
    education: { name: string; detail: string; years: Text; logo: string; hover: string }[];
    languagesTitle: string;
    /** `unconfirmed` languages are hidden in production until confirmed. */
    languages: { name: string; level: Text; unconfirmed?: boolean; logo?: string }[];
    toolsTitle: string;
    toolsLede: string;
    stages: string[];
    tools: { name: string; icon: string; stages: (0 | 1 | 2)[] }[];
    nowTitle: string;
    nowLabels: { reading: string; listening: string; building: string };
    galleryTitle: string;
    galleryLede: string;
  };

  closing: {
    title: string;
    body: Rich[];
    spacesTitle: string;
    spaces: string[];
    ctaTitle: string;
    ctaBody: string;
    cvLabel: string;
  };

  footer: string;
};
