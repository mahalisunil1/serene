"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Compass,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import CultureWebGLCanvas, {
  CultureWebGLCanvasHandle,
} from "./CultureWebGLCanvas";
import { LightboxImage } from "./ImageLightbox";

gsap.registerPlugin(ScrollTrigger);

interface CuratedSanctuarySectionProps {
  onOpenBooking?: () => void;
  onOpenLightbox?: (images: LightboxImage[], index: number) => void;
}

// ── 1. AMENITIES SLIDES DATA ──────────────────────────────────────────
const amenitiesSlides = [
  {
    id: "rooftop-pool",
    num: "01",
    total: "05",
    level: "LEVEL 5 SKY DECK",
    category: "Coastal Solitude & Horizon Swim",
    title: "The Striped Lap Pool",
    image: "/images/hotel/rooftop-pool.jpg",
  },
  {
    id: "pergola-lounge",
    num: "02",
    total: "05",
    level: "ROOFTOP SUNSET TERRACE",
    category: "Twilight Aperitifs & Starlit Vista",
    title: "Pergola Sky Lounge",
    image: "/images/hotel/pergola-lounge.jpg",
  },
  {
    id: "restaurant-main",
    num: "03",
    total: "05",
    level: "GROUND LEVEL ATELIER",
    category: "Coastal Gastronomy & Temple Spices",
    title: "Artisanal Odia Atelier",
    image: "/images/hotel/restaurant-main.jpg",
  },
  {
    id: "banquet-hall",
    num: "04",
    total: "05",
    level: "LEVEL 1 GRAND PAVILION",
    category: "Sacred Celebrations & Royal Galas",
    title: "Grand Coral Celebration Hall",
    image: "/images/ambience/banquet-hall-main.jpg",
  },
  {
    id: "movement-studio",
    num: "05",
    total: "05",
    level: "LEVEL 2 WELLNESS WING",
    category: "Dawn Vitality & Meditative Stillness",
    title: "Horizon Movement Studio",
    image: "/images/ambience/horizon-gym-studio.jpg",
  },
];

// Amenities Intro Typography
const amenitiesFolioTag = "FOLIO VIII • RESIDENT SANCTUARY & CURATED AMENITIES";
const amenitiesTitleLine1 = "The Living Rhythm of";
const amenitiesTitleLine2 = "Hotel Serene";
const amenitiesDescriptionText =
  "Step into an enclave where morning tides awaken private oceanfront verandahs, steam rises from sacred herbal baths, and twilight cocktails glow beneath coastal skies.";

// ── 2. SACRED PURI DESTINATION SHOWREEL DATA ─────────────────────────
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

// Destination Intro Typography
const destinationFolioTag = "FOLIO IX • VISUAL ODYSSEY";
const destinationTitleLine1 = "Puri: The Ocean of";
const destinationTitleLine2 = "Eternal Grace";
const destinationDescriptionText =
  "Where sacred Kalinga stone rises beside the primordial waters of the Bay of Bengal. Traverse an intimate visual showcase of Odisha's living heritage—from the sanctum spires of Shree Jagannath to the golden dawn rolling across the shores of Mahodadhi.";

