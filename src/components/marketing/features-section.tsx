"use client";

import Image from "next/image";

export function FeaturesSection() {
  return (
    <>
      {/* Cognitive Value Section */}
      <section className="relative bg-black text-white py-20 overflow-hidden">
        {/* Background effect with digital movement */}
        <div className="absolute inset-0">
          {/* Digital effect image positioned as background on the right - smaller and more subtle */}
          <div className="absolute right-0 top-1/4 w-1/3 h-1/2 flex items-center justify-end">
            <Image
              src="/design.png"
              alt="Efeito digital"
              width={400}
              height={300}
              className="opacity-80 object-contain"
            />
          </div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-white mb-16 leading-tight">
                A inteligência artificial não está{" "}
                <span className="block">apenas otimizando processos.</span>
                <span className="block">Ela está <span className="underline decoration-white/50">redefinindo o que é valor</span>.</span>
              </h2>
              
              <p className="text-sm md:text-base text-white leading-relaxed max-w-4xl mx-auto font-thin mb-20">
                <span className="block">"Economia Guiada por IA", de Eduardo Ibrahim, apresenta uma visão</span>
                <span className="block">estratégica e realista sobre como a IA está transformando a estrutura</span>
                <span className="block">das organizações e da economia global.</span>
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="bg-white-900/60 border border-white-500 rounded-3xl px-12 py-12">
                <h3 className="text-left font-medium text-white text-base mb-8">
                  Sobre o livro
                </h3>
                
                <div className="text-white text-left space-y-6">
                  <p className="text-design-body ">
                    Ao invés de automatizar o passado, as empresas precisam cocriar o futuro. Essa é a proposta do livro:
                    repensar os indicadores, os papéis humanos, a governança e as decisões a partir de uma inteligência
                    combinada — onde humanos e algoritmos agem juntos.
                  </p>
                  
                  <p className="text-design-body ">
                    A obra propõe novos indicadores como o Produto Interno Cognitivo (PIC) e o Valor Cognitivo Combinado
                    (VC²) para medir o impacto real da inteligência nas organizações. Também apresenta ferramentas como
                    engenharia reversa de funções, reskilling estratégico e cérebros organizacionais, que ajudam líderes e
                    equipes a navegar essa transição com consciência, ética e inovação.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
            {/* Book with Hand Image - Left Side - Reduzido */}
            <div className="relative flex justify-center lg:justify-start">
              <Image
                src="/livroerobo.png"
                alt="Mão segurando livro Economia guiada por IA"
                width={900}
                height={1000}
                className="object-contain object-bottom"
                priority
                style={{ 
                  marginBottom: '-1px',
                  transform: 'translateY(65px) scale(1.0)', // Reduzido de scale(1.1) para scale(0.9) e translateY menor
                  filter: 'drop-shadow(0 15px 35px rgba(0, 0, 0, 0.1))'
                }}
              />
            </div>

            {/* Benefits Content - Right Side */}
            <div>
              <h2 className="text-design-title  text-black mb-9">Benefícios</h2>
              
              <div className="space-y-3">
                {[
                  "Compreenda a nova lógica da economia cognitiva",
                  "Conheça os conceitos inéditos de PIC e VC",
                  "Aprenda a tomar decisões com IA de forma ética e estratégica",
                  "Prepare sua equipe para o futuro do trabalho",
                  "Transforme sua empresa em uma organização cognitiva"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-black rounded-sm flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-design-body  text-black">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Glimpse Section - Papel vai sobrepor a próxima seção */}
      <section className="relative bg-black text-white pb-24 pt-24 overflow-visible">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          <div className="lg:pr-0">
  <h2 className="text-design-title  text-white mb-14 whitespace-pre-line max-w-none">
    <span className="block">Quer um vislumbre</span>
    <span className="block">do futuro?</span>
  </h2>
              
              <p className="text-design-body  text-white mb-12 max-w-lg">
                Baixe agora um trecho exclusivo do livro e
                descubra como a inteligência artificial está
                redefinindo os fundamentos da economia,
                da liderança e das decisões estratégicas nas
                empresas. Prepare-se para entrar no jogo
                sob uma nova lente.
              </p>

              <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-100 transition-all duration-300 flex items-center group text-design-button ">
                Acessar prévia gratuita
                <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </button>
            </div>

            {/* Preview Papers - Right Side com sobreposição */}
            <div className="relative flex justify-center lg:justify-end items-end">
              <Image
                src="/engenhariareversa.png"
                alt="Prévia do conteúdo - Engenharia Reversa de Funções"
                width={800}
                height={650}
                className="transform relative"
                style={{
                  filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.8))',
                  marginBottom: '-120px', // Valor ajustado para sobrepor a AuthorSection
                  zIndex: 1000, // Z-index alto para ficar acima da próxima seção
                  position: 'relative'
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}