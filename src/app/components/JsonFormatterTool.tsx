'use client';

import { useState } from 'react';
import { FaCopy, FaTrash, FaCode, FaCheck, FaExclamationTriangle, FaMagic, FaCompressArrowsAlt } from 'react-icons/fa';

export default function JsonFormatterTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const [errorDetails, setErrorDetails] = useState<{ pos: number; line: number; col: number; msg: string; type: string } | null>(null);

  const handleFormat = (text: string) => {
    setInput(text);
    if (!text.trim()) {
      setOutput('');
      setError(null);
      setErrorDetails(null);
      return;
    }

    try {
      const parsed = JSON.parse(text);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError(null);
      setErrorDetails(null);
    } catch (err: any) {
      const msg = err.message;
      setError(msg);
      setOutput('');
      
      // Parse error details
      const posMatch = msg.match(/at position (\d+)/);
      const lineMatch = msg.match(/line (\d+)/);
      const colMatch = msg.match(/column (\d+)/);
      
      if (posMatch) {
        setErrorDetails({
          pos: parseInt(posMatch[1]),
          line: lineMatch ? parseInt(lineMatch[1]) : 0,
          col: colMatch ? parseInt(colMatch[1]) : 0,
          msg: msg,
          type: msg.includes("Expected ','") ? 'comma' : 
                msg.includes("Expected ']'") ? 'bracket-close' : 'unknown'
        });
      }
    }
  };

  const applyQuickFix = () => {
    if (!errorDetails) return;
    
    let fixedInput = input;
    const { pos, type } = errorDetails;
    
    if (type === 'comma') {
      fixedInput = input.slice(0, pos) + ',' + input.slice(pos);
    } else if (type === 'bracket-close') {
      fixedInput = input.slice(0, pos) + ']' + input.slice(pos);
    }
    
    handleFormat(fixedInput);
  };

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const copyToClipboard = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-amber-50 rounded-2xl text-amber-600 mb-4">
          <FaCode size={24} />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#0d161c] tracking-tight mb-4">
          JSON Formatter & Validator
        </h1>
        <p className="text-lg text-[#5a6872] max-w-2xl mx-auto">
          Clean up messy JSON, validate its structure, and minify it for production. 
          All processing is done locally in your browser.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 flex items-start justify-between gap-3 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-start gap-3">
            <FaExclamationTriangle className="mt-1 shrink-0" />
            <div className="text-sm font-medium">
              <span className="font-bold">Invalid JSON:</span> {error}
            </div>
          </div>
          {errorDetails && errorDetails.type !== 'unknown' && (
            <button 
              onClick={applyQuickFix}
              className="shrink-0 px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700 transition shadow-sm flex items-center gap-1.5"
            >
              <FaMagic size={10} />
              Quick Fix
            </button>
          )}
        </div>
      )}

      {/* Main Dual Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 relative">
        
        {/* LEFT PANE: Input */}
        <div className="flex flex-col h-[600px] bg-white rounded-[2rem] shadow-sm border border-[#e1e5df] overflow-hidden focus-within:ring-2 focus-within:ring-amber-500/20 transition-shadow">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#f0f2f0] bg-gray-50/50">
            <h2 className="font-semibold text-[#0d161c]">Raw JSON Input</h2>
            <div className="flex gap-2">
              <button 
                onClick={clearAll}
                className="p-2 text-[#5a6872] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Clear all"
              >
                <FaTrash size={14} />
              </button>
            </div>
          </div>
          <div className="flex-1 flex overflow-hidden">
            {/* Line Numbers */}
            <div 
              id="json-gutter"
              className="w-12 bg-gray-50 border-r border-gray-100 py-6 text-right pr-3 text-[#a3b1a0] font-mono text-sm select-none overflow-hidden"
            >
              {input.split('\n').map((_, i) => (
                <div key={i} className="leading-relaxed">{i + 1}</div>
              ))}
            </div>
            {/* Textarea */}
            <textarea
              id="json-input-area"
              className="flex-1 p-6 resize-none focus:outline-none text-[#26323a] font-mono text-sm leading-relaxed bg-transparent overflow-y-auto whitespace-pre"
              placeholder='Paste your JSON here...&#10;Example: {"name":"John", "age":30, "city":"New York"}'
              value={input}
              onScroll={(e) => {
                const gutter = document.getElementById('json-gutter');
                if (gutter) gutter.scrollTop = (e.currentTarget as HTMLTextAreaElement).scrollTop;
              }}
              onChange={(e) => handleFormat(e.target.value)}
            />
          </div>
        </div>

        {/* RIGHT PANE: Output */}
        <div className="flex flex-col h-[600px] bg-white rounded-[2rem] shadow-sm border border-[#e1e5df] overflow-hidden focus-within:ring-2 focus-within:ring-amber-500/20 transition-shadow">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#f0f2f0] bg-gray-50/50">
            <h2 className="font-semibold text-[#0d161c]">Formatted Result</h2>
            <div className="flex gap-2">
              <button 
                onClick={() => handleFormat(input)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors border border-amber-200"
              >
                <FaMagic />
                Beautify
              </button>
              <button 
                onClick={handleMinify}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
              >
                <FaCompressArrowsAlt />
                Minify
              </button>
              <div className="w-px h-6 bg-gray-200 mx-1"></div>
              <button 
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-white bg-[#0d161c] hover:bg-[#1d2a32] rounded-lg transition-colors shadow-sm"
              >
                {copied ? <FaCheck /> : <FaCopy />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
          <div className="flex-1 flex overflow-hidden bg-gray-50/30">
            {/* Line Numbers */}
            <div 
              id="json-output-gutter"
              className="w-12 bg-gray-100/50 border-r border-gray-100 py-6 text-right pr-3 text-[#a3b1a0] font-mono text-sm select-none overflow-hidden"
            >
              {output.split('\n').map((_, i) => (
                <div key={i} className="leading-relaxed">{i + 1}</div>
              ))}
            </div>
            {/* Textarea */}
            <textarea
              id="json-output-area"
              className="flex-1 p-6 resize-none focus:outline-none text-[#26323a] font-mono text-sm leading-relaxed bg-transparent overflow-y-auto whitespace-pre"
              placeholder="Your formatted JSON will appear here..."
              value={output}
              onScroll={(e) => {
                const gutter = document.getElementById('json-output-gutter');
                if (gutter) gutter.scrollTop = (e.currentTarget as HTMLTextAreaElement).scrollTop;
              }}
              readOnly
            />
          </div>
        </div>

      </div>

      {/* Info Section */}
      <div className="mt-16 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold text-[#0d161c] mb-4">Why use a JSON Formatter?</h3>
            <p className="text-[#5a6872] leading-relaxed text-sm">
              JSON is often minified to save space during transit, making it nearly impossible for humans to read. 
              Our formatter restores the indentation and structure, making it easy to debug API responses or 
              configuration files.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-[#e1e5df] shadow-sm">
            <h4 className="font-semibold text-[#0d161c] mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Instant Validation
            </h4>
            <p className="text-sm text-[#5a6872]">
              As you type, our tool validates your JSON syntax. If there is a missing comma, unquoted key, 
              or mismatched bracket, you will see a detailed error message immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
