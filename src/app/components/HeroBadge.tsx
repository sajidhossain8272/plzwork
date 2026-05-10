'use client';

import { useState, useEffect } from 'react';

export default function HeroBadge() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="h-[38px] mb-6">
      <div 
        className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] inline-flex items-center gap-3 rounded-full border border-[#d9ded8] bg-white px-4 py-2 text-sm font-semibold text-[#26323a] ${
          isScrolled ? 'opacity-0 -translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'
        }`}
      >
        <span className="h-2 w-2 rounded-full bg-[#52c41a]" />
        Tools that actually work
      </div>
    </div>
  );
}
