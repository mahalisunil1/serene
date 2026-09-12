"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Mail, Phone, MapPin } from "lucide-react";

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
      {/* Giant Parallax Drifting Logo Watermark */}
      <div
        ref={monogramRef}
        aria-hidden="true"
        className="absolute -bottom-10 right-4 md:right-10 pointer-events-none select-none opacity-[0.05] w-[45vw] max-w-[500px] will-change-transform"
      >
        <Image
          src="/images/logo/logo-cropped.png"
          alt=""
          width={500}
          height={375}
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Drifting Coordinates Strip in Footer Background */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="absolute top-6 left-0 w-full pointer-events-none select-none text-center font-mono text-[9px] uppercase tracking-[0.6em] text-[#14161b] opacity-[0.08] will-change-transform"
      >
        19°48&apos;07&quot;N 85°50&apos;22&quot;E • HOTEL SERENE • PURI DHAM • BAY OF BENGAL
      </div>

      {/* Subtle radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[rgba(140,123,104,0.08)] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12 pb-12 border-b border-[rgba(17,19,23,0.1)]">
          {/* Brand & Narrative */}
          <div className="lg:col-span-4">
            <div className="flex items-center space-x-3.5 mb-5">
              <div className="w-12 h-10 flex items-center justify-center flex-shrink-0">
                <Image
                  src="/images/logo/logo-cropped.png"
                  alt="Hotel Serene Logo"
                  width={60}
                  height={45}
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl tracking-[0.15em] text-[#14161b] font-light">
                  HOTEL SERENE
                </span>
                <span
                  className="font-script text-xl sm:text-2xl text-[#b58d5b] font-normal leading-tight"
                  style={{ fontFamily: "var(--font-script), 'Great Vibes', cursive" }}
                >
                  Sanctuary by the Sea
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#4a4740] font-sans font-light leading-relaxed mb-5">
              An intimate coastal boutique sanctuary on the shores of Puri, Odisha. Defined by tranquil sea horizons, panoramic rooftop lap pool, and heartfelt personalized hospitality.
            </p>
            <div className="p-3.5 rounded-xl bg-[#ede7de] border border-[rgba(17,19,23,0.1)] text-[11px] font-mono shadow-xs">
              <span className="text-[#8c7b68] font-semibold block mb-1">COASTAL SANCTUARY:</span>
              <span className="text-[#5a5750]">
                Direct private path to <strong className="text-[#14161b] font-medium">Blue Flag Golden Beach</strong>, Puri Dham.
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
                { name: "Ocean Chambers & Suites", href: "#suites" },
                { name: "Signature Spaces", href: "#experiences" },
                { name: "Rooftop Sky Pool", href: "#rooftop" },
                { name: "30-Seater Restaurant", href: "#dining" },
                { name: "Wellness & Spa", href: "#wellness" },
                { name: "Puri Destination", href: "#destination" },
              ].map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-[#5e5b54] hover:text-[#111317] transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Curated Inclusions */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-[#111317] mb-5 font-semibold">
              Signature Privileges
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex flex-col">
                <span className="text-[#111317] font-medium">Shree Jagannath VIP Protocol</span>
                <span className="text-[11px] text-[#7a766e]">Priority darshan chaperone & transfers</span>
              </li>
              <li className="flex flex-col">
                <span className="text-[#111317] font-medium">Rooftop Striped Lap Pool</span>
                <span className="text-[11px] text-[#7a766e]">Sheer acoustic waterfall & Pergola Lounge</span>
              </li>
              <li className="flex flex-col">
                <span className="text-[#111317] font-medium">Oceanfront Wellness Baths</span>
                <span className="text-[11px] text-[#7a766e]">In-suite freestanding soaking tubs & salts</span>
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
        <div className="flex flex-col md:flex-row items-center justify-between text-xs text-[#7a766e] font-mono gap-4 pt-2">
          <div>
            © {new Date().getFullYear()} Hotel Serene, Puri. All rights reserved.
          </div>

          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-[#111317] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#111317] transition-colors">Resident Terms</a>
            <a href="#" className="hover:text-[#111317] transition-colors">Concierge Desk</a>
          </div>
        </div>

        {/* Clearly Written Ownership Credit */}
        <div className="mt-6 pt-6 border-t border-[rgba(17,19,23,0.08)] flex items-center justify-center text-center">
          <p className="text-xs sm:text-sm font-mono text-[#3a3730] tracking-wider">
            This Website is made by <strong className="font-bold text-[#14161b] tracking-[0.22em] uppercase">BWARETA</strong>
          </p>
        </div>
      </div>
    </footer>
  );
}
