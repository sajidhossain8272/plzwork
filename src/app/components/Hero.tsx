"use client";
import QuickConvertTerminal from "./QuickConvertTerminal";

interface HeroProps {
  onConvertNowClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onConvertNowClick }) => {
  return (
    <div className="pt-16">
      <section className="relative overflow-hidden border-b border-[#dde4da] bg-[#f7f7f4] py-16 text-[#0f171d] sm:py-20">
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 md:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d6ded2] bg-white px-4 py-2 text-sm font-semibold text-[#30404a]">
              <span className="h-2 w-2 rounded-full bg-[#52c41a]" />
              A Plzwork product
            </div>
            <h1 className="text-4xl font-semibold leading-tight tracking-normal text-[#0d161c] sm:text-5xl lg:text-6xl">
              Private image conversion that stays in your browser.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[#5b6870]">
              Convert WebP, JPEG, PNG, HEIC, and HEIF images with a clean,
              focused workflow inspired by the calm surfaces of modern AI tools.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                className="rounded-lg bg-[#0e171d] px-6 py-3 font-semibold text-white transition hover:bg-[#1d2a32]"
                onClick={onConvertNowClick}
              >
                Start converting
              </button>
              <div className="relative group/doc">
                <button
                  className="rounded-lg border border-[#cfd7cf] bg-white px-6 py-3 font-semibold text-[#142027] transition hover:border-[#9fb89d]"
                >
                  Read Documentation
                </button>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#0e171d] text-white text-[11px] font-medium rounded-lg opacity-0 group-hover/doc:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-xl border border-white/10 flex items-center gap-1.5 translate-y-2 group-hover/doc:translate-y-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                  The writer is sleeping, guide will be available soon! 💤
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0e171d] rotate-45 border-r border-b border-white/10"></div>
                </div>
              </div>
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
