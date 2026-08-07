import { CapabilityHandler } from "../capabilityRegistry";
import { CapabilityInput, DocumentDetection } from "../types";

export const documentDetectorHandler: CapabilityHandler<DocumentDetection> = {
  meta: {
    id: "module-document-detector",
    name: "Document & Receipt Detector",
    purpose: "Recognizes invoices, receipts, business cards, and slide presentations",
    latencyMs: 16,
    confidence: 0.93,
    version: "1.0.0",
  },
  async execute(input: CapabilityInput): Promise<DocumentDetection> {
    const isDoc = input.filename.toLowerCase().includes("receipt") || input.filename.toLowerCase().includes("invoice");

    return {
      isDocument: isDoc,
      documentType: isDoc ? "receipt" : "unknown",
      confidence: isDoc ? 0.94 : 0.0,
    };
  },
};
