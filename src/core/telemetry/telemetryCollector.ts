import { TelemetryEvent } from "../types";

export class TelemetryCollector {
  private static events: TelemetryEvent[] = [];
  private static listeners: Set<(evt: TelemetryEvent) => void> = new Set();

  public static emit(eventName: string, category: TelemetryEvent["category"], durationMs?: number, payload?: Record<string, unknown>): TelemetryEvent {
    const evt: TelemetryEvent = {
      id: `evt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
      eventName,
      category,
      durationMs,
      payload,
    };

    this.events.push(evt);
    if (this.events.length > 100) this.events.shift();

    for (const listener of this.listeners) {
      listener(evt);
    }

    return evt;
  }

  public static subscribe(listener: (evt: TelemetryEvent) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  public static getEvents(): TelemetryEvent[] {
    return [...this.events];
  }
}
