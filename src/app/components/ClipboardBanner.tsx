"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, ArrowRight, X } from "lucide-react";
import { parseNaturalLanguageQuery } from "@/engine/parser";
import { NaturalLanguageParseResult } from "@/engine/types";

interface ClipboardBannerProps {
  onConvertSuggested: (result: NaturalLanguageParseResult) => void;
}

export const ClipboardBanner: React.FC<ClipboardBannerProps> = ({ onConvertSuggested }) => {
  const [suggestion, setSuggestion] = useState<NaturalLanguageParseResult | null>(null);

  useEffect(() => {
    const checkClipboard = async () => {
      if (typeof window !== "undefined" && navigator.clipboard && navigator.clipboard.readText) {
        try {
          const text = await navigator.clipboard.readText();
          if (text && text.length < 50) {
            const parsed = parseNaturalLanguageQuery(text);
            if (parsed && parsed.isValid) {
              setSuggestion(parsed);
            }
          }
        } catch {
          // Clipboard permission denied or unavailable
        }
      }
    };

    window.addEventListener("focus", checkClipboard);
    return () => window.removeEventListener("focus", checkClipboard);
  }, []);

  if (!suggestion) return null;

  return (
    <div className="w-full mb-6 p-4 bg-[#0d161c] text-white rounded-2xl border border-gray-800 shadow-xl flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-[#42b719]/20 text-[#42b719]">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs text-gray-400 font-medium">Detected unit in clipboard</div>
          <div className="text-sm font-semibold text-white">
            Convert {suggestion.value} {suggestion.fromUnit.symbol} to {suggestion.toUnit.name}?
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            onConvertSuggested(suggestion);
            setSuggestion(null);
          }}
          className="px-4 py-2 bg-[#42b719] hover:bg-[#349814] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition shadow-sm"
        >
          <span>Convert Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => setSuggestion(null)}
          className="p-2 text-gray-400 hover:text-white rounded-lg transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
