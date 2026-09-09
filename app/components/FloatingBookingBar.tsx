"use client";

import { useState, useEffect } from "react";
import { Calendar, Users, ChevronDown, ArrowRight, Sparkles, ChevronUp } from "lucide-react";

interface FloatingBookingBarProps {
  onOpenBooking: () => void;
}

export default function FloatingBookingBar({ onOpenBooking }: FloatingBookingBarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [nights, setNights] = useState(2);
  const [guests, setGuests] = useState(2);
  const [showDatesPicker, setShowDatesPicker] = useState(false);
  const [showGuestsPicker, setShowGuestsPicker] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Reveal floating bar only after scrolling past the hero section (at least 60% of viewport)
      const threshold = window.innerHeight * 0.6;
      setVisible(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <aside
      aria-label="Quick Booking"
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-4xl transition-all duration-500 ease-out ${
        visible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-24 opacity-0 pointer-events-none"
      }`}
    >
      {/* Minimized Pill Toggle */}
      {isCollapsed ? (
        <div className="flex justify-center">
          <button
            onClick={() => setIsCollapsed(false)}
            className="px-6 py-3 rounded-full bg-[#14161b] text-[#f7f4ee] border border-[#c5a880]/40 shadow-2xl flex items-center space-x-3 text-xs font-mono lowercase tracking-widest hover:bg-[#20232a] transition-all cursor-pointer group"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
            <span>réserver votre sanctuaire • check rates</span>
            <ChevronUp className="w-3.5 h-3.5 text-[#c5a880] group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      ) : (
        /* Expanded Floating Glass Booking Bar */
        <div className="relative rounded-2xl bg-white/90 backdrop-blur-2xl border border-[rgba(20,22,27,0.1)] shadow-[0_20px_50px_rgba(20,22,27,0.15)] p-2 sm:p-2.5 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          {/* Collapse Button */}
          <button
            onClick={() => setIsCollapsed(true)}
            className="absolute -top-3 right-4 p-1 rounded-full bg-[#14161b] text-white/80 hover:text-white text-[9px] shadow-sm flex items-center justify-center cursor-pointer"
            title="Minimize booking bar"
          >
            <ChevronDown className="w-3 h-3" />
          </button>

          {/* 1. Dates Selector */}
          <div className="relative w-full sm:w-auto flex-1">
            <button
              onClick={() => {
                setShowDatesPicker(!showDatesPicker);
                setShowGuestsPicker(false);
              }}
              className="w-full flex items-center space-x-3 p-2.5 rounded-xl hover:bg-[#f7f4ee] transition-all text-left cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-[#c5a880]/15 text-[#b58d5b] flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#827e74] block">
                  Dates & Duration
                </span>
                <span className="text-xs font-serif font-medium text-[#14161b] truncate block">
                  {nights} Nights • Flexible Stay
                </span>
              </div>
            </button>

            {/* Quick Nights Dropdown */}
            {showDatesPicker && (
              <div className="absolute bottom-full mb-2 left-0 w-64 p-3 bg-white rounded-xl shadow-2xl border border-[rgba(20,22,27,0.1)] z-50 text-xs font-mono space-y-1.5">
                <div className="text-[10px] uppercase tracking-wider text-[#827e74] pb-1 border-b border-gray-100">
                  Select Length of Stay
                </div>
                {[1, 2, 3, 4, 5, 7, 10].map((n) => (
                  <div
                    key={n}
                    onClick={() => {
                      setNights(n);
                      setShowDatesPicker(false);
                    }}
                    className={`p-2 rounded-lg cursor-pointer flex justify-between items-center transition-all ${
                      nights === n ? "bg-[#14161b] text-white" : "hover:bg-[#f7f4ee] text-[#14161b]"
                    }`}
                  >
                    <span>{n} {n === 1 ? "Night" : "Nights"}</span>
                    <span className="text-[10px] opacity-70">Best Available Rate</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="hidden sm:block w-[1px] h-8 bg-[rgba(20,22,27,0.08)]" />

          {/* 2. Guests Selector */}
          <div className="relative w-full sm:w-auto flex-1">
            <button
              onClick={() => {
                setShowGuestsPicker(!showGuestsPicker);
                setShowDatesPicker(false);
              }}
              className="w-full flex items-center space-x-3 p-2.5 rounded-xl hover:bg-[#f7f4ee] transition-all text-left cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-[#c5a880]/15 text-[#b58d5b] flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#827e74] block">
                  Guests & Rooms
                </span>
                <span className="text-xs font-serif font-medium text-[#14161b] truncate block">
                  {guests} {guests === 1 ? "Guest" : "Guests"} • 1 Chamber
                </span>
              </div>
            </button>

            {/* Guests Dropdown */}
            {showGuestsPicker && (
              <div className="absolute bottom-full mb-2 left-0 w-56 p-3 bg-white rounded-xl shadow-2xl border border-[rgba(20,22,27,0.1)] z-50 text-xs font-mono space-y-1.5">
                <div className="text-[10px] uppercase tracking-wider text-[#827e74] pb-1 border-b border-gray-100">
                  Number of Guests
                </div>
                {[1, 2, 3, 4].map((g) => (
                  <div
                    key={g}
                    onClick={() => {
                      setGuests(g);
                      setShowGuestsPicker(false);
                    }}
                    className={`p-2 rounded-lg cursor-pointer flex justify-between items-center transition-all ${
                      guests === g ? "bg-[#14161b] text-white" : "hover:bg-[#f7f4ee] text-[#14161b]"
                    }`}
                  >
                    <span>{g} {g === 1 ? "Adult" : "Adults"}</span>
                    <span className="text-[10px] opacity-70">Sea View</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="hidden sm:block w-[1px] h-8 bg-[rgba(20,22,27,0.08)]" />

          {/* 3. Room Best Rate Preview */}
          <div className="hidden md:flex flex-col items-start px-3 py-1">
            <span className="text-[9px] font-mono uppercase tracking-widest text-[#827e74]">
              Starting From
            </span>
            <span className="text-xs font-mono font-semibold text-[#b58d5b]">
              ₹6,500 <span className="text-[9px] text-[#827e74] font-normal">/ night</span>
            </span>
          </div>

          {/* 4. Instant Action Button */}
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#14161b] hover:bg-[#232730] text-[#f7f4ee] font-mono text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-300 shadow-md flex items-center justify-center space-x-2 cursor-pointer group"
          >
            <span>Check Rates</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#c5a880] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}
    </aside>
  );
}
