import type { Project } from "./types";

import sima from "@/assets/img/sima.png";
import trevian from "@/assets/img/trevian.png";
import nihol from "@/assets/img/nihol.png";
import studybuddy from "@/assets/img/studybuddy.png";

/** Language-independent project data: brand colors and logos. */
export const projectAssets: Record<string, Pick<Project, "color" | "ink" | "mediaBg" | "logo">> = {
  sima: { color: "#FF8A00", ink: "#1A1200", mediaBg: "#FFFFFF", logo: sima },
  trevian: { color: "#030026", ink: "#8FF5DA", mediaBg: "#030026", logo: trevian },
  nihol: { color: "#2E1800", ink: "#F5B640", mediaBg: "#2E1800", logo: nihol },
  inspira: { color: "#1B1B1B", ink: "#F1EFE9", mediaBg: "#1B1B1B" },
  "study-buddy": { color: "#04184B", ink: "#FFFFFF", mediaBg: "#04184B", logo: studybuddy },
};
