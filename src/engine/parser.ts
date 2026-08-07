import { NaturalLanguageParseResult } from "./types";
import { PluginRegistry } from "./registry";
import { convertUnitValue } from "./conversionGraph";
import { formatNumber } from "@/lib/utils";

/**
 * Natural language query parser.
 * Supports patterns like:
 * - "5 ft to cm"
 * - "100 usd in eur"
 * - "2.5 kg -> lb"
 * - "100 c"
 */
export function parseNaturalLanguageQuery(query: string): NaturalLanguageParseResult | null {
  const clean = query.trim().toLowerCase();
  if (!clean) return null;

  // Regex pattern matching: [number] [fromUnit] (to|in|->) [toUnit]
  const fullConversionRegex = /^([\d,.]+)\s*([a-zA-Z°%]+)\s*(?:to|in|->|=)\s*([a-zA-Z°%]+)$/i;
  const match = clean.match(fullConversionRegex);

  if (match) {
    const rawVal = parseFloat(match[1].replace(/,/g, ""));
    const fromStr = match[2];
    const toStr = match[3];

    if (!isNaN(rawVal)) {
      const fromResolved = PluginRegistry.findUnit(fromStr);
      const toResolved = PluginRegistry.findUnit(toStr);

      if (fromResolved && toResolved && fromResolved.unit.category === toResolved.unit.category) {
        const resultVal = convertUnitValue(rawVal, fromResolved.unit, toResolved.unit, fromResolved.plugin);
        const formatted = formatNumber(resultVal, 6);

        return {
          isValid: true,
          value: rawVal,
          fromUnit: fromResolved.unit,
          toUnit: toResolved.unit,
          category: fromResolved.unit.category,
          resultValue: resultVal,
          formattedResult: formatted,
          query,
        };
      }
    }
  }

  // Fallback single value + unit regex (e.g. "100 celsius" or "10 km")
  const singleUnitRegex = /^([\d,.]+)\s*([a-zA-Z°%]+)$/i;
  const singleMatch = clean.match(singleUnitRegex);

  if (singleMatch) {
    const rawVal = parseFloat(singleMatch[1].replace(/,/g, ""));
    const unitStr = singleMatch[2];

    if (!isNaN(rawVal)) {
      const resolved = PluginRegistry.findUnit(unitStr);
      if (resolved) {
        const plugin = resolved.plugin;
        // Default target is either baseUnit or first alternate unit
        const defaultToUnit = plugin.units.find((u) => u.id !== resolved.unit.id) || resolved.unit;
        const resultVal = convertUnitValue(rawVal, resolved.unit, defaultToUnit, plugin);
        const formatted = formatNumber(resultVal, 6);

        return {
          isValid: true,
          value: rawVal,
          fromUnit: resolved.unit,
          toUnit: defaultToUnit,
          category: resolved.unit.category,
          resultValue: resultVal,
          formattedResult: formatted,
          query,
        };
      }
    }
  }

  return null;
}
