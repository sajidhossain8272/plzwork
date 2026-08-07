/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, useCallback } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import {
  UploadCloud,
  Image as ImageIcon,
  Sparkles,
  Download,
  Trash2,
  Play,
  RefreshCw,
  Eye,
  Info,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sliders,
  FileArchive,
} from "lucide-react";

import { ImageJob, ImageFormat, CompressionPreset, ResizeMode } from "../types";
import { queueManager } from "../queue/queueManager";
import { recommendFormat } from "../codecs/smartRecommender";
import { inspectImageFile } from "../metadata/exifStripper";
import { getBaseName } from "@/lib/imageUtils";
import { ImageInspectorModal } from "./ImageInspectorModal";
import { LivePreviewModal } from "./LivePreviewModal";

export const ImageConverterSuite: React.FC = () => {
  const [jobs, setJobs] = useState<ImageJob[]>([]);
  const [globalFormat, setGlobalFormat] = useState<ImageFormat>("webp");
  const [compressionPreset, setCompressionPreset] = useState<CompressionPreset>("balanced");
  const [quality, setQuality] = useState<number>(85);
  const [resizeMode] = useState<ResizeMode>("original");
  const [resizePercent, setResizePercent] = useState<number>(100);
  const [keepMetadata, setKeepMetadata] = useState<boolean>(false);
  const [backgroundColor] = useState<string>("transparent");

  const [inspectJob, setInspectJob] = useState<ImageJob | null>(null);
  const [previewJob, setPreviewJob] = useState<ImageJob | null>(null);

  // Subscribe to reactive Queue Manager updates
  useEffect(() => {
    const unsubscribe = queueManager.subscribe((updatedJobs) => {
      setJobs(updatedJobs);
    });
    return () => unsubscribe();
  }, []);

  // Update preset quality settings
  useEffect(() => {
    if (compressionPreset === "lossless") setQuality(100);
    else if (compressionPreset === "balanced") setQuality(85);
    else if (compressionPreset === "max") setQuality(65);
  }, [compressionPreset]);

  /**
   * Process uploaded files into queue jobs.
   */
  const processFiles = useCallback(async (files: File[]) => {
    const newJobs: ImageJob[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith("image/") && !file.name.match(/\.(heic|heif|bmp|tiff|ico)$/i)) {
        continue;
      }

      const id = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      
      // Read data URL
      const dataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });

      // Inspect metadata & dimensions
      const metadata = await inspectImageFile(file, dataUrl);
      const rec = recommendFormat(
        metadata.mimeType.split("/")[1] || "png",
        metadata.width,
        metadata.height,
        metadata.hasAlpha,
        file.name
      );

      const job: ImageJob = {
        id,
        file,
        name: file.name,
        originalFormat: file.type.split("/")[1]?.toUpperCase() || "IMG",
        originalSize: file.size,
        width: metadata.width,
        height: metadata.height,
        aspectRatio: metadata.aspectRatio,
        hasAlpha: metadata.hasAlpha,
        originalDataUrl: dataUrl,
        targetFormat: rec.recommendedFormat || globalFormat,
        targetQuality: quality,
        targetWidth: metadata.width,
        targetHeight: metadata.height,
        keepMetadata,
        backgroundColor: metadata.hasAlpha ? backgroundColor : "transparent",
        status: "idle",
        progress: 0,
      };

      newJobs.push(job);
    }

    queueManager.addJobs(newJobs);
  }, [globalFormat, quality, keepMetadata, backgroundColor]);

  // Global Ctrl+V Clipboard listener for instant pasting
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (e.clipboardData && e.clipboardData.files && e.clipboardData.files.length > 0) {
        const pastedFiles = Array.from(e.clipboardData.files);
        processFiles(pastedFiles);
      }
    };
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [processFiles]);

  /**
   * Convert batch jobs using Web Worker.
   */
  const handleConvertAll = useCallback(() => {
    const idleJobs = jobs.filter((j) => j.status === "idle" || j.status === "error");
    if (idleJobs.length === 0) return;

    idleJobs.forEach((job) => {
      queueManager.updateJob(job.id, { status: "converting", progress: 20 });

      const worker = new Worker(new URL("@/image/workers/imageWorker.ts", import.meta.url));

      // Calculate target dimensions
      let targetW = job.width;
      let targetH = job.height;

      if (resizeMode === "percentage" && resizePercent !== 100) {
        const scale = resizePercent / 100;
        targetW = Math.round(job.width * scale);
        targetH = Math.round(job.height * scale);
      }

      worker.postMessage({
        dataUrl: job.originalDataUrl,
        targetFormat: job.targetFormat || globalFormat,
        targetQuality: job.targetQuality || quality,
        targetWidth: targetW,
        targetHeight: targetH,
        backgroundColor: job.hasAlpha && (job.targetFormat === "jpeg" || job.targetFormat === "bmp")
          ? (job.backgroundColor !== "transparent" ? job.backgroundColor : "#ffffff")
          : "transparent",
      });

      worker.onmessage = (e) => {
        const { converted, size, error } = e.data;

        if (error) {
          queueManager.updateJob(job.id, { status: "error", error, progress: 0 });
        } else {
          const savedBytes = job.originalSize - size;
          const savedPerc = job.originalSize > 0 ? Math.round((savedBytes / job.originalSize) * 100) : 0;

          queueManager.updateJob(job.id, {
            status: "completed",
            progress: 100,
            convertedDataUrl: converted,
            estimatedSize: size,
            savedPercentage: savedPerc,
            targetWidth: targetW,
            targetHeight: targetH,
          });
        }
        worker.terminate();
      };
    });
  }, [jobs, globalFormat, quality, resizeMode, resizePercent]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleConvertAll();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleConvertAll]);

  /**
   * Download individual converted file.
   */
  const downloadSingle = async (job: ImageJob) => {
    if (!job.convertedDataUrl) return;
    const baseName = getBaseName(job.name);
    const ext = job.targetFormat;
    const res = await fetch(job.convertedDataUrl);
    const blob = await res.blob();
    saveAs(blob, `${baseName}.${ext}`);
  };

  /**
   * Download all completed jobs in a ZIP archive.
   */
  const downloadAllZip = async () => {
    const completed = jobs.filter((j) => j.convertedDataUrl);
    if (completed.length === 0) return;

    if (completed.length === 1) {
      await downloadSingle(completed[0]);
      return;
    }

    const zip = new JSZip();
    completed.forEach((job) => {
      const base64Data = job.convertedDataUrl!.split(",")[1];
      const baseName = getBaseName(job.name);
      zip.file(`${baseName}.${job.targetFormat}`, base64Data, { base64: true });
    });

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "quick-convert-images.zip");
  };

  const completedCount = jobs.filter((j) => j.status === "completed").length;
  const isConverting = jobs.some((j) => j.status === "converting");

  return (
    <div className="w-full bg-white rounded-2xl border border-[#dde4da] shadow-sm p-6 sm:p-8 space-y-8">
      {/* Header Title & Tagline */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-[#0d161c] text-[#42b719]">
            <ImageIcon className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#0d161c]">Image Converter V2</h2>
            <p className="text-xs text-[#5d6870] mt-0.5">
              100% Client-Side Web Worker conversion · WebP, PNG, JPEG, AVIF, BMP, TIFF, ICO
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#d6ded2] bg-[#f8faf7] px-3.5 py-1.5 text-xs font-semibold text-[#30404a]">
            <span className="h-2 w-2 rounded-full bg-[#42b719]" />
            Local Serverless Privacy
          </span>
        </div>
      </div>

      {/* Control Panel: Format, Compression & Resizing */}
      <div className="bg-[#f8faf7] border border-[#e2e8e0] rounded-2xl p-5 space-y-6">
        <div className="flex items-center gap-2 text-xs font-bold text-[#0d161c] uppercase tracking-wider">
          <Sliders className="w-4 h-4 text-[#42b719]" />
          <span>Conversion & Compression Settings</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Target Format */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-700">Target Format</label>
            <select
              value={globalFormat}
              onChange={(e) => {
                const fmt = e.target.value as ImageFormat;
                setGlobalFormat(fmt);
                queueManager.setGlobalFormat(fmt);
              }}
              className="w-full bg-white border border-[#cfd8cc] text-gray-800 text-sm font-semibold rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#42b719]/40"
            >
              <option value="webp">WebP (Recommended)</option>
              <option value="png">PNG (Lossless)</option>
              <option value="jpeg">JPEG (Universal)</option>
              <option value="avif">AVIF (Next-Gen)</option>
              <option value="bmp">BMP (Uncompressed)</option>
              <option value="ico">ICO (Favicon)</option>
            </select>
          </div>

          {/* Compression Preset */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-700">Compression Preset</label>
            <select
              value={compressionPreset}
              onChange={(e) => setCompressionPreset(e.target.value as CompressionPreset)}
              className="w-full bg-white border border-[#cfd8cc] text-gray-800 text-sm font-semibold rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#42b719]/40"
            >
              <option value="balanced">Balanced (85% Quality)</option>
              <option value="lossless">Lossless / Max Quality (100%)</option>
              <option value="max">Max Compression (65% Quality)</option>
              <option value="custom">Custom Quality</option>
            </select>
          </div>

          {/* Quality Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-gray-700">
              <span>Quality ({quality}%)</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={quality}
              onChange={(e) => {
                const val = Number(e.target.value);
                setQuality(val);
                setCompressionPreset("custom");
                queueManager.setGlobalQuality(val);
              }}
              className="w-full h-2.5 bg-gray-200 rounded-lg accent-[#42b719] cursor-pointer mt-3"
            />
          </div>

          {/* Dimension Scaling */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-700">Scale Dimensions</label>
            <select
              value={resizePercent}
              onChange={(e) => {
                const pct = Number(e.target.value);
                setResizePercent(pct);
                queueManager.setGlobalDimensions(pct);
              }}
              className="w-full bg-white border border-[#cfd8cc] text-gray-800 text-sm font-semibold rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#42b719]/40"
            >
              <option value={100}>Original (100%)</option>
              <option value={75}>75% Scale</option>
              <option value={50}>50% Scale</option>
              <option value={25}>25% Scale</option>
            </select>
          </div>
        </div>

        {/* Toggles Bar */}
        <div className="pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4 text-xs">
          <label className="flex items-center gap-2 font-semibold text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={!keepMetadata}
              onChange={(e) => setKeepMetadata(!e.target.checked)}
              className="w-4 h-4 rounded text-[#42b719] accent-[#42b719]"
            />
            <ShieldCheck className="w-4 h-4 text-[#42b719]" />
            <span>Strip EXIF Privacy Metadata (Recommended)</span>
          </label>

          <div className="flex items-center gap-2 font-medium text-gray-500">
            <span>Shortcut: <kbd className="bg-white border px-1.5 py-0.5 rounded font-mono text-gray-800">Ctrl+V</kbd> to paste images directly</span>
          </div>
        </div>
      </div>

      {/* Batch Dropzone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          if (e.dataTransfer.files) {
            processFiles(Array.from(e.dataTransfer.files));
          }
        }}
        className="border-2 border-dashed border-[#cfd8cc] hover:border-[#42b719] bg-[#fbfdf9] rounded-2xl p-8 text-center cursor-pointer transition duration-300"
      >
        <input
          type="file"
          multiple
          accept="image/*,.heic,.heif,.bmp,.tiff,.ico"
          className="hidden"
          id="file-upload-input"
          onChange={(e) => {
            if (e.target.files) processFiles(Array.from(e.target.files));
          }}
        />
        <label htmlFor="file-upload-input" className="cursor-pointer space-y-3 block">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-[#42b719]/10 text-[#42b719] flex items-center justify-center">
            <UploadCloud className="w-7 h-7" />
          </div>
          <div className="text-base font-bold text-[#0d161c]">
            Drag & drop images here, or <span className="text-[#42b719] underline">click to browse</span>
          </div>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            Supports PNG, JPEG, WebP, AVIF, GIF, BMP, TIFF, ICO, and HEIC. You can also press <kbd className="bg-gray-100 border px-1 py-0.5 rounded font-mono">Ctrl + V</kbd> anywhere to paste from clipboard.
          </p>
        </label>
      </div>

      {/* Queue List Table */}
      {jobs.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#0d161c]">
              Conversion Queue ({jobs.length} files)
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => queueManager.clearCompleted()}
                className="text-xs text-gray-500 hover:text-gray-800 transition"
              >
                Clear Completed
              </button>
              <button
                onClick={() => queueManager.clearAll()}
                className="text-xs text-red-500 hover:text-red-700 font-medium transition"
              >
                Clear All
              </button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#dde4da] bg-white shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#f4f6f2] text-[#40505a] font-semibold border-b border-[#dde4da]">
                <tr>
                  <th className="p-3.5 w-16 text-center">Preview</th>
                  <th className="p-3.5">File Name</th>
                  <th className="p-3.5">Dimensions</th>
                  <th className="p-3.5">Original Size</th>
                  <th className="p-3.5">Target Format</th>
                  <th className="p-3.5">Status / Output</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eef1ec]">
                {jobs.map((job) => {
                  const rec = recommendFormat(
                    job.originalFormat,
                    job.width,
                    job.height,
                    job.hasAlpha,
                    job.name
                  );

                  return (
                    <tr key={job.id} className="hover:bg-[#fbfdf9] transition">
                      {/* Thumbnail */}
                      <td className="p-3 text-center">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 mx-auto flex items-center justify-center shrink-0">
                          <img
                            src={job.convertedDataUrl || job.originalDataUrl}
                            alt={job.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </td>

                      {/* File Name */}
                      <td className="p-3">
                        <div className="font-semibold text-gray-900 truncate max-w-xs">{job.name}</div>
                        <div className="text-[11px] text-[#42b719] font-medium mt-0.5 flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          <span>{rec.title}</span>
                        </div>
                      </td>

                      {/* Dimensions */}
                      <td className="p-3 font-mono text-gray-600">
                        {job.targetWidth} × {job.targetHeight} px
                      </td>

                      {/* Original Size */}
                      <td className="p-3 font-mono text-gray-600">
                        {(job.originalSize / 1024).toFixed(1)} KB
                      </td>

                      {/* Target Format */}
                      <td className="p-3">
                        <select
                          value={job.targetFormat}
                          onChange={(e) => {
                            queueManager.updateJob(job.id, {
                              targetFormat: e.target.value as ImageFormat,
                            });
                          }}
                          className="bg-gray-50 border border-gray-300 text-gray-800 text-xs font-semibold rounded-lg p-1.5 focus:outline-none"
                        >
                          <option value="webp">WebP</option>
                          <option value="png">PNG</option>
                          <option value="jpeg">JPEG</option>
                          <option value="avif">AVIF</option>
                          <option value="bmp">BMP</option>
                          <option value="ico">ICO</option>
                        </select>
                      </td>

                      {/* Status */}
                      <td className="p-3">
                        {job.status === "converting" && (
                          <span className="inline-flex items-center gap-1.5 text-blue-600 font-semibold">
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Converting...
                          </span>
                        )}
                        {job.status === "completed" && (
                          <div className="space-y-0.5">
                            <div className="inline-flex items-center gap-1 text-[#42b719] font-semibold">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Converted
                            </div>
                            <div className="text-[11px] font-mono text-gray-500">
                              {(job.estimatedSize! / 1024).toFixed(1)} KB ({job.savedPercentage}% saved)
                            </div>
                          </div>
                        )}
                        {job.status === "idle" && (
                          <span className="text-gray-400 font-medium">Ready</span>
                        )}
                        {job.status === "error" && (
                          <span className="inline-flex items-center gap-1 text-red-500 font-semibold">
                            <AlertCircle className="w-3.5 h-3.5" /> Error
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setPreviewJob(job)}
                            className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
                            title="Live Split Preview"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setInspectJob(job)}
                            className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
                            title="Inspect Properties"
                          >
                            <Info className="w-4 h-4" />
                          </button>
                          {job.convertedDataUrl && (
                            <button
                              onClick={() => downloadSingle(job)}
                              className="p-1.5 rounded-lg bg-[#42b719]/10 text-[#42b719] hover:bg-[#42b719] hover:text-white transition"
                              title="Download Converted"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => queueManager.removeJob(job.id)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 transition"
                            title="Remove"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Actions Bottom Bar */}
      {jobs.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100">
          <button
            onClick={handleConvertAll}
            disabled={isConverting}
            className="w-full sm:w-auto px-8 py-3 bg-[#0d161c] hover:bg-[#1d2a32] text-white text-sm font-bold rounded-xl transition shadow-md flex items-center justify-center gap-2"
          >
            {isConverting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-[#42b719]" />
                <span>Converting Queue...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 text-[#42b719] fill-[#42b719]" />
                <span>Convert All Images (Ctrl+Enter)</span>
              </>
            )}
          </button>

          {completedCount > 0 && (
            <button
              onClick={downloadAllZip}
              className="w-full sm:w-auto px-8 py-3 bg-[#42b719] hover:bg-[#349814] text-white text-sm font-bold rounded-xl transition shadow-md flex items-center justify-center gap-2"
            >
              <FileArchive className="w-4 h-4" />
              <span>Download ZIP Archive ({completedCount})</span>
            </button>
          )}
        </div>
      )}

      {/* Modals */}
      <ImageInspectorModal job={inspectJob} onClose={() => setInspectJob(null)} />
      <LivePreviewModal job={previewJob} onClose={() => setPreviewJob(null)} />
    </div>
  );
};
