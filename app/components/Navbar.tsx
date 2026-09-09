"use client";

import { useState, useEffect } from "react";
import AmbientSoundscape from "./AmbientSoundscape";
import { ArrowUpRight, X, Menu } from "lucide-react";

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [puriTime, setPuriTime] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      setPuriTime(now.toLocaleTimeString("en-GB", options));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { num: "01", label: "Suites", href: "#suites" },
    { num: "02", label: "Architecture", href: "#architecture" },
    { num: "03", label: "Rooftop Pool", href: "#rooftop" },
    { num: "04", label: "Dining", href: "#dining" },
    { num: "05", label: "Blueprints", href: "#blueprints" },
    { num: "06", label: "Destination", href: "#destination" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#f7f4ee] border-b border-[rgba(20,22,27,0.09)] py-3 sm:py-3.5"
            : "bg-transparent py-3.5 sm:py-5"
        }`}
      >
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 flex items-center justify-between gap-2 sm:gap-4 lg:gap-6">
          {/* Left: Brand Monogram & Wordmark */}
          <a href="#" className="flex items-center space-x-2.5 sm:space-x-3.5 group flex-shrink-0">
            <div
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border-[1.5px] flex items-center justify-center transition-all duration-200 relative ${
                scrolled
                  ? "border-[#c5a880] bg-[#14161b]/[0.03]"
                  : "border-[#c5a880] bg-white/[0.06]"
              }`}
            >
              <div className="w-[calc(100%-4px)] h-[calc(100%-4px)] rounded-full border border-[#c5a880]/40 flex items-center justify-center">
                <span className="font-cinzel text-xs sm:text-[13px] font-bold text-[#c5a880] leading-none">
                  S
                </span>
              </div>
            </div>

            <div className="flex flex-col">
              <span
                className={`font-cinzel text-[13.5px] sm:text-[15.5px] lg:text-[17px] tracking-[0.24em] sm:tracking-[0.28em] font-bold leading-none mb-1 transition-colors whitespace-nowrap ${
                  scrolled ? "text-[#14161b]" : "text-white"
                }`}
              >
                HOTEL SERENE
              </span>
              <span className="hidden sm:flex items-center space-x-1.5 text-[8px] sm:text-[8.5px] font-mono tracking-[0.28em] uppercase transition-colors whitespace-nowrap text-[#c5a880]">
                <span>PURI</span>
                <span className="text-[6px] opacity-60">◆</span>
                <span>BAY OF BENGAL</span>
              </span>
            </div>
          </a>

          {/* Center: Sculpted Neoclassical Navigation Links */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-8 2xl:gap-11">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group relative py-1 flex items-baseline space-x-1.5 transition-colors duration-200 whitespace-nowrap"
              >
                <span className="font-cinzel text-[9.5px] xl:text-[10.5px] font-bold text-[#c5a880] tracking-widest transition-opacity group-hover:text-[#e5d4be]">
                  {item.num}
                </span>
                <span
                  className={`font-serif text-[14px] xl:text-[15.5px] 2xl:text-[16.5px] tracking-[0.04em] xl:tracking-[0.06em] font-semibold transition-all duration-200 ${
                    scrolled
                      ? "text-[#2e3037] group-hover:text-[#14161b]"
                      : "text-white/85 group-hover:text-white"
                  }`}
                >
                  {item.label}
                </span>
                {/* Razor-Thin Solid Underline */}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#c5a880] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right: Telemetry, Soundscape & Reservation */}
          <div className="flex items-center space-x-2 sm:space-x-3.5 md:space-x-4 flex-shrink-0">
            {/* Minimalist Clock (Shown on Widescreens so it never crowds laptops) */}
            <div
              className={`hidden 2xl:flex items-center space-x-2 text-[10px] font-mono tracking-wider border-r pr-4 transition-colors whitespace-nowrap ${
                scrolled
                  ? "text-[#5a5750] border-[rgba(20,22,27,0.12)]"
                : "text-white/70 border-white/20"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] animate-pulse" />
              <span className="font-cinzel font-bold tracking-widest text-[#c5a880] text-[9.5px]">PURI</span>
              <span className={scrolled ? "text-[#14161b] font-semibold" : "text-white font-semibold"}>
                {puriTime ? `${puriTime} IST` : "LIVE"}
              </span>
            </div>

            {/* Soundscape Toggle (Desktop & Tablet) */}
            <div className="hidden xs:block">
              <AmbientSoundscape isDark={!scrolled} />
            </div>

            {/* Solid Minimalist Reserve Button */}
            <button
              onClick={onOpenBooking}
              className={`group px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 text-[10px] sm:text-[11px] font-cinzel uppercase tracking-[0.22em] font-bold transition-all duration-200 rounded-full flex items-center space-x-1.5 sm:space-x-2 cursor-pointer whitespace-nowrap shadow-sm ${
                scrolled
                  ? "bg-[#14161b] hover:bg-[#2b2e36] text-white border border-[#14161b]"
                  : "bg-white hover:bg-[#f7f4ee] text-[#14161b] border border-white"
              }`}
            >
              <span>Reserve</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#c5a880] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* Mobile Menu Pill Trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={`lg:hidden px-3 py-1.5 rounded-full border text-[10px] font-cinzel font-bold uppercase tracking-widest cursor-pointer transition-colors flex items-center space-x-1.5 ${
                scrolled
                  ? "border-[#14161b]/30 text-[#14161b] hover:bg-[#14161b] hover:text-white"
                  : "border-white/40 text-white hover:bg-white hover:text-[#14161b]"
              }`}
              aria-label="Open navigation menu"
            >
              <Menu className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Luxury Mobile Overlay Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#14161b] text-[#f7f4ee] flex flex-col justify-between p-6 sm:p-10 overflow-y-auto animate-in fade-in duration-200"
        >
          {/* Drawer Top Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full border border-[#c5a880] flex items-center justify-center">
                <span className="font-cinzel text-xs font-bold text-[#c5a880]">S</span>
              </div>
              <div className="flex flex-col">
                <span className="font-cinzel text-sm font-bold tracking-[0.26em] text-white">
                  HOTEL SERENE
                </span>
                <span className="text-[8px] font-mono tracking-[0.26em] text-[#c5a880] uppercase">
                  Puri • Bay of Bengal
                </span>
              </div>
            </div>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full border border-white/25 text-white/80 hover:text-white hover:border-white transition-colors cursor-pointer"
              aria-label="Close navigation menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Nav Links */}
          <div className="flex flex-col space-y-3 my-auto py-8">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="group py-2.5 flex items-center justify-between border-b border-white/10 transition-colors"
              >
                <div className="flex items-baseline space-x-3">
                  <span className="font-cinzel text-xs font-bold text-[#c5a880] tracking-widest">
                    {item.num}
                  </span>
                  <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-wide text-white/95 group-hover:text-[#c5a880] transition-colors">
                    {item.label}
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-[#c5a880] transition-colors" />
              </a>
            ))}
          </div>

          {/* Drawer Footer Controls */}
          <div className="pt-4 border-t border-white/10 flex flex-col space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-white/60">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] animate-pulse" />
                <span className="font-cinzel font-bold text-[#c5a880]">PURI</span>
                <span>• {puriTime} IST</span>
              </div>
              <AmbientSoundscape isDark={true} />
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 bg-[#c5a880] hover:bg-[#b58d5b] text-[#14161b] rounded-full text-center font-cinzel text-xs uppercase tracking-[0.24em] font-bold transition-colors cursor-pointer shadow-md"
            >
              Reserve Residence Online ↗
            </button>
          </div>
        </div>
      )}
    </>
  );
}
