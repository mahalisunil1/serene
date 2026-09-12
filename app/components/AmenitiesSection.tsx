"use client";

import GooeyTextReveal from "@/components/ui/gooey-text-reveal";
import { Sparkles, Compass, Car, Sun, Waves, Coffee } from "lucide-react";

export default function AmenitiesSection() {
  const privileges = [
    {
      num: "01",
      code: "SACRED PURI CONCIERGE",
      title: "Shree Jagannath VIP Protocol",
      desc: "Priority temple darshan assistance, certified Sevayat chaperones, traditional sacred Mahaprasad coordination, and private chauffeur escort.",
      detail: "Private Chaperone & Temple Concierge",
      icon: Compass,
    },
    {
      num: "02",
      code: "IN-SUITE WELLNESS",
      title: "Deep Soaking & Spa Sanctuaries",
      desc: "In-suite architectural resin soaking tubs, wild botanical mineral bath salts, and tailored Ayurvedic oil therapies for restorative calm.",
      detail: "Available in Executive Suites & Spa Atelier",
      icon: Waves,
    },
    {
      num: "03",
      code: "24-HOUR ACCESS",
      title: "Horizon Movement Studio",
      desc: "Cardio treadmills, multi-functional strength stations, and dedicated yoga space oriented toward the inspiring eastern coastal dawn.",
      detail: "Complimentary for All Residents",
      icon: Sun,
    },
    {
      num: "04",
      code: "SEAMLESS MOBILITY",
      title: "Private Luxury Chauffeur",
      desc: "Direct Mercedes transfers to and from Bhubaneswar (BBI) Airport, Puri railway station, and scenic coastal Marine Drive day excursions.",
      detail: "Airport & Coastal Corridor Transfers",
      icon: Car,
    },
    {
      num: "05",
      code: "BESPOKE REFRESHMENT",
      title: "In-Chamber Artisan Pantry",
      desc: "Curated single-origin teas, pour-over coastal coffees, chilled mineral waters, and 24-hour private dining served to your personal chamber.",
      detail: "Included in Every Residence",
      icon: Coffee,
    },
    {
      num: "06",
      code: "COASTAL EXPLORATION",
      title: "Private Beach & Lagoon Catamaran",
      desc: "Direct private access to Blue Flag Golden Beach, dedicated shaded beach cabanas, and chartered catamaran excursions to Chilika Lake.",
      detail: "Curated Daily by Chief Concierge",
      icon: Sparkles,
    },
  ];

  return (
    <section
      id="amenities"
      className="py-16 sm:py-20 md:py-24 px-6 md:px-12 bg-[#ede7de] border-t border-[rgba(17,19,23,0.1)] relative"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6 pb-6 border-b border-[rgba(17,19,23,0.1)]">
          <div>
            <div className="flex items-center space-x-2 text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-[#8c7b68] mb-3 font-semibold">
              <span>Bespoke Hospitality</span>
              <span className="text-[#b5afa3]">/</span>
              <span>Services</span>
            </div>
            <GooeyTextReveal mode="scrub" pin={true} splitBy="words" stagger={0.06} blurAmount={0.5}>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#14161b] font-light tracking-tight leading-tight">
                Curated Resident Privileges <br />
                <span className="italic font-normal text-[#8c7b68]">& Hospitality Amenities</span>
              </h2>
            </GooeyTextReveal>
          </div>
          <GooeyTextReveal mode="scroll" start="top 80%" duration={1.4} delay={0.15}>
            <p className="max-w-md text-xs sm:text-sm text-[#4a4740] font-sans font-light leading-relaxed">
              Every service has been thoughtfully designed to ensure effortless ease, 
              discreet luxury, and unforgettable coastal memories.
            </p>
          </GooeyTextReveal>
        </div>

        {/* Privileges Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {privileges.map((item) => (
            <div
              key={item.num}
              className="p-8 rounded-2xl bg-[#f4efe6] border border-[rgba(17,19,23,0.08)] hover:border-[rgba(17,19,23,0.25)] transition-all duration-300 group flex flex-col justify-between shadow-xs hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-[#7a766e] mb-4 pb-2 border-b border-[rgba(17,19,23,0.06)]">
                  <span className="text-[#8c7b68] font-semibold">PRIVILEGE {item.num}</span>
                  <span className="tracking-widest uppercase text-[#7a766e]">{item.code}</span>
                </div>
                <h3 className="font-serif text-xl text-[#111317] mb-3 group-hover:text-[#8c7b68] transition-colors font-light">
                  {item.title}
                </h3>
                <p className="text-xs text-[#5e5b54] font-light leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-[rgba(17,19,23,0.06)] text-[10px] font-mono text-[#7a766e]">
                {item.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
