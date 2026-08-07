/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { Eye, X, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { ImageJob } from "../types";

interface LivePreviewModalProps {
  job: ImageJob | null;
  onClose: () => void;
}

export const LivePreviewModal: React.FC<LivePreviewModalProps> = ({ job, onClose }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [zoom, setZoom] = useState(1);

  if (!job) return null;

  const originalKb = (job.originalSize / 1024).toFixed(1);
  const convertedKb = job.estimatedSize ? (job.estimatedSize / 1024).toFixed(1) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-5xl h-[85vh] bg-[#0e171d] text-white rounded-2xl border border-gray-800 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-[#141f27]">
          <div className="flex items-center gap-3">
            <Eye className="w-5 h-5 text-[#42b719]" />
            <div>
              <h3 className="text-base font-bold truncate max-w-md">{job.name}</h3>
              <div className="text-xs text-gray-400 flex items-center gap-2">
                <span>Original ({job.originalFormat.toUpperCase()}): {originalKb} KB</span>
                <span>→</span>
                <span className="text-[#42b719] font-medium">
                  Converted ({job.targetFormat.toUpperCase()}): {convertedKb ? `${convertedKb} KB` : "—"}
                </span>
              </div>
            </div>
          </div>

          {/* Zoom & Controls */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-gray-800 p-1 rounded-xl border border-gray-700">
              <button
                onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))}
                className="p-1.5 text-gray-300 hover:text-white rounded-lg transition"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono px-2 text-gray-300">{Math.round(zoom * 100)}%</span>
              <button
                onClick={() => setZoom((z) => Math.min(3, z + 0.25))}
                className="p-1.5 text-gray-300 hover:text-white rounded-lg transition"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoom(1)}
                className="p-1.5 text-gray-300 hover:text-white rounded-lg transition"
                title="Reset Zoom"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Split Comparison Canvas Area */}
        <div className="flex-1 relative overflow-hidden bg-black/40 flex items-center justify-center p-6 select-none">
          <div
            className="relative overflow-hidden rounded-xl border border-gray-800 shadow-2xl transition-transform duration-100"
            style={{ transform: `scale(${zoom})` }}
          >
            {/* Base Image (Converted / Target Result) */}
            <img
              src={job.convertedDataUrl || job.originalDataUrl}
              alt="Converted Preview"
              className="max-h-[60vh] max-w-full object-contain block pointer-events-none"
            />

            {/* Overlay Image (Original Image, clipped by sliderPosition %) */}
            <div
              className="absolute top-0 left-0 bottom-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={job.originalDataUrl}
                alt="Original Preview"
                className="max-h-[60vh] max-w-none object-contain block pointer-events-none"
                style={{ width: "100%", height: "100%" }}
              />
            </div>

            {/* Split Slider Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-[#42b719] shadow-lg cursor-ew-resize flex items-center justify-center"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-7 h-7 rounded-full bg-[#42b719] text-white shadow-xl flex items-center justify-center text-xs font-bold -ml-3 select-none">
                ↔
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Interactive Slider Bar */}
        <div className="px-6 py-4 bg-[#141f27] border-t border-gray-800 flex items-center justify-between gap-6 text-xs">
          <div className="flex items-center gap-2 text-gray-400 font-semibold uppercase tracking-wider">
            <span>Original ({sliderPosition}%)</span>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={(e) => setSliderPosition(Number(e.target.value))}
            className="w-full max-w-md accent-[#42b719] cursor-pointer"
          />

          <div className="flex items-center gap-2 text-[#42b719] font-semibold uppercase tracking-wider">
            <span>Converted ({100 - sliderPosition}%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
