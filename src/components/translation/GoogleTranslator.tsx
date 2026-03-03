"use client";
import { useEffect } from "react";

export default function GoogleTranslator() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // 1. Fix para removeChild
      const originalRemoveChild = Node.prototype.removeChild;
      Node.prototype.removeChild = function <T extends Node>(this: Node, child: T): T {
        if (child.parentNode !== this) {
          if (typeof console !== "undefined") {
            console.warn("Zelloh Fix: Se evitó un crash de Google Translate en removeChild.");
          }
          return child;
        }
        return originalRemoveChild.apply(this, [child]) as T;
      } as any;

      // 2. Fix para insertBefore
      const originalInsertBefore = Node.prototype.insertBefore;
      Node.prototype.insertBefore = function <T extends Node>(this: Node, newNode: T, referenceNode: Node | null): T {
        if (referenceNode && referenceNode.parentNode !== this) {
          if (typeof console !== "undefined") {
            console.warn("Zelloh Fix: Se evitó un crash de Google Translate en insertBefore.");
          }
          return originalInsertBefore.apply(this, [newNode, null]) as T;
        }
        return originalInsertBefore.apply(this, [newNode, referenceNode]) as T;
      } as any;

      // 3. Estilos para ocultar el loading y el frame de Google Translate
      const style = document.createElement('style');
      style.textContent = `
        /* Ocultar el frame de loading */
        .goog-te-spinner-pos,
        .goog-te-spinner,
        .goog-te-gadget-simple,
        .goog-te-banner-frame,
        .goog-te-menu-frame,
        .goog-te-menu-value,
        .goog-te-balloon-frame,
        iframe[src*="translate.googleapis.com"],
        #goog-gt-tt,
        .goog-te-balloon,
        .goog-te-tooltip,
        .skiptranslate iframe,
        .goog-te-spinner {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
          width: 0 !important;
          height: 0 !important;
          position: absolute !important;
          top: -9999px !important;
          left: -9999px !important;
          z-index: -9999 !important;
        }
        
        /* Ocultar el banner superior de Google Translate */
        body > .skiptranslate {
          display: none !important;
          visibility: hidden !important;
        }
        
        /* Prevenir que Google Translate desplace el contenido */
        body {
          top: 0 !important;
        }
      `;
      document.head.appendChild(style);
    }

    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: "es",
          includedLanguages: "en,fr,pt,it,es",
          layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };
  }, []);

  return (
    <div 
      id="google_translate_element" 
      style={{ display: 'none', visibility: 'hidden', position: 'absolute', top: '-9999px' }} 
    />
  );
}