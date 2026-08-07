"use client";

import React, { useState, useEffect } from "react";
import {
  Workflow,
  FolderGit2,
  Key,
  Activity,
  Plus,
  Play,
  CheckCircle2,
  Copy,
  Check,
  Code,
  Zap,
  Layers,
  FileText,
} from "lucide-react";

import { PipelineRunner } from "@/core/pipeline/pipelineRunner";
import { PipelineDefinition } from "@/core/types";
import { TelemetryCollector } from "@/core/telemetry/telemetryCollector";
import { ApiGateway } from "@/api/apiGateway";

export const V4PlatformSuite: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"pipeline" | "projects" | "sdk" | "health">("pipeline");

  // Pipeline Builder State
  const [pipelineSteps] = useState<
    { id: string; name: string; pluginId: string; stage: string }[]
  >([
    { id: "s1", name: "Dimension Resizer (800x600)", pluginId: "plugin-resize", stage: "resize" },
    { id: "s2", name: "Quality Optimizer (85%)", pluginId: "plugin-[#42b719]", stage: "optimize" },
    { id: "s3", name: "Privacy EXIF Stripper", pluginId: "plugin-metadata", stage: "metadata" },
  ]);
  const [pipelineLogs, setPipelineLogs] = useState<string[]>([]);
  const [isExecutingPipeline, setIsExecutingPipeline] = useState(false);

  // API Key & SDK State
  const [apiKey] = useState("plz_live_9f8a3b7c2e1d0a5b4c3d2e1f");
  const [keyCopied, setKeyCopied] = useState(false);
  const [openApiJson] = useState(() => JSON.stringify(ApiGateway.getOpenApiSpec(), null, 2));

  // Telemetry Events State
  const [telemetryEvents, setTelemetryEvents] = useState(TelemetryCollector.getEvents());

  useEffect(() => {
    const unsub = TelemetryCollector.subscribe(() => {
      setTelemetryEvents(TelemetryCollector.getEvents());
    });
    return () => unsub();
  }, []);

  /**
   * Execute sample pipeline workflow
   */
  const handleRunSamplePipeline = async () => {
    setIsExecutingPipeline(true);
    setPipelineLogs([]);

    TelemetryCollector.emit("pipeline.start", "pipeline", 0, { steps: pipelineSteps.length });

    const pipeline: PipelineDefinition = {
      id: "pip-demo",
      name: "Standard Web Optimization",
      steps: pipelineSteps.map((s) => ({
        pluginId: s.pluginId,
        stage: s.stage as "resize" | "crop" | "optimize" | "metadata" | "decode" | "analyze" | "transform" | "encode" | "export",
      })),
    };

    const dummyNode = {
      id: "img-demo",
      name: "sample_photo.jpg",
      mimeType: "image/jpeg",
      width: 1920,
      height: 1080,
      aspectRatio: "16:9",
      hasAlpha: false,
      sizeBytes: 1542000,
      dataUrl: "data:image/jpeg;base64,",
    };

    const dummyCtx = {
      jobId: `job-${Date.now()}`,
      startTime: Date.now(),
      stageLogs: [],
      targetFormat: "webp",
      targetQuality: 85,
      keepMetadata: false,
      telemetryId: `tel-${Date.now()}`,
    };

    const res = await PipelineRunner.runPipeline(pipeline, dummyNode, dummyCtx);
    setPipelineLogs(res.logs);
    setIsExecutingPipeline(false);

    TelemetryCollector.emit("pipeline.complete", "pipeline", 45, { outputSize: res.outputNode.sizeBytes });
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-[#dde4da] shadow-sm p-6 sm:p-8 space-y-6 mt-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-[#0d161c] text-[#42b719]">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#0d161c]">V4 Platform Suite</h2>
            <p className="text-xs text-[#5d6870] mt-0.5">
              FAANG-level Media Engine · Workflow Pipelines · Client SDK · Public API · Telemetry
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#d6ded2] bg-[#f8faf7] px-3.5 py-1.5 text-xs font-semibold text-[#30404a]">
            <span className="h-2 w-2 rounded-full bg-[#42b719]" />
            v4.0.0 Architecture Engine
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-100 pb-4">
        <button
          onClick={() => setActiveTab("pipeline")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition ${
            activeTab === "pipeline" ? "bg-[#0d161c] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          <Workflow className="w-4 h-4 text-[#42b719]" />
          <span>Pipeline Builder</span>
        </button>

        <button
          onClick={() => setActiveTab("projects")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition ${
            activeTab === "projects" ? "bg-[#0d161c] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          <FolderGit2 className="w-4 h-4 text-[#42b719]" />
          <span>Projects & Folders</span>
        </button>

        <button
          onClick={() => setActiveTab("sdk")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition ${
            activeTab === "sdk" ? "bg-[#0d161c] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          <Key className="w-4 h-4 text-[#42b719]" />
          <span>API Keys & SDK</span>
        </button>

        <button
          onClick={() => setActiveTab("health")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition ${
            activeTab === "health" ? "bg-[#0d161c] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          <Activity className="w-4 h-4 text-[#42b719]" />
          <span>System Health & Telemetry</span>
        </button>
      </div>

      {/* Tab 1: Pipeline Builder */}
      {activeTab === "pipeline" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#0d161c]">Visual Media Pipeline Runner</h3>
              <p className="text-xs text-gray-500">Chain automated media transforms into reusable JSON workflows</p>
            </div>

            <button
              onClick={handleRunSamplePipeline}
              disabled={isExecutingPipeline}
              className="px-5 py-2.5 bg-[#42b719] hover:bg-[#349814] text-white text-xs font-bold rounded-xl transition flex items-center gap-2"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>{isExecutingPipeline ? "Running Pipeline..." : "Execute Pipeline"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pipelineSteps.map((step, idx) => (
              <div key={step.id} className="p-4 bg-[#f8faf7] border border-[#e2e8e0] rounded-xl space-y-2 relative">
                <div className="flex items-center justify-between text-xs font-bold text-[#0d161c]">
                  <span>Step {idx + 1}: {step.stage.toUpperCase()}</span>
                  <span className="p-1 rounded bg-[#42b719]/10 text-[#42b719]"><Layers className="w-3.5 h-3.5" /></span>
                </div>
                <div className="text-sm font-semibold text-gray-800">{step.name}</div>
                <div className="text-[11px] text-gray-500 font-mono">Plugin: {step.pluginId}</div>
              </div>
            ))}
          </div>

          {pipelineLogs.length > 0 && (
            <div className="p-4 bg-gray-900 text-green-400 font-mono text-xs rounded-xl space-y-1">
              <div className="text-gray-400 font-semibold mb-2 border-b border-gray-800 pb-1">Execution Terminal Logs:</div>
              {pipelineLogs.map((log, idx) => (
                <div key={idx}>{log}</div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Projects & Folders */}
      {activeTab === "projects" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#0d161c]">Projects & Asset Organization</h3>
              <p className="text-xs text-gray-500">Organize assets into team workspaces, folders, and collections</p>
            </div>
            <button className="px-4 py-2 bg-[#0d161c] text-white text-xs font-bold rounded-xl hover:bg-gray-800 transition flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-[#42b719]" />
              <span>New Project</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 border border-gray-200 rounded-xl bg-gray-50 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-gray-900 text-sm">Marketing Assets 2026</h4>
                <span className="text-xs font-mono text-gray-500">12 Files</span>
              </div>
              <p className="text-xs text-gray-500">Web banners, social media thumbnails, and promo graphics.</p>
              <div className="text-[11px] text-[#42b719] font-medium pt-2">Updated 2 minutes ago</div>
            </div>

            <div className="p-5 border border-gray-200 rounded-xl bg-gray-50 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-gray-900 text-sm">E-Commerce Product Photos</h4>
                <span className="text-xs font-mono text-gray-500">48 Files</span>
              </div>
              <p className="text-xs text-gray-500">Optimized WebP catalog renders with transparent background fills.</p>
              <div className="text-[11px] text-[#42b719] font-medium pt-2">Updated 1 hour ago</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: API Keys & SDK */}
      {activeTab === "sdk" && (
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-bold text-[#0d161c]">API Authorization & SDK Integration</h3>
            <p className="text-xs text-gray-500">Headless API key access and official `@plzwork/sdk` client package</p>
          </div>

          {/* API Key Box */}
          <div className="p-4 bg-gray-900 text-white rounded-xl flex items-center justify-between font-mono text-xs">
            <div>
              <div className="text-gray-400 text-[10px] uppercase mb-1">Live Secret API Key</div>
              <span>{apiKey}</span>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(apiKey);
                setKeyCopied(true);
                setTimeout(() => setKeyCopied(false), 2000);
              }}
              className="p-2 rounded-lg bg-gray-800 text-gray-300 hover:text-white transition"
            >
              {keyCopied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Code Snippet */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
              <Code className="w-4 h-4 text-[#42b719]" />
              <span>TypeScript SDK Usage (`@plzwork/sdk`)</span>
            </div>
            <div className="p-4 bg-gray-900 text-green-400 font-mono text-xs rounded-xl overflow-x-auto">
              <pre>{`import { PlzworkClient } from "@plzwork/sdk";

const plzwork = new PlzworkClient({
  apiKey: "plz_live_9f8a3b7c2e1d0a5b4c3d2e1f",
});

const result = await plzwork.convertImage({
  dataUrl: "data:image/png;base64,...",
  targetFormat: "webp",
  quality: 85,
});

console.log("Converted Payload Size:", result.data.sizeBytes);`}</pre>
            </div>
          </div>

          {/* OpenAPI JSON */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
              <FileText className="w-4 h-4 text-[#42b719]" />
              <span>OpenAPI 3.0 JSON Specification</span>
            </div>
            <div className="p-4 bg-gray-900 text-gray-300 font-mono text-[11px] rounded-xl max-h-40 overflow-y-auto">
              <pre>{openApiJson}</pre>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: System Health & Telemetry */}
      {activeTab === "health" && (
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-bold text-[#0d161c]">Observability & Telemetry Health</h3>
            <p className="text-xs text-gray-500">Real-time event logging, worker metrics, and API health status</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-[#f8faf7] border border-[#e2e8e0] rounded-xl space-y-1">
              <div className="text-xs text-gray-500 font-medium">System Health</div>
              <div className="text-sm font-bold text-[#42b719] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> 100% Operational
              </div>
            </div>

            <div className="p-4 bg-[#f8faf7] border border-[#e2e8e0] rounded-xl space-y-1">
              <div className="text-xs text-gray-500 font-medium">Worker Cluster</div>
              <div className="text-sm font-bold text-gray-900">3 Online / 0 Idle</div>
            </div>

            <div className="p-4 bg-[#f8faf7] border border-[#e2e8e0] rounded-xl space-y-1">
              <div className="text-xs text-gray-500 font-medium">Telemetry Log Count</div>
              <div className="text-sm font-bold text-gray-900">{telemetryEvents.length} Events</div>
            </div>
          </div>

          {/* Telemetry Stream */}
          <div className="p-4 bg-gray-900 text-gray-300 font-mono text-xs rounded-xl space-y-2 max-h-48 overflow-y-auto">
            <div className="text-gray-400 font-semibold border-b border-gray-800 pb-1">Real-Time Telemetry Event Stream:</div>
            {telemetryEvents.length === 0 ? (
              <div className="text-gray-500">No telemetry events logged yet. Execute a pipeline or conversion to generate metrics.</div>
            ) : (
              telemetryEvents.map((evt) => (
                <div key={evt.id} className="flex items-center justify-between text-[11px] border-b border-gray-800/50 pb-1">
                  <span className="text-green-400">[{evt.timestamp.split("T")[1].slice(0, 8)}] {evt.eventName}</span>
                  <span className="text-gray-400">{evt.category} • {evt.durationMs || 0}ms</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
