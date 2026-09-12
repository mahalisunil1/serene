"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Sparkles } from "lucide-react";
import GooeyTextReveal from "@/components/ui/gooey-text-reveal";

gsap.registerPlugin(ScrollTrigger);

export default function MersiStatement() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
  const [statementTl, setStatementTl] = useState<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const content = contentRef.current;
      const image = imageRef.current;
      const badge = badgeRef.current;
      const line = lineRef.current;
      const subtext = subtextRef.current;

      if (!section || !image) return;

      // ── SINGLE UNIFIED PINNED MASTER TIMELINE ─────────────────────────
      // scrub: 0.8 provides buttery smooth GSAP inertia with Lenis.
      // anticipatePin: 0 prevents any premature pinning jumps.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=120%",
          scrub: 0.8,
          pin: true,
          pinSpacing: true,
          anticipatePin: 0,
          invalidateOnRefresh: true,
        },
      });

      // 1. Slow, velvety cinematic drift on background image during pinned state
      tl.fromTo(
        image,
        { scale: 1.05, yPercent: -3 },
        { scale: 1.15, yPercent: 4, ease: "none", duration: 1.0 },
        0
      );

      // 2. Badge softly clarifies as pinning settles (0.0 -> 0.12)
      if (badge) {
        tl.fromTo(
          badge,
          { opacity: 0.2, y: 12, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, ease: "power2.out", duration: 0.12 },
          0
        );
      }

      // NOTE: GooeyTextReveal is inserted from 0.0 to 0.65
      // Giving each word a slow, gorgeous liquid melt across deliberate scroll wheel strokes.

      // 3. Gold hairline draws outward from center as quote crystallizes (0.64 -> 0.76)
      if (line) {
        tl.fromTo(
          line,
          { scaleX: 0, transformOrigin: "center center" },
          { scaleX: 1, ease: "power2.out", duration: 0.12 },
          0.64
        );
      }

      // 4. Subtitle emerges gracefully (0.68 -> 0.78)
      if (subtext) {
        tl.fromTo(
          subtext,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, ease: "power2.out", duration: 0.10 },
          0.68
        );
      }

      // 5. Exit Transition Hand-off (0.80 -> 1.00):
      // Foreground quote content gently glides upward and softens, establishing
      // uninterrupted upward momentum that flows directly into the unpinning
      // and handover to SpatialJourney.
      if (content) {
        tl.to(
          content,
          { y: -32, opacity: 0.85, ease: "power1.in", duration: 0.20 },
          0.80
        );
      }

      setStatementTl(tl);

      return () => {
        tl.kill();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="statement"
      ref={sectionRef}
      className="relative h-screen min-h-[640px] w-full overflow-hidden bg-[#0a0b0d] flex items-center justify-center select-none"
    >
      {/* ── Parallax Background Image ──────────────────────────────────── */}
      <div
        ref={imageRef}
        className="absolute -top-[20%] left-0 w-full h-[140%] will-change-transform z-0"
      >
        <Image
          src="/images/hotel/reception-lounge.jpg"
          alt="Serene Reception Lounge"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* ── Atmospheric Overlays ───────────────────────────────────────── */}
      <div className="absolute inset-0 z-10 bg-black/45 pointer-events-none" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0a0b0d]/95 via-transparent to-[#0a0b0d]/95 pointer-events-none" />

      {/* ── Foreground Content ─────────────────────────────────────────── */}
      <div ref={contentRef} className="relative z-20 max-w-5xl mx-auto w-full px-6 text-center will-change-transform">
        <div
          ref={badgeRef}
          className="inline-flex items-center justify-center space-x-2 px-4 py-1.5 rounded-full bg-white/5 border border-[#c5a880]/30 text-[#c5a880] text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] mb-8 backdrop-blur-sm shadow-xl will-change-transform"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Serene Philosophy</span>
        </div>

        <GooeyTextReveal
          timeline={statementTl}
          timelineStart={0.0}
          timelineDuration={0.65}
          splitBy="words"
          blurAmount={0.38}
          ease="power2.out"
        >
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-light tracking-tight leading-[1.3] max-w-4xl mx-auto italic overflow-visible">
            &ldquo;Where timeless coastal tranquility meets the{" "}
            <span
              className="font-script text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-[#c5a880] not-italic px-1 font-normal drop-shadow-[0_2px_16px_rgba(197,168,128,0.4)]"
              style={{ fontFamily: "var(--font-script), 'Great Vibes', cursive" }}
            >
              sacred stillness
            </span>{" "}
            of the Bay of Bengal.&rdquo;
          </h2>
        </GooeyTextReveal>

        <div className="mt-8 flex justify-center">
          <div
            ref={lineRef}
            className="h-[1px] w-28 bg-gradient-to-r from-transparent via-[#c5a880] to-transparent opacity-80 will-change-transform"
          />
        </div>

        <p
          ref={subtextRef}
          className="mt-5 text-[10px] sm:text-xs font-mono uppercase tracking-[0.4em] text-[#c5a880]/80 will-change-transform"
        >
          Hotel Serene • Puri Sanctuary
        </p>
      </div>
    </section>
  );
}
