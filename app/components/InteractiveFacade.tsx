"use client";

import { useState } from "react";
import Image from "next/image";
import { Maximize2, Sparkles, Layers, ArrowUpRight, CheckCircle2 } from "lucide-react";
import GooeyTextReveal from "@/components/ui/gooey-text-reveal";
import { LightboxImage } from "./ImageLightbox";

interface InteractiveFacadeProps {
  onOpenBooking: () => void;
  onOpenLightbox?: (images: LightboxImage[], index: number) => void;
}

export default function InteractiveFacade({
  onOpenBooking,
  onOpenLightbox,
}: InteractiveFacadeProps) {
  const [selectedLevelId, setSelectedLevelId] = useState<string>("level-05");

  const levels = [
    {
      id: "level-06",
      label: "ROOFTOP",
      badge: "EL. +21.00 M",
      title: "Rooftop Sky Pool & Pergola Lounge",
      summary: "Signature nautical blue-and-white porcelain lap pool, sheer descent waterfall wall, and all-weather glass-roof Pergola Sky Lounge.",
      dimensions: "Full Terrace Span • 360° Ocean Panorama",
      renderImage: "/images/hotel/rooftop-pool.jpg",
      planImage: "/images/hotel/rooftop-plan.jpg",
      specs: ["Striped Porcelain Tile Pool", "Sheer Descent Acoustic Waterfall", "French Parapet Walls", "Lingraj Natural Stone Pavers"],
      topPercent: "0%",
      heightPercent: "15%",
    },
    {
      id: "level-05",
      label: "FLOOR 05",
      badge: "EL. +17.50 M",
      title: "Presidential Penthouse & Executive Suites",
      summary: "The pinnacle residence. Sprawling entertaining salon with Netflix console, master spa bath with freestanding tub, and dedicated 5th-floor gym.",
      dimensions: "1,150 sq. ft. Footprint • Private Terrace Balconies",
      renderImage: "/images/hotel/suite-504-living.jpg",
      planImage: "/images/hotel/floor-5-plan.jpg",
      specs: ["Master Freestanding Soaking Tub", "Private Guest Powder Room", "Curved Fluted Columns", "Sky Gymnasium with Sea Vista"],
      topPercent: "15%",
      heightPercent: "18%",
    },
    {
      id: "level-03",
      label: "FLOOR 03",
      badge: "EL. +10.50 M",
      title: "Family Recreation & Kids Atelier",
      summary: "Dedicated family recreation floor featuring an intimate play lounge, modular sofas, acoustic sliding glass partitions, and interconnected suites.",
      dimensions: "Dedicated Kids Atelier + Interconnected Chambers",
      renderImage: "/images/hotel/room-typical-render.jpg",
      planImage: "/images/hotel/playroom-plan.jpg",
      specs: ["Modular Soft Seating", "Acoustic Glass Sliding Door", "Smart Display Entertainment", "Family Quarters Interlink"],
      topPercent: "48%",
      heightPercent: "17%",
    },
    {
      id: "level-01-04",
      label: "FLOORS 01–04",
      badge: "EL. +3.50 M TO +14.00 M",
      title: "Deluxe Ocean Chambers (101–404)",
      summary: "The 103-series chambers. Whitewashed fluted oak millwork, arched black-frame vanity mirror, king bed, study station, and ensuite bath.",
      dimensions: "420 sq. ft. per Chamber • Soundproof Double Glazing",
      renderImage: "/images/hotel/room-typical-render.jpg",
      planImage: "/images/hotel/room-typical-plan.jpg",
      specs: ["Whitewashed Oak Fluting", "Tea & Coffee Study Bar", "Ceramic World Vitrified Porcelain", "Concealed 3000K Cove Lighting"],
      topPercent: "32%",
      heightPercent: "33%",
    },
    {
      id: "level-00",
      label: "GROUND",
      badge: "EL. ±0.00 M",
      title: "Grand Arrival Lobby & 30-Seater Restaurant",
      summary: "Double-height glass entrance frontage flanked by stainless steel glass balustrades. Features 3D geometric blue folded acoustic panels and 12' reception desk.",
      dimensions: "30'4\" Frontage • 457 sq. ft. Restaurant",
      renderImage: "/images/hotel/reception-lounge.jpg",
      planImage: "/images/hotel/reception-plan.jpg",
      specs: ["3D Geometric Blue Wall Panels", "12' Linear Reception Desk", "Cascading Pearl Chandelier", "Double-Height Glass Porch"],
      topPercent: "80%",
      heightPercent: "20%",
    },
  ];

  const currentLevel = levels.find((l) => l.id === selectedLevelId) || levels[1];

  const handleOpenElevationLightbox = () => {
    if (!onOpenLightbox) return;
    const galleryItems: LightboxImage[] = [
      {
        src: currentLevel.renderImage,
        alt: currentLevel.title,
        title: `${currentLevel.title} • Photography & Render`,
        subtitle: currentLevel.summary,
        provenance: currentLevel.badge,
      },
      {
        src: currentLevel.planImage,
        alt: `${currentLevel.title} Blueprint`,
        title: `${currentLevel.title} • Engineering CAD Drawing`,
        subtitle: currentLevel.dimensions,
        provenance: "Reflections by Ankita • Elevation Dossier",
      },
    ];
    onOpenLightbox(galleryItems, 0);
  };

  return (
    <section id="architecture" className="py-24 md:py-36 px-6 md:px-12 bg-[#f7f4ee] border-t border-[rgba(20,22,27,0.08)] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 pb-8 border-b border-[rgba(20,22,27,0.08)]">
          <div>
            <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-[0.3em] text-[#b58d5b] mb-3 font-semibold">
              <Layers className="w-3.5 h-3.5" />
              <span>Interactive Building Explorer</span>
            </div>
            <GooeyTextReveal mode="scroll" splitBy="words" start="top 85%" duration={1.6} stagger={0.08}>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#14161b] font-light tracking-tight">
                Vertical Architecture <br />
                <span className="italic font-normal text-[#b58d5b]">& Elevation Anatomy</span>
              </h2>
            </GooeyTextReveal>
          </div>
          <p className="max-w-md text-xs text-[#5a5750] font-mono leading-relaxed">
            Click on any tier of the B+G+5 neoclassical facade to inspect the architectural floor plans, ceiling heights, and interior vignettes designed by Reflections by Ankita.
          </p>
        </div>

        {/* Interactive Facade Scanner Arena */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Interactive Neoclassical Building Elevation Board */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full rounded-2xl overflow-hidden bg-white border border-[rgba(20,22,27,0.1)] shadow-xl p-3">
              {/* High-Resolution Neoclassical Architectural Facade Image */}
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <Image
                  src="/images/hotel/exterior-facade.jpg"
                  alt="Hotel Serene Neoclassical Elevation B+G+5"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-contain filter brightness-[0.98] contrast-[1.05]"
                  priority
                />

                {/* Interactive Glowing Floor Tiers Overlay */}
                {levels.map((level) => {
                  const isSelected = selectedLevelId === level.id;
                  return (
                    <div
                      key={level.id}
                      onClick={() => setSelectedLevelId(level.id)}
                      style={{
                        top: level.topPercent,
                        height: level.heightPercent,
                      }}
                      className={`absolute left-0 right-0 cursor-pointer transition-all duration-300 border-y ${
                        isSelected
                          ? "bg-[#c5a880]/30 border-[#c5a880] shadow-[0_0_20px_rgba(197,168,128,0.4)]"
                          : "bg-transparent border-transparent hover:bg-black/5 hover:border-black/10"
                      }`}
                    >
                      <span
                        className={`absolute left-3 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded-full text-[9px] font-mono font-semibold tracking-wider transition-all ${
                          isSelected
                            ? "bg-[#14161b] text-white shadow-sm"
                            : "bg-white/80 text-[#5a5750] opacity-80"
                        }`}
                      >
                        {level.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Status Pill */}
              <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-mono uppercase text-[#14161b] tracking-wider border border-[rgba(20,22,27,0.08)] shadow-xs">
                Structure B+G+5 • Elevation A2
              </div>
            </div>

            {/* Level Selector Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {levels.map((lvl) => (
                <button
                  key={lvl.id}
                  onClick={() => setSelectedLevelId(lvl.id)}
                  className={`p-2.5 rounded-xl text-[11px] font-mono transition-all text-left cursor-pointer ${
                    selectedLevelId === lvl.id
                      ? "bg-[#14161b] text-white shadow-md ring-2 ring-[#c5a880]/40 font-semibold"
                      : "bg-white hover:bg-[#f2ece1] text-[#5a5750] border border-[rgba(20,22,27,0.08)]"
                  }`}
                >
                  <span className="block text-[9px] text-[#b58d5b] uppercase">{lvl.badge}</span>
                  <span className="truncate block">{lvl.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Selected Level Architectural Dossier Card */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[rgba(20,22,27,0.1)] shadow-xl space-y-6">
              {/* Level Title & Metrics */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[rgba(20,22,27,0.08)]">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#b58d5b] font-semibold block mb-1">
                    {currentLevel.label} • {currentLevel.badge}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#14161b] font-light">
                    {currentLevel.title}
                  </h3>
                </div>
                <div className="px-3.5 py-1.5 rounded-full bg-[#f7f4ee] border border-[rgba(20,22,27,0.08)] text-[10px] font-mono text-[#5a5750] self-start sm:self-auto">
                  {currentLevel.dimensions}
                </div>
              </div>

              {/* Dual Visuals: 3D Render & Floor Blueprint */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 3D Interior Preview */}
                <div
                  onClick={handleOpenElevationLightbox}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 border border-[rgba(20,22,27,0.08)] group cursor-pointer shadow-xs"
                >
                  <Image
                    src={currentLevel.renderImage}
                    alt={currentLevel.title}
                    fill
                    sizes="300px"
                    className="object-cover group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-2.5 left-2.5 text-[10px] font-mono text-white tracking-wider flex items-center gap-1.5">
                    <Maximize2 className="w-3 h-3 text-[#c5a880]" /> 3D Preview
                  </span>
                </div>

                {/* CAD Plan Preview */}
                <div
                  onClick={handleOpenElevationLightbox}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#fdfbf7] border border-[rgba(20,22,27,0.08)] group cursor-pointer shadow-xs p-2"
                >
                  <Image
                    src={currentLevel.planImage}
                    alt={`${currentLevel.title} Plan`}
                    fill
                    sizes="300px"
                    className="object-contain p-2 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute bottom-2.5 right-2.5 bg-white/90 px-2 py-0.5 rounded text-[9px] font-mono text-[#14161b] border border-gray-200">
                    CAD Drawing
                  </div>
                </div>
              </div>

              {/* Summary Description */}
              <p className="text-xs sm:text-sm text-[#5a5750] leading-relaxed font-light">
                {currentLevel.summary}
              </p>

              {/* Architectural Highlights Matrix */}
              <div className="grid grid-cols-2 gap-2.5 pt-4 border-t border-[rgba(20,22,27,0.08)]">
                {currentLevel.specs.map((spec, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs text-[#14161b] font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#b58d5b] flex-shrink-0" />
                    <span className="truncate">{spec}</span>
                  </div>
                ))}
              </div>

              {/* Quick Book Tier Action */}
              <div className="pt-4 border-t border-[rgba(20,22,27,0.08)] flex items-center justify-between">
                <span className="text-xs font-mono text-[#827e74]">
                  Inquiries & Reservations Active
                </span>
                <button
                  onClick={onOpenBooking}
                  className="px-6 py-3 rounded-xl bg-[#14161b] hover:bg-[#232730] text-[#f7f4ee] hover:text-white text-xs font-mono uppercase tracking-[0.18em] font-semibold transition-all shadow-md flex items-center space-x-2 cursor-pointer group"
                >
                  <span>Inquire This Tier</span>
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
