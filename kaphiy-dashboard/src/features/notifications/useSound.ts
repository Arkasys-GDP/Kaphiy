"use client";

import { useCallback, useEffect } from "react";
import { useKaphiyStore } from "@/src/features/orders/store";

// Module-level state: shared across all hook instances.
// `unlocked` flips true after first user gesture (login click, settings open, etc.)
// because browsers block autoplay until user interaction.
let unlocked = false;

// Preloaded audio element — avoids re-fetching .ogg on every play.
let cached: HTMLAudioElement | null = null;

function getAudio(src: string): HTMLAudioElement {
  if (!cached || cached.src.indexOf(src) === -1) {
    cached = new Audio(src);
    cached.volume = 0.5;
    cached.preload = "auto";
  }
  return cached;
}

export function useSound() {
  const muted = useKaphiyStore((s) => s.muted);

  // Fallback unlock: any user pointer/key interaction enables sound.
  // Login may not fire if user already authenticated (token persisted).
  useEffect(() => {
    if (unlocked) return;
    const handler = () => {
      unlocked = true;
      window.removeEventListener("pointerdown", handler);
      window.removeEventListener("keydown", handler);
    };
    window.addEventListener("pointerdown", handler, { once: true });
    window.addEventListener("keydown", handler, { once: true });
    return () => {
      window.removeEventListener("pointerdown", handler);
      window.removeEventListener("keydown", handler);
    };
  }, []);

  const unlock = useCallback(() => {
    unlocked = true;
  }, []);

  const play = useCallback(
    (src: string) => {
      if (muted || !unlocked) return;
      try {
        const audio = getAudio(src);
        // Rewind so rapid successive orders all trigger sound.
        audio.currentTime = 0;
        void audio.play();
      } catch {
        // Browser may still reject — ignore.
      }
    },
    [muted],
  );

  const playNewOrder = useCallback(
    () => play("/sounds/new-order.ogg"),
    [play],
  );

  return { playNewOrder, unlock };
}
