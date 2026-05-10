'use client';

import { useState, useEffect, useCallback } from 'react';
import { FaCopy, FaSync, FaLock, FaCheck, FaShieldAlt, FaInfoCircle } from 'react-icons/fa';

export default function PasswordGeneratorTool() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState({ score: 0, label: 'Weak', color: 'bg-red-500' });

  const generatePassword = useCallback(() => {
    const charset: { [key: string]: string } = {
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-=',
    };

    let characters = '';
    Object.keys(options).forEach((key) => {
      if (options[key as keyof typeof options]) {
        characters += charset[key];
      }
    });

    if (characters === '') {
      setPassword('');
      return;
    }

    let generatedPassword = '';
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
      generatedPassword += characters.charAt(array[i] % characters.length);
    }

    setPassword(generatedPassword);
    calculateStrength(generatedPassword);
  }, [length, options]);

  const calculateStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length > 8) score++;
    if (pwd.length > 12) score++;
    if (pwd.length > 20) score++;
    if (pwd.length > 32) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score < 4) setStrength({ score, label: 'Weak', color: 'bg-red-500' });
    else if (score < 6) setStrength({ score, label: 'Good', color: 'bg-amber-500' });
    else if (score < 8) setStrength({ score, label: 'Strong', color: 'bg-green-500' });
    else setStrength({ score, label: 'Very Strong', color: 'bg-emerald-600' });
  };

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const copyToClipboard = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-emerald-50 rounded-2xl text-emerald-600 mb-4">
          <FaLock size={24} />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#0d161c] tracking-tight mb-4">
          Secure Password Generator
        </h1>
        <p className="text-lg text-[#5a6872] max-w-2xl mx-auto">
          Create cryptographically secure, random passwords instantly. 
          Customizable length and character sets to meet any security requirement.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Main Display Pane */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-[#e1e5df] mb-8">
          <div className="relative group mb-8">
            <div className="w-full bg-gray-50 rounded-2xl p-6 border border-gray-100 flex items-center justify-between min-h-[100px]">
              <code className="text-2xl md:text-3xl font-mono font-bold text-[#0d161c] break-all select-all pr-12">
                {password || 'Select an option...'}
              </code>
              <div className="flex gap-2">
                <button 
                  onClick={generatePassword}
                  className="p-3 text-[#5a6872] hover:text-[#0d161c] hover:bg-gray-100 rounded-xl transition-all active:rotate-180 duration-500"
                  title="Regenerate"
                >
                  <FaSync />
                </button>
                <button 
                  onClick={copyToClipboard}
                  className={`p-3 rounded-xl transition-all shadow-sm ${copied ? 'bg-emerald-500 text-white' : 'bg-[#0d161c] text-white hover:bg-black'}`}
                  title="Copy"
                >
                  {copied ? <FaCheck /> : <FaCopy />}
                </button>
              </div>
            </div>
            
            {/* Strength Meter */}
            <div className="mt-4 px-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-[#5a6872] uppercase tracking-widest">Strength: {strength.label}</span>
                <span className="text-xs font-bold text-[#5a6872]">{Math.min(100, (strength.score / 8) * 100)}%</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${strength.color}`} 
                  style={{ width: `${(strength.score / 8) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Length Control */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <label className="text-sm font-bold text-[#0d161c]">Password Length</label>
                <span className="px-2 py-1 bg-gray-100 rounded-lg text-sm font-mono font-bold">{length}</span>
              </div>
              <input 
                type="range" 
                min="4" 
                max="64" 
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#0d161c]"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-bold px-1">
                <span>4</span>
                <span>16</span>
                <span>32</span>
                <span>48</span>
                <span>64</span>
              </div>
            </div>

            {/* Options Control */}
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(options).map((key) => (
                <label key={key} className="flex items-center gap-3 p-3 border border-[#e1e5df] rounded-xl cursor-pointer hover:bg-gray-50 transition-colors group">
                  <div className="relative flex items-center justify-center">
                    <input 
                      type="checkbox" 
                      className="peer h-5 w-5 appearance-none rounded-md border-2 border-gray-300 checked:bg-[#0d161c] checked:border-[#0d161c] transition-all cursor-pointer"
                      checked={options[key as keyof typeof options]}
                      onChange={() => setOptions(prev => ({ ...prev, [key]: !prev[key as keyof typeof options] }))}
                    />
                    <FaCheck className="absolute text-white text-[10px] opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                  </div>
                  <span className="text-sm font-semibold text-[#5a6872] group-hover:text-[#0d161c] capitalize">
                    {key}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-8 border border-[#e1e5df] shadow-sm">
            <h3 className="text-lg font-bold text-[#0d161c] mb-3 flex items-center gap-2">
              <FaShieldAlt className="text-emerald-500" />
              Cryptographically Secure
            </h3>
            <p className="text-[#5a6872] text-sm leading-relaxed">
              We use the Web Crypto API&apos;s <code>getRandomValues()</code> to ensure high entropy. 
              This is far more secure than <code>Math.random()</code>, making it safe for sensitive accounts.
            </p>
          </div>
          <div className="bg-white rounded-3xl p-8 border border-[#e1e5df] shadow-sm">
            <h3 className="text-lg font-bold text-[#0d161c] mb-3 flex items-center gap-2">
              <FaInfoCircle className="text-blue-500" />
              Privacy Guaranteed
            </h3>
            <p className="text-[#5a6872] text-sm leading-relaxed">
              All passwords are generated locally in your browser. No data is sent to our servers, 
              ensuring your passwords are never intercepted or stored.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
