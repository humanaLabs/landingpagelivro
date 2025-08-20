// lib/utils.ts - Funções utilitárias consolidadas para detecção de navegador e compatibilidade
import { useState, useEffect } from 'react'

// === INTERFACES ===
export interface BrowserInfo {
  name: string;
  version: string;
  isEdge: boolean;
  isOldEdge: boolean;
  isModernEdge: boolean;
  isChrome: boolean;
  isFirefox: boolean;
  isSafari: boolean;
  isMobile: boolean;
}

export interface SupportInfo {
  intersectionObserver: boolean;
  webp: boolean;
  avif: boolean;
  cssCustomProperties: boolean;
  cssGrid: boolean;
  flexbox: boolean;
  clampFunction: boolean;
  dropShadowFilter: boolean;
  backdropFilter: boolean;
  objectFit: boolean;
}

// === DETECÇÃO DE NAVEGADOR ===
export function detectBrowser(): BrowserInfo {
  if (typeof window === 'undefined') {
    return {
      name: 'unknown',
      version: '',
      isEdge: false,
      isOldEdge: false,
      isModernEdge: false,
      isChrome: false,
      isFirefox: false,
      isSafari: false,
      isMobile: false
    };
  }

  const userAgent = navigator.userAgent;
  const isEdge = /Edg/.test(userAgent);
  const isOldEdge = /Edge\//.test(userAgent);
  const isModernEdge = isEdge && !isOldEdge;
  const isChrome = /Chrome/.test(userAgent) && !isEdge;
  const isFirefox = /Firefox/.test(userAgent);
  const isSafari = /Safari/.test(userAgent) && !isChrome && !isEdge;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  let name = 'unknown';
  let version = '';

  if (isOldEdge) {
    name = 'edge-legacy';
    const match = userAgent.match(/Edge\/([0-9.]+)/);
    version = match ? match[1] : '';
  } else if (isModernEdge) {
    name = 'edge';
    const match = userAgent.match(/Edg\/([0-9.]+)/);
    version = match ? match[1] : '';
  } else if (isChrome) {
    name = 'chrome';
    const match = userAgent.match(/Chrome\/([0-9.]+)/);
    version = match ? match[1] : '';
  } else if (isFirefox) {
    name = 'firefox';
    const match = userAgent.match(/Firefox\/([0-9.]+)/);
    version = match ? match[1] : '';
  } else if (isSafari) {
    name = 'safari';
    const match = userAgent.match(/Version\/([0-9.]+)/);
    version = match ? match[1] : '';
  }

  return {
    name,
    version,
    isEdge,
    isOldEdge,
    isModernEdge,
    isChrome,
    isFirefox,
    isSafari,
    isMobile
  };
}

// === VERIFICAÇÃO DE SUPORTE DO NAVEGADOR ===
export function checkBrowserSupport(): SupportInfo {
  if (typeof window === 'undefined') {
    return {
      intersectionObserver: false,
      webp: false,
      avif: false,
      cssCustomProperties: false,
      cssGrid: false,
      flexbox: false,
      clampFunction: false,
      dropShadowFilter: false,
      backdropFilter: false,
      objectFit: false
    };
  }

  // Teste WebP
  const testWebP = (): boolean => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      return canvas.toDataURL('image/webp').indexOf('webp') > -1;
    } catch {
      return false;
    }
  };

  // Teste AVIF
  const testAVIF = (): boolean => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      return canvas.toDataURL('image/avif').indexOf('avif') > -1;
    } catch {
      return false;
    }
  };

  // CSS Support checks
  const cssSupports = (property: string, value: string): boolean => {
    if (typeof CSS !== 'undefined' && CSS.supports) {
      return CSS.supports(property, value);
    }
    
    // Fallback para navegadores sem CSS.supports
    try {
      const element = document.createElement('div');
      element.style.setProperty(property, value);
      return element.style.getPropertyValue(property) === value;
    } catch {
      return false;
    }
  };

  return {
    intersectionObserver: 'IntersectionObserver' in window,
    webp: testWebP(),
    avif: testAVIF(),
    cssCustomProperties: cssSupports('color', 'var(--test)'),
    cssGrid: cssSupports('display', 'grid'),
    flexbox: cssSupports('display', 'flex'),
    clampFunction: cssSupports('font-size', 'clamp(1rem, 2vw, 3rem)'),
    dropShadowFilter: cssSupports('filter', 'drop-shadow(0 0 0 black)'),
    backdropFilter: cssSupports('backdrop-filter', 'blur(10px)') || 
                   cssSupports('-webkit-backdrop-filter', 'blur(10px)'),
    objectFit: cssSupports('object-fit', 'cover')
  };
}

