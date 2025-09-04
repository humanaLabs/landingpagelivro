// src/components/ScrollRestoration.tsx
"use client";
import { useEffect } from "react";

export default function ScrollRestoration() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      const prev = window.history.scrollRestoration;
      window.history.scrollRestoration = "manual";
      return () => { window.history.scrollRestoration = prev; };
    }
  }, []);
  return null;
}