"use client";

import React, { useState } from "react";

interface TemplePattachitraProps {
  activeHotspot?: string | null;
  onSelectHotspot?: (hotspotId: string) => void;
  className?: string;
  isCompact?: boolean;
  scrollProgress?: number;
}

/**
 * Monumental Archival Architectural Copperplate Etching:
 * Act II — The Sanctum of the Wind & Wheel (Shree Jagannath Mandira)
 *
 * Depicts the soaring Rekha Deula spire, Neela Chakra discus, fluttering Patita Pavana flag,
 * Jagamohana pyramidal hall, Arun Stambha sun pillar, and the sacred Garbhagriha.
 * Features scroll-driven animation of spire ascent and waving flag.
 */
export default function TemplePattachitra({
  activeHotspot,
  onSelectHotspot,
  className = "",
  isCompact = false,
  scrollProgress = 0.5,
}: TemplePattachitraProps) {
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
  const spireOffsetY = (1 - clampedProgress) * 30;
  const flagWaveRot = (clampedProgress - 0.5) * 6;
  const flagWaveY = (clampedProgress - 0.5) * 8;

  return (
    <div className={`relative w-full flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 800 680"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-h-[580px] transition-all duration-300 drop-shadow-xs"
      >
        <defs>
          <radialGradient id="templeAtmosphere" cx="48%" cy="30%" r="55%">
            <stop offset="0%" stopColor="#b58d5b" stopOpacity="0.09" />
            <stop offset="50%" stopColor="#b58d5b" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#fdfcf9" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. Atmospheric Archival Glow */}
        <ellipse cx="380" cy="280" rx="360" ry="240" fill="url(#templeAtmosphere)" />

        {/* 2. Architectural Survey Grid & Zenith Lines */}
        <g stroke={inkLight} strokeWidth="0.5" strokeDasharray="3 7" opacity="0.45">
          <line x1="380" y1="20" x2="380" y2="650" />
          <line x1="40" y1="260" x2="760" y2="260" />
          <circle cx="380" cy="260" r="180" />
          <circle cx="380" cy="260" r="240" />
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * 30 * Math.PI) / 180;
            return (
              <line
                key={i}
                x1={380 + Math.cos(a) * 236}
                y1={260 + Math.sin(a) * 236}
                x2={380 + Math.cos(a) * 244}
                y2={260 + Math.sin(a) * 244}
                stroke={inkLight}
              />
            );
          })}
        </g>

        {/* 3. ARUNA STAMBHA (The Sun Pillar) */}
        <g id="aruna-stambha" opacity="0.85">
          <line x1="120" y1="360" x2="120" y2="590" stroke={inkMain} strokeWidth="2.2" />
          <line x1="124" y1="360" x2="124" y2="590" stroke={inkMuted} strokeWidth="0.8" />
          <rect x="108" y="590" width="28" height="24" stroke={inkMain} strokeWidth="1.2" fill="none" />
          <line x1="102" y1="614" x2="142" y2="614" stroke={inkMain} strokeWidth="1.4" />
          <ellipse cx="122" cy="355" rx="9" ry="4" stroke={inkMain} strokeWidth="1" fill="none" />
          <path d="M 116 350 C 116 342 128 342 128 350 Z" stroke={inkMain} strokeWidth="1" fill="none" />
          <circle cx="122" cy="338" r="3" stroke={goldAccent} strokeWidth="0.8" fill="none" />
        </g>

        {/* 4. TEMPLE FOUNDATION COURSES & STEPPED PLINTH */}
        <g id="temple-foundation">
          <line x1="80" y1="620" x2="720" y2="620" stroke={inkMain} strokeWidth="1.4" />
          <line x1="100" y1="626" x2="700" y2="626" stroke={inkMuted} strokeWidth="0.8" />
          <line x1="130" y1="580" x2="670" y2="580" stroke={inkMain} strokeWidth="1.2" />

          <path d="M 100 620 L 130 580 M 700 620 L 670 580" stroke={inkMain} strokeWidth="1.2" />

          {Array.from({ length: 45 }).map((_, i) => (
            <line
              key={i}
              x1={140 + i * 11.5}
              y1={580}
              x2={140 + i * 11.5}
              y2={620}
              stroke={inkLight}
              strokeWidth="0.5"
              opacity="0.55"
            />
          ))}

          <rect x="160" y="540" width="460" height="40" stroke={inkMain} strokeWidth="1" fill="none" />
          {Array.from({ length: 22 }).map((_, i) => (
            <path
              key={i}
              d={`M ${170 + i * 20} 565 L ${180 + i * 20} 550 L ${190 + i * 20} 565`}
              stroke={inkMuted}
              strokeWidth="0.75"
              fill="none"
            />
          ))}
        </g>

        {/* 5. JAGAMOHANA (Assembly Hall Pyramid) */}
        <g id="jagamohana-pyramid">
          {[
            { y1: 540, y2: 510, x1: 500, x2: 640 },
            { y1: 510, y2: 480, x1: 515, x2: 625 },
            { y1: 480, y2: 450, x1: 530, x2: 610 },
            { y1: 450, y2: 420, x1: 545, x2: 595 },
          ].map((t, idx) => (
            <g key={idx}>
              <path
                d={`M ${t.x1} ${t.y1} L ${t.x1 + 15} ${t.y2} L ${t.x2 - 15} ${t.y2} L ${t.x2} ${t.y1} Z`}
                stroke={inkMain}
                strokeWidth="1"
                fill="none"
              />
              <line
                x1={t.x1 + 15}
                y1={t.y2 + 8}
                x2={t.x2 - 15}
                y2={t.y2 + 8}
                stroke={inkMuted}
                strokeWidth="0.5"
                strokeDasharray="2 3"
              />
            </g>
          ))}
          <ellipse cx="570" cy="415" rx="14" ry="5" stroke={inkMain} strokeWidth="1" fill="none" />
          <line x1="570" y1="410" x2="570" y2="395" stroke={inkMain} strokeWidth="1.2" />
          <circle cx="570" cy="392" r="3" stroke={goldAccent} strokeWidth="0.8" fill="none" />
        </g>

        {/* 6. THE GRAND REKHA DEULA SPIRE - Animated Vertical Lift */}
        <g
          id="rekha-deula-spire"
          className="cursor-pointer group"
          onClick={() => handleHotspotClick("spire")}
          onMouseEnter={() => setHoveredHotspot("spire")}
          onMouseLeave={() => setHoveredHotspot(null)}
          transform={`translate(0, ${spireOffsetY})`}
        >
          {currentHighlight === "spire" && (
            <path
              d="M 230 540 C 240 390, 275 270, 310 145 L 450 145 C 485 270, 520 390, 530 540 Z"
              stroke={goldAccent}
              strokeWidth="2.5"
              strokeDasharray="4 4"
              fill="none"
              opacity="0.8"
            />
          )}

          <path
            d="M 235 540 
               C 245 400, 280 275, 314 148 
               L 446 148 
               C 480 275, 515 400, 525 540 
               Z"
            stroke={currentHighlight === "spire" ? goldAccent : inkMain}
            strokeWidth={currentHighlight === "spire" ? "1.8" : "1.4"}
            fill="none"
          />

          {[170, 195, 220, 245, 270, 295, 320, 345, 370, 395, 420, 445, 470, 495, 520, 540].map(
            (y, idx) => {
              const progress = (y - 148) / (540 - 148);
              const xSpan = 66 + progress * 79;
              const xL = 380 - xSpan;
              const xR = 380 + xSpan;

              return (
                <g key={idx}>
                  <line
                    x1={xL}
                    y1={y}
                    x2={xR}
                    y2={y}
                    stroke={currentHighlight === "spire" ? goldAccent : inkMain}
                    strokeWidth="0.8"
                  />
                  <line
                    x1={xL + 8}
                    y1={y - 4}
                    x2={xR - 8}
                    y2={y - 4}
                    stroke={inkMuted}
                    strokeWidth="0.5"
                    strokeDasharray="3 4"
                  />
                  {Array.from({ length: 7 }).map((_, bIdx) => {
                    const xTick = xL + 14 + bIdx * ((xR - xL - 28) / 6);
                    return (
                      <line
                        key={bIdx}
                        x1={xTick}
                        y1={y - 10}
                        x2={xTick}
                        y2={y}
                        stroke={inkLight}
                        strokeWidth="0.5"
                        opacity="0.7"
                      />
                    );
                  })}
                </g>
              );
            }
          )}

          <line x1="360" y1="148" x2="360" y2="540" stroke={inkMuted} strokeWidth="0.8" />
          <line x1="400" y1="148" x2="400" y2="540" stroke={inkMuted} strokeWidth="0.8" />
          <line
            x1="380"
            y1="148"
            x2="380"
            y2="540"
            stroke={currentHighlight === "spire" ? goldAccent : inkMain}
            strokeWidth="1.2"
          />

          {Array.from({ length: 30 }).map((_, i) => (
            <line
              key={i}
              x1={425 + (i % 5) * 14}
              y1={190 + i * 11}
              x2={433 + (i % 5) * 14}
              y2={196 + i * 11}
              stroke={inkLight}
              strokeWidth="0.6"
              opacity="0.45"
            />
          ))}
        </g>

        {/* 7. CROWNING MASTAKA */}
        <g id="mastaka-crown" transform={`translate(0, ${spireOffsetY})`}>
          <rect x="340" y="132" width="80" height="16" stroke={inkMain} strokeWidth="1" fill="none" />
          {[-25, -12, 0, 12, 25].map((dx, i) => (
            <line key={i} x1={380 + dx} y1={132} x2={380 + dx} y2={148} stroke={inkMuted} strokeWidth="0.6" />
          ))}

          <ellipse cx="380" cy="118" rx="62" ry="17" stroke={inkMain} strokeWidth="1.2" fill="none" />
          {[-50, -38, -25, -12, 0, 12, 25, 38, 50].map((dx, i) => (
            <line
              key={i}
              x1={380 + dx}
              y1={104}
              x2={380 + dx * 1.15}
              y2={132}
              stroke={inkMuted}
              strokeWidth="0.75"
            />
          ))}

          <ellipse cx="380" cy="102" rx="42" ry="9" stroke={inkMain} strokeWidth="1" fill="none" />

          <path
            d="M 364 100 C 364 82 368 74 380 68 C 392 74 396 82 396 100 Z"
            stroke={inkMain}
            strokeWidth="1.2"
            fill="none"
          />
          <line x1="380" y1="68" x2="380" y2="40" stroke={inkMain} strokeWidth="1.4" />
        </g>

        {/* 8. NEELA CHAKRA & PATITA PAVANA BANA - Dynamic Scroll Flutter */}
        <g
          id="neela-chakra-and-flag"
          className="cursor-pointer group"
          onClick={() => handleHotspotClick("flag")}
          onMouseEnter={() => setHoveredHotspot("flag")}
          onMouseLeave={() => setHoveredHotspot(null)}
          transform={`translate(0, ${spireOffsetY})`}
        >
          {currentHighlight === "flag" && (
            <circle cx="380" cy="42" r="50" stroke={goldAccent} strokeWidth="1" strokeDasharray="3 3" />
          )}

          {/* Neela Chakra */}
          <g transform="translate(380, 42)">
            <circle
              cx="0"
              cy="0"
              r="34"
              stroke={currentHighlight === "flag" ? goldAccent : inkMain}
              strokeWidth="1.6"
              fill="none"
            />
            <circle cx="0" cy="0" r="26" stroke={inkMuted} strokeWidth="0.75" fill="none" strokeDasharray="2 3" />
            <circle cx="0" cy="0" r="10" stroke={inkMain} strokeWidth="1" fill="none" />
            <circle cx="0" cy="0" r="3" fill={currentHighlight === "flag" ? goldAccent : inkMain} />

            {Array.from({ length: 8 }).map((_, i) => {
              const a = (i * 45 * Math.PI) / 180;
              return (
                <line
                  key={i}
                  x1={Math.cos(a) * 10}
                  y1={Math.sin(a) * 10}
                  x2={Math.cos(a) * 26}
                  y2={Math.sin(a) * 26}
                  stroke={currentHighlight === "flag" ? goldAccent : inkMain}
                  strokeWidth="1.1"
                />
              );
            })}

            {Array.from({ length: 16 }).map((_, i) => {
              const a = (i * 22.5 * Math.PI) / 180;
              return (
                <line
                  key={i}
                  x1={Math.cos(a) * 30}
                  y1={Math.sin(a) * 30}
                  x2={Math.cos(a) * 36}
                  y2={Math.sin(a) * 36}
                  stroke={currentHighlight === "flag" ? goldAccent : inkMuted}
                  strokeWidth="0.85"
                />
              );
            })}
          </g>

          {/* Fluttering Banner with Wave Sway */}
          <g transform={`translate(0, ${flagWaveY}) rotate(${flagWaveRot}, 380, 42)`}>
            <line x1="380" y1="68" x2="394" y2="25" stroke={inkMain} strokeWidth="1.4" />

            <path
              d="M 394 28 
                 Q 445 10, 520 26 
                 Q 565 38, 595 18 
                 L 540 56 
                 Q 470 46, 394 45 
                 Z"
              stroke={currentHighlight === "flag" ? goldAccent : inkMain}
              strokeWidth={currentHighlight === "flag" ? "2" : "1.3"}
              fill="none"
            />

            <path d="M 430 20 Q 475 32 545 34" stroke={inkMuted} strokeWidth="0.6" fill="none" strokeDasharray="3 3" />
            <path d="M 450 30 Q 495 40 565 38" stroke={inkLight} strokeWidth="0.6" fill="none" />

            <circle cx="455" cy="28" r="6" stroke={inkMuted} strokeWidth="0.8" fill="none" />
            <path d="M 463 32 Q 470 28 477 32" stroke={inkMuted} strokeWidth="0.8" fill="none" />
          </g>
        </g>

        {/* 9. THE GARBHAGRIHA SANCTUM PORTAL */}
        <g
          id="inner-sanctum-portal"
          className="cursor-pointer group"
          onClick={() => handleHotspotClick("sanctum")}
          onMouseEnter={() => setHoveredHotspot("sanctum")}
          onMouseLeave={() => setHoveredHotspot(null)}
        >
          {currentHighlight === "sanctum" && (
            <rect
              x="290"
              y="400"
              width="180"
              height="140"
              rx="6"
              stroke={goldAccent}
              strokeWidth="1"
              strokeDasharray="4 4"
              fill="none"
            />
          )}

          <path
            d="M 305 540 L 305 425 C 305 365, 455 365, 455 425 L 455 540"
            stroke={currentHighlight === "sanctum" ? goldAccent : inkMain}
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M 318 540 L 318 430 C 318 380, 442 380, 442 430 L 442 540"
            stroke={inkMuted}
            strokeWidth="0.8"
            fill="none"
          />

          {Array.from({ length: 14 }).map((_, i) => (
            <line
              key={i}
              x1={330 + i * 8}
              y1={425}
              x2={330 + i * 8}
              y2={535}
              stroke={inkLight}
              strokeWidth="0.5"
              opacity="0.4"
            />
          ))}

          <g transform="translate(380, 455)">
            <circle cx="0" cy="0" r="34" stroke={inkMuted} strokeWidth="0.75" fill="none" />
            <circle
              cx="0"
              cy="0"
              r="26"
              stroke={currentHighlight === "sanctum" ? goldAccent : inkMain}
              strokeWidth="1"
              fill="none"
              strokeDasharray="2 3"
            />

            <circle cx="-18" cy="0" r="9.5" stroke={inkMain} strokeWidth="1" fill="none" />
            <circle cx="-18" cy="0" r="5" stroke={currentHighlight === "sanctum" ? goldAccent : inkMain} strokeWidth="0.8" fill="none" />
            <circle cx="-18" cy="0" r="1.8" fill={inkMain} />

            <circle cx="18" cy="0" r="9.5" stroke={inkMain} strokeWidth="1" fill="none" />
            <circle cx="18" cy="0" r="5" stroke={currentHighlight === "sanctum" ? goldAccent : inkMain} strokeWidth="0.8" fill="none" />
            <circle cx="18" cy="0" r="1.8" fill={inkMain} />

            <path
              d="M -3 -18 C -3 -8 3 -8 3 -18 Z"
              stroke={currentHighlight === "sanctum" ? goldAccent : inkMuted}
              strokeWidth="0.8"
              fill="none"
            />

            <path d="M -14 14 Q 0 20 14 14" stroke={inkMuted} strokeWidth="1" fill="none" />
          </g>
        </g>

        {/* 10. CEREMONIAL BRASS BELLS */}
        <g
          id="temple-bells"
          className="cursor-pointer group"
          onClick={() => handleHotspotClick("bell")}
          onMouseEnter={() => setHoveredHotspot("bell")}
          onMouseLeave={() => setHoveredHotspot(null)}
        >
          <g transform="translate(265, 410)">
            <line x1="0" y1="-30" x2="0" y2="0" stroke={inkMuted} strokeWidth="0.8" strokeDasharray="2 2" />
            <path
              d="M -10 0 C -10 14 -15 20 -15 24 L 15 24 C 15 20 10 14 10 0 Z"
              stroke={currentHighlight === "bell" ? goldAccent : inkMain}
              strokeWidth="1"
              fill="none"
            />
            <circle cx="0" cy="27" r="2.5" stroke={inkMuted} strokeWidth="0.75" fill="none" />
            {currentHighlight === "bell" && (
              <path d="M -18 30 Q 0 35 18 30" stroke={goldAccent} strokeWidth="0.8" fill="none" />
            )}
          </g>

          <g transform="translate(495, 410)">
            <line x1="0" y1="-30" x2="0" y2="0" stroke={inkMuted} strokeWidth="0.8" strokeDasharray="2 2" />
            <path
              d="M -10 0 C -10 14 -15 20 -15 24 L 15 24 C 15 20 10 14 10 0 Z"
              stroke={currentHighlight === "bell" ? goldAccent : inkMain}
              strokeWidth="1"
              fill="none"
            />
            <circle cx="0" cy="27" r="2.5" stroke={inkMuted} strokeWidth="0.75" fill="none" />
            {currentHighlight === "bell" && (
              <path d="M -18 30 Q 0 35 18 30" stroke={goldAccent} strokeWidth="0.8" fill="none" />
            )}
          </g>
        </g>

        {/* 11. Minimalist Folio Hotspot Callout Markers */}
        {!isCompact && (
          <g id="hotspot-indicators">
            <g
              transform={`translate(535, ${48 + spireOffsetY})`}
              className="cursor-pointer"
              onClick={() => handleHotspotClick("flag")}
            >
              <circle
                cx="0"
                cy="0"
                r="11"
                stroke={currentHighlight === "flag" ? goldAccent : inkMain}
                strokeWidth="1"
                fill="#ffffff"
              />
              <text
                x="0"
                y="3.5"
                textAnchor="middle"
                fill={currentHighlight === "flag" ? goldAccent : inkMain}
                fontSize="8.5"
                fontFamily="monospace"
                fontWeight="bold"
              >
                01
              </text>
              <line x1="-11" y1="0" x2="-26" y2="0" stroke={inkLight} strokeWidth="0.75" />
            </g>

            <g
              transform={`translate(535, ${270 + spireOffsetY * 0.5})`}
              className="cursor-pointer"
              onClick={() => handleHotspotClick("spire")}
            >
              <circle
                cx="0"
                cy="0"
                r="11"
                stroke={currentHighlight === "spire" ? goldAccent : inkMain}
                strokeWidth="1"
                fill="#ffffff"
              />
              <text
                x="0"
                y="3.5"
                textAnchor="middle"
                fill={currentHighlight === "spire" ? goldAccent : inkMain}
                fontSize="8.5"
                fontFamily="monospace"
                fontWeight="bold"
              >
                02
              </text>
              <line x1="-11" y1="0" x2="-26" y2="0" stroke={inkLight} strokeWidth="0.75" />
            </g>

            <g
              transform="translate(380, 580)"
              className="cursor-pointer"
              onClick={() => handleHotspotClick("sanctum")}
            >
              <circle
                cx="0"
                cy="0"
                r="11"
                stroke={currentHighlight === "sanctum" ? goldAccent : inkMain}
                strokeWidth="1"
                fill="#ffffff"
              />
              <text
                x="0"
                y="3.5"
                textAnchor="middle"
                fill={currentHighlight === "sanctum" ? goldAccent : inkMain}
                fontSize="8.5"
                fontFamily="monospace"
                fontWeight="bold"
              >
                03
              </text>
              <line x1="0" y1="-11" x2="0" y2="-25" stroke={inkLight} strokeWidth="0.75" />
            </g>
          </g>
        )}
      </svg>
    </div>
  );
}
