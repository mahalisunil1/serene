"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, Compass, ArrowRight } from "lucide-react";
import { LightboxImage } from "./ImageLightbox";
import CultureWebGLCanvas, { CultureWebGLCanvasHandle } from "./CultureWebGLCanvas";

interface PuriDestinationProps {
  onOpenBooking?: () => void;
  onOpenLightbox?: (images: LightboxImage[], index: number) => void;
}

const culturePlates = [
  {
    id: "shree-mandir",
    index: "01",
    total: "02",
    tag: "SACRED SANCTUM",
    title: "Shree Mandir",
    src: "/images/culture/shree mandir.png",
    alt: "Shree Mandir Jagannath Temple Cultural Painting",
  },
  {
    id: "golden-beach",
    index: "02",
    total: "02",
    tag: "MAHODADHI COAST",
    title: "Golden Beach",
    src: "/images/culture/beach.png",
    alt: "Golden Beach and Bay of Bengal Cultural Painting",
  },
];

const folioTag = "FOLIO IX • VISUAL ODYSSEY";
const titleLine1 = "Puri: The Ocean of";
const titleLine2 = "Eternal Grace";
const descriptionText =
  "Where sacred Kalinga stone rises beside the primordial waters of the Bay of Bengal. Traverse an intimate visual showcase of Odisha's living heritage—from the sanctum spires of Shree Jagannath to the golden dawn rolling across the shores of Mahodadhi.";

