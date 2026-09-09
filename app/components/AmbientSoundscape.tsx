"use client";

import { useState, useRef, useEffect } from "react";
import { VolumeX } from "lucide-react";

export default function AmbientSoundscape({ isDark = false }: { isDark?: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const isSetupRef = useRef(false);

  const initAudio = () => {
    if (isSetupRef.current) return;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // --- 1. Procedural Ocean Wave Noise Generator ---
      const bufferSize = ctx.sampleRate * 4;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;

      // Pink noise filter algorithm for natural organic wave roar
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Low pass filter simulating deep ocean surf
      const lowPassFilter = ctx.createBiquadFilter();
      lowPassFilter.type = "lowpass";
      lowPassFilter.frequency.setValueAtTime(280, ctx.currentTime);
      lowPassFilter.Q.setValueAtTime(3.0, ctx.currentTime);

      // Wave LFO: Slow swell and retreat (approx 8.5 seconds per wave)
      const waveLfo = ctx.createOscillator();
      waveLfo.type = "sine";
      waveLfo.frequency.setValueAtTime(0.12, ctx.currentTime);

      const waveLfoGain = ctx.createGain();
      waveLfoGain.gain.setValueAtTime(220, ctx.currentTime);
      waveLfo.connect(waveLfoGain);
      waveLfoGain.connect(lowPassFilter.frequency);

      // Wave Volume Modulation (swell on high tide, gentle foam on retreat)
      const waveVolumeLfo = ctx.createOscillator();
      waveVolumeLfo.type = "sine";
      waveVolumeLfo.frequency.setValueAtTime(0.12, ctx.currentTime);

      const waveVolumeGain = ctx.createGain();
      waveVolumeGain.gain.setValueAtTime(0.18, ctx.currentTime);

      const waveBaseGain = ctx.createGain();
      waveBaseGain.gain.setValueAtTime(0.22, ctx.currentTime);

      waveVolumeLfo.connect(waveVolumeGain);
      waveVolumeGain.connect(waveBaseGain.gain);

      whiteNoise.connect(lowPassFilter);
      lowPassFilter.connect(waveBaseGain);
      waveBaseGain.connect(masterGain);

      // --- 2. Ethereal Sanctuary Chime / Coastal Air (432Hz Harmonic) ---
      const bellOsc = ctx.createOscillator();
      bellOsc.type = "sine";
      bellOsc.frequency.setValueAtTime(432, ctx.currentTime); // Sacred healing frequency

      const bellGain = ctx.createGain();
      bellGain.gain.setValueAtTime(0.015, ctx.currentTime); // Very soft ethereal undertone
      bellOsc.connect(bellGain);
      bellGain.connect(masterGain);

      // Start oscillators
      whiteNoise.start(0);
      waveLfo.start(0);
      waveVolumeLfo.start(0);
      bellOsc.start(0);

      isSetupRef.current = true;
    } catch {
      // Audio context may not be supported or blocked
    }
  };

  const toggleSoundscape = () => {
    if (!audioCtxRef.current) {
      initAudio();
    }

    const ctx = audioCtxRef.current;
    const gain = gainNodeRef.current;
    if (!ctx || !gain) return;

    if (ctx.state === "suspended") {
      ctx.resume();
    }

    if (!isPlaying) {
      gain.gain.cancelScheduledValues(ctx.currentTime);
      gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 2.5);
      setIsPlaying(true);
    } else {
      gain.gain.cancelScheduledValues(ctx.currentTime);
      gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 1.2);
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <button
      onClick={toggleSoundscape}
      className={`relative inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full text-[10px] font-mono tracking-wider transition-colors duration-200 cursor-pointer ${
        isPlaying
          ? isDark
            ? "bg-white text-[#14161b] border border-white"
            : "bg-[#14161b] text-[#f7f4ee] border border-[#14161b]"
          : isDark
          ? "bg-transparent text-white/75 hover:text-white border border-white/30 hover:border-white"
          : "bg-transparent text-[#5a5750] hover:text-[#14161b] border border-[#14161b]/20 hover:border-[#14161b]"
      }`}
      title={isPlaying ? "Mute Ocean Soundscape" : "Play Puri Coastal Wave Soundscape"}
    >
      {/* Animated Sound Wave Equalizer Bars */}
      <span className="flex items-center space-x-0.5 h-3.5 w-3.5 justify-center">
        {isPlaying ? (
          <>
            <span className="w-[1.5px] bg-[#c5a880] animate-[soundbar_1.2s_ease-in-out_infinite] h-2 rounded-full" />
            <span className="w-[1.5px] bg-[#c5a880] animate-[soundbar_0.8s_ease-in-out_infinite_0.2s] h-3.5 rounded-full" />
            <span className="w-[1.5px] bg-[#c5a880] animate-[soundbar_1.4s_ease-in-out_infinite_0.4s] h-1.5 rounded-full" />
          </>
        ) : (
          <VolumeX className="w-3.5 h-3.5 opacity-60" />
        )}
      </span>

      <span className="hidden sm:inline lowercase">
        {isPlaying ? "ocean tides • on" : "soundscape"}
      </span>
    </button>
  );
}
