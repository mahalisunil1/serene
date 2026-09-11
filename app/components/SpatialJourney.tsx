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
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const spaces = [
    {
      id: "reception",
      num: "01",
      plate: "CHAPTER I",
      title: "The Grand Arrival Salon",
      levelName: "ARRIVAL SALON",
      category: "Lobby Salon • Immediate Calm",
      description:
        "Welcoming guests into soaring ceilings, geometric acoustic wall art, curved reception lounges, and cascading chandeliers.",
      image: "/images/hotel/reception-lounge.jpg",
      specs: ["Private Check-In", "Cascading Chandelier", "Coastal Welcome Beverage", "Attentive Concierge"],
    },
    {
      id: "deluxe",
      num: "02",
      plate: "CHAPTER II",
      title: "Deluxe Ocean Chambers",
      levelName: "RESIDENTIAL SUITES",
      category: "Residential Suite • Seaside Dawn",
      description:
        "Warm whitewashed oak cabinetry, arched vanity mirror, plush king size bed, integrated study bar, and private ensuite bath.",
      image: "/images/hotel/room-typical-render.jpg",
      specs: ["Plush King Bed", "Tea & Coffee Study Bar", "Rain Shower Suite", "Acoustic Double Glazing"],
    },
    {
      id: "presidential",
      num: "03",
      plate: "CHAPTER III",
      title: "Presidential Penthouse",
      levelName: "EXECUTIVE TIER",
      category: "Executive Haven • Panoramic Views",
      description:
        "Sprawling formal entertaining salon with bespoke sofas, private master bedroom, and master spa bath with freestanding soaking tub.",
      image: "/images/hotel/suite-504-living.jpg",
      specs: ["Oceanfront Balconies", "Freestanding Soaking Tub", "Executive Salon", "Dedicated Butler"],
    },
    {
      id: "rooftop",
      num: "04",
      plate: "CHAPTER IV",
      title: "Rooftop Striped Lap Pool",
      levelName: "SKY SANCTUARY",
      category: "Open Sky • Horizon Pool",
      description:
        "Signature lap pool with navy-and-white nautical striped porcelain tiles, curved submerged entrance steps, and a sheer descent waterfall.",
      image: "/images/hotel/rooftop-pool.jpg",
      specs: ["Acoustic Waterfall", "Nautical Mosaic Tiles", "Underwater Glow", "Resident Access Only"],
    },
    {
      id: "pergola",
      num: "05",
      plate: "CHAPTER V",
      title: "Pergola Sky Lounge",
      levelName: "TERRACE RETREAT",
      category: "Terrace Living • Coastal Breeze",
      description:
        "All-weather glass canopy with cushioned outdoor seating, colonial carriage lanterns, and direct oceanfront sunset cocktails.",
      image: "/images/hotel/pergola-lounge.jpg",
      specs: ["Clear Glass Canopy", "Sunset High Tea", "Cocktail Service", "Panoramic Sea Vista"],
    },
    {
      id: "restaurant",
      num: "06",
      plate: "CHAPTER VI",
      title: "The 30-Seater Restaurant",
      levelName: "GASTRONOMY",
      category: "Coastal Odia & Global Fare",
      description:
        "Museum-grade monochrome ceramic plate wall, mint-green vertical fluting, Italian Calacatta marble tables, and chef tasting menus.",
      image: "/images/hotel/restaurant-main.jpg",
      specs: ["Coastal Seafood", "Monochrome Plate Art", "Artisanal Buffet", "Intimate Dining"],
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
        duration: 1,
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
          duration: 1,
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
          { xPercent: 6, ease: "none", duration: 1 },
          0
        );
      }
    });

    // 4. Wheel-like rotation effect: upcoming cards lean at 45deg and straighten as they enter view
    const totalScrollWidth = section.scrollWidth - window.innerWidth;
    if (totalScrollWidth > 0) {
      cardRefs.current.forEach((card, idx) => {
        if (!card) return;

        const cardLeft = card.offsetLeft;
        const enterX = cardLeft - window.innerWidth;
        const straightX = cardLeft - window.innerWidth * 0.35;

        const pEnter = Math.max(0, enterX / totalScrollWidth);
        const pStraight = Math.min(1, Math.max(pEnter + 0.1, straightX / totalScrollWidth));

        const initialAngle = idx === 0 ? 0 : 45;

        gsap.set(card, {
          rotation: initialAngle,
          transformOrigin: "bottom right",
          willChange: "transform",
        });

        if (initialAngle !== 0) {
          tl.to(
            card,
            {
              rotation: 0,
              ease: "power1.out",
              duration: pStraight - pEnter,
            },
            pEnter
          );
        }
      });
    }

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
              HOTEL SERENE
            </span>
            <span className="font-mono text-xl tracking-[0.5em]">
              [ PURI • SACRED COASTAL RETREAT ]
            </span>
            <span className="font-serif text-[16vw] font-light tracking-tighter">
              BAY OF BENGAL
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
              <span>Curated Horizons</span>
              <span className="text-[#b5afa3]">/</span>
              <span>The Guest Journey</span>
            </div>

            <GooeyTextReveal mode="scroll" splitBy="words" start="top 85%" duration={1.6} stagger={0.08}>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#14161b] font-light leading-tight mb-5">
                A Journey Through <br />
                <span className="italic font-normal text-[#8c7b68]">Stillness & Wonder</span>
              </h2>
            </GooeyTextReveal>

            <p className="text-xs sm:text-sm text-[#5a5750] leading-relaxed mb-7 font-sans font-light">
              From the serene arrival lounge to private ocean suites and sunset pergola loungers perched above the Bay of Bengal.
            </p>

            <div className="flex items-center space-x-3 text-[10px] font-mono uppercase tracking-widest text-[#14161b] font-medium">
              <span>Scroll to traverse chapters</span>
              <ArrowRight className="w-3.5 h-3.5 animate-pulse text-[#b58d5b]" />
            </div>
          </div>

          {/* Precision Experience Cards */}
          {spaces.map((space, idx) => (
            <div
              key={space.id}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className="w-[85vw] sm:w-[55vw] lg:w-[40vw] xl:w-[34vw] h-[72vh] max-h-[640px] min-h-[500px] flex-shrink-0 px-3 sm:px-4 md:px-5 will-change-transform"
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
                      {space.plate}
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