export default function PuriDestination({
  onOpenBooking,
  onOpenLightbox,
}: PuriDestinationProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const webglRef = useRef<CultureWebGLCanvasHandle>(null);
  const caption1Ref = useRef<HTMLDivElement>(null);
  const caption2Ref = useRef<HTMLDivElement>(null);
  const conciergeRef = useRef<HTMLDivElement>(null);
  const horizonRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const trigger = triggerRef.current;
    const intro = introRef.current;
    const track = trackRef.current;
    const controls = controlsRef.current;
    if (!trigger || !track || !intro) return;

    const tagChars = intro.querySelectorAll("[data-tag-char]");
    const titleChars = intro.querySelectorAll("[data-title-char]");
    const descWords = intro.querySelectorAll("[data-desc-word]");
    const promptInner = intro.querySelector("[data-prompt-inner]");

    // ── INITIAL STATES ────────────────────────────────────────────────
    // Destination intro text starts clipped below baseline to arise seamlessly after submerged slits
    gsap.set(intro, { visibility: "visible", opacity: 1, y: 0, scale: 1 });
    gsap.set(tagChars, { yPercent: 110, opacity: 0 });
    gsap.set(titleChars, { yPercent: 110, opacity: 0 });
    gsap.set(descWords, { yPercent: 110, opacity: 0 });
    if (promptInner) gsap.set(promptInner, { yPercent: 60, opacity: 0 });
    if (horizonRef.current) gsap.set(horizonRef.current, { scaleX: 0, opacity: 0 });

    // Showreel components
    if (controls) gsap.set(controls, { opacity: 0, y: -10 });
    if (showcaseRef.current) {
      gsap.set(showcaseRef.current, { scale: 0.90, rotation: 1.5, opacity: 0.25 });
    }
    if (caption1Ref.current) gsap.set(caption1Ref.current, { yPercent: 120, opacity: 0 });
    if (caption2Ref.current) gsap.set(caption2Ref.current, { yPercent: 120, opacity: 0 });

    // Concierge starts completely hidden with zero opacity and horizontal offset
    // so that it NEVER peeks onto the screen while the painting is centered!
    if (conciergeRef.current) {
      gsap.set(conciergeRef.current, { x: 80, scale: 0.94, opacity: 0 });
    }

    const totalScroll = Math.max(3400, track.scrollWidth + window.innerWidth);

    // Centered X coordinate calculator for the cultural showcase frame
    const getCenteredX = () => {
      if (!showcaseRef.current) return 0;
      const showcase = showcaseRef.current;
      return (window.innerWidth - showcase.offsetWidth) / 2 - showcase.offsetLeft;
    };

    const getConciergeTargetX = () => {
      if (!conciergeRef.current || !track) return 0;
      const concierge = conciergeRef.current;
      const w = window.innerWidth;
      const targetScreenLeft = w >= 1024
        ? Math.round(w * 0.48)
        : Math.max(20, Math.round((w - concierge.offsetWidth) / 2));

      return targetScreenLeft - concierge.offsetLeft;
    };

    // ── PINNED MASTER SHOWREEL TIMELINE ────────────────────────────────
    const tl = gsap.timeline({
      id: "puri-showreel-tl",
      scrollTrigger: {
        id: "puri-showreel-st",
        trigger: trigger,
        start: "top top",
        end: () => `+=${totalScroll}`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (progressBarRef.current) {
            progressBarRef.current.style.transform = `scaleX(${self.progress})`;
          }
        },
      },
    });

    // ==================================================================
    // PHASE 1: DESTINATION TEXT ARISES SEAMLESSLY (0.00 -> 0.12)
    // Directly continuing from the submerged slits of the previous section
    // ==================================================================
    tl.to(
      tagChars,
      { yPercent: 0, opacity: 1, ease: "power2.out", stagger: { each: 0.001 }, duration: 0.06 },
      0.0
    );
    tl.to(
      titleChars,
      { yPercent: 0, opacity: 1, ease: "power2.out", stagger: { each: 0.0015 }, duration: 0.08 },
      0.01
    );
    tl.to(
      descWords,
      { yPercent: 0, opacity: 1, ease: "power2.out", stagger: { each: 0.001 }, duration: 0.06 },
      0.03
    );
    if (promptInner) {
      tl.to(promptInner, { yPercent: 0, opacity: 1, ease: "power2.out", duration: 0.06 }, 0.05);
    }
    if (horizonRef.current) {
      tl.to(
        horizonRef.current,
        { scaleX: 1, opacity: 0.45, ease: "power2.out", duration: 0.08 },
        0.02
      );
    }

    // ==================================================================
    // PHASE 2: READING WINDOW APPRECIATION HOLD (0.12 -> 0.20)
    // ==================================================================

    // ==================================================================
    // PHASE 3: CLEAN TRANSITION INTO SHOWREEL (NO TITLE EXIT ANIMATION)
    // ==================================================================
    if (horizonRef.current) {
      tl.to(horizonRef.current, { opacity: 0, ease: "power1.in", duration: 0.08 }, 0.22);
    }
    tl.to(intro, { opacity: 0, ease: "power1.inOut", duration: 0.08 }, 0.24);
    tl.set(intro, { visibility: "hidden" }, 0.32);

    // ==================================================================
    // PHASE 4: ARCHIVAL HORIZONTAL ARRIVAL — PAINTING AT CENTER (0.26 -> 0.52)
    // Only the centered painting is in view; the right side is completely clear!
    // ==================================================================
    if (controls) {
      tl.to(controls, { opacity: 1, y: 0, duration: 0.08, ease: "power1.out" }, 0.26);
    }

    tl.fromTo(
      track,
      { x: () => window.innerWidth * 0.95 },
      { x: () => getCenteredX(), ease: "power2.out", duration: 0.24 },
      0.26
    );

    if (showcaseRef.current) {
      tl.fromTo(
        showcaseRef.current,
        { scale: 0.90, rotation: 1.5, opacity: 0.25 },
        { scale: 1.0, rotation: 0, opacity: 1.0, ease: "power2.out", duration: 0.24 },
        0.26
      );
    }

    // Caption 1 (Shree Mandir) reveals as painting locks dead-center (0.42 -> 0.50)
    if (caption1Ref.current) {
      tl.fromTo(
        caption1Ref.current,
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, ease: "power2.out", duration: 0.08 },
        0.42
      );
    }

    // ==================================================================
    // PHASE 5: LIVING HERITAGE WEBGL DISSOLVE TRANSITION (0.52 -> 0.74)
    // Shree Mandir dissolves smoothly into Golden Beach
    // ==================================================================
    const dissolveState = { progress: 0 };
    tl.to(
      dissolveState,
      {
        progress: 1,
        ease: "none",
        duration: 0.22,
        onUpdate: () => {
          webglRef.current?.setProgress(dissolveState.progress);
        },
      },
      0.52
    );

    if (showcaseRef.current) {
      tl.to(showcaseRef.current, { scale: 1.018, ease: "sine.inOut", duration: 0.11 }, 0.52);
      tl.to(showcaseRef.current, { scale: 1.0, ease: "sine.inOut", duration: 0.11 }, 0.63);
    }

    // Captions Crossfade: Shree Mandir out, Golden Beach in
    if (caption1Ref.current && caption2Ref.current) {
      tl.to(caption1Ref.current, { y: -10, opacity: 0, ease: "power1.out", duration: 0.08 }, 0.55);
      tl.fromTo(
        caption2Ref.current,
        { y: 12, yPercent: 0, opacity: 0 },
        { y: 0, yPercent: 0, opacity: 1, ease: "power2.out", duration: 0.10 },
        0.60
      );
    }

    // ==================================================================
    // PHASE 6: COASTLINE DEPARTURE & ORIGINAL SANCTUARY CONCIERGE ARRIVAL (0.74 -> 1.00)
    // Showcase frame recedes left; untouched original concierge slate glides in!
    // ==================================================================
    tl.to(
      track,
      {
        x: () => getConciergeTargetX(),
        ease: "power2.inOut",
        duration: 0.26,
      },
      0.74
    );

    if (showcaseRef.current) {
      tl.to(showcaseRef.current, { scale: 0.94, opacity: 0.6, ease: "power1.inOut", duration: 0.22 }, 0.74);
    }

    // Original Concierge Slate emerges only as the showreel glides to it
    if (conciergeRef.current) {
      tl.fromTo(
        conciergeRef.current,
        { x: 80, scale: 0.93, opacity: 0 },
        { x: 0, scale: 1.0, opacity: 1.0, ease: "power2.out", duration: 0.22 },
        0.78
      );
    }

    return () => {
      tl.kill();
      const st = ScrollTrigger.getById("puri-showreel-st");
      if (st) st.kill();
    };
  }, []);

  // Smooth scroll helper for Left / Right manual controls
  const handleGlide = (direction: "prev" | "next") => {
    const st = ScrollTrigger.getById("puri-showreel-st");
    if (!st) return;
    const progress = st.progress;

    let targetP = progress;
    if (direction === "next") {
      if (progress < 0.25) targetP = 0.45;
      else if (progress < 0.65) targetP = 0.76;
      else targetP = 1.0;
    } else {
      if (progress > 0.76) targetP = 0.58;
      else if (progress > 0.35) targetP = 0.15;
      else targetP = 0.0;
    }

    const target = st.start + (st.end - st.start) * targetP;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  const handleInspectImage = () => {
    if (onOpenLightbox) {
      const currentP = webglRef.current?.getProgress() ?? 0;
      const activeIdx = currentP < 0.5 ? 0 : 1;
      const lightboxData: LightboxImage[] = culturePlates.map((item) => ({
        src: item.src,
        alt: item.alt,
        title: item.title,
        subtitle: item.tag,
        provenance: "Cultural Parchment Archive • Hotel Serene Puri",
      }));
      onOpenLightbox(lightboxData, activeIdx);
    }
  };

  return (
    <section
      ref={triggerRef}
      id="destination"
      style={{
        backgroundColor: "#f4ebdd",
        backgroundImage: "url('/images/culture/parchment-texture.png')",
        backgroundRepeat: "repeat",
        backgroundSize: "256px 256px",
      }}
      className="relative w-full h-screen min-h-[640px] max-h-[1080px] overflow-hidden text-[#14161b] select-none"
    >
      {/* Cinematic Subtle Golden Horizon Filament */}
      <div
        ref={horizonRef}
        className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#8c7b68]/35 to-transparent pointer-events-none origin-center z-10"
      />

      {/* Floating Top Controls Bar (Fades in when showreel starts) */}
      <div
        ref={controlsRef}
        className="absolute top-6 left-8 right-8 md:left-14 md:right-14 z-30 flex items-center justify-between pointer-events-none opacity-0"
      >
        <div className="flex items-center space-x-3 text-[10px] font-mono tracking-[0.35em] text-[#8c7b68] uppercase font-semibold">
          <Compass className="w-3.5 h-3.5 text-[#8c7b68]" />
          <span>Cultural Showreel</span>
          <span className="text-[#14161b]/20">/</span>
          <span className="text-[#14161b]/60">02 Paintings</span>
        </div>

        {/* Manual Glide Controls */}
        <div className="flex items-center space-x-2 pointer-events-auto">
          <button
            onClick={() => handleGlide("prev")}
            aria-label="Previous painting"
            className="w-9 h-9 rounded-full bg-[#f4ebdd]/80 hover:bg-[#14161b] hover:text-[#f4ebdd] text-[#14161b] transition-all flex items-center justify-center backdrop-blur-sm active:scale-95 cursor-pointer shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleGlide("next")}
            aria-label="Next painting"
            className="w-9 h-9 rounded-full bg-[#f4ebdd]/80 hover:bg-[#14161b] hover:text-[#f4ebdd] text-[#14161b] transition-all flex items-center justify-center backdrop-blur-sm active:scale-95 cursor-pointer shadow-sm"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 1. Centered Hero Text Stage: Letter-by-Letter Clipped Bottom Emergence */}
      <div
        ref={introRef}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-16 z-20 pointer-events-none will-change-transform"
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          {/* Folio Tag: Clipped Letter by Letter */}
          <div className="text-xs sm:text-sm font-mono uppercase tracking-[0.4em] text-[#8c7b68] mb-6 font-medium flex items-center justify-center flex-wrap">
            {folioTag.split("").map((char, cIdx) => (
              <span key={cIdx} className="inline-block overflow-hidden align-top pb-[0.1em] -mb-[0.1em]">
                <span data-tag-char className="inline-block">
                  {char === " " ? "\u00A0" : char}
                </span>
              </span>
            ))}
          </div>

          {/* Master Headline: Letter by Letter with Unclipped Flourishes */}
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#14161b] font-light leading-snug tracking-tight mb-8 overflow-visible">
            {/* Line 1 */}
            <span className="block overflow-hidden py-1">
              {titleLine1.split(" ").map((word, wIdx) => (
                <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.26em]">
                  {word.split("").map((char, cIdx) => (
                    <span key={cIdx} className="inline-block overflow-hidden align-top pb-[0.14em] -mb-[0.14em]">
                      <span data-title-char className="inline-block">
                        {char}
                      </span>
                    </span>
                  ))}
                </span>
              ))}
            </span>

            {/* Line 2 (Script Gold - Unclipped Flourishes) */}
            <span
              className="block font-script text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#b58d5b] font-normal tracking-normal leading-[1.35] sm:leading-[1.25] py-4 sm:py-6 overflow-visible select-none"
              style={{ fontFamily: "var(--font-script), 'Great Vibes', cursive" }}
            >
              {titleLine2.split(" ").map((word, wIdx) => (
                <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.26em] overflow-visible">
                  {word.split("").map((char, cIdx) => (
                    <span key={cIdx} className="inline-block overflow-visible align-baseline">
                      <span data-title-char className="inline-block overflow-visible will-change-transform">
                        {char}
                      </span>
                    </span>
                  ))}
                </span>
              ))}
            </span>
          </h2>

          {/* Atmospheric Description: Clipped Word by Word Emergence */}
          <p className="max-w-2xl mx-auto text-center text-base sm:text-lg md:text-xl text-[#5a5750] font-sans font-light leading-relaxed mb-8">
            {descriptionText.split(" ").map((word, wIdx) => (
              <span key={wIdx} className="inline-block overflow-hidden align-top pb-[0.12em] -mb-[0.12em] mr-[0.28em] my-0.5">
                <span data-desc-word className="inline-block">
                  {word}
                </span>
              </span>
            ))}
          </p>

          {/* Scroll Prompt: Clipped Emergence */}
          <div className="overflow-hidden inline-block">
            <div
              data-prompt-inner
              className="flex items-center space-x-3 text-xs sm:text-sm font-mono uppercase tracking-[0.3em] text-[#8c7b68] will-change-transform py-0.5"
            >
              <span>Scroll horizontally</span>
              <ArrowRight className="w-4 h-4 text-[#8c7b68] animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. The Horizontal Showreel Moving on the EXACT SAME Plane */}
      <div
        ref={trackRef}
        className="absolute inset-0 h-full w-max flex flex-row items-center z-10 will-change-transform pt-12 pb-16"
      >
        {/* THE SACRED CULTURAL SHOWCASE: HORIZONTAL ARRIVAL + WEBGL DISSOLVE */}
        <div
          ref={showcaseRef}
          className="w-[85vw] sm:w-[75vw] lg:w-[70vw] max-w-[1250px] h-[78vh] min-h-[500px] max-h-[820px] flex-shrink-0 mx-6 md:mx-14 flex flex-col justify-center"
        >
          {/* Direct Painting Showcase: WebGL Fluid Dissolve Canvas with Multiply Fusion */}
          <div
            className="relative w-full h-full flex items-center justify-center will-change-transform cursor-pointer group"
            onClick={handleInspectImage}
          >
            <CultureWebGLCanvas
              ref={webglRef}
              className="transition-transform duration-700 ease-out group-hover:scale-[1.015]"
            />
          </div>

          {/* Minimalist Floating Typography Underneath with Crossfade */}
          <div className="mt-3 relative h-7 px-2 text-[#14161b] pointer-events-none">
            {/* Caption 1: Shree Mandir */}
            <div
              ref={caption1Ref}
              className="absolute inset-0 flex items-baseline justify-between transition-opacity"
            >
              <div className="flex items-baseline space-x-3">
                <span className="font-serif text-xl sm:text-2xl font-light tracking-wide text-[#14161b]">
                  {culturePlates[0].title}
                </span>
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#8c7b68] uppercase font-semibold">
                  {culturePlates[0].tag}
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#8c7b68] tracking-widest font-medium">
                {culturePlates[0].index} / {culturePlates[0].total}
              </span>
            </div>

            {/* Caption 2: Golden Beach */}
            <div
              ref={caption2Ref}
              className="absolute inset-0 flex items-baseline justify-between transition-opacity opacity-0"
            >
              <div className="flex items-baseline space-x-3">
                <span className="font-serif text-xl sm:text-2xl font-light tracking-wide text-[#14161b]">
                  {culturePlates[1].title}
                </span>
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#8c7b68] uppercase font-semibold">
                  {culturePlates[1].tag}
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#8c7b68] tracking-widest font-medium">
                {culturePlates[1].index} / {culturePlates[1].total}
              </span>
            </div>
          </div>
        </div>

        {/* SLIDE 3: Concluding Concierge Slate — Exact Original Editorial Design (Untouched!) */}
        <div
          ref={conciergeRef}
          className="w-[85vw] sm:w-[50vw] lg:w-[42vw] max-w-[580px] flex-shrink-0 ml-8 sm:ml-12 lg:ml-16 pr-6 flex flex-col justify-center will-change-transform"
        >
          <div className="flex flex-col justify-center">
            <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#8c7b68] mb-4 font-semibold">
              <span>The Sanctuary Concierge</span>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#14161b] font-light leading-snug mb-6">
              Experience Puri in <br />
              <span
                className="font-script text-4xl sm:text-5xl lg:text-6xl text-[#b58d5b] block font-normal tracking-normal leading-[1.3] py-2 overflow-visible"
                style={{ fontFamily: "var(--font-script), 'Great Vibes', cursive" }}
              >
                Discreet Luxury
              </span>
            </h3>

            {onOpenBooking && (
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-between w-full max-w-xs px-7 py-4 rounded-full bg-[#14161b] text-[#f4ebdd] font-mono text-xs uppercase tracking-widest font-semibold hover:bg-[#8c7b68] transition-all duration-300 group cursor-pointer shadow-md"
              >
                <span>Reserve Your Stay</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Real-time Horizontal Scroll Progress Indicator */}
      <div className="absolute bottom-6 left-8 right-8 md:left-14 md:right-14 z-30 pointer-events-none">
        <div className="h-[1.5px] w-full bg-[rgba(20,22,27,0.08)] rounded-full overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full w-full bg-[#8c7b68] origin-left will-change-transform"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </section>
  );
}
