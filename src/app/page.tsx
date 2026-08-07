"use client";

import { useRef, useState } from "react";
import Features from "./components/Features";
import Hero from "./components/Hero";
import ConversionTable from "./components/ConversionTable";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import { UniversalConverter } from "./components/UniversalConverter";
import { DevToolsCard } from "./components/DevToolsCard";
import { CommandPalette } from "./components/CommandPalette";
import { ClipboardBanner } from "./components/ClipboardBanner";
import { HistoryDrawer } from "./components/HistoryDrawer";
import { ImageConverterSuite } from "@/image/components/ImageConverterSuite";

import { CategoryType, Unit, NaturalLanguageParseResult, HistoryItem } from "@/engine/types";
import { registerAllPlugins } from "@/plugins";

// Auto register plugins on load
registerAllPlugins();

export default function Home() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("length");
  const [selectedFromUnit, setSelectedFromUnit] = useState<Unit | undefined>(undefined);
  const [selectedToUnit, setSelectedToUnit] = useState<Unit | undefined>(undefined);
  const [initialValue, setInitialValue] = useState<number>(1);

  const mainRef = useRef<HTMLDivElement | null>(null);

  const scrollToMain = () => {
    if (mainRef.current) {
      mainRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectConversionFromNL = (result: NaturalLanguageParseResult) => {
    setSelectedCategory(result.category);
    setSelectedFromUnit(result.fromUnit);
    setSelectedToUnit(result.toUnit);
    setInitialValue(result.value);
    scrollToMain();
  };

  const handleSelectHistoryItem = (item: HistoryItem) => {
    setSelectedCategory(item.category);
    setInitialValue(item.fromValue);
    scrollToMain();
  };

  return (
    <div className="min-h-screen bg-[#f7f7f4] text-[#0f171d]">
      <NavBar
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenHistory={() => setHistoryOpen(true)}
      />

      <Hero
        onConvertNowClick={scrollToMain}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
      />

      {/* Main Conversion Workspace */}
      <main ref={mainRef} className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Smart Clipboard Suggestion Banner */}
        <ClipboardBanner
          onConvertSuggested={(result) => handleSelectConversionFromNL(result)}
        />

        {/* Universal Unit & Currency Converter */}
        <UniversalConverter
          initialCategory={selectedCategory}
          selectedFromUnit={selectedFromUnit}
          selectedToUnit={selectedToUnit}
          initialValue={initialValue}
        />

        {/* Desktop-Grade V2 Image Converter Studio */}
        <ImageConverterSuite />

        {/* Developer Utilities (Base64, UUID, JSON) */}
        <DevToolsCard />
      </main>

      <ConversionTable />
      <Features />
      <Footer />

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        onSelectConversion={(from, to, val) => {
          setSelectedCategory(from.category);
          setSelectedFromUnit(from);
          setSelectedToUnit(to);
          setInitialValue(val);
          scrollToMain();
        }}
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
