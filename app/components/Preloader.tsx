"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const [hasDismissed, setHasDismissed] = useState(false);

  const dismiss = () => {
    if (hasDismissed) return;
    setHasDismissed(true);

    const tl = gsap.timeline({
      onComplete: () => {
        if (containerRef.current) {
          containerRef.current.style.display = "none";
        }
        onComplete();
      },
    });

    // Content gently dissolves
    tl.to(contentRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.3,
      ease: "power2.inOut",
    })
      // Pure warm alabaster veil slides up smoothly like fine silk
      .to(
        curtainRef.current,
        {
          yPercent: -100,
          duration: 0.8,
          ease: "power4.inOut",
        },
        "-=0.1"
      );
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Gentle text entrance
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );

      // Single silent luxury hairline progress sweep (0.65s)
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { width: "0%" },
          {
            width: "100%",
            duration: 0.65,
            ease: "power2.inOut",
            onComplete: () => {
              setTimeout(dismiss, 80);
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={dismiss}
      className="fixed inset-0 z-[99999] pointer-events-auto cursor-pointer select-none overflow-hidden"
    >
      {/* Warm Alabaster Silk Veil (Clean, Minimal, Pure) */}
      <div
        ref={curtainRef}
        className="absolute inset-0 bg-[#f7f4ee] flex flex-col items-center justify-center will-change-transform"
      >
        <div
          ref={contentRef}
          className="flex flex-col items-center text-center space-y-4 px-6 will-change-transform"
        >
          {/* Subtle Monogram Letter */}
          <span className="font-serif text-3xl font-light text-[#14161b] tracking-wider">
            S
          </span>

          {/* Master Hotel Title */}
          <h1 className="font-serif text-2xl sm:text-3xl tracking-[0.25em] text-[#14161b] font-light uppercase">
            Hotel Serene
          </h1>

          {/* Minimalist Subtitle */}
          <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#8c7b68]">
            Puri, Odisha • 19°48&apos;N
          </p>

          {/* Razor-thin Gold Hairline Progress */}
          <div className="w-36 sm:w-48 h-[1px] bg-[#14161b]/10 rounded-full overflow-hidden mt-4">
            <div
              ref={lineRef}
              className="h-full bg-[#b58d5b] rounded-full will-change-[width]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
