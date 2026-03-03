// src/app/layout.tsx
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import GoogleTranslator from "@/components/translation/GoogleTranslator";
import Script from "next/script";

const montserrat = Montserrat({ 
  subsets: ["latin"], 
  weight: ["400", "500", "700", "900"],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: "ZELLOH | Neobanco Bot-First",
  description: "Dinero inmediato en Messengers. Sin apps, sin bancos.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <head>
        <Script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${montserrat.variable} font-sans bg-black text-white antialiased`}>
        <GoogleTranslator />
        
        <Providers>
          {children}
        </Providers>

        {/* CSS MAESTRO PARA INVISIBILIDAD TOTAL DE GOOGLE */}
        <style dangerouslySetInnerHTML={{ __html: `
        /* 1. Reset de posición para evitar saltos */
        body { top: 0px !important; position: static !important; }

        /* 2. OCULTAR EL LOADER Y EL WIDGET (Fuerza bruta) */
        .skiptranslate,
        #google_translate_element,
        .goog-te-gadget,
        .goog-te-banner-frame,
        .goog-te-banner,
        .goog-te-menu-value,
        .goog-te-spinner-pos, /* El loader circular */
        #goog-gt-tt,          /* El cuadro que sale al pasar el ratón */
        .goog-te-balloon-frame {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }

        /* 3. Ocultar específicamente el spinner de carga de Google */
        .goog-te-spinner-pos + div {
          display: none !important;
        }

        /* 4. Limpiar estilos inyectados en los textos */
        .goog-text-highlight {
          background: transparent !important;
          box-shadow: none !important;
        }

        font {
          background-color: transparent !important;
          box-shadow: none !important;
          vertical-align: inherit !important;
        }

        /* 5. Eliminar el espacio en blanco que Google deja a veces arriba */
        html {
          margin-top: 0px !important;
        }
      `}} />
      </body>
    </html>
  );
}