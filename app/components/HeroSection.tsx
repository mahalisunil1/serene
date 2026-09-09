"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import GooeyTextReveal from "@/components/ui/gooey-text-reveal";

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export default function HeroSection({ onOpenBooking }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgImageContainerRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  const [activeViewIndex, setActiveViewIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const heroViews = [
    {
      id: "facade",
      num: "01",
      label: "Facade",
      title: "Neoclassical Symmetrical Facade",
      image: "/images/hotel/exterior-hero.jpg",
    },
    {
      id: "rooftop",
      num: "02",
      label: "Rooftop Pool",
      title: "Rooftop Striped Lap Pool",
      image: "/images/hotel/rooftop-pool.jpg",
    },
    {
      id: "penthouse",
      num: "03",
      label: "Penthouse",
      title: "Presidential Penthouse 504",
      image: "/images/hotel/suite-504-living.jpg",
    },
  ];

  // Auto-Dwell Carousel Timer (8 seconds per perspective)
  const DURATION = 8000;
  const INTERVAL_STEP = 50;

  const nextSlide = useCallback(() => {
    setActiveViewIndex((prev) => (prev + 1) % heroViews.length);
    setProgress(0);
  }, [heroViews.length]);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (INTERVAL_STEP / DURATION) * 100;
        if (next >= 100) {
          nextSlide();
          return 0;
        }
        return next;
      });
    }, INTERVAL_STEP);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const handleSelectView = (index: number) => {
    setActiveViewIndex(index);
    setProgress(0);
  };

  useGSAP(
    () => {
      const hero = heroRef.current;
      const bgContainer = bgImageContainerRef.current;
      const text = textContentRef.current;
      const wm = watermarkRef.current;
      const bottom = bottomBarRef.current;
      if (!hero || !bgContainer) return;

      // 1. Initial Cinematic Camera Glide
      gsap.fromTo(
        bgContainer,
        { scale: 1.12 },
        {
          scale: 1.0,
          duration: 2.5,
          ease: "power2.out",
        }
      );

      // 2. Parallax: Background shifts downwards on scroll
      gsap.to(bgContainer, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      // 3. Parallax: Text lifts upwards and gently dissolves
      if (text) {
        gsap.to(text, {
          y: -80,
          opacity: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      }

      // 4. Parallax: Background watermark drift
      if (wm) {
        gsap.to(wm, {
          yPercent: 35,
          opacity: 0.01,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 1.0,
          },
        });
      }

      // 5. Parallax: Bottom bar exits smoothly
      if (bottom) {
        gsap.to(bottom, {
          opacity: 0,
          y: -20,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "30% top",
            scrub: true,
          },
        });
      }
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      className="relative h-screen min-h-[680px] w-full flex flex-col justify-between pt-28 pb-9 px-6 sm:px-12 md:px-16 overflow-hidden select-none bg-[#14161b]"
    >
      {/* Subtle Monumental Architectural Watermark */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none flex flex-col justify-center items-center opacity-[0.035] z-10 will-change-transform"
      >
        <span className="font-serif text-[24vw] font-light leading-none tracking-tighter text-white whitespace-nowrap">
          SERENE
        </span>
      </div>

      {/* Cinematic Full-Bleed Photographic Canvas */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          ref={bgImageContainerRef}
          className="absolute -top-[10%] left-0 w-full h-[120%] will-change-transform"
        >
          {heroViews.map((view, idx) => {
            const isActive = activeViewIndex === idx;
            return (
              <div
                key={view.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <div
                  className={`w-full h-full relative transition-transform duration-[8000ms] ease-out will-change-transform ${
                    isActive ? "scale-105" : "scale-100"
                  }`}
                >
                  <Image
                    src={view.image}
                    alt={view.title}
                    fill
                    priority={idx === 0}
                    sizes="100vw"
                    className="object-cover object-center filter brightness-[0.88] contrast-[1.06]"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Quiet Minimal Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#14161b]/95 via-[#14161b]/35 to-black/50 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(20,22,27,0.6)_100%)] pointer-events-none z-10" />
      </div>

      {/* Spacer to balance vertical centering without secondary top header clutter */}
      <div className="w-full h-4" />

      {/* Center Monumental Monograph Typography */}
      <div
        ref={textContentRef}
        className="relative z-20 max-w-4xl mx-auto w-full text-center my-auto will-change-transform px-4"
      >
        {/* Whisper-Quiet Subtitle */}
        <p className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.35em] text-[#c5a880] font-medium mb-6">
          Coastal Neoclassical Sanctuary • Puri
        </p>

        {/* Monumental Fluid Title */}
        <GooeyTextReveal
          mode="immediate"
          splitBy="words"
          delay={0.15}
          duration={1.8}
          stagger={0.08}
          blurAmount={0.55}
          className="mb-6"
        >
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-white tracking-tight leading-[0.93]">
            Silence &{" "}
            <span className="italic font-normal text-[#c5a880]">
              Symphonie
            </span>
          </h1>
        </GooeyTextReveal>

        {/* Poetic Provenance Subhead */}
        <GooeyTextReveal
          mode="immediate"
          splitBy="words"
          delay={0.35}
          duration={1.5}
          blurAmount={0.3}
          className="mb-10"
        >
          <p className="max-w-2xl mx-auto text-base sm:text-xl text-white/85 font-serif italic leading-relaxed font-light">
            &ldquo;Where classical European symmetry yields to the sacred stillness of the Bay of Bengal.&rdquo;
          </p>
        </GooeyTextReveal>

        {/* Single Pristine Luxury Reservation CTA */}
        <div className="flex items-center justify-center">
          <button
            onClick={onOpenBooking}
            className="px-9 py-4 rounded-full bg-white/12 hover:bg-white text-white hover:text-[#14161b] backdrop-blur-md border border-white/30 hover:border-white font-mono text-xs uppercase tracking-[0.22em] font-medium transition-all duration-300 shadow-2xl flex items-center space-x-2.5 cursor-pointer group"
          >
            <span>Reserve Residence</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#c5a880] group-hover:text-[#14161b] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </button>
        </div>
      </div>

      {/* Clean Minimalist Bottom Ribbon */}
      <div
        ref={bottomBarRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative z-20 max-w-[1600px] mx-auto w-full flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.25em] text-white/60 pt-4 border-t border-white/10 will-change-transform"
      >
        {/* Minimalist Perspective Switcher */}
        <div className="flex items-center space-x-6 sm:space-x-8">
          {heroViews.map((view, idx) => {
            const isSelected = activeViewIndex === idx;
            return (
              <button
                key={view.id}
                onClick={() => handleSelectView(idx)}
                className={`relative py-1 transition-colors duration-300 cursor-pointer text-left group ${
                  isSelected ? "text-white font-medium" : "text-white/40 hover:text-white/80"
                }`}
              >
                <span>{view.num} {view.label}</span>
                {isSelected && (
                  <span
                    aria-hidden="true"
                    style={{ width: `${progress}%` }}
                    className="absolute -bottom-1 left-0 h-[1.5px] bg-[#c5a880] transition-all duration-75 ease-linear"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Minimalist Scroll Cue */}
        <a
          href="#statement"
          className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors cursor-pointer group"
        >
          <span className="hidden sm:inline">Explore</span>
          <ArrowDown className="w-3 h-3 text-[#c5a880] group-hover:translate-y-1 transition-transform" />
        </a>
      </div>
    </section>
  );
}
