"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { ArrowUpRight, Sparkles, Layers, Sliders, ChevronLeft, ChevronRight } from "lucide-react";

interface MersiDualSliderProps {
  onOpenBooking: (roomId?: string) => void;
}

export default function MersiDualSlider({ onOpenBooking }: MersiDualSliderProps) {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [splitPercent, setSplitPercent] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const scenes = [
    {
      id: "facade",
      title: "Neoclassical Facade Elevation",
      subtitle: "Daylight Architecture vs. Elevation CAD Blueprint",
      roomId: "deluxe-103",
      renderImage: "/images/hotel/exterior-facade.jpg",
      renderLabel: "3D Photorealistic Exterior Elevation",
      planImage: "/images/hotel/exterior-side.jpg",
      planLabel: "Side Elevation & Column Anatomy",
      badge: "Structure B+G+5 • Elevation A2",
      description: "Corinthian pilaster orders and fluted classical symmetry balancing coastal air and sacred geometry.",
    },
    {
      id: "chamber-103",
      title: "Deluxe Ocean Chamber (101–404)",
      subtitle: "Master Bedroom Render vs. Room Engineering Plan",
      roomId: "deluxe-103",
      renderImage: "/images/hotel/room-typical-render.jpg",
      renderLabel: "Photorealistic 3D Interior Visualization",
      planImage: "/images/hotel/room-typical-plan.jpg",
      planLabel: "CAD Blueprint (12'0\" × 11'3\" Bed + 4'6\" Bath)",
      badge: "Ceramic World Tiles • Whitewashed Oak",
      description: "Whitewashed vertical oak fluting, integrated study console, and acoustic double glazing facing the bay.",
    },
    {
      id: "suite-504",
      title: "Presidential Penthouse 504",
      subtitle: "Formal Living Salon vs. 5th Floor Layout",
      roomId: "presidential-504",
      renderImage: "/images/hotel/suite-504-living.jpg",
      renderLabel: "Formal Salon & Curved Fluted Columns",
      planImage: "/images/hotel/floor-5-plan.jpg",
      planLabel: "Floor 5 Executive CAD Blueprint",
      badge: "1,150 sq. ft. Footprint • Calacatta Marble",
      description: "The crown residence featuring formal living room, freestanding spa tub, and uninterrupted panoramic ocean vistas.",
    },
    {
      id: "rooftop-pool",
      title: "Rooftop Striped Pool & Pergola",
      subtitle: "Nautical Porcelain Pool vs. Terrace Layout",
      roomId: "suite-501",
      renderImage: "/images/hotel/rooftop-pool.jpg",
      renderLabel: "Signature Nautical Striped Mosaic & Waterfall",
      planImage: "/images/hotel/rooftop-plan.jpg",
      planLabel: "Terrace Zoning & Pergola Blueprint",
      badge: "Elevation +21.00 M • Open Sky",
      description: "Nautical navy-and-white porcelain waterline, sheer acoustic waterfall wall, and all-weather glass pergola lounge.",
    },
  ];

  const current = scenes[activeProjectIndex];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.min(Math.max((x / rect.width) * 100, 5), 95);
    setSplitPercent(percent);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging && e.buttons !== 1) return;
    handleMove(e.clientX);
  };

  return (
    <section id="dual-slider" className="py-24 md:py-36 px-6 md:px-12 bg-[#f7f4ee] border-t border-[rgba(20,22,27,0.08)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 pb-6 border-b border-[rgba(20,22,27,0.08)]">
          <div>
            <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-[0.3em] text-[#b58d5b] mb-3 font-semibold">
              <Sliders className="w-3.5 h-3.5" />
              <span>Interactive Dual-Perspective Curtain</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#14161b] font-light tracking-tight">
              Render vs. CAD <br />
              <span className="italic font-normal text-[#b58d5b]">Interactive Split</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3">
            {/* Split Presets */}
            <div className="p-1 rounded-xl bg-white border border-[rgba(20,22,27,0.1)] flex items-center space-x-1 text-xs font-mono shadow-xs">
              <button
                onClick={() => setSplitPercent(100)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  splitPercent >= 90 ? "bg-[#14161b] text-white font-semibold" : "text-[#5a5750] hover:text-[#14161b]"
                }`}
              >
                100% 3D Render
              </button>
              <button
                onClick={() => setSplitPercent(50)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  splitPercent > 40 && splitPercent < 60 ? "bg-[#14161b] text-white font-semibold" : "text-[#5a5750] hover:text-[#14161b]"
                }`}
              >
                50 / 50 Split
              </button>
              <button
                onClick={() => setSplitPercent(0)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  splitPercent <= 10 ? "bg-[#14161b] text-white font-semibold" : "text-[#5a5750] hover:text-[#14161b]"
                }`}
              >
                100% CAD Blueprint
              </button>
            </div>
          </div>
        </div>

        {/* Scene Selector Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {scenes.map((scene, idx) => (
            <button
              key={scene.id}
              onClick={() => {
                setActiveProjectIndex(idx);
                setSplitPercent(50);
              }}
              className={`px-5 py-3 rounded-xl text-xs font-mono transition-all cursor-pointer flex items-center space-x-2 ${
                activeProjectIndex === idx
                  ? "bg-[#14161b] text-white shadow-md ring-2 ring-[#c5a880]/30 font-semibold"
                  : "bg-white hover:bg-[#f2ece1] text-[#5a5750] border border-[rgba(20,22,27,0.08)] shadow-xs"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${activeProjectIndex === idx ? "bg-[#c5a880]" : "bg-gray-300"}`} />
              <span>{scene.title}</span>
            </button>
          ))}
        </div>

        {/* Master Interactive Draggable Before/After Curtain Frame */}
        <div
          ref={containerRef}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-2xl overflow-hidden bg-white border border-[rgba(20,22,27,0.12)] shadow-2xl select-none cursor-ew-resize"
        >
          {/* Layer 1: Underneath (CAD Engineering Drawing) */}
          <div className="absolute inset-0 z-0 bg-[#fdfbf7]">
            <Image
              src={current.planImage}
              alt={current.planLabel}
              fill
              sizes="100vw"
              className="object-contain p-6 sm:p-12 filter contrast-[1.1]"
              priority
            />
            {/* Label Right */}
            <div className="absolute top-6 right-6 px-3.5 py-1.5 rounded-full bg-[#14161b]/90 backdrop-blur-md text-white text-[10px] font-mono uppercase tracking-wider shadow-md pointer-events-none">
              CAD Architecture Blueprint
            </div>
          </div>

          {/* Layer 2: Clipped Top (3D Photorealistic Render) */}
          <div
            style={{ clipPath: `inset(0 ${100 - splitPercent}% 0 0)` }}
            className="absolute inset-0 z-10 bg-black"
          >
            <Image
              src={current.renderImage}
              alt={current.renderLabel}
              fill
              sizes="100vw"
              className="object-cover filter brightness-[0.98] contrast-[1.05]"
              priority
            />
            {/* Label Left */}
            <div className="absolute top-6 left-6 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#14161b] text-[10px] font-mono uppercase tracking-wider border border-[rgba(20,22,27,0.1)] shadow-md pointer-events-none">
              3D Architectural Render
            </div>
          </div>

          {/* Draggable Divider Handle Line */}
          <div
            style={{ left: `${splitPercent}%` }}
            className="absolute top-0 bottom-0 z-20 w-[2px] bg-white shadow-[0_0_15px_rgba(0,0,0,0.5)] pointer-events-none"
          >
            {/* Brass Grip Handle Button */}
            <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#14161b] border-2 border-[#c5a880] shadow-2xl flex items-center justify-center text-white pointer-events-auto cursor-ew-resize hover:scale-110 transition-transform">
              <span className="flex items-center space-x-0.5 text-[#c5a880] text-xs font-bold">
                <ChevronLeft className="w-3 h-3" />
                <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* Bottom Interactive Prompt */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-[10px] font-mono uppercase tracking-[0.25em] shadow-lg pointer-events-none flex items-center space-x-2">
            <Sparkles className="w-3 h-3 text-[#c5a880]" />
            <span>Drag handle or hover to reveal engineering anatomy</span>
          </div>
        </div>

        {/* Scene Metadata Bar */}
        <div className="mt-6 p-6 rounded-2xl bg-white border border-[rgba(20,22,27,0.08)] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-[#b58d5b] uppercase mb-1">
              <span>✦</span>
              <span>{current.badge}</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#14161b] font-light">
              {current.title}
            </h3>
            <p className="text-xs text-[#5a5750] font-mono mt-1 max-w-2xl">
              {current.description}
            </p>
          </div>

          <button
            onClick={() => onOpenBooking(current.roomId)}
            className="px-6 py-3 rounded-xl bg-[#14161b] hover:bg-[#232730] text-[#f7f4ee] hover:text-white font-mono text-xs uppercase tracking-[0.18em] font-semibold transition-all shadow-md flex items-center space-x-2 cursor-pointer group flex-shrink-0"
          >
            <span>Inquire Residence</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#c5a880] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
