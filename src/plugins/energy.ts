import { ConverterPlugin } from "../engine/types";

export const energyPlugin: ConverterPlugin = {
  id: "energy",
  name: "Energy",
  description: "Convert Joules, Kilojoules, Calories, Kilocalories, and Kilowatt-hours.",
  iconName: "Zap",
  baseUnitId: "joule",
  units: [
    {
      id: "joule",
      name: "Joule",
      symbol: "J",
      category: "energy",
      aliases: ["joule", "joules", "j"],
      ratioToBase: 1,
    },
    {
      id: "kilojoule",
      name: "Kilojoule",
      symbol: "kJ",
      category: "energy",
      aliases: ["kilojoule", "kilojoules", "kj"],
      ratioToBase: 1000,
    },
    {
      id: "calorie",
      name: "Calorie",
      symbol: "cal",
      category: "energy",
      aliases: ["calorie", "calories", "cal"],
      ratioToBase: 4.184,
    },
    {
      id: "kilocalorie",
      name: "Kilocalorie (Food Cal)",
      symbol: "kcal",
      category: "energy",
      aliases: ["kilocalorie", "kilocalories", "kcal", "Cal"],
      ratioToBase: 4184,
    },
    {
      id: "kilowatt_hour",
      name: "Kilowatt-hour",
      symbol: "kWh",
      category: "energy",
      aliases: ["kilowatt hour", "kilowatt-hour", "kwh"],
      ratioToBase: 3600000,
    },
  ],
};
