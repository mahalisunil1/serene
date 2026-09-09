"use client";

import * as React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export type GooeyTextRevealMode = "immediate" | "scroll" | "scrub";
export type GooeyTextRevealSplitBy = "lines" | "words" | "chars";
export type GooeyTextRevealScroller =
  | string
  | HTMLElement
  | React.RefObject<HTMLElement | null>;

export interface GooeyTextRevealProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Text-bearing elements to split into animated elements. */
  children: React.ReactNode;
  /** Controls when the reveal runs. */
  mode?: GooeyTextRevealMode;
  /** Split typography by lines, words, or characters. */
  splitBy?: GooeyTextRevealSplitBy;
  /** Delay before non-scrub animations begin, in seconds. */
  delay?: number;
  /** Reveal duration for each unit, in seconds. */
  duration?: number;
  /** Delay between consecutive units, in seconds. */
  stagger?: number;
  /** Starting blur measured in em units. */
  blurAmount?: number;
  /** GSAP easing expression used by the reveal tween. */
  ease?: string;
  /** ScrollTrigger start position for scroll and scrub modes. */
  start?: string;
  /** ScrollTrigger end position for scrub mode. */
  end?: string;
  /** Optional scrollable ancestor used instead of the browser viewport. */
  scroller?: GooeyTextRevealScroller;
  /** Whether a scroll reveal should only run once. */
  once?: boolean;
  /** Disables splitting and animation while preserving the content. */
  disabled?: boolean;
  /** Called after the reveal completes. */
  onComplete?: () => void;
}

const LINE_EDGE_BLUR = 0.5;

function wrapItem(item: HTMLElement, blurAmount: number) {
  const inner = document.createElement("span");
  inner.dataset.gooeyRevealInner = "";
  inner.style.display = "inline-block";
  inner.style.willChange = "filter, transform, opacity";
  inner.style.filter = `blur(${blurAmount}em)`;
  inner.style.opacity = "0";

  while (item.firstChild) {
    inner.appendChild(item.firstChild);
  }

  item.appendChild(inner);
  return inner;
}

function getRevealTargets(container: HTMLDivElement) {
  const explicitTargets = Array.from(
    container.querySelectorAll<HTMLElement>("[data-gooey-reveal-item]"),
  );

  if (explicitTargets.length > 0) return explicitTargets;

  const directChildren = Array.from(container.children).filter(
    (child): child is HTMLElement => child instanceof HTMLElement,
  );

  return directChildren.length > 0 ? directChildren : [container];
}

export const GooeyTextReveal = React.forwardRef<
  HTMLDivElement,
  GooeyTextRevealProps
