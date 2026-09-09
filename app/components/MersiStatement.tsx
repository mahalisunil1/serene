"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Sparkles } from "lucide-react";
import GooeyTextReveal from "@/components/ui/gooey-text-reveal";

gsap.registerPlugin(ScrollTrigger);

export default function MersiStatement() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const image = imageRef.current;

      if (!section || !image) return;

      // Parallax effect on the background image
      gsap.to(image, {
        yPercent: 20, // Moves the image down as you scroll past
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom", // Start when the top of the section hits the bottom of the viewport
          end: "bottom top", // End when the bottom of the section hits the top of the viewport
          scrub: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="statement"
      ref={sectionRef}
      className="relative h-[85vh] min-h-[600px] w-full overflow-hidden bg-[#0a0b0d] flex items-center justify-center"
    >
      {/* ── Parallax Background Image ──────────────────────────────────── */}
      {/* The container is taller than the section (-top-20% and h-140%) 
          to give GSAP room to move it via yPercent without exposing edges. */}
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
      <div className="absolute inset-0 z-10 bg-black/40 pointer-events-none" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0a0b0d]/90 via-transparent to-[#0a0b0d]/90 pointer-events-none" />

      {/* ── Foreground Content ─────────────────────────────────────────── */}
      <div className="relative z-20 max-w-5xl mx-auto w-full px-6 text-center">
        <div className="inline-flex items-center justify-center space-x-2 px-4 py-1.5 rounded-full bg-white/5 border border-[#c5a880]/30 text-[#c5a880] text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] mb-8 backdrop-blur-sm shadow-xl">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Monograph Manifesto</span>
        </div>

        <GooeyTextReveal
          mode="scroll"
          splitBy="words"
          start="top 85%"
          duration={1.6}
          stagger={0.08}
          blurAmount={0.5}
          ease="power3.out"
        >
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-light tracking-tight leading-[1.2] max-w-4xl mx-auto italic">
            &ldquo;Where European neoclassical order yields to the sacred stillness of the Bay of Bengal.&rdquo;
          </h2>
        </GooeyTextReveal>

        <div className="mt-8 flex justify-center">
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#c5a880] to-transparent opacity-60" />
        </div>

        <p className="mt-5 text-[10px] sm:text-xs font-mono uppercase tracking-[0.4em] text-[#c5a880]/80">
          Reflections by Ankita
        </p>
      </div>
    </section>
  );
}
