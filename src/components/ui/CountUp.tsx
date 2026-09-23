"use client";

import { useEffect, useRef } from "react";

type Props = { value: number; prefix?: string; suffix?: string; locale: string };

/**
 * Numbers that count up once, when they scroll into view.
 * The server renders the final value, so without JS (or with reduced motion)
 * the right number is simply there.
 */
export function CountUp({ value, prefix = "", suffix = "", locale }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fmt = (n: number) => `${prefix}${Math.round(n).toLocaleString(locale)}${suffix}`;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return; // already visible: don't flash

    el.textContent = fmt(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1400;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / dur);
          el.textContent = fmt(value * (1 - Math.pow(1 - t, 3)));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = fmt(value);
    };
  }, [value, prefix, suffix, locale]);

  return (
    <span ref={ref}>
      {prefix}
      {value.toLocaleString(locale)}
      {suffix}
    </span>
  );
}
