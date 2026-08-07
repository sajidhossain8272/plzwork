import { CapabilityHandler } from "../capabilityRegistry";
import { CapabilityInput, ExportProfile } from "../types";

export const exportAdvisorHandler: CapabilityHandler<ExportProfile[]> = {
  meta: {
    id: "module-export-advisor",
    name: "Export Profile Advisor",
    purpose: "Recommends custom export profiles for Web, Instagram, Print, and Discord",
    latencyMs: 9,
    confidence: 0.97,
    version: "1.0.0",
  },
  async execute(input: CapabilityInput): Promise<ExportProfile[]> {
    return [
      {
        id: "exp-web",
        target: "website",
        format: "webp",
        width: Math.min(input.width, 1200),
        height: Math.round(input.height * (Math.min(input.width, 1200) / input.width)),
        quality: 85,
        reason: "Optimized WebP format for fast hero banner loading speed.",
      },
      {
        id: "exp-[#42b719]",
        target: "instagram",
        format: "jpeg",
        width: 1080,
        height: 1080,
        quality: 92,
        reason: "1:1 square canvas tailored for Instagram feed posting.",
      },
      {
        id: "exp-discord",
        target: "discord_emoji",
        format: "png",
        width: 128,
        height: 128,
        quality: 100,
        reason: "128x128 pixel resolution with preserved alpha transparency for custom emojis.",
      },
    ];
  },
};
