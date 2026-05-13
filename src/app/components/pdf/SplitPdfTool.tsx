"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { FaFilePdf, FaArrowUpFromBracket, FaSpinner } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import ProUpgradeModal from "../ProUpgradeModal";

export default function SplitPdfTool() {
  const [pdfFile, setPdfFile] = useState<{ file: File; totalPages: number } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [splitRanges, setSplitRanges] = useState<string>("1-2, 3-5");
  const [showProModal, setShowProModal] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];

    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      setPdfFile({ file, totalPages: pdfDoc.getPageCount() });
      setSplitRanges(`1-${Math.min(pdfDoc.getPageCount(), 2)}`); // Default range
    } catch (e) {
      console.error(e);
      alert("Could not load PDF. It might be corrupted or password protected.");
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
  });

  const parseRanges = (rangesString: string, maxPages: number) => {
    const ranges = rangesString.split(",").map((r) => r.trim());
    const validRanges: { start: number; end: number }[] = [];

    for (const range of ranges) {
      const parts = range.split("-").map((n) => parseInt(n.trim(), 10));
      if (parts.length === 1 && !isNaN(parts[0])) {
        if (parts[0] >= 1 && parts[0] <= maxPages) {
          validRanges.push({ start: parts[0], end: parts[0] });
        }
      } else if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        const start = Math.max(1, Math.min(parts[0], parts[1]));
        const end = Math.min(maxPages, Math.max(parts[0], parts[1]));
        validRanges.push({ start, end });
      }
    }
    return validRanges;
  };

  const handleSplit = async () => {
    if (!pdfFile) return;

    const ranges = parseRanges(splitRanges, pdfFile.totalPages);
    if (ranges.length === 0) {
      alert("Please enter valid page ranges.");
      return;
    }

    if (ranges.length > 2) {
        setShowProModal(true);
        return;
    }

    setIsProcessing(true);
    try {
      const arrayBuffer = await pdfFile.file.arrayBuffer();
      const sourcePdf = await PDFDocument.load(arrayBuffer);
      const zip = new JSZip();

      const fileNameBase = pdfFile.file.name.replace(/\.pdf$/i, "");

      for (let i = 0; i < ranges.length; i++) {
        const { start, end } = ranges[i];
        const newPdf = await PDFDocument.create();

        // pdf-lib is 0-indexed, UI is 1-indexed
        const indices = [];
        for (let page = start; page <= end; page++) {
          indices.push(page - 1);
        }

        const copiedPages = await newPdf.copyPages(sourcePdf, indices);
        copiedPages.forEach((page) => newPdf.addPage(page));

        const pdfBytes = await newPdf.save();

        if (ranges.length === 1) {
          // Download single directly
          const blob = new Blob([pdfBytes], { type: "application/pdf" });
          saveAs(blob, `${fileNameBase}_pages_${start}-${end}.pdf`);
          setIsProcessing(false);
          return;
        } else {
           zip.file(`${fileNameBase}_pages_${start}-${end}.pdf`, pdfBytes);
        }
      }

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, `${fileNameBase}_split.zip`);

    } catch (e) {
      console.error(e);
      alert("An error occurred while splitting the PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-sm border border-[#dde4da]">
        <ProUpgradeModal
            isOpen={showProModal}
            onClose={() => setShowProModal(false)}
            featureName="splitting into more than 2 files at once"
        />

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#0d161c] mb-2">Split PDF</h2>
        <p className="text-[#5d6870]">Extract specific pages or separate a PDF into multiple files.</p>
      </div>

      {!pdfFile ? (
        <div
          {...getRootProps()}
          className={`cursor-pointer rounded-xl border-2 border-dashed p-12 text-center transition-all relative
            ${isDragActive ? "border-[#42b719] bg-[#eefbe9]" : "border-[#cfd8cc] bg-gray-50 hover:border-[#9fc995]"}`}
        >
          <input {...getInputProps()} />

          {isProcessing ? (
             <div className="flex flex-col items-center">
                <FaSpinner className="animate-spin text-[#42b719] h-12 w-12 mb-4" />
                <p className="text-gray-700">Loading PDF...</p>
             </div>
          ) : (
            <>
                <FaArrowUpFromBracket className={`h-12 w-12 mx-auto mb-4 ${isDragActive ? "text-[#42b719]" : "text-gray-400"}`} />
                <p className="text-lg font-medium text-gray-700">Drag & drop a PDF here</p>
                <p className="text-sm text-gray-500 mt-2">or click to browse files</p>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-6 flex flex-col items-center">

          <div className="w-full bg-gray-50 border border-[#dde4da] rounded-xl p-6 relative">
            <button
                onClick={() => setPdfFile(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
            >
                <FaTimes size={20} />
            </button>
            <div className="flex items-center gap-4 mb-6">
                <div className="text-red-500 bg-red-100 p-4 rounded-lg">
                    <FaFilePdf size={32} />
                </div>
                <div>
                    <h3 className="font-semibold text-lg text-gray-800">{pdfFile.file.name}</h3>
                    <p className="text-sm text-gray-500">{pdfFile.totalPages} pages total</p>
                </div>
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    Extract Page Ranges
                </label>
                <input
                    type="text"
                    value={splitRanges}
                    onChange={(e) => setSplitRanges(e.target.value)}
                    placeholder="e.g. 1-3, 5, 8-10"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <p className="text-xs text-gray-500">
                    Enter comma-separated page ranges. Each range will be exported as a separate PDF file.
                </p>
            </div>
          </div>

          <button
            onClick={handleSplit}
            disabled={isProcessing}
            className={`flex items-center gap-2 px-8 py-3 rounded-lg font-bold text-white transition-all w-full sm:w-auto justify-center ${
                isProcessing ? "bg-red-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600 shadow-md hover:shadow-lg"
            }`}
          >
            {isProcessing ? (
              <>
                <FaSpinner className="animate-spin" /> Splitting...
              </>
            ) : (
              "Split PDF"
            )}
          </button>
        </div>
      )}
    </div>
  );
}
