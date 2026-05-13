"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import { FaTrash, FaArrowUpFromBracket, FaSpinner } from "react-icons/fa6";
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
import ProUpgradeModal from "../ProUpgradeModal";

interface ImageFile {
  id: string;
  file: File;
  base64: string;
}

const FREE_TIER_LIMIT = 5;

// Sortable Item Component
const SortableImageItem = ({ img, removeImg }: { img: ImageFile; removeImg: (id: string) => void }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: img.id });

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
        className={`flex items-center gap-4 bg-white p-2 rounded-lg border shadow-sm ${
          isDragging ? "border-blue-400 shadow-md" : "border-[#dde4da]"
        }`}
      >
        <div {...attributes} {...listeners} className="cursor-grab p-2 text-gray-400 hover:text-gray-600">
           {/* Hamburger icon using svg to avoid importing more icons if not needed */}
           <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="44" d="M112 184h288m-288 144h288"></path></svg>
        </div>
        <div className="w-16 h-16 rounded overflow-hidden bg-gray-100 flex-shrink-0 flex items-center justify-center">
             {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.base64} alt="preview" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 truncate">
          <p className="font-semibold text-gray-800 truncate text-sm">{img.file.name}</p>
        </div>
        <button
          onClick={() => removeImg(img.id)}
          className="text-red-500 hover:text-red-700 p-2"
          title="Remove"
        >
          <FaTrash />
        </button>
      </div>
    );
  };

export default function ImageToPdfTool() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showProModal, setShowProModal] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const onDrop = useCallback((acceptedFiles: File[]) => {

    const readers = acceptedFiles.map(
        (file) =>
          new Promise<ImageFile>((resolve, reject) => {
            if (!file.type.startsWith("image/")) {
              reject(new Error("Invalid file type. Please upload an image."));
              return;
            }
            const reader = new FileReader();
            reader.onload = () =>
              resolve({
                id: crypto.randomUUID(),
                file,
                base64: reader.result as string,
              });
            reader.onerror = reject;
            reader.readAsDataURL(file);
          })
      );

      Promise.all(readers)
        .then((newImages) => {
            setImages((prev) => {
                const combined = [...prev, ...newImages];
                if (combined.length > FREE_TIER_LIMIT) {
                    setShowProModal(true);
                    return combined.slice(0, FREE_TIER_LIMIT);
                }
                return combined;
            });
        })
        .catch((err) => console.error(err));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [], "image/png": [] }, // removed webp since pdf-lib doesn't natively support embedding it
    multiple: true,
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setImages((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
    });
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };


  const createPdf = async () => {
    if (images.length === 0) return;
    setIsProcessing(true);

    try {
      const pdfDoc = await PDFDocument.create();

      for (const imgItem of images) {
          const arrayBuffer = await imgItem.file.arrayBuffer();

          let image;
          if (imgItem.file.type === "image/png") {
              image = await pdfDoc.embedPng(arrayBuffer);
          } else if (imgItem.file.type === "image/jpeg" || imgItem.file.type === "image/jpg") {
              image = await pdfDoc.embedJpg(arrayBuffer);
          } else {
             // Webp or others not directly supported by pdf-lib might need conversion first.
             // To keep it simple, alert the user or skip.
             console.warn("Unsupported image type for direct PDF embed:", imgItem.file.type);
             continue;
          }

          const page = pdfDoc.addPage([image.width, image.height]);
          page.drawImage(image, {
              x: 0,
              y: 0,
              width: image.width,
              height: image.height,
          });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      saveAs(blob, "images_converted.pdf");

    } catch (e) {
      console.error(e);
      alert("Error creating PDF. Make sure you only uploaded JPG or PNG images.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-sm border border-[#dde4da]">
      <ProUpgradeModal
            isOpen={showProModal}
            onClose={() => setShowProModal(false)}
            featureName="converting more than 5 images at once"
        />

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#0d161c] mb-2">Image to PDF</h2>
        <p className="text-[#5d6870]">Convert JPG and PNG images into a single PDF document.</p>
      </div>

      {images.length === 0 ? (
        <div
          {...getRootProps()}
          className={`cursor-pointer rounded-xl border-2 border-dashed p-12 text-center transition-all relative
            ${isDragActive ? "border-[#42b719] bg-[#eefbe9]" : "border-[#cfd8cc] bg-gray-50 hover:border-[#9fc995]"}`}
        >
          <input {...getInputProps()} />
          <FaArrowUpFromBracket className={`h-12 w-12 mx-auto mb-4 ${isDragActive ? "text-[#42b719]" : "text-gray-400"}`} />
          <p className="text-lg font-medium text-gray-700">Drag & drop JPG/PNG images here</p>
          <p className="text-sm text-gray-500 mt-2">or click to browse files</p>
        </div>
      ) : (
        <div className="space-y-6 flex flex-col">

           <div className="bg-yellow-50 text-yellow-800 text-sm p-3 rounded-lg flex items-center justify-between border border-yellow-200">
            <span>Drag items to reorder them. {images.length} files selected.</span>
            <button {...getRootProps()} className="text-yellow-700 font-bold hover:underline">
              <input {...getInputProps()} />
              + Add More
            </button>
          </div>

          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={images.map((p) => p.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-2 max-h-[50vh] overflow-y-auto p-2 bg-gray-50 rounded-lg border border-gray-200">
                {images.map((img) => (
                  <SortableImageItem key={img.id} img={img} removeImg={removeImage} />
                ))}
              </div>
            </SortableContext>
          </DndContext>

          <button
            onClick={createPdf}
            disabled={isProcessing}
            className={`flex items-center gap-2 px-8 py-3 rounded-lg font-bold text-white transition-all w-full sm:w-auto self-center justify-center ${
                isProcessing ? "bg-red-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600 shadow-md hover:shadow-lg"
            }`}
          >
            {isProcessing ? (
              <>
                <FaSpinner className="animate-spin" /> Creating...
              </>
            ) : (
              "Convert to PDF"
            )}
          </button>
        </div>
      )}
    </div>
  );
}
