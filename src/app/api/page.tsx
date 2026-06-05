"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function ApiDocsPage() {
  const [textSize, setTextSize] = useState("prose-lg");
  const [colorBlindMode, setColorBlindMode] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    return () => {
      if (utteranceRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleReadAloud = () => {
    const text = contentRef.current?.innerText || "";
    if (!text) return;
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      return;
    }
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    utteranceRef.current = u;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
    setIsReading(true);
    u.onend = () => setIsReading(false);
  };

  const toggleTextSize = () => {
    setTextSize((s) => (s === "prose-lg" ? "prose-xl" : s === "prose-xl" ? "prose-base" : "prose-lg"));
  };

  const toggleColorBlindMode = () => setColorBlindMode((v) => !v);

  // Derived lists / categories (scanned from repo)
  const pages = [
    { title: "Home", href: "/" },
    { title: "AI Alt Tag Generator", href: "/ai-alt-tag-generator" },
    { title: "Base64 Encoder/Decoder", href: "/base64-encoder-decoder" },
    { title: "JSON Formatter", href: "/json-formatter" },
    { title: "Password Generator", href: "/password-generator" },
    { title: "URL Encoder/Decoder", href: "/url-encoder-decoder" },
    { title: "UUID Generator", href: "/uuid-generator" },
    { title: "Quick Convert", href: "/quick-convert" },
    { title: "Blogs", href: "/blogs" },
    { title: "PDF Tools - Merge/Split/To Image/From Image", href: "/pdf-merge" },
    { title: "Image to PDF", href: "/image-to-pdf" },
    { title: "PDF to Image", href: "/pdf-to-image" },
  ];

  const components = [
    "AiCaptionGenerator",
    "AltTextLoadingAnimation",
    "Base64Tool",
    "ConversionControls",
    "ConversionTable",
    "Dropzone",
    "Features",
    "Footer",
    "Hero",
    "HeroBadge",
    "HeroTerminal",
    "ImagePreview",
    "JsonFormatterTool",
    "Loader",
    "Loading",
    "NavBar",
    "PasswordGeneratorTool",
    "ProUpgradeModal",
    "PricingSection",
    "QuickConvertTerminal",
    "ToolsExplorer",
    "UrlEncoderTool",
    "UuidGeneratorTool",
    "Donation",
    // PDF tools
    "PdfToImageTool",
    "MergePdfTool",
    "SplitPdfTool",
    "ImageToPdfTool",
  ];

  const dataFiles = ["src/data/tools.ts", "src/data/blogs.ts"];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold">Plzwork — Documentation & API</h1>
        <div className="flex gap-3 items-center">
          <button
            className="rounded border px-3 py-1 text-sm"
            onClick={toggleTextSize}
            aria-pressed={textSize !== "prose-lg"}
          >
            Text Size
          </button>
          <button
            className="rounded border px-3 py-1 text-sm"
            onClick={toggleColorBlindMode}
            aria-pressed={colorBlindMode}
          >
            Color-blind Mode
          </button>
          <button
            className="rounded border px-3 py-1 text-sm"
            onClick={handleReadAloud}
            aria-pressed={isReading}
          >
            {isReading ? "Stop Reading" : "Read Aloud"}
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        <nav aria-label="Documentation sections" className="md:col-span-1">
          <ul className="space-y-2 sticky top-24">
            <li>
              <a href="#overview" className="text-blue-600 hover:underline">
                Overview
              </a>
            </li>
            <li>
              <a href="#getting-started" className="text-blue-600 hover:underline">
                Getting Started
              </a>
            </li>
            <li>
              <a href="#tools" className="text-blue-600 hover:underline">
                Tools & Pages
              </a>
            </li>
            <li>
              <a href="#components" className="text-blue-600 hover:underline">
                Components
              </a>
            </li>
            <li>
              <a href="#data" className="text-blue-600 hover:underline">
                Data Files
              </a>
            </li>
            <li>
              <a href="#accessibility" className="text-blue-600 hover:underline">
                Accessibility
              </a>
            </li>
            <li>
              <a href="#release-notes" className="text-blue-600 hover:underline">
                Release Notes / Changelog
              </a>
            </li>
            <li>
              <a href="#contributing" className="text-blue-600 hover:underline">
                Contributing
              </a>
            </li>
          </ul>
        </nav>

        <article
          id="docs-content"
          ref={contentRef}
          className={`${textSize} md:col-span-3 prose max-w-none ${
            colorBlindMode ? "bg-white text-black" : ""
          }`}
          aria-labelledby="docs-title"
        >
          <section id="overview">
            <h2 id="docs-title">Overview</h2>
            <p>
              This documentation hub provides an overview of the Plzwork
              project, available tools, components, data sources, and
              accessibility features. Use the navigation at left to jump
              between sections. The site uses client-side tools and server
              metadata managed in the app router.
            </p>
          </section>

          <section id="getting-started">
            <h3>Getting Started</h3>
            <p>
              Requirements: Node.js (LTS), npm/yarn, and a modern browser. The
              project uses Next.js App Router and TailwindCSS. To run
              locally:
            </p>
            <pre>
              <code>npm install
npm run dev</code>
            </pre>
          </section>

          <section id="tools">
            <h3>Tools & Pages</h3>
            <p>These are the primary site pages and tools you can navigate to:</p>
            <ul>
              {pages.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="text-blue-600 hover:underline">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section id="components">
            <h3>Components</h3>
            <p>Reusable UI components and tools used across the site:</p>
            <ul>
              {components.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </section>

          <section id="data">
            <h3>Data Files</h3>
            <p>Data sources included in the repository:</p>
            <ul>
              {dataFiles.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </section>

          <section id="accessibility">
            <h3>Accessibility</h3>
            <p>
              We include basic accessibility helpers below:
            </p>
            <ul>
              <li>Read Aloud — uses browser SpeechSynthesis API.</li>
              <li>
                Color-blind Mode — applies a high-contrast, color-safe style to
                reduce reliance on color cues.
              </li>
              <li>Text size controls — increase/decrease for easier reading.</li>
              <li>Semantic HTML, ARIA labels and skip links where appropriate.</li>
            </ul>

            <h4>Notes for screen-reader users</h4>
            <p>
              The Read Aloud control will read the visible documentation
              content. For best results, use a modern browser with a good
              speech synthesis voice installed.
            </p>
          </section>

          <section id="release-notes">
            <h3>Release Notes / Changelog</h3>
            <p>
              Maintain a CHANGELOG.md in the repo root for release notes. Use
              semantic versioning for releases and include notable changes,
              bug fixes, and migration notes.
            </p>
          </section>

          <section id="contributing">
            <h3>Contributing</h3>
            <p>
              Guidelines: open issues for bugs/features, fork and submit PRs,
              and follow code style. Add tests for significant logic.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
