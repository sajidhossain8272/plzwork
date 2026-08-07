import { CapabilityRegistry } from "./capabilityRegistry";
import { CapabilityInput, AIAnalysisResult, ExecutionTrace } from "./types";

import { imageClassifierHandler } from "./modules/imageClassifier";
import { compressionAdvisorHandler } from "./modules/compressionAdvisor";
import { accessibilityInspectorHandler } from "./modules/accessibilityInspector";
import { visualQualityScorerHandler } from "./modules/visualQualityScorer";
import { duplicateFinderHandler } from "./modules/duplicateFinder";
import { colorIntelligenceHandler } from "./modules/colorIntelligence";
import { ocrIntelligenceHandler } from "./modules/ocrIntelligence";
import { documentDetectorHandler } from "./modules/documentDetector";
import { backgroundAnalyzerHandler } from "./modules/backgroundAnalyzer";
import { watermarkDetectorHandler } from "./modules/watermarkDetector";
import { exportAdvisorHandler } from "./modules/exportAdvisor";

// Auto-register modules on load
CapabilityRegistry.register(imageClassifierHandler);
CapabilityRegistry.register(compressionAdvisorHandler);
CapabilityRegistry.register(accessibilityInspectorHandler);
CapabilityRegistry.register(visualQualityScorerHandler);
CapabilityRegistry.register(duplicateFinderHandler);
CapabilityRegistry.register(colorIntelligenceHandler);
CapabilityRegistry.register(ocrIntelligenceHandler);
CapabilityRegistry.register(documentDetectorHandler);
CapabilityRegistry.register(backgroundAnalyzerHandler);
CapabilityRegistry.register(watermarkDetectorHandler);
CapabilityRegistry.register(exportAdvisorHandler);

export class AIRuntime {
  private static cache: Map<string, AIAnalysisResult> = new Map();

  /**
   * Executes local AI analysis across all specialized intelligence capabilities.
   */
  public static async analyzeImage(input: CapabilityInput): Promise<AIAnalysisResult> {
    const startTime = performance.now();
    const cacheKey = `${input.filename}_${input.width}x${input.height}_${input.sizeBytes}`;

    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey)!;
      return {
        ...cached,
        trace: {
          ...cached.trace,
          cacheHit: true,
        },
      };
    }

    const decisionLog: string[] = [];
    decisionLog.push(`[AIRuntime] Initializing local intelligence analysis for "${input.filename}"`);

    // Parallel execution of capabilities
    const [
      classification,
      compression,
      accessibility,
      quality,
      duplicate,
      colorPalette,
      ocr,
      document,
      background,
      watermark,
      exportProfiles,
    ] = await Promise.all([
      imageClassifierHandler.execute(input),
      compressionAdvisorHandler.execute(input),
      accessibilityInspectorHandler.execute(input),
      visualQualityScorerHandler.execute(input),
      duplicateFinderHandler.execute(input),
      colorIntelligenceHandler.execute(input),
      ocrIntelligenceHandler.execute(input),
      documentDetectorHandler.execute(input),
      backgroundAnalyzerHandler.execute(input),
      watermarkDetectorHandler.execute(input),
      exportAdvisorHandler.execute(input),
    ]);

    decisionLog.push(`[AIRuntime] Classified as "${classification.primaryCategory.toUpperCase()}" (${Math.round(classification.confidence * 100)}% confidence)`);
    decisionLog.push(`[AIRuntime] Compression recommendation: ${compression.recommendedFormat.toUpperCase()} (${compression.savedPercentage}% estimated size reduction)`);
    decisionLog.push(`[AIRuntime] Visual quality score: ${quality.overallScore}/100`);

    const durationMs = Math.round(performance.now() - startTime);

    const trace: ExecutionTrace = {
      timestamp: new Date().toISOString(),
      totalDurationMs: durationMs,
      capabilitiesRun: CapabilityRegistry.getAll().map((c) => c.id),
      decisionLog,
      cacheHit: false,
    };

    const result: AIAnalysisResult = {
      imageId: input.imageId,
      classification,
      compression,
      accessibility,
      quality,
      duplicate,
      colorPalette,
      ocr,
      document,
      background,
      watermark,
      exportProfiles,
      trace,
    };

    this.cache.set(cacheKey, result);
    return result;
  }
}
