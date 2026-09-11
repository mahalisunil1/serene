"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Maximize2,
  ArrowRight,
  Sparkles,
  Layers,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";
import { LightboxImage } from "./ImageLightbox";

interface AmbienceStoryProps {
  onOpenBooking: () => void;
  onOpenLightbox?: (images: LightboxImage[], index: number) => void;
}

const chapters = [
  {
    id: "rooftop",
    num: "01",
    roman: "I",
    plate: "CHAPTER I",
    badge: "LEVEL 05 • SKYLINE",
    category: "The Sky Sanctuary",
    title: "Rooftop Striped Lap Pool & Pergola Lounge",
    tagline: "Horizon Solitude Perched Five Stories Above the Bay of Bengal",
    narrative:
      "Suspended between sacred blue horizons, our signature lap pool features navy-and-white nautical striped porcelain tiles, curved submerged access steps, and a sheer descent acoustic waterfall wall. Beside the pool, the all-weather glass Pergola Lounge offers sheltered daybeds and panoramic sunset cocktail service.",
    primaryImage: "/images/hotel/rooftop-pool.jpg",
    primaryCaption: "Nautical Striped Lap Pool & Acoustic Waterfall",
    secondaryImage: "/images/hotel/pergola-lounge.jpg",
    secondaryCaption: "Pergola Sky Lounge with All-Weather Glass Canopy",
    specs: [
      "32 ft. Heated Lap Pool",
      "Sheer Acoustic Waterfall",
      "All-Weather Glass Pergola",
      "Sunset High Tea Service",
    ],
    metric: "Level 05 • Open Horizon",
  },
  {
    id: "restaurant",
    num: "02",
    roman: "II",
    plate: "CHAPTER II",
    badge: "GROUND LEVEL • CULINARY",
    category: "The Gastronomic Salon",
    title: "The 30-Seater Restaurant & Plate Atelier",
    tagline: "Coastal Odia Heritage Meets Contemporary Global Flavors",
    narrative:
      "An intimate, understated culinary haven illuminated by woven natural cane pendant lights and warm vertical striped wall coverings. Anchored by a museum-grade monochrome ceramic plate wall, fluted glass screens, and Italian Calacatta marble tables, dining here is an unhurried exploration of fresh local catch and coastal temple recipes.",
    primaryImage: "/images/ambience/restaurant-dining-2.jpg",
    primaryCaption: "Monochrome Plate Wall Installation & Intimate Table Settings",
    secondaryImage: "/images/ambience/restaurant-dining-1.jpg",
    secondaryCaption: "Warm Striped Wall Coverings & Cane Armchairs",
    specs: [
      "30 Intimate Seats",
      "Monochrome Plate Wall",
      "Italian Calacatta Marble",
      "Artisanal Odia Buffet",
    ],
    metric: "Intimate 30-Seater Salon",
  },
  {
    id: "banquet",
    num: "03",
    roman: "III",
    plate: "CHAPTER III",
    badge: "LEVEL -01 • GALA",
    category: "The Celebration Hall",
    title: "Subterranean Banquet & Gala Ballroom",
    tagline: "Puri’s Premier Venue for Milestone Celebrations & Executive Summits",
    narrative:
      "Crafted for grand coastal wedding soirees, celebratory galas, and corporate retreats. Featuring sculpted geometric hardwood feature wall paneling, an architectural coffered grid ceiling with dimmable warm halos, and plush front VIP lounge seating, the hall is engineered for pristine acoustic warmth and effortless sophistication.",
    primaryImage: "/images/ambience/banquet-hall-main.jpg",
    primaryCaption: "Auditorium & Gala Setup with Plush VIP Front Lounges",
    secondaryImage: "/images/ambience/banquet-hall-stage.jpg",
    secondaryCaption: "Carved Geometric Wood Feature Wall & Coffered Ceiling Grid",
    specs: [
      "Up to 150 Guests",
      "Geometric Hardwood Stage",
      "Coffered Grid Halos",
      "Integrated 4K Laser AV",
    ],
    metric: "Subterranean Gala Tier",
  },
  {
    id: "fitness",
    num: "04",
    roman: "IV",
    plate: "CHAPTER IV",
    badge: "LEVEL 01 • WELLNESS",
    category: "Horizon Movement Studio",
    title: "Sunrise Movement Studio & Teak Gym",
    tagline: "Restorative Coastal Vitality Framed in Natural Teak Wood",
    narrative:
      "Awaken with the rhythmic pulse of the morning tide. The Movement Studio is appointed with natural teak herringbone floors, triple architectural arched mirrors with soft backlit halos, and fluted acoustic wood paneling. State-of-the-art cardio treadmills, spin cycles, and free weights provide residents with an invigorating dawn sanctuary.",
    primaryImage: "/images/ambience/horizon-gym-studio.jpg",
    primaryCaption: "Triple Arched Mirrors & Natural Herringbone Teak Floors",
    secondaryImage: "/images/hotel/suite-bathroom.jpg",
    secondaryCaption: "In-Chamber Spa Soaking Rituals & Botanical Essences",
    specs: [
      "Natural Teak Herringbone",
      "Triple Arched Mirrors",
      "Commercial Cardio Suites",
      "24-Hour Resident Access",
    ],
    metric: "24-Hour Wellness Atelier",
  },
  {
    id: "playroom",
    num: "05",
    roman: "V",
    plate: "CHAPTER V",
    badge: "LEVEL 02 • RETREAT",
    category: "The Leisure & Play Salon",
    title: "Barrel-Vaulted Games & Relaxation Lounge",
    tagline: "Intimate Evenings of Chess, Conversation & Ambient Comfort",
    narrative:
      "An architectural gem tucked inside Hotel Serene. Crowned with a dramatic curved barrel-vaulted ceiling and perimeter cove uplighting, this sanctuary features a sculptural boucle sofa, cylindrical leather poufs, an artisanal wooden chess table, an electronic dartboard, and digital gaming media for unhurried evenings with family and friends.",
    primaryImage: "/images/ambience/leisure-game-lounge.jpg",
    primaryCaption: "Barrel-Vaulted Curved Ceiling & Artisanal Chess Table",
    secondaryImage: "/images/hotel/reception-lounge.jpg",
    secondaryCaption: "Grand Arrival Porch with Geometric Acoustic Wall Art",
    specs: [
      "Barrel-Vaulted Ceiling",
      "Handcrafted Chess Table",
      "Boucle Designer Lounger",
      "Electronic Dartboard",
    ],
    metric: "Unhurried Living Salon",
  },
  {
    id: "concierge",
    num: "06",
    roman: "VI",
    plate: "CHAPTER VI",
    badge: "MAHODADHI COAST",
    category: "Sacred Puri Concierge",
    title: "Sacred Temple Darshan & Beach Privileges",
    tagline: "Seamless Harmony with Puri’s Sacred Heritage & Coastal Waters",
    narrative:
      "Beyond our doors lies the spiritual heartbeat of Odisha. Our dedicated concierge coordinates VIP Shree Jagannath Temple Darshan accompanied by trusted Sevayat chaperones, chauffeured Mercedes transfers, private Blue Flag Golden Beach cabanas, and chartered sunrise catamaran expeditions across the tranquil waters of Chilika Lake.",
    primaryImage: "/images/hotel/hero-facade-clean.jpg",
    primaryCaption: "Hotel Serene Architectural Facade & Private Porte-Cochère",
    secondaryImage: "/images/hotel/reception-lounge-alt.jpg",
    secondaryCaption: "Private Concierge Desk & Guest Reception",
    specs: [
      "VIP Sevayat Temple Chaperone",
      "Golden Beach Sun Cabanas",
      "Mercedes Chauffeur Fleet",
      "Chilika Lagoon Catamaran",
    ],
    metric: "Dedicated Resident Privileges",
  },
];

