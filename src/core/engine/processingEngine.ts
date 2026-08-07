import { MediaNode, ProcessingContext, ProcessingStage } from "../types";
import { PluginRegistry } from "./pluginRegistry";

export class ProcessingEngine {
  private static STAGE_SEQUENCE: ProcessingStage[] = [
    "decode",
    "analyze",
    "transform",
    "resize",
    "crop",
    "optimize",
    "metadata",
    "encode",
    "export",
  ];

  /**
   * Processes a media node through all engine pipeline stages.
   */
  public static async execute(
    node: MediaNode,
    ctx: ProcessingContext
  ): Promise<{ resultNode: MediaNode; context: ProcessingContext }> {
    let current = { ...node };

    for (const stage of this.STAGE_SEQUENCE) {
      const stageStart = performance.now();
      const plugins = PluginRegistry.getByStage(stage);

      for (const plugin of plugins) {
        current = await plugin.execute(current, ctx);
      }

      const durationMs = Math.round(performance.now() - stageStart);
      ctx.stageLogs.push({ stage, durationMs });
    }

    return { resultNode: current, context: ctx };
  }
}