// === POLYFILLS ===
export function applyPolyfills(): void {
  if (typeof window === 'undefined') return;

  const browser = detectBrowser();
  const support = checkBrowserSupport();

  // Polyfill para Object.assign
  if (!Object.assign) {
    Object.assign = function(target: any, ...sources: any[]) {
      if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }
      
      const to = Object(target);
      
      for (let index = 0; index < sources.length; index++) {
        const nextSource = sources[index];
        
        if (nextSource != null) {
          for (const nextKey in nextSource) {
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      
      return to;
    };
  }

  // Polyfill para Array.from
  if (!Array.from) {
    Array.from = function<T>(arrayLike: ArrayLike<T>): T[] {
      return Array.prototype.slice.call(arrayLike);
    };
  }

  // Polyfill para Array.includes
  if (!Array.prototype.includes) {
    Array.prototype.includes = function<T>(this: T[], searchElement: T): boolean {
      return this.indexOf(searchElement) !== -1;
    };
  }

  // Polyfill para String.includes
  if (!String.prototype.includes) {
    String.prototype.includes = function(search: string): boolean {
      return this.indexOf(search) !== -1;
    };
  }

  // Adicionar classes CSS baseadas no navegador
  const html = document.documentElement;
  html.classList.add(`browser-${browser.name}`);
  
  if (browser.isMobile) {
    html.classList.add('is-mobile');
  } else {
    html.classList.add('is-desktop');
  }

  if (browser.isOldEdge) {
    html.classList.add('is-old-edge');
    console.warn('🔧 Edge Legacy detectado - Aplicando correções específicas');
  }

  // Aplicar meta tags essenciais se não existirem
  if (!document.querySelector('meta[name="viewport"]')) {
    const viewport = document.createElement('meta');
    viewport.name = 'viewport';
    viewport.content = 'width=device-width, initial-scale=1.0';
    document.head.appendChild(viewport);
  }

  // Log de debug
  if (process.env.NODE_ENV === 'development') {
    console.group('🔧 Polyfills Aplicados');
    console.log('Navegador detectado:', browser);
    console.log('Recursos suportados:', support);
    console.log('Classes CSS adicionadas:', Array.from(html.classList));
    console.groupEnd();
  }
}

// === FUNÇÕES DE COMPATIBILIDADE SEGURAS ===
// Polyfill para requestAnimationFrame (Edge Legacy)
export function safeRequestAnimationFrame(callback: FrameRequestCallback): number {
  if (typeof window === 'undefined') return 0;
  
  if (window.requestAnimationFrame) {
    return window.requestAnimationFrame(callback);
  }
  
  // Fallback para navegadores antigos
  return window.setTimeout(callback, 1000 / 60) as unknown as number;
}

// Polyfill para cancelAnimationFrame (Edge Legacy)
export function safeCancelAnimationFrame(id: number): void {
  if (typeof window === 'undefined') return;
  
  if (window.cancelAnimationFrame) {
    window.cancelAnimationFrame(id);
  } else {
    window.clearTimeout(id);
  }
}

// Função segura para addEventListener
export function safeAddEventListener(
  element: Element | Window | Document,
  event: string,
  handler: EventListener,
  options?: boolean | AddEventListenerOptions
): () => void {
  try {
    element.addEventListener(event, handler, options);
    return () => {
      try {
        element.removeEventListener(event, handler, options);
      } catch {
        // Ignorar erros de remoção
      }
    };
  } catch {
    // Fallback para navegadores antigos
    const legacyElement = element as any;
    const legacyEvent = `on${event}`;
    
    if (legacyElement[legacyEvent] !== undefined) {
      const originalHandler = legacyElement[legacyEvent];
      legacyElement[legacyEvent] = (e: Event) => {
        if (originalHandler) originalHandler(e);
        handler(e);
      };
      
      return () => {
        legacyElement[legacyEvent] = originalHandler;
      };
    }
    
    return () => {};
  }
}

// === HOOK REACT ===
// Hook React para monitorar compatibilidade
export function useBrowserCompatibility() {
  const [browserInfo, setBrowserInfo] = useState<BrowserInfo | null>(null);
  const [supportInfo, setSupportInfo] = useState<SupportInfo | null>(null);

  useEffect(() => {
    setBrowserInfo(detectBrowser());
    setSupportInfo(checkBrowserSupport());
    applyPolyfills();
  }, []);

  return { browserInfo, supportInfo };
}

// === UTILITÁRIOS DE PERFORMANCE ===
// Função para obter informações de performance
export function getPerformanceInfo() {
  if (typeof window === 'undefined' || !performance) {
    return null;
  }

  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  
  return {
    loadTime: Math.round(navigation.loadEventEnd - navigation.fetchStart),
    domContentLoaded: Math.round(navigation.domContentLoadedEventEnd - navigation.fetchStart),
    firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
    firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0,
    memoryUsage: (performance as any).memory ? {
      used: Math.round((performance as any).memory.usedJSHeapSize / 1024 / 1024),
      total: Math.round((performance as any).memory.totalJSHeapSize / 1024 / 1024)
    } : null
  };
}

// === UTILITÁRIOS GERAIS ===
// Utilitário para className condicional - versão mais robusta
export function cn(...classes: (string | undefined | null | boolean | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Função para detectar se está em desenvolvimento
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}

// Função para detectar device pixel ratio
export function getDevicePixelRatio(): number {
  return typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
}

// Função para debug condicional
export function debugLog(...args: any[]): void {
  if (isDevelopment() && typeof console !== 'undefined') {
    console.log(...args);
  }
}

// Função para suprimir erros específicos do React Refresh
export function shouldSuppressError(error: Error | string): boolean {
  const message = typeof error === 'string' ? error : error.message || '';
  
  const suppressPatterns = [
    'Cannot read properties of undefined (reading \'call\')',
    'Cannot read property \'call\' of undefined',
    'webpack/runtime/react refresh',
    'originalFactory.call',
    '$RefreshInterceptModuleExecution$',
    'RefreshRuntime',
    'HMR',
    'Hot Module Replacement'
  ];
  
  return suppressPatterns.some(pattern => message.includes(pattern));
}

// === DEBUG UTILITIES ===
export const debug = {
  log: (message: string, ...args: any[]) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[DEBUG] ${message}`, ...args);
    }
  },
 
  error: (message: string, error?: Error | any) => {
    if (process.env.NODE_ENV === 'development') {
      console.error(`[ERROR] ${message}`, error);
    }
  },
 
  warn: (message: string, ...args: any[]) => {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[WARN] ${message}`, ...args);
    }
  },
 
  info: (message: string, ...args: any[]) => {
    if (process.env.NODE_ENV === 'development') {
      console.info(`[INFO] ${message}`, ...args);
    }
  }
};

// === EXPORT DEFAULT (para compatibilidade) ===
export default {
  cn,
  detectBrowser,
  checkBrowserSupport,
  applyPolyfills,
  useBrowserCompatibility,
  safeRequestAnimationFrame,
  safeCancelAnimationFrame,
  safeAddEventListener,
  getPerformanceInfo,
  isDevelopment,
  getDevicePixelRatio,
  debugLog,
  shouldSuppressError,
  debug
};