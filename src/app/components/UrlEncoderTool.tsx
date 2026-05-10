'use client';

import { useState } from 'react';
import { FaCopy, FaTrash, FaLink, FaCheck, FaInfoCircle } from 'react-icons/fa';

export default function UrlEncoderTool() {
  const [rawUrl, setRawUrl] = useState('');
  const [encodedUrl, setEncodedUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const [copiedRaw, setCopiedRaw] = useState(false);
  const [copiedEncoded, setCopiedEncoded] = useState(false);

  // Handle Raw URL Change
  const handleRawChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setRawUrl(text);
    try {
      // Standard URL Encoding
      const encoded = encodeURIComponent(text);
      setEncodedUrl(encoded);
      setError(null);
    } catch (err) {
      setError('Cannot encode input.');
    }
  };

  // Handle Encoded URL Change
  const handleEncodedChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const encoded = e.target.value;
    setEncodedUrl(encoded);
    
    if (!encoded.trim()) {
      setRawUrl('');
      setError(null);
      return;
    }

    try {
      // Standard URL Decoding
      const decoded = decodeURIComponent(encoded);
      setRawUrl(decoded);
      setError(null);
    } catch (err) {
      setError('Invalid URL encoding detected.');
    }
  };

  // Copy helpers
  const copyToClipboard = async (text: string, isRaw: boolean) => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    if (isRaw) {
      setCopiedRaw(true);
      setTimeout(() => setCopiedRaw(false), 2000);
    } else {
      setCopiedEncoded(true);
      setTimeout(() => setCopiedEncoded(false), 2000);
    }
  };

  const clearAll = () => {
    setRawUrl('');
    setEncodedUrl('');
    setError(null);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-2xl text-blue-500 mb-4">
          <FaLink size={24} />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#0d161c] tracking-tight mb-4">
          URL Encoder / Decoder
        </h1>
        <p className="text-lg text-[#5a6872] max-w-2xl mx-auto">
          Securely encode or decode URLs using RFC 3986 standards. 
          Useful for preparing data for API requests or cleaning up tracking parameters.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 flex items-center justify-center font-medium animate-in fade-in slide-in-from-top-2">
          <FaInfoCircle className="mr-2" />
          {error}
        </div>
      )}

      {/* Main Dual Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 relative">
        
        {/* LEFT PANE: Raw URL */}
        <div className="flex flex-col h-[400px] bg-white rounded-[2rem] shadow-sm border border-[#e1e5df] overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/20 transition-shadow">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#f0f2f0] bg-gray-50/50">
            <h2 className="font-semibold text-[#0d161c]">
              Raw URL / Text
            </h2>
            <div className="flex gap-2">
              <button 
                onClick={clearAll}
                className="p-2 text-[#5a6872] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Clear all"
              >
                <FaTrash size={14} />
              </button>
              <button 
                onClick={() => copyToClipboard(rawUrl, true)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-[#5a6872] hover:text-[#0d161c] hover:bg-gray-100 rounded-lg transition-colors"
              >
                {copiedRaw ? <FaCheck className="text-green-500" /> : <FaCopy />}
                {copiedRaw ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
          <div className="flex-1 relative">
            <textarea
              className="w-full h-full p-6 resize-none focus:outline-none text-[#26323a] leading-relaxed bg-transparent text-base"
              placeholder="Enter your URL or parameters here..."
              value={rawUrl}
              onChange={handleRawChange}
            />
          </div>
        </div>

        {/* RIGHT PANE: Encoded URL */}
        <div className="flex flex-col h-[400px] bg-white rounded-[2rem] shadow-sm border border-[#e1e5df] overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/20 transition-shadow">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#f0f2f0] bg-gray-50/50">
            <h2 className="font-semibold text-[#0d161c]">
              URL Encoded
            </h2>
            <div className="flex gap-2">
              <button 
                onClick={() => copyToClipboard(encodedUrl, false)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-[#0d161c] hover:bg-[#1d2a32] rounded-lg transition-colors shadow-sm"
              >
                {copiedEncoded ? <FaCheck /> : <FaCopy />}
                {copiedEncoded ? 'Copied!' : 'Copy Encoded'}
              </button>
            </div>
          </div>
          <div className="flex-1 relative bg-gray-50/30">
            <textarea
              className="w-full h-full p-6 resize-none focus:outline-none text-[#26323a] font-mono text-sm leading-relaxed bg-transparent break-all"
              placeholder="Paste encoded URL here to decode..."
              value={encodedUrl}
              onChange={handleEncodedChange}
            />
          </div>
        </div>

      </div>

      {/* Info Section */}
      <div className="mt-16 max-w-4xl mx-auto">
        <h3 className="text-xl font-bold text-[#0d161c] mb-4">When should I use this?</h3>
        <p className="text-[#5a6872] leading-relaxed mb-6">
          URL encoding (Percent-encoding) is used to translate characters that are not allowed in a URL. 
          For example, spaces are replaced by <code>%20</code>, and special characters like <code>&amp;</code> or <code>?</code> 
          are encoded so they don't break the query string structure.
        </p>
        <div className="bg-white rounded-2xl p-6 border border-[#e1e5df] shadow-sm">
          <h4 className="font-semibold text-[#0d161c] mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            Client-Side Only
          </h4>
          <p className="text-sm text-[#5a6872]">
            Like all Plzwork tools, this URL encoder runs locally in your browser. Your URLs never touch our servers, 
            ensuring your API keys, tracking tokens, and sensitive parameters stay private.
          </p>
        </div>
      </div>
    </div>
  );
}
