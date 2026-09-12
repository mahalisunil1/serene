"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Sun, Moon, Maximize2, Waves, ArrowUpRight } from "lucide-react";
import GooeyTextReveal from "@/components/ui/gooey-text-reveal";
import { LightboxImage } from "./ImageLightbox";
import ParallaxImage from "./ParallaxImage";

gsap.registerPlugin(ScrollTrigger);

interface RooftopSanctuaryProps {
  onOpenLightbox?: (images: LightboxImage[], index: number) => void;
  onOpenBooking?: () => void;
}

export default function RooftopSanctuary({ onOpenLightbox, onOpenBooking }: RooftopSanctuaryProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const specsCardRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<"pool" | "pergola">("pool");
  const [ambientMood, setAmbientMood] = useState<"day" | "sunset">("day");

  const tabData = {
    pool: {
      tag: "SIGNATURE SKY SANCTUARY",
      title: "Striped Nautical Lap Pool & Waterfall",
      image: "/images/hotel/rooftop-pool.jpg",
      elevation: "OPEN HORIZON • BAY OF BENGAL",
      caption: "SIGNATURE STRIPED NAUTICAL MOSAIC • SHEER DESCENT WATERFALL",
      description:
        "Featuring a striking nautical navy-and-white striped porcelain tile pattern with submerged entrance steps and an integrated sheer descent acoustic waterfall wall framed by tranquil sea horizons.",
      specs: [
        { label: "Pool Design", val: "Navy & White Striped Vitrified Porcelain" },
        { label: "Water Feature", val: "Integrated Sheer Descent Acoustic Waterfall Wall" },
        { label: "Basking Deck", val: "Teak Sun Loungers & Private Resident Service" },
        { label: "Night Ambiance", val: "Submerged Underwater Architectural Glow" },
      ],
      schedule: "Pool Hours: 06:00 AM – 10:00 PM • Exclusively for Hotel Residents",
    },
    pergola: {
      tag: "SHADED SKY RETREAT",
      title: "The Glasshouse Pergola Sky Lounge",
      image: "/images/hotel/pergola-lounge.jpg",
      elevation: "ALL-WEATHER SKY RETREAT",
      caption: "ALL-WEATHER GLASS CANOPY • SCALLOPED RAFTERS & MOROCCAN TILE FLOOR",
      description:
        "Protected by an all-weather clear glass canopy with comfortable nautical striped outdoor sofas, warm lantern sconces, and panoramic sea vistas.",
      specs: [
        { label: "Canopy", val: "Tempered Clear Glass Canopy with Coastal Shade" },
        { label: "Floor Detail", val: "Artisanal Portuguese Motif Vitrified Ceramic" },
        { label: "Cocktail Bar", val: "Sunset Coastal Cocktails & High Tea Service" },
        { label: "Lighting", val: "Candlelit Carriage Lantern Sconces" },
      ],
      schedule: "Sunset High Tea & Evening Cocktails: 04:30 PM – 10:30 PM",
    },
  };

  const current = tabData[activeTab];

  useGSAP(
    () => {
      const sec = sectionRef.current;
      const wm = watermarkRef.current;
      const specs = specsCardRef.current;
      if (!sec) return;

      if (wm) {
        gsap.to(wm, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: sec,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      }

      if (specs) {
        gsap.fromTo(
          specs,
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
      }
    },
    { scope: sectionRef }
  );

  const handleOpenRooftopLightbox = () => {
    if (!onOpenLightbox) return;
    const galleryItems: LightboxImage[] = Object.values(tabData).map((t) => ({
      src: t.image,
      alt: t.title,
      title: t.title,
      subtitle: t.description,
      provenance: t.tag,
    }));
    const index = Object.keys(tabData).indexOf(activeTab);
    onOpenLightbox(galleryItems, index >= 0 ? index : 0);
  };

  return (
    <section
      ref={sectionRef}
      id="rooftop"
      className="py-16 sm:py-20 md:py-24 px-6 md:px-12 bg-[#f7f4ee] border-t border-[rgba(20,22,27,0.08)] relative overflow-hidden"
    >
      {/* Deep Background Horizon Watermark Drift */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="absolute top-1/4 -left-20 pointer-events-none select-none text-[#14161b] opacity-[0.035] font-serif text-[18vw] font-light leading-none tracking-tighter whitespace-nowrap will-change-transform"
      >
        SKY SANCTUARY
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6 pb-6 border-b border-[rgba(20,22,27,0.08)]">
          <div>
            <div className="flex items-center space-x-2 text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-[#b58d5b] mb-3 font-semibold">
              <Waves className="w-3.5 h-3.5" />
              <span>The Sky Sanctuary • Ocean Horizon</span>
            </div>
            <GooeyTextReveal mode="scrub" pin={true} splitBy="words" stagger={0.06} blurAmount={0.5}>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#14161b] font-light tracking-tight leading-tight">
                Rooftop Striped Pool <br />
                <span className="italic font-normal text-[#b58d5b]">& Pergola Sky Lounge</span>
              </h2>
            </GooeyTextReveal>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
            {/* Day / Sunset Ambience Switcher */}
            <div className="p-1 rounded-xl bg-white border border-[rgba(20,22,27,0.1)] flex items-center space-x-1 text-xs font-mono shadow-xs">
              <button
                onClick={() => setAmbientMood("day")}
                className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all cursor-pointer ${
                  ambientMood === "day"
                    ? "bg-[#14161b] text-white font-semibold"
                    : "text-[#5a5750] hover:text-[#14161b]"
                }`}
              >
                <Sun className="w-3.5 h-3.5 text-[#c5a880]" />
                <span>Day Pool</span>
              </button>
              <button
                onClick={() => setAmbientMood("sunset")}
                className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all cursor-pointer ${
                  ambientMood === "sunset"
                    ? "bg-[#14161b] text-white font-semibold"
                    : "text-[#5a5750] hover:text-[#14161b]"
                }`}
              >
                <Moon className="w-3.5 h-3.5 text-[#c5a880]" />
                <span>Sunset Glow</span>
              </button>
            </div>

            <GooeyTextReveal mode="scroll" start="top 80%" duration={1.4} delay={0.15}>
              <p className="max-w-sm text-xs text-[#5a5750] font-mono leading-relaxed">
                Perched high above the shoreline, the terrace commands uninterrupted sea breezes where nautical geometry meets the sacred horizon.
              </p>
            </GooeyTextReveal>
          </div>
        </div>

        {/* Tab Selectors */}
        <div className="flex flex-wrap gap-2.5 mb-10">
          {(["pool", "pergola"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 rounded-xl text-xs font-mono transition-all cursor-pointer flex items-center space-x-2 ${
                activeTab === tab
                  ? "bg-[#14161b] text-white shadow-md ring-2 ring-[#c5a880]/40 font-semibold"
                  : "bg-white hover:bg-[#f2ece1] text-[#5a5750] border border-[rgba(20,22,27,0.08)] shadow-xs"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${activeTab === tab ? "bg-[#c5a880]" : "bg-gray-300"}`} />
              <span>
                {tab === "pool" ? "Nautical Lap Pool" : "Pergola Sky Lounge"}
              </span>
            </button>
          ))}
        </div>

        {/* Main Display Stage with Parallax Depth */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: High-Resolution Photo Display with Parallax Window */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            <div className="relative aspect-[16/11] w-full rounded-2xl overflow-hidden bg-white border border-[rgba(20,22,27,0.1)] shadow-xl group">
              <ParallaxImage
                src={current.image}
                alt={current.title}
                speed={0.18}
                scale={1.16}
                className="w-full h-full"
                imageClassName={`transition-all duration-700 filter ${
                  ambientMood === "sunset"
                    ? "brightness-[0.92] contrast-[1.12] sepia-[0.25]"
                    : "brightness-[0.98] contrast-[1.05]"
                }`}
                priority
              />

              {/* Floating Badges */}
              <div className="absolute top-4 left-4 flex gap-2 z-20">
                <span className="px-3 py-1 rounded-full bg-[#14161b]/85 backdrop-blur-md text-white text-[10px] font-mono uppercase tracking-wider shadow-sm">
                  {current.elevation}
                </span>
                {ambientMood === "sunset" && (
                  <span className="px-3 py-1 rounded-full bg-[#b58d5b] text-white text-[10px] font-mono uppercase tracking-wider shadow-sm">
                    Sunset Mood
                  </span>
                )}
              </div>

              {/* Lightbox Trigger */}
              <button
                onClick={handleOpenRooftopLightbox}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 hover:bg-[#14161b] text-[#14161b] hover:text-white backdrop-blur-md transition-all shadow-md cursor-pointer z-20"
                title="View Full Resolution"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Bottom Caption Pill */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-white/95 backdrop-blur-md border border-[rgba(20,22,27,0.08)] flex justify-between items-center shadow-lg z-20">
                <div>
                  <h4 className="font-serif text-sm text-[#14161b] font-medium">
                    {current.title}
                  </h4>
                  <p className="text-[10px] font-mono text-[#5a5750]">
                    {current.schedule}
                  </p>
                </div>
                <button
                  onClick={handleOpenRooftopLightbox}
                  className="px-3 py-1 rounded-lg bg-[#14161b] text-white text-[9px] font-mono uppercase tracking-wider cursor-pointer"
                >
                  Enlarge
                </button>
              </div>
            </div>
          </div>

          {/* Right: Technical Specifications & Experiences Card with Parallax Drift */}
          <div
            ref={specsCardRef}
            className="lg:col-span-5 flex flex-col space-y-6 will-change-transform"
          >
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[rgba(20,22,27,0.1)] shadow-xl space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#b58d5b] font-semibold block mb-1">
                  {current.tag}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#14161b] font-light mb-2">
                  {current.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5a5750] leading-relaxed font-light">
                  {current.description}
                </p>
              </div>

              {/* Specifications Matrix */}
              <div className="space-y-2 pt-4 border-t border-[rgba(20,22,27,0.08)] font-mono text-xs">
                <span className="text-[10px] uppercase tracking-wider text-[#827e74] font-semibold block mb-2">
                  Sanctuary Amenities
                </span>
                {current.specs.map((spec, idx) => (
                  <div key={idx} className="flex justify-between items-center text-[11px] pb-1.5 border-b border-[rgba(20,22,27,0.04)] last:border-0">
                    <span className="text-[#827e74]">{spec.label}:</span>
                    <span className="text-[#14161b] font-medium text-right max-w-[65%]">{spec.val}</span>
                  </div>
                ))}
              </div>

              {/* Direct Inquiry Action */}
              <div className="pt-4 border-t border-[rgba(20,22,27,0.08)] flex items-center justify-between gap-3">
                <span className="text-xs font-mono text-[#827e74]">
                  Exclusive Access for Residents
                </span>
                <button
                  onClick={onOpenBooking}
                  className="px-6 py-3 rounded-xl bg-[#14161b] hover:bg-[#232730] text-[#f7f4ee] hover:text-white font-mono text-xs uppercase tracking-[0.18em] font-semibold transition-all shadow-md flex items-center space-x-2 cursor-pointer group"
                >
                  <span>Book Private Stay</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#c5a880] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
