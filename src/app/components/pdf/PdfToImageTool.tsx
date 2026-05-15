"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { FaTrash, FaArrowUpFromBracket, FaSpinner, FaImage, FaDownload } from "react-icons/fa6";
import ProUpgradeModal from "../ProUpgradeModal";

interface ConvertedImage {
  id: string;
  pageNumber: number;
  dataUrl: string;
  blob: Blob;
  filename: string;
}

const FREE_TIER_LIMIT_PAGES = 5;

export default function PdfToImageTool() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [convertedImages, setConvertedImages] = useState<ConvertedImage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showProModal, setShowProModal] = useState(false);
  const [outputFormat, setOutputFormat] = useState<"image/jpeg" | "image/png">("image/jpeg");
  const [imageQuality, setImageQuality] = useState(0.8);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pdfjsLib, setPdfjsLib] = useState<typeof import("pdfjs-dist") | null>(null);

  useEffect(() => {
    // Dynamic import to prevent SSR issues
    const initPdfJs = async () => {
      const lib = await import("pdfjs-dist");
      lib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${lib.version}/pdf.worker.min.mjs`;
      setPdfjsLib(lib);
    };
    initPdfJs();
  }, []);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setPdfFile(acceptedFiles[0]);
      setConvertedImages([]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
  });

  const handleConvert = async () => {
    if (!pdfFile || !canvasRef.current || !pdfjsLib) return;
    setIsProcessing(true);
    setConvertedImages([]);

    try {
      const arrayBuffer = await pdfFile.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument(new Uint8Array(arrayBuffer));
      const pdf = await loadingTask.promise;

      let numPages = pdf.numPages;

      if (numPages > FREE_TIER_LIMIT_PAGES) {
        setShowProModal(true);
        numPages = FREE_TIER_LIMIT_PAGES;
      }

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not get 2D context");

      const newImages: ConvertedImage[] = [];

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 }); // High quality scale
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext = {
          canvasContext: ctx,
          viewport: viewport,
        };

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await page.render(renderContext).promise;

        const dataUrl = canvas.toDataURL(outputFormat, imageQuality);

        // Convert to blob
        const res = await fetch(dataUrl);
        const blob = await res.blob();

        const ext = outputFormat === "image/jpeg" ? "jpg" : "png";
        const filename = `${pdfFile.name.replace(".pdf", "")}_page_${i}.${ext}`;

        newImages.push({
          id: crypto.randomUUID(),
          pageNumber: i,
          dataUrl,
          blob,
          filename
        });
      }

      setConvertedImages(newImages);

    } catch (error) {
      console.error("Error converting PDF:", error);
      alert("Failed to convert PDF. It might be corrupted or password protected.");
    } finally {
      setIsProcessing(false);
    }
  };

  const removePdf = () => {
    setPdfFile(null);
    setConvertedImages([]);
  };

  const downloadAll = async () => {
    if (convertedImages.length === 0) return;

    if (convertedImages.length === 1) {
      saveAs(convertedImages[0].blob, convertedImages[0].filename);
      return;
    }

    const zip = new JSZip();
    convertedImages.forEach((img) => {
      zip.file(img.filename, img.blob);
    });

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `${pdfFile?.name.replace(".pdf", "")}_images.zip`);
  };

  const downloadSingle = (img: ConvertedImage) => {
    saveAs(img.blob, img.filename);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-sm border border-[#dde4da]">
      {/* Hidden canvas for rendering */}
      <canvas ref={canvasRef} style={{ display: "none" }} />

      <ProUpgradeModal
        isOpen={showProModal}
        onClose={() => setShowProModal(false)}
        featureName="converting more than 5 pages"
      />

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#0d161c] mb-2">PDF to Image</h2>
        <p className="text-[#5d6870]">Extract pages from your PDF into high-quality JPG or PNG images.</p>
      </div>

      {!pdfFile ? (
        <div
          {...getRootProps()}
          className={`cursor-pointer rounded-xl border-2 border-dashed p-12 text-center transition-all
            ${isDragActive ? "border-[#42b719] bg-[#eefbe9]" : "border-[#cfd8cc] bg-gray-50 hover:border-[#9fc995]"}`}
        >
          <input {...getInputProps()} />
          <FaArrowUpFromBracket className={`h-12 w-12 mx-auto mb-4 ${isDragActive ? "text-[#42b719]" : "text-gray-400"}`} />
          <p className="text-lg font-medium text-gray-700">Drag & drop your PDF here</p>
          <p className="text-sm text-gray-500 mt-2">or click to browse</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-center gap-3 w-full truncate">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-lg flex-shrink-0">
                <FaImage size={24} />
              </div>
              <div className="flex-1 truncate">
                <p className="font-semibold text-gray-800 truncate">{pdfFile.name}</p>
                <p className="text-xs text-gray-500">{(pdfFile.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <button
                onClick={removePdf}
                className="text-red-500 hover:text-red-700 p-2 ml-auto"
                title="Remove PDF"
              >
                <FaTrash size={18} />
              </button>
            </div>
          </div>

          {convertedImages.length === 0 && (
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-4">Conversion Settings</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Output Format</label>
                  <select
                    className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500"
                    value={outputFormat}
                    onChange={(e) => setOutputFormat(e.target.value as "image/jpeg" | "image/png")}
                  >
                    <option value="image/jpeg">JPG (Smaller file size)</option>
                    <option value="image/png">PNG (Lossless, transparent bg)</option>
                  </select>
                </div>

                {outputFormat === "image/jpeg" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quality: {Math.round(imageQuality * 100)}%
                    </label>
                    <input
                      type="range"
                      min="0.1"
                      max="1"
                      step="0.1"
                      value={imageQuality}
                      onChange={(e) => setImageQuality(parseFloat(e.target.value))}
                      className="w-full mt-2 accent-blue-600"
                    />
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleConvert}
                  disabled={isProcessing || !pdfjsLib}
                  className={`flex items-center gap-2 px-8 py-3 rounded-lg font-bold text-white transition-all ${
                    isProcessing || !pdfjsLib ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600 shadow-md hover:shadow-lg"
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <FaSpinner className="animate-spin" /> Converting...
                    </>
                  ) : !pdfjsLib ? (
                    <>
                      <FaSpinner className="animate-spin" /> Loading PDF engine...
                    </>
                  ) : (
                    "Convert PDF to Images"
                  )}
                </button>
              </div>
            </div>
          )}

          {convertedImages.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-gray-800">Converted Pages</h3>
                <button
                  onClick={downloadAll}
                  className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow-sm transition-colors"
                >
                  <FaDownload /> {convertedImages.length > 1 ? "Download All (ZIP)" : "Download"}
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {convertedImages.map((img) => (
                  <div key={img.id} className="relative group border border-gray-200 rounded-lg overflow-hidden bg-gray-50 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                    <div className="p-1 bg-gray-100 border-b border-gray-200 text-xs text-center text-gray-500 font-medium">
                      Page {img.pageNumber}
                    </div>
                    <div className="flex-1 p-2 flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.dataUrl} alt={`Page ${img.pageNumber}`} className="max-w-full max-h-40 object-contain shadow-sm border border-gray-100" />
                    </div>
                    <button
                      onClick={() => downloadSingle(img)}
                      className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                    >
                      <div className="bg-white text-gray-800 rounded-full p-3 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                        <FaDownload size={20} />
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
