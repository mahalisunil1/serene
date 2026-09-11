"use client";

import React, { useState } from "react";

interface KonarkPattachitraProps {
  activeHotspot?: string | null;
  onSelectHotspot?: (hotspotId: string) => void;
  className?: string;
  isCompact?: boolean;
  scrollProgress?: number;
}

/**
 * Monumental Archival Astronomical & Architectural Lithograph:
 * Act III — The Chariot of Dawn (The 24-Spoke Konark Wheel & Surya's Steeds)
 *
 * Depicts the colossal 24-spoke solar chronometer, the soaring Jagamohana stone tiers,
 * the leaping celestial stallion of dawn, and the legend of Dharmapada.
 * Features scroll-driven rotation of the 24-spoke Konark Chakra wheel in real-time.
 */
export default function KonarkPattachitra({
  activeHotspot,
  onSelectHotspot,
  className = "",
  isCompact = false,
  scrollProgress = 0.5,
}: KonarkPattachitraProps) {
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);

  const currentHighlight = activeHotspot || hoveredHotspot;

  const handleHotspotClick = (id: string) => {
    if (onSelectHotspot) {
      onSelectHotspot(id);
    }
  };

  const inkMain = "#1c1a17";
  const inkMuted = "#6e675d";
  const inkLight = "#b8b0a2";
  const goldAccent = "#b58d5b";

  const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
  // Wheel rotates in real-time as user scrolls through the chapter
  const wheelRotation = clampedProgress * 120;
  const horseOffsetX = (clampedProgress - 0.5) * 45;
  const horseOffsetY = (clampedProgress - 0.5) * -22;

  return (
    <div className={`relative w-full flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 800 680"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-h-[580px] transition-all duration-300 drop-shadow-xs"
      >
        <defs>
          <radialGradient id="konarkAtmosphere" cx="42%" cy="32%" r="55%">
            <stop offset="0%" stopColor="#b58d5b" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#b58d5b" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#fdfcf9" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. Atmospheric Archival Glow */}
        <ellipse cx="360" cy="270" rx="350" ry="240" fill="url(#konarkAtmosphere)" />

        {/* 2. Astronomical Astrolabe & Sundial Coordinate Guidelines */}
        <g stroke={inkLight} strokeWidth="0.5" strokeDasharray="3 7" opacity="0.45">
          <line x1="40" y1="260" x2="760" y2="260" />
          <line x1="320" y1="30" x2="320" y2="650" />
          <circle cx="320" cy="260" r="190" />
          <circle cx="320" cy="260" r="235" />
          {Array.from({ length: 24 }).map((_, i) => {
            const a = (i * 15 * Math.PI) / 180;
            return (
              <line
                key={i}
                x1={320 + Math.cos(a) * 230}
                y1={260 + Math.sin(a) * 230}
                x2={320 + Math.cos(a) * 242}
                y2={260 + Math.sin(a) * 242}
                stroke={inkLight}
              />
            );
          })}
        </g>

        {/* 3. BACKGROUND ARCHITECTURAL SILHOUETTE (Konark Sun Temple Jagamohana Pyramid) */}
        <g id="konark-temple-silhouette" opacity="0.45" transform="translate(180, 0)">
          {[
            { y1: 240, y2: 215, w1: 180, w2: 150 },
            { y1: 215, y2: 190, w1: 150, w2: 120 },
            { y1: 190, y2: 165, w1: 120, w2: 90 },
          ].map((tier, idx) => (
            <path
              key={idx}
              d={`M ${400 - tier.w1 / 2} ${tier.y1} L ${400 - tier.w2 / 2} ${tier.y2} L ${
                400 + tier.w2 / 2
              } ${tier.y2} L ${400 + tier.w1 / 2} ${tier.y1} Z`}
              stroke={inkMuted}
              strokeWidth="0.8"
              fill="none"
              strokeDasharray="3 3"
            />
          ))}
          <ellipse cx="400" cy="160" rx="35" ry="9" stroke={inkMuted} strokeWidth="0.8" fill="none" />
          <line x1="400" y1="150" x2="400" y2="135" stroke={inkMain} strokeWidth="1" />
        </g>

        {/* 4. SOLAR FLARES & RADIAL RAYS */}
        <g
          id="solar-flares"
          className="cursor-pointer group"
          onClick={() => handleHotspotClick("rays")}
          onMouseEnter={() => setHoveredHotspot("rays")}
          onMouseLeave={() => setHoveredHotspot(null)}
        >
          {currentHighlight === "rays" && (
            <circle cx="320" cy="260" r="215" stroke={goldAccent} strokeWidth="1" strokeDasharray="3 3" />
          )}

          {Array.from({ length: 24 }).map((_, i) => {
            const a = (i * 15 * Math.PI) / 180;
            const rBase = 180;
            const rTip = i % 2 === 0 ? 210 : 196;
            const x1 = 320 + Math.cos(a - 0.05) * rBase;
            const y1 = 260 + Math.sin(a - 0.05) * rBase;
            const x2 = 320 + Math.cos(a) * rTip;
            const y2 = 260 + Math.sin(a) * rTip;
            const x3 = 320 + Math.cos(a + 0.05) * rBase;
            const y3 = 260 + Math.sin(a + 0.05) * rBase;

            return (
              <path
                key={i}
                d={`M ${x1} ${y1} L ${x2} ${y2} L ${x3} ${y3}`}
                stroke={currentHighlight === "rays" ? goldAccent : inkMuted}
                strokeWidth={currentHighlight === "rays" ? "1.2" : "0.75"}
                fill="none"
              />
            );
          })}
        </g>

        {/* 5. THE 24-SPOKE KONARK CHAKRA - Scroll-Driven Cosmic Wheel Rotation */}
        <g
          id="konark-wheel-sketch"
          className="cursor-pointer group"
          onClick={() => handleHotspotClick("wheel")}
          onMouseEnter={() => setHoveredHotspot("wheel")}
          onMouseLeave={() => setHoveredHotspot(null)}
          transform={`rotate(${wheelRotation}, 320, 260)`}
        >
          {/* Outer Rims */}
          <circle
            cx="320"
            cy="260"
            r="178"
            stroke={currentHighlight === "wheel" ? goldAccent : inkMain}
            strokeWidth={currentHighlight === "wheel" ? "2" : "1.4"}
            fill="none"
          />
          <circle cx="320" cy="260" r="164" stroke={inkMuted} strokeWidth="0.8" fill="none" />
          <circle cx="320" cy="260" r="148" stroke={inkMain} strokeWidth="1.2" fill="none" />

          {/* 48 Beaded Pearl Minute Markers */}
          {Array.from({ length: 48 }).map((_, i) => {
            const a = (i * 7.5 * Math.PI) / 180;
            const bx = 320 + Math.cos(a) * 171;
            const by = 260 + Math.sin(a) * 171;
            return (
              <circle
                key={i}
                cx={bx}
                cy={by}
                r="1.8"
                stroke={currentHighlight === "wheel" ? goldAccent : inkMuted}
                strokeWidth="0.6"
                fill="none"
              />
            );
          })}

          {/* 24 Outer Calibration Teeth */}
          {Array.from({ length: 24 }).map((_, i) => {
            const a = (i * 15 * Math.PI) / 180;
            const sx = 320 + Math.cos(a) * 156;
            const sy = 260 + Math.sin(a) * 156;
            return (
              <circle
                key={i}
                cx={sx}
                cy={sy}
                r="3"
                stroke={currentHighlight === "wheel" ? goldAccent : inkMain}
                strokeWidth="0.8"
                fill="none"
              />
            );
          })}

          {/* 8 Minor Spokes (Upa Ara) */}
          {Array.from({ length: 8 }).map((_, i) => {
            const a = ((i * 45 + 22.5) * Math.PI) / 180;
            const x1 = 320 + Math.cos(a) * 44;
            const y1 = 260 + Math.sin(a) * 44;
            const x2 = 320 + Math.cos(a) * 148;
            const y2 = 260 + Math.sin(a) * 148;
            return (
              <g key={i}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={currentHighlight === "wheel" ? goldAccent : inkMuted}
                  strokeWidth="1.2"
                />
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={inkLight}
                  strokeWidth="0.5"
                  strokeDasharray="2 3"
                />
              </g>
            );
          })}

          {/* 8 Major Spokes (Pradhana Ara) with Relief Medallions */}
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i * 45 * Math.PI) / 180;
            const cosA = Math.cos(a);
            const sinA = Math.sin(a);
            const xHub = 320 + cosA * 44;
            const yHub = 260 + sinA * 44;
            const xRim = 320 + cosA * 148;
            const yRim = 260 + sinA * 148;

            const spokeWidth = 5.5;
            const px = -sinA * spokeWidth;
            const py = cosA * spokeWidth;

            const medDist = 96;
            const medX = 320 + cosA * medDist;
            const medY = 260 + sinA * medDist;

            return (
              <g key={i}>
                <path
                  d={`M ${xHub + px} ${yHub + py} L ${xRim + px * 0.7} ${yRim + py * 0.7} L ${
                    xRim - px * 0.7
                  } ${yRim - py * 0.7} L ${xHub - px} ${yHub - py} Z`}
                  stroke={currentHighlight === "wheel" ? goldAccent : inkMain}
                  strokeWidth="1.1"
                  fill="none"
                />

                <circle
                  cx={medX}
                  cy={medY}
                  r="13.5"
                  stroke={currentHighlight === "wheel" ? goldAccent : inkMain}
                  strokeWidth="1"
                  fill="#ffffff"
                />
                <circle
                  cx={medX}
                  cy={medY}
                  r="9"
                  stroke={inkMuted}
                  strokeWidth="0.6"
                  strokeDasharray="2 2"
                  fill="none"
                />
                <circle
                  cx={medX}
                  cy={medY}
                  r="3.5"
                  stroke={currentHighlight === "wheel" ? goldAccent : inkMain}
                  strokeWidth="0.8"
                  fill="none"
                />
              </g>
            );
          })}

          {/* 6. CENTRAL AXLE HUB */}
          <g
            id="axle-hub"
            className="cursor-pointer group"
            onClick={(e) => {
              e.stopPropagation();
              handleHotspotClick("hub");
            }}
            onMouseEnter={() => setHoveredHotspot("hub")}
            onMouseLeave={() => setHoveredHotspot(null)}
          >
            {currentHighlight === "hub" && (
              <circle cx="320" cy="260" r="52" stroke={goldAccent} strokeWidth="1" strokeDasharray="3 3" />
            )}

            <circle
              cx="320"
              cy="260"
              r="44"
              stroke={currentHighlight === "hub" ? goldAccent : inkMain}
              strokeWidth="1.4"
              fill="#ffffff"
            />
            <circle cx="320" cy="260" r="34" stroke={inkMuted} strokeWidth="0.8" fill="none" strokeDasharray="2 3" />
            <circle cx="320" cy="260" r="22" stroke={inkMain} strokeWidth="1" fill="none" />
            <circle cx="320" cy="260" r="12" stroke={currentHighlight === "hub" ? goldAccent : inkMuted} strokeWidth="0.8" fill="none" />
            <circle cx="320" cy="260" r="4" fill={currentHighlight === "hub" ? goldAccent : inkMain} />

            <line x1="320" y1="252" x2="320" y2="268" stroke={inkMain} strokeWidth="1.2" />
            <line x1="312" y1="260" x2="328" y2="260" stroke={inkMain} strokeWidth="1.2" />

            {Array.from({ length: 8 }).map((_, i) => {
              const a = (i * 45 * Math.PI) / 180;
              const px = 320 + Math.cos(a) * 28;
              const py = 260 + Math.sin(a) * 28;
              return <circle key={i} cx={px} cy={py} r="2" stroke={inkMuted} strokeWidth="0.6" fill="none" />;
            })}
          </g>
        </g>

        {/* 7. CELESTIAL STALLION OF SURYA - Dynamic Scroll Gallop */}
        <g
          id="celestial-stallion-mural"
          className="cursor-pointer group"
          onClick={() => handleHotspotClick("horse")}
          onMouseEnter={() => setHoveredHotspot("horse")}
          onMouseLeave={() => setHoveredHotspot(null)}
          transform={`translate(${480 + horseOffsetX}, ${480 + horseOffsetY})`}
        >
          {currentHighlight === "horse" && (
            <ellipse cx="40" cy="15" rx="160" ry="85" stroke={goldAccent} strokeWidth="1" strokeDasharray="4 4" />
          )}

          <path
            d="M -110 95 
               Q -70 70 -30 84 
               Q 10 60 50 78 
               Q 90 55 140 75 
               Q 180 60 210 95"
            stroke={inkLight}
            strokeWidth="0.85"
            strokeDasharray="3 3"
            fill="none"
          />

          <path
            d="M -15 15 
               C 5 5, 55 0, 90 10 
               C 115 18, 135 40, 125 70 
               C 80 80, 10 70, -25 55 
               Z"
            stroke={currentHighlight === "horse" ? goldAccent : inkMain}
            strokeWidth={currentHighlight === "horse" ? "1.7" : "1.2"}
            fill="none"
          />

          {[10, 20, 30, 40, 50, 60].map((x, idx) => (
            <line
              key={idx}
              x1={x}
              y1={28}
              x2={x + 10}
              y2={48}
              stroke={inkLight}
              strokeWidth="0.5"
            />
          ))}

          <path
            d="M 80 12 
               C 100 -20, 125 -55, 145 -70 
               C 160 -80, 180 -70, 185 -55 
               C 190 -40, 170 -20, 150 5 
               C 135 25, 115 32, 100 24 
               Z"
            stroke={currentHighlight === "horse" ? goldAccent : inkMain}
            strokeWidth={currentHighlight === "horse" ? "1.7" : "1.2"}
            fill="none"
          />

          <path d="M 178 -62 C 186 -60, 190 -50, 180 -45" stroke={inkMain} strokeWidth="1" fill="none" />
          <circle cx="162" cy="-56" r="3.5" stroke={inkMain} strokeWidth="0.8" fill="none" />
          <circle cx="163" cy="-56" r="1.5" fill={currentHighlight === "horse" ? goldAccent : inkMain} />
          <path d="M 146 -72 L 152 -88 L 158 -70" stroke={inkMain} strokeWidth="1" fill="none" />

          <path d="M 150 -52 Q 165 -48 180 -48" stroke={currentHighlight === "horse" ? goldAccent : inkMuted} strokeWidth="0.8" fill="none" />
          <path d="M 162 -54 L 145 -30 L 105 5" stroke={currentHighlight === "horse" ? goldAccent : inkMuted} strokeWidth="0.8" fill="none" />

          {[
            { x: 122, y: -44 },
            { x: 112, y: -26 },
            { x: 104, y: -10 },
            { x: 95, y: 5 },
          ].map((m, idx) => (
            <path
              key={idx}
              d={`M ${m.x} ${m.y} C ${m.x - 22} ${m.y - 8}, ${m.x - 32} ${m.y + 8}, ${m.x - 18} ${m.y + 12}`}
              stroke={currentHighlight === "horse" ? goldAccent : inkMuted}
              strokeWidth="1"
              fill="none"
            />
          ))}

          <path
            d="M 110 30 L 145 55 L 170 42 L 178 48 L 155 70 L 100 42"
            stroke={currentHighlight === "horse" ? goldAccent : inkMain}
            strokeWidth="1.2"
            fill="none"
          />
          <path d="M 170 42 L 178 48 L 173 54 L 165 48 Z" stroke={inkMain} strokeWidth="0.8" fill="none" />

          <path
            d="M -20 50 L -55 75 L -80 87 L -88 83 L -60 65 L -15 32"
            stroke={currentHighlight === "horse" ? goldAccent : inkMain}
            strokeWidth="1.2"
            fill="none"
          />
          <path d="M -80 87 L -88 83 L -90 90 L -82 93 Z" stroke={inkMain} strokeWidth="0.8" fill="none" />

          <path
            d="M 25 18 C 45 14, 65 18, 75 26 L 70 50 C 50 45, 30 48, 20 46 Z"
            stroke={currentHighlight === "horse" ? goldAccent : inkMain}
            strokeWidth="1"
            fill="none"
          />
          {[26, 38, 50, 62].map((tx, idx) => (
            <circle key={idx} cx={tx} cy={50} r="2" stroke={inkMuted} strokeWidth="0.6" fill="none" />
          ))}

          <path
            d="M -25 55 C -55 50, -85 35, -95 20 C -80 32, -55 40, -40 62"
            stroke={currentHighlight === "horse" ? goldAccent : inkMain}
            strokeWidth="1.1"
            fill="none"
          />
        </g>

        {/* 8. Minimalist Folio Hotspot Callout Markers */}
        {!isCompact && (
          <g id="hotspot-indicators">
            <g
              transform="translate(460, 190)"
              className="cursor-pointer"
              onClick={() => handleHotspotClick("wheel")}
            >
              <circle
                cx="0"
                cy="0"
                r="11"
                stroke={currentHighlight === "wheel" ? goldAccent : inkMain}
                strokeWidth="1"
                fill="#ffffff"
              />
              <text
                x="0"
                y="3.5"
                textAnchor="middle"
                fill={currentHighlight === "wheel" ? goldAccent : inkMain}
                fontSize="8.5"
                fontFamily="monospace"
                fontWeight="bold"
              >
                01
              </text>
              <line x1="-11" y1="0" x2="-24" y2="0" stroke={inkLight} strokeWidth="0.75" />
            </g>

            <g
              transform="translate(320, 260)"
              className="cursor-pointer"
              onClick={() => handleHotspotClick("hub")}
            >
              <circle
                cx="0"
                cy="0"
                r="11"
                stroke={currentHighlight === "hub" ? goldAccent : inkMain}
                strokeWidth="1"
                fill="#ffffff"
              />
              <text
                x="0"
                y="3.5"
                textAnchor="middle"
                fill={currentHighlight === "hub" ? goldAccent : inkMain}
                fontSize="8.5"
                fontFamily="monospace"
                fontWeight="bold"
              >
                02
              </text>
            </g>

            <g
              transform={`translate(${600 + horseOffsetX * 0.5}, ${510 + horseOffsetY * 0.5})`}
              className="cursor-pointer"
              onClick={() => handleHotspotClick("horse")}
            >
              <circle
                cx="0"
                cy="0"
                r="11"
                stroke={currentHighlight === "horse" ? goldAccent : inkMain}
                strokeWidth="1"
                fill="#ffffff"
              />
              <text
                x="0"
                y="3.5"
                textAnchor="middle"
                fill={currentHighlight === "horse" ? goldAccent : inkMain}
                fontSize="8.5"
                fontFamily="monospace"
                fontWeight="bold"
              >
                03
              </text>
              <line x1="-11" y1="0" x2="-24" y2="0" stroke={inkLight} strokeWidth="0.75" />
            </g>
          </g>
        )}
      </svg>
    </div>
  );
}
