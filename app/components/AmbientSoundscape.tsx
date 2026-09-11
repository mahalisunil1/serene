"use client";

import { useState, useRef, useEffect } from "react";
import { VolumeX } from "lucide-react";

export default function AmbientSoundscape({ isDark = false }: { isDark?: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);

  useEffect(() => {
    // Initialize audio element with the ambient music file from public/new_appended
    const audio = new Audio("/new_appended/grand_project-wonders-of-the-earth-550792.mp3");
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;
    audioRef.current = audio;

    const handleEnded = () => {
      setIsPlaying(false);
    };
    audio.addEventListener("ended", handleEnded);

    return () => {
      if (fadeRef.current) cancelAnimationFrame(fadeRef.current);
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
      audio.src = "";
    };
  }, []);

  const fadeIn = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeRef.current) cancelAnimationFrame(fadeRef.current);

    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        const targetVolume = 0.45;
        const duration = 1400; // ms
        const startTime = performance.now();
        const startVolume = audio.volume;

        const ramp = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(1, elapsed / duration);
          audio.volume = startVolume + (targetVolume - startVolume) * progress;

          if (progress < 1) {
            fadeRef.current = requestAnimationFrame(ramp);
          }
        };

        fadeRef.current = requestAnimationFrame(ramp);
      })
      .catch((err) => {
        console.warn("Audio play prevented:", err);
        setIsPlaying(false);
      });
  };

  const fadeOut = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeRef.current) cancelAnimationFrame(fadeRef.current);

    const duration = 800; // ms
    const startTime = performance.now();
    const startVolume = audio.volume;

    const ramp = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      audio.volume = Math.max(0, startVolume * (1 - progress));

      if (progress < 1) {
        fadeRef.current = requestAnimationFrame(ramp);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    };

    fadeRef.current = requestAnimationFrame(ramp);
  };

  const toggleSoundscape = () => {
    if (isPlaying) {
      fadeOut();
    } else {
      fadeIn();
    }
  };

  return (
    <button
      onClick={toggleSoundscape}
      className={`relative inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full text-[10px] font-mono tracking-wider transition-all duration-300 cursor-pointer select-none ${
        isPlaying
          ? isDark
            ? "bg-white/90 text-[#14161b] border border-white shadow-sm"
            : "bg-[#14161b] text-[#f7f4ee] border border-[#14161b] shadow-sm"
          : isDark
          ? "bg-white/10 text-white/80 hover:text-white border border-white/25 hover:border-white hover:bg-white/15"
          : "bg-transparent text-[#5a5750] hover:text-[#14161b] border border-[#14161b]/20 hover:border-[#14161b]"
      }`}
      title={isPlaying ? "Mute Ambient Music" : "Play Ambient Music (Wonders of the Earth)"}
      aria-label={isPlaying ? "Mute Ambient Music" : "Play Ambient Music"}
    >
      {/* Sound Indicator / Equalizer Bars */}
      <span className="flex items-center space-x-0.5 h-3.5 w-3.5 justify-center">
        {isPlaying ? (
          <>
            <span
              className="w-[1.5px] bg-[#c5a880] rounded-full h-2.5 animate-[soundbar_1.2s_ease-in-out_infinite]"
              style={{ transformOrigin: "bottom" }}
            />
            <span
              className="w-[1.5px] bg-[#c5a880] rounded-full h-3.5 animate-[soundbar_0.8s_ease-in-out_infinite_0.2s]"
              style={{ transformOrigin: "bottom" }}
            />
            <span
              className="w-[1.5px] bg-[#c5a880] rounded-full h-2 animate-[soundbar_1.4s_ease-in-out_infinite_0.4s]"
              style={{ transformOrigin: "bottom" }}
            />
          </>
        ) : (
          <VolumeX className="w-3.5 h-3.5 opacity-60" />
        )}
      </span>

      <span className="hidden sm:inline lowercase font-medium">
        {isPlaying ? "music • on" : "music"}
      </span>
    </button>
  );
}

