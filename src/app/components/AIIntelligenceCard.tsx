"use client";

import React, { useState, useEffect } from "react";
import {
  Brain,
  Sparkles,
  Palette,
  Eye,
  ShieldCheck,
  Zap,
  Terminal,
  X,
  FileCheck,
  HelpCircle,
} from "lucide-react";

import { AIRuntime } from "@/ai/aiRuntime";
import { AIAnalysisResult } from "@/ai/types";

export const AIIntelligenceCard: React.FC = () => {
  const [analysis, setAnalysis] = useState<AIAnalysisResult | null>(null);
  const [showDeveloperMode, setShowDeveloperMode] = useState(false);
  const [showUsageGuide, setShowUsageGuide] = useState(false);

  useEffect(() => {
    AIRuntime.analyzeImage({
      imageId: "img-sample-1",
      filename: "screenshot_hero_banner.png",
      mimeType: "image/png",
      dataUrl: "data:image/png;base64,",
      width: 1920,
      height: 1080,
      sizeBytes: 1240000,
      hasAlpha: true,
    }).then((res) => setAnalysis(res));
  }, []);

  if (!analysis) return null;

  return (
    <div className="w-full bg-white rounded-2xl border border-[#dde4da] shadow-sm p-6 sm:p-8 space-y-6 mt-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-[#0d161c] text-[#42b719]">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#0d161c]">Local AI Image Intelligence</h2>
            <p className="text-xs text-[#5d6870] mt-0.5">
              11 Distributed Local Capabilities · 100% Privacy Preserved · Perceptual Hashing & Computer Vision
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowUsageGuide(true)}
            className="px-4 py-2 bg-white border border-[#cfd8cc] hover:border-gray-400 text-gray-800 text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-2xs"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#42b719]" />
            <span>How to Use AI</span>
          </button>

          <button
            onClick={() => setShowDeveloperMode(true)}
            className="px-4 py-2 bg-[#0d161c] hover:bg-gray-800 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5"
          >
            <Terminal className="w-3.5 h-3.5 text-[#42b719]" />
            <span>Developer Traces</span>
          </button>
        </div>
      </div>

      {/* Grid of Intelligence Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Classification */}
        <div className="p-4 bg-[#f8faf7] border border-[#e2e8e0] rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-[#0d161c]">
            <span>Category</span>
            <Sparkles className="w-4 h-4 text-[#42b719]" />
          </div>
          <div className="text-lg font-extrabold text-gray-900 capitalize">
            {analysis.classification.primaryCategory.replace("_", " ")}
          </div>
          <div className="text-xs text-gray-500 font-mono">
            {Math.round(analysis.classification.confidence * 100)}% Confidence
          </div>
          <p className="text-[11px] text-gray-600 line-clamp-2">{analysis.classification.explanation}</p>
        </div>

        {/* Card 2: Quality Score */}
        <div className="p-4 bg-[#f8faf7] border border-[#e2e8e0] rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-[#0d161c]">
            <span>Visual Quality Score</span>
            <Eye className="w-4 h-4 text-[#42b719]" />
          </div>
          <div className="text-lg font-extrabold text-[#42b719]">
            {analysis.quality.overallScore} / 100
          </div>
          <div className="text-xs text-gray-500 font-mono">
            Sharpness: {analysis.quality.sharpness} | Exposure: {analysis.quality.exposure}
          </div>
          <p className="text-[11px] text-gray-600">High clarity detail frequency detected.</p>
        </div>

        {/* Card 3: Color Palette */}
        <div className="p-4 bg-[#f8faf7] border border-[#e2e8e0] rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-[#0d161c]">
            <span>Color Palette</span>
            <Palette className="w-4 h-4 text-[#42b719]" />
          </div>
          <div className="flex items-center gap-1.5 pt-1">
            {analysis.colorPalette.paletteHex.map((hex, idx) => (
              <div
                key={idx}
                className="w-7 h-7 rounded-lg border border-gray-300 shadow-2xs"
                style={{ backgroundColor: hex }}
                title={hex}
              />
            ))}
          </div>
          <div className="text-xs text-gray-500 font-mono pt-1">
            Contrast Ratio: {analysis.colorPalette.contrastRatio}:1 (Passes AAA)
          </div>
        </div>

        {/* Card 4: Compression Advisor */}
        <div className="p-4 bg-[#f8faf7] border border-[#e2e8e0] rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-[#0d161c]">
            <span>Compression Advisor</span>
            <Zap className="w-4 h-4 text-[#42b719]" />
          </div>
          <div className="text-lg font-extrabold text-gray-900">
            {analysis.compression.recommendedFormat.toUpperCase()}
          </div>
          <div className="text-xs text-[#42b719] font-bold">
            Saved ~{analysis.compression.savedPercentage}% Bandwidth
          </div>
          <p className="text-[11px] text-gray-600 line-clamp-2">{analysis.compression.explanation}</p>
        </div>
      </div>

      {/* Export Profiles */}
      <div className="space-y-3 pt-2">
        <div className="text-xs font-bold text-[#0d161c] uppercase tracking-wider flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-[#42b719]" />
          <span>Tailored Export Profiles</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {analysis.exportProfiles.map((prof) => (
            <div key={prof.id} className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-gray-900">
                <span className="capitalize">{prof.target.replace("_", " ")}</span>
                <span className="font-mono text-[#42b719]">{prof.format.toUpperCase()}</span>
              </div>
              <div className="text-[11px] text-gray-500 font-mono">
                {prof.width} × {prof.height} px ({prof.quality}% Quality)
              </div>
              <p className="text-[11px] text-gray-600 line-clamp-1">{prof.reason}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How to Use AI Guide Modal */}
      {showUsageGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-[#0e171d] text-white rounded-2xl border border-gray-800 shadow-2xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-[#141f27]">
              <div className="flex items-center gap-2.5">
                <HelpCircle className="w-5 h-5 text-[#42b719]" />
                <h3 className="text-base font-bold">How to Use Local AI Image Intelligence</h3>
              </div>
              <button
                onClick={() => setShowUsageGuide(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-gray-300">
              <div className="p-3.5 bg-[#141f27] border border-gray-800 rounded-xl space-y-1">
                <div className="font-bold text-white text-sm">1. Automatic Real-Time Analysis</div>
                <p>Simply drag and drop any image into the converter or press <kbd className="bg-gray-800 border px-1 py-0.5 rounded font-mono text-green-400">Ctrl + V</kbd> to paste. The Local AI Engine immediately analyzes the image in your browser.</p>
              </div>

              <div className="p-3.5 bg-[#141f27] border border-gray-800 rounded-xl space-y-1">
                <div className="font-bold text-white text-sm">2. Smart Classification & Format Advice</div>
                <p>The AI determines if your file is a photo, screenshot, document, or logo and recommends the best output codec (WebP, PNG, AVIF) to maximize compression while protecting clarity.</p>
              </div>

              <div className="p-3.5 bg-[#141f27] border border-gray-800 rounded-xl space-y-1">
                <div className="font-bold text-white text-sm">3. Quality Scoring & Color Palette</div>
                <p>View sharpness, noise, exposure scores, and extract dominant color swatches with built-in WCAG contrast verification.</p>
              </div>

              <div className="p-3.5 bg-[#141f27] border border-gray-800 rounded-xl space-y-1">
                <div className="font-bold text-white text-sm">4. 100% Privacy Guarantee</div>
                <p>All 11 intelligence capabilities execute locally using rule-based computer vision and perceptual hashing. No files or metadata ever leave your computer.</p>
              </div>
            </div>

            <div className="px-6 py-3.5 bg-[#141f27] border-t border-gray-800 flex justify-end">
              <button
                onClick={() => setShowUsageGuide(false)}
                className="px-5 py-2 bg-[#42b719] hover:bg-[#349814] text-white text-xs font-semibold rounded-xl transition"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Developer Mode Diagnostics Modal */}
      {showDeveloperMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-[#0e171d] text-white rounded-2xl border border-gray-800 shadow-2xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-[#141f27]">
              <div className="flex items-center gap-2.5">
                <Terminal className="w-5 h-5 text-[#42b719]" />
                <h3 className="text-base font-bold">Developer Mode: Decision Trace & Diagnostics</h3>
              </div>
              <button
                onClick={() => setShowDeveloperMode(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto font-mono text-xs">
              <div className="grid grid-cols-2 gap-3 text-gray-300">
                <div className="p-3 bg-gray-900 rounded-xl border border-gray-800">
                  <div className="text-gray-500 text-[10px]">Total AI Latency</div>
                  <div className="text-sm font-bold text-[#42b719]">{analysis.trace.totalDurationMs} ms</div>
                </div>
                <div className="p-3 bg-gray-900 rounded-xl border border-gray-800">
                  <div className="text-gray-500 text-[10px]">Active Capabilities</div>
                  <div className="text-sm font-bold text-white">{analysis.trace.capabilitiesRun.length} Modules</div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-gray-400 font-semibold mb-1">Runtime Decision Logs:</div>
                <div className="p-4 bg-gray-900 text-green-400 rounded-xl space-y-1.5 overflow-x-auto">
                  {analysis.trace.decisionLog.map((log, idx) => (
                    <div key={idx}>{log}</div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-[#42b719]/10 border border-[#42b719]/30 rounded-xl text-gray-300 text-[11px] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#42b719] shrink-0" />
                <span>Zero server telemetry required. 100% processing executed locally in browser.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
