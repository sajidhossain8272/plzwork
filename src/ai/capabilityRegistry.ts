import { AICapabilityMeta, CapabilityInput } from "./types";

export interface CapabilityHandler<T = unknown> {
  meta: AICapabilityMeta;
  execute: (input: CapabilityInput) => Promise<T>;
}

export class CapabilityRegistry {
  private static registry: Map<string, CapabilityHandler> = new Map();

  public static register<T>(handler: CapabilityHandler<T>): void {
    this.registry.set(handler.meta.id, handler as CapabilityHandler);
  }

  public static get<T>(id: string): CapabilityHandler<T> | undefined {
    return this.registry.get(id) as CapabilityHandler<T> | undefined;
  }

  public static getAll(): AICapabilityMeta[] {
    return Array.from(this.registry.values()).map((h) => h.meta);
  }
}
