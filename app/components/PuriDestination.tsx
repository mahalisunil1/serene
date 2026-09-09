"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Compass, MapPin, Sun, Sparkles, Car, Clock, ArrowRight } from "lucide-react";
import GooeyTextReveal from "@/components/ui/gooey-text-reveal";

gsap.registerPlugin(ScrollTrigger);

interface PuriDestinationProps {
  onOpenBooking?: () => void;
}

export default function PuriDestination({ onOpenBooking }: PuriDestinationProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const landmarkRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeTab, setActiveTab] = useState<number>(0);

  const itinerary = [
    {
      time: "06:00 AM",
      phase: "Dawn Radiance",
      title: "Blue Flag Golden Beach Sunrise Stroll",
      distance: "450 meters • 5 min walk",
      desc: "Begin your morning on the pristine sands of Puri's certified Blue Flag Golden Beach. The gentle eastern tide and tranquil morning sea breezes offer an incomparable setting for quiet meditation and yoga.",
      highlight: "Private beach path directly from the hotel lobby.",
    },
    {
      time: "09:30 AM",
      phase: "Sacred Immersion",
      title: "VIP Shree Jagannath Temple Guided Darshan",
      distance: "2.4 km • 8 min chauffeur",
      desc: "Experience the timeless spiritual epicenter of the 12th-century monumental temple. Hotel Serene's dedicated temple concierge arranges priority access, certified Sevayat guidance, and sacred Mahaprasad.",
      highlight: "Chauffeur transfer and dedicated concierge chaperone included.",
    },
    {
      time: "02:00 PM",
      phase: "Coastal Ecology",
      title: "Chilika Lagoon & Irrawaddy Dolphin Catamaran",
      distance: "36 km • Private day excursion",
      desc: "Explore Asia's largest brackish lagoon. Cruise in a private luxury catamaran across pristine wetland sanctuaries to observe rare endangered Irrawaddy dolphins and migratory bird colonies.",
      highlight: "Gourmet picnic hamper prepared by our executive chef.",
    },
    {
      time: "06:30 PM",
      phase: "Evening Twilight",
      title: "Rooftop Poolside Candlelit Degustation",
      distance: "Elevation +21.00 M • At Hotel Serene",
      desc: "Conclude your day perched atop the hotel with 360-degree ocean views. Savor our multi-course tasting menu paired with coastal cocktails as the evening temple bells echo across the bay.",
      highlight: "Reserved exclusively for registered in-house residents.",
    },
  ];

  const landmarks = [
    {
      num: "01",
      title: "Puri Golden Beach (Blue Flag)",
      dist: "450 METERS • 5 MIN STROLL",
      desc: "Internationally certified Blue Flag beach with fine golden sands, gentle morning tide, and tranquil sunrise meditation pavilions.",
      coords: "19° 47' 42\" N • 85° 49' 58\" E",
    },
    {
      num: "02",
      title: "Shree Jagannath Temple",
      dist: "2.4 KM • 8 MIN CHAUFFEUR",
      desc: "The 12th-century monumental spiritual epicenter. Hotel Serene's concierge coordinates private darshan guidance and traditional Mahaprasad.",
      coords: "19° 48' 17\" N • 85° 49' 06\" E",
    },
    {
      num: "03",
      title: "Puri–Konark Marine Drive",
      dist: "DIRECT COASTAL ACCESS",
      desc: "One of India's most scenic coastal drives through casuarina groves and virgin beaches leading to the UNESCO World Heritage Sun Temple.",
      coords: "Marine Highway Corridor",
    },
    {
      num: "04",
      title: "Chilika Lake & Dolphin Sanctuary",
      dist: "36 KM • PRIVATE DAY EXCURSION",
      desc: "Asia's largest brackish water lagoon, home to the rare endangered Irrawaddy dolphins and thousands of migratory winter birds.",
      coords: "19° 42' 00\" N • 85° 20' 00\" E",
    },
  ];

  useGSAP(
    () => {
      const sec = sectionRef.current;
      const wm = watermarkRef.current;
      const leftCol = leftColRef.current;
      const rightCol = rightColRef.current;
      if (!sec) return;

      if (wm) {
        gsap.to(wm, {
          yPercent: 35,
          ease: "none",
          scrollTrigger: {
            trigger: sec,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      }

      if (leftCol) {
        gsap.fromTo(
          leftCol,
          { y: 25 },
          {
            y: -15,
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

      if (rightCol) {
        gsap.fromTo(
          rightCol,
          { y: 40 },
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

      // Staggered vertical parallax offsets for the 4 landmark cards
      landmarkRefs.current.forEach((el, index) => {
        if (!el) return;
        const isEven = index % 2 === 1;
        gsap.fromTo(
          el,
          { y: isEven ? 45 : 15 },
          {
            y: isEven ? -40 : -10,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="destination"
      className="py-24 md:py-36 px-6 md:px-12 bg-[#f7f4ee] border-t border-[rgba(20,22,27,0.08)] relative overflow-hidden"
    >
      {/* Background Cartography Watermark */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="absolute top-1/3 -left-20 pointer-events-none select-none text-[#14161b] opacity-[0.035] font-serif text-[18vw] font-light leading-none tracking-tighter whitespace-nowrap will-change-transform"
      >
        CARTOGRAPHIE • PURI
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Left Column: Destination Overview (Parallax Lift) */}
          <div
            ref={leftColRef}
            className="lg:col-span-5 flex flex-col space-y-6 will-change-transform"
          >
            <div>
              <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-[0.3em] text-[#b58d5b] mb-3 font-semibold">
                <Compass className="w-3.5 h-3.5" />
                <span>Sacred Puri Cartography & Experiences</span>
              </div>
              <GooeyTextReveal mode="scroll" splitBy="words" start="top 85%" duration={1.6} stagger={0.08} className="mb-4">
                <h2 className="font-serif text-3xl sm:text-5xl text-[#14161b] font-light tracking-tight">
                  Puri: The Ocean of <br />
                  <span className="italic font-normal text-[#b58d5b]">Eternal Grace</span>
                </h2>
              </GooeyTextReveal>
              <GooeyTextReveal mode="scroll" start="top 80%" duration={1.4} delay={0.15}>
                <p className="text-xs sm:text-sm text-[#5a5750] font-mono leading-relaxed font-light">
                  Nestled between the eternal waters of the Bay of Bengal and the ancient sanctity of Shree Jagannath Dham, Hotel Serene commands an address of transcendent calm.
                </p>
              </GooeyTextReveal>
            </div>

            {/* Coordinates & Transport Badge */}
            <div className="p-6 rounded-2xl bg-white border border-[rgba(20,22,27,0.1)] font-mono text-xs space-y-3 shadow-lg">
              <div className="flex items-center justify-between text-[#827e74] text-[10px] uppercase tracking-wider pb-2 border-b border-[rgba(20,22,27,0.06)]">
                <span>Sanctuary Location</span>
                <span className="text-[#b58d5b] font-semibold">Puri, Odisha</span>
              </div>
              <div className="text-[#14161b] font-semibold text-sm">
                19° 48&apos; 07&quot; N • 85° 50&apos; 22&quot; E
              </div>
              <div className="text-[11px] text-[#5a5750] space-y-1">
                <div>• BBI International Airport (Bhubaneswar): 62 km (65 min)</div>
                <div>• Puri Junction Railway Station: 3.2 km (10 min)</div>
                <div>• Private Mercedes Chauffeur transfer available on request</div>
              </div>

              <button
                onClick={onOpenBooking}
                className="w-full mt-2 py-3 rounded-xl bg-[#14161b] hover:bg-[#232730] text-white text-[11px] font-mono uppercase tracking-wider font-semibold transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
              >
                <Car className="w-3.5 h-3.5 text-[#c5a880]" />
                <span>Arrange Chauffeur & Temple Visit</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Day-to-Night Curated Itinerary (Counter Parallax) */}
          <div
            ref={rightColRef}
            className="lg:col-span-7 flex flex-col space-y-6 will-change-transform"
          >
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[rgba(20,22,27,0.1)] shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[rgba(20,22,27,0.08)]">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#b58d5b] font-semibold block">
                    Curated Itinerary
                  </span>
                  <h3 className="font-serif text-2xl text-[#14161b] font-light">
                    A Day in Sacred Stillness
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-[#827e74] uppercase tracking-wider">
                  4 Curated Chapters
                </span>
              </div>

              {/* Itinerary Steps Navigation */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {itinerary.map((step, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className={`p-2.5 rounded-xl text-left font-mono transition-all cursor-pointer ${
                      activeTab === idx
                        ? "bg-[#14161b] text-white shadow-md font-semibold"
                        : "bg-[#f7f4ee] hover:bg-[#f2ece1] text-[#5a5750]"
                    }`}
                  >
                    <span className="block text-[9px] text-[#c5a880]">{step.time}</span>
                    <span className="text-xs truncate block">{step.phase}</span>
                  </button>
                ))}
              </div>

              {/* Active Itinerary Chapter Card */}
              <div className="p-6 rounded-xl bg-[#f7f4ee] border border-[rgba(20,22,27,0.06)] space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-white text-[#14161b] text-[10px] font-mono font-semibold uppercase tracking-wider border border-gray-200 shadow-xs">
                    {itinerary[activeTab].time} • {itinerary[activeTab].phase}
                  </span>
                  <span className="text-xs font-mono text-[#b58d5b] flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {itinerary[activeTab].distance}
                  </span>
                </div>

                <h4 className="font-serif text-xl sm:text-2xl text-[#14161b] font-medium">
                  {itinerary[activeTab].title}
                </h4>

                <p className="text-xs sm:text-sm text-[#5a5750] leading-relaxed font-mono">
                  {itinerary[activeTab].desc}
                </p>

                <div className="pt-2 flex items-center space-x-2 text-xs font-mono text-[#14161b] font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-[#b58d5b]" />
                  <span>{itinerary[activeTab].highlight}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Landmarks Matrix Grid with Staggered Parallax Heights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {landmarks.map((mark, idx) => (
            <div
              key={mark.num}
              ref={(el) => {
                landmarkRefs.current[idx] = el;
              }}
              className="p-6 rounded-2xl bg-white border border-[rgba(20,22,27,0.08)] shadow-[0_15px_35px_rgba(20,22,27,0.04)] hover:shadow-lg transition-all flex flex-col justify-between space-y-4 will-change-transform"
            >
              <div>
                <span className="text-xs font-mono font-semibold text-[#b58d5b] block mb-1">
                  {`${mark.num} // LANDMARK`}
                </span>
                <h4 className="font-serif text-lg text-[#14161b] font-medium mb-1">
                  {mark.title}
                </h4>
                <span className="text-[10px] font-mono text-[#827e74] uppercase tracking-wider block mb-2">
                  {mark.dist}
                </span>
                <p className="text-xs text-[#5a5750] leading-relaxed font-mono">
                  {mark.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-[rgba(20,22,27,0.06)] text-[9px] font-mono text-[#827e74]">
                {mark.coords}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
