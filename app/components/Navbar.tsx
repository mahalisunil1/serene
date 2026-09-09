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
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center transition-colors duration-200 ${
                scrolled
                  ? "border-[#14161b]/30 text-[#14161b]"
                  : "border-white/40 text-white"
              }`}
            >
              <span className="font-serif text-xs sm:text-sm font-medium tracking-wider">
                S
              </span>
            </div>

            <div className="flex flex-col">
              <span
                className={`font-serif text-[13px] sm:text-[15px] lg:text-base tracking-[0.2em] sm:tracking-[0.26em] font-normal leading-none mb-0.5 sm:mb-1 transition-colors whitespace-nowrap ${
                  scrolled ? "text-[#14161b]" : "text-white"
                }`}
              >
                HOTEL SERENE
              </span>
              <span
                className={`hidden sm:block text-[8px] sm:text-[8.5px] font-mono tracking-[0.22em] uppercase transition-colors whitespace-nowrap ${
                  scrolled ? "text-[#827e74]" : "text-white/60"
                }`}
              >
                Puri • Bay of Bengal
              </span>
            </div>
          </a>

          {/* Center: Truly Responsive Navigation Links (Laptops & Desktops) */}
          <nav className="hidden lg:flex items-center gap-3.5 xl:gap-7 2xl:gap-11">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-[10px] xl:text-[11px] 2xl:text-xs uppercase tracking-[0.16em] xl:tracking-[0.2em] font-sans font-medium transition-colors duration-200 relative group py-1 whitespace-nowrap ${
                  scrolled
                    ? "text-[#5a5750] hover:text-[#14161b]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <span>{item.label}</span>
                {/* Razor-Thin Solid Underline */}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c5a880] transition-all duration-300 group-hover:w-full" />
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
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]" />
              <span className="opacity-70">Puri</span>
              <span className={scrolled ? "text-[#14161b] font-medium" : "text-white font-medium"}>
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
              className={`px-3.5 sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-2.5 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.18em] sm:tracking-[0.22em] font-semibold transition-colors duration-200 rounded-full flex items-center space-x-1 sm:space-x-1.5 cursor-pointer whitespace-nowrap ${
                scrolled
                  ? "bg-[#14161b] hover:bg-[#2b2e36] text-white"
                  : "bg-white hover:bg-[#ede7de] text-[#14161b]"
              }`}
            >
              <span>Reserve</span>
              <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>

            {/* Mobile Menu Pill Trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={`lg:hidden px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border text-[9px] sm:text-[10px] font-mono uppercase tracking-widest cursor-pointer transition-colors flex items-center space-x-1 ${
                scrolled
                  ? "border-[#14161b]/30 text-[#14161b] hover:bg-[#14161b] hover:text-white"
                  : "border-white/40 text-white hover:bg-white hover:text-[#14161b]"
              }`}
              aria-label="Open navigation menu"
            >
              <Menu className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
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
              <div className="w-7 h-7 rounded-full border border-white/40 flex items-center justify-center font-serif text-xs">
                S
              </div>
              <span className="font-serif text-sm tracking-[0.24em]">
                HOTEL SERENE
              </span>
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
          <div className="flex flex-col space-y-4 my-auto py-8">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-2xl sm:text-3xl tracking-wide text-white/90 hover:text-[#c5a880] transition-colors flex items-center justify-between border-b border-white/10 pb-3"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-mono text-[#c5a880]">{item.num}</span>
                  <span>{item.label}</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-[#c5a880]" />
              </a>
            ))}
          </div>

          {/* Drawer Footer Controls */}
          <div className="pt-4 border-t border-white/10 flex flex-col space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-white/60">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]" />
                <span>PURI • {puriTime} IST</span>
              </div>
              <AmbientSoundscape isDark={true} />
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 bg-white text-[#14161b] hover:bg-[#c5a880] rounded-full text-center font-mono text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer"
            >
              Reserve Residence Online →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
