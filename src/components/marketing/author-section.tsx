"use client";

import Image from "next/image";

export function AuthorSection() {
  return (
    <>
      {/* Seção inicial do autor - compacta */}
      <section className="bg-white pt-48 pb-20 relative z-0"> {/* Compensar sobreposição da seção anterior */}
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Author Header - Photo + Name */}
            <div className="flex items-center gap-6 mb-8">
              <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src="/fotoeduardo.png"
                  alt="Eduardo Ibrahim"
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>
              <h2 className="text-design-title  text-black">
                Eduardo Ibrahim
              </h2>
            </div>

            {/* Expandable About Section */}
            <div className="bg-white border border-black rounded-2xl p-8">
              <h3 className="text-design-subtitle  text-black mb-6">
                Sobre o autor
              </h3>
              
              <div className="text-black space-y-4">
                <p className="text-design-body ">
                  Eduardo Ibrahim é uma das maiores referências em tecnologia e futuro. Fundador e CEO da Humana AI, 
                  Professor da Singularity University e autor do best-seller Economia Exponencial, Ibrahim é um dos 
                  pioneiros na aplicação da IA no contexto estratégico de negócios.
                </p>
                
                <p className="text-design-body ">
                  Com trajetória que passa pelo campus da NASA no Vale do Silício, TEDx e programas de beta-tester da 
                  OpenAI, Ibrahim combina visão prática e pensamento disruptivo. Como palestrante internacional é voz 
                  ativa em grandes organizações, onde traduz o complexo em linguagem acessível.
                </p>
                
                <p className="text-design-body ">
                  Neste novo livro, ele propõe uma visão transformadora: a IA guiando a economia não para nos substituir, 
                  mas para ampliar o que temos de mais humano. Uma leitura provocadora e essencial para líderes, 
                  inovadores e todos que desejam prosperar na nova era da IA.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Nova seção - Avatar interativo + Título + Quote */}
      <section className="bg-white">
        <div className="w-full">
          {/* Avatar Interativo - Formato quadro */}
          <div className="flex justify-center py-12 bg-white">
          <div className="relative w-[800px] h-[450px] bg-white rounded-lg overflow-hidden shadow-xl border border-gray-200">
              <Image
                src="/avatarinterativo.png"
                alt="Avatar Interativo Eduardo Ibrahim"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </div>

          {/* Barra branca com título */}
          <div className="bg-white py-8 px-4">
            <div className="text-center">
              <h2 className="text-design-mega  text-black tracking-tight">
                ECONOMIA GUIADA POR IA
              </h2>
            </div>
          </div>

          {/* Quote Section - Parte inferior */}
          <div className="bg-black text-white py-16 px-8 min-h-[80vh] flex items-center font-light">
            <div className="max-w-4xl mx-auto text-center w-full">
              <blockquote className="text-design-body  mb-8 italic">
                "Ibrahim entrega, neste livro, muito mais do que uma visão sobre inteligência artificial: ele nos oferece
                uma nova gramática para entender valor, talento e decisão em um mundo que pensa com máquinas.
                Essa é uma leitura essencial para líderes que não querem reconstruir suas organizações com base em
                IA. O que ele propõe aqui não é futurismo. É um manual poderoso para o presente."
              </blockquote>
              <cite className="text-white  font-medium not-italic">— Gary Bolles</cite>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}