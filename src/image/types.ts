export type ImageFormat =
  | "png"
  | "jpeg"
  | "webp"
  | "avif"
  | "gif"
  | "bmp"
  | "tiff"
  | "ico"
  | "svg";

export type CompressionPreset = "lossless" | "balanced" | "max" | "custom";

export type ResizeMode =
  | "original"
  | "percentage"
  | "custom"
  | "longestEdge"
  | "shortestEdge";

export type TransparencyMode = "transparent" | "white" | "black" | "custom";

export interface ImageMetadata {
  width: number;
  height: number;
  aspectRatio: string;
  colorDepth: number;
  hasAlpha: boolean;
  fileSize: number;
  mimeType: string;
  exifTags?: Record<string, string>;
}

export interface ImageJob {
  id: string;
  file: File;
  name: string;
  originalFormat: string;
  originalSize: number;
  width: number;
  height: number;
  aspectRatio: string;
  hasAlpha: boolean;
  originalDataUrl: string;
  convertedDataUrl?: string;
  targetFormat: ImageFormat;
  targetQuality: number; // 1-100
  targetWidth: number;
  targetHeight: number;
  keepMetadata: boolean;
  backgroundColor: string; // hex or 'transparent'
  rotation?: number; // 0, 90, 180, 270
  flipHorizontal?: boolean;
  flipVertical?: boolean;
  grayscale?: boolean;
  status: "idle" | "converting" | "completed" | "error" | "paused";
  progress: number; // 0 - 100
  error?: string;
  estimatedSize?: number;
  savedPercentage?: number;
}

export interface FormatRecommendation {
  recommendedFormat: ImageFormat;
  title: string;
  reason: string;
}
