import type { Metadata } from "next";
import { Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import ScrollRestoration from "@/components/ScrollRestoration";

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = { 
  title: "AI-Driven Economy - Eduardo Ibrahim",
  description: "Discover how artificial intelligence is changing the logic of value, work, and decision-making in companies.",
  keywords: ["economy", "artificial intelligence", "AI", "Eduardo Ibrahim", "book", "business", "technology"],
  authors: [{ name: "Eduardo Ibrahim" }],
  creator: "Eduardo Ibrahim",
  publisher: "Eduardo Ibrahim",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "AI-Driven Economy - Eduardo Ibrahim",
    description: "Discover how artificial intelligence is changing the logic of value, work, and decision-making in companies.",
    url: "https://ai-driveneconomy.com",
    siteName: "AI-Driven Economy",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://ai-driveneconomy.com/ade-og.jpg", // recommended horizontal 1200x630 version
        width: 1200,
        height: 630,
        alt: "Cover of the book AI-Driven Economy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI-Driven Economy - Eduardo Ibrahim",
    description: "Discover how artificial intelligence is changing the logic of value, work, and decision-making in companies.",
    creator: "@eduardoibrahim",
    images: ["https://ai-driveneconomy.com/ade-og.jpg"], // same image for Twitter
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};



// Componente ErrorBoundary que funciona no App Directory
function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Algo deu errado
        </h2>
        <p className="text-gray-600 mb-4">
          Ocorreu um erro inesperado. Tente recarregar a página.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Recarregar página
        </button>
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-4 text-left">
            <summary className="cursor-pointer text-sm text-gray-500">
              Detalhes do erro (desenvolvimento)
            </summary>
            <pre className="text-xs bg-gray-100 p-2 mt-2 rounded overflow-auto">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>

      <head>
        {/* Polyfills e compatibilidade - executado primeiro */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Polyfills críticos para Edge - execução imediata
              (function() {
                'use strict';
                
                // Detectar Edge
                var isEdge = /Edge\\//.test(navigator.userAgent) || /Edg\\//.test(navigator.userAgent);
                var isOldEdge = /Edge\\//.test(navigator.userAgent);
                
                // Polyfill Object.assign (crítico)
                if (!Object.assign) {
                  Object.assign = function(target) {
                    if (target == null) throw new TypeError('Cannot convert undefined or null to object');
                    var to = Object(target);
                    for (var index = 1; index < arguments.length; index++) {
                      var nextSource = arguments[index];
                      if (nextSource != null) {
                        for (var nextKey in nextSource) {
                          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                          }
                        }
                      }
                    }
                    return to;
                  };
                }
                
                // Polyfill Array.from (crítico)
                if (!Array.from) {
                  Array.from = function(arrayLike, mapFn, thisArg) {
                    var C = this;
                    var items = Object(arrayLike);
                    if (arrayLike == null) throw new TypeError('Array.from requires an array-like object');
                    var len = parseInt(items.length) || 0;
                    var A = typeof C === 'function' ? Object(new C(len)) : new Array(len);
                    var k = 0;
                    while (k < len) {
                      var kValue = items[k];
                      if (mapFn) {
                        A[k] = typeof thisArg === 'undefined' ? mapFn(kValue, k) : mapFn.call(thisArg, kValue, k);
                      } else {
                        A[k] = kValue;
                      }
                      k += 1;
                    }
                    A.length = len;
                    return A;
                  };
                }
                
                // Polyfill Array.includes
                if (!Array.prototype.includes) {
                  Array.prototype.includes = function(searchElement, fromIndex) {
                    var O = Object(this);
                    var len = parseInt(O.length) || 0;
                    if (len === 0) return false;
                    var n = parseInt(fromIndex) || 0;
                    var k = n >= 0 ? n : Math.max(len + n, 0);
                    while (k < len) {
                      if (O[k] === searchElement || (O[k] !== O[k] && searchElement !== searchElement)) {
                        return true;
                      }
                      k++;
                    }
                    return false;
                  };
                }
                
                // Polyfill String.includes
                if (!String.prototype.includes) {
                  String.prototype.includes = function(search, start) {
                    if (typeof start !== 'number') start = 0;
                    if (start + search.length > this.length) {
                      return false;
                    } else {
                      return this.indexOf(search, start) !== -1;
                    }
                  };
                }
                
                // Console methods patch
                if (typeof console !== 'undefined') {
                  var methods = ['debug', 'info', 'warn', 'error', 'log'];
                  for (var i = 0; i < methods.length; i++) {
                    if (!console[methods[i]]) {
                      console[methods[i]] = console.log || function() {};
                    }
                  }
                }
                
                // Performance patches para Edge Legacy
                if (isOldEdge && window.performance) {
                  if (window.performance.mark) {
                    var originalMark = window.performance.mark;
                    window.performance.mark = function(name) {
                      try {
                        return originalMark.call(this, name);
                      } catch (e) {
                        return;
                      }
                    };
                  }
                  
                  if (window.performance.measure) {
                    var originalMeasure = window.performance.measure;
                    window.performance.measure = function(name, start, end) {
                      try {
                        return originalMeasure.call(this, name, start, end);
                      } catch (e) {
                        return;
                      }
                    };
                  }
                }
                
                console.log('✅ Polyfills carregados para ' + (isOldEdge ? 'Edge Legacy' : isEdge ? 'Edge Moderno' : 'navegador genérico'));
              })();
            `,
          }}
        />
        
        {/* Error handling - executado após polyfills */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Error handling robusto para Edge
              (function() {
                'use strict';
                
                var suppressPatterns = [
                  'Cannot read properties of undefined (reading \\'call\\')',
                  'Cannot read property \\'call\\' of undefined',
                  'webpack/runtime/react refresh',
                  'originalFactory.call',
                  '$RefreshInterceptModuleExecution$',
                  'RefreshRuntime',
                  'HMR',
                  'Hot Module Replacement',
                  'ChunkLoadError'
                ];
                
                function shouldSuppressError(message) {
                  return suppressPatterns.some(function(pattern) {
                    return message && message.includes && message.includes(pattern);
                  });
                }
                
                // Override console.error
                if (typeof console !== 'undefined' && console.error) {
                  var originalError = console.error;
                  console.error = function() {
                    var args = Array.prototype.slice.call(arguments);
                    var message = args[0];
                    
                    if (typeof message === 'string' && shouldSuppressError(message)) {
                      if (console.debug) {
                        console.debug('🔇 Erro suprimido (Edge compatibility):', message);
                      }
                      return;
                    }
                    
                    originalError.apply(console, args);
                  };
                }
                
                // Global error handler
                window.addEventListener('error', function(event) {
                  var errorMessage = (event.error && event.error.message) || event.message || '';
                  
                  if (shouldSuppressError(errorMessage)) {
                    event.preventDefault();
                    return false;
                  }
                });
                
                // Promise rejection handler
                window.addEventListener('unhandledrejection', function(event) {
                  var reason = event.reason || {};
                  var reasonMessage = reason.message || reason.toString() || '';
                  
                  if (shouldSuppressError(reasonMessage)) {
                    event.preventDefault();
                    return false;
                  }
                });
                
                console.log('✅ Error handling configurado para compatibilidade Edge');
              })();
            `,
          }}
        />
        
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#000000" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          {/* Open Graph */}
  <meta property="og:title" content="Economia guiada por IA - Eduardo Ibrahim" />
  <meta property="og:description" content="Descubra como a inteligência artificial está mudando a lógica do valor, do trabalho e da tomada de decisões nas empresas." />
  <meta property="og:url" content="https://ai-driveneconomy.com" />
  <meta property="og:site_name" content="Economia guiada por IA" />
  <meta property="og:locale" content="pt_BR" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://ai-driveneconomy.com/ade-og.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Capa do livro Economia guiada por IA" />

  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Economia guiada por IA - Eduardo Ibrahim" />
  <meta name="twitter:description" content="Descubra como a inteligência artificial está mudando a lógica do valor, do trabalho e da tomada de decisões nas empresas." />
  <meta name="twitter:image" content="https://ai-driveneconomy.com/ade.jpg" />
  <meta name="twitter:creator" content="@eduardoibrahim" />

  {/* (Opcional, só para remover o aviso do Facebook) */}
  <meta property="fb:app_id" content="1234567890" />
      </head>
      <body
        className={`${poppins.variable} ${jetbrainsMono.variable} antialiased`}
        style={{ fontFamily: 'var(--font-sans), Poppins, system-ui, sans-serif' }}
        suppressHydrationWarning
      >
        <noscript>
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
            <p>Este site funciona melhor com JavaScript habilitado.</p>
          </div>
        </noscript>
        
        <Header />
        <main>
          {children}
          <ScrollRestoration />
        </main>
        <Footer />
      </body>
    </html>
  );
}
