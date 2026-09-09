"use client";

import { useRef, ReactNode } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  speed?: number; // 0.1 to 0.5 (positive = moves with scroll, negative = counter)
  scale?: number;
  direction?: "vertical" | "horizontal";
  children?: ReactNode;
  objectFit?: "cover" | "contain";
}

export default function ParallaxImage({
  src,
  alt,
  className = "",
  imageClassName = "",
  priority = false,
  sizes = "100vw",
  speed = 0.2,
  scale = 1.18,
  direction = "vertical",
  children,
  objectFit = "cover",
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const img = imageRef.current;
      const overlay = overlayRef.current;
      if (!container || !img) return;

      const movement = speed * 120; // pixels of displacement

      if (direction === "vertical") {
        gsap.fromTo(
          img,
          {
            y: -movement,
          },
          {
            y: movement,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          }
        );

        if (overlay) {
          gsap.fromTo(
            overlay,
            { y: movement * 0.4 },
            {
              y: -movement * 0.4,
              ease: "none",
              scrollTrigger: {
                trigger: container,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
              },
            }
          );
        }
      } else {
        gsap.fromTo(
          img,
          {
            x: -movement,
          },
          {
            x: movement,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "left right",
              end: "right left",
              scrub: 0.8,
            },
          }
        );
      }
    },
    { scope: containerRef, dependencies: [src, speed, direction] }
  );

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        ref={imageRef}
        style={{ transform: `scale(${scale})` }}
        className="absolute inset-0 w-full h-full will-change-transform"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={`${objectFit === "cover" ? "object-cover" : "object-contain"} object-center ${imageClassName}`}
        />
      </div>

      {children && (
        <div
          ref={overlayRef}
          className="relative z-10 w-full h-full pointer-events-none will-change-transform"
        >
          {children}
        </div>
      )}
    </div>
  );
}
