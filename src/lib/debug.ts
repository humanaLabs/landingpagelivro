// Debug utilities
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

// Check if we're in the browser
export const isBrowser = typeof window !== 'undefined';

// Safe function call wrapper
export const safeCall = <T extends (...args: any[]) => any>(
  fn: T,
  fallback?: ReturnType<T>
): ((...args: Parameters<T>) => ReturnType<T>) => {
  return (...args: Parameters<T>): ReturnType<T> => {
    try {
      return fn(...args);
    } catch (error) {
      debug.error('SafeCall error:', error);
      return fallback as ReturnType<T>;
    }
  };
};

// Component mount logger
export const useComponentLogger = (componentName: string) => {
  if (process.env.NODE_ENV === 'development') {
    debug.log(`Component ${componentName} mounted`);
    
    return () => {
      debug.log(`Component ${componentName} unmounted`);
    };
  }
  
  return () => {};
}; 