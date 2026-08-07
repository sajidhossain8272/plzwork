import { ConverterPlugin } from "../engine/types";

export const anglePlugin: ConverterPlugin = {
  id: "angle",
  name: "Angle",
  description: "Convert Degrees, Radians, Gradians, and Arcseconds.",
  iconName: "Maximize2",
  baseUnitId: "degree",
  units: [
    {
      id: "degree",
      name: "Degree",
      symbol: "°",
      category: "angle",
      aliases: ["degree", "degrees", "deg", "°"],
      ratioToBase: 1,
    },
    {
      id: "radian",
      name: "Radian",
      symbol: "rad",
      category: "angle",
      aliases: ["radian", "radians", "rad"],
      ratioToBase: 57.295779513,
    },
    {
      id: "gradian",
      name: "Gradian",
      symbol: "grad",
      category: "angle",
      aliases: ["gradian", "gradians", "grad"],
      ratioToBase: 0.9,
    },
  ],
};
