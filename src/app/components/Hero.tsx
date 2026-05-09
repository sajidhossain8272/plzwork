"use client";
import Image from "next/image";

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
            <button
              className="rounded-lg bg-[#0e171d] px-6 py-3 font-semibold text-white transition hover:bg-[#1d2a32]"
              onClick={onConvertNowClick}
            >
              Start converting
            </button>
          </div>
          <div className="flex justify-center md:justify-end">
            <Image
              src="/plzwork-quick-convert.png"
              alt="Plzwork Quick Convert"
              width={1200}
              height={1200}
              priority
              className="h-auto w-full max-w-md rounded-lg border border-[#e5e9e2] bg-white shadow-sm"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
