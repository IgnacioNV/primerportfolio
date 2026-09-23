import "server-only";
import fs from "node:fs";
import path from "node:path";

/**
 * Does a file exist in /public? Used to hide photo, logo and CV slots
 * that haven't been filled yet. Runs at build time (server components only).
 */
export function publicExists(src: string): boolean {
  if (!src.startsWith("/")) return false;
  return fs.existsSync(path.join(process.cwd(), "public", src));
}
