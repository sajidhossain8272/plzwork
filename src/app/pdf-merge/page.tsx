import type { Metadata } from "next";
import MergePdfTool from "../components/pdf/MergePdfTool";

export const metadata: Metadata = {
  title: "Merge PDF Free Client-Side | Plzwork",
  description: "Combine multiple PDF files into one securely in your browser. Fast, free, and no server uploads. Your data stays completely private.",
  keywords: [
    "merge pdf",
    "combine pdf free",
    "merge pdf client side",
    "secure pdf merger",
    "no server pdf merge",
    "pdf merger online free",
    "combine pdf files online",
    "merge pdf locally",
    "Plzwork pdf tools",
  ],
  alternates: {
    canonical: "https://quick-convert-img.vercel.app/pdf-merge",
  },
  openGraph: {
    title: "Merge PDF Free Client-Side | Plzwork",
    description: "Combine multiple PDF files into one securely in your browser.",
    url: "https://quick-convert-img.vercel.app/pdf-merge",
    siteName: "Plzwork",
    locale: "en_US",
    type: "website",
  },
};

export default function MergePdfPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f4] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <MergePdfTool />
    </div>
  );
}
