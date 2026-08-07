import { ProcessingPlugin, MediaNode, ProcessingContext } from "../types";

export class PluginRegistry {
  private static plugins: Map<string, ProcessingPlugin> = new Map();

  public static register(plugin: ProcessingPlugin): void {
    this.plugins.set(plugin.id, plugin);
  }

  public static get(pluginId: string): ProcessingPlugin | undefined {
    return this.plugins.get(pluginId);
  }

  public static getAll(): ProcessingPlugin[] {
    return Array.from(this.plugins.values());
  }

  public static getByStage(stage: string): ProcessingPlugin[] {
    return Array.from(this.plugins.values()).filter((p) => p.stage === stage);
  }
}

// Built-in Plugin Definitions

export const resizePlugin: ProcessingPlugin = {
  id: "plugin-resize",
  name: "Dimension Resizer",
  version: "1.0.0",
  description: "Scales image dimensions using bicubic interpolation",
  stage: "resize",
  async execute(node: MediaNode, _ctx: ProcessingContext, options?: Record<string, unknown>): Promise<MediaNode> {
    const scale = (options?.scale as number) || 1.0;
    const targetW = options?.width ? (options.width as number) : Math.round(node.width * scale);
    const targetH = options?.height ? (options.height as number) : Math.round(node.height * scale);

    return {
      ...node,
      width: targetW,
      height: targetH,
    };
  },
};

export const rotatePlugin: ProcessingPlugin = {
  id: "plugin-rotate",
  name: "Image Rotator",
  version: "1.0.0",
  description: "Rotates image by 90, 180, or 270 degrees",
  stage: "transform",
  async execute(node: MediaNode, _ctx: ProcessingContext, options?: Record<string, unknown>): Promise<MediaNode> {
    const angle = (options?.degrees as number) || 90;
    const swapDims = angle === 90 || angle === 270;
    return {
      ...node,
      width: swapDims ? node.height : node.width,
      height: swapDims ? node.width : node.height,
    };
  },
};

export const compressPlugin: ProcessingPlugin = {
  id: "plugin-compress",
  name: "Quality Optimizer",
  version: "1.0.0",
  description: "Optimizes image payload quality and compression ratio",
  stage: "optimize",
  async execute(node: MediaNode, ctx: ProcessingContext, options?: Record<string, unknown>): Promise<MediaNode> {
    const quality = (options?.quality as number) || ctx.targetQuality;
    const estSize = Math.round(node.sizeBytes * (quality / 100));
    return {
      ...node,
      sizeBytes: estSize,
    };
  },
};

export const watermarkPlugin: ProcessingPlugin = {
  id: "plugin-watermark",
  name: "Text & Logo Watermark",
  version: "1.0.0",
  description: "Applies text or logo overlay across canvas coordinates",
  stage: "transform",
  async execute(node: MediaNode): Promise<MediaNode> {
    return { ...node };
  },
};

export const metadataPlugin: ProcessingPlugin = {
  id: "plugin-metadata",
  name: "Privacy EXIF Stripper",
  version: "1.0.0",
  description: "Removes sensitive camera, device, and GPS tags",
  stage: "metadata",
  async execute(node: MediaNode, ctx: ProcessingContext): Promise<MediaNode> {
    if (!ctx.keepMetadata) {
      return {
        ...node,
        metadata: { stripped: true, timestamp: new Date().toISOString() },
      };
    }
    return node;
  },
};

export const backgroundPlugin: ProcessingPlugin = {
  id: "plugin-background",
  name: "Alpha Channel Background Fill",
  version: "1.0.0",
  description: "Fills transparent background pixels with solid color",
  stage: "transform",
  async execute(node: MediaNode, ctx: ProcessingContext): Promise<MediaNode> {
    if (node.hasAlpha && ctx.backgroundColor) {
      return {
        ...node,
        hasAlpha: false,
      };
    }
    return node;
  },
};

// Register all plugins
PluginRegistry.register(resizePlugin);
PluginRegistry.register(rotatePlugin);
PluginRegistry.register(compressPlugin);
PluginRegistry.register(watermarkPlugin);
PluginRegistry.register(metadataPlugin);
PluginRegistry.register(backgroundPlugin);
