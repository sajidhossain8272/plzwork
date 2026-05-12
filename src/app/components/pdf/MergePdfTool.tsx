"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaFilePdf, FaTrash, FaGripVertical, FaArrowUpFromBracket, FaSpinner } from "react-icons/fa6";
import ProUpgradeModal from "../ProUpgradeModal";

interface PdfFile {
  id: string;
  file: File;
  previewUrl: string | null;
}

const FREE_TIER_LIMIT = 3; // Maximum PDFs allowed in free tier

// Sortable Item Component
const SortablePdfItem = ({ pdf, removePdf }: { pdf: PdfFile; removePdf: (id: string) => void }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: pdf.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-4 bg-white p-4 rounded-lg border shadow-sm ${
        isDragging ? "border-blue-400 shadow-md" : "border-[#dde4da]"
      }`}
    >
      <div {...attributes} {...listeners} className="cursor-grab p-2 text-gray-400 hover:text-gray-600">
        <FaGripVertical />
      </div>
      <div className="text-red-500 bg-red-50 p-3 rounded-lg">
        <FaFilePdf size={24} />
      </div>
      <div className="flex-1 truncate">
        <p className="font-semibold text-gray-800 truncate">{pdf.file.name}</p>
        <p className="text-xs text-gray-500">{(pdf.file.size / 1024 / 1024).toFixed(2)} MB</p>
      </div>
      <button
        onClick={() => removePdf(pdf.id)}
        className="text-red-500 hover:text-red-700 p-2"
        title="Remove"
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default function MergePdfTool() {
  const [pdfs, setPdfs] = useState<PdfFile[]>([]);
  const [isMerging, setIsMerging] = useState(false);
  const [showProModal, setShowProModal] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setPdfs((prev) => {
      const newFiles = acceptedFiles.map((file) => ({
        id: crypto.randomUUID(),
        file,
        previewUrl: null, // Full rendering is complex, keeping simple icon representation
      }));
      const combined = [...prev, ...newFiles];

      // Pro Tier check
      if (combined.length > FREE_TIER_LIMIT) {
        setShowProModal(true);
        return combined.slice(0, FREE_TIER_LIMIT);
      }
      return combined;
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: true,
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setPdfs((items) => {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  const removePdf = (id: string) => {
    setPdfs((prev) => prev.filter((pdf) => pdf.id !== id));
  };

  const mergePdfs = async () => {
    if (pdfs.length < 2) return;
    setIsMerging(true);
    try {
      const mergedPdf = await PDFDocument.create();

      for (const pdfItem of pdfs) {
        const arrayBuffer = await pdfItem.file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfFile = await mergedPdf.save();
      const blob = new Blob([mergedPdfFile], { type: "application/pdf" });
      saveAs(blob, "merged-document.pdf");
    } catch (error) {
      console.error("Failed to merge PDFs", error);
      alert("Error merging PDFs. Please check your files.");
    } finally {
      setIsMerging(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-sm border border-[#dde4da]">

      <ProUpgradeModal
        isOpen={showProModal}
        onClose={() => setShowProModal(false)}
        featureName="merging more than 3 PDFs"
      />

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#0d161c] mb-2">Merge PDF</h2>
        <p className="text-[#5d6870]">Combine multiple PDFs into a single document entirely in your browser.</p>
      </div>

      {pdfs.length === 0 ? (
        <div
          {...getRootProps()}
          className={`cursor-pointer rounded-xl border-2 border-dashed p-12 text-center transition-all
            ${isDragActive ? "border-[#42b719] bg-[#eefbe9]" : "border-[#cfd8cc] bg-gray-50 hover:border-[#9fc995]"}`}
        >
          <input {...getInputProps()} />
          <FaArrowUpFromBracket className={`h-12 w-12 mx-auto mb-4 ${isDragActive ? "text-[#42b719]" : "text-gray-400"}`} />
          <p className="text-lg font-medium text-gray-700">Drag & drop PDFs here</p>
          <p className="text-sm text-gray-500 mt-2">or click to browse files</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-blue-50 text-blue-800 text-sm p-3 rounded-lg flex items-center justify-between border border-blue-100">
            <span>Drag items to reorder them. {pdfs.length} files selected.</span>
            <button {...getRootProps()} className="text-blue-600 font-semibold hover:underline">
              <input {...getInputProps()} />
              + Add More
            </button>
          </div>

          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={pdfs.map((p) => p.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-3 max-h-[50vh] overflow-y-auto p-2">
                {pdfs.map((pdf) => (
                  <SortablePdfItem key={pdf.id} pdf={pdf} removePdf={removePdf} />
                ))}
              </div>
            </SortableContext>
          </DndContext>

          <div className="flex justify-center pt-4 border-t border-gray-100">
            <button
              onClick={mergePdfs}
              disabled={pdfs.length < 2 || isMerging}
              className={`flex items-center gap-2 px-8 py-3 rounded-lg font-bold text-white transition-all ${
                pdfs.length < 2
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600 shadow-md hover:shadow-lg"
              }`}
            >
              {isMerging ? (
                <>
                  <FaSpinner className="animate-spin" /> Merging...
                </>
              ) : (
                "Merge PDFs"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
