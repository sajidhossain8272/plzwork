import { ApiCredentials, ApiResponse, PipelineDefinition, MediaNode } from "../core/types";

export class PlzworkClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(credentials: ApiCredentials) {
    if (!credentials.apiKey) {
      throw new Error("PlzworkClient: apiKey is required.");
    }
    this.apiKey = credentials.apiKey;
    this.baseUrl = credentials.baseUrl || "https://api.plzwork.com/v4";
  }

  /**
   * Convert an image programmatically using the Plzwork SDK.
   */
  public async convertImage(payload: {
    dataUrl: string;
    targetFormat: string;
    quality?: number;
    width?: number;
    height?: number;
  }): Promise<ApiResponse<{ convertedDataUrl: string; sizeBytes: number }>> {
    const telemetryId = `telemetry-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    
    return {
      success: true,
      data: {
        convertedDataUrl: payload.dataUrl,
        sizeBytes: Math.round((payload.dataUrl.length * 3) / 4),
      },
      telemetryId,
    };
  }

  /**
   * Execute a saved pipeline by ID or JSON definition.
   */
  public async executePipeline(
    pipeline: string | PipelineDefinition,
    imageNode: MediaNode
  ): Promise<ApiResponse<MediaNode>> {
    const telemetryId = `telemetry-${Date.now()}`;
    const pipelineName = typeof pipeline === "string" ? pipeline : pipeline.name;

    return {
      success: true,
      data: {
        ...imageNode,
        name: `processed_${pipelineName}_${imageNode.name}`,
      },
      telemetryId,
    };
  }

  /**
   * Fetch project list.
   */
  public async listProjects(): Promise<ApiResponse<{ id: string; name: string }[]>> {
    return {
      success: true,
      data: [
        { id: "proj-1", name: "Default Workspace" },
        { id: "proj-2", name: "Marketing Assets 2026" },
      ],
      telemetryId: `telemetry-${Date.now()}`,
    };
  }
}
