import type { Metadata } from "next";
import ImageToPdfTool from "../components/pdf/ImageToPdfTool";

export const metadata: Metadata = {
  title: "Image to PDF Converter Free Private | Plzwork",
  description: "Convert JPG and PNG images to PDF instantly in your browser. No data leaves your device. Secure, fast, and completely free.",
  keywords: [
    "image to pdf",
    "jpg to pdf free",
    "png to pdf online",
    "convert images to pdf",
    "image to pdf client side",
    "secure image to pdf",
    "offline image to pdf",
    "bulk image to pdf",
    "combine images into pdf",
    "Plzwork tools",
  ],
  alternates: {
    canonical: "https://quick-convert-img.vercel.app/image-to-pdf",
  },
  openGraph: {
    title: "Image to PDF Converter Free Private | Plzwork",
    description: "Convert JPG and PNG images to PDF instantly in your browser.",
    url: "https://quick-convert-img.vercel.app/image-to-pdf",
    siteName: "Plzwork",
    locale: "en_US",
    type: "website",
  },
};

export default function ImageToPdfPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f4] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <ImageToPdfTool />
    </div>
  );
}
