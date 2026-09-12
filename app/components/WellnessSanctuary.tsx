"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Sparkles, Sun, Moon, Waves, Heart, Flower2, ArrowRight } from "lucide-react";
import GooeyTextReveal from "@/components/ui/gooey-text-reveal";
import ParallaxImage from "./ParallaxImage";

gsap.registerPlugin(ScrollTrigger);

interface WellnessSanctuaryProps {
  onBookTreatment?: () => void;
}

export default function WellnessSanctuary({ onBookTreatment }: WellnessSanctuaryProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  const [activeRitual, setActiveRitual] = useState<number>(0);

  const rituals = [
    {
      id: "soak",
      title: "Sacred Soaking & Bathing Rituals",
      category: "Hydrotherapy • In-Suite Sanctuary",
      image: "/images/hotel/suite-bathroom.jpg",
      duration: "60 Minutes • Private Suite",
      description:
        "Deep mineral bath infused with Himalayan pink crystal salts, coastal neem leaves, and cold-pressed cold-extracted jasmine oil inside our handcrafted freestanding soaking tubs.",
      highlights: [
        { label: "Botanical Infusion", desc: "Wild sea minerals & jasmine" },
        { label: "Water Temperature", desc: "38°C Gentle Hydro-Warmth" },
        { label: "In-Suite Setting", desc: "Candlelit Master Spa Bath" },
      ],
    },
    {
      id: "massage",
      title: "Ayurvedic Abhyanga Massage",
      category: "Holistic Therapy • Full Body",
      image: "/images/hotel/reception-lounge-alt.jpg",
      duration: "90 Minutes • Spa Atelier",
      description:
        "Traditional rhythmic synchronized warm herb-infused oil massage designed to release stress, nourish the nervous system, and restore vital prana energy.",
      highlights: [
        { label: "Organic Oils", desc: "Warm sesame & coastal herbs" },
        { label: "Technique", desc: "Seven-posture traditional strokes" },
        { label: "Therapists", desc: "Certified Ayurvedic practitioners" },
      ],
    },
    {
      id: "beach-yoga",
      title: "Sunrise Golden Beach Meditation",
      category: "Mindfulness • Blue Flag Sands",
      image: "/images/hotel/hero-rooftop-clean.jpg",
      duration: "45 Minutes • Oceanfront Dawn",
      description:
        "Greet the first rays of the eastern sun with gentle pranayama breathwork, sound bowl resonance, and grounding yoga upon Puri’s tranquil Blue Flag Golden Beach.",
      highlights: [
        { label: "Timing", desc: "06:15 AM Daily Dawn" },
        { label: "Experience", desc: "Tibetan singing bowl resonance" },
        { label: "Location", desc: "Direct private beach path" },
      ],
    },
    {
      id: "gym",
      title: "Horizon Fitness & Movement Studio",
      category: "Cardio & Strength • High Sea Vista",
      image: "/images/hotel/hero-penthouse-clean.jpg",
      duration: "Complimentary for Residents",
      description:
        "Cardiovascular treadmills, elliptical trainers, free dumbbells, and full-length mirrored studio space capturing invigorating panoramic coastal morning light.",
      highlights: [
        { label: "Equipment", desc: "Technogym cardio & free weights" },
        { label: "Hours", desc: "24 Hours Daily for Residents" },
        { label: "Refreshment", desc: "Infused electrolyte waters & fruit" },
      ],
    },
  ];

  const current = rituals[activeRitual];

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
      id="wellness"
      className="py-16 sm:py-20 md:py-24 px-6 md:px-12 bg-[#ede7de] border-t border-[rgba(17,19,23,0.1)] relative overflow-hidden"
    >
      {/* Background Watermark */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="absolute top-1/3 -right-20 pointer-events-none select-none text-[#111317] opacity-[0.035] font-serif text-[16vw] font-light leading-none tracking-tighter whitespace-nowrap will-change-transform"
      >
        SANCTUARY SPA
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6 pb-6 border-b border-[rgba(17,19,23,0.1)]">
          <div>
            <div className="flex items-center space-x-2 text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-[#8c7b68] mb-3 font-semibold">
              <Flower2 className="w-3.5 h-3.5" />
              <span>The Wellness Sanctuary</span>
            </div>
            <GooeyTextReveal mode="scrub" pin={true} splitBy="words" stagger={0.06} blurAmount={0.5}>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#14161b] font-light tracking-tight leading-tight">
                Holistic Healing & <br />
                <span className="italic font-normal text-[#8c7b68]">Coastal Rejuvenation</span>
              </h2>
            </GooeyTextReveal>
          </div>
          <GooeyTextReveal mode="scroll" start="top 80%" duration={1.4} delay={0.15}>
            <p className="max-w-md text-xs sm:text-sm text-[#4a4740] font-sans font-light leading-relaxed">
              Immerse in restorative Ayurvedic therapies, in-suite mineral soaking baths, 
              and sunrise beach mindfulness designed to renew mind, body, and spirit.
            </p>
          </GooeyTextReveal>
        </div>

        {/* Ritual Selector Buttons */}
        <div className="flex flex-wrap gap-2.5 mb-10">
          {rituals.map((r, idx) => (
            <button
              key={r.id}
              onClick={() => setActiveRitual(idx)}
              className={`px-5 py-2.5 rounded-xl text-[11px] font-mono transition-all duration-300 cursor-pointer flex items-center space-x-2 ${
                activeRitual === idx
                  ? "bg-[#111317] text-[#ede7de] font-semibold shadow-md scale-[1.02]"
                  : "bg-[#f4efe6] text-[#5e5b54] hover:text-[#111317] border border-[rgba(17,19,23,0.1)] shadow-xs"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${activeRitual === idx ? "bg-[#c5a880]" : "bg-gray-400"}`} />
              <span>{r.title.split(" ")[0]} {r.title.split(" ")[1]}</span>
            </button>
          ))}
        </div>

        {/* Wellness Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Main Visual Stage */}
          <div className="lg:col-span-7 relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-white border border-[rgba(17,19,23,0.12)] shadow-xl p-2 group">
            <ParallaxImage
              src={current.image}
              alt={current.title}
              speed={0.16}
              scale={1.15}
              className="w-full h-full rounded-xl overflow-hidden"
              imageClassName="object-cover filter brightness-[0.98] contrast-[1.05]"
              priority
            />

            {/* Corner Badge */}
            <div className="absolute top-5 left-5 bg-[#ede7de]/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-[10px] font-mono uppercase text-[#111317] tracking-widest border border-[rgba(17,19,23,0.12)] font-semibold shadow-sm pointer-events-none">
              {current.category}
            </div>
          </div>

          {/* Details & Highlights Column */}
          <div
            ref={detailsRef}
            className="lg:col-span-5 flex flex-col space-y-6 will-change-transform"
          >
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#8c7b68] mb-1 font-semibold">
                {current.duration}
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#111317] font-light mb-3">
                {current.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#5e5b54] font-light leading-relaxed mb-6">
                {current.description}
              </p>
            </div>

            {/* Highlights List */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#7a766e] block">
                Ritual Inclusions
              </span>
              {current.highlights.map((h, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-[#f4efe6] border border-[rgba(17,19,23,0.08)] hover:border-[rgba(17,19,23,0.25)] transition-colors font-mono shadow-xs flex items-center justify-between"
                >
                  <span className="text-xs text-[#111317] font-medium">{h.label}</span>
                  <span className="text-[11px] text-[#8c7b68]">{h.desc}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <button
                onClick={onBookTreatment}
                className="w-full py-3.5 rounded-xl bg-[#14161b] hover:bg-[#232730] text-[#f7f4ee] hover:text-white font-mono text-xs uppercase tracking-[0.18em] font-semibold transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer group"
              >
                <span>Reserve Wellness Experience</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#c5a880] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
