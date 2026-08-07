import { Unit, ConverterPlugin, ConversionResult } from "./types";
import { formatNumber } from "@/lib/utils";

/**
 * High-performance conversion engine.
 * Converts values between two units belonging to the same dimension/category.
 */
export function convertUnitValue(
  value: number,
  fromUnit: Unit,
  toUnit: Unit,
  plugin?: ConverterPlugin
): number {
  if (isNaN(value)) return 0;
  if (fromUnit.id === toUnit.id) return value;

  // Custom plugin conversion override if provided
  if (plugin && plugin.convert) {
    return plugin.convert(value, fromUnit.id, toUnit.id);
  }

  // 1. Non-linear functional conversion (e.g., Temperature °F -> °C)
  if (fromUnit.toBase || toUnit.fromBase) {
    const baseVal = fromUnit.toBase ? fromUnit.toBase(value) : value * (fromUnit.ratioToBase || 1);
    const finalVal = toUnit.fromBase ? toUnit.fromBase(baseVal) : baseVal / (toUnit.ratioToBase || 1);
    return finalVal;
  }

  // 2. Standard ratio conversion: value * (fromRatio / toRatio)
  const fromRatio = fromUnit.ratioToBase ?? 1;
  const toRatio = toUnit.ratioToBase ?? 1;

  if (toRatio === 0) return 0;

  const inBase = value * fromRatio;
  return inBase / toRatio;
}

/**
 * Formats a full conversion result object.
 */
export function executeConversion(
  value: number,
  fromUnit: Unit,
  toUnit: Unit,
  plugin?: ConverterPlugin,
  precision: number = 6
): ConversionResult {
  const resultValue = convertUnitValue(value, fromUnit, toUnit, plugin);
  const formattedVal = formatNumber(resultValue, precision);

  let formula = `${value} ${fromUnit.symbol} = ${formattedVal} ${toUnit.symbol}`;
  if (fromUnit.ratioToBase && toUnit.ratioToBase) {
    const unitRatio = formatNumber(fromUnit.ratioToBase / toUnit.ratioToBase, 4);
    formula = `1 ${fromUnit.symbol} = ${unitRatio} ${toUnit.symbol}`;
  }

  return {
    fromValue: value,
    fromUnit,
    toValue: resultValue,
    toUnit,
    formattedResult: formattedVal,
    formulaDescription: formula,
    category: fromUnit.category,
  };
}
