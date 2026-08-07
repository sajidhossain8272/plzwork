import { ConverterPlugin } from "../engine/types";

export const speedPlugin: ConverterPlugin = {
  id: "speed",
  name: "Speed",
  description: "Convert km/h, mph, meters per second, knots, and feet per second.",
  iconName: "Gauge",
  baseUnitId: "meters_per_second",
  units: [
    {
      id: "meters_per_second",
      name: "Meter per second",
      symbol: "m/s",
      category: "speed",
      aliases: ["meter per second", "meters per second", "m/s"],
      ratioToBase: 1,
    },
    {
      id: "kilometers_per_hour",
      name: "Kilometer per hour",
      symbol: "km/h",
      category: "speed",
      aliases: ["kilometer per hour", "kilometers per hour", "km/h", "kmh", "kph"],
      ratioToBase: 0.277777778,
    },
    {
      id: "miles_per_hour",
      name: "Mile per hour",
      symbol: "mph",
      category: "speed",
      aliases: ["mile per hour", "miles per hour", "mph"],
      ratioToBase: 0.44704,
    },
    {
      id: "knot",
      name: "Knot",
      symbol: "kn",
      category: "speed",
      aliases: ["knot", "knots", "kn", "kt"],
      ratioToBase: 0.514444444,
    },
    {
      id: "feet_per_second",
      name: "Foot per second",
      symbol: "ft/s",
      category: "speed",
      aliases: ["foot per second", "feet per second", "ft/s", "fps"],
      ratioToBase: 0.3048,
    },
  ],
};
