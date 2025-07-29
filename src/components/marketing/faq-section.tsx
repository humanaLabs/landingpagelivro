"use client";

const faqs = [
  {
    question: "Para quem é o livro?",
    answer: "Para profissionais, líderes, empreendedores e estudantes interessados no impacto real da inteligência artificial na economia, nos negócios e na humanidade."
  },
  {
    question: "Preciso saber de programação ou IA para entender o conteúdo?",
    answer: "Não. O livro foi escrito com uma linguagem acessível, mas com profundidade técnica e estratégica para quem quer liderar com consciência."
  },
  {
    question: "Vai ter versão digital?",
    answer: "Sim! O livro estará disponível em e-book e versão física."
  },
  {
    question: "Posso comprar para minha equipe?",
    answer: "Sim! Temos condições especiais para compras corporativas. Entre em contato via [email]."
  }
];

import Image from "next/image";

export function FaqSection() {
  return (
    <section className="relative bg-white min-h-screen">
      <div className="grid lg:grid-cols-2 min-h-screen">
        
        {/* Left Side - Design Visual */}
        <div className="relative bg-black overflow-hidden">
          <Image
            src="/Imagem 1.png"
            alt="Design Visual Effects"
            fill
            className="object-cover opacity-90"
            priority
          />
        </div>

        {/* Right Side - FAQ Section */}
        <div className="bg-white px-16 py-20 flex flex-col justify-center">
          <div className="max-w-md">
            <h2 className="text-3xl font-bold text-black mb-16 leading-relaxed">
              Perguntas{" "}
              <span className="block">Frequentes</span>
            </h2>
            
            <div className="space-y-10">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-100 pb-8">
                  <details className="group">
                    <summary className="cursor-pointer font-bold text-black flex items-center justify-between text-base py-2 list-none">
                      {faq.question}
                      <svg className="w-4 h-4 transform group-open:rotate-180 transition-transform flex-shrink-0 ml-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    
                    <div className="mt-6 text-gray-600 leading-relaxed text-base">
                      {faq.answer}
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
} 