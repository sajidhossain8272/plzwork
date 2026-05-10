'use client';

import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaCopy, FaTrash, FaExchangeAlt, FaFileUpload, FaCheck } from 'react-icons/fa';

export default function Base64Tool() {
  const [rawText, setRawText] = useState('');
  const [base64Text, setBase64Text] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const [copiedRaw, setCopiedRaw] = useState(false);
  const [copiedBase64, setCopiedBase64] = useState(false);
  const [isFileMode, setIsFileMode] = useState(false);
  const [fileName, setFileName] = useState('');

  // Handle Raw Text Change
  const handleRawChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setIsFileMode(false);
    setRawText(text);
    try {
      // Encode to Base64 safely handling utf-8
      const encoded = btoa(unescape(encodeURIComponent(text)));
      setBase64Text(encoded);
      setError(null);
    } catch {
      setError('Cannot encode input.');
    }
  };

  // Handle Base64 Text Change
  const handleBase64Change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const b64 = e.target.value;
    setBase64Text(b64);
    
    // If it's empty, clear both
    if (!b64.trim()) {
      setRawText('');
      setError(null);
      return;
    }

    try {
      // Decode Base64
      const decoded = decodeURIComponent(escape(atob(b64)));
      setRawText(decoded);
      setIsFileMode(false);
      setError(null);
    } catch {
      setError('Invalid Base64 string.');
    }
  };

  // Handle File Drop
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsFileMode(true);
    setFileName(file.name);
    
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // result is a Data URL: data:image/png;base64,iVBORw0KGgo...
      // We can either put the whole data URL or just the base64 part.
      // Usually developers want the whole data URL for CSS/HTML or just the string.
      // Let's provide the whole data URL as it's most useful.
      setBase64Text(result);
      setRawText(`[File: ${file.name}]\nSize: ${(file.size / 1024).toFixed(2)} KB\nType: ${file.type}`);
      setError(null);
    };
    reader.onerror = () => {
      setError('Failed to read file.');
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, noClick: true });

  // Copy helpers
  const copyToClipboard = async (text: string, isRaw: boolean) => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    if (isRaw) {
      setCopiedRaw(true);
      setTimeout(() => setCopiedRaw(false), 2000);
    } else {
      setCopiedBase64(true);
      setTimeout(() => setCopiedBase64(false), 2000);
    }
  };

  const clearAll = () => {
    setRawText('');
    setBase64Text('');
    setIsFileMode(false);
    setFileName('');
    setError(null);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-green-50 rounded-2xl text-[#42b719] mb-4">
          <FaExchangeAlt size={24} />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#0d161c] tracking-tight mb-4">
          Base64 Encoder / Decoder
        </h1>
        <p className="text-lg text-[#5a6872] max-w-2xl mx-auto">
          Instantly encode text or files to Base64, or decode Base64 back to raw text. 
          Everything happens securely right here in your browser.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 flex items-center justify-center font-medium animate-in fade-in slide-in-from-top-2">
          {error}
        </div>
      )}

      {/* Main Dual Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 relative" {...getRootProps()}>
        <input {...getInputProps()} />

        {/* Drag Overlay */}
        {isDragActive && (
          <div className="absolute inset-0 z-50 bg-[#42b719]/10 backdrop-blur-sm rounded-[2rem] border-2 border-dashed border-[#42b719] flex flex-col items-center justify-center animate-in fade-in zoom-in-95">
            <FaFileUpload size={48} className="text-[#42b719] mb-4 animate-bounce" />
            <p className="text-2xl font-bold text-[#42b719]">Drop file to encode</p>
          </div>
        )}

        {/* LEFT PANE: Raw Text */}
        <div className="flex flex-col h-[500px] bg-white rounded-[2rem] shadow-sm border border-[#e1e5df] overflow-hidden focus-within:ring-2 focus-within:ring-[#42b719]/20 transition-shadow">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#f0f2f0] bg-gray-50/50">
            <h2 className="font-semibold text-[#0d161c] flex items-center gap-2">
              Raw Text / File
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
                onClick={() => copyToClipboard(rawText, true)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-[#5a6872] hover:text-[#0d161c] hover:bg-gray-100 rounded-lg transition-colors"
              >
                {copiedRaw ? <FaCheck className="text-green-500" /> : <FaCopy />}
                {copiedRaw ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
          <div className="flex-1 relative">
            <textarea
              className={`w-full h-full p-6 resize-none focus:outline-none text-[#26323a] leading-relaxed bg-transparent ${isFileMode ? 'text-gray-400 font-mono text-sm' : 'text-base'}`}
              placeholder="Type or paste raw text here...&#10;Or drag & drop any file to encode it to Base64."
              value={rawText}
              onChange={handleRawChange}
              readOnly={isFileMode}
            />
          </div>
        </div>

        {/* RIGHT PANE: Base64 */}
        <div className="flex flex-col h-[500px] bg-white rounded-[2rem] shadow-sm border border-[#e1e5df] overflow-hidden focus-within:ring-2 focus-within:ring-[#42b719]/20 transition-shadow">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#f0f2f0] bg-gray-50/50">
            <h2 className="font-semibold text-[#0d161c] flex items-center gap-2">
              Base64 Encoded
            </h2>
            <div className="flex gap-2">
              <button 
                onClick={() => copyToClipboard(base64Text, false)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-[#0d161c] hover:bg-[#1d2a32] rounded-lg transition-colors shadow-sm"
              >
                {copiedBase64 ? <FaCheck /> : <FaCopy />}
                {copiedBase64 ? 'Copied!' : 'Copy Base64'}
              </button>
            </div>
          </div>
          <div className="flex-1 relative bg-gray-50/30">
            <textarea
              className="w-full h-full p-6 resize-none focus:outline-none text-[#26323a] font-mono text-sm leading-relaxed bg-transparent break-all"
              placeholder="Paste Base64 encoded string here to decode..."
              value={base64Text}
              onChange={handleBase64Change}
            />
          </div>
        </div>

      </div>

      {/* Info Section */}
      <div className="mt-16 max-w-4xl mx-auto">
        <h3 className="text-xl font-bold text-[#0d161c] mb-4">How does this work?</h3>
        <p className="text-[#5a6872] leading-relaxed mb-6">
          Base64 is an encoding scheme used to represent binary data in an ASCII string format. 
          It&apos;s commonly used to embed images directly into HTML/CSS files, pass data safely through URLs, 
          or store complex data in JSON payloads.
        </p>
        <div className="bg-white rounded-2xl p-6 border border-[#e1e5df] shadow-sm">
          <h4 className="font-semibold text-[#0d161c] mb-2">Privacy First</h4>
          <p className="text-sm text-[#5a6872]">
            This tool operates entirely within your browser. Whether you are encoding text or dragging and dropping files, 
            absolutely <strong>no data</strong> is sent to any external server. It is 100% private, instantaneous, and secure.
          </p>
        </div>
      </div>
    </div>
  );
}