export default function AmbienceStory({
  onOpenBooking,
  onOpenLightbox,
}: AmbienceStoryProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const primaryImgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const vignetteImgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const storyCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressLineRef = useRef<HTMLDivElement>(null);

  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const trigger = triggerRef.current;
    const stage = stageRef.current;
    if (!trigger || !stage) return;

    const count = chapters.length;

    // Set initial states for images and story cards
    primaryImgRefs.current.forEach((img, i) => {
      if (!img) return;
      gsap.set(img, {
        opacity: i === 0 ? 1 : 0,
        scale: i === 0 ? 1 : 1.05,
        zIndex: i === 0 ? 10 : 1,
      });
    });

    vignetteImgRefs.current.forEach((vig, i) => {
      if (!vig) return;
      gsap.set(vig, {
        opacity: i === 0 ? 1 : 0,
        y: i === 0 ? 0 : 25,
        scale: i === 0 ? 1 : 0.94,
        zIndex: i === 0 ? 20 : 1,
      });
    });

    storyCardRefs.current.forEach((card, i) => {
      if (!card) return;
      gsap.set(card, {
        opacity: i === 0 ? 1 : 0,
        y: i === 0 ? 0 : 35,
        pointerEvents: i === 0 ? "auto" : "none",
      });
    });

    // Pinned ScrollTrigger Timeline
    // 5 viewport heights gives an unhurried, luxurious scroll pace
    const scrollDistance = window.innerHeight * 5.2;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: "top top",
        end: () => `+=${scrollDistance}`,
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Track active chapter for waypoint dots
          const currentProgress = self.progress;
          const chapterIdx = Math.min(
            count - 1,
            Math.floor(currentProgress * count)
          );
          setActiveIdx(chapterIdx);

          if (progressLineRef.current) {
            progressLineRef.current.style.height = `${currentProgress * 100}%`;
          }
        },
      },
    });

    // Sequence transitions between chapters across the scrubbed timeline
    // Each transition occurs over a designated slice of the timeline
    const phaseDuration = 1 / (count - 1);

    for (let i = 0; i < count - 1; i++) {
      const startTime = i * phaseDuration;
      const transitionTime = startTime + phaseDuration * 0.45;
      const transitionDuration = phaseDuration * 0.45;

      const currPrimary = primaryImgRefs.current[i];
      const nextPrimary = primaryImgRefs.current[i + 1];
      const currVignette = vignetteImgRefs.current[i];
      const nextVignette = vignetteImgRefs.current[i + 1];
      const currStory = storyCardRefs.current[i];
      const nextStory = storyCardRefs.current[i + 1];

      // Fade out current chapter visuals and text
      if (currPrimary) {
        tl.to(
          currPrimary,
          {
            opacity: 0,
            scale: 1.05,
            ease: "power2.inOut",
            duration: transitionDuration,
          },
          transitionTime
        );
      }
      if (currVignette) {
        tl.to(
          currVignette,
          {
            opacity: 0,
            y: -25,
            scale: 0.94,
            ease: "power2.inOut",
            duration: transitionDuration,
          },
          transitionTime
        );
      }
      if (currStory) {
        tl.to(
          currStory,
          {
            opacity: 0,
            y: -30,
            pointerEvents: "none",
            ease: "power2.inOut",
            duration: transitionDuration,
          },
          transitionTime
        );
      }

      // Fade in next chapter visuals and text
      if (nextPrimary) {
        tl.fromTo(
          nextPrimary,
          { opacity: 0, scale: 0.96, zIndex: 12 },
          {
            opacity: 1,
            scale: 1,
            zIndex: 12,
            ease: "power2.inOut",
            duration: transitionDuration,
          },
          transitionTime + transitionDuration * 0.2
        );
      }
      if (nextVignette) {
        tl.fromTo(
          nextVignette,
          { opacity: 0, y: 25, scale: 0.94, zIndex: 22 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            zIndex: 22,
            ease: "power2.inOut",
            duration: transitionDuration,
          },
          transitionTime + transitionDuration * 0.2
        );
      }
      if (nextStory) {
        tl.fromTo(
          nextStory,
          { opacity: 0, y: 30, pointerEvents: "none" },
          {
            opacity: 1,
            y: 0,
            pointerEvents: "auto",
            ease: "power2.out",
            duration: transitionDuration,
          },
          transitionTime + transitionDuration * 0.2
        );
      }
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === trigger) st.kill();
      });
    };
  }, []);

  const handleJumpToChapter = (idx: number) => {
    if (!triggerRef.current) return;
    const st = ScrollTrigger.getAll().find(
      (s) => s.vars.trigger === triggerRef.current
    );
    if (!st) return;
    const targetScroll =
      st.start + (st.end - st.start) * (idx / (chapters.length - 1));
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  const handleOpenLightboxAt = (chapterIdx: number, imgIdx: number) => {
    if (!onOpenLightbox) return;
    const ch = chapters[chapterIdx];
    const items: LightboxImage[] = [
      {
        src: ch.primaryImage,
        alt: ch.primaryCaption,
        title: `${ch.title} • Primary View`,
        subtitle: ch.primaryCaption,
        provenance: ch.badge,
      },
      {
        src: ch.secondaryImage,
        alt: ch.secondaryCaption,
        title: `${ch.title} • Architectural Vignette`,
        subtitle: ch.secondaryCaption,
        provenance: ch.plate,
      },
    ];
    onOpenLightbox(items, imgIdx);
  };

  const activeChapter = chapters[activeIdx];

  return (
    <section
      ref={triggerRef}
      id="ambience"
      className="relative w-full bg-[#f4ede2] border-t border-[rgba(20,22,27,0.08)]"
    >
      {/* Pinned Stage Window */}
      <div
        ref={stageRef}
        className="w-full h-screen min-h-[660px] flex flex-col justify-between p-4 sm:p-8 lg:p-12 relative overflow-hidden select-none"
      >
        {/* Deep Parallax Watermark Typography */}
        <div
          aria-hidden="true"
          className="absolute -top-12 -right-16 pointer-events-none select-none text-[#14161b] opacity-[0.035] font-serif text-[20vw] font-light leading-none tracking-tighter whitespace-nowrap"
        >
          {activeChapter.roman} • AMBIENCE
        </div>

        {/* 1. Haute Architectural Header Bar */}
        <div className="relative z-20 flex items-center justify-between pb-4 border-b border-[rgba(20,22,27,0.08)]">
          <div className="flex items-center space-x-3">
            <span className="w-2 h-2 rounded-full bg-[#b58d5b] animate-pulse" />
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-[#b58d5b] font-semibold">
              The Living Spaces • Architectural Storytelling
            </span>
          </div>

          <div className="hidden sm:flex items-center space-x-2 text-xs font-mono text-[#5a5750]">
            <span className="text-[#14161b] font-semibold">
              0{activeIdx + 1}
            </span>
            <span className="text-[#b58d5b]">/</span>
            <span>0{chapters.length}</span>
            <span className="text-[#b58d5b] px-1">•</span>
            <span
              className="font-script text-lg sm:text-xl text-[#b58d5b] font-normal"
              style={{ fontFamily: "var(--font-script), 'Great Vibes', cursive" }}
            >
              {activeChapter.category}
            </span>
          </div>

          <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-widest text-[#5a5750]">
            <span className="hidden md:inline">Scroll to traverse living spaces</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#b58d5b] animate-bounce" />
          </div>
        </div>

        {/* 2. Main Dual-Column Storytelling Canvas */}
        <div className="relative z-10 flex-1 my-4 sm:my-6 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          {/* Left Column (58% Width): Monumental Layered Visual Portal */}
          <div className="lg:col-span-7 h-[46vh] sm:h-[54vh] lg:h-[68vh] relative w-full flex items-center justify-center">
            {/* Primary Grand Architectural Image Stack */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden bg-[#e6ded1] border border-[rgba(20,22,27,0.12)] shadow-[0_20px_50px_rgba(20,22,27,0.1)]">
              {chapters.map((ch, idx) => (
                <div
                  key={ch.id}
                  ref={(el) => {
                    primaryImgRefs.current[idx] = el;
                  }}
                  onClick={() => handleOpenLightboxAt(idx, 0)}
                  className="absolute inset-0 w-full h-full will-change-transform cursor-pointer group"
                >
                  <Image
                    src={ch.primaryImage}
                    alt={ch.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority={idx === 0}
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/15 pointer-events-none" />

                  {/* Badges Overlay */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                    <span className="px-3.5 py-1 rounded-full bg-[#14161b]/90 backdrop-blur-md text-white font-mono text-[9px] uppercase tracking-[0.2em] shadow-sm">
                      {ch.plate}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#14161b] font-mono text-[9px] uppercase tracking-wider shadow-sm font-semibold">
                      {ch.badge}
                    </span>
                  </div>

                  {/* Bottom Primary Image Caption */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                    <span className="text-xs sm:text-sm font-serif text-white font-light drop-shadow-sm max-w-[70%] truncate">
                      {ch.primaryCaption}
                    </span>
                    <span className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white pointer-events-auto hover:bg-white hover:text-[#14161b] transition-all">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Overlapping Floating Architectural Vignette Polaroid Card */}
            <div className="absolute -bottom-4 sm:-bottom-6 right-3 sm:right-6 w-[46%] sm:w-[40%] max-w-[260px] aspect-[4/3] rounded-2xl overflow-hidden bg-white p-1.5 shadow-[0_20px_40px_rgba(20,22,27,0.22)] border border-[rgba(20,22,27,0.12)] z-30 pointer-events-none">
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-gray-200">
                {chapters.map((ch, idx) => (
                  <div
                    key={ch.id}
                    ref={(el) => {
                      vignetteImgRefs.current[idx] = el;
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenLightboxAt(idx, 1);
                    }}
                    className="absolute inset-0 w-full h-full will-change-transform cursor-pointer pointer-events-auto group"
                  >
                    <Image
                      src={ch.secondaryImage}
                      alt={ch.secondaryCaption}
                      fill
                      sizes="260px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute bottom-2 left-2 right-2 text-[8px] sm:text-[9px] font-mono text-white/95 leading-tight truncate block">
                      {ch.secondaryCaption}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (42% Width): Pinned Synchronized Atmospheric Dossier */}
          <div className="lg:col-span-5 relative h-[36vh] sm:h-[40vh] lg:h-[68vh] flex items-center">
            {chapters.map((ch, idx) => (
              <div
                key={ch.id}
                ref={(el) => {
                  storyCardRefs.current[idx] = el;
                }}
                className="absolute inset-0 w-full h-full flex flex-col justify-between py-2 sm:py-4 will-change-transform"
              >
                {/* Header Dossier */}
                <div>
                  <div className="flex items-center space-x-2 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.25em] text-[#8c7b68] font-semibold mb-1">
                    <Sparkles className="w-3 h-3 text-[#b58d5b]" />
                    <span>{ch.badge}</span>
                  </div>

                  <div
                    className="font-script text-2xl sm:text-3xl lg:text-4xl text-[#b58d5b] font-normal leading-tight mb-1"
                    style={{ fontFamily: "var(--font-script), 'Great Vibes', cursive" }}
                  >
                    {ch.category}
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#14161b] font-light leading-tight mb-2 sm:mb-3">
                    {ch.title}
                  </h3>

                  <p className="text-[10px] sm:text-xs font-mono text-[#8c7b68] uppercase tracking-wider mb-3 sm:mb-4">
                    {ch.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-[#4a4740] font-sans font-light leading-relaxed line-clamp-4 sm:line-clamp-5 mb-4">
                    {ch.narrative}
                  </p>
                </div>

                {/* Architectural Matrix & Signatures */}
                <div>
                  <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mb-4">
                    {ch.specs.map((spec) => (
                      <div
                        key={spec}
                        className="py-1.5 px-2.5 rounded-lg bg-white/80 border border-[rgba(20,22,27,0.06)] text-[9px] sm:text-[10px] font-mono text-[#14161b] flex items-center gap-1.5 font-medium truncate"
                      >
                        <CheckCircle2 className="w-3 h-3 text-[#b58d5b] flex-shrink-0" />
                        <span className="truncate">{spec}</span>
                      </div>
                    ))}
                  </div>

                  {/* Reservation Call to Action */}
                  <div className="pt-3 sm:pt-4 border-t border-[rgba(20,22,27,0.08)] flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-wider text-[#8c7b68] block">
                        Atmospheric Access
                      </span>
                      <span className="text-xs font-mono font-semibold text-[#14161b]">
                        {ch.metric}
                      </span>
                    </div>

                    <button
                      onClick={onOpenBooking}
                      className="px-5 py-3 rounded-xl bg-[#14161b] hover:bg-[#252830] text-[#f7f4ee] hover:text-white font-mono text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-300 shadow-md flex items-center space-x-2 cursor-pointer group"
                    >
                      <span>Inquire / Reserve</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#c5a880] group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Bottom Interactive Chapter Waypoints Filament */}
        <div className="relative z-20 pt-3 border-t border-[rgba(20,22,27,0.08)] flex items-center justify-between">
          {/* Waypoint Markers */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {chapters.map((ch, idx) => {
              const isCurrent = idx === activeIdx;
              return (
                <button
                  key={ch.id}
                  onClick={() => handleJumpToChapter(idx)}
                  className={`flex items-center space-x-2 p-1.5 sm:px-3 sm:py-1 rounded-full text-[10px] font-mono uppercase transition-all duration-300 cursor-pointer ${
                    isCurrent
                      ? "bg-[#14161b] text-white shadow-sm font-semibold"
                      : "text-[#8c7b68] hover:text-[#14161b] hover:bg-white/60"
                  }`}
                  title={ch.title}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#b58d5b]" />
                  <span className="hidden md:inline">{ch.category.split("THE ")[1] || ch.category}</span>
                  <span className="md:hidden">{ch.num}</span>
                </button>
              );
            })}
          </div>

          {/* Realtime Scrubbed Progress Indicator */}
          <div className="flex items-center space-x-3">
            <span className="text-[9px] font-mono uppercase tracking-widest text-[#8c7b68] hidden sm:inline">
              Living Story Scrub
            </span>
            <div className="w-24 sm:w-36 h-[2px] bg-[rgba(20,22,27,0.1)] rounded-full overflow-hidden">
              <div
                ref={progressLineRef}
                className="h-full bg-[#b58d5b] will-change-[height] transition-all duration-150"
                style={{ width: `${((activeIdx + 1) / chapters.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
