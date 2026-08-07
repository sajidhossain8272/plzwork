export type ImageCategoryType =
  | "photograph"
  | "screenshot"
  | "document"
  | "receipt"
  | "whiteboard"
  | "logo"
  | "illustration"
  | "pixel_art"
  | "ui_screenshot"
  | "diagram"
  | "comic"
  | "meme"
  | "chart";

export interface AICapabilityMeta {
  id: string;
  name: string;
  purpose: string;
  latencyMs: number;
  confidence: number;
  version: string;
}

export interface CapabilityInput {
  imageId: string;
  filename: string;
  mimeType: string;
  dataUrl: string;
  width: number;
  height: number;
  sizeBytes: number;
  hasAlpha: boolean;
}

export interface ImageClassification {
  primaryCategory: ImageCategoryType;
  confidence: number;
  scores: Record<string, number>;
  explanation: string;
}

export interface CompressionRecommendation {
  recommendedFormat: string;
  estimatedSizeBytes: number;
  expectedQualityScore: number;
  savedPercentage: number;
  explanation: string;
}

export interface AccessibilityAudit {
  score: number;
  hasLowContrast: boolean;
  hasTinyText: boolean;
  isColorDependent: boolean;
  issues: string[];
  suggestions: string[];
}

export interface VisualQualityScore {
  overallScore: number; // 0 - 100
  sharpness: number;
  noise: number;
  artifacts: number;
  blur: number;
  exposure: number;
  contrast: number;
  explanations: string[];
}

export interface DuplicateMatch {
  perceptualHash: string;
  isExactDuplicate: boolean;
  isNearDuplicate: boolean;
  similarityPercentage: number;
}

export interface ColorPalette {
  dominantColors: string[];
  accentColor: string;
  brandColor?: string;
  paletteHex: string[];
  contrastRatio: number;
  isAccessibleOnDark: boolean;
}

export interface OcrResult {
  hasText: boolean;
  extractedText: string;
  detectedUrls: string[];
  detectedEmails: string[];
  confidence: number;
}

export interface DocumentDetection {
  isDocument: boolean;
  documentType: "invoice" | "receipt" | "business_card" | "certificate" | "passport" | "slide" | "unknown";
  confidence: number;
}

export interface BackgroundAnalysis {
  foregroundClarity: number;
  subjectPosition: "center" | "top" | "bottom" | "left" | "right";
  emptySpacePercentage: number;
  suggestCrop: boolean;
  suggestTransparency: boolean;
}

export interface WatermarkDetection {
  hasWatermark: boolean;
  location: "none" | "corner" | "center" | "repeated";
  confidence: number;
}

export interface ExportProfile {
  id: string;
  target: "website" | "print" | "instagram" | "linkedin" | "youtube_thumbnail" | "discord_emoji" | "presentation" | "wallpaper";
  format: string;
  width: number;
  height: number;
  quality: number;
  reason: string;
}

export interface AIAnalysisResult {
  imageId: string;
  classification: ImageClassification;
  compression: CompressionRecommendation;
  accessibility: AccessibilityAudit;
  quality: VisualQualityScore;
  duplicate: DuplicateMatch;
  colorPalette: ColorPalette;
  ocr: OcrResult;
  document: DocumentDetection;
  background: BackgroundAnalysis;
  watermark: WatermarkDetection;
  exportProfiles: ExportProfile[];
  trace: ExecutionTrace;
}

export interface ExecutionTrace {
  timestamp: string;
  totalDurationMs: number;
  capabilitiesRun: string[];
  decisionLog: string[];
  cacheHit: boolean;
}
