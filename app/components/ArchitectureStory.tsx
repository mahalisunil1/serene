"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Sparkles, Heart, Sun, Waves, Compass, ShieldCheck } from "lucide-react";
import GooeyTextReveal from "@/components/ui/gooey-text-reveal";
import ParallaxImage from "./ParallaxImage";

gsap.registerPlugin(ScrollTrigger);

export default function ArchitectureStory() {
  const [activeView, setActiveView] = useState<"salon" | "spa">("salon");
  const sectionRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const floatingStampRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const sec = sectionRef.current;
      if (!sec) return;

      // Staggered parallax translation for right-column cards
      if (card1Ref.current && card2Ref.current && card3Ref.current) {
        gsap.fromTo(
          card1Ref.current,
          { y: 30 },
          {
            y: -20,
            ease: "none",
            scrollTrigger: {
              trigger: sec,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          }
        );

        gsap.fromTo(
          card2Ref.current,
          { y: 15 },
          {
            y: -10,
            ease: "none",
            scrollTrigger: {
              trigger: sec,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          }
        );

        gsap.fromTo(
          card3Ref.current,
          { y: 0 },
          {
            y: -35,
            ease: "none",
            scrollTrigger: {
              trigger: sec,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          }
        );
      }

      // Floating accession stamp parallax lift
      if (floatingStampRef.current) {
        gsap.fromTo(
          floatingStampRef.current,
          { y: 40 },
          {
            y: -40,
            ease: "none",
            scrollTrigger: {
              trigger: sec,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="heritage"
      className="relative py-16 sm:py-20 md:py-24 px-6 md:px-12 bg-[#ede7de] border-t border-[rgba(17,19,23,0.1)] overflow-hidden"
    >
      {/* Background Coordinate Watermark */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 -left-20 -translate-y-1/2 pointer-events-none select-none text-[#111317] opacity-[0.035] font-serif text-[14vw] font-light leading-none tracking-tighter whitespace-nowrap"
      >
        SANCTUARY HERITAGE
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
          <div>
            <div className="flex items-center space-x-2 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#8c7b68] font-mono mb-3 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Sanctuary Story</span>
            </div>
            <GooeyTextReveal mode="scroll" splitBy="words" start="top 85%" duration={1.6} stagger={0.08}>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#14161b] font-light tracking-tight leading-tight">
                A Philosophy of <br />
                <span className="italic font-normal text-[#8c7b68]">Silence & Coastal Grace</span>
              </h2>
            </GooeyTextReveal>
          </div>
          <GooeyTextReveal mode="scroll" start="top 80%" duration={1.4} delay={0.2}>
            <p className="max-w-md text-sm sm:text-base text-[#4a4740] leading-relaxed font-light">
              Conceived as an intimate refuge on Puri&apos;s sacred shoreline, Hotel Serene balances
              classical symmetry with the mindful quietude and eternal rhythm of the Bay of Bengal.
            </p>
          </GooeyTextReveal>
        </div>

        {/* Interactive Sanctuary Lifestyle Viewer with Parallax Depth */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Lifestyle Visual with Parallax Depth */}
          <div className="lg:col-span-7 relative group rounded-2xl overflow-hidden p-3 bg-[#f4efe6] border border-[rgba(17,19,23,0.12)] shadow-xl">
            <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#f8f5ef]">
              <ParallaxImage
                src={activeView === "salon" ? "/images/hotel/reception-lounge-alt.jpg" : "/images/hotel/suite-bathroom.jpg"}
                alt="Hotel Serene Luxury Atmosphere"
                speed={0.15}
                scale={1.14}
                className="w-full h-full"
                imageClassName="p-0 filter brightness-[0.98] contrast-[1.05]"
                objectFit="cover"
              />

              {/* Floating Dimension Tag */}
              <div
                ref={floatingStampRef}
                className="absolute top-4 left-4 bg-[#ede7de]/95 backdrop-blur-md px-3.5 py-2 rounded-xl text-[10px] font-mono uppercase text-[#14161b] tracking-widest border border-[rgba(17,19,23,0.14)] font-semibold shadow-md flex items-center gap-2 will-change-transform"
              >
                <Compass className="w-3 h-3 text-[#8c7b68]" />
                <span>HOTEL SERENE • SACRED COASTAL RETREAT</span>
              </div>

              {/* View Switcher Bar */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-center z-20">
                <div className="bg-[#ede7de]/95 backdrop-blur-md p-1.5 rounded-xl flex space-x-2 border border-[rgba(17,19,23,0.12)] shadow-lg">
                  <button
                    onClick={() => setActiveView("salon")}
                    className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                      activeView === "salon"
                        ? "bg-[#14161b] text-[#ede7de] font-semibold shadow-sm"
                        : "text-[#5e5b54] hover:text-[#14161b]"
                    }`}
                  >
                    Arrival Salon
                  </button>
                  <button
                    onClick={() => setActiveView("spa")}
                    className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                      activeView === "spa"
                        ? "bg-[#14161b] text-[#ede7de] font-semibold shadow-sm"
                        : "text-[#5e5b54] hover:text-[#14161b]"
                    }`}
                  >
                    Master Spa Bath
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Pillars of Hospitality (Staggered Parallax Depth) */}
          <div className="lg:col-span-5 flex flex-col space-y-5">
            <div
              ref={card1Ref}
              className="p-5 sm:p-6 rounded-2xl border border-[rgba(17,19,23,0.08)] bg-[#f4efe6] shadow-sm hover:shadow-md transition-shadow will-change-transform"
            >
              <div className="flex items-center space-x-3 mb-2.5">
                <div className="w-8 h-8 rounded-full bg-[#14161b]/5 flex items-center justify-center text-[#14161b]">
                  <Waves className="w-4 h-4 text-[#8c7b68]" />
                </div>
                <h3 className="font-serif text-lg sm:text-xl text-[#14161b] font-light">Sacred Coastal Stillness</h3>
              </div>
              <p className="text-xs sm:text-sm text-[#4a4740] leading-relaxed font-light">
                Positioned to embrace the morning ocean breezes and the gentle spiritual resonance of Puri Dham, every space invites slow contemplation and restorative quietude.
              </p>
            </div>

            <div
              ref={card2Ref}
              className="p-5 sm:p-6 rounded-2xl border border-[rgba(17,19,23,0.08)] bg-[#f4efe6] shadow-sm hover:shadow-md transition-shadow will-change-transform"
            >
              <div className="flex items-center space-x-3 mb-2.5">
                <div className="w-8 h-8 rounded-full bg-[#14161b]/5 flex items-center justify-center text-[#14161b]">
                  <Sun className="w-4 h-4 text-[#8c7b68]" />
                </div>
                <h3 className="font-serif text-lg sm:text-xl text-[#14161b] font-light">Handcrafted Organic Textures</h3>
              </div>
              <p className="text-xs sm:text-sm text-[#4a4740] leading-relaxed font-light">
                Bleached oak millwork, hand-painted monochrome ceramics, fluted boiserie, and tactile natural stones evoke the sunlit sand and coastal driftwood of the shoreline.
              </p>
            </div>

            <div
              ref={card3Ref}
              className="p-5 sm:p-6 rounded-2xl border border-[rgba(17,19,23,0.08)] bg-[#f4efe6] shadow-sm hover:shadow-md transition-shadow will-change-transform"
            >
              <div className="flex items-center space-x-3 mb-2.5">
                <div className="w-8 h-8 rounded-full bg-[#14161b]/5 flex items-center justify-center text-[#14161b]">
                  <Heart className="w-4 h-4 text-[#8c7b68]" />
                </div>
                <h3 className="font-serif text-lg sm:text-xl text-[#14161b] font-light">Private Butler & Concierge</h3>
              </div>
              <p className="text-xs sm:text-sm text-[#4a4740] leading-relaxed font-light">
                From curated sunrise temple visits with certified Sevayat guidance to private champagne dining on the rooftop terrace, every journey is personally orchestrated.
              </p>
            </div>

            {/* Hospitality Highlights Matrix */}
            <div className="grid grid-cols-3 gap-3 pt-1 text-center">
              <div className="p-3 rounded-xl border border-[rgba(17,19,23,0.08)] bg-[#f4efe6] shadow-xs">
                <span className="block text-lg sm:text-xl font-serif text-[#14161b]">Oceanfront</span>
                <span className="text-[9px] uppercase tracking-wider text-[#7a6e5d] font-mono">Bay of Bengal</span>
              </div>
              <div className="p-3 rounded-xl border border-[rgba(17,19,23,0.08)] bg-[#f4efe6] shadow-xs">
                <span className="block text-lg sm:text-xl font-serif text-[#14161b]">Bespoke</span>
                <span className="text-[9px] uppercase tracking-wider text-[#7a6e5d] font-mono">Butler Care</span>
              </div>
              <div className="p-3 rounded-xl border border-[rgba(17,19,23,0.08)] bg-[#f4efe6] shadow-xs">
                <span className="block text-lg sm:text-xl font-serif text-[#14161b]">Sky Pool</span>
                <span className="text-[9px] uppercase tracking-wider text-[#7a6e5d] font-mono">Terrace Sanctuary</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
