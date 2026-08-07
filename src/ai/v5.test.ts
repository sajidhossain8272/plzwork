import { describe, it, expect } from "vitest";
import { CapabilityRegistry } from "./capabilityRegistry";
import { AIRuntime } from "./aiRuntime";
import { CapabilityInput } from "./types";

describe("V5 Capability Registry", () => {
  it("should register and discover all 11 specialized AI capabilities", () => {
    const capabilities = CapabilityRegistry.getAll();
    expect(capabilities.length).toBe(11);
    expect(CapabilityRegistry.get("module-classifier")).toBeDefined();
    expect(CapabilityRegistry.get("module-compression")).toBeDefined();
    expect(CapabilityRegistry.get("module-accessibility")).toBeDefined();
  });
});

describe("V5 AI Runtime Pipeline", () => {
  it("should orchestrate analysis across all intelligence modules", async () => {
    const input: CapabilityInput = {
      imageId: "img-test-1",
      filename: "screenshot_ui.png",
      mimeType: "image/png",
      dataUrl: "data:image/png;base64,demo",
      width: 1920,
      height: 1080,
      sizeBytes: 850000,
      hasAlpha: true,
    };

    const res = await AIRuntime.analyzeImage(input);

    expect(res.classification.primaryCategory).toBe("ui_screenshot");
    expect(res.compression.recommendedFormat).toBe("webp");
    expect(res.quality.overallScore).toBeGreaterThan(0);
    expect(res.colorPalette.paletteHex.length).toBe(5);
    expect(res.exportProfiles.length).toBe(3);
    expect(res.trace.capabilitiesRun.length).toBe(11);
    expect(res.trace.totalDurationMs).toBeGreaterThanOrEqual(0);
  });
});
