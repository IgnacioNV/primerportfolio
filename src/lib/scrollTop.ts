/**
 * Scroll to the very top (instant with reduced motion) and move focus to the
 * start of the page once the scroll has finished (focusing mid-scroll cancels
 * a smooth scroll in Chrome).
 */
export function scrollToTop() {
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
}
