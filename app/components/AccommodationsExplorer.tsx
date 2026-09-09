"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Maximize2, Sparkles, ArrowRight, BedDouble, Bath, Users, Ruler, Check } from "lucide-react";
import GooeyTextReveal from "@/components/ui/gooey-text-reveal";
import { LightboxImage } from "./ImageLightbox";
import ParallaxImage from "./ParallaxImage";

gsap.registerPlugin(ScrollTrigger);

interface AccommodationsExplorerProps {
  onSelectRoom: (roomId: string) => void;
  onOpenLightbox?: (images: LightboxImage[], index: number) => void;
}

export default function AccommodationsExplorer({
  onSelectRoom,
  onOpenLightbox,
}: AccommodationsExplorerProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [currency, setCurrency] = useState<"INR" | "USD" | "EUR">("INR");
  const [suiteModes, setSuiteModes] = useState<Record<string, "render" | "blueprint">>({
    "deluxe-103": "render",
    "suite-501": "render",
    "suite-502-503": "render",
    "presidential-504": "render",
  });

  const suites = [
    {
      id: "deluxe-103",
      num: "01",
      title: "Deluxe Ocean Chamber",
      category: "Typical Suite • Levels 1–4",
      code: "ROOMS 101–404 • TYPICAL RESIDENTIAL SUITE",
      subtitle: "Effortless minimalism, whitewashed wood fluting & ergonomic study station overlooking the bay.",
      priceINR: 6500,
      area: "420 sq. ft. • 12'0\" × 11'3\" Bed Area",
      capacity: "2 Guests",
      bed: "King Size Bed • Dual Nightstands",
      bath: "Walk-in Rain Shower • Ceramic World Tile",
      renderImage: "/images/hotel/room-typical-render.jpg",
      planImage: "/images/hotel/room-typical-plan.jpg",
      materials: [
        { label: "Floor Surface", val: "Ceramic World 600×600mm Vitrified Porcelain" },
        { label: "Joinery / Millwork", val: "Bleached Oak Vertical Architectural Fluting" },
        { label: "Acoustics", val: "Double Glazed Sea-Facing Soundproof Glass" },
        { label: "Lighting", val: "Concealed 3000K Warm LED Cove Trough" },
      ],
      features: [
        "Tea/Coffee Station cum Study Bar (3'6\" × 1'8\")",
        "Arched Full-Length Black Frame Vanity Mirror",
        "Integrated Luggage Credenza & Mini-Fridge",
        "Acoustically Rated Double Glazed Sea-Facing Windows",
      ],
      architectNotes:
        "Designed with light-washed oak veneers and vertical fluting to evoke the sun-bleached driftwood of Puri's shoreline.",
    },
    {
      id: "suite-501",
      num: "02",
      title: "Balcony Suite 501",
      category: "Private Terrace • Level 5",
      code: "5TH FLOOR • PRIVATE TERRACE TIER",
      subtitle: "Corner ocean-facing bedroom with private cantilevered outdoor bistro balcony.",
      priceINR: 9800,
      area: "580 sq. ft. • 12'0\" × 13'1\" + Outdoor Balcony",
      capacity: "2 Adults + 1 Child",
      bed: "King Size Luxury Bed",
      bath: "Ensuite Private Bath (4'6\" × 7'0\")",
      renderImage: "/images/hotel/room-typical-render.jpg",
      planImage: "/images/hotel/floor-5-plan.jpg",
      materials: [
        { label: "Terrace Paver", val: "Lingraj Flamed Natural Coastal Stone" },
        { label: "Joinery / Millwork", val: "Warm Teak & Fluted Oak Veneer" },
        { label: "Balustrade", val: "Stainless Steel & Toughened Safety Glass" },
        { label: "Illumination", val: "Architectural Exterior Weatherproof Sconces" },
      ],
      features: [
        "Private Outdoor Balcony with Bistro Seating",
        "Direct Seaside Ocean Morning Orientation",
        "Dedicated Coffee Bar & Refrigerator",
        "Immediate Access to 5th-Floor Sky Gymnasium",
      ],
      architectNotes:
        "Features seamless transitional French doors opening to an exclusive cantilevered balcony overlooking the sacred Bay of Bengal.",
    },
    {
      id: "suite-502-503",
      num: "03",
      title: "Executive Suites 502 & 503",
      category: "Executive Spa • Level 5",
      code: "5TH FLOOR • FAMILY & EXECUTIVE TIER",
      subtitle: "Dual-zone salon, bay window seat, master bath with freestanding spa tub & powder room.",
      priceINR: 14500,
      area: "820 sq. ft. • Formal Salon + Master Chamber",
      capacity: "3 Adults or 2 Adults + 2 Children",
      bed: "King Bed + Separate Living Daybed",
      bath: "Freestanding Soaking Tub + Dual Vanity + Powder Room",
      renderImage: "/images/hotel/room-typical-render.jpg",
      planImage: "/images/hotel/floor-5-plan.jpg",
      materials: [
        { label: "Soaking Tub", val: "Freestanding Architectural Resin Tub" },
        { label: "Bath Finishes", val: "Ceramic World Marble-Bookmatched Vitrified" },
        { label: "Bay Window", val: "Teak Window Seat with Direct Sea Vista" },
        { label: "Partitions", val: "Acoustic Fluted Oak Sliding Room Divider" },
      ],
      features: [
        "Bay Window Daybed Seating with Panoramic Sea View",
        "Separate Master Bedroom and Entertaining Salon",
        "Freestanding Oval Soaking Tub overlooking Beach",
        "Independent Guest Powder Room",
      ],
      architectNotes:
        "Designed with flexible spatial zoning for families and long-stay guests, complete with private master spa suite.",
    },
    {
      id: "presidential-504",
      num: "04",
      title: "Presidential Suite 504",
      category: "Pinnacle Residence • Level 5",
      code: "5TH FLOOR • PINNACLE RESIDENCE",
      subtitle: "The ultimate 1,150 sq. ft. sanctuary featuring grand entertaining salon & fluted columns.",
      priceINR: 22000,
      area: "1,150 sq. ft. • Master Residence Salon",
      capacity: "4 Adults or Family Suite",
      bed: "Master King Chamber + Guest Salon",
      bath: "Spa Bath + Powder Room",
      renderImage: "/images/hotel/suite-504-living.jpg",
      planImage: "/images/hotel/floor-5-plan.jpg",
      materials: [
        { label: "Salon Flooring", val: "Bleached Oak Chevron Hardwood Parquet" },
        { label: "Architectural Columns", val: "Custom Fluted Bleached Oak Pilasters" },
        { label: "Stone Elements", val: "Italian Calacatta Gold Marble Tables" },
        { label: "Acoustics", val: "3D Geometric Sound Absorption Wall Fabric" },
      ],
      features: [
        "Formal Entertaining Salon with Dual Plush Sofas",
        "Executive Study Workstation with Direct Sea Vista",
        "Dedicated Coffee & Champagne Bar (4'0\" × 1'6\")",
        "Curved Fluted Architectural Column Details",
      ],
      architectNotes:
        "The premier residence of Hotel Serene. Balanced neoclassical proportions, fluted columns, and custom oak millwork create an ambiance of regal tranquility.",
    },
  ];

  useGSAP(
    () => {
      const sec = sectionRef.current;
      const wm = watermarkRef.current;
      if (!sec || !wm) return;

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

      // 3D Card Stacking depth effect
      cardRefs.current.forEach((card, i) => {
        if (!card || i >= suites.length - 1) return;
        const nextCard = cardRefs.current[i + 1];
        if (!nextCard) return;

        gsap.to(card, {
          scale: 0.95 - i * 0.015,
          filter: "brightness(0.92)",
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: nextCard,
            start: "top 85%",
            end: "top 110px",
            scrub: true,
          },
        });
      });
    },
    { scope: sectionRef }
  );

  const formatPrice = (priceINR: number) => {
    if (currency === "USD") {
      const usd = Math.round(priceINR / 86);
      return `$${usd.toLocaleString()}`;
    }
    if (currency === "EUR") {
      const eur = Math.round(priceINR / 93);
      return `€${eur.toLocaleString()}`;
    }
    return `₹${priceINR.toLocaleString("en-IN")}`;
  };

  const toggleMode = (suiteId: string) => {
    setSuiteModes((prev) => ({
      ...prev,
      [suiteId]: prev[suiteId] === "render" ? "blueprint" : "render",
    }));
  };

  const handleOpenSuiteLightbox = (suite: typeof suites[0]) => {
    if (!onOpenLightbox) return;
    const galleryItems: LightboxImage[] = [
      {
        src: suite.renderImage,
        alt: suite.title,
        title: `${suite.title} • 3D Architectural Visualization`,
        subtitle: suite.subtitle,
        provenance: suite.code,
      },
      {
        src: suite.planImage,
        alt: `${suite.title} Blueprint`,
        title: `${suite.title} • Architectural Floor Blueprint`,
        subtitle: suite.area,
        provenance: "Reflections by Ankita • CAD Dossier",
      },
    ];
    onOpenLightbox(galleryItems, 0);
  };

  return (
    <section
      ref={sectionRef}
      id="suites"
      className="py-16 sm:py-20 md:py-24 px-6 md:px-12 bg-[#f7f4ee] border-t border-[rgba(20,22,27,0.08)] relative overflow-visible"
    >
      {/* Background Watermark Parallax Drift */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="absolute top-1/4 -right-16 pointer-events-none select-none text-[#14161b] opacity-[0.035] font-serif text-[18vw] font-light leading-none tracking-tighter whitespace-nowrap will-change-transform"
      >
        RESIDENCES • SUITES
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6 pb-6 border-b border-[rgba(20,22,27,0.08)]">
          <div>
            <div className="flex items-center space-x-2 text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-[#b58d5b] mb-3 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chambers & Penthouses Deck</span>
            </div>
            <GooeyTextReveal mode="scroll" splitBy="words" start="top 85%" duration={1.6} stagger={0.06}>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#14161b] font-light tracking-tight leading-tight">
                Suites & Ocean <br />
                <span className="italic font-normal text-[#b58d5b]">Penthouses</span>
              </h2>
            </GooeyTextReveal>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
            {/* Currency Switcher */}
            <div className="p-1 rounded-xl bg-white border border-[rgba(20,22,27,0.1)] flex items-center space-x-1 text-xs font-mono shadow-xs">
              {(["INR", "USD", "EUR"] as const).map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                    currency === curr
                      ? "bg-[#14161b] text-white font-semibold"
                      : "text-[#5a5750] hover:text-[#14161b]"
                  }`}
                >
                  {curr === "INR" ? "₹ INR" : curr === "USD" ? "$ USD" : "€ EUR"}
                </button>
              ))}
            </div>

            <p className="max-w-sm text-xs text-[#5a5750] font-sans font-light leading-relaxed">
              Explore each residence stacking dynamically like an archival luxury dossier.
            </p>
          </div>
        </div>

        {/* GSAP Stacking Cards Container */}
        <div className="relative space-y-6 sm:space-y-10 pb-24">
          {suites.map((suite, idx) => {
            const currentMode = suiteModes[suite.id] || "render";
            // Sticky top offset so cards gracefully stack over each other
            const topOffset = typeof window !== 'undefined' && window.innerWidth < 640 ? 45 + idx * 15 : 75 + idx * 22;

            return (
              <div
                key={suite.id}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                style={{ top: `${topOffset}px`, zIndex: 10 + idx }}
                className="sticky rounded-3xl bg-white border border-[rgba(20,22,27,0.12)] shadow-[0_25px_60px_rgba(20,22,27,0.12)] overflow-hidden transition-shadow duration-300 will-change-transform"
              >
                {/* Card Interior Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 p-6 sm:p-10 items-center">
                  {/* Left Column: Visual Media with Parallax Mode Switcher & Lightbox */}
                  <div className="lg:col-span-7 flex flex-col space-y-4">
                    <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-gray-100 border border-[rgba(20,22,27,0.08)] shadow-inner group">
                      {currentMode === "render" ? (
                        <ParallaxImage
                          src={suite.renderImage}
                          alt={suite.title}
                          speed={0.16}
                          scale={1.16}
                          className="w-full h-full"
                          imageClassName="filter brightness-[0.98] contrast-[1.05]"
                          priority={idx === 0}
                        />
                      ) : (
                        <div className="relative w-full h-full p-6 bg-[#fdfbf7]">
                          <Image
                            src={suite.planImage}
                            alt={`${suite.title} Blueprint`}
                            fill
                            sizes="(max-width: 1024px) 100vw, 60vw"
                            className="object-contain p-6"
                            priority={idx === 0}
                          />
                        </div>
                      )}

                      {/* Suite Number Stamp */}
                      <div className="absolute top-4 left-4 flex gap-2 z-20">
                        <span className="px-3.5 py-1 rounded-full bg-[#14161b]/85 backdrop-blur-md text-white text-[10px] font-mono uppercase tracking-wider shadow-sm">
                          Residence {suite.num}
                        </span>
                        <span className="px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#14161b] text-[10px] font-mono uppercase tracking-wider border border-gray-200 shadow-sm">
                          {suite.category}
                        </span>
                      </div>

                      {/* Fullscreen Lightbox Button */}
                      <button
                        onClick={() => handleOpenSuiteLightbox(suite)}
                        className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 hover:bg-[#14161b] text-[#14161b] hover:text-white backdrop-blur-md transition-all shadow-md cursor-pointer z-20"
                        title="Enlarge High Resolution"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>

                      {/* Interactive View Switcher (Render vs CAD) */}
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-20">
                        <div className="p-1 rounded-xl bg-[#14161b]/80 backdrop-blur-md border border-white/20 flex space-x-1 text-[11px] font-mono text-white shadow-lg">
                          <button
                            onClick={() => toggleMode(suite.id)}
                            className={`px-4 py-1.5 rounded-lg transition-all cursor-pointer ${
                              currentMode === "render"
                                ? "bg-[#c5a880] text-[#14161b] font-semibold"
                                : "text-white/70 hover:text-white"
                            }`}
                          >
                            3D Render
                          </button>
                          <button
                            onClick={() => toggleMode(suite.id)}
                            className={`px-4 py-1.5 rounded-lg transition-all cursor-pointer ${
                              currentMode === "blueprint"
                                ? "bg-[#c5a880] text-[#14161b] font-semibold"
                                : "text-white/70 hover:text-white"
                            }`}
                          >
                            CAD Plan
                          </button>
                        </div>

                        <span className="text-[10px] font-mono text-white/90 bg-black/60 px-3 py-1 rounded-lg backdrop-blur-md hidden sm:inline shadow-sm">
                          {suite.area}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Suite Details & Action Button */}
                  <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#b58d5b] block mb-1 font-semibold">
                        {suite.code}
                      </span>
                      <h3 className="font-serif text-3xl sm:text-4xl text-[#14161b] font-light mb-2">
                        {suite.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#5a5750] leading-relaxed font-light">
                        {suite.subtitle}
                      </p>
                    </div>

                    {/* Key Metrics Grid */}
                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[rgba(20,22,27,0.08)] font-mono text-xs text-[#14161b]">
                      <div className="flex items-center space-x-2">
                        <BedDouble className="w-4 h-4 text-[#b58d5b]" />
                        <span className="truncate">{suite.bed.split("•")[0]}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-[#b58d5b]" />
                        <span>{suite.capacity}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Bath className="w-4 h-4 text-[#b58d5b]" />
                        <span className="truncate">{suite.bath.split("•")[0]}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Ruler className="w-4 h-4 text-[#b58d5b]" />
                        <span className="truncate">{suite.area.split("•")[0]}</span>
                      </div>
                    </div>

                    {/* Features Checklist */}
                    <div className="space-y-1.5 pt-3 border-t border-[rgba(20,22,27,0.08)] font-mono text-xs text-[#5a5750]">
                      {suite.features.slice(0, 3).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start space-x-2">
                          <Check className="w-3.5 h-3.5 text-[#b58d5b] mt-0.5 flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Price and Instant Action Button */}
                    <div className="pt-4 border-t border-[rgba(20,22,27,0.08)] flex items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#827e74] block">
                          Tariff per Night
                        </span>
                        <div className="flex items-baseline space-x-1.5">
                          <span className="font-serif text-3xl font-semibold text-[#14161b]">
                            {formatPrice(suite.priceINR)}
                          </span>
                          <span className="text-xs font-mono text-[#827e74]">/ nt</span>
                        </div>
                      </div>

                      <button
                        onClick={() => onSelectRoom(suite.id)}
                        className="px-6 py-3.5 rounded-xl bg-[#14161b] hover:bg-[#232730] text-[#f7f4ee] hover:text-white font-mono text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-300 shadow-md flex items-center space-x-2 cursor-pointer group"
                      >
                        <span>Reserve Suite</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#c5a880] group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
