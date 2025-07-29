import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Lista de erros para ignorar (principalmente relacionados ao Edge/React Refresh)
    const ignoredErrors = [
      "Cannot read properties of undefined (reading 'call')",
      "Cannot read property 'call' of undefined",
      "webpack/runtime/react refresh",
      "originalFactory.call",
      "$RefreshInterceptModuleExecution$",
      "RefreshRuntime",
      "HMR",
      "Hot Module Replacement"
    ];

    // Verifica se deve ignorar o erro
    const shouldIgnore = ignoredErrors.some(ignoredError => 
      error.message?.includes(ignoredError) || 
      error.stack?.includes(ignoredError)
    );

    if (shouldIgnore) {
      console.debug('🔇 ErrorBoundary: Erro de desenvolvimento ignorado:', error.message);
      return null; // Não atualiza o state, mantém o componente funcionando
    }

    // Apenas retorna erro para casos legítimos
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Lista de erros para ignorar
    const ignoredErrors = [
      "Cannot read properties of undefined (reading 'call')",
      "Cannot read property 'call' of undefined",
      "webpack/runtime/react refresh",
      "originalFactory.call",
      "$RefreshInterceptModuleExecution$",
      "RefreshRuntime",
      "HMR",
      "Hot Module Replacement"
    ];

    // Verifica se deve ignorar o erro
    const shouldIgnore = ignoredErrors.some(ignoredError => 
      error.message?.includes(ignoredError) || 
      error.stack?.includes(ignoredError)
    );

    if (shouldIgnore) {
      console.debug('🔇 ErrorBoundary: Erro suprimido para compatibilidade:', error.message);
      // Reset do estado para continuar funcionando
      this.setState({ hasError: false, error: null, errorInfo: null });
      return;
    }

    // Log apenas para erros legítimos e em desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      console.error('🚨 ErrorBoundary capturou um erro legítimo:', error, errorInfo);
    }

    // Atualiza o estado com informações do erro
    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="max-w-md mx-auto text-center bg-white p-6 rounded-lg shadow-lg">
            <div className="mb-4">
              <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Ops! Algo deu errado
            </h2>
            
            <p className="text-gray-600 mb-4">
              Ocorreu um erro inesperado. Por favor, tente recarregar a página.
            </p>
            
            <div className="space-y-2">
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: null, errorInfo: null });
                  window.location.reload();
                }}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Recarregar página
              </button>
              
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: null, errorInfo: null });
                }}
                className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Tentar novamente
              </button>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-4 text-left bg-gray-50 p-3 rounded">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 mb-2">
                  Detalhes técnicos (desenvolvimento)
                </summary>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs font-medium text-gray-600">Erro:</p>
                    <pre className="text-xs bg-red-50 text-red-800 p-2 rounded overflow-auto max-h-32">
                      {this.state.error.message}
                    </pre>
                  </div>
                  {this.state.errorInfo && (
                    <div>
                      <p className="text-xs font-medium text-gray-600">Stack trace:</p>
                      <pre className="text-xs bg-gray-100 text-gray-800 p-2 rounded overflow-auto max-h-32">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;