"use client";

import { useScrollAnimation } from "@/lib/useScrollAnimation";
import { useState } from "react";
import Image from "next/image";
import { useI18n } from "../../../lib/i18n";

// Definindo o tipo para os FAQs
interface FAQ {
  question: string;
  answer: string;
}

export function FaqSection() {
  const { t, locale } = useI18n();
  
  // Usando tipagem específica para cada elemento
  const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation<HTMLDivElement>({ 
    threshold: 0.2 
  });
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation<HTMLHeadingElement>({ 
    threshold: 0.3 
  });
  const { ref: faqsRef, isVisible: faqsVisible } = useScrollAnimation<HTMLDivElement>({ 
    threshold: 0.3 
  });
  
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Cast do tipo para garantir que seja um array de FAQs
  const faqQuestions = t('faq.questions') as FAQ[];

  return (
    <section key={locale} className="relative bg-white min-h-screen">
      <div className="grid lg:grid-cols-2 min-h-screen">
        
        {/* Left Side - Design Visual */}
        <div 
          ref={imageRef}
          className={`relative bg-black overflow-hidden scroll-fade-in-left ${imageVisible ? 'animate' : ''}`}
        >
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
            <h2 
              ref={titleRef}
              className={`text-design-title text-black mb-16 scroll-fade-in ${titleVisible ? 'animate' : ''}`}
            >
              {t('faq.title')}
            </h2>
            
            <div 
              ref={faqsRef}
              className={`space-y-10 scroll-fade-in ${faqsVisible ? 'animate' : ''}`}
            >
              {faqQuestions.map((faq: FAQ, index: number) => (
                <div 
                  key={index} 
                  className={`border-b border-gray-100 pb-8 scroll-fade-in scroll-stagger-${index + 1} ${faqsVisible ? 'animate' : ''}`}
                >
                  <div className="group">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full cursor-pointer text-design-subtitle text-black flex items-center justify-between py-2 text-left hover:text-gray-700 transition-colors duration-200"
                    >
                      {faq.question}
                      <svg 
                        className={`w-5 h-5 transform transition-all duration-300 ease-in-out flex-shrink-0 ml-6 text-gray-400 ${
                          openFaq === index ? 'rotate-180 text-gray-600' : 'rotate-0'
                        }`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    <div 
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        openFaq === index 
                          ? 'max-h-32 opacity-100 mt-6' 
                          : 'max-h-0 opacity-0 mt-0'
                      }`}
                    >
                      <div className="text-design-body text-black pb-2">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}