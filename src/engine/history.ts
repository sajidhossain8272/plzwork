import { HistoryItem, ConversionResult } from "./types";

const STORAGE_KEY = "quickconvert_history_v2";

type HistoryListener = (items: HistoryItem[]) => void;

class HistoryManager {
  private items: HistoryItem[] = [];
  private listeners: Set<HistoryListener> = new Set();

  constructor() {
    if (typeof window !== "undefined") {
      this.load();
    }
  }

  private load(): void {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        this.items = JSON.parse(raw);
      }
    } catch {
      this.items = [];
    }
  }

  private save(): void {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
      } catch (err) {
        console.error("Failed to save history:", err);
      }
    }
    this.notify();
  }

  public subscribe(listener: HistoryListener): () => void {
    this.listeners.add(listener);
    listener(this.items);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    for (const listener of this.listeners) {
      listener([...this.items]);
    }
  }

  public getHistory(): HistoryItem[] {
    return [...this.items];
  }

  public addConversion(result: ConversionResult): void {
    if (result.fromValue === 0) return;

    // Deduplicate recent identical conversions
    const existingIdx = this.items.findIndex(
      (item) =>
        item.fromUnitSymbol === result.fromUnit.symbol &&
        item.toUnitSymbol === result.toUnit.symbol &&
        item.fromValue === result.fromValue
    );

    if (existingIdx !== -1) {
      // Move to top
      const [existing] = this.items.splice(existingIdx, 1);
      existing.timestamp = Date.now();
      this.items.unshift(existing);
    } else {
      const newItem: HistoryItem = {
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        timestamp: Date.now(),
        fromValue: result.fromValue,
        fromUnitSymbol: result.fromUnit.symbol,
        fromUnitName: result.fromUnit.name,
        toValue: result.toValue,
        toUnitSymbol: result.toUnit.symbol,
        toUnitName: result.toUnit.name,
        category: result.category,
        pinned: false,
      };
      this.items.unshift(newItem);
    }

    // Keep max 50 items
    if (this.items.length > 50) {
      this.items = this.items.slice(0, 50);
    }

    this.save();
  }

  public togglePin(id: string): void {
    const item = this.items.find((i) => i.id === id);
    if (item) {
      item.pinned = !item.pinned;
      this.save();
    }
  }

  public remove(id: string): void {
    this.items = this.items.filter((i) => i.id !== id);
    this.save();
  }

  public clearAll(): void {
    this.items = [];
    this.save();
  }
}

export const historyManager = new HistoryManager();