export default function CuratedSanctuarySection({
  onOpenBooking,
  onOpenLightbox,
}: CuratedSanctuarySectionProps) {
  const triggerRef = useRef<HTMLDivElement>(null);

  // Background layers
  const darkBgRef = useRef<HTMLDivElement>(null);
  const parchmentBgRef = useRef<HTMLDivElement>(null);

  // Amenities Phase Elements
  const amenitiesIntroRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const trackRef = useRef<HTMLDivElement>(null);
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageInnerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const paginationRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  // Destination Phase Elements
  const destinationIntroRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const destinationTrackRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const webglRef = useRef<CultureWebGLCanvasHandle>(null);
  const caption1Ref = useRef<HTMLDivElement>(null);
  const caption2Ref = useRef<HTMLDivElement>(null);
  const conciergeRef = useRef<HTMLDivElement>(null);
  const horizonRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trigger = triggerRef.current;
    const amenitiesIntro = amenitiesIntroRef.current;
    const destinationIntro = destinationIntroRef.current;
    const track = trackRef.current;
    const destTrack = destinationTrackRef.current;
    const controls = controlsRef.current;
    if (!trigger || !amenitiesIntro || !svgRef.current || !track || !destTrack || !destinationIntro)
      return;

    // Amenities intro char queries
    const aTagChars = amenitiesIntro.querySelectorAll("[data-tag-char]");
    const aTitleChars = amenitiesIntro.querySelectorAll("[data-title-char]");
    const aDescWords = amenitiesIntro.querySelectorAll("[data-desc-word]");
    const aPromptInner = amenitiesIntro.querySelector("[data-prompt-inner]");

    // Destination intro char queries
    const dTagChars = destinationIntro.querySelectorAll("[data-dest-tag-char]");
    const dTitleChars = destinationIntro.querySelectorAll("[data-dest-title-char]");
    const dDescWords = destinationIntro.querySelectorAll("[data-dest-desc-word]");
    const dPromptInner = destinationIntro.querySelector("[data-dest-prompt-inner]");

    // ── INITIAL STATES ────────────────────────────────────────────────
    if (darkBgRef.current) gsap.set(darkBgRef.current, { opacity: 1 });
    if (parchmentBgRef.current) gsap.set(parchmentBgRef.current, { opacity: 0 });

    // Amenities intro starts resting & visible
    gsap.set(amenitiesIntro, { visibility: "visible", opacity: 1, y: 0, scale: 1 });
    gsap.set(aTagChars, { yPercent: 0 });
    gsap.set(aTitleChars, { yPercent: 0 });
    gsap.set(aDescWords, { yPercent: 0 });
    if (aPromptInner) gsap.set(aPromptInner, { yPercent: 0, opacity: 1 });
    if (paginationRef.current) gsap.set(paginationRef.current, { opacity: 0 });

    // Amenities vertical track
    gsap.set(track, { yPercent: 0 });

    for (let i = 0; i < amenitiesSlides.length; i++) {
      const titleEl = titleRefs.current[i];
      const imgEl = imageInnerRefs.current[i];
      if (titleEl) {
        gsap.set(titleEl, { opacity: i === 0 ? 0 : 0.15, yPercent: i === 0 ? 25 : 35 });
      }
      if (imgEl) {
        gsap.set(imgEl, { yPercent: i === 0 ? 0 : -6 });
      }
    }

    // Destination intro starts clipped below baseline to arise seamlessly after slits submerge
    gsap.set(destinationIntro, { visibility: "hidden", opacity: 0, y: 0, scale: 1 });
    gsap.set(dTagChars, { yPercent: 110, opacity: 0 });
    gsap.set(dTitleChars, { yPercent: 110, opacity: 0 });
    gsap.set(dDescWords, { yPercent: 110, opacity: 0 });
    if (dPromptInner) gsap.set(dPromptInner, { yPercent: 60, opacity: 0 });
    if (horizonRef.current) gsap.set(horizonRef.current, { scaleX: 0, opacity: 0 });

    // Destination showreel initial states
    if (controls) gsap.set(controls, { opacity: 0, y: -10 });
    gsap.set(destTrack, { x: () => window.innerWidth * 1.05, opacity: 0 });
    if (showcaseRef.current) {
      gsap.set(showcaseRef.current, { scale: 0.90, rotation: 1.5, opacity: 0.25 });
    }
    if (caption1Ref.current) gsap.set(caption1Ref.current, { yPercent: 120, opacity: 0 });
    if (caption2Ref.current) gsap.set(caption2Ref.current, { yPercent: 120, opacity: 0 });

    // The ORIGINAL Concierge slate starts completely hidden with zero opacity & offset
    // so it NEVER peeks onto the screen while the painting is centered!
    if (conciergeRef.current) {
      gsap.set(conciergeRef.current, { x: 80, scale: 0.94, opacity: 0 });
    }

    // ── 10 SVG RECT LOUVER SLITS DEFINITION ───────────────────────────
    const rects: (SVGRectElement | null)[] = [];
    for (let i = 0; i < 10; i++) {
      rects.push(document.getElementById(`sanctuary-slit-${i}`) as SVGRectElement | null);
    }

    const clipState = {
      rise: 0,
      level: 0,
      converge: 0,
      expand: 0,
    };

    const updateSlits = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      const wBox = Math.min(680, w * 0.62);
      const hBox = Math.min(480, h * 0.58);
      const slitW_init = wBox / 10;
      const gap_init = Math.min(14, w * 0.013);
      const spreadW = wBox + 9 * gap_init;

      const xCenter = w / 2;
      const yCenter = (h - hBox) / 2;
      const diagStep = Math.min(36, h * 0.055);

      for (let i = 0; i < 10; i++) {
        const rect = rects[i];
        if (!rect) continue;

        // 1. Separated X
        const xSep = xCenter - spreadW / 2 + i * (slitW_init + gap_init);
        // 2. Converged X
        const xConv = xCenter - wBox / 2 + i * slitW_init;
        const currentX_box = xSep + (xConv - xSep) * clipState.converge;

        // 3. Expanded X
        const xExp = i * (w / 10);
        const slitW_exp = w / 10;
        const currentX = currentX_box + (xExp - currentX_box) * clipState.expand;
        const currentW = slitW_init + (slitW_exp - slitW_init) * clipState.expand;

        // Progressive downward diagonal calculation
        const currentDiag = i * diagStep * (1 - clipState.level);

        // Rising from below screen or submerging below screen
        const startY = h + currentDiag;
        const targetY = yCenter + currentDiag;
        const risenY = startY + (targetY - startY) * clipState.rise;
        const risenH = hBox * clipState.rise;

        // Expansion to full-bleed viewport
        const currentY = risenY + (0 - yCenter) * clipState.expand;
        const currentH = risenH + (h - hBox) * clipState.expand;

        rect.setAttribute("x", currentX.toFixed(2));
        rect.setAttribute("y", currentY.toFixed(2));
        rect.setAttribute("width", Math.max(0, currentW).toFixed(2));
        rect.setAttribute("height", Math.max(0, currentH).toFixed(2));
        rect.setAttribute("rx", "0");
      }

    };

    updateSlits();

    const getCenteredX = () => {
      if (!showcaseRef.current) return 0;
      const showcase = showcaseRef.current;
      return (window.innerWidth - showcase.offsetWidth) / 2 - showcase.offsetLeft;
    };

    const getConciergeTargetX = () => {
      if (!conciergeRef.current || !destTrack) return 0;
      const concierge = conciergeRef.current;
      const w = window.innerWidth;
      // Position the concierge slate comfortably a little toward the center (~48% of screen on desktop)
      // so it sits in intimate balance with the painting on the left with no massive gap!
      const targetScreenLeft = w >= 1024
        ? Math.round(w * 0.48)
        : Math.max(20, Math.round((w - concierge.offsetWidth) / 2));

      return targetScreenLeft - concierge.offsetLeft;
    };

    // ── MASTER CONTINUOUS PINNED TIMELINE ──────────────────────────────
    // Zero unpinning: Fluid continuity across Louvers -> Vertical Stream
    // -> Slits Closing over Parchment -> Destination Text Arise -> Showreel!
    const tl = gsap.timeline({
      id: "sanctuary-destination-master-tl",
      scrollTrigger: {
        id: "sanctuary-destination-master-st",
        trigger: trigger,
        start: "top top",
        end: () => `+=${Math.max(7800, window.innerHeight * 8.5)}`,
        scrub: 0.8,
        pin: true,
        pinSpacing: true,
        anticipatePin: 0,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;

          // Active amenities slide index
          if (p < 0.28) setActiveSlide(0);
          else if (p < 0.33) setActiveSlide(1);
          else if (p < 0.38) setActiveSlide(2);
          else if (p < 0.43) setActiveSlide(3);
          else if (p < 0.48) setActiveSlide(4);

          // Bottom progress bar during destination showreel phase
          if (progressBarRef.current && p >= 0.75) {
            const destProgress = Math.max(0, Math.min(1, (p - 0.75) / 0.25));
            progressBarRef.current.style.transform = `scaleX(${destProgress})`;
          }
        },
      },
    });

    // ==================================================================
    // ACT I: AMENITIES INTRO DEPARTURE & SLITS OPENING (0.00 -> 0.24)
    // ==================================================================
    tl.to(amenitiesIntro, { y: -24, scale: 0.96, ease: "power2.inOut", duration: 0.05 }, 0.0);
    if (aPromptInner) {
      tl.to(aPromptInner, { yPercent: 120, opacity: 0, ease: "power1.in", duration: 0.02 }, 0.0);
    }
    tl.to(
      aDescWords,
      { yPercent: 130, ease: "power1.in", stagger: { each: 0.001, from: "end" }, duration: 0.03 },
      0.01
    );
    tl.to(
      aTitleChars,
      { yPercent: 120, opacity: 0, ease: "power1.in", stagger: { each: 0.0015, from: "end" }, duration: 0.03 },
      0.01
    );
    tl.to(
      aTagChars,
      { yPercent: 130, ease: "power1.in", stagger: { each: 0.001, from: "end" }, duration: 0.02 },
      0.02
    );
    tl.to(amenitiesIntro, { opacity: 0, ease: "power1.inOut", duration: 0.02 }, 0.04);
    tl.set(amenitiesIntro, { visibility: "hidden" }, 0.05);

    // 10 Lean Slits rise in progressive downward diagonal cascade (0.04 -> 0.11)
    tl.to(clipState, { rise: 1, ease: "power2.out", duration: 0.07, onUpdate: updateSlits }, 0.04);

    // Diagonal levels out at vertical center (0.10 -> 0.16)
    tl.to(clipState, { level: 1, ease: "power2.inOut", duration: 0.06, onUpdate: updateSlits }, 0.10);

    // Convergence into unified central box (0.15 -> 0.20)
    tl.to(
      clipState,
      { converge: 1, ease: "power2.inOut", duration: 0.05, onUpdate: updateSlits },
      0.15
    );

    // Full-bleed expansion into viewport (0.19 -> 0.24)
    tl.to(clipState, { expand: 1, ease: "power2.inOut", duration: 0.05, onUpdate: updateSlits }, 0.19);

    // Slide 0 Title reveals as expansion finishes (0.22 -> 0.24)
    if (titleRefs.current[0]) {
      tl.fromTo(
        titleRefs.current[0],
        { opacity: 0, yPercent: 25 },
        { opacity: 1, yPercent: 0, ease: "power2.out", duration: 0.025 },
        0.22
      );
    }
    if (paginationRef.current) {
      tl.to(paginationRef.current, { opacity: 1, duration: 0.025 }, 0.22);
    }

    // ==================================================================
    // ACT II: CONTINUOUS VERTICAL STREAM OF 5 AMENITIES (0.24 -> 0.44)
    // ==================================================================
    const vStart = 0.24;
    const vEnd = 0.44;
    const vDuration = vEnd - vStart; // 0.20
    const vStep = vDuration / 4; // 0.05 per slide

    tl.to(track, { yPercent: -80, ease: "none", duration: vDuration }, vStart);

    // Slide 0 Exit Parallax
    if (titleRefs.current[0]) {
      tl.to(titleRefs.current[0], { yPercent: -40, opacity: 0.15, ease: "none", duration: vStep }, vStart);
    }
    if (imageInnerRefs.current[0]) {
      tl.to(imageInnerRefs.current[0], { yPercent: 8, ease: "none", duration: vStep }, vStart);
    }

    // Slide 1 Entrance & Exit Parallax
    const p1Center = vStart + vStep; // 0.29
    if (titleRefs.current[1]) {
      tl.fromTo(titleRefs.current[1], { yPercent: 35, opacity: 0.15 }, { yPercent: 0, opacity: 1, ease: "none", duration: vStep }, vStart);
      tl.to(titleRefs.current[1], { yPercent: -40, opacity: 0.15, ease: "none", duration: vStep }, p1Center);
    }
    if (imageInnerRefs.current[1]) {
      tl.fromTo(imageInnerRefs.current[1], { yPercent: -6 }, { yPercent: 6, ease: "none", duration: vStep * 2 }, vStart);
    }

    // Slide 2 Entrance & Exit Parallax
    const p2Center = p1Center + vStep; // 0.34
    if (titleRefs.current[2]) {
      tl.fromTo(titleRefs.current[2], { yPercent: 35, opacity: 0.15 }, { yPercent: 0, opacity: 1, ease: "none", duration: vStep }, p1Center);
      tl.to(titleRefs.current[2], { yPercent: -40, opacity: 0.15, ease: "none", duration: vStep }, p2Center);
    }
    if (imageInnerRefs.current[2]) {
      tl.fromTo(imageInnerRefs.current[2], { yPercent: -6 }, { yPercent: 6, ease: "none", duration: vStep * 2 }, p1Center);
    }

    // Slide 3 Entrance & Exit Parallax
    const p3Center = p2Center + vStep; // 0.39
    if (titleRefs.current[3]) {
      tl.fromTo(titleRefs.current[3], { yPercent: 35, opacity: 0.15 }, { yPercent: 0, opacity: 1, ease: "none", duration: vStep }, p2Center);
      tl.to(titleRefs.current[3], { yPercent: -40, opacity: 0.15, ease: "none", duration: vStep }, p3Center);
    }
    if (imageInnerRefs.current[3]) {
      tl.fromTo(imageInnerRefs.current[3], { yPercent: -6 }, { yPercent: 6, ease: "none", duration: vStep * 2 }, p2Center);
    }

    // Slide 4 Entrance
    if (titleRefs.current[4]) {
      tl.fromTo(titleRefs.current[4], { yPercent: 35, opacity: 0.15 }, { yPercent: 0, opacity: 1, ease: "none", duration: vStep }, p3Center);
    }
    if (imageInnerRefs.current[4]) {
      tl.fromTo(imageInnerRefs.current[4], { yPercent: -6 }, { yPercent: 0, ease: "none", duration: vStep }, p3Center);
    }

    // Slide 4 Hold & Title Fade Out (0.44 -> 0.49)
    if (titleRefs.current[4]) {
      tl.to(titleRefs.current[4], { opacity: 0, yPercent: -20, ease: "power1.in", duration: 0.03 }, 0.46);
    }
    if (paginationRef.current) {
      tl.to(paginationRef.current, { opacity: 0, duration: 0.03 }, 0.46);
    }

    // ==================================================================
    // ACT III: SLITS CLOSING OVER EXACT DESTINATION PARCHMENT (0.48 -> 0.62)
    // Symmetrical Reverse: Contract -> Diverge -> Tilt -> Submerge
    // ==================================================================
    // 1. Destination Parchment Background awakens behind the slits
    if (parchmentBgRef.current) {
      tl.to(parchmentBgRef.current, { opacity: 1, duration: 0.04, ease: "power2.inOut" }, 0.48);
    }

    // 2. Viewport contracts back into central unified box
    tl.to(clipState, { expand: 0, ease: "power2.inOut", duration: 0.04, onUpdate: updateSlits }, 0.50);

    // 3. Central box diverges back into 10 separate slits
    tl.to(clipState, { converge: 0, ease: "power2.inOut", duration: 0.04, onUpdate: updateSlits }, 0.53);

    // 4. Slits tilt back into progressive downward diagonal
    tl.to(clipState, { level: 0, ease: "power2.inOut", duration: 0.03, onUpdate: updateSlits }, 0.56);

    // 5. Slits descend downwards below screen and submerge completely into pure parchment
    tl.to(
      clipState,
      { rise: 0, ease: "power2.in", duration: 0.04, onUpdate: updateSlits },
      0.58
    );

    // ==================================================================
    // ACT IV: DESTINATION TEXT ARISES SEAMLESSLY (0.61 -> 0.76)
    // Directly arising from baseline the moment slits submerge!
    // ==================================================================
    tl.set(destinationIntro, { visibility: "visible" }, 0.61);
    tl.to(destinationIntro, { opacity: 1, ease: "power2.out", duration: 0.04 }, 0.61);

    tl.to(
      dTagChars,
      { yPercent: 0, opacity: 1, ease: "power2.out", stagger: { each: 0.001 }, duration: 0.04 },
      0.62
    );

    tl.to(
      dTitleChars,
      { yPercent: 0, opacity: 1, ease: "power2.out", stagger: { each: 0.0015 }, duration: 0.05 },
      0.63
    );

    tl.to(
      dDescWords,
      { yPercent: 0, opacity: 1, ease: "power2.out", stagger: { each: 0.001 }, duration: 0.04 },
      0.64
    );

    if (dPromptInner) {
      tl.to(dPromptInner, { yPercent: 0, opacity: 1, ease: "power2.out", duration: 0.04 }, 0.65);
    }

    if (horizonRef.current) {
      tl.fromTo(
        horizonRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 0.45, ease: "power2.out", duration: 0.05 },
        0.63
      );
    }

    // Reading Window Hold: 0.67 -> 0.71

    // Destination text departure into baseline (0.71 -> 0.77)
    tl.to(destinationIntro, { y: -24, scale: 0.96, ease: "power2.inOut", duration: 0.05 }, 0.71);
    if (dPromptInner) {
      tl.to(dPromptInner, { yPercent: 130, opacity: 0, ease: "power1.in", duration: 0.03 }, 0.71);
    }
    tl.to(
      dDescWords,
      { yPercent: 130, ease: "power1.in", stagger: { each: 0.001, from: "end" }, duration: 0.03 },
      0.72
    );
    tl.to(
      dTitleChars,
      { yPercent: 120, opacity: 0, ease: "power1.in", stagger: { each: 0.0015, from: "end" }, duration: 0.035 },
      0.72
    );
    tl.to(
      dTagChars,
      { yPercent: 130, ease: "power1.in", stagger: { each: 0.001, from: "end" }, duration: 0.025 },
      0.73
    );
    if (horizonRef.current) {
      tl.to(horizonRef.current, { opacity: 0, ease: "power1.in", duration: 0.03 }, 0.73);
    }
    tl.to(destinationIntro, { opacity: 0, ease: "power1.inOut", duration: 0.03 }, 0.74);
    tl.set(destinationIntro, { visibility: "hidden" }, 0.76);

    // ==================================================================
    // ACT V: SACRED CULTURAL SHOWREEL & ORIGINAL UNTOUCHED CONCIERGE (0.75 -> 1.00)
    // ==================================================================
    if (controls) {
      tl.to(controls, { opacity: 1, y: 0, duration: 0.04, ease: "power1.out" }, 0.75);
    }

    // Cultural Showcase Frame enters from right to DEAD-CENTER
    tl.to(destTrack, { opacity: 1, duration: 0.02 }, 0.75);
    tl.fromTo(
      destTrack,
      { x: () => window.innerWidth * 0.95 },
      { x: () => getCenteredX(), ease: "power2.out", duration: 0.12 },
      0.75
    );

    if (showcaseRef.current) {
      tl.fromTo(
        showcaseRef.current,
        { scale: 0.90, rotation: 1.5, opacity: 0.25 },
        { scale: 1.0, rotation: 0, opacity: 1.0, ease: "power2.out", duration: 0.12 },
        0.75
      );
    }

    // Caption 1 (Shree Mandir) reveals at center (0.83 -> 0.87)
    if (caption1Ref.current) {
      tl.fromTo(
        caption1Ref.current,
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, ease: "power2.out", duration: 0.04 },
        0.83
      );
    }

    // Living Heritage WebGL Fluid Dissolve: Shree Mandir -> Golden Beach (0.87 -> 0.93)
    const dissolveState = { progress: 0 };
    tl.to(
      dissolveState,
      {
        progress: 1,
        ease: "none",
        duration: 0.06,
        onUpdate: () => {
          webglRef.current?.setProgress(dissolveState.progress);
        },
      },
      0.87
    );

    if (showcaseRef.current) {
      tl.to(showcaseRef.current, { scale: 1.018, ease: "sine.inOut", duration: 0.03 }, 0.87);
      tl.to(showcaseRef.current, { scale: 1.0, ease: "sine.inOut", duration: 0.03 }, 0.90);
    }

    // Captions Crossfade: Shree Mandir out, Golden Beach in
    if (caption1Ref.current && caption2Ref.current) {
      tl.to(caption1Ref.current, { y: -10, opacity: 0, ease: "power1.out", duration: 0.02 }, 0.88);
      tl.fromTo(
        caption2Ref.current,
        { y: 12, yPercent: 0, opacity: 0 },
        { y: 0, yPercent: 0, opacity: 1, ease: "power2.out", duration: 0.025 },
        0.89
      );
    }

    // Coastline Departure & ORIGINAL UNTOUCHED Sanctuary Concierge Arrival (0.93 -> 0.99)
    tl.to(
      destTrack,
      {
        x: () => getConciergeTargetX(),
        ease: "power2.inOut",
        duration: 0.06,
      },
      0.93
    );

    if (showcaseRef.current) {
      tl.to(showcaseRef.current, { scale: 0.94, opacity: 0.6, ease: "power1.inOut", duration: 0.04 }, 0.93);
    }

    // Original Concierge Slate glides into view ONLY when showreel reaches the end
    if (conciergeRef.current) {
      tl.fromTo(
        conciergeRef.current,
        { x: 80, scale: 0.93, opacity: 0 },
        { x: 0, scale: 1.0, opacity: 1.0, ease: "power2.out", duration: 0.05 },
        0.94
      );
    }

    // Soft resting cushion
    tl.to({}, { duration: 0.01 }, 0.99);

    return () => {
      tl.kill();
      const st = ScrollTrigger.getById("sanctuary-destination-master-st");
      if (st) st.kill();
    };
  }, []);

  // Smooth scroll helper for Left / Right manual controls
  const handleGlide = (direction: "prev" | "next") => {
    const st = ScrollTrigger.getById("sanctuary-destination-master-st");
    if (!st) return;
    const progress = st.progress;

    let targetP = progress;
    if (direction === "next") {
      if (progress < 0.82) targetP = 0.87;
      else if (progress < 0.92) targetP = 0.96;
      else targetP = 1.0;
    } else {
      if (progress > 0.94) targetP = 0.89;
      else if (progress > 0.85) targetP = 0.68;
      else targetP = 0.40;
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
      id="sanctuary-amenities-destination"
      className="relative w-full h-screen min-h-[640px] overflow-hidden select-none"
    >
      {/* ── BACKGROUND LAYER 1: Deep Obsidian Canvas (Amenities Phase) ── */}
      <div
        ref={darkBgRef}
        className="absolute inset-0 w-full h-full bg-[#0a0b0d] z-0 pointer-events-none"
      />

      {/* ── BACKGROUND LAYER 2: Sacred Parchment Texture (Exact Destination Match) ── */}
      <div
        ref={parchmentBgRef}
        style={{
          backgroundColor: "#f4ebdd",
          backgroundImage: "url('/images/culture/parchment-texture.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-0"
      />

      {/* ── SVG DYNAMIC 10-RECT MULTI-SLIT CLIPPATH ── */}
      <svg
        ref={svgRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      >
        <defs>
          <clipPath id="sanctuary-slits-clip">
            <rect id="sanctuary-slit-0" x="0" y="0" width="0" height="0" rx="0" />
            <rect id="sanctuary-slit-1" x="0" y="0" width="0" height="0" rx="0" />
            <rect id="sanctuary-slit-2" x="0" y="0" width="0" height="0" rx="0" />
            <rect id="sanctuary-slit-3" x="0" y="0" width="0" height="0" rx="0" />
            <rect id="sanctuary-slit-4" x="0" y="0" width="0" height="0" rx="0" />
            <rect id="sanctuary-slit-5" x="0" y="0" width="0" height="0" rx="0" />
            <rect id="sanctuary-slit-6" x="0" y="0" width="0" height="0" rx="0" />
            <rect id="sanctuary-slit-7" x="0" y="0" width="0" height="0" rx="0" />
            <rect id="sanctuary-slit-8" x="0" y="0" width="0" height="0" rx="0" />
            <rect id="sanctuary-slit-9" x="0" y="0" width="0" height="0" rx="0" />
          </clipPath>
        </defs>
      </svg>

      {/* ── AMENITIES: CONTINUOUS VERTICAL SCROLL TRACK (CLIPPED BY 10 SLITS) ── */}
      <div
        className="absolute inset-0 w-full h-full z-10 overflow-hidden"
        style={{
          clipPath: "url(#sanctuary-slits-clip)",
          WebkitClipPath: "url(#sanctuary-slits-clip)",
        }}
      >
        <div
          ref={trackRef}
          className="relative w-full h-[500vh] flex flex-col will-change-transform"
        >
          {amenitiesSlides.map((slide, idx) => (
            <div
              key={slide.id}
              className="relative w-full h-screen flex-shrink-0 overflow-hidden flex items-center justify-center cursor-pointer group"
              onClick={() =>
                onOpenLightbox?.(
                  amenitiesSlides.map((s) => ({
                    src: s.image,
                    alt: s.title,
                    title: s.title,
                    subtitle: `${s.num} • ${s.level}`,
                  })),
                  idx
                )
              }
            >
              {/* Background Image Container with Parallax Extension */}
              <div
                ref={(el) => {
                  imageInnerRefs.current[idx] = el;
                }}
                className="absolute -top-[15%] left-0 w-full h-[130%] will-change-transform pointer-events-none"
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={idx === 0}
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </div>

              {/* Big Minimal Stylish Title • Minimal, Clean, Floating in Parallax */}
              <div
                ref={(el) => {
                  titleRefs.current[idx] = el;
                }}
                className="relative z-20 flex flex-col items-center justify-center max-w-6xl mx-auto px-6 text-center will-change-transform pointer-events-none select-none"
              >
                <h3 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white font-light tracking-tight leading-[1.03] max-w-5xl mx-auto text-center px-4 drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] [text-shadow:_0_2px_20px_rgba(0,0,0,0.85)]">
                  {slide.title}
                </h3>

                <div
                  className="font-script text-3xl sm:text-5xl md:text-6xl text-[#d4af37] font-normal mt-3 sm:mt-5 text-center drop-shadow-[0_3px_16px_rgba(0,0,0,0.9)] [text-shadow:_0_2px_14px_rgba(0,0,0,0.8)]"
                  style={{ fontFamily: "var(--font-script), 'Great Vibes', cursive" }}
                >
                  {slide.category}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>



      {/* ── ACT I: AMENITIES INITIAL CENTERED EDITORIAL TYPOGRAPHY ── */}
      <div
        ref={amenitiesIntroRef}
        className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center pointer-events-none will-change-transform"
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="flex items-center space-x-2 text-[10px] sm:text-xs font-mono uppercase tracking-[0.35em] text-[#c5a880] mb-5 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a880] flex-shrink-0 mr-1" />
            <div className="overflow-hidden flex">
              {amenitiesFolioTag.split("").map((char, i) => (
                <span
                  key={i}
                  data-tag-char
                  className="inline-block will-change-transform"
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.18] mb-6 text-white">
            <div className="overflow-hidden flex justify-center">
              {amenitiesTitleLine1.split("").map((char, i) => (
                <span
                  key={i}
                  data-title-char
                  className="inline-block will-change-transform"
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
            <div
              className="overflow-hidden flex justify-center font-script text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#c5a880] font-normal leading-tight pt-1"
              style={{ fontFamily: "var(--font-script), 'Great Vibes', cursive" }}
            >
              {amenitiesTitleLine2.split("").map((char, i) => (
                <span
                  key={i}
                  data-title-char
                  className="inline-block will-change-transform drop-shadow-[0_2px_16px_rgba(197,168,128,0.4)]"
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
          </h2>

          <p className="max-w-2xl text-xs sm:text-sm md:text-base text-[#e5d4be]/85 font-sans font-light leading-relaxed mb-8">
            {amenitiesDescriptionText.split(" ").map((word, i) => (
              <span key={i} className="overflow-hidden inline-block mr-1.5 align-top">
                <span data-desc-word className="inline-block will-change-transform">
                  {word}
                </span>
              </span>
            ))}
          </p>

          <div className="overflow-hidden">
            <div
              data-prompt-inner
              className="inline-flex items-center space-x-2 text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#c5a880]/80 will-change-transform"
            >
              <span>Scroll to traverse amenities</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#c5a880] animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* ── AMENITIES: MINIMALIST VERTICAL PAGINATION RAIL ── */}
      <div
        ref={paginationRef}
        className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center space-y-4 pointer-events-none transition-opacity duration-300"
      >
        {amenitiesSlides.map((slide, idx) => (
          <div key={slide.id} className="flex items-center space-x-2.5">
            <span
              className={`font-mono text-[9px] transition-colors duration-300 ${
                activeSlide === idx ? "text-[#c5a880] font-semibold" : "text-white/30"
              }`}
            >
              {slide.num}
            </span>
            <div
              className={`w-1 rounded-full transition-all duration-300 ${
                activeSlide === idx ? "h-6 bg-[#c5a880]" : "h-1.5 bg-white/20"
              }`}
            />
          </div>
        ))}
      </div>

      {/* ── CINEMATIC GOLDEN HORIZON FILAMENT (DESTINATION PHASE) ── */}
      <div
        ref={horizonRef}
        className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#8c7b68]/35 to-transparent pointer-events-none origin-center z-20"
      />

      {/* ── ACT IV: DESTINATION INTRO TEXT (ARISES AFTER SLITS SUBMERGE) ── */}
      <div
        ref={destinationIntroRef}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-16 z-30 pointer-events-none will-change-transform"
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          {/* Destination Folio Tag */}
          <div className="text-xs sm:text-sm font-mono uppercase tracking-[0.4em] text-[#8c7b68] mb-6 font-medium flex items-center justify-center flex-wrap">
            {destinationFolioTag.split("").map((char, cIdx) => (
              <span key={cIdx} className="inline-block overflow-hidden align-top pb-[0.1em] -mb-[0.1em]">
                <span data-dest-tag-char className="inline-block">
                  {char === " " ? "\u00A0" : char}
                </span>
              </span>
            ))}
          </div>

          {/* Destination Master Headline */}
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#14161b] font-light leading-snug tracking-tight mb-8 overflow-visible">
            <span className="block overflow-hidden py-1">
              {destinationTitleLine1.split(" ").map((word, wIdx) => (
                <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.26em]">
                  {word.split("").map((char, cIdx) => (
                    <span key={cIdx} className="inline-block overflow-hidden align-top pb-[0.14em] -mb-[0.14em]">
                      <span data-dest-title-char className="inline-block">
                        {char}
                      </span>
                    </span>
                  ))}
                </span>
              ))}
            </span>

            <span
              className="block font-script text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#b58d5b] font-normal tracking-normal leading-[1.35] sm:leading-[1.25] py-4 sm:py-6 overflow-visible select-none"
              style={{ fontFamily: "var(--font-script), 'Great Vibes', cursive" }}
            >
              {destinationTitleLine2.split(" ").map((word, wIdx) => (
                <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.26em] overflow-visible">
                  {word.split("").map((char, cIdx) => (
                    <span key={cIdx} className="inline-block overflow-visible align-baseline">
                      <span data-dest-title-char className="inline-block overflow-visible will-change-transform">
                        {char}
                      </span>
                    </span>
                  ))}
                </span>
              ))}
            </span>
          </h2>

          {/* Destination Poetic Description */}
          <p className="max-w-2xl mx-auto text-center text-base sm:text-lg md:text-xl text-[#5a5750] font-sans font-light leading-relaxed mb-8">
            {destinationDescriptionText.split(" ").map((word, wIdx) => (
              <span key={wIdx} className="inline-block overflow-hidden align-top pb-[0.12em] -mb-[0.12em] mr-[0.28em] my-0.5">
                <span data-dest-desc-word className="inline-block">
                  {word}
                </span>
              </span>
            ))}
          </p>

          {/* Destination Scroll Prompt */}
          <div className="overflow-hidden inline-block">
            <div
              data-dest-prompt-inner
              className="flex items-center space-x-3 text-xs sm:text-sm font-mono uppercase tracking-[0.3em] text-[#8c7b68] will-change-transform py-0.5"
            >
              <span>Scroll horizontally</span>
              <ArrowRight className="w-4 h-4 text-[#8c7b68] animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* ── ACT V: DESTINATION TOP CONTROLS BAR ── */}
      <div
        ref={controlsRef}
        className="absolute top-6 left-8 right-8 md:left-14 md:right-14 z-40 flex items-center justify-between pointer-events-none opacity-0"
      >
        <div className="flex items-center space-x-3 text-[10px] font-mono tracking-[0.35em] text-[#8c7b68] uppercase font-semibold">
          <Compass className="w-3.5 h-3.5 text-[#8c7b68]" />
          <span>Cultural Showreel</span>
          <span className="text-[#14161b]/20">/</span>
          <span className="text-[#14161b]/60">02 Paintings</span>
        </div>

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

      {/* ── ACT V: DESTINATION HORIZONTAL CULTURAL SHOWREEL TRACK ── */}
      <div
        ref={destinationTrackRef}
        className="absolute inset-0 h-full w-max flex flex-row items-center z-30 will-change-transform pt-12 pb-16 opacity-0"
      >
        {/* Cultural Showcase Frame: Painting + WebGL Fluid Dissolve Canvas */}
        <div
          ref={showcaseRef}
          className="w-[85vw] sm:w-[75vw] lg:w-[70vw] max-w-[1250px] h-[78vh] min-h-[500px] max-h-[820px] flex-shrink-0 mx-6 md:mx-14 flex flex-col justify-center"
        >
          <div
            className="relative w-full h-full flex items-center justify-center will-change-transform cursor-pointer group"
            onClick={handleInspectImage}
          >
            <CultureWebGLCanvas
              ref={webglRef}
              className="transition-transform duration-700 ease-out group-hover:scale-[1.015]"
            />
          </div>

          {/* Minimalist Floating Caption Underneath */}
          <div className="mt-3 relative h-7 px-2 text-[#14161b] pointer-events-none">
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

        {/* SLIDE 3: Concluding Concierge Slate — Exact Original Editorial Layout (Untouched!) */}
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

      {/* ── DYNAMIC GOLD PROGRESS FILAMENT (SHOWREEL PHASE) ── */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#8c7b68]/15 z-40">
        <div
          ref={progressBarRef}
          className="h-full w-full bg-[#8c7b68] origin-left will-change-transform"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </section>
  );
}
