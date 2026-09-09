"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface LightboxImage {
  src: string;
  alt: string;
  title: string;
  subtitle?: string;
  provenance?: string;
}

interface ImageLightboxProps {
  images: LightboxImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onIndexChange: (newIndex: number) => void;
}

export default function ImageLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onIndexChange,
}: ImageLightboxProps) {
  const currentImage = images[currentIndex] || images[0];

  const handlePrev = useCallback(() => {
    onIndexChange((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onIndexChange]);

  const handleNext = useCallback(() => {
    onIndexChange((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onIndexChange]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentImage) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex flex-col justify-between bg-[#0e1014]/94 backdrop-blur-xl transition-all duration-300">
      {/* Top Bar: Title & Close */}
      <div className="p-6 flex items-center justify-between z-20 border-b border-white/10 text-white">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#c5a880] block mb-0.5">
            {currentImage.provenance || "Architectural Gallery • Hotel Serene"}
          </span>
          <h3 className="font-serif text-xl sm:text-2xl text-white font-light">
            {currentImage.title}
          </h3>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-xs font-mono text-white/50">
            {currentIndex + 1} / {images.length}
          </span>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
            aria-label="Close Gallery"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center p-4 sm:p-10 select-none">
        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-4 sm:left-8 z-30 p-3.5 rounded-full bg-white/10 hover:bg-[#c5a880] hover:text-[#14161b] text-white backdrop-blur-md transition-all cursor-pointer shadow-lg"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="relative w-full h-full max-w-6xl max-h-[75vh] flex items-center justify-center">
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            sizes="90vw"
            className="object-contain transition-all duration-500 rounded-xs"
            priority
          />
        </div>

        <button
          onClick={handleNext}
          className="absolute right-4 sm:right-8 z-30 p-3.5 rounded-full bg-white/10 hover:bg-[#c5a880] hover:text-[#14161b] text-white backdrop-blur-md transition-all cursor-pointer shadow-lg"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Bar: Caption & Thumbnails */}
      <div className="p-4 sm:p-6 border-t border-white/10 bg-[#0e1014]/80 flex flex-col sm:flex-row items-center justify-between gap-4 z-20">
        <p className="text-xs text-white/70 font-mono max-w-xl text-center sm:text-left">
          {currentImage.subtitle || "Capturing classical European proportion and sacred coastal light by Reflections by Ankita."}
        </p>

        {/* Thumbnail Filmstrip */}
        <div className="flex items-center space-x-2 overflow-x-auto max-w-full pb-1 sm:pb-0">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => onIndexChange(idx)}
              className={`relative w-12 h-10 rounded-xs overflow-hidden border transition-all cursor-pointer flex-shrink-0 ${
                idx === currentIndex
                  ? "border-[#c5a880] ring-2 ring-[#c5a880]/30 scale-105"
                  : "border-white/20 opacity-40 hover:opacity-90"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="50px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
