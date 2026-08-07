import { ConverterPlugin } from "../engine/types";

export const areaPlugin: ConverterPlugin = {
  id: "area",
  name: "Area",
  description: "Convert square meters, square feet, acres, hectares, square kilometers.",
  iconName: "Square",
  baseUnitId: "square_meter",
  units: [
    {
      id: "square_meter",
      name: "Square Meter",
      symbol: "m²",
      category: "area",
      aliases: ["square meter", "square meters", "sq m", "m2", "m²"],
      ratioToBase: 1,
    },
    {
      id: "square_kilometer",
      name: "Square Kilometer",
      symbol: "km²",
      category: "area",
      aliases: ["square kilometer", "square kilometers", "sq km", "km2", "km²"],
      ratioToBase: 1000000,
    },
    {
      id: "square_foot",
      name: "Square Foot",
      symbol: "ft²",
      category: "area",
      aliases: ["square foot", "square feet", "sq ft", "ft2", "ft²"],
      ratioToBase: 0.09290304,
    },
    {
      id: "acre",
      name: "Acre",
      symbol: "ac",
      category: "area",
      aliases: ["acre", "acres", "ac"],
      ratioToBase: 4046.8564224,
    },
    {
      id: "hectare",
      name: "Hectare",
      symbol: "ha",
      category: "area",
      aliases: ["hectare", "hectares", "ha"],
      ratioToBase: 10000,
    },
  ],
};
