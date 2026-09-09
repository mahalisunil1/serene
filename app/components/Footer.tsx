"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Compass, Mail, Phone, MapPin, ArrowUpRight, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const monogramRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const footer = footerRef.current;
      const mono = monogramRef.current;
      const wm = watermarkRef.current;
      if (!footer) return;

      if (mono) {
        gsap.fromTo(
          mono,
          { yPercent: 40, opacity: 0.02 },
          {
            yPercent: -15,
            opacity: 0.07,
            ease: "none",
            scrollTrigger: {
              trigger: footer,
              start: "top bottom",
              end: "bottom bottom",
              scrub: 0.8,
            },
          }
        );
      }

      if (wm) {
        gsap.fromTo(
          wm,
          { y: 60 },
          {
            y: -20,
            ease: "none",
            scrollTrigger: {
              trigger: footer,
              start: "top bottom",
              end: "bottom bottom",
              scrub: 0.8,
            },
          }
        );
      }
    },
    { scope: footerRef }
  );

  return (
    <footer
      ref={footerRef}
      className="bg-[#e6dfd4] border-t border-[rgba(17,19,23,0.12)] pt-16 sm:pt-20 pb-10 px-6 md:px-12 text-[#5a5750] relative overflow-hidden"
    >
      {/* Giant Parallax Drifting Architectural Monogram Watermark */}
      <div
        ref={monogramRef}
        aria-hidden="true"
        className="absolute bottom-0 right-10 pointer-events-none select-none text-[#14161b] font-serif text-[45vw] font-light leading-none tracking-tighter will-change-transform"
      >
        S
      </div>

      {/* Drifting Coordinates Strip in Footer Background */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="absolute top-6 left-0 w-full pointer-events-none select-none text-center font-mono text-[9px] uppercase tracking-[0.6em] text-[#14161b] opacity-[0.08] will-change-transform"
      >
        19°48&apos;07&quot;N 85°50&apos;22&quot;E • ARCHITECTURE BY REFLECTIONS BY ANKITA • PURI DHAM
      </div>

      {/* Subtle radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[rgba(140,123,104,0.08)] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12 pb-12 border-b border-[rgba(17,19,23,0.1)]">
          {/* Brand & Narrative */}
          <div className="lg:col-span-4">
            <div className="flex items-center space-x-3 mb-5">
              <div className="w-10 h-10 rounded-full border border-[rgba(17,19,23,0.25)] flex items-center justify-center bg-[#14161b]/5 shadow-xs">
                <span className="font-serif text-xl text-[#14161b] font-light">S</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl tracking-[0.15em] text-[#14161b] font-light">
                  HOTEL SERENE
                </span>
                <span className="text-[9.5px] uppercase tracking-[0.35em] text-[#7a6e5d] font-mono">
                  puri • sanctuaire b+g+5
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#4a4740] font-sans font-light leading-relaxed mb-5">
              A contemporary neoclassical hotel on the shores of Puri, Odisha. Defined by classical Corinthian symmetry, panoramic rooftop lap pool, and mindful coastal quietude.
            </p>
            <div className="p-3.5 rounded-xl bg-[#ede7de] border border-[rgba(17,19,23,0.1)] text-[11px] font-mono shadow-xs">
              <span className="text-[#8c7b68] font-semibold block mb-1">ARCHITECTURAL PROVENANCE:</span>
              <span className="text-[#5a5750]">
                Interior Architecture & 3D Dossier by{" "}
                <strong className="text-[#14161b] font-medium">Reflections by Ankita</strong> (October 25, 2024)
              </span>
            </div>
          </div>

          {/* Direct Navigation Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-[#111317] mb-5 font-semibold">
              The Property
            </h4>
            <ul className="space-y-3 text-xs">
              {[
                { name: "Neoclassical Facade", href: "#architecture" },
                { name: "Grand Reception Hall", href: "#spaces" },
                { name: "Deluxe Ocean Chambers", href: "#suites" },
                { name: "Presidential Penthouse", href: "#suites" },
                { name: "Nautical Lap Pool", href: "#rooftop" },
                { name: "Pergola Sky Lounge", href: "#rooftop" },
                { name: "30-Seater Restaurant", href: "#dining" },
              ].map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-[#5e5b54] hover:text-[#111317] transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Vendors & Technical Specifications */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-[#111317] mb-5 font-semibold">
              Specifications & Materiality
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex flex-col">
                <span className="text-[#111317] font-medium">Ceramic World</span>
                <span className="text-[11px] text-[#7a766e]">Chamber tiles, bathroom porcelain & pool mosaics</span>
              </li>
              <li className="flex flex-col">
                <span className="text-[#111317] font-medium">Lingraj Stone</span>
                <span className="text-[11px] text-[#7a766e]">Terrace natural stone cladding & pavers</span>
              </li>
              <li className="flex flex-col">
                <span className="text-[#111317] font-medium">Dual Vertical Transport</span>
                <span className="text-[11px] text-[#7a766e]">Stretcher lift (7&apos;6&quot; × 5&apos;3&quot;) + Service lift (4&apos;0&quot; × 5&apos;0&quot;)</span>
              </li>
            </ul>
          </div>

          {/* Location & Inquiries */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-[#111317] mb-5 font-semibold">
              Coastal Concierge
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#8c7b68] flex-shrink-0 mt-0.5" />
                <span>Marine Drive Road, Near Blue Flag Beach, Puri, Odisha 752001, India</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-[#8c7b68] flex-shrink-0" />
                <span>concierge@serenepuri.com</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-[#8c7b68] flex-shrink-0" />
                <span>+91 (6752) 298-SERENE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#7a766e] font-mono gap-4">
          <div>
            © {new Date().getFullYear()} Hotel Serene, Puri. Architecture by Reflections by Ankita.
          </div>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-[#111317] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#111317] transition-colors">Architectural Rights</a>
            <a href="#" className="hover:text-[#111317] transition-colors">Terms of Residence</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
