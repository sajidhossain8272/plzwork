'use client';

import React from 'react';
import { AiCaptionGenerator } from '../components/AiCaptionGenerator';
import AltTextLoadingAnimation from '../components/AltTextLoadingAnimation';

export default function Page() {
  // Scroll handler for the CTA
  const scrollToGenerator = () => {
    const el = document.getElementById('generator-section');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const steps = [
    'Drag & drop (or click) to upload your image.',
    'Our AI (powered by Google Gemini Vision) analyzes it.',
    'Receive a concise, descriptive caption to use as alt-text.',
  ];

  return (
    <main className="bg-[#f7f7f4]">
      {/* Hero */}
      <section className="border-b border-[#dde4da] bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          {/* Text Column */}
          <div className="flex-1 text-center md:text-left space-y-4">
            <p className="pt-20 text-sm font-semibold uppercase tracking-[0.18em] text-[#42b719]">
              A Plzwork AI tool
            </p>
            <h1 className="text-5xl font-semibold text-[#0d161c]">
              AI-Powered Alt-Text Generator in Seconds
            </h1>
            <p className="text-lg leading-8 text-[#5d6870]">
              Create concise, SEO-friendly alt-tags for any image—no signup required.
            </p>
            <p className="text-sm text-[#6a757c] italic">
              Supports JPG, PNG, WebP, HEIC & more.
            </p>
            <button
              onClick={scrollToGenerator}
              className="mt-4 inline-block rounded-lg bg-[#0e171d] px-6 py-3 font-semibold text-white transition hover:bg-[#1d2a32]"
            >
              Try Now
            </button>
          </div>
          {/* Loader Column */}
          <div className="flex-1">
            <AltTextLoadingAnimation />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-[#0d161c] mb-8 text-center">
            How It Works
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="group flex flex-col items-center rounded-lg border border-[#dde4da] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-center h-14 w-14
                                rounded-full bg-[#eaf7e5] text-xl font-bold text-[#42b719] mb-4">
                  {idx + 1}
                </div>
                <p className="text-[#5d6870] text-center">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Generator */}
      <section
        id="generator-section"
        className="py-16 bg-[#f7f7f4]"
      >
        <div className="max-w-3xl mx-auto px-4">
          <div className="rounded-lg border border-[#dde4da] bg-white p-8 shadow-sm">
            <AiCaptionGenerator />
          </div>
        </div>
      </section>
    </main>
  );
}
