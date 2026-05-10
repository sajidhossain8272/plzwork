'use client';

import { useState, useEffect } from 'react';
import { FaCopy, FaSync, FaFingerprint, FaCheck, FaInfoCircle, FaList } from 'react-icons/fa';

export default function UuidGeneratorTool() {
  const [uuid, setUuid] = useState('');
  const [batchCount, setBatchCount] = useState(1);
  const [batchUuids, setBatchUuids] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [copiedBatch, setCopiedBatch] = useState<number | null>(null);

  // Generate single UUID
  const generateSingle = () => {
    try {
      const newUuid = crypto.randomUUID();
      setUuid(newUuid);
    } catch {
      // Fallback for older browsers if needed, but modern browsers have randomUUID
      setUuid('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      }));
    }
  };

  // Generate Batch
  const generateBatch = (count: number) => {
    const list = [];
    for (let i = 0; i < count; i++) {
      list.push(crypto.randomUUID());
    }
    setBatchUuids(list);
  };

  useEffect(() => {
    generateSingle();
    generateBatch(5);
  }, []);

  const copyToClipboard = async (text: string, index?: number) => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    if (index !== undefined) {
      setCopiedBatch(index);
      setTimeout(() => setCopiedBatch(null), 2000);
    } else {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const copyAllBatch = async () => {
    if (batchUuids.length === 0) return;
    await navigator.clipboard.writeText(batchUuids.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-purple-50 rounded-2xl text-purple-500 mb-4">
          <FaFingerprint size={24} />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#0d161c] tracking-tight mb-4">
          UUID v4 Generator
        </h1>
        <p className="text-lg text-[#5a6872] max-w-2xl mx-auto">
          Generate cryptographically secure, random UUIDs (Universally Unique Identifiers) 
          instantly in your browser. No data ever leaves your device.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Display Pane */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-[#e1e5df] flex flex-col items-center justify-center text-center">
            <span className="text-xs font-bold text-purple-500 uppercase tracking-widest mb-4">Your Secure UUID</span>
            <div className="w-full bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100 group relative">
              <code className="text-2xl md:text-3xl font-mono font-bold text-[#0d161c] break-all select-all">
                {uuid}
              </code>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <button 
                onClick={generateSingle}
                className="flex items-center gap-2 px-8 py-4 bg-[#0d161c] text-white rounded-xl font-bold hover:bg-[#1d2a32] transition-all active:scale-95 shadow-md"
              >
                <FaSync className="text-purple-400" />
                Generate New
              </button>
              <button 
                onClick={() => copyToClipboard(uuid)}
                className="flex items-center gap-2 px-8 py-4 bg-white border-2 border-[#e1e5df] text-[#0d161c] rounded-xl font-bold hover:border-purple-500 hover:text-purple-500 transition-all active:scale-95"
              >
                {copied ? <FaCheck className="text-green-500" /> : <FaCopy />}
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-[#e1e5df] shadow-sm">
            <h3 className="text-xl font-bold text-[#0d161c] mb-4 flex items-center gap-2">
              <FaInfoCircle className="text-blue-500" />
              What is UUID v4?
            </h3>
            <p className="text-[#5a6872] leading-relaxed text-sm">
              UUID stands for Universally Unique Identifier. Version 4 is based entirely on random numbers. 
              The probability of a duplicate is so small (1 in 2^122) that for all practical purposes, 
              every UUID generated here is unique in the history of the universe.
            </p>
          </div>
        </div>

        {/* Batch Generator Pane */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-[2.5rem] border border-[#e1e5df] shadow-sm overflow-hidden flex flex-col h-full min-h-[500px]">
            <div className="p-6 border-b border-[#f0f2f0] bg-gray-50/50 flex items-center justify-between">
              <h2 className="font-bold text-[#0d161c] flex items-center gap-2">
                <FaList className="text-purple-500" />
                Bulk Generation
              </h2>
              <div className="flex gap-2">
                <select 
                  className="bg-white border border-[#e1e5df] rounded-lg px-3 py-1.5 text-sm font-medium text-[#0d161c] focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                  value={batchCount}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setBatchCount(val);
                    generateBatch(val);
                  }}
                >
                  <option value={5}>5 UUIDs</option>
                  <option value={10}>10 UUIDs</option>
                  <option value={20}>20 UUIDs</option>
                  <option value={50}>50 UUIDs</option>
                </select>
                <button 
                  onClick={copyAllBatch}
                  className="bg-[#0d161c] text-white px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-black transition shadow-sm"
                >
                  Copy All
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-3 font-mono text-[13px]">
              {batchUuids.map((id, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl group hover:bg-purple-50 transition-colors border border-transparent hover:border-purple-100">
                  <span className="text-[#5a6872] group-hover:text-purple-700">{id}</span>
                  <button 
                    onClick={() => copyToClipboard(id, idx)}
                    className="p-2 text-[#a3b1a0] hover:text-purple-600 transition-colors"
                  >
                    {copiedBatch === idx ? <FaCheck className="text-green-500" /> : <FaCopy />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
