export type CategoryType =
  | "length"
  | "weight"
  | "temperature"
  | "currency"
  | "digital"
  | "volume"
  | "area"
  | "speed"
  | "time"
  | "pressure"
  | "energy"
  | "angle"
  | "dev"
  | "media";

export interface Unit {
  id: string;
  name: string;
  symbol: string;
  category: CategoryType;
  aliases: string[];
  ratioToBase?: number; // Relative to the plugin's base unit (e.g. meter = 1, cm = 0.01)
  toBase?: (val: number) => number; // Non-linear conversions (e.g., Fahrenheit to Celsius)
  fromBase?: (val: number) => number; // Non-linear conversions (e.g., Celsius to Fahrenheit)
}

export interface ConverterPlugin {
  id: CategoryType;
  name: string;
  description: string;
  iconName: string;
  baseUnitId: string;
  units: Unit[];
  convert?: (value: number, fromUnitId: string, toUnitId: string) => number;
}

export interface ConversionResult {
  fromValue: number;
  fromUnit: Unit;
  toValue: number;
  toUnit: Unit;
  formattedResult: string;
  formulaDescription?: string;
  category: CategoryType;
}

export interface NaturalLanguageParseResult {
  isValid: boolean;
  value: number;
  fromUnit: Unit;
  toUnit: Unit;
  category: CategoryType;
  resultValue: number;
  formattedResult: string;
  query: string;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  fromValue: number;
  fromUnitSymbol: string;
  fromUnitName: string;
  toValue: number;
  toUnitSymbol: string;
  toUnitName: string;
  category: CategoryType;
  pinned: boolean;
}

export interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  category: CategoryType;
  fromUnit?: Unit;
  toUnit?: Unit;
  type: "category" | "unit" | "conversion";
}
