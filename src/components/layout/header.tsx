// src/components/layout/header.tsx
"use client";


import Link from 'next/link';
import { LanguageSelector } from './language-selector';
import { useI18n } from '../../../lib/i18n';

export function Header() {
  const { t, locale } = useI18n();

  return (
    <header key={locale} className="bg-black text-white fixed top-0 left-0 right-0 z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center"> 
            <Link href="/" className="text-white">
              <img 
                src="/economiaguiadaporia.png"
                className="h-8 w-auto md:h-10 lg:h-10" // Menor no mobile
                alt="Economia Guiada por IA"
              />
              </Link>
               </div>
               <div className="hidden md:flex items-center relative">
  <div className="flex-shrink-0 absolute -left-20 pointer-events-none">
    <div className="pointer-events-auto">
      <LanguageSelector className="min-w-[160px] whitespace-nowrap" />
    </div>
  </div>
  <button
    type="button"
    onClick={() => {
      const formulario = document.getElementById("formularioContato");
      if (formulario) {
        formulario.scrollIntoView({ behavior: "smooth" });
      } else {
        console.warn("Elemento com id formularioContato não encontrado!");
      }
    }}
    className="relative z-50 border border-white text-white px-4 py-0.5 rounded-full hover:bg-white hover:text-black transition-colors text-design-button"
  >
    {t("hero.cta")}
  </button>
</div>

{/* Mobile: AJUSTE MANUAL - Apenas o LanguageSelector se move */}
<div className="md:hidden flex items-center relative">
  <div 
    className="w-36 min-w-36"
    style={{ transform: 'translateX(65px)' }} /* AJUSTE AQUI: valores positivos movem para direita, negativos para esquerda */
  >
    <LanguageSelector className="text-xs w-full" />
  </div>
  <button
    type="button"
    onClick={() => {
      const formulario = document.getElementById("formularioContato");
      if (formulario) {
        formulario.scrollIntoView({ behavior: "smooth" });
      } else {
        console.warn("Elemento com id formularioContato não encontrado!");
      }
    }}
    className="border border-white text-white px-2 py-1 rounded-full hover:bg-white hover:text-black transition-colors text-xs whitespace-nowrap flex-shrink-0"
  >
    {t("hero.cta")}
  </button>
</div>
        </div>
      </div>
    </header>
  );
}