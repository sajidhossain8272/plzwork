"use client";

import React, { useState, useEffect } from "react";
import { History, Pin, Trash2, X, Star } from "lucide-react";
import { historyManager } from "@/engine/history";
import { HistoryItem } from "@/engine/types";
import { formatNumber } from "@/lib/utils";

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectHistoryItem?: (item: HistoryItem) => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  onSelectHistoryItem,
}) => {
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const unsubscribe = historyManager.subscribe((items) => {
      setHistoryItems(items);
    });
    return () => unsubscribe();
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#0e171d] text-white h-full shadow-2xl flex flex-col border-l border-gray-800 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800 bg-[#141f27]">
          <div className="flex items-center gap-2.5">
            <History className="w-5 h-5 text-[#42b719]" />
            <h3 className="text-lg font-bold">Conversion History</h3>
          </div>
          <div className="flex items-center gap-2">
            {historyItems.length > 0 && (
              <button
                onClick={() => historyManager.clearAll()}
                className="text-xs text-gray-400 hover:text-red-400 transition px-2 py-1 rounded bg-gray-800"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {historyItems.length === 0 ? (
            <div className="py-20 text-center text-gray-500 text-sm">
              No recent conversions yet. Start converting!
            </div>
          ) : (
            historyItems.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  if (onSelectHistoryItem) onSelectHistoryItem(item);
                  onClose();
                }}
                className={`p-4 rounded-xl border transition cursor-pointer group ${
                  item.pinned
                    ? "bg-[#42b719]/10 border-[#42b719]/40"
                    : "bg-[#141f27] border-gray-800 hover:border-gray-700"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        historyManager.togglePin(item.id);
                      }}
                      className={`p-1 rounded transition ${
                        item.pinned ? "text-amber-400" : "text-gray-500 hover:text-gray-300"
                      }`}
                    >
                      <Pin className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        historyManager.remove(item.id);
                      }}
                      className="p-1 text-gray-500 hover:text-red-400 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-sm font-semibold text-white">
                  {item.fromValue} {item.fromUnitSymbol} = {formatNumber(item.toValue, 4)}{" "}
                  {item.toUnitSymbol}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {item.fromUnitName} → {item.toUnitName}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800 bg-[#141f27] text-xs text-gray-500 text-center">
          Saved locally on your device
        </div>
      </div>
    </div>
  );
};
