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
  const heroRef             = useRef<HTMLDivElement>(null);
  const bgImageContainerRef = useRef<HTMLDivElement>(null);
  const textContentRef      = useRef<HTMLDivElement>(null);
  const watermarkRef        = useRef<HTMLDivElement>(null);
  const watermarkScrollRef  = useRef<HTMLDivElement>(null);
  const bottomBarRef        = useRef<HTMLDivElement>(null);
  const bottomBarScrollRef  = useRef<HTMLDivElement>(null);

  // Cinematic entrance refs
  const heroMaskRef         = useRef<HTMLDivElement>(null);
  const taglineRef          = useRef<HTMLParagraphElement>(null);
  const subtitleLineRef     = useRef<HTMLDivElement>(null);
  const ctaRef              = useRef<HTMLDivElement>(null);

  const [activeViewIndex, setActiveViewIndex] = useState(0);
  const [progress,        setProgress]        = useState(0);
  const [isPaused,        setIsPaused]        = useState(false);

  const heroViews = [
    { id: "facade",    num: "01", label: "Facade",       title: "Neoclassical Symmetrical Facade", image: "/images/hotel/hero-facade-clean.jpg"    },
    { id: "rooftop",   num: "02", label: "Rooftop Pool", title: "Rooftop Striped Lap Pool",        image: "/images/hotel/hero-rooftop-clean.jpg"   },
    { id: "penthouse", num: "03", label: "Penthouse",    title: "Presidential Penthouse 504",      image: "/images/hotel/hero-penthouse-clean.jpg" },
  ];

  const DURATION      = 8000;
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
        if (next >= 100) { nextSlide(); return 0; }
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
      const hero        = heroRef.current;
      const bgContainer = bgImageContainerRef.current;
      const mask        = heroMaskRef.current;
      const wm          = watermarkRef.current;
      const tagline     = taglineRef.current;
      const subLine     = subtitleLineRef.current;
      const cta         = ctaRef.current;
      const bottom      = bottomBarRef.current;

      if (!hero || !bgContainer || !mask) return;

      // ── INITIAL STATES ─────────────────────────────────────────────────
      gsap.set(mask, { 
        clipPath: "url(#hero-arch-clip)",
        webkitClipPath: "url(#hero-arch-clip)"
      });
      gsap.set(bgContainer, {
        scale: 1.26,
        filter: "brightness(0.25) saturate(0) contrast(1.3)",
      });
      gsap.set(wm,      { opacity: 0, scale: 1.08, y: 24 });
      gsap.set(tagline, { opacity: 0, y: 20, letterSpacing: "0.55em" });
      gsap.set(subLine, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(cta,     { opacity: 0, y: 24, scale: 0.96 });
      gsap.set(bottom,  { opacity: 0, y: 20 });

      // ── MASTER CINEMATIC TIMELINE ───────────────────────────────────────
      const tl = gsap.timeline();

      const archProgress = { val: 0 };
      const updateArch = () => {
         const w = window.innerWidth;
         const h = window.innerHeight;
         
         let currentW, currentH;
         if (archProgress.val <= 1) {
            // Emerge: 0 -> 1
            const p = archProgress.val;
            // A door is tall and narrow.
            currentH = h * 0.85 * p;
            const maxW = Math.min(w * 0.85, h * 0.85 * 0.55); // Width is max 55% of height
            currentW = maxW * p;
         } else {
            // Fill screen: 1 -> 2
            const p = archProgress.val - 1;
            const startH = h * 0.85;
            const startW = Math.min(w * 0.85, h * 0.85 * 0.55);
            // Over-expand to ensure full coverage
            const targetSize = Math.max(w, h) * 2.5; 
            currentH = startH + (targetSize - startH) * p;
            currentW = startW + (targetSize - startW) * p;
         }
         
         const r = currentW / 2;
         const left = (w - currentW) / 2;
         const right = left + currentW;
         const bottom = h;
         const top = h - currentH;
         const arcTop = top + r;

         const pathStr = `M ${left} ${bottom} L ${left} ${arcTop} A ${r} ${r} 0 0 1 ${right} ${arcTop} L ${right} ${bottom} Z`;
         const borderPathStr = `M ${left} ${bottom} L ${left} ${arcTop} A ${r} ${r} 0 0 1 ${right} ${arcTop} L ${right} ${bottom}`;
         
         // Outer offset 16px
         const o = 16;
         const rO = r + o;
         const leftO = left - o;
         const rightO = right + o;
         const outerPathStr = `M ${leftO} ${bottom} L ${leftO} ${arcTop} A ${rO} ${rO} 0 0 1 ${rightO} ${arcTop} L ${rightO} ${bottom}`;
         
         // Inner offset 12px
         const i = 12;
         const rI = Math.max(0, r - i);
         const leftI = left + i;
         const rightI = right - i;
         const innerPathStr = `M ${leftI} ${bottom} L ${leftI} ${arcTop} A ${rI} ${rI} 0 0 1 ${rightI} ${arcTop} L ${rightI} ${bottom}`;
         
         const pathEl = document.getElementById("hero-arch-path");
         if (pathEl) pathEl.setAttribute("d", pathStr);

         const borderEl = document.getElementById("hero-arch-border");
         if (borderEl) borderEl.setAttribute("d", borderPathStr);
         
         const borderOuterEl = document.getElementById("hero-arch-border-outer");
         if (borderOuterEl) borderOuterEl.setAttribute("d", outerPathStr);
         
         const borderInnerEl = document.getElementById("hero-arch-border-inner");
         if (borderInnerEl) borderInnerEl.setAttribute("d", innerPathStr);
      };
      
      // Initialize immediately
      updateArch();

      // 1. Door emerges slowly from bottom center (0.0 – 2.2s)
      tl.to(archProgress, {
        val: 1,
        duration: 2.2,
        ease: "power3.inOut",
        onUpdate: updateArch
      }, 0);

      // 2. Image cinematic zoom out (0.0 – 4.8s)
      tl.to(bgContainer, {
        scale: 1.0,
        filter: "brightness(0.88) saturate(1) contrast(1.06)",
        duration: 4.8,
        ease: "power2.inOut",
      }, 0.0);

      // 3. Door expands to fill the entire screen (3.2s - 4.8s)
      tl.to(archProgress, {
        val: 2,
        duration: 1.6,
        ease: "power3.inOut",
        onUpdate: updateArch
      }, 3.2);

      // 4. Tagline — letter-spacing collapses (4.5s)
      tl.to(tagline, {
        opacity: 1, y: 0, letterSpacing: "0.35em",
        duration: 1.2, ease: "power2.out",
      }, 4.5);

      // NOTE: Title GooeyTextReveal fires at delay=4.3s
      
      // 5. Watermark breathes in (4.7s)
      tl.to(wm, {
        opacity: 1, scale: 1, y: 0,
        duration: 2.0, ease: "power2.out",
      }, 4.7);

      // 6. Gold hairline draws from left (4.9s)
      tl.to(subLine, {
        scaleX: 1, duration: 1.0, ease: "power3.inOut",
      }, 4.9);

      // NOTE: Subtitle GooeyTextReveal fires at delay=5.5s

      // 7. CTA — smooth float in (6.0s)
      tl.to(cta, {
        opacity: 1, y: 0, scale: 1,
        duration: 1.2, ease: "power2.out",
      }, 6.0);

      // 8. Bottom ribbon rises (6.3s)
      tl.to(bottom, {
        opacity: 1, y: 0,
        duration: 1.2, ease: "power2.out",
      }, 6.3);

      // ── SCROLL PARALLAX ────────────────────────────────────────────────
      gsap.to(bgContainer, {
        yPercent: 18, ease: "none",
        scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.8 },
      });

      if (textContentRef.current) {
        gsap.to(textContentRef.current, {
          y: -80, opacity: 0.15, ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.8 },
        });
      }

      if (watermarkScrollRef.current) {
        gsap.to(watermarkScrollRef.current, {
          yPercent: 28, opacity: 0, ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.8 },
        });
      }

      if (bottomBarScrollRef.current) {
        gsap.to(bottomBarScrollRef.current, {
          opacity: 0, y: -20, ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "30% top", scrub: 0.8 },
        });
      }
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      className="relative h-screen min-h-[680px] w-full overflow-hidden select-none bg-[#f5ede0]"
    >
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-40">
        <defs>
          <clipPath id="hero-arch-clip">
            <path id="hero-arch-path" d="" />
          </clipPath>
        </defs>
        <path id="hero-arch-border-outer" fill="none" stroke="#c5a880" strokeWidth="1" strokeDasharray="12 8" className="opacity-60" d="" />
        <path id="hero-arch-border" fill="none" stroke="#c5a880" strokeWidth="3" d="" />
        <path id="hero-arch-border-inner" fill="none" stroke="#c5a880" strokeWidth="1" className="opacity-80" d="" />
      </svg>
      
      {/* Atmospheric Watermark (Outside Mask, on Alabaster Wall) */}
      <div ref={watermarkScrollRef} className="absolute inset-0 z-0 pointer-events-none will-change-transform">
        <div ref={watermarkRef} aria-hidden="true"
          className="absolute inset-0 pointer-events-none select-none flex flex-col justify-center items-center will-change-transform"
          style={{
            maskImage: "radial-gradient(ellipse 75% 55% at 50% 50%, black 25%, transparent 85%)",
            WebkitMaskImage: "radial-gradient(ellipse 75% 55% at 50% 50%, black 25%, transparent 85%)",
          }}
        >
          <span
            className="font-cinzel text-[14vw] sm:text-[12.5vw] font-normal leading-none tracking-[0.24em] sm:tracking-[0.28em] uppercase text-transparent whitespace-nowrap select-none opacity-60"
            style={{ WebkitTextStroke: "0.8px rgba(20, 22, 27, 0.08)" }}
          >
            SERENE
          </span>
        </div>
      </div>

      <div 
        ref={heroMaskRef}
        className="absolute inset-0 w-full h-full flex flex-col justify-between pt-28 pb-9 px-6 sm:px-12 md:px-16 z-10 will-change-transform"
      >

        {/* Full-Bleed Canvas */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div ref={bgImageContainerRef}
            className="absolute -top-[10%] left-0 w-full h-[120%] will-change-transform">
            {heroViews.map((view, idx) => {
              const isActive = activeViewIndex === idx;
              return (
                <div key={view.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}>
                  <div className={`w-full h-full relative transition-transform duration-[8000ms] ease-out will-change-transform ${
                    isActive ? "scale-105" : "scale-100"
                  }`}>
                    <Image src={view.image} alt={view.title} fill
                      priority={idx === 0} sizes="100vw"
                      className="object-cover object-center" />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0d]/95 via-[#0a0b0d]/30 to-black/55 pointer-events-none z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_38%,rgba(10,11,13,0.65)_100%)] pointer-events-none z-10" />
        </div>

        <div className="w-full h-4" />

        {/* ── Typography ──────────────────────────────────────────────── */}
        <div ref={textContentRef}
          className="relative z-20 max-w-6xl mx-auto w-full text-center my-auto will-change-transform px-4">

          {/* Tagline */}
          <p ref={taglineRef}
            className="text-[11px] sm:text-xs font-mono uppercase text-[#c5a880] font-medium mb-5 sm:mb-7 will-change-transform"
            style={{ letterSpacing: "0.55em" }}>
            Coastal Neoclassical Sanctuary • Puri
          </p>

          <GooeyTextReveal
            mode="immediate"
            splitBy="words"
            delay={4.3}
            duration={1.4}
            stagger={0.095}
            blurAmount={0.6}
            ease="power3.out"
            className="mb-6 sm:mb-8 flex flex-col items-center justify-center overflow-visible"
          >
            <h1 
              className="flex flex-col items-center leading-[0.88] tracking-[0.06em] font-normal text-white uppercase text-center select-none"
              style={{ 
                fontFamily: "'Onyx', 'Bodoni MT Condensed', 'Bauer Bodoni', 'Didot', serif", 
                transform: "scaleX(0.72) scaleY(1.08)",
                transformOrigin: "center center"
              }}
            >
              <span className="text-6xl sm:text-8xl md:text-[110px] lg:text-[140px] xl:text-[160px] drop-shadow-md">
                HOTEL
              </span>
              <span className="text-6xl sm:text-8xl md:text-[110px] lg:text-[140px] xl:text-[160px] drop-shadow-md mt-1 sm:mt-2">
                SERENE
              </span>
            </h1>
            <div 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#c5a880] mt-4 sm:mt-6 md:mt-7 z-10 font-normal drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)] select-none"
              style={{ 
                fontFamily: "var(--font-script), 'Great Vibes', 'Edwardian Script ITC', 'Bickham Script Pro', cursive", 
                transform: "rotate(-2deg)" 
              }}
            >
              Silence & Symphony
            </div>
          </GooeyTextReveal>

          {/* Gold draw-line */}
          <div className="flex justify-center mb-5">
            <div ref={subtitleLineRef}
              className="h-[1px] w-28 bg-gradient-to-r from-[#c5a880] to-[#e5d4be] will-change-transform" />
          </div>

          <GooeyTextReveal
            mode="immediate"
            splitBy="words"
            delay={5.5}
            duration={1.1}
            stagger={0.058}
            blurAmount={0.45}
            ease="power3.out"
            className="mb-10"
          >
            <p className="max-w-2xl mx-auto text-base sm:text-xl text-white/85 font-serif italic leading-relaxed font-light">
              &ldquo;Where classical European symmetry yields to the sacred stillness of the Bay of Bengal.&rdquo;
            </p>
          </GooeyTextReveal>

          {/* CTA */}
          <div ref={ctaRef} className="flex items-center justify-center will-change-transform">
            <button
              onClick={onOpenBooking}
              className="px-9 py-4 rounded-full bg-white/12 hover:bg-white text-white hover:text-[#14161b] backdrop-blur-md border border-white/30 hover:border-white font-mono text-xs uppercase tracking-[0.22em] font-medium transition-all duration-300 shadow-2xl flex items-center space-x-2.5 cursor-pointer group"
            >
              <span>Reserve Residence</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#c5a880] group-hover:text-[#14161b] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </button>
          </div>
        </div>

        {/* Bottom Ribbon */}
        <div ref={bottomBarScrollRef} className="relative z-20 max-w-[1600px] mx-auto w-full pt-4 border-t border-white/10 will-change-transform">
          <div ref={bottomBarRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="w-full flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.25em] text-white/60 will-change-transform">
            <div className="flex items-center space-x-6 sm:space-x-8">
              {heroViews.map((view, idx) => {
                const isSelected = activeViewIndex === idx;
                return (
                  <button key={view.id} onClick={() => handleSelectView(idx)}
                    className={`relative py-1 transition-colors duration-300 cursor-pointer text-left group ${
                      isSelected ? "text-white font-medium" : "text-white/40 hover:text-white/80"
                    }`}>
                    <span>{view.num} {view.label}</span>
                    {isSelected && (
                      <span aria-hidden="true" style={{ width: `${progress}%` }}
                        className="absolute -bottom-1 left-0 h-[1.5px] bg-[#c5a880] transition-all duration-75 ease-linear" />
                    )}
                  </button>
                );
              })}
            </div>
            <a href="#statement"
              className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors cursor-pointer group">
              <span className="hidden sm:inline">Explore</span>
              <ArrowDown className="w-3 h-3 text-[#c5a880] group-hover:translate-y-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
