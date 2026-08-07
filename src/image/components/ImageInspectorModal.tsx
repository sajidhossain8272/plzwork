/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { Info, X, ShieldCheck, FileImage, Cpu, Ratio, Layers, HardDrive } from "lucide-react";
import { ImageJob } from "../types";

interface ImageInspectorModalProps {
  job: ImageJob | null;
  onClose: () => void;
}

export const ImageInspectorModal: React.FC<ImageInspectorModalProps> = ({ job, onClose }) => {
  if (!job) return null;

  const originalKb = (job.originalSize / 1024).toFixed(1);
  const convertedKb = job.estimatedSize ? (job.estimatedSize / 1024).toFixed(1) : null;
  const savedBytes = job.estimatedSize ? job.originalSize - job.estimatedSize : 0;
  const savedPercentage = job.originalSize > 0 && savedBytes > 0
    ? Math.round((savedBytes / job.originalSize) * 100)
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-[#0e171d] text-white rounded-2xl border border-gray-800 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-[#141f27]">
          <div className="flex items-center gap-2.5">
            <Info className="w-5 h-5 text-[#42b719]" />
            <h3 className="text-lg font-bold">Image Properties & Inspector</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* File Name & Preview Header */}
          <div className="flex items-center gap-4 bg-[#141f27] p-4 rounded-xl border border-gray-800">
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-900 border border-gray-700 shrink-0 flex items-center justify-center">
              <img
                src={job.convertedDataUrl || job.originalDataUrl}
                alt={job.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="truncate">
              <h4 className="font-bold text-white text-base truncate">{job.name}</h4>
              <div className="text-xs text-gray-400 mt-1 flex items-center gap-3">
                <span>Original: {job.originalFormat.toUpperCase()}</span>
                <span>•</span>
                <span>Target: {job.targetFormat.toUpperCase()}</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-[#141f27] p-3.5 rounded-xl border border-gray-800 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                <Ratio className="w-3.5 h-3.5 text-[#42b719]" />
                <span>Dimensions</span>
              </div>
              <div className="text-sm font-bold text-white">
                {job.targetWidth} × {job.targetHeight} px
              </div>
              <div className="text-[11px] text-gray-500">Aspect: {job.aspectRatio}</div>
            </div>

            <div className="bg-[#141f27] p-3.5 rounded-xl border border-gray-800 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                <HardDrive className="w-3.5 h-3.5 text-[#42b719]" />
                <span>Original Size</span>
              </div>
              <div className="text-sm font-bold text-white">{originalKb} KB</div>
              <div className="text-[11px] text-gray-500">{job.originalSize} bytes</div>
            </div>

            <div className="bg-[#141f27] p-3.5 rounded-xl border border-gray-800 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                <Layers className="w-3.5 h-3.5 text-[#42b719]" />
                <span>Converted Size</span>
              </div>
              <div className="text-sm font-bold text-[#42b719]">
                {convertedKb ? `${convertedKb} KB` : "Processing..."}
              </div>
              {savedPercentage > 0 && (
                <div className="text-[11px] text-green-400 font-semibold">
                  Saved {savedPercentage}%
                </div>
              )}
            </div>

            <div className="bg-[#141f27] p-3.5 rounded-xl border border-gray-800 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                <Cpu className="w-3.5 h-3.5 text-[#42b719]" />
                <span>Alpha Transparency</span>
              </div>
              <div className="text-sm font-bold text-white">
                {job.hasAlpha ? "Yes (Alpha Channel)" : "No (Opaque)"}
              </div>
            </div>

            <div className="bg-[#141f27] p-3.5 rounded-xl border border-gray-800 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                <FileImage className="w-3.5 h-3.5 text-[#42b719]" />
                <span>Quality Level</span>
              </div>
              <div className="text-sm font-bold text-white">{job.targetQuality}%</div>
            </div>

            <div className="bg-[#141f27] p-3.5 rounded-xl border border-gray-800 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#42b719]" />
                <span>Metadata Privacy</span>
              </div>
              <div className="text-sm font-bold text-white">
                {job.keepMetadata ? "Retained" : "Stripped (Private)"}
              </div>
            </div>
          </div>

          {/* Privacy Metadata Banner */}
          <div className="p-4 bg-[#42b719]/10 border border-[#42b719]/30 rounded-xl text-xs text-gray-300 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#42b719] shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-white mb-0.5">Privacy Protected</div>
              Your images are processed 100% locally inside your browser using OffscreenCanvas and Web Workers. No file data ever leaves your computer.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#141f27] border-t border-gray-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#42b719] hover:bg-[#349814] text-white text-xs font-semibold rounded-xl transition"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
