"use client";

import React, { useState } from "react";
import { Code, Copy, Check, RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";

export const DevToolsCard: React.FC = () => {
  const [tab, setTab] = useState<"base64" | "uuid" | "json">("base64");

  // Base64 State
  const [b64Input, setB64Input] = useState("Hello Quick Convert V2!");
  const [b64Mode, setB64Mode] = useState<"encode" | "decode">("encode");
  const [b64Copied, setB64Copied] = useState(false);

  const getB64Result = () => {
    try {
      return b64Mode === "encode" ? btoa(b64Input) : atob(b64Input);
    } catch {
      return "Invalid Base64 string for decoding.";
    }
  };

  // UUID State
  const [uuid, setUuid] = useState<string>(() => crypto.randomUUID());
  const [uuidCopied, setUuidCopied] = useState(false);

  const generateUuid = () => {
    setUuid(crypto.randomUUID());
  };

  // JSON Formatter State
  const [jsonInput, setJsonInput] = useState('{"product":"Quick Convert","version":2,"features":["Universal Engine","PWA"]}');
  const [jsonResult, setJsonResult] = useState<string>("");
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [jsonCopied, setJsonCopied] = useState(false);

  const handleFormatJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonResult(JSON.stringify(parsed, null, 2));
      setJsonError(null);
    } catch (err: any) {
      setJsonError(err.message || "Invalid JSON syntax.");
      setJsonResult("");
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-[#dde4da] shadow-sm p-6 sm:p-8 mt-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl bg-[#0d161c] text-white">
          <Code className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-[#0d161c]">Developer Utilities</h3>
          <p className="text-xs text-[#59666f]">Client-side Base64, UUID v4, and JSON Formatter</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-3">
        <button
          onClick={() => setTab("base64")}
          className={`px-4 py-2 text-sm font-semibold rounded-xl transition ${
            tab === "base64" ? "bg-[#0d161c] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Base64 Tool
        </button>
        <button
          onClick={() => setTab("uuid")}
          className={`px-4 py-2 text-sm font-semibold rounded-xl transition ${
            tab === "uuid" ? "bg-[#0d161c] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          UUID Generator
        </button>
        <button
          onClick={() => setTab("json")}
          className={`px-4 py-2 text-sm font-semibold rounded-xl transition ${
            tab === "json" ? "bg-[#0d161c] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          JSON Formatter
        </button>
      </div>

      {/* Base64 */}
      {tab === "base64" && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setB64Mode("encode")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${
                b64Mode === "encode" ? "bg-[#42b719] text-white" : "bg-gray-100 text-gray-700"
              }`}
            >
              Encode
            </button>
            <button
              onClick={() => setB64Mode("decode")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${
                b64Mode === "decode" ? "bg-[#42b719] text-white" : "bg-gray-100 text-gray-700"
              }`}
            >
              Decode
            </button>
          </div>

          <textarea
            value={b64Input}
            onChange={(e) => setB64Input(e.target.value)}
            placeholder="Type or paste text..."
            className="w-full h-24 p-3 font-mono text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#42b719]/40"
          />

          <div className="p-4 bg-gray-900 text-green-400 font-mono text-sm rounded-xl flex items-center justify-between overflow-x-auto">
            <span className="break-all pr-4">{getB64Result()}</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(getB64Result());
                setB64Copied(true);
                setTimeout(() => setB64Copied(false), 2000);
              }}
              className="p-2 rounded-lg bg-gray-800 text-gray-300 hover:text-white transition shrink-0"
            >
              {b64Copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}

      {/* UUID */}
      {tab === "uuid" && (
        <div className="space-y-4">
          <div className="p-5 bg-gray-900 text-white font-mono text-lg rounded-xl flex items-center justify-between">
            <span>{uuid}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={generateUuid}
                className="p-2 rounded-lg bg-gray-800 text-gray-300 hover:text-white transition"
                title="Generate new UUID"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(uuid);
                  setUuidCopied(true);
                  setTimeout(() => setUuidCopied(false), 2000);
                }}
                className="p-2 rounded-lg bg-gray-800 text-gray-300 hover:text-white transition"
                title="Copy UUID"
              >
                {uuidCopied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <button
            onClick={generateUuid}
            className="w-full py-2.5 bg-[#0d161c] text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition"
          >
            Generate New UUID v4
          </button>
        </div>
      )}

      {/* JSON Formatter */}
      {tab === "json" && (
        <div className="space-y-4">
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder="Paste raw JSON here..."
            className="w-full h-24 p-3 font-mono text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#42b719]/40"
          />

          <button
            onClick={handleFormatJson}
            className="px-4 py-2 bg-[#42b719] text-white text-sm font-semibold rounded-xl hover:bg-[#349814] transition"
          >
            Format & Validate JSON
          </button>

          {jsonError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{jsonError}</span>
            </div>
          )}

          {jsonResult && (
            <div className="p-4 bg-gray-900 text-green-400 font-mono text-xs rounded-xl relative">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(jsonResult);
                  setJsonCopied(true);
                  setTimeout(() => setJsonCopied(false), 2000);
                }}
                className="absolute top-3 right-3 p-1.5 bg-gray-800 text-gray-300 rounded hover:text-white"
              >
                {jsonCopied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <pre className="overflow-x-auto">{jsonResult}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
