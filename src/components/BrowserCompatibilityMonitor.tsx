"use client";

import { useEffect, useState } from 'react';
// Caminho corrigido - baseado na estrutura atual do projeto
import { 
  detectBrowser, 
  checkBrowserSupport, 
  useBrowserCompatibility,
  type BrowserInfo,
  type SupportInfo 
} from '../../lib/utils';

export function BrowserCompatibilityMonitor() {
  // Use o hook do utils.ts em vez de recriar a lógica
  const { browserInfo, supportInfo } = useBrowserCompatibility();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (browserInfo && supportInfo) {
      // Sempre mostrar para visualização
      setIsVisible(true);

      // Log das informações para debug
      console.group('🔍 Monitoramento de Compatibilidade');
      console.log('Navegador:', browserInfo);
      console.log('Suporte:', supportInfo);
      console.log('User Agent:', navigator.userAgent);
      
      // Verificar se os polyfills estão funcionando
      const polyfillsWorking = {
        objectAssign: !!Object.assign,
        arrayFrom: !!Array.from,
        arrayIncludes: !!Array.prototype.includes,
        stringIncludes: !!String.prototype.includes,
      };
      console.log('Polyfills:', polyfillsWorking);
      console.groupEnd();

      // Auto-hide após 10 segundos se não for Edge problemático
      if (!browserInfo.isOldEdge) {
        setTimeout(() => setIsVisible(false), 10000);
      }
    }
  }, [browserInfo, supportInfo]);

  // Sempre mostrar para visualização (remover condição de desenvolvimento)
  if (!isVisible || !browserInfo || !supportInfo) {
    return null;
  }

  const getStatusColor = (supported: boolean) => 
    supported ? 'text-green-600' : 'text-red-600';

  const getBrowserIcon = () => {
    if (browserInfo.isEdge) return '🌐';
    if (browserInfo.name === 'chrome') return '🌊';
    if (browserInfo.name === 'firefox') return '🦊';
    if (browserInfo.name === 'safari') return '🧭';
    return '🌍';
  };

  const getCompatibilityStatus = () => {
    if (browserInfo.isOldEdge) return '⚠️ Edge Legacy - Polyfills Ativos';
    if (browserInfo.isModernEdge) return '✅ Edge Moderno - Compatível';
    return '✅ Navegador Compatível';
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg">{getBrowserIcon()}</span>
            <span className="font-semibold text-gray-900">Compatibilidade</span>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="space-y-2">
          <div>
            <p className="text-gray-600">
              <strong>Navegador:</strong> {browserInfo.name} {browserInfo.version}
            </p>
            <p className={`text-sm ${browserInfo.isOldEdge ? 'text-orange-600' : 'text-green-600'}`}>
              {getCompatibilityStatus()}
            </p>
          </div>

          <div>
            <p className="font-medium text-gray-700 mb-1">Recursos:</p>
            <div className="grid grid-cols-2 gap-1 text-xs">
              <span className={getStatusColor(supportInfo.intersectionObserver)}>
                ✓ IntersectionObserver
              </span>
              <span className={getStatusColor(supportInfo.webp)}>
                ✓ WebP
              </span>
              <span className={getStatusColor(supportInfo.avif)}>
                ✓ AVIF
              </span>
              <span className={getStatusColor(supportInfo.cssGrid)}>
                ✓ CSS Grid
              </span>
              <span className={getStatusColor(supportInfo.flexbox)}>
                ✓ Flexbox
              </span>
              <span className={getStatusColor(supportInfo.cssCustomProperties)}>
                ✓ CSS Variables
              </span>
              <span className={getStatusColor(supportInfo.clampFunction)}>
                ✓ CSS Clamp
              </span>
              <span className={getStatusColor(supportInfo.backdropFilter)}>
                ✓ Backdrop Filter
              </span>
            </div>
          </div>

          {browserInfo.isOldEdge && (
            <div className="mt-2 p-2 bg-orange-50 border border-orange-200 rounded text-xs">
              <p className="text-orange-800">
                <strong>Edge Legacy detectado!</strong><br />
                Polyfills automáticos estão ativos para garantir compatibilidade total.
              </p>
            </div>
          )}

          {browserInfo.isMobile && (
            <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs">
              <p className="text-blue-800">
                📱 <strong>Dispositivo móvel detectado</strong>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}