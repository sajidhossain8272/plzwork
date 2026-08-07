import { FormatRecommendation } from "../types";


/**
 * Intelligent format recommendation engine.
 */
export function recommendFormat(
  originalFormat: string,
  width: number,
  height: number,
  hasAlpha: boolean,
  fileName: string
): FormatRecommendation {
  const ext = originalFormat.toLowerCase();
  const lowerName = fileName.toLowerCase();

  // 1. Transparent Graphics
  if (hasAlpha && (ext === "png" || ext === "webp")) {
    return {
      recommendedFormat: "webp",
      title: "Recommended: WebP",
      reason: "Preserves full transparency with up to 30% smaller file size than PNG.",
    };
  }

  // 2. Screenshots & Technical Graphics
  if (
    lowerName.includes("screenshot") ||
    lowerName.includes("screen") ||
    lowerName.includes("capture")
  ) {
    return {
      recommendedFormat: "png",
      title: "Recommended: PNG",
      reason: "Lossless crispness ideal for UI text, vector shapes, and sharp screenshot details.",
    };
  }

  // 3. High Resolution Photography
  if (width >= 1920 || height >= 1080) {
    return {
      recommendedFormat: "avif",
      title: "Recommended: AVIF / WebP",
      reason: "Next-gen compression algorithm yields maximum size reduction for large photos.",
    };
  }

  // 4. Standard Photos
  if (ext === "jpeg" || ext === "jpg" || ext === "heic") {
    return {
      recommendedFormat: "webp",
      title: "Recommended: WebP",
      reason: "Modern image standard providing high visual quality with significantly lower bandwidth.",
    };
  }

  // Default fallback
  return {
    recommendedFormat: "webp",
    title: "Recommended: WebP",
    reason: "Best overall balance of compression efficiency, quality, and browser compatibility.",
  };
}
