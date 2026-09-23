import type { Project } from "./types";

import sima from "@/assets/img/sima.png";
import trevian from "@/assets/img/trevian.png";
import nihol from "@/assets/img/nihol.png";
import studybuddy from "@/assets/img/studybuddy.png";

/** Language-independent project data: brand colors and logos. */
export const projectAssets: Record<string, Pick<Project, "color" | "ink" | "logo">> = {
  sima: { color: "#FF8A00", ink: "#1A1200", logo: sima },
  trevian: { color: "#03021F", ink: "#8FF5DA", logo: trevian },
  nihol: { color: "#2E1A00", ink: "#F5B640", logo: nihol },
  inspira: { color: "#1B1B1B", ink: "#F1EFE9" },
  "study-buddy": { color: "#021A4A", ink: "#FFFFFF", logo: studybuddy },
};
