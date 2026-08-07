import { SearchResult } from "./types";
import { PluginRegistry } from "./registry";
import { parseNaturalLanguageQuery } from "./parser";

/**
 * Executes a smart multi-index search over categories, units, and natural language.
 */
export function executeSmartSearch(query: string): SearchResult[] {
  const clean = query.trim();
  if (!clean) return [];

  const results: SearchResult[] = [];

  // 1. First, attempt natural language parse
  const nlResult = parseNaturalLanguageQuery(clean);
  if (nlResult && nlResult.isValid) {
    results.push({
      id: `nl-${clean}`,
      title: `${nlResult.value} ${nlResult.fromUnit.symbol} = ${nlResult.formattedResult} ${nlResult.toUnit.symbol}`,
      subtitle: `Convert ${nlResult.fromUnit.name} to ${nlResult.toUnit.name} (${nlResult.category})`,
      category: nlResult.category,
      fromUnit: nlResult.fromUnit,
      toUnit: nlResult.toUnit,
      type: "conversion",
    });
  }

  // 2. Search registered plugins by category name or description
  const plugins = PluginRegistry.getAllPlugins();
  for (const plugin of plugins) {
    if (
      plugin.name.toLowerCase().includes(clean.toLowerCase()) ||
      plugin.id.toLowerCase().includes(clean.toLowerCase())
    ) {
      results.push({
        id: `cat-${plugin.id}`,
        title: `${plugin.name} Converter`,
        subtitle: plugin.description,
        category: plugin.id,
        type: "category",
      });
    }
  }

  // 3. Search units by name, symbol, or alias
  const matchingUnits = PluginRegistry.searchUnits(clean);
  for (const { unit, plugin } of matchingUnits) {
    results.push({
      id: `unit-${unit.id}`,
      title: `${unit.name} (${unit.symbol})`,
      subtitle: `${plugin.name} Unit · Category: ${plugin.id}`,
      category: unit.category,
      fromUnit: unit,
      type: "unit",
    });
  }

  return results.slice(0, 10);
}
