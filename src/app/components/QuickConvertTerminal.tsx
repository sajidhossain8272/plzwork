'use client';

import { useState, useEffect } from 'react';

const SEQUENCE = [
  { text: '> npx convert jpg2png /path/my-image.jpg', delay: 500, typeTime: 30, color: 'text-gray-300' },
  { text: '[DONE] converted my-image.png (saved to /output)', delay: 600, typeTime: 0, color: 'text-green-400' },
  { text: '> npx convert word2pdf docs/report.docx', delay: 1000, typeTime: 40, color: 'text-gray-300' },
  { text: '[System] Processing bulk conversion...', delay: 800, typeTime: 20, color: 'text-[#4da72a]' },
  { text: '  -> image_01.webp [OK]', delay: 200, typeTime: 0, color: 'text-green-400' },
  { text: '  -> image_02.webp [OK]', delay: 200, typeTime: 0, color: 'text-green-400' },
  { text: '  -> image_03.webp [OK]', delay: 200, typeTime: 0, color: 'text-green-400' },
  { text: '[DONE] 12 files converted successfully.', delay: 1000, typeTime: 20, color: 'text-green-400' },
  { text: '> Standing by...', delay: 1200, typeTime: 30, color: 'text-gray-300' },
];

export default function QuickConvertTerminal() {
  const [lines, setLines] = useState<{text: string, color: string}[]>([]);
  const [currentLine, setCurrentLine] = useState<{text: string, color: string} | null>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= SEQUENCE.length) {
      const t = setTimeout(() => {
        setLines([]);
        setCurrentLine(null);
        setStep(0);
      }, 5000);
      return () => clearTimeout(t);
    }

    const currentDef = SEQUENCE[step];
    
    const delayTimer = setTimeout(() => {
      if (currentDef.typeTime === 0) {
        setLines(prev => [...prev, { text: currentDef.text, color: currentDef.color }]);
        setStep(s => s + 1);
      } else {
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
    <div className="w-full max-w-md mx-auto overflow-hidden rounded-2xl bg-[#0e171d] border border-gray-800 shadow-2xl flex flex-col h-[350px]">
      {/* Terminal Header */}
      <div className="h-10 bg-[#17222a] border-b border-gray-800 flex items-center px-4 shrink-0">
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <div className="flex-1 text-center text-[10px] font-medium text-gray-500 font-mono tracking-wider">
          bash — quick-convert
        </div>
        <div className="w-10" />
      </div>

      {/* Terminal Body */}
      <div className="p-5 flex-1 overflow-y-auto font-mono text-[13px] leading-relaxed">
        <div className="flex flex-col gap-1">
          {lines.map((line, i) => (
            <div key={i} className={`${line.color} break-words`}>
              {line.text}
            </div>
          ))}
          
          {currentLine && (
            <div className={`${currentLine.color} break-words`}>
              {currentLine.text}<span className="inline-block w-1.5 h-3.5 bg-gray-400 ml-1 animate-pulse align-middle" />
            </div>
          )}
          
          {!currentLine && (
            <div className="mt-1 text-gray-500 flex items-center">
              <span>$</span>
              <span className="inline-block w-1.5 h-3.5 bg-gray-400 ml-2 animate-pulse align-middle" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
