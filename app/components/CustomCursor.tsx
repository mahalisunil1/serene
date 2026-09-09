"use client";

import { useEffect, useRef, useState } from "react";

const NUM_TRAIL = 7;

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const trailCoords = useRef(
    Array.from({ length: NUM_TRAIL }, () => ({ x: -100, y: -100 }))
  );

  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only activate on devices with a fine pointer (mouse/trackpad)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.documentElement.classList.add("custom-cursor-active");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let hasMoved = false;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!hasMoved) {
        hasMoved = true;
        ringX = mouseX;
        ringY = mouseY;
        for (let i = 0; i < NUM_TRAIL; i++) {
          trailCoords.current[i].x = mouseX;
          trailCoords.current[i].y = mouseY;
        }
        setIsVisible(true);
      }

      // Direct 1:1 instantaneous update for inner pinpoint dot (zero latency)
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        "a, button, [role='button'], input, select, textarea, [data-cursor], #dual-slider, #facade-scanner"
      );
      if (interactive) {
        setIsHovered(true);
        const text =
          interactive.getAttribute("data-cursor-text") ||
          (interactive.id === "dual-slider"
            ? "slide"
            : interactive.id === "facade-scanner"
            ? "scan"
            : "");
        setCursorText(text);
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
      hasMoved = false;
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    const render = () => {
      // 1. Snappy, agile tracing speed for the outer ring (0.38 lerp - smooth yet immediate)
      ringX += (mouseX - ringX) * 0.38;
      ringY += (mouseY - ringY) * 0.38;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      // 2. High-performance kinetic trailing tail (zero React re-renders, 120fps pure transform)
      let leaderX = mouseX;
      let leaderY = mouseY;

      for (let i = 0; i < NUM_TRAIL; i++) {
        const pt = trailCoords.current[i];
        // Fast progressive spring: first point tracks at 0.68, down to 0.32 at the tail
        const speed = 0.68 - i * 0.052;
        pt.x += (leaderX - pt.x) * speed;
        pt.y += (leaderY - pt.y) * speed;

        leaderX = pt.x;
        leaderY = pt.y;

        const el = trailRefs.current[i];
        if (el) {
          el.style.transform = `translate3d(${pt.x}px, ${pt.y}px, 0)`;
        }
      }

      animId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    animId = requestAnimationFrame(render);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {/* 1. Kinetic Responsive Trailing Beads (Hardware Accelerated) */}
      {Array.from({ length: NUM_TRAIL }).map((_, index) => {
        // Tapering scale and opacity from head to tail
        const ratio = (NUM_TRAIL - index) / NUM_TRAIL;
        const size = Math.max(2, Math.round(5.5 * ratio));
        const opacity = Math.max(0.12, 0.55 * ratio);

        return (
          <div
            key={index}
            ref={(el) => {
              trailRefs.current[index] = el;
            }}
            className="fixed top-0 left-0 rounded-full bg-[#c5a880] will-change-transform mix-blend-difference pointer-events-none"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              marginLeft: `-${size / 2}px`,
              marginTop: `-${size / 2}px`,
              opacity,
            }}
          />
        );
      })}

      {/* 2. Snappy Trailing Ring (Expands smoothly on interactive hover) */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 pointer-events-none flex items-center justify-center rounded-full will-change-transform transition-all duration-200 ease-out mix-blend-difference ${
          isHovered
            ? "w-16 h-16 -ml-8 -mt-8 border border-white bg-white/10 scale-110"
            : "w-8 h-8 -ml-4 -mt-4 border border-white/60"
        }`}
      >
        {cursorText && (
          <span className="text-[9px] font-mono lowercase tracking-[0.2em] text-white font-medium select-none">
            {cursorText}
          </span>
        )}
      </div>

      {/* 3. Instant Zero-Latency Center Dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-white will-change-transform mix-blend-difference pointer-events-none transition-transform duration-150 ${
          isHovered ? "scale-50 opacity-80" : "scale-100 opacity-100"
        }`}
      />
    </div>
  );
}
