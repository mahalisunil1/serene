"use client";

import { useState, useEffect } from "react";
import AmbientSoundscape from "./AmbientSoundscape";
import { ArrowUpRight } from "lucide-react";

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
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { num: "01", label: "Suites", href: "#suites" },
    { num: "02", label: "Architecture", href: "#architecture" },
    { num: "03", label: "Rooftop Pool", href: "#rooftop" },
    { num: "04", label: "Dining", href: "#dining" },
    { num: "05", label: "Blueprints", href: "#blueprints" },
    { num: "06", label: "Destination", href: "#destination" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#f7f4ee] border-b border-[rgba(20,22,27,0.09)] py-4"
          : "bg-transparent py-5"
      }`}
    >
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-14 flex items-center justify-between gap-6">
        {/* Left: Brand Monogram & Wordmark */}
        <a href="#" className="flex items-center space-x-3.5 group flex-shrink-0">
          <div
            className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors duration-200 ${
              scrolled
                ? "border-[#14161b]/30 text-[#14161b]"
                : "border-white/40 text-white"
            }`}
          >
            <span className="font-serif text-sm font-medium tracking-wider">
              S
            </span>
          </div>

          <div className="flex flex-col">
            <span
              className={`font-serif text-[15px] sm:text-base tracking-[0.28em] font-normal leading-none mb-1 transition-colors whitespace-nowrap ${
                scrolled ? "text-[#14161b]" : "text-white"
              }`}
            >
              HOTEL SERENE
            </span>
            <span
              className={`text-[8.5px] font-mono tracking-[0.24em] uppercase transition-colors whitespace-nowrap ${
                scrolled ? "text-[#827e74]" : "text-white/60"
              }`}
            >
              Puri • Bay of Bengal
            </span>
          </div>
        </a>

        {/* Center: Minimalist High-End Navigation */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-10 2xl:gap-12">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-[11px] xl:text-xs uppercase tracking-[0.22em] font-sans font-medium transition-colors duration-200 relative group py-1 whitespace-nowrap ${
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
        <div className="flex items-center space-x-4 sm:space-x-5 flex-shrink-0">
          {/* Minimalist Clock */}
          <div
            className={`hidden xl:flex items-center space-x-2 text-[10px] font-mono tracking-wider border-r pr-4 transition-colors whitespace-nowrap ${
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

          {/* Minimalist Soundscape Toggle */}
          <AmbientSoundscape isDark={!scrolled} />

          {/* Solid Minimalist Reserve Button */}
          <button
            onClick={onOpenBooking}
            className={`px-6 py-2.5 text-[10px] font-mono uppercase tracking-[0.22em] font-semibold transition-colors duration-200 rounded-full flex items-center space-x-1.5 cursor-pointer whitespace-nowrap ${
              scrolled
                ? "bg-[#14161b] hover:bg-[#2b2e36] text-white"
                : "bg-white hover:bg-[#ede7de] text-[#14161b]"
            }`}
          >
            <span>Reserve</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Pill Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden px-3.5 py-1.5 rounded-full border text-[10px] font-mono uppercase tracking-widest cursor-pointer transition-colors ${
              scrolled
                ? "border-[#14161b]/30 text-[#14161b] hover:bg-[#14161b] hover:text-white"
                : "border-white/40 text-white hover:bg-white hover:text-[#14161b]"
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-[#14161b] border-b border-white/10 py-8 px-8 shadow-xl">
          <div className="flex flex-col space-y-4 max-w-md mx-auto">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-2xl tracking-wide text-white/90 hover:text-[#c5a880] transition-colors flex items-center justify-between border-b border-white/10 pb-3"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-mono text-[#c5a880]">{item.num}</span>
                  <span>{item.label}</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-[#c5a880]" />
              </a>
            ))}

            <div className="pt-4 flex flex-col justify-between items-center gap-4 text-xs font-mono text-white/60">
              <div className="flex items-center space-x-2 text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]" />
                <span>PURI, ODISHA • {puriTime} IST</span>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3.5 bg-white text-[#14161b] hover:bg-[#c5a880] rounded-full text-center font-semibold uppercase tracking-widest transition-colors cursor-pointer"
              >
                Reserve Residence Online →
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
