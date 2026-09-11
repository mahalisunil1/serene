"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import AmbientSoundscape from "./AmbientSoundscape";
import { ArrowUpRight } from "lucide-react";

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [puriTime, setPuriTime] = useState("");

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

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#f7f4ee]/95 backdrop-blur-md border-b border-[rgba(20,22,27,0.08)] py-2.5 sm:py-3 shadow-xs"
          : "bg-transparent py-4 sm:py-6"
      }`}
    >
      <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 flex items-center justify-between relative h-11 sm:h-13">
        {/* Left: Telemetry & Location Coordinates */}
        <div className="flex items-center space-x-2.5 text-[10px] sm:text-[11px] font-mono tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] animate-pulse" />
          <span className="font-cinzel font-bold tracking-widest text-[#c5a880] text-[9.5px] sm:text-[10.5px]">
            PURI
          </span>
          <span
            className={`hidden sm:inline transition-colors ${
              scrolled ? "text-[#14161b]/75 font-medium" : "text-white/80 font-medium"
            }`}
          >
            • {puriTime ? `${puriTime} IST` : "BAY OF BENGAL"}
          </span>
        </div>

        {/* Center: Refined Sized Centered Brand Logo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <a
            href="#"
            className="flex items-center justify-center transition-transform duration-300 hover:scale-105"
            aria-label="Hotel Serene Home"
          >
            <Image
              src="/images/logo/logo-cropped.png"
              alt="Hotel Serene Logo"
              width={220}
              height={70}
              priority
              className={`w-auto object-contain transition-all duration-300 drop-shadow-sm ${
                scrolled
                  ? "h-8 sm:h-10 md:h-11 lg:h-12"
                  : "h-10 sm:h-12 md:h-14 lg:h-15"
              }`}
            />
          </a>
        </div>

        {/* Right: Soundscape Toggle & Direct Reservation Pill */}
        <div className="flex items-center space-x-2.5 sm:space-x-4 flex-shrink-0">
          <AmbientSoundscape isDark={!scrolled} />

          <button
            onClick={onOpenBooking}
            className={`group px-4 sm:px-6 py-2 sm:py-2.5 text-[10px] sm:text-[11px] font-cinzel uppercase tracking-[0.22em] font-bold transition-all duration-200 rounded-full flex items-center space-x-1.5 sm:space-x-2 cursor-pointer whitespace-nowrap shadow-sm ${
              scrolled
                ? "bg-[#14161b] hover:bg-[#2b2e36] text-white border border-[#14161b]"
                : "bg-white hover:bg-[#f7f4ee] text-[#14161b] border border-white"
            }`}
          >
            <span>Reserve</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#c5a880] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </header>
  );
}
