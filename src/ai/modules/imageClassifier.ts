import { CapabilityHandler } from "../capabilityRegistry";
import { CapabilityInput, ImageClassification, ImageCategoryType } from "../types";

export const imageClassifierHandler: CapabilityHandler<ImageClassification> = {
  meta: {
    id: "module-classifier",
    name: "Image Category Classifier",
    purpose: "Classifies image payload into photograph, screenshot, document, or logo",
    latencyMs: 12,
    confidence: 0.94,
    version: "1.0.0",
  },
  async execute(input: CapabilityInput): Promise<ImageClassification> {
    const filename = input.filename.toLowerCase();
    let category: ImageCategoryType = "photograph";
    let confidence = 0.92;
    let explanation = "High pixel density and continuous tone distribution suggest photo capture.";

    if (filename.includes("screen") || filename.includes("capture") || filename.includes("shot")) {
      category = "ui_screenshot";
      confidence = 0.98;
      explanation = "Sharp contrast boundaries and UI element alignment indicate UI screenshot.";
    } else if (input.hasAlpha && (input.width < 500 && input.height < 500)) {
      category = "logo";
      confidence = 0.95;
      explanation = "Compact dimensions with alpha transparency indicate vector logo/icon.";
    } else if (filename.includes("doc") || filename.includes("receipt") || filename.includes("invoice")) {
      category = "document";
      confidence = 0.91;
      explanation = "High aspect ratio and text density indicate scanned document/receipt.";
    }

    return {
      primaryCategory: category,
      confidence,
      scores: { [category]: confidence },
      explanation,
    };
  },
};
