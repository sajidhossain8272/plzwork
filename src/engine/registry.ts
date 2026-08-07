import { ConverterPlugin, Unit, CategoryType } from "./types";

class Registry {
  private plugins: Map<CategoryType, ConverterPlugin> = new Map();
  private aliasMap: Map<string, { unit: Unit; plugin: ConverterPlugin }> = new Map();
  private unitMap: Map<string, { unit: Unit; plugin: ConverterPlugin }> = new Map();

  /**
   * Register a new plugin into the engine.
   */
  public register(plugin: ConverterPlugin): void {
    this.plugins.set(plugin.id, plugin);

    for (const unit of plugin.units) {
      this.unitMap.set(unit.id.toLowerCase(), { unit, plugin });
      this.unitMap.set(unit.symbol.toLowerCase(), { unit, plugin });

      for (const alias of unit.aliases) {
        this.aliasMap.set(alias.toLowerCase(), { unit, plugin });
      }
    }
  }

  /**
   * Get all registered plugins.
   */
  public getAllPlugins(): ConverterPlugin[] {
    return Array.from(this.plugins.values());
  }

  /**
   * Get a plugin by category ID.
   */
  public getPlugin(category: CategoryType): ConverterPlugin | undefined {
    return this.plugins.get(category);
  }

  /**
   * Resolve a unit by ID, symbol, or alias string.
   */
  public findUnit(identifier: string): { unit: Unit; plugin: ConverterPlugin } | undefined {
    const key = identifier.trim().toLowerCase();
    return this.unitMap.get(key) || this.aliasMap.get(key);
  }

  /**
   * Search units matching a query.
   */
  public searchUnits(query: string): { unit: Unit; plugin: ConverterPlugin }[] {
    const clean = query.trim().toLowerCase();
    if (!clean) return [];

    const results: { unit: Unit; plugin: ConverterPlugin }[] = [];
    const seen = new Set<string>();

    for (const [key, entry] of this.aliasMap.entries()) {
      if (key.includes(clean) && !seen.has(entry.unit.id)) {
        seen.add(entry.unit.id);
        results.push(entry);
      }
    }

    for (const [key, entry] of this.unitMap.entries()) {
      if (key.includes(clean) && !seen.has(entry.unit.id)) {
        seen.add(entry.unit.id);
        results.push(entry);
      }
    }

    return results;
  }
}

export const PluginRegistry = new Registry();
