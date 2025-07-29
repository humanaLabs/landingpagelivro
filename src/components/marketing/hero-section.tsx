"use client";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative bg-white text-black pt-20 pb-12 overflow-hidden min-h-screen">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[80vh]">
            
            {/* Book Image - Left Side - Maior mas equilibrado */}
            <div className="relative flex justify-center lg:justify-start">
              <Image
                src="/livro.png"
                alt="Livro Economia guiada por IA"
                width={2000}
                height={2500}
                className="transform hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
                priority
                style={{ 
                  backgroundColor: 'transparent',
                  filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.15))',
                  transform: 'scaleX(1.5) scaleY(1.6)' // ← AJUSTE AQUI: 30% maior visualmente
                }}
              />
            </div>

            {/* Content - Right Side */}
            <div className="text-left">
              {/* Main Headline */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6 leading-tight">
                O futuro da economia{" "}
                <span className="block">é cognitivo — e já</span>
                <span className="block">começou.</span>
              </h1>
              
              {/* Description */}
              <p className="text-lg text-gray-600 mb-6 leading-relaxed max-w-xl">
                Descubra como a inteligência artificial está mudando
                a lógica do valor, do trabalho e da tomada de
                decisões nas empresas.
              </p>
              
              {/* CTA Button */}
              <div className="flex justify-start">
                <button className="bg-black text-white px-5 py-1.5 rounded-full font-semibold hover:bg-gray-800 transition-all duration-300 text-base">
                  Quero meu exemplar
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}