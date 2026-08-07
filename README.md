# Quick Convert — Fast, Secure & Private Image Converter

**Quick Convert** is a privacy-first, client-side image conversion application. All conversions happen directly in your browser using Web Workers and modern web technology—your files are never uploaded to any server.

---

## ⚡ Key Features

- **100% Client-Side Processing**: Your images stay on your device. Complete privacy and security.
- **Multi-Format Support**: Convert between **WebP**, **JPEG**, and **PNG**, as well as decoding **HEIC / HEIF** images.
- **Bulk Image Conversion**: Select and convert multiple files simultaneously.
- **Web Worker Acceleration**: Offloads conversion tasks to background Web Workers to keep the UI smooth and responsive.
- **Custom Quality & Resolution**: Adjust quality levels (High, Medium, Low) and resize output dimensions (Original, 75%, 50%, 25%).
- **ZIP Export**: Single images are downloaded directly; multiple converted files are bundled into a convenient `.zip` file.
- **Zero Server Overhead & Limits**: Conversion speed and capacity are determined by your own device's hardware.

---

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & PostCSS
- **Key Libraries**:
  - `heic2any` — Client-side HEIC/HEIF decoding
  - `react-dropzone` — Drag-and-drop file uploader
  - `jszip` & `file-saver` — Bulk file packaging and automatic download triggering
  - `react-icons` & `@heroicons/react` — Modern UI icons

---

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or yarn

### Installation & Local Running

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sajidhossain8272/plzwork.git
   cd plzwork
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Scripts

- `npm run dev`: Starts the Next.js dev server with Turbopack.
- `npm run build`: Compiles and builds the production application.
- `npm run start`: Runs the compiled production build locally.
- `npm run test`: Executes unit tests (e.g. `imageUtils.test.ts`).

---

## 📄 License

This project is licensed under the MIT License.
