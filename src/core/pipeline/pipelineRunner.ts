import { PipelineDefinition, MediaNode, ProcessingContext } from "../types";
import { PluginRegistry } from "../engine/pluginRegistry";

export class PipelineRunner {
  /**
   * Executes a defined JSON pipeline on a media node.
   */
  public static async runPipeline(
    pipeline: PipelineDefinition,
    inputNode: MediaNode,
    ctx: ProcessingContext
  ): Promise<{ outputNode: MediaNode; logs: string[] }> {
    let current = { ...inputNode };
    const logs: string[] = [];

    logs.push(`[PipelineRunner] Starting pipeline "${pipeline.name}" (${pipeline.steps.length} steps)`);

    for (let i = 0; i < pipeline.steps.length; i++) {
      const step = pipeline.steps[i];
      const plugin = PluginRegistry.get(step.pluginId);

      if (!plugin) {
        logs.push(`[PipelineRunner] Warning: Plugin "${step.pluginId}" not registered. Skipping.`);
        continue;
      }

      const start = performance.now();
      current = await plugin.execute(current, ctx, step.options);
      const ms = Math.round(performance.now() - start);

      logs.push(`[PipelineRunner] Executed step ${i + 1}/${pipeline.steps.length}: ${plugin.name} (${ms}ms)`);
    }

    logs.push(`[PipelineRunner] Pipeline completed. Final payload: ${current.width}x${current.height} px, ${current.sizeBytes} bytes.`);
    return { outputNode: current, logs };
  }
}
