import { describe, it, expect } from "vitest";
import { PluginRegistry } from "./engine/pluginRegistry";
import { ProcessingEngine } from "./engine/processingEngine";
import { PipelineRunner } from "./pipeline/pipelineRunner";
import { PlzworkClient } from "../sdk/clientSdk";
import { ApiGateway } from "../api/apiGateway";
import { TelemetryCollector } from "./telemetry/telemetryCollector";
import { MediaNode, ProcessingContext, PipelineDefinition } from "./types";

describe("V4 Core Processing Engine", () => {
  it("should discover registered transformation plugins", () => {
    const plugins = PluginRegistry.getAll();
    expect(plugins.length).toBeGreaterThanOrEqual(6);
    expect(PluginRegistry.get("plugin-resize")).toBeDefined();
  });

  it("should process media node through engine stage pipeline", async () => {
    const node: MediaNode = {
      id: "m-1",
      name: "banner.png",
      mimeType: "image/png",
      width: 1000,
      height: 500,
      aspectRatio: "2:1",
      hasAlpha: true,
      sizeBytes: 500000,
      dataUrl: "data:image/png;base64,demo",
    };

    const ctx: ProcessingContext = {
      jobId: "job-test",
      startTime: Date.now(),
      stageLogs: [],
      targetFormat: "webp",
      targetQuality: 85,
      keepMetadata: false,
      backgroundColor: "#ffffff",
      telemetryId: "tel-test",
    };

    const res = await ProcessingEngine.execute(node, ctx);
    expect(res.resultNode).toBeDefined();
    expect(res.context.stageLogs.length).toBeGreaterThan(0);
  });
});

describe("V4 Pipeline Runner", () => {
  it("should execute JSON workflow pipeline", async () => {
    const pipeline: PipelineDefinition = {
      id: "pipe-1",
      name: "Test Pipeline",
      steps: [
        { pluginId: "plugin-resize", stage: "resize", options: { scale: 0.5 } },
        { pluginId: "plugin-compress", stage: "optimize", options: { quality: 80 } },
        { pluginId: "plugin-metadata", stage: "metadata" },
      ],
    };

    const node: MediaNode = {
      id: "m-2",
      name: "input.png",
      mimeType: "image/png",
      width: 2000,
      height: 1000,
      aspectRatio: "2:1",
      hasAlpha: false,
      sizeBytes: 1000000,
      dataUrl: "data:image/png;base64,demo",
    };

    const ctx: ProcessingContext = {
      jobId: "job-pipe",
      startTime: Date.now(),
      stageLogs: [],
      targetFormat: "webp",
      targetQuality: 85,
      keepMetadata: false,
      telemetryId: "tel-pipe",
    };

    const res = await PipelineRunner.runPipeline(pipeline, node, ctx);
    expect(res.outputNode.width).toBe(1000);
    expect(res.outputNode.height).toBe(500);
    expect(res.logs.length).toBeGreaterThan(0);
  });
});

describe("V4 SDK & API Gateway", () => {
  it("should initialize SDK client and convert image payload", async () => {
    const client = new PlzworkClient({ apiKey: "plz_test_key_12345" });
    const res = await client.convertImage({
      dataUrl: "data:image/png;base64,test",
      targetFormat: "webp",
      quality: 90,
    });

    expect(res.success).toBe(true);
    expect(res.data?.convertedDataUrl).toBeDefined();
  });

  it("should generate OpenAPI 3.0 JSON specification", () => {
    const spec = ApiGateway.getOpenApiSpec();
    expect(spec.openapi).toBe("3.0.3");
  });

  it("should return health check telemetry status", () => {
    const health = ApiGateway.handleHealthCheck();
    expect(health.success).toBe(true);
    expect(health.data?.status).toBe("HEALTHY");
  });
});

describe("V4 Telemetry Collector", () => {
  it("should emit and subscribe to metrics", () => {
    let capturedEvt = null;
    TelemetryCollector.subscribe((evt) => {
      capturedEvt = evt;
    });

    TelemetryCollector.emit("test.metric", "engine", 10, { info: "ok" });
    expect(capturedEvt).not.toBeNull();
  });
});
