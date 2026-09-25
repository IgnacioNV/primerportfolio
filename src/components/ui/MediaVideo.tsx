"use client";

import { useEffect, useRef } from "react";
import type { Video } from "@/data/types";

/**
 * Decorative clips: muted, looping, inline; they play only while on screen and
 * never with reduced motion. Videos with sound: controls, no autoplay.
 */
export function MediaVideo({ video, alt, className }: { video: Video; alt: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const decorative = video.kind === "decorative";

  useEffect(() => {
    const el = ref.current;
    if (!el || !decorative) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? el.play().catch(() => {}) : el.pause()), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, [decorative]);

  return (
    <video
      ref={ref}
      className={className}
      src={video.src}
      poster={video.poster}
      width={video.width}
      height={video.height}
      aria-label={alt}
      preload={decorative ? "none" : "metadata"}
      muted={decorative}
      loop={decorative}
      playsInline
      controls={!decorative}
    />
  );
}
