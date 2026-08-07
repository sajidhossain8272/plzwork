"use client";

import { useRef, useState } from "react";

import JSZip from "jszip";
import { saveAs } from "file-saver";
import { FaCheckCircle, FaSpinner, FaHourglass, FaTrash } from "react-icons/fa";
import { Image as ImageIcon } from "lucide-react";

import Dropzone from "./components/Dropzone";
import ConversionControls from "./components/ConversionControls";
import { getBaseName } from "@/lib/imageUtils";
import Features from "./components/Features";
import Hero from "./components/Hero";
import ConversionTable from "./components/ConversionTable";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import { UniversalConverter } from "./components/UniversalConverter";
import { DevToolsCard } from "./components/DevToolsCard";
import { CommandPalette } from "./components/CommandPalette";
import { ClipboardBanner } from "./components/ClipboardBanner";
import { HistoryDrawer } from "./components/HistoryDrawer";

import { CategoryType, Unit, NaturalLanguageParseResult, HistoryItem } from "@/engine/types";
import { registerAllPlugins } from "@/plugins";

// Auto register plugins on load
registerAllPlugins();

interface ImageItem {
  id: number;
  originalBase64: string;
  originalFileName: string;
  convertedBase64?: string;
  isUploading: boolean;
  isLoading: boolean;
  selected: boolean;
}

