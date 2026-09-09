"use client";

import { useRef, useState } from "react";
import { ArrowRight, Sparkles, Compass } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import GooeyTextReveal from "@/components/ui/gooey-text-reveal";

gsap.registerPlugin(ScrollTrigger);

export default function MersiStatement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeChapter, setActiveChapter] = useState(0);

  const chapters = [
    {
      num: "01",
      tag: "THE MONOGRAPH MANIFESTO",
      title: "Silence & Classical Symmetry",
      quote: "Conceived by Reflections by Ankita, where European neoclassical order yields to the sacred stillness of the Bay of Bengal.",
      subtext: "Structure B+G+5 • Fluted Corinthian Orders • Puri Coastline",
    },
    {
      num: "02",
      tag: "MATERIAL PROVENANCE",
      title: "Carved from Sacred Coastal Stone",
      quote: "Bleached oak joinery, Lingraj natural stone, and Italian Calacatta marble converge in pure, quiet tactile elegance.",
      subtext: "Natural Minerals • Hand-Painted Ceramic Museum Wall • Lingraj Granite",
    },
    {
      num: "03",
      tag: "THE SANCTUARY PROMISE",
      title: "Where Sacred Geometry Meets Infinity",
      quote: "A timeless haven where morning temple bells meet the eternal whisper of ocean tides.",
      subtext: "Blue Flag Beach 450m • Rooftop Striped Lap Pool • 30-Seater Gastronomic Atelier",
    },
  ];

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      // ScrollTrigger to track scrub progress across 3 chapters
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress < 0.33) {
            setActiveChapter(0);
          } else if (progress < 0.68) {
            setActiveChapter(1);
          } else {
            setActiveChapter(2);
          }
        },
      });
    },
    { scope: containerRef }
  );

  const current = chapters[activeChapter];

  return (
    <section
      id="statement"
      ref={containerRef}
      className="relative h-[260vh] bg-[#14161b] text-[#f7f4ee] overflow-visible"
    >
      {/* Pinned Full-Viewport Stage */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-12 px-6 md:px-16 overflow-hidden">
        {/* Background Atmospheric Lighting & Geometry */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(197,168,128,0.12)_0%,transparent_70%)] rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(#c5a880_1px,transparent_1px)] [background-size:40px_40px] opacity-10" />
        </div>

        {/* Top Status Header */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between pb-6 border-b border-white/10 text-xs font-mono">
          <div className="flex items-center space-x-3 text-[#c5a880]">
            <Compass className="w-4 h-4 animate-spin-slow" />
            <span className="uppercase tracking-[0.3em] font-semibold">
              The Pinned Manifesto • Chapter {current.num} of 03
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {[0, 1, 2].map((idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  activeChapter === idx ? "w-8 bg-[#c5a880]" : "w-2 bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Center: Monumental Scrubbed Liquid Gooey Typography Stage */}
        <div className="relative z-10 max-w-5xl mx-auto w-full my-auto text-center py-8">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/5 border border-[#c5a880]/30 text-[#c5a880] text-[10px] font-mono uppercase tracking-[0.3em] mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{current.tag}</span>
          </div>

          {/* Keyed Gooey Reveal that melts between chapters */}
          <div key={`title-${activeChapter}`} className="mb-6">
            <GooeyTextReveal
              mode="immediate"
              splitBy="words"
              duration={1.4}
              stagger={0.06}
              blurAmount={0.55}
            >
              <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-light tracking-tight leading-[1.05]">
                {current.title}
              </h2>
            </GooeyTextReveal>
          </div>

          <div key={`quote-${activeChapter}`} className="max-w-2xl mx-auto mb-8">
            <GooeyTextReveal
              mode="immediate"
              splitBy="words"
              duration={1.2}
              delay={0.15}
              stagger={0.04}
              blurAmount={0.35}
            >
              <p className="text-sm sm:text-lg text-white/80 font-serif italic leading-relaxed font-light">
                &ldquo;{current.quote}&rdquo;
              </p>
            </GooeyTextReveal>
          </div>

          {/* Subtext provenance tag */}
          <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#c5a880]/90">
            ✦ {current.subtext}
          </div>
        </div>

        {/* Bottom Interactive Navigation */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono uppercase tracking-[0.25em] text-white/50 pt-6 border-t border-white/10 gap-4">
          <div>Scrub scrollbar to morph through chapters</div>
          <a
            href="#architecture"
            className="text-[#c5a880] hover:text-white transition-colors flex items-center space-x-2"
          >
            <span>Explore Building Anatomy</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <div>Reflections by Ankita • 2026</div>
        </div>
      </div>
    </section>
  );
}
