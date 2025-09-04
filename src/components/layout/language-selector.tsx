"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useI18n } from '../../../lib/i18n';

interface LanguageSelectorProps {
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ className = '' }) => {
  const { locale, setLocale, availableLocales } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const localeConfig = {
    pt: { name: 'PT', flag: '', fullName: 'Portuguese' },
    en: { name: 'EN', flag: '', fullName: 'English' },
    es: { name: 'ES', flag: '', fullName: 'Spanish' }
  };

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (newLocale: string) => {
    setLocale(newLocale);
    setIsOpen(false);
  };

  // Verificar se é versão compacta (mobile)
  const isCompact = className.includes('mobile-compact');

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Botão principal com idioma atual */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-1 rounded-md border border-white/20 hover:border-white/40 transition-colors text-white bg-black/20 hover:bg-black/40 ${
          isCompact 
            ? 'px-1.5 py-0.5 text-xs' // Versão compacta para mobile
            : 'px-2 py-1 text-sm'      // Versão normal para desktop
        }`}
        aria-label="Selecionar idioma"
      >
        <span className={`font-medium ${
          isCompact ? 'text-xs' : 'text-sm'
        }`}>
          {localeConfig[locale as keyof typeof localeConfig]?.name}
        </span>
        <svg
          className={`transition-transform ${isOpen ? 'rotate-180' : ''} ${
            isCompact ? 'w-2.5 h-2.5' : 'w-3 h-3'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown com opções */}
      {isOpen && (
        <div className={`absolute top-full mt-1 right-0 bg-black border border-white/20 rounded-md shadow-lg z-50 ${
          isCompact ? 'min-w-[100px]' : 'min-w-[120px]'
        }`}>
          {availableLocales.map((loc) => {
            const config = localeConfig[loc as keyof typeof localeConfig];
            return (
              <button
                key={loc}
                onClick={() => handleLanguageChange(loc)}
                className={`w-full flex items-center space-x-2 px-3 py-2 hover:bg-white/10 transition-colors ${
                  loc === locale ? 'bg-white/5 text-white' : 'text-gray-300'
                } first:rounded-t-md last:rounded-b-md ${
                  isCompact ? 'text-xs' : 'text-sm'
                }`}
              >
                <span className="font-medium">
                  {isCompact ? config.name : `${config.name} - ${config.fullName}`}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
