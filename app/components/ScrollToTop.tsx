"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 800) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isVisible) {
      gsap.to(buttonRef.current, {
        opacity: 1,
        y: 0,
        pointerEvents: "auto",
        duration: 0.6,
        ease: "power3.out",
      });
    } else {
      gsap.to(buttonRef.current, {
        opacity: 0,
        y: 20,
        pointerEvents: "none",
        duration: 0.6,
        ease: "power3.in",
      });
    }
  }, [isVisible]);

  const scrollToTop = () => {
    // Attempt to use the globally exposed Lenis instance for consistent luxurious scrolling
    // @ts-ignore
    const lenis = window.__lenis;
    if (lenis) {
      lenis.scrollTo(0, { 
        duration: 1.5, 
        ease: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) 
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-[90] w-12 h-12 rounded-full bg-[#14161b]/80 backdrop-blur-md border border-[#c5a880]/30 hover:border-[#c5a880] text-[#c5a880] hover:text-white flex items-center justify-center transition-colors duration-300 shadow-2xl opacity-0 translate-y-5 pointer-events-none group"
      aria-label="Scroll to top"
    >
      <svg 
        className="w-5 h-5 transform group-hover:-translate-y-1 transition-transform duration-300" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
