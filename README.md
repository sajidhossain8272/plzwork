# Plzwork — Tools That Actually Work

**Plzwork** is a suite of focused, high-performance, and privacy-first tools designed to streamline daily workflows for developers, designers, content creators, and power users. 

**Quick Convert** has been officially integrated and rebranded under the Plzwork banner, bringing along an array of new utility tools—including client-side PDF processors, developer utilities, and Gemini-powered AI assistants.

---

## 🛠️ The Plzwork Philosophy

1. **Client-Side Security**: Your files never leave your computer. All processing (image conversion, PDF merging/splitting, base64 encoding, JSON formatting, etc.) runs 100% in your browser.
2. **Speed & Efficiency**: Leverages modern web APIs, Web Workers, and high-performance client-side rendering (using Turbopack) for blazing-fast operations.
3. **Premium UX/UI**: Clean, aesthetic interfaces featuring curated dark-mode elements, smooth transitions, and responsive grid layouts.
4. **No Bloat, No Sign-ups**: Immediate access to tools without tedious registration walls or annoying tracking ads.

---

## 🧭 Live Tool Directory

Plzwork is structured into logical categories, enabling you to quickly find and launch the exact tool needed for your job.

### 🔄 Convert & PDF Tools
*   **Quick Convert (Image Converter)**: The core rebranded engine. Convert images individually or in bulk (PNG, WebP, JPEG, HEIC, etc.) with custom quality sliders and Web Worker scaling.
*   **Image to PDF**: Combine multiple images (JPG, PNG, WebP) into a single, beautifully compiled PDF document.
*   **PDF to Image**: Extract individual pages of any PDF into high-quality JPG or PNG image files.
*   **Merge PDF**: Securely stitch multiple PDF files together in your browser. Features drag-and-drop page reordering powered by `@dnd-kit`.
*   **Split PDF**: Extract specific pages or divide a PDF document into separate files instantly.

### 💻 Developer Utilities
*   **JSON Formatter**: Format, beautify, collapse, and validate complex JSON payloads.
*   **Base64 Encoder/Decoder**: Instantly convert text or raw files into Base64 format and vice versa.
*   **URL Encoder/Decoder**: Safely escape or unescape query parameters and URL strings.
*   **UUID Generator**: Instantly generate single or bulk RFC4122-compliant v4 UUIDs.
*   **Password Generator**: Create cryptographically secure, high-entropy passwords with custom toggles for length, symbols, numbers, and case formatting.

### 🤖 AI Workflows
*   **Alt-Text Generator**: Generate SEO-friendly, descriptive, and context-aware image alt-text using native **Google Gemini AI** integrations.

---

## 🚀 Tech Stack

Plzwork is built with a modern, high-performance web development stack:

*   **Framework**: [Next.js 15](https://nextjs.org/) (App Router, utilizing Turbopack dev compiler)
*   **Language**: [TypeScript](https://www.typescriptlang.org/) for robust static typing and reliable components
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & PostCSS
*   **Client-Side Libraries**:
    *   `pdf-lib` & `pdfjs-dist` — Client-side PDF generation, compilation, and rendering
    *   `heic2any` & `libheif-js` — Client-side Apple HEIC image decoding
    *   `react-dropzone` — Drag-and-drop file inputs
    *   `jszip` & `file-saver` — Bulk file packaging and exporting
    *   `@dnd-kit/core` & `@dnd-kit/sortable` — Fluid drag-and-drop interface ordering
*   **AI Integration**: `@google/genai` library connecting directly with Google's high-performance Gemini models

---

## 📦 Installation & Setup

Set up and run Plzwork locally on your machine in just a few steps:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18+ recommended) installed.

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/plzwork.git
   cd plzwork
   ```

2. **Install Dependencies**
   Using `npm`:
   ```bash
   npm install
   ```
   Or using `yarn`:
   ```bash
   yarn install
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file in the root directory to enable Analytics or AI-powered features:
   ```env
   # Google Gemini API Key (Required for the Alt-Text Generator)
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here

   # Google Analytics Measurement ID (Optional)
   NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_measurement_id
   ```

4. **Start the Development Server**
   Run the dev server with Turbopack for near-instant hot reloads:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to see Plzwork in action.

---

## 🛠️ Build & Deployment

To build the application for production:

```bash
npm run build
```

This compiles optimized client assets, builds static pages, and creates a highly-performant Next.js production bundle. You can preview the production build locally using:

```bash
npm run start
```

---

## 🔮 Roadmap / Coming Soon

Plzwork is actively evolving. Our target list of upcoming tools includes:
*   **Compress & Optimize**: Smart JPG/PNG compressors, JS/CSS minifiers, and SVG metadata cleaners.
*   **Design Tools**: CSS Gradient and Palette generators, App Icon resizers, and Open Graph share-card makers.
*   **Web Tools**: Website Screenshot capturing, Sitemap builders, and DNS record lookups.
*   **Pro Features**: Local automated folder-watching, advanced batch workflow scripting, and large file threshold limits up to 5GB.

---

## 📄 License

This project is licensed under the MIT License. Feel free to use, modify, and build upon it!
