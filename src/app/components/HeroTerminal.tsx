'use client';

import { useState, useEffect } from 'react';

const SEQUENCE = [
  { text: '> Initializing Plzwork OS v2.0...', delay: 500, typeTime: 30, color: 'text-gray-300' },
  { text: '[System] Core modules loaded.', delay: 400, typeTime: 0, color: 'text-green-400' },
  { text: '> Booting AI Agent "Optimus"...', delay: 800, typeTime: 40, color: 'text-gray-300' },
  { text: '[Optimus] Workspace connected. Analyzing tasks...', delay: 1000, typeTime: 20, color: 'text-[#4da72a]' },
  { text: '[Optimus] Found 14 unoptimized SVGs. Compressing...', delay: 1200, typeTime: 15, color: 'text-[#4da72a]' },
  { text: '  -> compression complete. [DONE in 0.4s]', delay: 800, typeTime: 0, color: 'text-green-400' },
  { text: '[Optimus] Generating AI alt-text for bulk upload...', delay: 1000, typeTime: 15, color: 'text-[#4da72a]' },
  { text: '  -> 12 images processed. [DONE in 1.2s]', delay: 1200, typeTime: 0, color: 'text-green-400' },
  { text: '[Optimus] All queues clear. 100% efficient.', delay: 800, typeTime: 20, color: 'text-[#4da72a]' },
  { text: '> System standing by for user input...', delay: 1000, typeTime: 30, color: 'text-gray-300' },
];

export default function HeroTerminal() {
  const [lines, setLines] = useState<{text: string, color: string}[]>([]);
  const [currentLine, setCurrentLine] = useState<{text: string, color: string} | null>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= SEQUENCE.length) {
      // Loop after 6 seconds
      const t = setTimeout(() => {
        setLines([]);
        setCurrentLine(null);
        setStep(0);
      }, 6000);
      return () => clearTimeout(t);
    }

    const currentDef = SEQUENCE[step];
    
    // Wait for delay before starting
    const delayTimer = setTimeout(() => {
      if (currentDef.typeTime === 0) {
        // Instant pop
        setLines(prev => [...prev, { text: currentDef.text, color: currentDef.color }]);
        setStep(s => s + 1);
      } else {
        // Typewriter effect
        let charIndex = 0;
        setCurrentLine({ text: '', color: currentDef.color });
        
        const typeInterval = setInterval(() => {
          charIndex++;
          setCurrentLine({ text: currentDef.text.substring(0, charIndex), color: currentDef.color });
          
          if (charIndex >= currentDef.text.length) {
            clearInterval(typeInterval);
            setLines(prev => [...prev, { text: currentDef.text, color: currentDef.color }]);
            setCurrentLine(null);
            setStep(s => s + 1);
          }
        }, currentDef.typeTime);
        
        return () => clearInterval(typeInterval);
      }
    }, currentDef.delay);

    return () => clearTimeout(delayTimer);
  }, [step]);

  return (
    <div className="w-full max-w-xl mx-auto overflow-hidden rounded-2xl bg-[#0e171d] border border-gray-800 shadow-2xl flex flex-col h-[400px]">
      {/* Terminal Header */}
      <div className="h-12 bg-[#17222a] border-b border-gray-800 flex items-center px-4 shrink-0">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="flex-1 text-center text-xs font-medium text-gray-500 font-mono tracking-wider">
          optimus@plzwork:~
        </div>
        <div className="w-11" /> {/* Spacer to center the title */}
      </div>

      {/* Terminal Body */}
      <div className="p-6 flex-1 overflow-y-auto font-mono text-sm leading-relaxed">
        <div className="flex flex-col gap-1.5">
          {lines.map((line, i) => (
            <div key={i} className={`${line.color} break-words`}>
              {line.text}
            </div>
          ))}
          
          {currentLine && (
            <div className={`${currentLine.color} break-words`}>
              {currentLine.text}<span className="inline-block w-2 h-4 bg-gray-400 ml-1 animate-pulse align-middle" />
            </div>
          )}
          
          {/* Blinking cursor when idle */}
          {!currentLine && step < SEQUENCE.length && (
            <div><span className="inline-block w-2 h-4 bg-gray-400 animate-pulse align-middle" /></div>
          )}
          {!currentLine && step >= SEQUENCE.length && (
            <div className="mt-2 text-gray-500 flex items-center">
              <span>$</span>
              <span className="inline-block w-2 h-4 bg-gray-400 ml-2 animate-pulse align-middle" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
