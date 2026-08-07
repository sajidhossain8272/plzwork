"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeftRight, Copy, Check, Sparkles, SlidersHorizontal } from "lucide-react";

import { PluginRegistry } from "@/engine/registry";
import { executeConversion } from "@/engine/conversionGraph";
import { CategoryType, Unit, ConverterPlugin, ConversionResult } from "@/engine/types";
import { historyManager } from "@/engine/history";

interface UniversalConverterProps {
  initialCategory?: CategoryType;
  selectedFromUnit?: Unit;
  selectedToUnit?: Unit;
  initialValue?: number;
}

export const UniversalConverter: React.FC<UniversalConverterProps> = ({
  initialCategory = "length",
  selectedFromUnit,
  selectedToUnit,
  initialValue = 1,
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>(initialCategory);
  const [plugin, setPlugin] = useState<ConverterPlugin | undefined>(PluginRegistry.getPlugin(initialCategory));
  
  const [fromUnit, setFromUnit] = useState<Unit | undefined>(
    selectedFromUnit || plugin?.units[0]
  );
  const [toUnit, setToUnit] = useState<Unit | undefined>(
    selectedToUnit || plugin?.units[1] || plugin?.units[0]
  );
  const [inputValue, setInputValue] = useState<string>(initialValue.toString());
  const [precision, setPrecision] = useState<number>(6);
  const [copied, setCopied] = useState<boolean>(false);
  const [conversionResult, setConversionResult] = useState<ConversionResult | null>(null);

  // Sync category changes
  useEffect(() => {
    const newPlugin = PluginRegistry.getPlugin(activeCategory);
    setPlugin(newPlugin);
    if (newPlugin && newPlugin.units.length > 0) {
      setFromUnit(newPlugin.units[0]);
      setToUnit(newPlugin.units[1] || newPlugin.units[0]);
    }
  }, [activeCategory]);

  // Sync external unit selection props if passed from command palette
  useEffect(() => {
    if (selectedFromUnit && selectedToUnit) {
      setActiveCategory(selectedFromUnit.category);
      setFromUnit(selectedFromUnit);
      setToUnit(selectedToUnit);
      if (initialValue) setInputValue(initialValue.toString());
    }
  }, [selectedFromUnit, selectedToUnit, initialValue]);

  // Execute conversion whenever values/units change
  useEffect(() => {
    if (fromUnit && toUnit && plugin) {
      const num = parseFloat(inputValue);
      if (!isNaN(num)) {
        const result = executeConversion(num, fromUnit, toUnit, plugin, precision);
        setConversionResult(result);
        historyManager.addConversion(result);
      } else {
        setConversionResult(null);
      }
    }
  }, [inputValue, fromUnit, toUnit, plugin, precision]);

  const handleSwapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const handleCopyResult = () => {
    if (conversionResult) {
      navigator.clipboard.writeText(`${conversionResult.formattedResult} ${toUnit?.symbol || ""}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const categories: { id: CategoryType; label: string }[] = [
    { id: "length", label: "Length" },
    { id: "weight", label: "Weight" },
    { id: "temperature", label: "Temperature" },
    { id: "currency", label: "Currency" },
    { id: "digital", label: "Digital" },
    { id: "volume", label: "Volume" },
    { id: "area", label: "Area" },
    { id: "speed", label: "Speed" },
    { id: "time", label: "Time" },
    { id: "pressure", label: "Pressure" },
    { id: "energy", label: "Energy" },
    { id: "angle", label: "Angle" },
  ];

  return (
    <div className="w-full bg-white rounded-2xl border border-[#dde4da] shadow-sm p-6 sm:p-8">
      {/* Category Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-gray-100 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 text-sm font-semibold rounded-full whitespace-nowrap transition-all duration-200 ${
              activeCategory === cat.id
                ? "bg-[#0d161c] text-white shadow-sm"
                : "bg-gray-100/80 text-[#59666f] hover:bg-gray-200 hover:text-[#0d161c]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Conversion Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 items-center">
        {/* FROM Input Box */}
        <div className="bg-[#f8faf7] border border-[#e2e8e0] rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <span>From</span>
            <span>{fromUnit?.symbol || ""}</span>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter value..."
              className="w-full bg-transparent text-3xl font-bold text-[#0d161c] focus:outline-none tracking-tight"
            />
          </div>

          {/* Unit Select Dropdown */}
          <select
            value={fromUnit?.id || ""}
            onChange={(e) => {
              const u = plugin?.units.find((item) => item.id === e.target.value);
              if (u) setFromUnit(u);
            }}
            className="w-full bg-white border border-[#cfd8cc] text-gray-800 text-sm font-semibold rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#42b719]/40"
          >
            {plugin?.units.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.symbol})
              </option>
            ))}
          </select>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center my-2 lg:my-0">
          <button
            onClick={handleSwapUnits}
            className="p-3.5 bg-white border border-[#dde4da] hover:border-[#42b719] text-gray-700 hover:text-[#42b719] rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95"
            title="Swap units"
          >
            <ArrowLeftRight className="w-5 h-5" />
          </button>
        </div>

        {/* TO Result Box */}
        <div className="bg-[#f4f8f3] border border-[#d6e4d3] rounded-2xl p-5 shadow-xs space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <span>Converted Result</span>
            <span>{toUnit?.symbol || ""}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold text-[#0d161c] tracking-tight truncate pr-2">
              {conversionResult ? conversionResult.formattedResult : "0"}
            </div>
            <button
              onClick={handleCopyResult}
              disabled={!conversionResult}
              className={`p-2.5 rounded-xl border transition-all ${
                copied
                  ? "bg-[#42b719] text-white border-[#42b719]"
                  : "bg-white border-[#cfd8cc] text-gray-700 hover:bg-gray-50 shadow-xs"
              }`}
              title="Copy result"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Unit Select Dropdown */}
          <select
            value={toUnit?.id || ""}
            onChange={(e) => {
              const u = plugin?.units.find((item) => item.id === e.target.value);
              if (u) setToUnit(u);
            }}
            className="w-full bg-white border border-[#cfd8cc] text-gray-800 text-sm font-semibold rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#42b719]/40"
          >
            {plugin?.units.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.symbol})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Info & Precision Controls Footer */}
      <div className="mt-6 pt-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#59666f]">
        <div className="flex items-center gap-2 font-medium">
          <Sparkles className="w-4 h-4 text-[#42b719]" />
          <span>Formula: {conversionResult?.formulaDescription || "—"}</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-medium">
            <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400" />
            <span>Decimals:</span>
          </div>
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
            {[2, 4, 6, 8].map((dec) => (
              <button
                key={dec}
                onClick={() => setPrecision(dec)}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition ${
                  precision === dec
                    ? "bg-white text-[#0d161c] shadow-xs"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {dec}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
