import { IconType } from "react-icons";
import {
  FaExchangeAlt,
  FaCompress,
  FaCode,
  FaPaintBrush,
  FaGlobe,
  FaShareAlt,
  FaRobot,
  FaSmile,
  FaStar,
  FaImage,
  FaFilePdf,
  FaFileAlt,
  FaDatabase,
  FaCompressArrowsAlt,
  FaAlignLeft,
  FaLink,
  FaMagic,
  FaTerminal,
  FaLock,
  FaHashtag,
  FaQrcode,
  FaFont,
  FaPalette,
  FaCogs,
  FaFingerprint,
} from "react-icons/fa";

export type ToolStatus = "Live" | "Soon" | "Pro";

export interface ToolItem {
  id: string;
  name: string;
  description: string;
  category: string;
  subCategory?: string;
  status: ToolStatus;
  isPopular?: boolean;
  href: string;
  icon?: IconType;
}

export const CATEGORIES = [
  { id: "convert", name: "Convert Tools", icon: FaExchangeAlt },
  { id: "compress", name: "Compress & Optimize", icon: FaCompressArrowsAlt },
  { id: "dev", name: "Dev Tools", icon: FaCode },
  { id: "design", name: "Design Tools", icon: FaPaintBrush },
  { id: "web", name: "Web Tools", icon: FaGlobe },
  { id: "social", name: "Social & Content Tools", icon: FaShareAlt },
  { id: "ai", name: "AI Tools", icon: FaRobot },
  { id: "meme", name: "Meme / Viral Tools", icon: FaSmile },
  { id: "pro", name: "Pro Features", icon: FaStar },
];

