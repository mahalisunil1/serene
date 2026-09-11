"use client";

import React, { useState } from "react";

interface SeaPattachitraProps {
  activeHotspot?: string | null;
  onSelectHotspot?: (hotspotId: string) => void;
  className?: string;
  isCompact?: boolean;
  scrollProgress?: number;
}

/**
 * Monumental Archival Marine Copperplate Lithograph:
 * Act I — The Primordial Waters (Mahodadhi & The Sacred Driftwood)
 *
 * Depicts the sacred Bay of Bengal at sunrise: the celestial Daru Brahma timber
 * floating upon the tide, stylized Odishan swirling foam scrolls, twin leaping Matsya,
 * the Panchajanya conch of awakening, and traditional coastal catamarans.
 * Features scroll-driven animation of the rising dawn sun, drifting catamarans, and swimming Matsya.
 */
export default function SeaPattachitra({
  activeHotspot,
  onSelectHotspot,
  className = "",
  isCompact = false,
  scrollProgress = 0.5,
}: SeaPattachitraProps) {
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

  // Normalized scroll animation offsets
  const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
  const sunY = (1 - clampedProgress) * 38;
  const driftX = (clampedProgress - 0.5) * 35;
  const matsya1X = 240 + (clampedProgress - 0.5) * 32;
  const matsya1Y = 520 - (clampedProgress - 0.5) * 18;
  const matsya2X = 560 - (clampedProgress - 0.5) * 32;
  const matsya2Y = 550 - (clampedProgress - 0.5) * 18;

  return (
    <div className={`relative w-full flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 800 680"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-h-[580px] transition-all duration-300 drop-shadow-xs"
      >
        <defs>
          <radialGradient id="seaAtmosphere" cx="50%" cy="26%" r="55%">
            <stop offset="0%" stopColor="#b58d5b" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#b58d5b" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#fdfcf9" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. Atmospheric Archival Glow */}
        <ellipse cx="400" cy="250" rx="380" ry="230" fill="url(#seaAtmosphere)" />

        {/* 2. Maritime Grid & Longitude Lines */}
        <g stroke={inkLight} strokeWidth="0.5" strokeDasharray="3 7" opacity="0.45">
          <line x1="40" y1="230" x2="760" y2="230" />
          <line x1="400" y1="30" x2="400" y2="650" />
          <circle cx="400" cy="230" r="160" />
          <circle cx="400" cy="230" r="230" />
        </g>

        {/* 3. DISTANT COASTAL CATAMARANS (Traditional Odishan Sal-Wood Boats Drifting in Dawn Mist) */}
        <g id="distant-catamarans" opacity="0.75">
          {/* Boat 1 (Left) */}
          <g transform={`translate(${180 + driftX * 0.7}, 205) scale(0.65)`}>
            <path d="M -35 20 L 35 20 L 25 32 L -25 32 Z" stroke={inkMain} strokeWidth="1.2" fill="none" />
            <line x1="0" y1="20" x2="0" y2="-20" stroke={inkMain} strokeWidth="1.2" />
            <path d="M 0 -18 L 22 16 L 0 16 Z" stroke={inkMuted} strokeWidth="0.8" fill="none" />
          </g>
          {/* Boat 2 (Right) */}
          <g transform={`translate(${620 - driftX * 0.5}, 212) scale(0.5)`}>
            <path d="M -35 20 L 35 20 L 25 32 L -25 32 Z" stroke={inkMain} strokeWidth="1.2" fill="none" />
            <line x1="0" y1="20" x2="0" y2="-20" stroke={inkMain} strokeWidth="1.2" />
            <path d="M 0 -18 L 22 16 L 0 16 Z" stroke={inkMuted} strokeWidth="0.8" fill="none" />
          </g>
        </g>

        {/* 4. GOLDEN DAWN HORIZON - Scroll Animated Sun Ascent */}
        <g
          id="golden-dawn-horizon"
          className="cursor-pointer group"
          onClick={() => handleHotspotClick("dawn")}
          onMouseEnter={() => setHoveredHotspot("dawn")}
          onMouseLeave={() => setHoveredHotspot(null)}
          transform={`translate(0, ${sunY})`}
        >
          {/* Active Highlight Ring */}
          {currentHighlight === "dawn" && (
            <circle cx="400" cy="230" r="110" stroke={goldAccent} strokeWidth="1" strokeDasharray="3 3" />
          )}

          {/* Semicircular Solar Disc */}
          <path
            d="M 305 230 A 95 95 0 0 1 495 230 Z"
            stroke={currentHighlight === "dawn" ? goldAccent : inkMain}
            strokeWidth={currentHighlight === "dawn" ? "1.8" : "1.3"}
            fill="none"
          />
          <path
            d="M 335 230 A 65 65 0 0 1 465 230 Z"
            stroke={inkMuted}
            strokeWidth="0.8"
            fill="none"
            strokeDasharray="2 3"
          />
          <path
            d="M 365 230 A 35 35 0 0 1 435 230 Z"
            stroke={currentHighlight === "dawn" ? goldAccent : inkMain}
            strokeWidth="1.1"
            fill="none"
          />

          {/* Radiating Solar Vectors */}
          {Array.from({ length: 21 }).map((_, i) => {
            const angle = 180 + (i * 180) / 20;
            const rad = (angle * Math.PI) / 180;
            const r1 = 104;
            const r2 = i % 2 === 0 ? 150 : 128;
            const x1 = 400 + Math.cos(rad) * r1;
            const y1 = 230 + Math.sin(rad) * r1;
            const x2 = 400 + Math.cos(rad) * r2;
            const y2 = 230 + Math.sin(rad) * r2;
            return (
              <g key={i}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={currentHighlight === "dawn" ? goldAccent : inkMuted}
                  strokeWidth="0.85"
                />
                <circle
                  cx={x2}
                  cy={y2}
                  r="1.5"
                  fill={currentHighlight === "dawn" ? goldAccent : inkMuted}
                />
              </g>
            );
          })}
        </g>

        {/* Clean Horizon Baseline (Fixed) */}
        <line x1="60" y1="230" x2="740" y2="230" stroke={inkMain} strokeWidth="1.3" />
        <line x1="100" y1="235" x2="700" y2="235" stroke={inkLight} strokeWidth="0.6" />

        {/* 5. MAHODADHI RHYTHMIC SURF & TIDAL WAVES */}
        <g
          id="ocean-waves"
          className="cursor-pointer group"
          onClick={() => handleHotspotClick("waves")}
          onMouseEnter={() => setHoveredHotspot("waves")}
          onMouseLeave={() => setHoveredHotspot(null)}
        >
          {/* Distant Wave Layers */}
          {[265, 290, 318].map((y, idx) => (
            <path
              key={idx}
              d={`M 70 ${y} Q 210 ${y - 12} 350 ${y} Q 490 ${y + 12} 730 ${y}`}
              stroke={currentHighlight === "waves" ? goldAccent : inkMuted}
              strokeWidth="0.75"
              fill="none"
              strokeDasharray={idx === 1 ? "4 4" : "none"}
            />
          ))}

          {/* Monumental Swirling Wave Crests */}
          <path
            d="M 60 350 
               C 130 320, 200 375, 270 340 
               C 340 305, 420 365, 490 330 
               C 560 295, 640 355, 740 330"
            stroke={currentHighlight === "waves" ? goldAccent : inkMain}
            strokeWidth={currentHighlight === "waves" ? "1.8" : "1.3"}
            fill="none"
          />

          {/* Delicate Odia Spiral Foam Curlicues */}
          {[
            { cx: 160, cy: 345, r: 18, rot: 25 },
            { cx: 290, cy: 338, r: 22, rot: -30 },
            { cx: 460, cy: 342, r: 20, rot: 18 },
            { cx: 620, cy: 335, r: 22, rot: -25 },
            { cx: 220, cy: 450, r: 24, rot: 40 },
            { cx: 580, cy: 450, r: 26, rot: -30 },
          ].map((c, idx) => (
            <g key={idx} transform={`translate(${c.cx}, ${c.cy}) rotate(${c.rot})`}>
              <path
                d="M 0 0 C 14 -10, 22 8, 9 18 C -5 22, -18 8, -9 -5 C -2 -14, 12 -12, 9 0"
                stroke={currentHighlight === "waves" ? goldAccent : inkMuted}
                strokeWidth="0.9"
                fill="none"
              />
              <circle cx="0" cy="0" r="1.5" fill={currentHighlight === "waves" ? goldAccent : inkLight} />
            </g>
          ))}

          {/* Foreground Swell & Tidal Rhythms */}
          {[475, 510, 550, 590, 630].map((y, idx) => (
            <g key={idx}>
              <path
                d={`M 70 ${y} Q 220 ${y - 15} 400 ${y} Q 580 ${y + 15} 730 ${y}`}
                stroke={currentHighlight === "waves" ? goldAccent : inkMain}
                strokeWidth={idx % 2 === 0 ? "1" : "0.6"}
                fill="none"
              />
              {/* Fine horizontal hatching */}
              {Array.from({ length: 18 }).map((_, hIdx) => {
                const xHatch = 100 + hIdx * 34;
                return (
                  <line
                    key={hIdx}
                    x1={xHatch}
                    y1={y + 4}
                    x2={xHatch + 8}
                    y2={y + 11}
                    stroke={inkLight}
                    strokeWidth="0.5"
                    opacity="0.4"
                  />
                );
              })}
            </g>
          ))}

          {/* Fine Stippled Ocean Spray */}
          {Array.from({ length: 35 }).map((_, i) => (
            <circle
              key={i}
              cx={90 + (i * 37) % 620}
              cy={350 + ((i * 23) % 170)}
              r="1"
              fill={inkLight}
              opacity="0.6"
            />
          ))}
        </g>

        {/* 6. THE SACRED DARU BRAHMA LOG - Drifting along the Tide */}
        <g id="daru-brahma-timber" transform={`translate(${400 + driftX}, 390)`}>
          <path
            d="M -70 0 C -40 -12, 40 -12, 70 0 L 65 14 C 35 6, -35 6, -65 14 Z"
            stroke={goldAccent}
            strokeWidth="1.2"
            fill="none"
          />
          <line x1="-50" y1="2" x2="50" y2="2" stroke={inkMuted} strokeWidth="0.6" strokeDasharray="4 3" />
          <line x1="-40" y1="6" x2="40" y2="6" stroke={inkMuted} strokeWidth="0.6" />
        </g>

        {/* 7. PANCHAJANYA SHANKHA (The Sacred Awakening Conch) */}
        <g
          id="panchajanya-conch"
          className="cursor-pointer group"
          onClick={() => handleHotspotClick("shankha")}
          onMouseEnter={() => setHoveredHotspot("shankha")}
          onMouseLeave={() => setHoveredHotspot(null)}
          transform="translate(400, 395)"
        >
          {currentHighlight === "shankha" && (
            <circle cx="0" cy="0" r="58" stroke={goldAccent} strokeWidth="1" strokeDasharray="3 3" />
          )}

          <ellipse cx="0" cy="32" rx="44" ry="9" stroke={inkMuted} strokeWidth="0.8" fill="none" strokeDasharray="2 3" />
          <path d="M -35 32 Q 0 40 35 32" stroke={inkMain} strokeWidth="1" fill="none" />

          <path
            d="M -26 20 
               C -50 4, -46 -30, -16 -40 
               C 14 -48, 50 -20, 40 14 
               C 36 26, 10 34, -8 28 
               Z"
            stroke={currentHighlight === "shankha" ? goldAccent : inkMain}
            strokeWidth={currentHighlight === "shankha" ? "1.8" : "1.3"}
            fill="none"
          />

          <path
            d="M -16 -40 
               C -2 -44, 14 -34, 18 -20 
               C 22 -6, 16 12, 0 18 
               C -14 20, -24 6, -18 -6 
               C -12 -16, 0 -14, 4 -6"
            stroke={currentHighlight === "shankha" ? goldAccent : inkMain}
            strokeWidth="1.1"
            fill="none"
          />

          <path d="M 34 16 C 52 28, 58 36, 54 40 C 44 40, 36 32 26 22 Z" stroke={inkMain} strokeWidth="1" fill="none" />

          {/* Radiating Acoustic Resonance Arcs */}
          {[-1, 1].map((dir, i) => (
            <g key={i}>
              <path
                d={`M ${dir * 42} -10 A 30 30 0 0 ${dir > 0 ? 1 : 0} ${dir * 52} 22`}
                stroke={currentHighlight === "shankha" ? goldAccent : inkMuted}
                strokeWidth="0.8"
                strokeDasharray="3 3"
                fill="none"
              />
              <path
                d={`M ${dir * 56} -18 A 44 44 0 0 ${dir > 0 ? 1 : 0} ${dir * 68} 30`}
                stroke={inkLight}
                strokeWidth="0.6"
                strokeDasharray="2 4"
                fill="none"
              />
            </g>
          ))}
        </g>

        {/* 8. TWIN SACRED MATSYA - Swimming in Tidal Cadence */}
        <g
          id="twin-matsya-mural"
          className="cursor-pointer group"
          onClick={() => handleHotspotClick("matsya")}
          onMouseEnter={() => setHoveredHotspot("matsya")}
          onMouseLeave={() => setHoveredHotspot(null)}
        >
          {/* Fish 1 (Left) */}
          <g transform={`translate(${matsya1X}, ${matsya1Y}) rotate(-22)`}>
            {currentHighlight === "matsya" && (
              <ellipse cx="0" cy="0" rx="70" ry="34" stroke={goldAccent} strokeWidth="1" strokeDasharray="3 3" />
            )}

            <path
              d="M -54 0 C -32 -26, 22 -28, 58 0 C 22 28, -32 26, -54 0 Z"
              stroke={currentHighlight === "matsya" ? goldAccent : inkMain}
              strokeWidth={currentHighlight === "matsya" ? "1.7" : "1.2"}
              fill="none"
            />

            {[-24, -9, 6, 22].map((x, idx) => (
              <g key={idx}>
                <path
                  d={`M ${x} -13 Q ${x + 8} 0 ${x} 13`}
                  stroke={currentHighlight === "matsya" ? goldAccent : inkMuted}
                  strokeWidth="0.8"
                  fill="none"
                />
              </g>
            ))}

            <circle cx="42" cy="-4" r="5" stroke={inkMain} strokeWidth="1" fill="none" />
            <circle cx="43" cy="-4" r="1.8" fill={currentHighlight === "matsya" ? goldAccent : inkMain} />

            <path d="M 6 -26 C 16 -40, -8 -38, -24 -22 Z" stroke={inkMain} strokeWidth="0.85" fill="none" />
            <path
              d="M -54 0 C -76 -32, -96 -18, -80 -4 C -68 0, -68 0, -80 4 C -96 18, -76 32, -54 0 Z"
              stroke={currentHighlight === "matsya" ? goldAccent : inkMain}
              strokeWidth="1.1"
              fill="none"
            />
          </g>

          {/* Fish 2 (Right) */}
          <g transform={`translate(${matsya2X}, ${matsya2Y}) scale(-1, 1) rotate(18)`}>
            <path
              d="M -54 0 C -32 -26, 22 -28, 58 0 C 22 28, -32 26, -54 0 Z"
              stroke={currentHighlight === "matsya" ? goldAccent : inkMain}
              strokeWidth={currentHighlight === "matsya" ? "1.7" : "1.2"}
              fill="none"
            />

            {[-24, -9, 6, 22].map((x, idx) => (
              <path
                key={idx}
                d={`M ${x} -13 Q ${x + 8} 0 ${x} 13`}
                stroke={currentHighlight === "matsya" ? goldAccent : inkMuted}
                strokeWidth="0.8"
                fill="none"
              />
            ))}

            <circle cx="42" cy="-4" r="5" stroke={inkMain} strokeWidth="1" fill="none" />
            <circle cx="43" cy="-4" r="1.8" fill={currentHighlight === "matsya" ? goldAccent : inkMain} />

            <path
              d="M -54 0 C -76 -32, -96 -18, -80 -4 C -68 0, -68 0, -80 4 C -96 18, -76 32, -54 0 Z"
              stroke={currentHighlight === "matsya" ? goldAccent : inkMain}
              strokeWidth="1.1"
              fill="none"
            />
          </g>
        </g>

        {/* 9. Minimalist Folio Hotspot Callout Markers */}
        {!isCompact && (
          <g id="hotspot-indicators">
            <g
              transform="translate(400, 135)"
              className="cursor-pointer"
              onClick={() => handleHotspotClick("dawn")}
            >
              <circle
                cx="0"
                cy="0"
                r="11"
                stroke={currentHighlight === "dawn" ? goldAccent : inkMain}
                strokeWidth="1"
                fill="#ffffff"
              />
              <text
                x="0"
                y="3.5"
                textAnchor="middle"
                fill={currentHighlight === "dawn" ? goldAccent : inkMain}
                fontSize="8.5"
                fontFamily="monospace"
                fontWeight="bold"
              >
                01
              </text>
              <line x1="0" y1="11" x2="0" y2="24" stroke={inkLight} strokeWidth="0.75" />
            </g>

            <g
              transform="translate(485, 395)"
              className="cursor-pointer"
              onClick={() => handleHotspotClick("shankha")}
            >
              <circle
                cx="0"
                cy="0"
                r="11"
                stroke={currentHighlight === "shankha" ? goldAccent : inkMain}
                strokeWidth="1"
                fill="#ffffff"
              />
              <text
                x="0"
                y="3.5"
                textAnchor="middle"
                fill={currentHighlight === "shankha" ? goldAccent : inkMain}
                fontSize="8.5"
                fontFamily="monospace"
                fontWeight="bold"
              >
                02
              </text>
              <line x1="-11" y1="0" x2="-24" y2="0" stroke={inkLight} strokeWidth="0.75" />
            </g>

            <g
              transform="translate(325, 520)"
              className="cursor-pointer"
              onClick={() => handleHotspotClick("matsya")}
            >
              <circle
                cx="0"
                cy="0"
                r="11"
                stroke={currentHighlight === "matsya" ? goldAccent : inkMain}
                strokeWidth="1"
                fill="#ffffff"
              />
              <text
                x="0"
                y="3.5"
                textAnchor="middle"
                fill={currentHighlight === "matsya" ? goldAccent : inkMain}
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
