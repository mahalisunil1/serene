"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Utensils, Maximize2, Sparkles, Calendar, ArrowRight, Check } from "lucide-react";
import GooeyTextReveal from "@/components/ui/gooey-text-reveal";
import { LightboxImage } from "./ImageLightbox";
import ParallaxImage from "./ParallaxImage";

gsap.registerPlugin(ScrollTrigger);

interface DiningSectionProps {
  onReserveTable: () => void;
  onOpenLightbox?: (images: LightboxImage[], index: number) => void;
}

export default function DiningSection({ onReserveTable, onOpenLightbox }: DiningSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const menuCardRef = useRef<HTMLDivElement>(null);

  const [selectedPhoto, setSelectedPhoto] = useState<"main" | "plates" | "fluted" | "plan">("main");
  const [activeCategory, setActiveCategory] = useState<"odia" | "global">("odia");

  const photos = {
    main: {
      src: "/images/hotel/restaurant-main.jpg",
      title: "The 30-Seater Dining Salon & Buffet",
      caption: "457 sq. ft. of bespoke dining framed by Italian Calacatta marble tables and mint fluted paneling.",
    },
    plates: {
      src: "/images/hotel/restaurant-art-wall.jpg",
      title: "Monochrome Ceramic Plate Art Wall",
      caption: "A curated museum wall featuring handcrafted monochrome ceramic plates celebrating coastal Odisha folklore.",
    },
    fluted: {
      src: "/images/hotel/restaurant-fluted-wall.jpg",
      title: "Mint Green Architectural Fluting",
      caption: "Vertical wooden fluting finished in soft French sauge mint lacquer, softening acoustic reflections.",
    },
    plan: {
      src: "/images/hotel/restaurant-plan.jpg",
      title: "Restaurant Architectural Blueprint",
      caption: "Detailed architectural spatial layout of the 30-seater dining hall and private breakfast buffet alcove.",
    },
  };

  const menuData = {
    odia: [
      {
        name: "Chilika Lake Tiger Prawn Malai",
        desc: "Tandoor-charred giant prawns simmered in fresh coastal coconut cream, wild yellow mustard tempering, and indigenous herbs.",
        price: "₹850",
        badge: "Chef's Signature",
      },
      {
        name: "Puri Coastal Fish Curry (Chhencheda)",
        desc: "Morning harbor catch of the day braised with stone-ground roasted cumin, heirloom ginger, and native mustard oil.",
        price: "₹720",
        badge: "Fresh Catch",
      },
      {
        name: "Temple Dalma & Fragrant Gobindobhog Rice",
        desc: "Slow-simmered indigenous lentils with seasonal native squash, raw green banana, and aged Gir cow A2 Desi ghee.",
        price: "₹520",
        badge: "Vegetarian / Pure",
      },
    ],
    global: [
      {
        name: "Handcrafted Truffle Burrata Salad",
        desc: "Artisanal burrata accompanied by heirloom vine tomatoes, aged Modena balsamic reduction, wild basil oil, and toasted pine nuts.",
        price: "₹680",
        badge: "Artisanal Dairy",
      },
      {
        name: "Charred Saffron Bay Sea Bass",
        desc: "Pan-seared sea bass fillet set upon a saffron cauliflower mousseline with caper-infused French butter emulsion.",
        price: "₹920",
        badge: "Gourmet Catch",
      },
      {
        name: "Smoked Palm Jaggery Panna Cotta",
        desc: "Slow-infused coconut cream with coastal palm jaggery reduction and crushed pistachio crumble.",
        price: "₹450",
        badge: "Dessert Atelier",
      },
    ],
  };

  useGSAP(
    () => {
      const sec = sectionRef.current;
      const wm = watermarkRef.current;
      const menu = menuCardRef.current;
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

      if (menu) {
        gsap.fromTo(
          menu,
          { y: 35 },
          {
            y: -25,
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

  const handleOpenDiningLightbox = () => {
    if (!onOpenLightbox) return;
    const galleryItems: LightboxImage[] = Object.values(photos).map((p) => ({
      src: p.src,
      alt: p.title,
      title: p.title,
      subtitle: p.caption,
      provenance: "30-Seater Gastronomic Atelier • Hotel Serene",
    }));
    const index = Object.keys(photos).indexOf(selectedPhoto);
    onOpenLightbox(galleryItems, index >= 0 ? index : 0);
  };

  return (
    <section
      ref={sectionRef}
      id="dining"
      className="py-16 sm:py-20 md:py-24 px-6 md:px-12 bg-[#f7f4ee] border-t border-[rgba(20,22,27,0.08)] relative overflow-hidden"
    >
      {/* Background Watermark Parallax Drift */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="absolute top-1/3 -right-20 pointer-events-none select-none text-[#14161b] opacity-[0.03] font-serif text-[16vw] font-light leading-none tracking-tighter whitespace-nowrap will-change-transform"
      >
        GASTRONOMIE • 30 COUVERTS
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6 pb-6 border-b border-[rgba(20,22,27,0.08)]">
          <div>
            <div className="flex items-center space-x-2 text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-[#b58d5b] mb-3 font-semibold">
              <Utensils className="w-3.5 h-3.5" />
              <span>Gastronomic Atelier & Breakfast Buffet</span>
            </div>
            <GooeyTextReveal mode="scroll" splitBy="words" start="top 85%" duration={1.6} stagger={0.08}>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#14161b] font-light tracking-tight leading-tight">
                The 30-Seater Restaurant <br />
                <span className="italic font-normal text-[#b58d5b]">& Artisanal Buffet</span>
              </h2>
            </GooeyTextReveal>
          </div>

          <div className="flex flex-col text-xs sm:text-sm text-[#4a4740] font-sans font-light max-w-md">
            <GooeyTextReveal mode="scroll" start="top 80%" duration={1.4} delay={0.15} className="mb-4">
              <p className="leading-relaxed">
                457 sq. ft. of intimate dining framed by mint vertical fluting, Italian Calacatta marble tables, 
                and a museum-grade feature wall of monochrome hand-painted ceramic plates.
              </p>
            </GooeyTextReveal>
            <button
              onClick={onReserveTable}
              className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#14161b] font-semibold hover:text-[#b58d5b] transition-colors cursor-pointer group"
            >
              <span>Reserve a Dining Table</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#c5a880] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Gallery & Menu Showcase Stage with Parallax Depth */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Interactive Photography Stage with Parallax */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            <div className="relative aspect-[16/11] w-full rounded-2xl overflow-hidden bg-white border border-[rgba(20,22,27,0.1)] shadow-xl group">
              {selectedPhoto === "plan" ? (
                <div className="relative w-full h-full p-6 bg-[#fdfbf7]">
                  <Image
                    src={photos.plan.src}
                    alt={photos.plan.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-contain p-6"
                    priority
                  />
                </div>
              ) : (
                <ParallaxImage
                  src={photos[selectedPhoto].src}
                  alt={photos[selectedPhoto].title}
                  speed={0.18}
                  scale={1.16}
                  className="w-full h-full"
                  imageClassName="filter brightness-[0.98] contrast-[1.05]"
                  priority
                />
              )}

              {/* Floating Badges */}
              <div className="absolute top-4 left-4 flex gap-2 z-20">
                <span className="px-3 py-1 rounded-full bg-[#14161b]/85 backdrop-blur-md text-white text-[10px] font-mono uppercase tracking-wider shadow-sm">
                  457 sq. ft. • 30 Seats
                </span>
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#14161b] text-[10px] font-mono uppercase tracking-wider border border-[rgba(20,22,27,0.08)] shadow-sm">
                  Ground Floor
                </span>
              </div>

              {/* Lightbox Enlarge Trigger */}
              <button
                onClick={handleOpenDiningLightbox}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 hover:bg-[#14161b] text-[#14161b] hover:text-white backdrop-blur-md transition-all shadow-md cursor-pointer z-20"
                title="View Full Resolution"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Photo Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-white/95 backdrop-blur-md border border-[rgba(20,22,27,0.08)] flex justify-between items-center shadow-lg z-20">
                <div>
                  <h4 className="font-serif text-sm text-[#14161b] font-medium">
                    {photos[selectedPhoto].title}
                  </h4>
                  <p className="text-[10px] font-mono text-[#5a5750] truncate max-w-sm">
                    {photos[selectedPhoto].caption}
                  </p>
                </div>
                <button
                  onClick={handleOpenDiningLightbox}
                  className="px-3 py-1 rounded-lg bg-[#14161b] text-white text-[9px] font-mono uppercase tracking-wider cursor-pointer"
                >
                  HD View
                </button>
              </div>
            </div>

            {/* Thumbnail Selectors */}
            <div className="grid grid-cols-4 gap-2.5">
              {(["main", "plates", "fluted", "plan"] as const).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedPhoto(key)}
                  className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                    selectedPhoto === key
                      ? "bg-white border-[#c5a880] ring-2 ring-[#c5a880]/30 shadow-sm"
                      : "bg-white/70 hover:bg-white border-[rgba(20,22,27,0.08)] text-[#5a5750]"
                  }`}
                >
                  <span className="text-[9px] font-mono uppercase text-[#b58d5b] block font-semibold">
                    {key === "main" ? "Dining Salon" : key === "plates" ? "Ceramic Art" : key === "fluted" ? "Fluted Wall" : "CAD Plan"}
                  </span>
                  <span className="text-[11px] font-serif text-[#14161b] truncate block">
                    {photos[key].title.split(" ")[0]} {photos[key].title.split(" ")[1]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Curated Tasting Menu & Table Reservation (Floating Parallax Lift) */}
          <div
            ref={menuCardRef}
            className="lg:col-span-5 flex flex-col space-y-6 will-change-transform"
          >
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[rgba(20,22,27,0.1)] shadow-xl space-y-6">
              {/* Menu Category Switcher */}
              <div className="flex items-center justify-between pb-4 border-b border-[rgba(20,22,27,0.08)]">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#b58d5b] font-semibold block">
                    Curated Menus
                  </span>
                  <h3 className="font-serif text-2xl text-[#14161b] font-light">
                    Tasting Selections
                  </h3>
                </div>

                <div className="p-1 rounded-lg bg-[#f7f4ee] border border-[rgba(20,22,27,0.08)] flex space-x-1 text-[11px] font-mono">
                  <button
                    onClick={() => setActiveCategory("odia")}
                    className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                      activeCategory === "odia"
                        ? "bg-[#14161b] text-white font-semibold"
                        : "text-[#5a5750] hover:text-[#14161b]"
                    }`}
                  >
                    Coastal Odia
                  </button>
                  <button
                    onClick={() => setActiveCategory("global")}
                    className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                      activeCategory === "global"
                        ? "bg-[#14161b] text-white font-semibold"
                        : "text-[#5a5750] hover:text-[#14161b]"
                    }`}
                  >
                    Global Gourmet
                  </button>
                </div>
              </div>

              {/* Menu Items List */}
              <div className="space-y-4">
                {menuData[activeCategory].map((dish, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl hover:bg-[#f7f4ee] transition-all border border-[rgba(20,22,27,0.04)] space-y-1">
                    <div className="flex justify-between items-baseline gap-2">
                      <h4 className="font-serif text-base text-[#14161b] font-medium">
                        {dish.name}
                      </h4>
                      <span className="font-mono text-xs font-semibold text-[#b58d5b] flex-shrink-0">
                        {dish.price}
                      </span>
                    </div>
                    <p className="text-xs text-[#5a5750] font-mono leading-relaxed">
                      {dish.desc}
                    </p>
                    <span className="inline-block text-[9px] font-mono uppercase tracking-wider text-[#c5a880] pt-1">
                      ✦ {dish.badge}
                    </span>
                  </div>
                ))}
              </div>

              {/* Service Hours & Table Booking Trigger */}
              <div className="pt-4 border-t border-[rgba(20,22,27,0.08)] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs font-mono text-[#5a5750] text-center sm:text-left">
                  <span className="block text-[#14161b] font-semibold">Breakfast: 07:30 – 10:30 AM</span>
                  <span className="text-[10px] text-[#827e74]">Dinner: 07:00 – 11:00 PM</span>
                </div>

                <button
                  onClick={onReserveTable}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#14161b] hover:bg-[#232730] text-[#f7f4ee] hover:text-white text-xs font-mono uppercase tracking-[0.18em] font-semibold transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer group"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>Reserve Table</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
