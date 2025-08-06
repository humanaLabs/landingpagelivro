"use client";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative bg-white text-black pt-20 pb-12 overflow-hidden min-h-screen">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[80vh]">
            
            {/* Book Image - Left Side - Com animação de hover funcionando */}
            <div className="relative flex justify-center lg:justify-start group cursor-pointer">
              <Image
                src="/livro.png"
                alt="Livro Economia guiada por IA"
                width={2000}
                height={2500}
                className="drop-shadow-2xl transition-all duration-500 ease-out"
                priority
                style={{ 
                  backgroundColor: 'transparent',
                  transform: 'scaleX(1.5) scaleY(1.6)',
                  filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.15))',
                  transition: 'all 0.5s ease-out'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scaleX(1.575) scaleY(1.68)'; // 5% maior
                  e.currentTarget.style.filter = 'drop-shadow(0 35px 70px rgba(0, 0, 0, 0.25))';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scaleX(1.5) scaleY(1.6)'; // volta ao normal
                  e.currentTarget.style.filter = 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.15))';
                }}
              />
            </div>

            {/* Content - Right Side */}
            <div className="text-left">
              {/* Main Headline */}
              <h1 className="text-black mb-8 font-poppins text-design-title sm:text-5xl lg:text-6xl xl:text-design-mega">
                O futuro da economia{" "}
                <span className="block">é cognitivo — e já</span>
                <span className="block">começou.</span>
              </h1>
              
              {/* Description */}
              <p className="text-black mb-7 max-w-xl font-poppins text-design-body sm:text-xl lg:text-2xl">
                    Descubra como a inteligência artificial está mudando <br></br> 
                    a lógica do valor, do trabalho e da tomada de <br />
                    decisões nas empresas.
                  </p>
              {/* CTA Button */}
              <div className="flex justify-start">
                <button className="bg-black text-white px-5 py-1.5 rounded-full hover:bg-gray-800 transition-all duration-300 font-poppins text-design-button">
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