export const TOOLS: ToolItem[] = [
  // --- CONVERT TOOLS ---
  { id: "img-jpg-png", name: "JPG to PNG", description: "Convert JPG images to PNG with transparency support.", category: "Convert Tools", subCategory: "Images", status: "Live", href: "/quick-convert", icon: FaImage },
  { id: "img-png-webp", name: "PNG to WebP", description: "Optimize PNGs to WebP format for faster web delivery.", category: "Convert Tools", subCategory: "Images", status: "Live", href: "/quick-convert", icon: FaImage },
  { id: "img-webp-jpg", name: "WebP to JPG", description: "Convert modern WebP back to universally supported JPG.", category: "Convert Tools", subCategory: "Images", status: "Live", href: "/quick-convert", icon: FaImage },
  { id: "img-svg-png", name: "SVG to PNG", description: "Rasterize vector SVG files into standard PNGs.", category: "Convert Tools", subCategory: "Images", status: "Soon", href: "#", icon: FaImage },
  { id: "img-avif", name: "AVIF Converter", description: "Convert to and from AVIF image format.", category: "Convert Tools", subCategory: "Images", status: "Soon", href: "#", icon: FaImage },
  { id: "img-heic", name: "HEIC Converter", description: "Convert Apple HEIC photos to JPG or PNG.", category: "Convert Tools", subCategory: "Images", status: "Live", href: "/quick-convert", icon: FaImage, isPopular: true },
  { id: "img-ico", name: "ICO Converter", description: "Create favicon ICO files from images.", category: "Convert Tools", subCategory: "Images", status: "Soon", href: "#", icon: FaImage },
  { id: "img-gif", name: "GIF Converter", description: "Convert video to GIF or GIF to video.", category: "Convert Tools", subCategory: "Images", status: "Soon", href: "#", icon: FaImage },

  { id: "pdf-img-pdf", name: "Image to PDF", description: "Combine images into a single PDF document.", category: "Convert Tools", subCategory: "PDF", status: "Soon", href: "#", icon: FaFilePdf },
  { id: "pdf-pdf-img", name: "PDF to Image", description: "Extract PDF pages into JPG or PNG images.", category: "Convert Tools", subCategory: "PDF", status: "Soon", href: "#", icon: FaFilePdf },
  { id: "pdf-merge", name: "Merge PDF", description: "Combine multiple PDFs into one.", category: "Convert Tools", subCategory: "PDF", status: "Soon", href: "#", icon: FaFilePdf, isPopular: true },
  { id: "pdf-split", name: "Split PDF", description: "Extract pages from your PDF file.", category: "Convert Tools", subCategory: "PDF", status: "Soon", href: "#", icon: FaFilePdf },
  { id: "pdf-compress", name: "Compress PDF", description: "Reduce PDF file size without losing quality.", category: "Convert Tools", subCategory: "PDF", status: "Soon", href: "#", icon: FaFilePdf },
  { id: "pdf-rotate", name: "Rotate PDF", description: "Rotate and save PDF pages permanently.", category: "Convert Tools", subCategory: "PDF", status: "Soon", href: "#", icon: FaFilePdf },
  { id: "pdf-unlock", name: "Unlock PDF", description: "Remove password protection from PDFs.", category: "Convert Tools", subCategory: "PDF", status: "Soon", href: "#", icon: FaLock },
  { id: "pdf-watermark", name: "Watermark PDF", description: "Add a watermark image or text to your PDF.", category: "Convert Tools", subCategory: "PDF", status: "Soon", href: "#", icon: FaFilePdf },

  { id: "doc-docx-pdf", name: "DOCX to PDF", description: "Convert Word documents to PDF.", category: "Convert Tools", subCategory: "Documents", status: "Soon", href: "#", icon: FaFileAlt },
  { id: "doc-ppt-pdf", name: "PPT to PDF", description: "Convert PowerPoint presentations to PDF.", category: "Convert Tools", subCategory: "Documents", status: "Soon", href: "#", icon: FaFileAlt },
  { id: "doc-excel-csv", name: "Excel to CSV", description: "Convert Excel spreadsheets to CSV text.", category: "Convert Tools", subCategory: "Documents", status: "Soon", href: "#", icon: FaFileAlt },
  { id: "doc-md-pdf", name: "Markdown to PDF", description: "Render Markdown files into PDF documents.", category: "Convert Tools", subCategory: "Documents", status: "Soon", href: "#", icon: FaFileAlt },
  { id: "doc-md-html", name: "Markdown to HTML", description: "Convert Markdown syntax to clean HTML.", category: "Convert Tools", subCategory: "Documents", status: "Soon", href: "#", icon: FaCode },

  { id: "data-json-yaml", name: "JSON to YAML", description: "Convert JSON objects to YAML format.", category: "Convert Tools", subCategory: "Code/Data", status: "Soon", href: "#", icon: FaDatabase },
  { id: "data-yaml-json", name: "YAML to JSON", description: "Convert YAML configurations to JSON.", category: "Convert Tools", subCategory: "Code/Data", status: "Soon", href: "#", icon: FaDatabase },
  { id: "data-csv-json", name: "CSV to JSON", description: "Convert CSV data arrays into JSON format.", category: "Convert Tools", subCategory: "Code/Data", status: "Soon", href: "#", icon: FaDatabase },
  { id: "data-xml-json", name: "XML to JSON", description: "Transform XML tags into a JSON tree.", category: "Convert Tools", subCategory: "Code/Data", status: "Soon", href: "#", icon: FaDatabase },

  // --- COMPRESS & OPTIMIZE ---
  { id: "comp-img-jpg", name: "Compress JPG", description: "Reduce JPG file size intelligently.", category: "Compress & Optimize", subCategory: "Images", status: "Soon", href: "#", icon: FaCompress, isPopular: true },
  { id: "comp-img-png", name: "Compress PNG", description: "Optimize PNGs with lossy or lossless compression.", category: "Compress & Optimize", subCategory: "Images", status: "Soon", href: "#", icon: FaCompress },
  { id: "comp-img-webp", name: "Lossless WebP optimizer", description: "Squeeze the last bytes out of your WebP files.", category: "Compress & Optimize", subCategory: "Images", status: "Soon", href: "#", icon: FaCompress },
  { id: "comp-img-bulk", name: "Bulk image optimizer", description: "Compress multiple images at once.", category: "Compress & Optimize", subCategory: "Images", status: "Soon", href: "#", icon: FaCompress },

  { id: "comp-code-js", name: "Minify JS", description: "Remove whitespace and comments from JS.", category: "Compress & Optimize", subCategory: "Code", status: "Soon", href: "#", icon: FaCode },
  { id: "comp-code-css", name: "Minify CSS", description: "Condense CSS stylesheets for production.", category: "Compress & Optimize", subCategory: "Code", status: "Soon", href: "#", icon: FaCode },
  { id: "comp-code-html", name: "Minify HTML", description: "Shrink HTML markup footprint.", category: "Compress & Optimize", subCategory: "Code", status: "Soon", href: "#", icon: FaCode },
  { id: "comp-code-beautify", name: "Beautify JS/CSS", description: "Format minified JS/CSS into readable code.", category: "Compress & Optimize", subCategory: "Code", status: "Soon", href: "#", icon: FaAlignLeft },

  { id: "comp-svg-opt", name: "SVG optimizer", description: "Clean up SVGs exported from design tools.", category: "Compress & Optimize", subCategory: "SVG", status: "Soon", href: "#", icon: FaMagic, isPopular: true },
  { id: "comp-svg-meta", name: "Remove metadata", description: "Strip EXIF and other metadata from images.", category: "Compress & Optimize", subCategory: "SVG", status: "Soon", href: "#", icon: FaCompress },
  { id: "comp-svg-clean", name: "Clean SVG", description: "Remove unused defs and tidy SVG paths.", category: "Compress & Optimize", subCategory: "SVG", status: "Soon", href: "#", icon: FaCompress },

  // --- DEV TOOLS ---
  { id: "dev-fmt-json", name: "JSON formatter", description: "Format and validate JSON payloads.", category: "Dev Tools", subCategory: "Formatting", status: "Live", href: "/json-formatter", icon: FaAlignLeft, isPopular: true },
  { id: "dev-fmt-xml", name: "XML formatter", description: "Pretty-print XML markup.", category: "Dev Tools", subCategory: "Formatting", status: "Soon", href: "#", icon: FaAlignLeft },
  { id: "dev-fmt-sql", name: "SQL formatter", description: "Format messy SQL queries into readable lines.", category: "Dev Tools", subCategory: "Formatting", status: "Soon", href: "#", icon: FaAlignLeft },
  { id: "dev-fmt-yaml", name: "YAML formatter", description: "Format and validate YAML files.", category: "Dev Tools", subCategory: "Formatting", status: "Soon", href: "#", icon: FaAlignLeft },
  { id: "dev-fmt-md", name: "Markdown preview", description: "Write and preview Markdown in real-time.", category: "Dev Tools", subCategory: "Formatting", status: "Soon", href: "#", icon: FaAlignLeft },

  { id: "dev-enc-base64", name: "Base64 encode/decode", description: "Convert text or files to and from Base64.", category: "Dev Tools", subCategory: "Encode/Decode", status: "Live", href: "/base64-encoder-decoder", icon: FaExchangeAlt, isPopular: true },
  { id: "dev-enc-url", name: "URL encode/decode", description: "Escape or unescape URL strings safely.", category: "Dev Tools", subCategory: "Encode/Decode", status: "Live", href: "/url-encoder-decoder", icon: FaLink },
  { id: "dev-enc-jwt", name: "JWT decoder", description: "Decode and inspect JSON Web Tokens locally.", category: "Dev Tools", subCategory: "Encode/Decode", status: "Soon", href: "#", icon: FaLock, isPopular: true },
  { id: "dev-enc-html", name: "HTML entity encoder", description: "Encode text into safe HTML entities.", category: "Dev Tools", subCategory: "Encode/Decode", status: "Soon", href: "#", icon: FaCode },

  { id: "dev-gen-uuid", name: "UUID generator", description: "Generate random UUIDs (v4) instantly.", category: "Dev Tools", subCategory: "Generation", status: "Live", href: "/uuid-generator", icon: FaFingerprint, isPopular: true },
  { id: "dev-gen-pwd", name: "Password generator", description: "Create strong, secure random passwords.", category: "Dev Tools", subCategory: "Generators", status: "Live", href: "/password-generator", icon: FaLock, isPopular: true },
  { id: "dev-gen-api", name: "API mock generator", description: "Generate fake API responses for testing.", category: "Dev Tools", subCategory: "Generators", status: "Soon", href: "#", icon: FaCogs },
  { id: "dev-gen-fjson", name: "Fake JSON generator", description: "Create mock JSON data with a schema.", category: "Dev Tools", subCategory: "Generators", status: "Soon", href: "#", icon: FaCogs },
  { id: "dev-gen-lorem", name: "Lorem ipsum", description: "Generate placeholder text paragraphs.", category: "Dev Tools", subCategory: "Generators", status: "Soon", href: "#", icon: FaAlignLeft },

  { id: "dev-api-rest", name: "REST API tester", description: "Send HTTP requests directly from the browser.", category: "Dev Tools", subCategory: "API", status: "Soon", href: "#", icon: FaGlobe },
  { id: "dev-api-curl", name: "CURL generator", description: "Build complex CURL commands visually.", category: "Dev Tools", subCategory: "API", status: "Soon", href: "#", icon: FaTerminal },
  { id: "dev-api-head", name: "Header viewer", description: "Inspect HTTP headers of any URL.", category: "Dev Tools", subCategory: "API", status: "Soon", href: "#", icon: FaGlobe },
  { id: "dev-api-ip", name: "IP checker", description: "Find out your public IP and location info.", category: "Dev Tools", subCategory: "API", status: "Soon", href: "#", icon: FaGlobe },

  { id: "dev-git-ign", name: "Gitignore generator", description: "Create .gitignore files for your stack.", category: "Dev Tools", subCategory: "Git", status: "Soon", href: "#", icon: FaCode },
  { id: "dev-git-readme", name: "README generator", description: "Build a beautiful README file quickly.", category: "Dev Tools", subCategory: "Git", status: "Soon", href: "#", icon: FaCode },
  { id: "dev-git-commit", name: "Commit message helper", description: "Format conventional commit messages.", category: "Dev Tools", subCategory: "Git", status: "Soon", href: "#", icon: FaTerminal },
  { id: "dev-git-lic", name: "License generator", description: "Choose and generate an OSS license.", category: "Dev Tools", subCategory: "Git", status: "Soon", href: "#", icon: FaCode },

  { id: "dev-reg-test", name: "Regex tester", description: "Test regular expressions against text.", category: "Dev Tools", subCategory: "Regex", status: "Soon", href: "#", icon: FaTerminal },
  { id: "dev-reg-build", name: "Regex builder", description: "Visually build regex patterns.", category: "Dev Tools", subCategory: "Regex", status: "Soon", href: "#", icon: FaTerminal },

  { id: "dev-time-unix", name: "Unix timestamp converter", description: "Convert Unix epoch times to human dates.", category: "Dev Tools", subCategory: "Time & Date", status: "Soon", href: "#", icon: FaCogs },
  { id: "dev-time-cron", name: "Cron expression generator", description: "Build cron schedule strings easily.", category: "Dev Tools", subCategory: "Time & Date", status: "Soon", href: "#", icon: FaCogs },
  { id: "dev-time-zone", name: "Timezone converter", description: "Convert times across multiple timezones.", category: "Dev Tools", subCategory: "Time & Date", status: "Soon", href: "#", icon: FaGlobe },

  // --- DESIGN TOOLS ---
  { id: "des-col-pal", name: "Palette generator", description: "Generate beautiful color palettes.", category: "Design Tools", subCategory: "Colors", status: "Soon", href: "#", icon: FaPalette },
  { id: "des-col-grad", name: "Gradient generator", description: "Create smooth CSS gradients visually.", category: "Design Tools", subCategory: "Colors", status: "Soon", href: "#", icon: FaPalette },
  { id: "des-col-hex", name: "HEX ↔ RGB", description: "Convert colors between HEX and RGB formats.", category: "Design Tools", subCategory: "Colors", status: "Soon", href: "#", icon: FaPalette },
  { id: "des-col-cont", name: "Contrast checker", description: "Check text contrast against WCAG standards.", category: "Design Tools", subCategory: "Colors", status: "Soon", href: "#", icon: FaPalette },

  { id: "des-ass-fav", name: "Favicon generator", description: "Generate multi-size favicons from images.", category: "Design Tools", subCategory: "Assets", status: "Soon", href: "#", icon: FaImage },
  { id: "des-ass-icon", name: "App icon generator", description: "Resize icons for iOS and Android.", category: "Design Tools", subCategory: "Assets", status: "Soon", href: "#", icon: FaImage },
  { id: "des-ass-og", name: "Open Graph image maker", description: "Design social share cards easily.", category: "Design Tools", subCategory: "Assets", status: "Soon", href: "#", icon: FaImage },
  { id: "des-ass-banner", name: "Social banner generator", description: "Create perfectly sized social media banners.", category: "Design Tools", subCategory: "Assets", status: "Soon", href: "#", icon: FaImage },

  { id: "des-typ-pair", name: "Font pairing tool", description: "Find Google Fonts that work well together.", category: "Design Tools", subCategory: "Typography", status: "Soon", href: "#", icon: FaFont },
  { id: "des-typ-css", name: "CSS typography generator", description: "Generate CSS for responsive text.", category: "Design Tools", subCategory: "Typography", status: "Soon", href: "#", icon: FaFont },

  { id: "des-ui-glass", name: "Glassmorphism generator", description: "Create frosted glass CSS effects.", category: "Design Tools", subCategory: "UI/UX", status: "Soon", href: "#", icon: FaPaintBrush },
  { id: "des-ui-shad", name: "Shadow generator", description: "Design soft, layered box shadows.", category: "Design Tools", subCategory: "UI/UX", status: "Soon", href: "#", icon: FaPaintBrush },
  { id: "des-ui-bord", name: "Border radius generator", description: "Create complex blob shapes.", category: "Design Tools", subCategory: "UI/UX", status: "Soon", href: "#", icon: FaPaintBrush },
  { id: "des-ui-btn", name: "CSS button generator", description: "Design buttons and copy the CSS.", category: "Design Tools", subCategory: "UI/UX", status: "Soon", href: "#", icon: FaPaintBrush },

  // --- WEB TOOLS ---
  { id: "web-ss", name: "Website screenshot", description: "Capture full-page screenshots of URLs.", category: "Web Tools", status: "Soon", href: "#", icon: FaGlobe },
  { id: "web-meta", name: "Meta tag preview", description: "See how your site looks in Google search.", category: "Web Tools", status: "Soon", href: "#", icon: FaGlobe },
  { id: "web-og", name: "OG preview", description: "Preview social media share cards.", category: "Web Tools", status: "Soon", href: "#", icon: FaGlobe },
  { id: "web-robots", name: "Robots.txt generator", description: "Generate valid robots.txt files.", category: "Web Tools", status: "Soon", href: "#", icon: FaGlobe },
  { id: "web-sitemap", name: "Sitemap generator", description: "Build XML sitemaps for your website.", category: "Web Tools", status: "Soon", href: "#", icon: FaGlobe },
  { id: "web-dns", name: "DNS checker", description: "Look up DNS records for a domain.", category: "Web Tools", status: "Soon", href: "#", icon: FaGlobe },
  { id: "web-ssl", name: "SSL checker", description: "Verify SSL certificate validity.", category: "Web Tools", status: "Soon", href: "#", icon: FaGlobe },

  // --- SOCIAL & CONTENT TOOLS ---
  { id: "soc-qr", name: "QR code generator", description: "Create custom QR codes with logos.", category: "Social & Content Tools", status: "Soon", href: "#", icon: FaQrcode, isPopular: true },
  { id: "soc-link", name: "Link shortener", description: "Shorten long URLs tracking clicks.", category: "Social & Content Tools", status: "Soon", href: "#", icon: FaLink },
  { id: "soc-bio", name: "Bio link generator", description: "Create a simple link-in-bio page.", category: "Social & Content Tools", status: "Soon", href: "#", icon: FaLink },
  { id: "soc-hash", name: "Hashtag generator", description: "Generate relevant hashtags for posts.", category: "Social & Content Tools", status: "Soon", href: "#", icon: FaHashtag },
  { id: "soc-thumb", name: "Thumbnail resizer", description: "Resize images for YouTube thumbnails.", category: "Social & Content Tools", status: "Soon", href: "#", icon: FaImage },

  // --- AI TOOLS ---
  { id: "ai-alt-text", name: "Alt-Text Generator", description: "Generate SEO-friendly alt-text descriptions.", category: "AI Tools", subCategory: "Design AI", status: "Live", href: "/ai-alt-tag-generator", icon: FaRobot, isPopular: true },
  { id: "ai-err", name: "Error explainer", description: "Paste an error trace and let AI explain it.", category: "AI Tools", subCategory: "Dev AI", status: "Soon", href: "#", icon: FaRobot },
  { id: "ai-reg", name: "Regex generator", description: "Describe a pattern, get the regex.", category: "AI Tools", subCategory: "Dev AI", status: "Soon", href: "#", icon: FaRobot },
  { id: "ai-sql", name: "SQL query helper", description: "Write SQL queries in plain English.", category: "AI Tools", subCategory: "Dev AI", status: "Soon", href: "#", icon: FaRobot },
  { id: "ai-commit", name: "Commit message AI", description: "AI suggests commit messages from a diff.", category: "AI Tools", subCategory: "Dev AI", status: "Soon", href: "#", icon: FaRobot },
  { id: "ai-pal", name: "Palette AI", description: "Generate a color scheme from a prompt.", category: "AI Tools", subCategory: "Design AI", status: "Soon", href: "#", icon: FaRobot },
  { id: "ai-bg", name: "Background remover", description: "Remove backgrounds from photos using AI.", category: "AI Tools", subCategory: "Design AI", status: "Soon", href: "#", icon: FaRobot },
  { id: "ai-enh", name: "Image enhancer", description: "Upscale and enhance low-res images.", category: "AI Tools", subCategory: "Design AI", status: "Soon", href: "#", icon: FaRobot },

  // --- MEME / VIRAL TOOLS ---
  { id: "meme-why", name: "Why is this broken?", description: "Get a funny, fake technical reason your code is broken.", category: "Meme / Viral Tools", status: "Soon", href: "#", icon: FaSmile },
  { id: "meme-exc", name: "StackOverflow excuse generator", description: "Generate standard excuses for failing code.", category: "Meme / Viral Tools", status: "Soon", href: "#", icon: FaSmile },
  { id: "meme-term", name: "Fake hacker terminal", description: "Look busy typing random 'hacker' code.", category: "Meme / Viral Tools", status: "Soon", href: "#", icon: FaTerminal },
  { id: "meme-load", name: "Loading screen generator", description: "Create funny fake loading bars.", category: "Meme / Viral Tools", status: "Soon", href: "#", icon: FaSmile },
  { id: "meme-works", name: "\"Works on my machine\" generator", description: "Generate a badge proving it worked on your PC.", category: "Meme / Viral Tools", status: "Soon", href: "#", icon: FaSmile },

  // --- PRO FEATURES ---
  { id: "pro-batch", name: "Batch processing", description: "Process hundreds of files at once.", category: "Pro Features", status: "Pro", href: "#", icon: FaStar },
  { id: "pro-api", name: "API access", description: "Integrate our tools directly via API.", category: "Pro Features", status: "Pro", href: "#", icon: FaCode },
  { id: "pro-hist", name: "History sync", description: "Save and sync your conversion history.", category: "Pro Features", status: "Pro", href: "#", icon: FaDatabase },
  { id: "pro-team", name: "Team workspace", description: "Share presets and history with your team.", category: "Pro Features", status: "Pro", href: "#", icon: FaStar },
  { id: "pro-large", name: "Large files", description: "Lift file size limits up to 5GB.", category: "Pro Features", status: "Pro", href: "#", icon: FaStar },
  { id: "pro-auto", name: "Automation", description: "Set up watch folders and auto-workflows.", category: "Pro Features", status: "Pro", href: "#", icon: FaCogs },
];
