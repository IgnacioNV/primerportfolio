"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/content";
import { RichText } from "@/components/ui/RichText";
import { Maybe } from "@/components/ui/Todo";
import { isTodo } from "@/lib/todo";
import styles from "./Projects.module.css";

type Props = { project: Project; href: string; seeCase: string; size: "lg" | "md" | "sm"; index: number };

/**
 * A project card. On hover (fine pointers only) it tilts toward the cursor and a
 * "See case" label follows it — the card tells you it's a door, not a picture.
 */
export function ProjectCard({ project: p, href, seeCase, size, index }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    setCursor({ x, y });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rx = ((y / r.height) - 0.5) * -3;
    const ry = ((x / r.width) - 0.5) * 4;
    el.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.01)`;
  };
  const onLeave = () => {
    setCursor(null);
    if (ref.current) ref.current.style.transform = "";
  };

  const role = p.role.filter((r) => !isTodo(r)).join(" · ");

  return (
    <article
      ref={ref}
      className={`${styles.card} ${styles[size]}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ ["--pc" as string]: p.color, ["--pi" as string]: p.ink, ["--mb" as string]: p.mediaBg }}
    >
      <div className={styles.media}>
        {p.logo ? (
          <Image src={p.logo} alt="" className={styles.logo} sizes={size === "lg" ? "(min-width: 900px) 60vw, 90vw" : "(min-width: 900px) 30vw, 90vw"} />
        ) : (
          <span className={styles.wordmark} aria-hidden>
            {p.name}
          </span>
        )}
        {cursor && (
          <span className={styles.cursor} style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }} aria-hidden>
            {seeCase} →
          </span>
        )}
      </div>

      <div className={styles.body}>
        <p className={`meta ${styles.meta}`}>
          <span>{String(index).padStart(2, "0")}</span>
          <span>
            <Maybe value={p.year} />
          </span>
          {role && <span className={styles.role}>{role}</span>}
        </p>
        <h3 className={styles.name}>
          <Link href={href} className={styles.stretch}>
            {p.name}
          </Link>
        </h3>
        <p className={styles.problem}>
          <RichText>{p.problem}</RichText>
        </p>
        <span className={styles.more} aria-hidden>
          {seeCase} <ArrowRight size={16} />
        </span>
      </div>
    </article>
  );
}
