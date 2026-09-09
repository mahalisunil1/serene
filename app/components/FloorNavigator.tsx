"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import GooeyTextReveal from "@/components/ui/gooey-text-reveal";

gsap.registerPlugin(ScrollTrigger);

export default function FloorNavigator() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  const [activeFloor, setActiveFloor] = useState<number>(5);

  const floorData: Record<
    number,
    {
      level: string;
      code: string;
      title: string;
      description: string;
      blueprintImage: string;
      hotspots: { title: string; desc: string; size: string }[];
    }
  > = {
    0: {
      level: "GROUND LEVEL",
      code: "EL. ±0.00 M",
      title: "Entrance Grandeur & Reception Lounge",
      description:
        "Street-level arrival with stainless steel glass balustrades, 30'-4\" wide reception frontage, 12' check-in counter, and 3D geometric blue acoustic wall panels.",
      blueprintImage: "/images/hotel/reception-plan.jpg",
      hotspots: [
        { title: "Waiting Lounge", desc: "Curved sofa, gilded mirror, marble table", size: "13'2\" × 12'8\"" },
        { title: "Reception Table", desc: "12' linear counter with low storage", size: "13'2\" × 12'5\"" },
        { title: "Entrance Porch", desc: "Marble steps with glass balustrades", size: "Full Frontage" },
      ],
    },
    1: {
      level: "FLOORS 1 & 2",
      code: "EL. +3.50 M TO +7.00 M",
      title: "Typical Guest Room Quarters",
      description:
        "Ergonomically planned guest chambers (Chamber 103 Series) featuring king beds, whitewashed fluting, study stations, and ensuite bathrooms with Ceramic World tiles.",
      blueprintImage: "/images/hotel/room-typical-plan.jpg",
      hotspots: [
        { title: "Bed Chamber", desc: "King bed with dual nightstands", size: "12'-0\" × 11'-3\"" },
        { title: "Ensuite Bathroom", desc: "Shower area, basin, concealed WC", size: "4'-6\" × 6'-5.5\"" },
        { title: "Tea/Study Station", desc: "Built-in study desk with mini fridge", size: "3'-6\" × 1'-8\"" },
      ],
    },
    3: {
      level: "3RD FLOOR",
      code: "EL. +10.50 M",
      title: "Recreation & Kids Play Room",
      description:
        "Dedicated recreational level featuring an interactive Kids Play Room with modular sofas, media displays, and toy shelving for family travelers.",
      blueprintImage: "/images/hotel/playroom-plan.jpg",
      hotspots: [
        { title: "Kids Play Room", desc: "Comfortable lounge, TV, center table", size: "12'-9\" × 8'-0\"" },
        { title: "Sliding Partition", desc: "Acoustic sliding glass privacy door", size: "Full Width" },
        { title: "Family Chambers", desc: "Interconnected guest rooms", size: "Adjacent" },
      ],
    },
    5: {
      level: "5TH FLOOR",
      code: "EL. +17.50 M",
      title: "Executive Suites & Fitness Center",
      description:
        "The premier tier of Hotel Serene. Houses Presidential Suite 504, Executive Suites 502/503 with soaking bathtubs, Balcony Suite 501, and the 5th Floor Sky Gym.",
      blueprintImage: "/images/hotel/floor-5-plan.jpg",
      hotspots: [
        { title: "Presidential Suite 504", desc: "Formal living salon, study & spa bath", size: "Full Corner Suite" },
        { title: "Executive Suites 502/503", desc: "Bay-window salon, freestanding tub", size: "6'6\" × 10'2\" Bath" },
        { title: "Balcony Suite 501", desc: "Corner room with private terrace", size: "12'0\" × 13'1\"" },
        { title: "5th Floor Gym", desc: "Treadmill, weights, mirror wall", size: "12'-9\" × 8'-0\"" },
        { title: "Vertical Lifts", desc: "Stretcher lift (7'6\" × 5'3\") + Service lift", size: "Dual Core" },
      ],
    },
    6: {
      level: "ROOFTOP TERRACE",
      code: "EL. +21.00 M",
      title: "Open Sky Lap Pool & Pergola Sky Lounge",
      description:
        "Panoramic rooftop terrace featuring the signature nautical striped lap pool with sheer waterfall wall and the glass-roof Pergola Sky Lounge.",
      blueprintImage: "/images/hotel/rooftop-plan.jpg",
      hotspots: [
        { title: "Striped Lap Pool", desc: "Nautical blue/white tiles & waterfall", size: "Full Length" },
        { title: "Pergola Sky Lounge", desc: "Glass canopy, scalloped rafters", size: "East Wing" },
        { title: "Sun Lounger Deck", desc: "Poolside loungers & teak decking", size: "Central Deck" },
      ],
    },
  };

  const current = floorData[activeFloor] || floorData[5];

  useGSAP(
    () => {
      const sec = sectionRef.current;
      const wm = watermarkRef.current;
      const details = detailsRef.current;
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

      if (details) {
        gsap.fromTo(
          details,
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

  return (
    <section
      ref={sectionRef}
      id="blueprints"
      className="py-24 md:py-36 px-6 md:px-12 bg-[#ede7de] border-t border-[rgba(17,19,23,0.1)] relative overflow-hidden"
    >
      {/* Background CAD Watermark */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="absolute top-1/3 -right-20 pointer-events-none select-none text-[#111317] opacity-[0.035] font-mono text-[14vw] font-bold leading-none tracking-tighter whitespace-nowrap will-change-transform"
      >
        BLUEPRINT ARCHIVE
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-8 border-b border-[rgba(17,19,23,0.1)]">
          <div>
            <div className="flex items-center space-x-3 text-[10px] font-mono uppercase tracking-[0.35em] text-[#8c7b68] mb-3 font-semibold">
              <span>Folio VII</span>
              <span className="text-[#b5afa3]">/</span>
              <span>Engineering Dossier</span>
            </div>
            <GooeyTextReveal mode="scroll" start="top 85%" duration={1.6} stagger={0.08}>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#111317] font-light tracking-tight">
                Interactive Floor Dossier <br />
                <span className="italic font-normal text-[#8c7b68]">By Reflections by Ankita</span>
              </h2>
            </GooeyTextReveal>
          </div>
          <GooeyTextReveal mode="scroll" start="top 80%" duration={1.4} delay={0.15}>
            <p className="max-w-md text-xs text-[#5e5b54] font-mono leading-relaxed">
              [ ARCHIVAL INTERACTION ]: Navigate through the engineering and interior plans across every tier 
              of Hotel Serene, verifying spatial circulation and room dimensions.
            </p>
          </GooeyTextReveal>
        </div>

        {/* Floor Level Selector Buttons */}
        <div className="flex flex-wrap gap-2 mb-10">
          {[
            { id: 0, label: "Level 00 • Lobby" },
            { id: 1, label: "Levels 01–02 • Chambers" },
            { id: 3, label: "Level 03 • Play Room" },
            { id: 5, label: "Level 05 • Suites & Gym" },
            { id: 6, label: "Level 06 • Pool & Pergola" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveFloor(item.id)}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-[10px] font-mono uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                activeFloor === item.id
                  ? "bg-[#111317] text-[#ede7de] font-semibold shadow-md scale-[1.02]"
                  : "bg-[#f4efe6] text-[#5e5b54] hover:text-[#111317] border border-[rgba(17,19,23,0.1)] shadow-xs"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Blueprint Display Grid with Parallax Depth */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Blueprint Image Stage */}
          <div className="lg:col-span-8 relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#f8f5ef] border border-[rgba(17,19,23,0.12)] shadow-xl p-4 flex items-center justify-center">
            <div className="relative w-full h-full">
              <Image
                src={current.blueprintImage}
                alt={current.title}
                fill
                sizes="(max-width: 1024px) 100vw, 70vw"
                className="object-contain filter contrast-125 brightness-[0.95] hover:scale-105 transition-transform duration-500 p-2"
              />
            </div>

            {/* Corner Archival Tag with subtle depth */}
            <div className="absolute top-4 left-4 bg-[#ede7de]/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-[10px] font-mono uppercase text-[#111317] tracking-widest border border-[rgba(17,19,23,0.12)] font-semibold shadow-sm">
              {current.level} • {current.code}
            </div>
          </div>

          {/* Hotspot & Details Column (Parallax Drift) */}
          <div
            ref={detailsRef}
            className="lg:col-span-4 flex flex-col space-y-6 will-change-transform"
          >
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#8c7b68] mb-1 font-semibold">
                {current.code}
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#111317] font-light mb-3">
                {current.title}
              </h3>
              <p className="text-xs text-[#5e5b54] font-light leading-relaxed mb-6">
                {current.description}
              </p>
            </div>

            {/* Hotspots Card List */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#7a766e] block">
                Key Architectural Zones
              </span>
              {current.hotspots.map((h) => (
                <div
                  key={h.title}
                  className="p-3.5 rounded-xl bg-[#f4efe6] border border-[rgba(17,19,23,0.08)] hover:border-[rgba(17,19,23,0.25)] transition-colors font-mono shadow-xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-[#111317] font-medium">{h.title}</span>
                    <span className="text-[9px] text-[#8c7b68] bg-[#ede7de] px-2 py-0.5 rounded-lg font-medium border border-[rgba(17,19,23,0.06)]">
                      {h.size}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#5e5b54] leading-normal font-light">{h.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
