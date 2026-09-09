"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import GooeyTextReveal from "@/components/ui/gooey-text-reveal";

interface SpatialJourneyProps {
  onOpenBooking: () => void;
}

export default function SpatialJourney({ onOpenBooking }: SpatialJourneyProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgTrackRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const spaces = [
    {
      id: "reception",
      num: "01",
      plate: "PLATE I",
      title: "The Grand Reception",
      elevation: "EL. ±0.00 M",
      levelName: "GROUND ARRIVAL",
      category: "Arrival Lobby • 30'-4\" Frontage",
      description:
        "Features 3D geometric acoustic wall panels, curved fluted reception sofa, gilded mirror, and cascading chandelier beneath a double-height glass entrance porch.",
      image: "/images/hotel/reception-lounge.jpg",
      specs: ["13'2\" × 12'8\" Lounge", "12' Linear Counter", "Double-Height Glass", "Geometric Sound Panels"],
    },
    {
      id: "deluxe",
      num: "02",
      plate: "PLATE II",
      title: "Deluxe Guest Chambers",
      elevation: "EL. +3.50 M TO +14.00 M",
      levelName: "LEVELS 01–04",
      category: "Typical Suite • 12'-0\" × 11'-3\"",
      description:
        "Calming whitewashed fluted cabinetry, arched black-frame vanity mirror, king bed, integrated study bar, and ensuite bathroom with Ceramic World porcelain tiles.",
      image: "/images/hotel/room-typical-render.jpg",
      specs: ["King Size Bed", "Study Bar Console", "Ceramic World Tiles", "Fluted Bleached Oak"],
    },
    {
      id: "presidential",
      num: "03",
      plate: "PLATE III",
      title: "Presidential Penthouse 504",
      elevation: "EL. +17.50 M",
      levelName: "EXECUTIVE TIER",
      category: "Level 05 • Pinnacle Residence",
      description:
        "Sprawling entertaining salon with Netflix console, private master bedroom, guest powder toilet, and master spa bath with freestanding soaking bathtub.",
      image: "/images/hotel/suite-504-living.jpg",
      specs: ["1,150 sq. ft. Footprint", "Freestanding Soaking Tub", "Executive Salon", "Fluted Columns"],
    },
    {
      id: "rooftop",
      num: "04",
      plate: "PLATE IV",
      title: "Rooftop Striped Lap Pool",
      elevation: "EL. +21.00 M",
      levelName: "SKY SANCTUARY",
      category: "Terrace Level • Open Sky",
      description:
        "Signature lap pool with navy-and-white nautical striped porcelain tiles, curved submerged entrance steps, and a sheer descent waterfall set against French parapets.",
      image: "/images/hotel/rooftop-pool.jpg",
      specs: ["Acoustic Waterfall Wall", "French Parapet Walls", "Submerged Steps", "Underwater Glow"],
    },
    {
      id: "pergola",
      num: "05",
      plate: "PLATE V",
      title: "Pergola Sky Lounge",
      elevation: "EL. +21.00 M",
      levelName: "SHADED SANCTUARY",
      category: "Terrace Level • Coastal Breeze",
      description:
        "Glass-roof pergola with scalloped rafters, marigold outdoor seating, colonial carriage lanterns, and Portuguese motif tiles supplied by Lingraj Stone.",
      image: "/images/hotel/pergola-lounge.jpg",
      specs: ["Clear Glass Canopy", "Lingraj Flamed Stone", "Scalloped Rafters", "Panoramic Sea Vista"],
    },
    {
      id: "restaurant",
      num: "06",
      plate: "PLATE VI",
      title: "The 30-Seater Restaurant",
      elevation: "EL. +0.00 M",
      levelName: "GASTRONOMY",
      category: "Dining Level • 457 sq. ft.",
      description:
        "Museum-grade monochrome ceramic plate wall, mint-green vertical fluting, Italian Calacatta marble tables, and a dedicated 12'4\" × 8'10\" buffet room.",
      image: "/images/hotel/restaurant-main.jpg",
      specs: ["30 Seater Capacity", "Monochrome Plate Art", "Private Buffet Room", "Calacatta Tables"],
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const trigger = triggerRef.current;
    const section = sectionRef.current;
    const bgTrack = bgTrackRef.current;
    if (!trigger || !section) return;

    // Timeline for coordinated horizontal scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: "top top",
        end: () => `+=${Math.max(1800, section.scrollWidth - window.innerWidth)}`,
        scrub: 0.8,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // 1. Smoothly scroll the midground cards track
    tl.to(
      section,
      {
        x: () => -(section.scrollWidth - window.innerWidth),
        ease: "none",
      },
      0
    );

    // 2. Slow deep background coordinate drift
    if (bgTrack) {
      tl.to(
        bgTrack,
        {
          x: () => -(section.scrollWidth - window.innerWidth) * 0.35,
          ease: "none",
        },
        0
      );
    }

    // 3. Subtle inner-image horizontal parallax
    imageRefs.current.forEach((img) => {
      if (img) {
        tl.fromTo(
          img,
          { xPercent: -6 },
          { xPercent: 6, ease: "none" },
          0
        );
      }
    });

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={triggerRef}
      id="spaces"
      className="relative w-full h-screen min-h-[640px] overflow-hidden bg-[#ede7de] border-t border-[rgba(20,22,27,0.08)] flex items-center"
    >
        {/* Deep Parallax Watermark Track */}
        <div
          ref={bgTrackRef}
          aria-hidden="true"
          className="absolute top-0 left-0 h-full w-[260vw] flex items-center pointer-events-none select-none z-0 will-change-transform opacity-[0.06]"
        >
          <div className="flex items-center space-x-24 whitespace-nowrap text-[#14161b]">
            <span className="font-serif text-[16vw] font-light tracking-tighter">
              CHRONIQUE SPATIALE
            </span>
            <span className="font-mono text-xl tracking-[0.5em]">
              [ ELEVATION PROFILE: ±0.00M → +21.00M ]
            </span>
            <span className="font-serif text-[16vw] font-light tracking-tighter">
              REFLECTIONS BY ANKITA
            </span>
          </div>
        </div>

        {/* Main Midground Cards Track */}
        <div
          ref={sectionRef}
          className="h-full w-max flex flex-row relative items-center px-8 md:px-16 pt-8 pb-20 z-10 will-change-transform"
        >
          {/* Section Introduction Column */}
          <div className="w-[85vw] sm:w-[50vw] lg:w-[35vw] flex-shrink-0 pr-10 md:pr-14 flex flex-col justify-center">
            <div className="flex items-center space-x-3 text-[10px] font-mono uppercase tracking-[0.35em] text-[#8c7b68] mb-4 font-semibold">
              <span>Folio III</span>
              <span className="text-[#b5afa3]">/</span>
              <span>Spatial Traverse</span>
            </div>

            <GooeyTextReveal mode="scroll" start="top 85%" duration={1.6} stagger={0.08}>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#14161b] font-light leading-tight mb-5">
                A Journey Through <br />
                <span className="italic font-normal text-[#8c7b68]">Proportion & Silence</span>
              </h2>
            </GooeyTextReveal>

            <p className="text-xs sm:text-sm text-[#5a5750] leading-relaxed mb-7 font-sans font-light">
              From the double-height street-level reception to the 5th-floor presidential retreat and sky lap pool overlooking the sacred Bay of Bengal.
            </p>

            <div className="flex items-center space-x-3 text-[10px] font-mono uppercase tracking-widest text-[#14161b] font-medium">
              <span>Scroll to traverse plates</span>
              <ArrowRight className="w-3.5 h-3.5 animate-pulse text-[#b58d5b]" />
            </div>
          </div>

          {/* Precision Architectural Cards */}
          {spaces.map((space, idx) => (
            <div
              key={space.id}
              className="w-[85vw] sm:w-[55vw] lg:w-[40vw] xl:w-[34vw] h-[72vh] max-h-[640px] min-h-[500px] flex-shrink-0 px-3 sm:px-4 md:px-5"
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white border border-[rgba(20,22,27,0.08)] shadow-[0_12px_35px_rgba(20,22,27,0.05)] hover:shadow-[0_20px_50px_rgba(20,22,27,0.1)] flex flex-col group transition-all duration-300">
                {/* 1. Dedicated Upper Photographic Frame (52% height) */}
                <div className="relative w-full h-[50%] sm:h-[53%] overflow-hidden bg-[#f2ece1] flex-shrink-0">
                  <div
                    ref={(el) => {
                      imageRefs.current[idx] = el;
                    }}
                    className="absolute inset-0 w-[114%] -left-[7%] h-full will-change-transform"
                  >
                    <Image
                      src={space.image}
                      alt={space.title}
                      fill
                      sizes="(max-width: 1024px) 85vw, 36vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>

                  {/* Clean Corner Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10 pointer-events-none">
                    <span className="px-3 py-1 rounded-full bg-[#14161b] text-white font-mono text-[9px] uppercase tracking-[0.2em] shadow-sm">
                      {space.plate} • {space.elevation}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white text-[#14161b] font-mono text-[8.5px] uppercase tracking-wider shadow-sm font-semibold">
                      {space.levelName}
                    </span>
                  </div>
                </div>

                {/* 2. Dedicated Lower Architectural Dossier (48% height) */}
                <div className="flex-1 p-5 sm:p-6 md:p-7 flex flex-col justify-between bg-white">
                  <div>
                    <div className="text-[9.5px] font-mono text-[#b58d5b] uppercase tracking-[0.2em] font-semibold mb-1">
                      {space.category}
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl lg:text-[26px] text-[#14161b] font-light leading-snug mb-2">
                      {space.title}
                    </h3>
                    <p className="text-xs text-[#5a5750] leading-relaxed line-clamp-2 sm:line-clamp-3 font-light mb-3">
                      {space.description}
                    </p>
                  </div>

                  <div>
                    {/* Minimalist Specs Pills */}
                    <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mb-4">
                      {space.specs.map((spec) => (
                        <div
                          key={spec}
                          className="py-1 px-2.5 rounded-md text-[9px] sm:text-[9.5px] font-mono text-[#14161b] bg-[#f7f4ee] border border-[rgba(20,22,27,0.06)] flex items-center gap-1.5 font-medium truncate"
                        >
                          <span className="w-1 h-1 rounded-full bg-[#b58d5b] flex-shrink-0" />
                          <span className="truncate">{spec}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action Link */}
                    <button
                      onClick={onOpenBooking}
                      className="w-full pt-3 border-t border-[rgba(20,22,27,0.08)] flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-[#14161b] group-hover:text-[#b58d5b] transition-colors cursor-pointer font-semibold"
                    >
                      <span>Reserve Space</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#b58d5b] group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
    </section>
  );
}
