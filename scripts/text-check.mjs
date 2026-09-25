/*
 * Visual check for clipped glyphs (accents, Ñ, descenders, italics).
 *
 *   node scripts/text-check.mjs <outDir> [baseUrl]
 *
 * For every text component it injects the control string
 * "Ñandú ágil, cómo pájaro — Qjgpy" (regular and italic), waits for the
 * reveal animations to finish, and screenshots the element with some margin.
 * Runs for ES and EN at 390, 768 and 1440px. Also writes one contact sheet
 * per locale+width (sheet-*.png) to review everything at a glance.
 */
import { chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const OUT = process.argv[2] ?? "text-check";
const BASE = process.argv[3] ?? "http://localhost:3100";
const CONTROL = "Ñandú ágil, cómo pájaro — Qjgpy";
const WIDTHS = [390, 768, 1440];
const LOCALES = [
  { id: "es", home: "/", case: "/proyectos/sima" },
  { id: "en", home: "/en", case: "/en/projects/sima" },
];

/** Components that render text. `split` = word-by-word reveal (keep its wrappers). */
const TARGETS = [
  { name: "hero-title", page: "home", sel: "#hero h1" },
  { name: "hero-line", page: "home", sel: "#hero p" },
  { name: "section-title", page: "home", sel: "#pienso h2.section-title", split: true },
  { name: "section-title-2", page: "home", sel: "#proyectos h2.section-title", split: true },
  { name: "question", page: "home", sel: "#pienso ol button span:last-child" },
  { name: "award-title", page: "home", sel: "#pienso article h3" },
  { name: "card-name", page: "home", sel: "#proyectos article h3 a" },
  { name: "keyword", page: "home", sel: "#proyectos [data-keyword] button" },
  { name: "lab-title", page: "home", sel: "#laboratorio li h3" },
  { name: "stat", page: "home", sel: "#quien-soy ul li span span" },
  { name: "closing-title", page: "home", sel: "#contacto h3" },
  { name: "case-title", page: "case", sel: "main h1" },
  { name: "case-question", page: "case", sel: "main aside p:last-child a" },
];

fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
const shots = [];

for (const loc of LOCALES) {
  for (const width of WIDTHS) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    for (const kind of ["home", "case"]) {
      await page.goto(BASE + loc[kind], { waitUntil: "networkidle" });
      await page.evaluate(() => (document.documentElement.style.scrollBehavior = "auto"));
      for (const t of TARGETS.filter((x) => x.page === kind)) {
        for (const style of ["regular", "italic"]) {
          const el = page.locator(t.sel).first();
          if (!(await el.count())) {
            console.warn(`skip ${t.name} (${loc.id} ${width}): not found`);
            continue;
          }
          await el.scrollIntoViewIfNeeded();
          await page.evaluate(
            ({ sel, control, split, italic }) => {
              const node = document.querySelector(sel);
              if (!node) return;
              if (split) {
                // Keep the reveal wrappers; put one control word in each.
                const words = control.split(" ");
                const inner = [...node.querySelectorAll(":scope > span > span")];
                inner.forEach((s, i) => (s.textContent = words[i] ?? ""));
              } else {
                node.textContent = control;
              }
              node.style.fontStyle = italic ? "italic" : "";
            },
            { sel: t.sel, control: CONTROL, split: !!t.split, italic: style === "italic" },
          );
          await page.waitForTimeout(1600); // let reveals / typing finish
          const box = await el.boundingBox();
          if (!box) continue;
          const pad = 12;
          const file = path.join(OUT, `${loc.id}-${width}-${t.name}-${style}.png`);
          await page.screenshot({
            path: file,
            clip: { x: Math.max(0, box.x - pad), y: Math.max(0, box.y - pad), width: Math.min(width, box.width + pad * 2), height: box.height + pad * 2 },
          });
          shots.push({ loc: loc.id, width, file, name: `${t.name} · ${style}` });
        }
      }
    }
    await ctx.close();
  }
}

// Contact sheets: one per locale + width.
const sheetCtx = await browser.newContext({ viewport: { width: 1600, height: 900 } });
const sheet = await sheetCtx.newPage();
for (const loc of LOCALES) {
  for (const width of WIDTHS) {
    const items = shots.filter((s) => s.loc === loc.id && s.width === width);
    const html = `<html><body style="margin:0;padding:24px;background:#ddd;font:13px system-ui">
      <h1 style="font-size:18px">${loc.id.toUpperCase()} · ${width}px</h1>
      ${items
        .map(
          (s) => `<figure style="margin:0 0 16px;background:#fff;padding:8px;display:inline-block;vertical-align:top;max-width:1540px">
            <figcaption style="margin-bottom:6px;color:#555">${s.name}</figcaption>
            <img src="data:image/png;base64,${fs.readFileSync(s.file).toString("base64")}" style="max-width:${Math.min(1520, width)}px;display:block"/>
          </figure>`,
        )
        .join("")}
    </body></html>`;
    await sheet.setContent(html, { waitUntil: "load" });
    await sheet.screenshot({ path: path.join(OUT, `sheet-${loc.id}-${width}.png`), fullPage: true });
  }
}

await browser.close();
console.log(`${shots.length} captures → ${OUT}`);
