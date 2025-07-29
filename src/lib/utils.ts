// Utility functions for cross-browser compatibility

export function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Detecção de navegador
export function detectBrowser(): {
  name: string;
  version: string;
  isEdge: boolean;
  isChrome: boolean;
  isFirefox: boolean;
  isSafari: boolean;
  isOldEdge: boolean;
  isModernEdge: boolean;
} {
  if (typeof window === 'undefined') {
    return {
      name: 'unknown',
      version: '0',
      isEdge: false,
      isChrome: false,
      isFirefox: false,
      isSafari: false,
      isOldEdge: false,
      isModernEdge: false,
    };
  }

  const userAgent = window.navigator.userAgent;
  
  // Edge detection
  const isOldEdge = /Edge\//.test(userAgent);
  const isModernEdge = /Edg\//.test(userAgent);
  const isEdge = isOldEdge || isModernEdge;
  
  // Other browsers
  const isChrome = /Chrome\//.test(userAgent) && !isEdge;
  const isFirefox = /Firefox\//.test(userAgent);
  const isSafari = /Safari\//.test(userAgent) && !isChrome && !isEdge;

  let name = 'unknown';
  let version = '0';

  if (isOldEdge) {
    name = 'edge-legacy';
    const match = userAgent.match(/Edge\/(\d+)/);
    version = match ? match[1] : '0';
  } else if (isModernEdge) {
    name = 'edge';
    const match = userAgent.match(/Edg\/(\d+)/);
    version = match ? match[1] : '0';
  } else if (isChrome) {
    name = 'chrome';
    const match = userAgent.match(/Chrome\/(\d+)/);
    version = match ? match[1] : '0';
  } else if (isFirefox) {
    name = 'firefox';
    const match = userAgent.match(/Firefox\/(\d+)/);
    version = match ? match[1] : '0';
  } else if (isSafari) {
    name = 'safari';
    const match = userAgent.match(/Safari\/(\d+)/);
    version = match ? match[1] : '0';
  }

  return {
    name,
    version,
    isEdge,
    isChrome,
    isFirefox,
    isSafari,
    isOldEdge,
    isModernEdge,
  };
}

// Verificar se funcionalidades específicas estão disponíveis
export function checkBrowserSupport() {
  if (typeof window === 'undefined') {
    return {
      intersectionObserver: false,
      webp: false,
      avif: false,
      cssCustomProperties: false,
      cssGrid: false,
      flexbox: false,
    };
  }

  return {
    intersectionObserver: 'IntersectionObserver' in window,
    webp: checkImageFormat('webp'),
    avif: checkImageFormat('avif'),
    cssCustomProperties: CSS?.supports?.('--custom: property') ?? false,
    cssGrid: CSS?.supports?.('display: grid') ?? false,
    flexbox: CSS?.supports?.('display: flex') ?? false,
  };
}

// Verificar suporte a formatos de imagem
function checkImageFormat(format: string): boolean {
  if (typeof window === 'undefined') return false;
  
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  
  try {
    const dataUrl = canvas.toDataURL(`image/${format}`);
    return dataUrl.startsWith(`data:image/${format}`);
  } catch {
    return false;
  }
}

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

// Função para detectar se estamos em um ambiente de desenvolvimento
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
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