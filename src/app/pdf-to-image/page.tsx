import type { Metadata } from "next";
import PdfToImageTool from "../components/pdf/PdfToImageTool";

export const metadata: Metadata = {
  title: "PDF to Image Converter Free Private | Plzwork",
  description: "Extract PDF pages into JPG or PNG images instantly in your browser. No data leaves your device. Secure, fast, and completely free.",
  keywords: [
    "pdf to image",
    "pdf to jpg free",
    "pdf to png online",
    "extract pdf pages",
    "pdf to image client side",
    "secure pdf to image",
    "offline pdf to image",
    "Plzwork tools",
  ],
  alternates: {
    canonical: "https://quick-convert-img.vercel.app/pdf-to-image",
  },
  openGraph: {
    title: "PDF to Image Converter Free Private | Plzwork",
    description: "Extract PDF pages into JPG or PNG images instantly in your browser.",
    url: "https://quick-convert-img.vercel.app/pdf-to-image",
    siteName: "Plzwork",
    locale: "en_US",
    type: "website",
  },
};

export default function PdfToImagePage() {
  return (
    <div className="min-h-screen bg-[#f7f7f4] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <PdfToImageTool />
    </div>
  );
}
