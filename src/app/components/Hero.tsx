"use client";

import React from "react";
import QuickConvertTerminal from "./QuickConvertTerminal";
import { Command, Sparkles, ArrowRight } from "lucide-react";

interface HeroProps {
  onConvertNowClick: () => void;
  onOpenCommandPalette: () => void;
}

const Hero: React.FC<HeroProps> = ({ onConvertNowClick, onOpenCommandPalette }) => {
  return (
    <div className="pt-16">
      <section className="relative overflow-hidden border-b border-[#dde4da] bg-[#f7f7f4] py-16 text-[#0f171d] sm:py-20">
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 md:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d6ded2] bg-white px-4 py-2 text-xs font-semibold text-[#30404a] shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-[#42b719]" />
              Plzwork · Flagship Product
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-[#0d161c] sm:text-5xl lg:text-6xl">
              The fastest universal conversion engine.
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-[#5b6870] sm:text-lg">
              Convert units, currencies, digital storage, media, developer payloads, and images instantly in your browser. Privacy-first, zero server latency, installable PWA.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                className="rounded-xl bg-[#0e171d] px-6 py-3.5 font-semibold text-white transition hover:bg-[#1d2a32] shadow-md flex items-center gap-2 text-sm"
                onClick={onConvertNowClick}
              >
                <span>Universal Converter</span>
                <ArrowRight className="w-4 h-4 text-[#42b719]" />
              </button>

              <button
                onClick={onOpenCommandPalette}
                className="rounded-xl border border-[#cfd7cf] bg-white px-5 py-3.5 font-semibold text-[#142027] transition hover:border-[#9fb89d] shadow-2xs flex items-center gap-2 text-sm"
              >
                <Command className="w-4 h-4 text-gray-500" />
                <span>Command Palette</span>
                <kbd className="text-[10px] bg-gray-100 border border-gray-300 px-1.5 py-0.5 rounded text-gray-600 font-mono ml-1">⌘K</kbd>
              </button>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <QuickConvertTerminal />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
