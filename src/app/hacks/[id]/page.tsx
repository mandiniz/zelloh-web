"use client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export default function HackDetailPage() {
  const paragraph = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.";

  return (
    <main className="bg-black text-white min-h-screen font-sans overflow-x-hidden">
      <Header />

      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
        {/* Botón Volver Blanco */}
        <div className="mb-20">
          <Link href="/hacks">
            <button className="bg-white text-black px-12 py-2.5 rounded-full font-black text-sm uppercase tracking-tighter hover:bg-[#E6F379] transition-colors">
              Volver
            </button>
          </Link>
        </div>

        {/* Título Lorem Ipsum */}
        <div className="text-center mb-28">
          <h1 className="text-7xl md:text-9xl font-[1000] mb-4 tracking-tighter uppercase italic">
            Lorem ipsum.
          </h1>
          <p className="text-zinc-200 text-2xl font-bold tracking-tight">
            Lorem ipsum dolor sit amet, consetetur.
          </p>
        </div>

        {/* Contenido Superior */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-24">
          {/* Card Morada con Logo */}
          <div className="bg-[#7D26FF] rounded-[3.5rem] aspect-video flex items-center justify-center p-16 shadow-2xl">
             <img src="/zelloh-logo-white.png" alt="Zelloh" className="w-full h-auto object-contain" />
          </div>

          {/* Cita con comillas amarillas */}
          <div className="relative pl-16">
            <span className="absolute left-0 top-0 text-[#E6F379] text-8xl font-serif leading-none opacity-100">“</span>
            <p className="text-zinc-300 text-xl font-bold leading-relaxed tracking-tight">
              {paragraph} {paragraph}
            </p>
          </div>
        </div>

        {/* Texto Inferior */}
        <div className="space-y-12 max-w-full">
          <p className="text-zinc-300 text-xl font-bold leading-relaxed tracking-tight">
            {paragraph} {paragraph} {paragraph}
          </p>
          <p className="text-zinc-300 text-xl font-bold leading-relaxed tracking-tight">
            {paragraph} {paragraph} {paragraph}
          </p>
          <p className="text-zinc-300 text-xl font-bold leading-relaxed tracking-tight">
            {paragraph} {paragraph} {paragraph}
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}