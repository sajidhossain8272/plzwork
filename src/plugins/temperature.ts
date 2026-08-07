import { ConverterPlugin } from "../engine/types";

export const temperaturePlugin: ConverterPlugin = {
  id: "temperature",
  name: "Temperature",
  description: "Convert Celsius, Fahrenheit, Kelvin, and Rankine.",
  iconName: "Thermometer",
  baseUnitId: "celsius",
  units: [
    {
      id: "celsius",
      name: "Celsius",
      symbol: "°C",
      category: "temperature",
      aliases: ["celsius", "celcius", "c", "°c"],
      toBase: (c) => c,
      fromBase: (c) => c,
    },
    {
      id: "fahrenheit",
      name: "Fahrenheit",
      symbol: "°F",
      category: "temperature",
      aliases: ["fahrenheit", "f", "°f"],
      toBase: (f) => ((f - 32) * 5) / 9,
      fromBase: (c) => (c * 9) / 5 + 32,
    },
    {
      id: "kelvin",
      name: "Kelvin",
      symbol: "K",
      category: "temperature",
      aliases: ["kelvin", "k"],
      toBase: (k) => k - 273.15,
      fromBase: (c) => c + 273.15,
    },
    {
      id: "rankine",
      name: "Rankine",
      symbol: "°R",
      category: "temperature",
      aliases: ["rankine", "r", "°r"],
      toBase: (r) => ((r - 491.67) * 5) / 9,
      fromBase: (c) => ((c + 273.15) * 9) / 5,
    },
  ],
};
