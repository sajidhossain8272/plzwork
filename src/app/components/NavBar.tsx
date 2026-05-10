// src/app/components/NavBar.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';
import { TOOLS } from '@/data/tools';

export default function NavBar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Find active tool from path
  const activeTool = TOOLS.find(t => t.href === pathname);

  // Floating Pill Design Base
  const linkBase     = 'px-5 py-2.5 font-medium rounded-full transition-all duration-300 text-sm tracking-wide';
  const linkActive   = 'bg-[#0d161c] text-white shadow-md shadow-black/10 scale-105';
  const linkInactive = 'text-[#5a6872] hover:bg-black/5 hover:text-[#0d161c]';

  // Navigation items
  const links = [
    { href: '/',                     label: 'App Store',           active: pathname === '/' },
    { 
      href: activeTool ? activeTool.href : '/quick-convert',        
      label: activeTool ? activeTool.name : 'Quick Convert',       
      active: pathname === (activeTool ? activeTool.href : '/quick-convert') 
    },
    { href: '#pricing',              label: 'Pricing',             active: false },
    { href: '#api',                  label: 'API Docs',            active: false },
    { href: 'https://github.com/sajidhossain8272/', label: 'Contact', active: false }
  ];

  return (
    <>
      <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 shadow-sm backdrop-blur-xl' : ''}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className={`transition-all duration-500 flex items-center justify-between border ${
            isScrolled 
              ? 'py-3 border-transparent rounded-none mx-0' 
              : 'py-3 mt-6 rounded-[2rem] border-white/40 bg-white/70 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-xl px-2 sm:px-4 -mx-[20px]'
          }`}>
            {/* Logo only, no text */}
            <div className={`flex-shrink-0 transition-all duration-500 flex items-center ${isScrolled ? 'lg:-ml-[50px]' : ''}`}>
              <Link href="/" onClick={() => setMenuOpen(false)} className="block group">
                <div className="relative h-14 w-14 overflow-hidden transition-transform duration-500 group-hover:scale-105">
                  <Image
                    src="/plzwork-logo-icon.png"
                    alt="Logo"
                    fill
                    className="object-cover scale-[1.3]"
                  />
                </div>
              </Link>
              
              {/* Badge that pops up when scrolled */}
              <div 
                className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center ${
                  isScrolled ? 'w-[210px] opacity-100 ml-4' : 'w-0 opacity-0 ml-0 pointer-events-none'
                }`}
              >
                <div className="whitespace-nowrap inline-flex items-center gap-2.5 rounded-full border border-[#d9ded8]/60 bg-white/60 px-3.5 py-1.5 text-[13px] font-semibold text-[#26323a] shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-[#52c41a]" />
                  Tools that actually work
                </div>
              </div>
            </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2 bg-white/50 p-1.5 rounded-full border border-black/5">
            {links.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                target={link.label === 'Contact' ? '_blank' : undefined}
                rel={link.label === 'Contact' ? 'noopener noreferrer' : undefined}
                className={`${linkBase} ${link.active ? linkActive : linkInactive}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden pr-2">
            <button
              className="p-2.5 rounded-full bg-white/50 border border-black/5 text-[#0d161c] shadow-sm focus:outline-none hover:bg-white transition-colors"
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
          </nav>
        </div>
      </div>

      {/* Mobile Overlay Menu */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 bg-[#f7f7f4]/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center space-y-6">
          <button 
            onClick={() => setMenuOpen(false)}
            className="absolute top-8 right-8 p-3 rounded-full bg-white shadow-sm border border-gray-100 text-gray-500 hover:text-black transition-colors"
          >
            <FaTimes size={24} />
          </button>
          <div className="flex flex-col items-center space-y-4">
            {links.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                target={link.label === 'Contact' ? '_blank' : undefined}
                rel={link.label === 'Contact' ? 'noopener noreferrer' : undefined}
                onClick={() => setMenuOpen(false)}
                className={`text-2xl font-bold tracking-tight px-6 py-3 rounded-2xl transition-all ${
                  link.active ? 'bg-[#0d161c] text-white shadow-lg' : 'text-[#5a6872] hover:bg-white hover:text-[#0d161c] hover:shadow-sm'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