export default function Home() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [conversionSettings, setConversionSettings] = useState({
    format: "webp" as "webp" | "jpeg" | "png",
    quality: 90,
    resolution: "original" as "original" | "25" | "50" | "75",
  });

  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("length");
  const [selectedFromUnit, setSelectedFromUnit] = useState<Unit | undefined>(undefined);
  const [selectedToUnit, setSelectedToUnit] = useState<Unit | undefined>(undefined);
  const [initialValue, setInitialValue] = useState<number>(1);

  const mainRef = useRef<HTMLDivElement | null>(null);

  const scrollToMain = () => {
    if (mainRef.current) {
      mainRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectConversionFromNL = (result: NaturalLanguageParseResult) => {
    setSelectedCategory(result.category);
    setSelectedFromUnit(result.fromUnit);
    setSelectedToUnit(result.toUnit);
    setInitialValue(result.value);
    scrollToMain();
  };

  const handleSelectHistoryItem = (item: HistoryItem) => {
    setSelectedCategory(item.category);
    setInitialValue(item.fromValue);
    scrollToMain();
  };

  /**
   * Add images from dropzone with upload progress.
   */
  const addImages = (fileData: { base64: string; fileName: string }[]) => {
    fileData.forEach(async (data, idx) => {
      const id = Date.now() + idx;
      setImages((prev) => [
        ...prev,
        {
          id,
          originalBase64: "",
          originalFileName: data.fileName,
          isUploading: true,
          isLoading: false,
          selected: true,
        },
      ]);

      let base64 = data.base64;

      if (data.fileName.endsWith(".heic") || data.fileName.endsWith(".heif")) {
        const response = await fetch(data.base64);
        const blob = await response.blob();
        const heic2any = (await import("heic2any")).default;
        const convertedBlob = await heic2any({ blob, toType: "image/jpeg" });
        base64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(convertedBlob as Blob);
        });
      }

      setImages((prev) =>
        prev.map((img) =>
          img.id === id
            ? { ...img, originalBase64: base64, isUploading: false }
            : img
        )
      );
    });
  };

  const toggleSelectImage = (id: number) => {
    setImages((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, selected: !img.selected } : img
      )
    );
  };

  const removeImage = (id: number) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleConvertImages = async () => {
    const selectedImages = images.filter(
      (img) => img.selected && !img.isUploading
    );
    if (selectedImages.length === 0) return;

    setImages((prev) =>
      prev.map((img) =>
        img.selected && !img.isUploading
          ? { ...img, isLoading: true, convertedBase64: undefined }
          : img
      )
    );

    selectedImages.forEach((image) => {
      const worker = new Worker(
        new URL("@/lib/convertWorker", import.meta.url)
      );

      worker.postMessage({
        dataUrl: image.originalBase64,
        format: conversionSettings.format,
        quality: conversionSettings.quality,
        resolution: conversionSettings.resolution,
      });

      worker.onmessage = (e) => {
        const { converted } = e.data;
        setImages((prev) =>
          prev.map((img) =>
            img.id === image.id
              ? { ...img, convertedBase64: converted, isLoading: false }
              : img
          )
        );
        worker.terminate();
      };
    });
  };

  const handleDownloadAllImages = async () => {
    const convertedItems = images.filter((img) => img.convertedBase64);
    if (convertedItems.length === 0) return;

    if (convertedItems.length === 1) {
      const item = convertedItems[0];
      const ext = conversionSettings.format;
      const baseName = getBaseName(item.originalFileName);
      await downloadSingleImage(item.convertedBase64!, `${baseName}.${ext}`);
      return;
    }

    const zip = new JSZip();
    convertedItems.forEach((item) => {
      const base64Data = item.convertedBase64!.split(",")[1];
      const ext = conversionSettings.format;
      const baseName = getBaseName(item.originalFileName);
      zip.file(`${baseName}.${ext}`, base64Data, { base64: true });
    });

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "converted-images.zip");
  };

  const downloadSingleImage = async (dataUrl: string, fileName: string) => {
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    saveAs(blob, fileName);
  };

  const selectedCount = images.filter((img) => img.selected).length;
  const hasSelectedImages = selectedCount > 0;
  const hasConverted = images.some((img) => !!img.convertedBase64);

  return (
    <div className="min-h-screen bg-[#f7f7f4] text-[#0f171d]">
      <NavBar
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenHistory={() => setHistoryOpen(true)}
      />

      <Hero
        onConvertNowClick={scrollToMain}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
      />

      {/* Main Conversion Workspace */}
      <main ref={mainRef} className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Smart Clipboard Suggestion Banner */}
        <ClipboardBanner
          onConvertSuggested={(result) => handleSelectConversionFromNL(result)}
        />

        {/* Universal Unit & Currency Converter */}
        <UniversalConverter
          initialCategory={selectedCategory}
          selectedFromUnit={selectedFromUnit}
          selectedToUnit={selectedToUnit}
          initialValue={initialValue}
        />

        {/* Developer Utilities (Base64, UUID, JSON) */}
        <DevToolsCard />

        {/* Image Converter Section */}
        <div className="rounded-2xl border border-[#dde4da] bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#0d161c] text-white">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0d161c]">Image & Media Converter</h3>
              <p className="text-xs text-[#5d6870]">
                Private, browser-based WebP, JPEG, PNG, HEIC, and HEIF conversion.
              </p>
            </div>
          </div>

          <ConversionControls
            settings={conversionSettings}
            setSettings={setConversionSettings}
            onConvert={handleConvertImages}
            hasSelectedImages={hasSelectedImages}
            selectedCount={selectedCount}
          />

          <Dropzone onDrop={addImages} multiple />

          {images.length > 0 && (
            <div className="overflow-x-auto mt-6 rounded-lg border border-[#dde4da]">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-[#f4f6f2] text-[#40505a]">
                  <tr>
                    <th className="p-3 border-b w-12 text-center">Select</th>
                    <th className="p-3 border-b">File Name</th>
                    <th className="p-3 border-b">Status</th>
                    <th className="p-3 border-b">Converted File Name</th>
                    <th className="p-3 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {images.map((img) => {
                    const baseName = getBaseName(img.originalFileName);
                    const ext = conversionSettings.format;

                    let statusIcon;
                    let statusText;
                    if (img.isUploading) {
                      statusIcon = <FaSpinner className="animate-spin text-orange-500" />;
                      statusText = "Uploading...";
                    } else if (img.isLoading) {
                      statusIcon = <FaSpinner className="animate-spin text-blue-600" />;
                      statusText = "Converting...";
                    } else if (img.convertedBase64) {
                      statusIcon = <FaCheckCircle className="text-green-500" />;
                      statusText = "Converted";
                    } else {
                      statusIcon = <FaHourglass className="text-gray-400" />;
                      statusText = "Ready To Convert";
                    }

                    return (
                      <tr key={img.id} className="border-b border-[#eef1ec]">
                        <td className="p-3 text-center">
                          <input
                            type="checkbox"
                            checked={img.selected}
                            onChange={() => toggleSelectImage(img.id)}
                            className="h-4 w-4"
                            disabled={img.isUploading || img.isLoading}
                          />
                        </td>
                        <td className="p-3">{img.originalFileName}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            {statusIcon}
                            <span>{statusText}</span>
                          </div>
                        </td>
                        <td className="p-3">
                          {img.convertedBase64 ? `${baseName}.${ext}` : "N/A"}
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => removeImage(img.id)}
                            className="text-red-500 hover:text-red-600"
                            aria-label={`Remove ${img.originalFileName}`}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {images.length > 0 && (
            <div className="mt-4 flex justify-center">
              <button
                onClick={handleDownloadAllImages}
                disabled={!hasConverted}
                className={`px-6 py-2.5 rounded-xl font-semibold transition-colors text-white ${
                  hasConverted
                    ? "bg-[#42b719] hover:bg-[#349814]"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Download Converted Images
              </button>
            </div>
          )}
        </div>
      </main>

      <ConversionTable />
      <Features />
      <Footer />

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        onSelectConversion={(from, to, val) => {
          setSelectedCategory(from.category);
          setSelectedFromUnit(from);
          setSelectedToUnit(to);
          setInitialValue(val);
          scrollToMain();
        }}
      />

      {/* History Drawer */}
      <HistoryDrawer
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        onSelectHistoryItem={(item) => handleSelectHistoryItem(item)}
      />
    </div>
  );
}
