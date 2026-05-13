import type { Metadata } from "next";
import SplitPdfTool from "../components/pdf/SplitPdfTool";

export const metadata: Metadata = {
  title: "Split PDF Free Fast & Secure | Plzwork",
  description: "Extract pages or separate your PDF into multiple files right in your browser. 100% private, fast, and free PDF splitting.",
  keywords: [
    "split pdf",
    "extract pdf pages",
    "separate pdf pages free",
    "split pdf client side",
    "secure pdf splitter",
    "no server pdf split",
    "split pdf locally",
    "cut pdf files",
    "divide pdf",
    "Plzwork pdf tools",
  ],
  alternates: {
    canonical: "https://quick-convert-img.vercel.app/pdf-split",
  },
  openGraph: {
    title: "Split PDF Free Fast & Secure | Plzwork",
    description: "Extract pages or separate your PDF into multiple files right in your browser.",
    url: "https://quick-convert-img.vercel.app/pdf-split",
    siteName: "Plzwork",
    locale: "en_US",
    type: "website",
  },
};

export default function SplitPdfPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f4] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <SplitPdfTool />
    </div>
  );
}
