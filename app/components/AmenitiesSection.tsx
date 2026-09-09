"use client";

import GooeyTextReveal from "@/components/ui/gooey-text-reveal";

export default function AmenitiesSection() {
  const appointments = [
    {
      num: "01",
      code: "5TH FLOOR • 12'-9\" × 8'-0\"",
      title: "Sky Gymnasium & Sunrise Studio",
      desc: "Cardio treadmills, multi-functional weight station, free dumbbells, and full mirror wall oriented toward panoramic morning coastal light.",
      detail: "Floor 5 Executive Level • Mirrored Elevation",
    },
    {
      num: "02",
      code: "3RD FLOOR • 12'-9\" × 8'-0\"",
      title: "Recreation Atelier & Children's Salon",
      desc: "A dedicated quiet sanctuary for families with modular lounge sofas, interactive smart displays, acoustic sliding glass partitions, and board games.",
      detail: "Floor 3 Family Floor • Acoustic Glazing",
    },
    {
      num: "03",
      code: "DUAL CORE SHAFTS",
      title: "Discrete Vertical Transportation",
      desc: "Equipped with a primary Stretcher Lift (7'6\" × 5'3\") and a secondary Service Lift (4'0\" × 5'0\"), ensuring seamless guest privacy and quiet servicing.",
      detail: "B+G+5 Continuous Vertical Core",
    },
    {
      num: "04",
      code: "SACRED PURI PROTOCOL",
      title: "Temple & Coastal Concierge",
      desc: "Curated Shree Jagannath Temple VIP darshan assistance, morning Golden Beach sunrise walks, and private Chilika Lake boat excursions.",
      detail: "Front Desk & Private Chauffeur Services",
    },
    {
      num: "05",
      code: "APPROVED MATERIAL LINEAGE",
      title: "Ceramic World & Lingraj Provenance",
      desc: "Textured fluted woodwork, Italian Calacatta marble tables, custom matte brass hardware, and hand-painted monochrome ceramic art plates.",
      detail: "Specified in Dossier by Reflections by Ankita",
    },
    {
      num: "06",
      code: "EVERY RESIDENCE",
      title: "In-Chamber Beverage Credenza",
      desc: "Hand-selected single-origin teas, pour-over coastal coffees, chilled mineral waters, and premium minibar delicacies integrated into oak study bars.",
      detail: "3'6\" × 1'8\" Custom Millwork Station",
    },
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 px-6 md:px-12 bg-[#ede7de] border-t border-[rgba(17,19,23,0.1)]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6 pb-6 border-b border-[rgba(17,19,23,0.1)]">
          <div>
            <div className="flex items-center space-x-2 text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-[#8c7b68] mb-3 font-semibold">
              <span>Folio VIII</span>
              <span className="text-[#b5afa3]">/</span>
              <span>Infrastructure & Services</span>
            </div>
            <GooeyTextReveal mode="scroll" splitBy="words" start="top 85%" duration={1.6} stagger={0.1}>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#14161b] font-light tracking-tight leading-tight">
                Architectural Appointments <br />
                <span className="italic font-normal text-[#8c7b68]">& Curated Services</span>
              </h2>
            </GooeyTextReveal>
          </div>
          <GooeyTextReveal mode="scroll" start="top 80%" duration={1.4} delay={0.15}>
            <p className="max-w-md text-xs sm:text-sm text-[#4a4740] font-sans font-light leading-relaxed">
              Every convenience has been structurally integrated into the B+G+5 blueprints 
              to ensure effortless tranquility and discrete operational precision.
            </p>
          </GooeyTextReveal>
        </div>

        {/* Schedule Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((item) => (
            <div
              key={item.num}
              className="p-8 rounded-xs bg-[#f4efe6] border border-[rgba(17,19,23,0.08)] hover:border-[rgba(17,19,23,0.25)] transition-all duration-300 group flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-[#7a766e] mb-4 pb-2 border-b border-[rgba(17,19,23,0.06)]">
                  <span className="text-[#8c7b68] font-semibold">SCHEDULE {item.num}</span>
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
