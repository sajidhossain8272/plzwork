import { describe, it, expect, beforeAll } from "vitest";
import { PluginRegistry } from "./registry";
import { registerAllPlugins } from "../plugins";
import { convertUnitValue } from "./conversionGraph";
import { parseNaturalLanguageQuery } from "./parser";
import { executeSmartSearch } from "./search";

beforeAll(() => {
  registerAllPlugins();
});

describe("Conversion Graph Engine", () => {
  it("should accurately convert meters to feet", () => {
    const meter = PluginRegistry.findUnit("m")!.unit;
    const foot = PluginRegistry.findUnit("ft")!.unit;
    const res = convertUnitValue(1, meter, foot);
    expect(res).toBeCloseTo(3.28084, 4);
  });

  it("should accurately convert Celsius to Fahrenheit", () => {
    const cel = PluginRegistry.findUnit("celsius")!.unit;
    const fah = PluginRegistry.findUnit("fahrenheit")!.unit;
    const res = convertUnitValue(100, cel, fah);
    expect(res).toBe(212);
  });

  it("should accurately convert GB to MB", () => {
    const gb = PluginRegistry.findUnit("gb")!.unit;
    const mb = PluginRegistry.findUnit("mb")!.unit;
    const res = convertUnitValue(1, gb, mb);
    expect(res).toBe(1000);
  });
});

describe("Natural Language Parser", () => {
  it("should parse '5 ft to cm'", () => {
    const parsed = parseNaturalLanguageQuery("5 ft to cm");
    expect(parsed).not.toBeNull();
    expect(parsed?.isValid).toBe(true);
    expect(parsed?.value).toBe(5);
    expect(parsed?.fromUnit.symbol).toBe("ft");
    expect(parsed?.toUnit.symbol).toBe("cm");
    expect(parsed?.resultValue).toBeCloseTo(152.4, 1);
  });

  it("should parse '100 c'", () => {
    const parsed = parseNaturalLanguageQuery("100 c");
    expect(parsed).not.toBeNull();
    expect(parsed?.isValid).toBe(true);
    expect(parsed?.value).toBe(100);
    expect(parsed?.fromUnit.symbol).toBe("°C");
  });
});

describe("Smart Search Index", () => {
  it("should find units by alias (e.g. centimetres)", () => {
    const results = executeSmartSearch("centimetres");
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((r) => r.title.includes("Centimeter"))).toBe(true);
  });

  it("should find natural language conversions", () => {
    const results = executeSmartSearch("100 km to miles");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].type).toBe("conversion");
  });
});
