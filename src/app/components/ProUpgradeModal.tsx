"use client";

import React from "react";
import { FaCrown, FaTimes, FaCheckCircle } from "react-icons/fa";

interface ProUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName?: string;
}

export default function ProUpgradeModal({ isOpen, onClose, featureName = "this feature" }: ProUpgradeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 overflow-hidden border border-[#dfe5dc]">
        {/* Header Ribbon */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-indigo-500"></div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <FaTimes size={20} />
        </button>

        <div className="flex flex-col items-center text-center mt-4">
          <div className="w-16 h-16 bg-purple-100 text-purple-600 flex items-center justify-center rounded-full mb-4">
            <FaCrown size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Upgrade to Pro</h2>
          <p className="text-gray-600 text-sm mb-6">
            You&apos;ve discovered a premium feature! Upgrade to Plzwork Pro to unlock {featureName} and much more.
          </p>

          <div className="w-full bg-gray-50 rounded-xl p-4 mb-6 text-left border border-gray-100">
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-gray-700">
                <FaCheckCircle className="text-green-500 flex-shrink-0" />
                <span>Unlimited batch processing</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-700">
                <FaCheckCircle className="text-green-500 flex-shrink-0" />
                <span>Higher file size limits (up to 5GB)</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-700">
                <FaCheckCircle className="text-green-500 flex-shrink-0" />
                <span>Priority processing speed</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-700">
                <FaCheckCircle className="text-green-500 flex-shrink-0" />
                <span>No ads and history sync</span>
              </li>
            </ul>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition transform hover:-translate-y-0.5"
          >
            Get Plzwork Pro - $9/mo
          </button>

          <button
            onClick={onClose}
            className="mt-4 text-xs text-gray-500 hover:text-gray-700 underline"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
