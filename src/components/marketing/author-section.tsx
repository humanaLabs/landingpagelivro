"use client";

import Image from "next/image";
import { useI18n } from "../../../lib/i18n";

export function AuthorSection() {
  const { t, locale } = useI18n();

  return (
    <div key={locale}>
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
                {t('author.name')}
              </h2>
            </div>

            {/* Expandable About Section */}
            <div className="bg-white border border-black rounded-2xl p-8">
              <h3 className="text-design-subtitle  text-black mb-6">
                {t('author.aboutAuthor')}
              </h3>
              
              <div className="text-black space-y-4">
                <p className="text-design-body ">
                  {t('author.bio1')}
                </p>
                
                <p className="text-design-body ">
                  {t('author.bio2')}
                </p>
                
                <p className="text-design-body ">
                  {t('author.bio3')}
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
          <video
  src="/videoavatar.mp4"
  className="w-full h-full object-cover object-top"
  controls
  autoPlay
  muted
  loop
>
  Seu navegador não suporta o elemento de vídeo.
</video>
            </div>
          </div>

          {/* Barra branca com título */}
          <div className="bg-white py-8 px-4">
            <div className="text-center">
              <h2 className="text-design-mega  text-black tracking-tight">
                {t('author.bookTitle')}
              </h2>
            </div>
          </div>

          {/* Quote Section - Parte inferior */}
          <div className="bg-black text-white py-16 px-8 min-h-[80vh] flex items-center font-light">
            <div className="max-w-4xl mx-auto text-center w-full">
              <blockquote className="text-design-body  mb-8 italic">
                {t('author.quote')}
              </blockquote>
              <cite className="text-white  font-medium not-italic">{t('author.quoteAuthor')}</cite>
            </div>
          </div>

          {/* Seção de Depoimentos - Design Card Exato */}
          <div className="bg-white py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                
                {t('author.testimonials').map((testimonial: any, index: number) => (
                  <div key={index} className="bg-white p-6 text-center h-full flex flex-col">
                    <div className="text-black text-sm leading-relaxed mb-6 flex-grow">
                      {testimonial.text}
                    </div>
                    
                    <div className="mt-auto">
                      <div className="bg-black text-white py-3 mb-4">
                        <div className="font-bold text-sm">{testimonial.author}</div>
                      </div>
                      
                      <div className="text-black text-sm mb-4">{testimonial.position}</div>
                      
                      <div className="flex justify-center">
                        <span className="text-black text-xl">✦✦✦✦✦</span>
                      </div>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          </div>


        </div>
      </section>
    </div>
  );
}