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
  /** Whether to pin during the reveal, or an element/ref/selector to pin. */
  pin?: boolean | string | HTMLElement | React.RefObject<HTMLElement | null>;
  /** Custom trigger element or ref. Defaults to container or pin target. */
  trigger?: string | HTMLElement | React.RefObject<HTMLElement | null>;
  /** Whether to add pin spacing when pinned. Defaults to true. */
  pinSpacing?: boolean;
  /** Scrub smoothing value in seconds, or true. Defaults to 0.8 in scrub mode. */
  scrub?: boolean | number;
  /** Anticipate pin value for smoother scroll start. Defaults to 1 when pinned. */
  anticipatePin?: number;
  /** Optional external GSAP Timeline to hook into instead of creating a standalone ScrollTrigger. */
  timeline?: gsap.core.Timeline | null;
  /** Position or label on the external timeline where this reveal starts. Defaults to 0. */
  timelineStart?: number | string;
  /** Duration of this reveal within the external timeline. Defaults to 1. */
  timelineDuration?: number;
  /** Fraction of scroll progress reserved for holding text completely clear and legible before unpinning (0 to 0.5). Defaults to 0.25 when pinned. */
  readingBuffer?: number;
}

const LINE_EDGE_BLUR = 0.3;

function resolveTarget(
  target?: string | HTMLElement | React.RefObject<HTMLElement | null> | null,
): HTMLElement | string | undefined {
  if (!target) return undefined;
  if (typeof target === "string" || target instanceof HTMLElement) return target;
  if (typeof target === "object" && "current" in target && target.current) {
    return target.current;
  }
  return undefined;
}

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
    blurAmount = 0.38,
    ease = "power2.out",
    start,
    end,
    scroller,
    once = true,
    disabled = false,
    onComplete,
    pin,
    trigger,
    pinSpacing = true,
    scrub = 1.5,
    anticipatePin = 0,
    timeline,
    timelineStart = 0,
    timelineDuration = 1,
    readingBuffer,
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
      let tween: gsap.core.Tween | gsap.core.Timeline | null = null;
      let animationFrame = 0;
      let measuredWidth = container.getBoundingClientRect().width;
      let disposed = false;

      const revert = () => {
        if (tween) {
          if ("scrollTrigger" in tween && tween.scrollTrigger) {
            tween.scrollTrigger.kill();
          }
          tween.kill();
          tween = null;
        }

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

          // 1. Apply the threshold filter to the lines so elements inside melt together
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
          y: 14,
          scale: 0.96,
          transformOrigin: "center bottom",
        };

        const animationVars: gsap.TweenVars = {
          filter: "blur(0em)",
          opacity: 1,
          y: 0,
          scale: 1,
          duration,
          ease: "power2.out",
          stagger: {
            each: mode === "scrub" || Boolean(timeline) ? 0.04 : stagger,
            from: "start",
            ease: "sine.inOut",
          },
          delay: mode === "immediate" ? delay : 0,
          onComplete: () => {
            if (mode !== "scrub" && !timeline) {
              layers.forEach((layer) => {
                layer.style.filter = "none";
              });
              splits.forEach((s) => {
                s.lines.forEach((line) => {
                  (line as HTMLElement).style.filter = "none";
                });
              });
            }
            onComplete?.();
          },
        };

        // Option A: Hook into an external parent GSAP timeline
        if (timeline) {
          const tStart = timelineStart !== undefined ? timelineStart : 0;
          const tDur = timelineDuration !== undefined ? timelineDuration : 1;
          const stag = (tDur * 0.58) / Math.max(1, layers.length - 1);

          const tlTween = gsap.fromTo(
            layers,
            fromVars,
            {
              filter: "blur(0em)",
              opacity: 1,
              y: 0,
              scale: 1,
              duration: tDur * 0.48,
              ease: "power2.out",
              stagger: {
                each: stag,
                from: "start",
                ease: "sine.inOut",
              },
            },
          );

          timeline.add(tlTween, tStart);
          tween = tlTween;
          return;
        }

        // Option B: Standalone Scrub (with optional Pinning and Reading Buffer)
        if (mode === "scrub") {
          const resolvedScroller =
            typeof scroller === "string" || scroller instanceof HTMLElement
              ? scroller
              : scroller?.current ?? undefined;

          const resolvedPinTarget: HTMLElement | string | boolean = (() => {
            if (!pin) return false;
            if (typeof pin === "boolean") {
              const trg = resolveTarget(trigger);
              return trg || container.closest("section") || container;
            }
            return (
              resolveTarget(pin) || container.closest("section") || container
            );
          })();

          const resolvedTrigger: HTMLElement | string = (() => {
            const trg = resolveTarget(trigger);
            if (trg) return trg;
            if (resolvedPinTarget && typeof resolvedPinTarget !== "boolean") {
              return resolvedPinTarget;
            }
            return container.closest("section") || container;
          })();

          const effectiveStart =
            start ?? (resolvedPinTarget ? "top top" : "top 85%");
          const effectiveEnd =
            end ?? (resolvedPinTarget ? "+=220%" : "bottom 70%");
          const effectiveScrub =
            typeof scrub === "number" || typeof scrub === "boolean"
              ? scrub
              : 1.5;
          const effectiveBuffer = resolvedPinTarget
            ? readingBuffer !== undefined
              ? readingBuffer
              : 0.25
            : 0;

          if (resolvedPinTarget) {
            const scrubTl = gsap.timeline({
              scrollTrigger: {
                trigger: resolvedTrigger,
                start: effectiveStart,
                end: effectiveEnd,
                scrub: effectiveScrub,
                pin: resolvedPinTarget,
                pinSpacing,
                anticipatePin,
                invalidateOnRefresh: true,
                scroller: resolvedScroller,
                onLeave: () => {
                  splits.forEach((s) => {
                    s.lines.forEach((line) => {
                      (line as HTMLElement).style.filter = "none";
                    });
                  });
                  layers.forEach((l) => {
                    l.style.filter = "none";
                  });
                  onComplete?.();
                },
                onEnterBack: () => {
                  splits.forEach((s) => {
                    s.lines.forEach((line) => {
                      (line as HTMLElement).style.filter = `url(#${filterId}) blur(${LINE_EDGE_BLUR}px)`;
                    });
                  });
                  layers.forEach((l) => {
                    l.style.filter = "";
                  });
                },
              },
            });

            const activeRatio = Math.max(0.2, 1 - effectiveBuffer);
            const stag = (activeRatio * 0.58) / Math.max(1, layers.length - 1);

            scrubTl.fromTo(
              layers,
              fromVars,
              {
                filter: "blur(0em)",
                opacity: 1,
                y: 0,
                scale: 1,
                duration: activeRatio * 0.48,
                ease: "power2.out",
                stagger: {
                  each: stag,
                  from: "start",
                  ease: "sine.inOut",
                },
              },
              0,
            );

            // Reading buffer hold so user can read complete text before unpinning
            if (effectiveBuffer > 0) {
              scrubTl.to({}, { duration: effectiveBuffer });
            }

            tween = scrubTl;
            return;
          }

          // Unpinned scrub fallback
          animationVars.scrollTrigger = {
            trigger: resolvedTrigger,
            start: effectiveStart,
            end: effectiveEnd,
            scrub: effectiveScrub,
            invalidateOnRefresh: true,
            scroller: resolvedScroller,
          };
          tween = gsap.fromTo(layers, fromVars, animationVars);
          return;
        }

        // Option C: Traditional Scroll Triggered Reveal
        if (mode === "scroll") {
          const resolvedScroller =
            typeof scroller === "string" || scroller instanceof HTMLElement
              ? scroller
              : scroller?.current ?? undefined;

          const resolvedPinTarget: HTMLElement | string | boolean = (() => {
            if (!pin) return false;
            if (typeof pin === "boolean") {
              const trg = resolveTarget(trigger);
              return trg || container.closest("section") || container;
            }
            return (
              resolveTarget(pin) || container.closest("section") || container
            );
          })();

          const resolvedTrigger: HTMLElement | string = (() => {
            const trg = resolveTarget(trigger);
            if (trg) return trg;
            if (resolvedPinTarget && typeof resolvedPinTarget !== "boolean") {
              return resolvedPinTarget;
            }
            return container.closest("section") || container;
          })();

          animationVars.delay = delay;
          animationVars.scrollTrigger = {
            trigger: resolvedTrigger,
            start: start ?? (resolvedPinTarget ? "top top" : "top 85%"),
            pin: resolvedPinTarget || false,
            pinSpacing,
            anticipatePin,
            once,
            toggleActions: once
              ? "play none none none"
              : "play none none reverse",
            invalidateOnRefresh: true,
            scroller: resolvedScroller,
          };
          tween = gsap.fromTo(layers, fromVars, animationVars);
          return;
        }

        // Option D: Immediate Reveal (e.g. Hero on page load)
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
      dependencies: [timeline, mode, splitBy, pin, trigger, disabled],
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
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
});

GooeyTextReveal.displayName = "GooeyTextReveal";

export default GooeyTextReveal;
