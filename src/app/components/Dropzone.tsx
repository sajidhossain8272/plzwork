"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FaArrowUpFromBracket } from "react-icons/fa6";

interface DropzoneProps {
  onDrop: (fileData: { base64: string; fileName: string }[]) => void;
  multiple?: boolean;
}

export default function Dropzone({ onDrop, multiple = false }: DropzoneProps) {
  const onDropCallback = useCallback(
    (acceptedFiles: File[]) => {
      const readers = acceptedFiles.map(
        (file) =>
          new Promise<{ base64: string; fileName: string }>((resolve, reject) => {
            // Validate that it's an image
            if (!file.type.startsWith("image/") && !file.type.startsWith("image/heic") && !file.type.startsWith("image/heif")) {
              reject(new Error("Invalid file type. Please upload an image."));
              return;
            }
            const reader = new FileReader();
            reader.onload = () =>
              resolve({
                base64: reader.result as string,
                fileName: file.name,
              });
            reader.onerror = reject;
            reader.readAsDataURL(file);
          })
      );

      Promise.all(readers)
        .then((files) => onDrop(files))
        .catch((err) => console.error(err));
    },
    [onDrop]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropCallback,
    accept: { "image/*": [], "image/heic": [], "image/heif": [] },
    multiple,
  });

  return (
    <div
      {...getRootProps()}
      className={`mb-8 cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-all
        ${
          isDragActive
            ? "border-[#42b719] bg-[#eefbe9]"
            : "border-[#cfd8cc] bg-white hover:border-[#9fc995]"
        }`}
    >
      <input {...getInputProps()} />
      <div className="space-y-4">
        <FaArrowUpFromBracket
          className={`h-12 w-12 mx-auto ${
            isDragActive ? "text-[#42b719]" : "text-[#8d9990]"
          }`}
        />
        <p className="text-[#48565f]">
          {isDragActive
            ? "Drop the images here"
            : "Drag & drop images, or click to select"}
        </p>
        <p className="text-sm text-[#6a757c]">
          You can upload a single image or multiple images in one go.
        </p>
      </div>
    </div>
  );
}
