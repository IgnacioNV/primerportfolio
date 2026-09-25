"use client";

import { ArrowUp } from "lucide-react";

/** Scrolls to the top (instantly with reduced motion) and moves focus to the start of the page. */
export function BackToTop({ label, className }: { label: string; className?: string }) {
  const go = (e: React.MouseEvent) => {
    e.preventDefault();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const focusTop = () => {
      const target = document.getElementById("hero-title") ?? document.getElementById("contenido");
      if (!target) return;
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };
    if (reduced) {
      window.scrollTo({ top: 0, behavior: "auto" });
      focusTop();
      return;
    }
    // Focusing mid-scroll cancels a smooth scroll in Chrome: move focus once it ends.
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      window.removeEventListener("scrollend", finish);
      focusTop();
    };
    window.addEventListener("scrollend", finish);
    window.setTimeout(finish, 1500); // browsers without `scrollend`
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <a href="#hero" onClick={go} className={className}>
      <ArrowUp size={14} aria-hidden /> {label}
    </a>
  );
}
