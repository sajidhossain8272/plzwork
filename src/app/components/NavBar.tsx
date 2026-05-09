// src/app/components/NavBar.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function NavBar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Base classes for primary links
  const linkBase     = 'block px-4 py-2 font-semibold rounded-lg transition-colors';
  const linkActive   = 'bg-[#0e171d] text-white';
  const linkInactive = 'text-[#26323a] hover:bg-[#eef7ea] hover:text-[#1d6f08]';

  // Base classes for secondary link
  const secBase      = 'block px-4 py-2 font-semibold rounded-lg transition-colors';
  const secActive    = 'bg-gray-200 text-gray-800';
  const secInactive  = 'text-[#26323a] hover:bg-gray-100';

  // Navigation items
  const links = [
    { href: '/',                     label: 'Products',            active: pathname === '/',                          primary: true },
    { href: '/quick-convert',        label: 'Quick Convert',       active: pathname === '/quick-convert',             primary: true },
    { href: 'https://github.com/sajidhossain8272/', label: 'Contact Us', active: false,                         primary: false }
  ];

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-[#dde4da] bg-white/90 shadow-sm backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3 text-2xl font-extrabold text-gray-800 tracking-tight">
            <Link href="/" onClick={() => setMenuOpen(false)}>
              <Image
                src="/plzwork-icon-crop.png"
                alt="Plzwork"
                width={44}
                height={44}
                className="h-11 w-11 rounded-lg object-cover"
              />
            </Link>
            <Link href="/" onClick={() => setMenuOpen(false)} className="leading-none">
              <span className="text-[#0d161c]">plz</span>
              <span className="text-[#42b719]">work</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {links.map((link, idx) => {
              const base     = link.primary ? linkBase     : secBase;
              const active   = link.primary ? linkActive   : secActive;
              const inactive = link.primary ? linkInactive : secInactive;
              return (
                <Link
                  key={idx}
                  href={link.href}
                  target={link.primary ? undefined : '_blank'}
                  rel={link.primary ? undefined : 'noopener noreferrer'}
                  className={`${base} ${link.active ? active : inactive}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-[#26323a] hover:text-[#42b719] focus:outline-none"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Overlay Menu */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 bg-white/95 backdrop-blur-sm z-40 flex flex-col items-center pt-20 space-y-6">
          {links.map((link, idx) => {
            const base     = link.primary ? linkBase     : secBase;
            const active   = link.primary ? linkActive   : secActive;
            const inactive = link.primary ? linkInactive : secInactive;
            return (
              <Link
                key={idx}
                href={link.href}
                target={link.primary ? undefined : '_blank'}
                rel={link.primary ? undefined : 'noopener noreferrer'}
                onClick={() => setMenuOpen(false)}
                className={`${base} text-xl ${link.active ? active : inactive}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
