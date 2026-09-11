"use client";

import React from "react";

interface PattachitraFrameProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  badge?: string;
  folioNumber?: string;
}

/**
 * Minimalist Archival Gallery Mount & Fine-Line Etching Frame
 * Inspired by museum folio lithographs, architectural sketch folios, and fine Odishan ink drawings.
 */
export default function PattachitraFrame({
  children,
  className = "",
  title,
  subtitle,
  badge,
  folioNumber = "PL. 01",
}: PattachitraFrameProps) {
  return (
    <div
      className={`relative rounded-2xl p-6 sm:p-8 md:p-10 bg-[#fdfcf9] border border-[#1c1a17]/10 shadow-[0_12px_40px_rgba(28,26,23,0.03)] overflow-hidden transition-all duration-500 ${className}`}
    >
      {/* Archival Linen Texture Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply"
        style={{
          backgroundImage: `radial-gradient(#1c1a17 1px, transparent 1px)`,
          backgroundSize: "16px 16px",
        }}
      />

      {/* Fine Lithographic Corner Registration Crosshairs (+) */}
      <div className="absolute top-4 left-4 pointer-events-none text-[#b58d5b]/50 select-none">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <line x1="7" y1="0" x2="7" y2="14" stroke="currentColor" strokeWidth="0.75" />
          <line x1="0" y1="7" x2="14" y2="7" stroke="currentColor" strokeWidth="0.75" />
        </svg>
      </div>
      <div className="absolute top-4 right-4 pointer-events-none text-[#b58d5b]/50 select-none">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <line x1="7" y1="0" x2="7" y2="14" stroke="currentColor" strokeWidth="0.75" />
          <line x1="0" y1="7" x2="14" y2="7" stroke="currentColor" strokeWidth="0.75" />
        </svg>
      </div>
      <div className="absolute bottom-4 left-4 pointer-events-none text-[#b58d5b]/50 select-none">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <line x1="7" y1="0" x2="7" y2="14" stroke="currentColor" strokeWidth="0.75" />
          <line x1="0" y1="7" x2="14" y2="7" stroke="currentColor" strokeWidth="0.75" />
        </svg>
      </div>
      <div className="absolute bottom-4 right-4 pointer-events-none text-[#b58d5b]/50 select-none">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <line x1="7" y1="0" x2="7" y2="14" stroke="currentColor" strokeWidth="0.75" />
          <line x1="0" y1="7" x2="14" y2="7" stroke="currentColor" strokeWidth="0.75" />
        </svg>
      </div>

      {/* Minimalist Hairline Inner Inset Border */}
      <div className="absolute inset-3 border border-[#b58d5b]/15 pointer-events-none rounded-xl" />

      {/* Archival Folio Header */}
      {(title || badge) && (
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-5 mb-6 border-b border-[#1c1a17]/8 relative z-10">
          <div>
            <div className="flex items-center space-x-3 mb-1.5">
              {badge && (
                <span className="text-[9px] font-mono tracking-[0.28em] uppercase text-[#b58d5b] font-semibold">
                  {badge}
                </span>
              )}
              <span className="text-[9px] font-mono text-[#8a8479]/60">
                • {folioNumber} • INK & COPPERPLATE ETCHING
              </span>
            </div>
            {title && (
              <h3 className="font-serif text-xl sm:text-2xl text-[#1c1a17] font-normal tracking-tight">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-[#716c62] font-sans mt-1 max-w-xl font-light">
                {subtitle}
              </p>
            )}
          </div>

          <div className="hidden sm:flex items-center space-x-2 text-[10px] font-mono text-[#8a8479] tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b58d5b]" />
            <span>ପଟ୍ଟଚିତ୍ର ରେଖା ଚିତ୍ର • Fine-Line Archive</span>
          </div>
        </div>
      )}

      {/* Illustration Area */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
