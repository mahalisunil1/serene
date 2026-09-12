"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, BedDouble, Bath, Users, Sparkles, CheckCircle2 } from "lucide-react";

interface SpatialJourneyProps {
  onOpenBooking: (roomId?: string) => void;
}

export default function SpatialJourney({ onOpenBooking }: SpatialJourneyProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgTrackRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const rooms = [
    {
      id: "deluxe",
      num: "01",
      plate: "RESIDENCE 01",
      title: "Deluxe Ocean Chamber",
      levelName: "LEVELS 1–4",
      category: "Coastal Solitude",
      priceINR: 3500,
      area: "380 sq. ft.",
      capacity: "2 Guests",
      bed: "King Bed",
      bath: "Rain Shower",
      viewStamp: "Morning Tide Vista",
      description:
        "Warm whitewashed oak cabinetry, arched vanity mirror, plush king size bed, integrated study bar, and private ensuite bath overlooking the morning tide.",
      image: "/images/hotel/room-typical-render.jpg",
      specs: ["Plush King Bed", "Ensuite Rain Shower", "Ocean View Study Bar", "Acoustic Double Glazing"],
    },
    {
      id: "super-deluxe",
      num: "02",
      plate: "RESIDENCE 02",
      title: "Super Deluxe Sanctuary",
      levelName: "LEVELS 3–5",
      category: "Elevated Sea Vista",
      priceINR: 5000,
      area: "540 sq. ft.",
      capacity: "2–3 Guests",
      bed: "King Bed + Daybed",
      bath: "Deep Soaking Bath",
      viewStamp: "Cantilevered Balcony",
      description:
        "Expanded oceanfront chamber with a private cantilevered balcony, outdoor bistro seating, soaking bath with panoramic window, and curated coffee atelier.",
      image: "/images/hotel/hero-penthouse-clean.jpg",
      specs: ["Private Sea Balcony", "Deep Soaking Bath", "King Bed & Daybed", "Curated Nespresso Bar"],
    },
    {
      id: "presidential",
      num: "03",
      plate: "RESIDENCE 03",
      title: "Presidential Penthouse",
      levelName: "LEVEL 5 PINNACLE",
      category: "Unbounded Grandeur",
      priceINR: 8000,
      area: "1,050 sq. ft.",
      capacity: "4 Guests",
      bed: "Master King Suite",
      bath: "Master Spa Bath",
      viewStamp: "Sunset Bay Horizon",
      description:
        "The pinnacle residence featuring a formal oceanfront entertaining salon, master spa bath with freestanding tub, wrap-around sunset balcony, and 24/7 dedicated butler.",
      image: "/images/hotel/suite-504-living.jpg",
      specs: ["Oceanfront Salon", "Freestanding Spa Tub", "Panoramic Balconies", "24/7 Dedicated Butler"],
    },
  ];

  const residentPrivileges = [
    "Artisanal Champagne & Odia Breakfast Buffet",
    "Rooftop Striped Lap Pool & Sun Loungers",
    "Pergola Sky Lounge Sunset Access",
    "VIP Jagannath Temple Darshan Concierge",
    "High-Speed Fiber Wi-Fi Throughout Sanctuary",
    "Coastal Welcome Elixir & Valet Parking",
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const trigger = triggerRef.current;
    const section = sectionRef.current;
    const bgTrack = bgTrackRef.current;
    if (!trigger || !section) return;

    // ── MASTER PINNED HORIZONTAL TRAVERSAL ────────────────────────────────
    // scrub: 0.8 provides buttery smooth GSAP inertia with Lenis.
    // anticipatePin: 0 prevents any premature pinning jumps.
    const horizontalDistance = section.scrollWidth - window.innerWidth;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: "top top",
        end: () => `+=${(sectionRef.current?.scrollWidth || 3000) - window.innerWidth + window.innerWidth * 0.35}`,
        scrub: 0.8,
        pin: true,
        pinSpacing: true,
        anticipatePin: 0,
        invalidateOnRefresh: true,
      },
    });

    // 1. Smoothly traverse the midground cards track
    tl.to(
      section,
      {
        x: () => -horizontalDistance,
        ease: "none",
        duration: 0.88,
      },
      0
    );

    // 2. Slow deep background coordinate drift
    if (bgTrack) {
      tl.to(
        bgTrack,
        {
          x: () => -horizontalDistance * 0.35,
          ease: "none",
          duration: 0.88,
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
          { xPercent: 6, ease: "none", duration: 0.88 },
          0
        );
      }
    });

    // 4. Wheel-like rotation effect: upcoming cards lean slightly and straighten as they enter view
    if (horizontalDistance > 0) {
      cardRefs.current.forEach((card, idx) => {
        if (!card) return;

        const cardLeft = card.offsetLeft;
        const enterX = cardLeft - window.innerWidth;
        const straightX = cardLeft - window.innerWidth * 0.35;

        const pEnter = Math.max(0, (enterX / horizontalDistance) * 0.88);
        const pStraight = Math.min(0.88, Math.max(pEnter + 0.06, (straightX / horizontalDistance) * 0.88));

        const initialAngle = idx === 0 ? 0 : 8;

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
              duration: Math.max(0.04, pStraight - pEnter),
            },
            pEnter
          );
        }
      });
    }

    // 5. Exit Transition Hand-off (0.88 -> 1.00):
    // Soft depth recession and opacity settle as unpinning approaches,
    // creating a seamless hand-off into PuriDestination.
    tl.to(
      section,
      {
        scale: 0.985,
        opacity: 0.92,
        ease: "power1.in",
        duration: 0.12,
      },
      0.88
    );

    return () => {
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
            CHAMBERS & SUITES
          </span>
        </div>
      </div>

      {/* Main Midground Cards Track */}
      <div
        ref={sectionRef}
        className="h-full w-max flex flex-row relative items-center px-8 md:px-16 py-6 sm:py-8 z-10 will-change-transform"
      >
        {/* Section Introduction Column */}
        <div className="w-[85vw] sm:w-[50vw] lg:w-[35vw] flex-shrink-0 pr-10 md:pr-14 flex flex-col justify-center">
          <div className="flex items-center space-x-3 text-[10px] font-mono uppercase tracking-[0.35em] text-[#8c7b68] mb-4 font-semibold">
            <span>The Living Collection</span>
            <span className="text-[#b5afa3]">/</span>
            <span>Chambers & Suites</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#14161b] font-light leading-tight mb-5 overflow-visible">
            Refined Rooms & <br />
            <span
              className="font-script text-4xl sm:text-6xl lg:text-7xl text-[#b58d5b] block font-normal tracking-normal leading-[1.3] py-2 overflow-visible"
              style={{ fontFamily: "var(--font-script), 'Great Vibes', cursive" }}
            >
              Coastal Sanctuaries
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-[#5a5750] leading-relaxed mb-7 font-sans font-light">
            Three handcrafted tiers of stillness overlooking the sacred Bay of Bengal. Every residence includes private ensuite baths, acoustic glazing, and direct rooftop pool privileges.
          </p>

          <div className="flex items-center space-x-3 text-[10px] font-mono uppercase tracking-widest text-[#14161b] font-medium">
            <span>Scroll to traverse suites</span>
            <ArrowRight className="w-3.5 h-3.5 animate-pulse text-[#b58d5b]" />
          </div>
        </div>

        {/* 3 Signature Room Cards */}
        {rooms.map((room, idx) => (
          <div
            key={room.id}
            ref={(el) => {
              cardRefs.current[idx] = el;
            }}
            className="w-[88vw] sm:w-[60vw] lg:w-[46vw] xl:w-[38vw] max-w-[560px] h-[82vh] max-h-[720px] min-h-[580px] flex-shrink-0 px-3 sm:px-5 md:px-6 will-change-transform"
          >
            <div className="relative w-full h-full rounded-3xl overflow-hidden bg-white border border-[rgba(20,22,27,0.08)] shadow-[0_18px_50px_rgba(20,22,27,0.07)] hover:shadow-[0_26px_65px_rgba(20,22,27,0.12)] flex flex-col group transition-all duration-300">
              {/* 1. Upper Photographic Frame (40% height for generous dossier breathing room) */}
              <div className="relative w-full h-[40%] sm:h-[42%] overflow-hidden bg-[#f2ece1] flex-shrink-0">
                <div
                  ref={(el) => {
                    imageRefs.current[idx] = el;
                  }}
                  className="absolute inset-0 w-[114%] -left-[7%] h-full will-change-transform"
                >
                  <Image
                    src={room.image}
                    alt={room.title}
                    fill
                    sizes="(max-width: 1024px) 88vw, 40vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Clean Corner Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                  <span className="px-3.5 py-1.5 rounded-full bg-[#14161b]/90 backdrop-blur-md text-white font-mono text-[9px] uppercase tracking-[0.22em] shadow-sm">
                    {room.plate}
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#14161b] font-mono text-[8.5px] uppercase tracking-wider shadow-sm font-semibold">
                    {room.levelName}
                  </span>
                </div>

                {/* Bottom Dimension & Horizon View Stamp */}
                <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between text-white pointer-events-none z-10">
                  <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md font-mono text-[9px] uppercase tracking-wider">
                    {room.area}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md font-mono text-[9px] uppercase tracking-wider">
                    {room.viewStamp}
                  </span>
                </div>
              </div>

              {/* 2. Lower Architectural Dossier & Pricing (60% height with lavish breathing room) */}
              <div className="flex-1 p-6 sm:p-7 lg:p-8 flex flex-col justify-between bg-white">
                <div>
                  <div
                    className="font-script text-2xl sm:text-3xl text-[#b58d5b] font-normal leading-tight mb-1 select-none"
                    style={{ fontFamily: "var(--font-script), 'Great Vibes', cursive" }}
                  >
                    {room.category}
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-[28px] text-[#14161b] font-light leading-snug tracking-tight mb-2.5">
                    {room.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#5e5b54] leading-relaxed line-clamp-2 font-light mb-4">
                    {room.description}
                  </p>

                  {/* Micro Metric Architectural Legend */}
                  <div className="flex items-center gap-4 sm:gap-6 text-[10px] sm:text-[11px] font-mono text-[#4a4740] py-2.5 sm:py-3 border-y border-[rgba(20,22,27,0.07)] mb-4">
                    <div className="flex items-center gap-1.5">
                      <BedDouble className="w-3.5 h-3.5 text-[#b58d5b] flex-shrink-0" />
                      <span>{room.bed}</span>
                    </div>
                    <span className="text-[#d5cfc4]">•</span>
                    <div className="flex items-center gap-1.5">
                      <Bath className="w-3.5 h-3.5 text-[#b58d5b] flex-shrink-0" />
                      <span>{room.bath}</span>
                    </div>
                    <span className="text-[#d5cfc4]">•</span>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#b58d5b] flex-shrink-0" />
                      <span>{room.capacity}</span>
                    </div>
                  </div>
                </div>

                <div>
                  {/* Minimalist Specs Grid */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-2.5 mb-5">
                    {room.specs.map((spec) => (
                      <div
                        key={spec}
                        className="py-1.5 sm:py-2 px-3 sm:px-3.5 rounded-lg text-[9.5px] sm:text-[10px] font-mono text-[#2c2a26] bg-[#faf7f2] border border-[rgba(20,22,27,0.06)] flex items-center gap-2 font-medium truncate"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#b58d5b] flex-shrink-0" />
                        <span className="truncate">{spec}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing & Instant Reservation Action */}
                  <div className="pt-4 sm:pt-5 border-t border-[rgba(20,22,27,0.08)] flex items-center justify-between mt-auto">
                    <div>
                      <span className="text-[9px] sm:text-[9.5px] font-mono uppercase tracking-[0.24em] text-[#8c7b68] block mb-1">
                        Tariff / Night
                      </span>
                      <div className="flex items-baseline space-x-1.5">
                        <span className="font-serif text-2xl sm:text-3xl lg:text-[32px] font-normal text-[#14161b] tracking-tight leading-none">
                          ₹{room.priceINR.toLocaleString("en-IN")}
                        </span>
                        <span className="text-[11px] font-mono text-[#8c7b68]">/ night</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onOpenBooking(room.id)}
                      className="px-6 sm:px-7 py-3 rounded-full bg-[#14161b] hover:bg-[#252830] text-[#f7f4ee] hover:text-white font-mono text-[11px] uppercase tracking-[0.18em] font-medium transition-all duration-300 shadow-md hover:shadow-lg flex items-center space-x-2.5 cursor-pointer group active:scale-95"
                    >
                      <span>Reserve</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#c5a880] group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* 4. Concluding Resident Privileges Card */}
        <div
          ref={(el) => {
            cardRefs.current[3] = el;
          }}
          className="w-[88vw] sm:w-[60vw] lg:w-[46vw] xl:w-[38vw] max-w-[560px] h-[82vh] max-h-[720px] min-h-[580px] flex-shrink-0 px-3 sm:px-5 md:px-6 will-change-transform"
        >
          <div className="relative w-full h-full rounded-3xl overflow-hidden bg-[#14161b] text-white border border-white/10 shadow-[0_18px_50px_rgba(20,22,27,0.18)] flex flex-col justify-between p-7 sm:p-9 lg:p-10">
            {/* Ambient Gold Glow */}
            <div className="absolute -top-24 -right-24 w-60 h-60 rounded-full bg-[#b58d5b]/15 blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-[0.3em] text-[#c5a880] mb-3 font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Sanctuary Privileges</span>
              </div>

              <div
                className="font-script text-3xl sm:text-4xl text-[#c5a880] font-normal leading-tight mb-1"
                style={{ fontFamily: "var(--font-script), 'Great Vibes', cursive" }}
              >
                Inclusive Privileges
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-white font-light mb-3">
                Curated Resident Experience
              </h3>

              <p className="text-xs sm:text-[13px] text-white/70 leading-relaxed font-light mb-6">
                Every reservation at Hotel Serene is accompanied by thoughtful touches and unhurried coastal hospitality.
              </p>

              {/* Privileges List */}
              <div className="space-y-3.5">
                {residentPrivileges.map((item, pIdx) => (
                  <div key={pIdx} className="flex items-center space-x-3 text-xs sm:text-[12.5px] font-mono text-white/85">
                    <CheckCircle2 className="w-4 h-4 text-[#c5a880] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Concierge Desk Action */}
            <div className="pt-6 border-t border-white/10 space-y-3 mt-auto">
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/60 block">
                Direct Booking Guarantee • Best Available Tariff
              </span>
              <button
                onClick={() => onOpenBooking()}
                className="w-full py-4 rounded-full bg-[#c5a880] hover:bg-[#d6ba94] text-[#14161b] font-mono font-semibold text-xs uppercase tracking-[0.2em] shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer group active:scale-98"
              >
                <span>Book Direct With Concierge</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#14161b] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
