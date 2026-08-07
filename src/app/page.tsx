"use client";

import { useRef, useState } from "react";
import Features from "./components/Features";
import Hero from "./components/Hero";
import ConversionTable from "./components/ConversionTable";

import { CommandPalette } from "./components/CommandPalette";
import { HistoryDrawer } from "./components/HistoryDrawer";
import { ImageConverterSuite } from "@/image/components/ImageConverterSuite";
import { AIIntelligenceCard } from "./components/AIIntelligenceCard";

import { CategoryType, HistoryItem } from "@/engine/types";
import { registerAllPlugins } from "@/plugins";

// Auto register plugins on load
registerAllPlugins();

export default function Home() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [, setSelectedCategory] = useState<CategoryType>("length");
  const [, setInitialValue] = useState<number>(1);

  const mainRef = useRef<HTMLDivElement | null>(null);

  const scrollToMain = () => {
    if (mainRef.current) {
      mainRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectHistoryItem = (item: HistoryItem) => {
    setSelectedCategory(item.category);
    setInitialValue(item.fromValue);
    scrollToMain();
  };

  return (
    <div className="bg-[#f7f7f4] text-[#0f171d]">
      <Hero
        onConvertNowClick={scrollToMain}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
      />

      {/* Main Image Conversion Workspace */}
      <main ref={mainRef} className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Browser Image Converter Studio */}
        <ImageConverterSuite />

        {/* Local AI Image Intelligence */}
        <AIIntelligenceCard />
      </main>

      <ConversionTable />
      <Features />

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
      />

      {/* History Drawer */}
      <HistoryDrawer
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        onSelectHistoryItem={(item) => handleSelectHistoryItem(item)}
      />
    </div>
  );
}
