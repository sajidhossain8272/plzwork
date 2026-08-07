export type ProcessingStage =
  | "decode"
  | "analyze"
  | "transform"
  | "resize"
  | "crop"
  | "optimize"
  | "metadata"
  | "encode"
  | "export";

export interface MediaNode {
  id: string;
  name: string;
  mimeType: string;
  width: number;
  height: number;
  aspectRatio: string;
  hasAlpha: boolean;
  sizeBytes: number;
  dataUrl: string;
  canvas?: OffscreenCanvas | HTMLCanvasElement;
  metadata?: Record<string, unknown>;
}

export interface ProcessingContext {
  jobId: string;
  startTime: number;
  stageLogs: { stage: ProcessingStage; durationMs: number }[];
  targetFormat: string;
  targetQuality: number;
  keepMetadata: boolean;
  backgroundColor?: string;
  telemetryId: string;
}

export interface ProcessingPlugin {
  id: string;
  name: string;
  version: string;
  description: string;
  stage: ProcessingStage;
  execute: (node: MediaNode, ctx: ProcessingContext, options?: Record<string, unknown>) => Promise<MediaNode>;
}

export interface PipelineStep {
  pluginId: string;
  stage: ProcessingStage;
  options?: Record<string, unknown>;
}

export interface PipelineDefinition {
  id: string;
  name: string;
  description?: string;
  steps: PipelineStep[];
  isPublic?: boolean;
}

export interface TelemetryEvent {
  id: string;
  timestamp: string;
  eventName: string;
  category: "engine" | "api" | "pipeline" | "queue" | "sdk";
  durationMs?: number;
  payload?: Record<string, unknown>;
}

export interface ApiCredentials {
  apiKey: string;
  projectId?: string;
  organizationId?: string;
  baseUrl?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  telemetryId: string;
}
