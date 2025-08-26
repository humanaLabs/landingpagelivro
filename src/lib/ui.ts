// src/lib/ui.ts
import { useEffect, useState } from "react";

// Evita piscar/instabilidade quando algo é apenas de client (opcional)
export function useIsClient() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  return isClient;
}

// Variants utilitários p/ stagger
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4,0,0.2,1] } }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.5 } }
};

export function stagger(childrenDelay = 0.08) {
  return {
    show: { transition: { staggerChildren: childrenDelay } }
  };
}
