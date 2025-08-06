// src/components/layout/header.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-black text-white fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-design-button  text-white">
              <div className="flex flex-col leading-tight">
                <span>Economia</span>
                <span>guiada por IA</span>
              </div>
            </Link>
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden md:flex">
            <button className="border border-white text-white px-4 py-0.5 rounded-full hover:bg-white hover:text-black transition-colors text-design-button ">
              Quero meu exemplar
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-gray-300 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-600">
            <div className="flex flex-col space-y-4">
              <button 
                className="border border-white text-white px-4 py-0.5 rounded-full hover:bg-white hover:text-black transition-colors text-center text-design-button "
                onClick={() => setIsMenuOpen(false)}
              >
                Quero meu exemplar
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}