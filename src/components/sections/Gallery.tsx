"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Photo, SiteContent } from "@/content";
import styles from "./Gallery.module.css";

type Props = { photos: Photo[]; ui: SiteContent["ui"]["lightbox"] };

/** Photo grid; click (or Enter) opens a lightbox. ← → to move, Esc to close. */
export function Gallery({ photos, ui }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);

  const open = (i: number) => {
    setIndex(i);
    ref.current?.showModal();
  };
  const go = useCallback((d: number) => setIndex((i) => (i + d + photos.length) % photos.length), [photos.length]);

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    const onKey = (e: KeyboardEvent) => {
      if (!dlg.open) return;
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    const onClick = (e: MouseEvent) => {
      if (e.target === dlg) dlg.close();
    };
    window.addEventListener("keydown", onKey);
    dlg.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      dlg.removeEventListener("click", onClick);
    };
  }, [go]);

  if (!photos.length) return null;
  const current = photos[index];

  return (
    <>
      <ul className={styles.grid}>
        {photos.map((p, i) => (
          <li key={p.src}>
            <button type="button" className={styles.thumb} onClick={() => open(i)} aria-label={`${ui.open}: ${p.alt}`}>
              <Image src={p.src} alt="" fill sizes="(min-width: 900px) 30vw, 50vw" />
            </button>
          </li>
        ))}
      </ul>

      <dialog ref={ref} className={styles.dialog} aria-label={current.alt}>
        <div className={styles.frame}>
          <div className={styles.imgWrap}>
            <Image key={current.src} src={current.src} alt={current.alt} fill sizes="90vw" className={styles.img} />
          </div>
          <p className={styles.caption}>
            <span className="meta">
              {index + 1} / {photos.length}
            </span>{" "}
            {current.caption ?? current.alt}
          </p>
          <div className={styles.controls}>
            {photos.length > 1 && (
              <>
                <button type="button" onClick={() => go(-1)} aria-label={ui.prev}>
                  <ChevronLeft size={22} aria-hidden />
                </button>
                <button type="button" onClick={() => go(1)} aria-label={ui.next}>
                  <ChevronRight size={22} aria-hidden />
                </button>
              </>
            )}
            <button type="button" onClick={() => ref.current?.close()} aria-label={ui.close}>
              <X size={22} aria-hidden />
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
