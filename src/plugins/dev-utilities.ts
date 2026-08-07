import { ConverterPlugin } from "../engine/types";

export const devUtilitiesPlugin: ConverterPlugin = {
  id: "dev",
  name: "Developer Utilities",
  description: "Base64 Encoder/Decoder, UUID v4 Generator, and JSON Formatter.",
  iconName: "Code",
  baseUnitId: "base64",
  units: [
    {
      id: "base64",
      name: "Base64 Encoder / Decoder",
      symbol: "B64",
      category: "dev",
      aliases: ["base64", "b64", "base64 encode", "base64 decode"],
    },
    {
      id: "uuid",
      name: "UUID v4 Generator",
      symbol: "UUID",
      category: "dev",
      aliases: ["uuid", "guid", "uuidv4", "uuid generator"],
    },
    {
      id: "json",
      name: "JSON Formatter & Validator",
      symbol: "JSON",
      category: "dev",
      aliases: ["json", "json formatter", "json lint", "json validator"],
    },
  ],
};
