import { ConverterPlugin } from "../engine/types";

export const pressurePlugin: ConverterPlugin = {
  id: "pressure",
  name: "Pressure",
  description: "Convert Pascals, Bar, PSI, Atmospheres, and mmHg.",
  iconName: "Compass",
  baseUnitId: "pascal",
  units: [
    {
      id: "pascal",
      name: "Pascal",
      symbol: "Pa",
      category: "pressure",
      aliases: ["pascal", "pascals", "pa"],
      ratioToBase: 1,
    },
    {
      id: "kilopascal",
      name: "Kilopascal",
      symbol: "kPa",
      category: "pressure",
      aliases: ["kilopascal", "kilopascals", "kpa"],
      ratioToBase: 1000,
    },
    {
      id: "bar",
      name: "Bar",
      symbol: "bar",
      category: "pressure",
      aliases: ["bar", "bars"],
      ratioToBase: 100000,
    },
    {
      id: "psi",
      name: "Pound per sq inch",
      symbol: "psi",
      category: "pressure",
      aliases: ["psi", "pounds per square inch"],
      ratioToBase: 6894.757293168,
    },
    {
      id: "atmosphere",
      name: "Standard Atmosphere",
      symbol: "atm",
      category: "pressure",
      aliases: ["atmosphere", "atmospheres", "atm"],
      ratioToBase: 101325,
    },
  ],
};
