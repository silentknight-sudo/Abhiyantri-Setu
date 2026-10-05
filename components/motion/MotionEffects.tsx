"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/*
  Site-wide scroll + 3D effects without touching each page's markup:
  - every <section> (and anything marked data-reveal) rises into view with a 3D flip
  - cards marked .tilt-3d, plus card-like links/boxes inside sections, tilt toward the pointer
  Respects prefers-reduced-motion and skips touch devices for tilt.
*/
const CARD_SELECTOR = [
  ".tilt-3d",
  "section a.rounded-2xl",
  "section a.rounded-xl",
  "section div.rounded-2xl.border",
  "section div.rounded-3xl",
  "main a.rounded-2xl",
].join(",");

export default function MotionEffects() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // ── Scroll reveal
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("body section, [data-reveal]")
    ).filter((el) => !el.closest("[data-no-reveal]") && !el.dataset.revealed);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach((el) => {
      el.dataset.revealed = "1";
      const r = el.getBoundingClientRect();
      // Content already on screen at load stays put (no flash)
      if (r.top < window.innerHeight * 0.9) return;
      el.classList.add("reveal-3d");
      io.observe(el);
    });

    // ── Pointer tilt
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cleanups: (() => void)[] = [];
    if (canHover) {
      document.querySelectorAll<HTMLElement>(CARD_SELECTOR).forEach((card) => {
        if (card.dataset.tilt || card.closest("[data-no-tilt]")) return;
        const rect0 = card.getBoundingClientRect();
        if (rect0.width > 720 || rect0.height > 640) return; // skip big panels
        card.dataset.tilt = "1";
        card.classList.add("tilt-ready");
        let frame = 0;
        const move = (e: PointerEvent) => {
          cancelAnimationFrame(frame);
          frame = requestAnimationFrame(() => {
            const r = card.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            card.style.transform = `perspective(900px) rotateX(${(-py * 8).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg) translateZ(6px)`;
            card.style.setProperty("--gx", `${(px + 0.5) * 100}%`);
            card.style.setProperty("--gy", `${(py + 0.5) * 100}%`);
          });
        };
        const leave = () => {
          cancelAnimationFrame(frame);
          card.style.transform = "";
        };
        card.addEventListener("pointermove", move);
        card.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          card.removeEventListener("pointermove", move);
          card.removeEventListener("pointerleave", leave);
          delete card.dataset.tilt;
        });
      });
    }

    return () => {
      io.disconnect();
      cleanups.forEach((fn) => fn());
    };
  }, [pathname]);

  return null;
}
