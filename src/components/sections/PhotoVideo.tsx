"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Play, X } from "lucide-react";
import styles from "./About.module.css";

/**
 * A video in the photo grid: the poster fills the cell with a big play button
 * in the middle. Clicking opens it in a dialog, large and playing; closing
 * (button, Esc or backdrop) pauses it.
 */
export function PhotoVideo({ src, poster, alt, closeLabel }: { src: string; poster: string; alt: string; closeLabel: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  const open = () => {
    dialog.current?.showModal();
    video.current?.play().catch(() => {});
  };
  const close = () => {
    video.current?.pause();
    dialog.current?.close();
  };

  // However it closes (button, Esc, backdrop), the video stops.
  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const stop = () => video.current?.pause();
    d.addEventListener("close", stop);
    d.addEventListener("cancel", stop); // Esc
    return () => {
      d.removeEventListener("close", stop);
      d.removeEventListener("cancel", stop);
    };
  }, []);

  return (
    <>
      <button type="button" className={styles.playCell} onClick={open} aria-label={alt}>
        <Image src={poster} alt="" fill sizes="(min-width: 900px) 33vw, 90vw" />
        <span className={styles.playBtn} aria-hidden>
          <Play size={26} fill="currentColor" />
        </span>
      </button>

      <dialog
        ref={dialog}
        className={styles.player}
        aria-label={alt}
        onClick={(e) => e.target === dialog.current && close()}
      >
        <button type="button" className={styles.playerClose} onClick={close} aria-label={closeLabel}>
          <X size={18} aria-hidden />
        </button>
        <video ref={video} src={src} poster={poster} controls playsInline preload="none" />
      </dialog>
    </>
  );
}
