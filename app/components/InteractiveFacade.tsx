"use client";

import { useState } from "react";
import Image from "next/image";
import { Maximize2, Compass, ArrowUpRight, CheckCircle2 } from "lucide-react";
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
  const [selectedSanctuaryId, setSelectedSanctuaryId] = useState<string>("rooftop");

  const sanctuaries = [
    {
      id: "rooftop",
      label: "SKY SANCTUARY",
      badge: "ROOFTOP TERRACE",
      title: "Rooftop Striped Pool & Pergola Lounge",
      summary: "Signature nautical blue-and-white porcelain lap pool, sheer descent acoustic waterfall wall, and an all-weather glass-roof Pergola Sky Lounge commanding 360-degree ocean views.",
      tagline: "Panoramic Sea Horizons • Open Coastal Breeze",
      primaryImage: "/images/hotel/rooftop-pool.jpg",
      secondaryImage: "/images/hotel/pergola-lounge.jpg",
      highlights: ["Striped Porcelain Tile Pool", "Sheer Descent Waterfall", "Glass Pergola Sky Lounge", "Day & Sunset Cocktail Loungers"],
    },
    {
      id: "penthouse",
      label: "PRESIDENTIAL PENTHOUSE",
      badge: "EXECUTIVE TIER",
      title: "Presidential Penthouse 504",
      summary: "The pinnacle residence of Hotel Serene. Sprawling formal entertaining salon with bespoke oak woodwork, master spa bath with freestanding tub, and dedicated private butler service.",
      tagline: "Expansive Master Residence • Private Ocean Balconies",
      primaryImage: "/images/hotel/suite-504-living.jpg",
      secondaryImage: "/images/hotel/hero-penthouse-clean.jpg",
      highlights: ["Master Freestanding Soaking Tub", "Formal Entertaining Salon", "Fluted Curved Oak Details", "Private Butler Service"],
    },
    {
      id: "spa-bath",
      label: "SPA BATH SUITES",
      badge: "WELLNESS RETREAT",
      title: "Master Spa Soaking Baths",
      summary: "An intimate sanctuary of deep restoration within every executive residence. Featuring architectural resin freestanding soaking tubs, walk-in rain showers, and coastal botanical essences.",
      tagline: "Rejuvenating Bathing Rituals • Calacatta Accents",
      primaryImage: "/images/hotel/suite-bathroom.jpg",
      secondaryImage: "/images/hotel/room-typical-render.jpg",
      highlights: ["Architectural Oval Soaking Tub", "Walk-in Coastal Rain Shower", "Handcrafted Vitrified Porcelain", "Bespoke Aromatherapy Amenities"],
    },
    {
      id: "chambers",
      label: "OCEAN CHAMBERS",
      badge: "RESIDENTIAL SUITES",
      title: "Deluxe Ocean Chambers",
      summary: "Calming bleached oak millwork, arched black-frame vanity mirror, king bed, study station, and ensuite bath facing the morning tide of the Bay of Bengal.",
      tagline: "Quiet Beachside Solitude • Soundproof Glazing",
      primaryImage: "/images/hotel/room-typical-render.jpg",
      secondaryImage: "/images/hotel/suite-bathroom.jpg",
      highlights: ["Whitewashed Oak Fluting", "Tea & Coffee Study Console", "Plush King Size Bedding", "Concealed Warm 3000K Lighting"],
    },
    {
      id: "arrival",
      label: "GRAND ARRIVAL",
      badge: "RECEPTION SALON",
      title: "Arrival Lounge & Gastronomic Salon",
      summary: "A double-height glass reception porch flanked by stainless balustrades welcoming guests directly into an opulent waiting salon with 3D geometric blue acoustic panels and 30-seater dining.",
      tagline: "Immediate Coastal Calm • Private Concierge",
      primaryImage: "/images/hotel/reception-lounge.jpg",
      secondaryImage: "/images/hotel/restaurant-main.jpg",
      highlights: ["Cascading Pearl Chandelier", "Geometric Sound Absorption Art", "30-Seater Dining Salon", "Dedicated Concierge Desk"],
    },
  ];

  const currentSanctuary = sanctuaries.find((s) => s.id === selectedSanctuaryId) || sanctuaries[0];

  const handleOpenSanctuaryLightbox = () => {
    if (!onOpenLightbox) return;
    const galleryItems: LightboxImage[] = [
      {
        src: currentSanctuary.primaryImage,
        alt: currentSanctuary.title,
        title: `${currentSanctuary.title} • Primary Sanctuary View`,
        subtitle: currentSanctuary.summary,
        provenance: currentSanctuary.badge,
      },
      {
        src: currentSanctuary.secondaryImage,
        alt: `${currentSanctuary.title} Detail`,
        title: `${currentSanctuary.title} • Living Detail`,
        subtitle: currentSanctuary.tagline,
        provenance: "Hotel Serene • Puri Sanctuary",
      },
    ];
    onOpenLightbox(galleryItems, 0);
  };

  return (
    <section id="experiences" className="py-16 sm:py-20 md:py-24 px-6 md:px-12 bg-[#f7f4ee] border-t border-[rgba(20,22,27,0.08)] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6 pb-6 border-b border-[rgba(20,22,27,0.08)]">
          <div>
            <div className="flex items-center space-x-2 text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-[#b58d5b] mb-3 font-semibold">
              <Compass className="w-3.5 h-3.5" />
              <span>The Sanctuary Collection</span>
            </div>
            <GooeyTextReveal mode="scroll" splitBy="words" start="top 85%" duration={1.6} stagger={0.08}>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#14161b] font-light tracking-tight leading-tight">
                Signature Spaces & <br />
                <span className="italic font-normal text-[#b58d5b]">Coastal Horizons</span>
              </h2>
            </GooeyTextReveal>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-[#4a4740] font-sans font-light leading-relaxed">
            Discover the secluded enclaves of Hotel Serene, from open-sky rooftop pools and master spa soaking baths to grand arrival salons on Puri’s tranquil shores.
          </p>
        </div>

        {/* Interactive Sanctuary Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Visual Showcase Frame */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            <div 
              onClick={handleOpenSanctuaryLightbox}
              className="relative aspect-[3/4] sm:aspect-[4/5] w-full rounded-2xl overflow-hidden bg-white border border-[rgba(20,22,27,0.1)] shadow-xl p-3 group cursor-pointer"
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <Image
                  src={currentSanctuary.primaryImage}
                  alt={currentSanctuary.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover filter brightness-[0.98] contrast-[1.05] group-hover:scale-105 transition-transform duration-700 ease-out"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Badge Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white pointer-events-none">
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#c5a880] block mb-0.5">
                      {currentSanctuary.badge}
                    </span>
                    <span className="font-serif text-lg font-medium">
                      {currentSanctuary.title}
                    </span>
                  </div>
                  <span className="p-2 rounded-full bg-white/20 backdrop-blur-md">
                    <Maximize2 className="w-3.5 h-3.5 text-white" />
                  </span>
                </div>
              </div>

              {/* Status Pill */}
              <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-mono uppercase text-[#14161b] tracking-wider border border-[rgba(20,22,27,0.08)] shadow-xs pointer-events-none">
                {currentSanctuary.badge}
              </div>
            </div>

            {/* Sanctuary Selector Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {sanctuaries.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSanctuaryId(s.id)}
                  className={`p-2.5 rounded-xl text-[11px] font-mono transition-all text-left cursor-pointer ${
                    selectedSanctuaryId === s.id
                      ? "bg-[#14161b] text-white shadow-md ring-2 ring-[#c5a880]/40 font-semibold"
                      : "bg-white hover:bg-[#f2ece1] text-[#5a5750] border border-[rgba(20,22,27,0.08)]"
                  }`}
                >
                  <span className="block text-[9px] text-[#b58d5b] uppercase">{s.badge}</span>
                  <span className="truncate block">{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Selected Sanctuary Experience Card */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[rgba(20,22,27,0.1)] shadow-xl space-y-6">
              {/* Title & Tagline */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[rgba(20,22,27,0.08)]">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#b58d5b] font-semibold block mb-1">
                    {currentSanctuary.badge} • HOTEL SERENE
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#14161b] font-light">
                    {currentSanctuary.title}
                  </h3>
                </div>
                <div className="px-3.5 py-1.5 rounded-full bg-[#f7f4ee] border border-[rgba(20,22,27,0.08)] text-[10px] font-mono text-[#5a5750] self-start sm:self-auto">
                  {currentSanctuary.tagline}
                </div>
              </div>

              {/* Dual Visuals: Primary & Detail Visuals */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Primary Space */}
                <div
                  onClick={handleOpenSanctuaryLightbox}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 border border-[rgba(20,22,27,0.08)] group cursor-pointer shadow-xs"
                >
                  <Image
                    src={currentSanctuary.primaryImage}
                    alt={currentSanctuary.title}
                    fill
                    sizes="300px"
                    className="object-cover group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-2.5 left-2.5 text-[10px] font-mono text-white tracking-wider flex items-center gap-1.5">
                    <Maximize2 className="w-3 h-3 text-[#c5a880]" /> Full Vista
                  </span>
                </div>

                {/* Secondary Detail View */}
                <div
                  onClick={handleOpenSanctuaryLightbox}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#fdfbf7] border border-[rgba(20,22,27,0.08)] group cursor-pointer shadow-xs"
                >
                  <Image
                    src={currentSanctuary.secondaryImage}
                    alt={`${currentSanctuary.title} Living Detail`}
                    fill
                    sizes="300px"
                    className="object-cover group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-2.5 left-2.5 text-[10px] font-mono text-white tracking-wider flex items-center gap-1.5">
                    <Maximize2 className="w-3 h-3 text-[#c5a880]" /> Interior Vignette
                  </span>
                </div>
              </div>

              {/* Summary Description */}
              <p className="text-xs sm:text-sm text-[#5a5750] leading-relaxed font-light">
                {currentSanctuary.summary}
              </p>

              {/* Signature Highlights Matrix */}
              <div className="grid grid-cols-2 gap-2.5 pt-4 border-t border-[rgba(20,22,27,0.08)]">
                {currentSanctuary.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs text-[#14161b] font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#b58d5b] flex-shrink-0" />
                    <span className="truncate">{highlight}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-[rgba(20,22,27,0.08)] flex items-center justify-between">
                <span className="text-xs font-mono text-[#827e74]">
                  Private Reservations Active
                </span>
                <button
                  onClick={onOpenBooking}
                  className="px-6 py-3 rounded-xl bg-[#14161b] hover:bg-[#232730] text-[#f7f4ee] hover:text-white text-xs font-mono uppercase tracking-[0.18em] font-semibold transition-all shadow-md flex items-center space-x-2 cursor-pointer group"
                >
                  <span>Reserve This Space</span>
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