>(function GooeyTextReveal(
  {
    children,
    mode = "immediate",
    splitBy = "lines",
    delay = 0,
    duration = 1.6,
    stagger = 0.08,
    blurAmount = 0.45,
    ease = "power3.out",
    start = "top 85%",
    end = "bottom 70%",
    scroller,
    once = true,
    disabled = false,
    onComplete,
    style,
    ...props
  },
  forwardedRef,
) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const reactId = React.useId();
  const filterId = React.useMemo(
    () => `gooey-text-reveal-${reactId.replace(/[:/]/g, "")}`,
    [reactId],
  );

  const setContainerRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node;

      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    },
    [forwardedRef],
  );

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container || disabled) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reducedMotion) {
        gsap.set(container, { opacity: 1, visibility: "visible" });
        return;
      }

      let splits: SplitText[] = [];
      let tween: gsap.core.Tween | null = null;
      let animationFrame = 0;
      let measuredWidth = container.getBoundingClientRect().width;
      let disposed = false;

      const revert = () => {
        tween?.scrollTrigger?.kill();
        tween?.kill();
        tween = null;

        splits.forEach((split) => split.revert());
        splits = [];
      };

      const build = () => {
        if (disposed) return;
        revert();

        const layers: HTMLElement[] = [];

        getRevealTargets(container).forEach((target) => {
          let splitType: string = "lines";
          if (splitBy === "words") splitType = "words, lines";
          if (splitBy === "chars") splitType = "chars, words, lines";

          const split = SplitText.create(target, {
            type: splitType,
            linesClass: "gooey-text-reveal-line",
            wordsClass: "gooey-text-reveal-word",
            charsClass: "gooey-text-reveal-char",
            aria: "auto",
          });

          // 1. Apply the threshold filter to the lines so elements inside can melt together
          split.lines.forEach((line) => {
            const lineEl = line as HTMLElement;
            lineEl.style.filter = `url(#${filterId}) blur(${LINE_EDGE_BLUR}px)`;
          });

          // 2. Wrap and prepare the specific items we want to animate (lines, words, or chars)
          const itemsToAnimate =
            splitBy === "chars"
              ? split.chars
              : splitBy === "words"
              ? split.words
              : split.lines;

          itemsToAnimate.forEach((item) => {
            const itemElement = item as HTMLElement;
            itemElement.style.display = "inline-block";
            itemElement.style.willChange = "filter, transform, opacity";
            layers.push(wrapItem(itemElement, blurAmount));
          });

          splits.push(split);
        });

        if (layers.length === 0) {
          gsap.set(container, { opacity: 1, visibility: "visible" });
          return;
        }

        // Make the container visible now that the layers are prepared at opacity: 0
        gsap.set(container, { opacity: 1, visibility: "visible" });

        const fromVars: gsap.TweenVars = {
          filter: `blur(${blurAmount}em)`,
          opacity: 0,
          y: mode === "scrub" ? 0 : 8,
        };

        const animationVars: gsap.TweenVars = {
          filter: "blur(0em)",
          opacity: 1,
          y: 0,
          duration,
          ease: mode === "scrub" ? "none" : ease,
          stagger: mode === "scrub" ? 0.04 : stagger,
          delay: mode === "immediate" ? delay : 0,
          onComplete: () => {
            // Restore crystal-clear subpixel rendering after reveal completes
            layers.forEach((layer) => {
              layer.style.filter = "none";
            });
            splits.forEach((s) => {
              s.lines.forEach((line) => {
                (line as HTMLElement).style.filter = "none";
              });
            });
            onComplete?.();
          },
        };

        if (mode === "scrub") {
          const resolvedScroller =
            typeof scroller === "string" || scroller instanceof HTMLElement
              ? scroller
              : scroller?.current ?? undefined;

          animationVars.scrollTrigger = {
            trigger: container,
            start,
            end,
            scrub: 0.8,
            invalidateOnRefresh: true,
            scroller: resolvedScroller,
          };
        } else if (mode === "scroll") {
          const resolvedScroller =
            typeof scroller === "string" || scroller instanceof HTMLElement
              ? scroller
              : scroller?.current ?? undefined;

          animationVars.delay = delay;
          animationVars.scrollTrigger = {
            trigger: container,
            start,
            once,
            toggleActions: once ? "play none none none" : "play none none reverse",
            invalidateOnRefresh: true,
            scroller: resolvedScroller,
          };
        }

        tween = gsap.fromTo(layers, fromVars, animationVars);
      };

      build();

      if (document.fonts && document.fonts.status !== "loaded") {
        document.fonts.ready.then(() => {
          if (!disposed) build();
        });
      }

      if (typeof ResizeObserver !== "undefined") {
        const resizeObserver = new ResizeObserver(([entry]) => {
          const nextWidth = entry.contentRect.width;
          if (Math.abs(nextWidth - measuredWidth) < 0.5) return;

          measuredWidth = nextWidth;
          window.cancelAnimationFrame(animationFrame);
          animationFrame = window.requestAnimationFrame(() => {
            build();
          });
        });

        resizeObserver.observe(container);

        return () => {
          disposed = true;
          window.cancelAnimationFrame(animationFrame);
          resizeObserver.disconnect();
          revert();
        };
      }

      return () => {
        disposed = true;
        revert();
      };
    },
    {
      scope: containerRef,
    },
  );

  return (
    <>
      <div
        ref={setContainerRef}
        style={{ opacity: 0, ...style }}
        {...props}
      >
        {children}
      </div>

      <svg
        aria-hidden="true"
        focusable="false"
        width="0"
        height="0"
        style={{ position: "absolute", pointerEvents: "none" }}
      >
        <defs>
          <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
});

GooeyTextReveal.displayName = "GooeyTextReveal";

export default GooeyTextReveal;
