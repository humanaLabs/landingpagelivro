"use client";

import Image from "next/image";
import { useI18n } from "../../../lib/i18n";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export function AuthorSection() {
  const { t, locale } = useI18n();
  const testimonials = t("author.testimonials");
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [bannerWidth, setBannerWidth] = useState(0);
  const bannerRef = useRef<HTMLDivElement>(null);
  const mobileDuration = 20; // ajuste rápido quando quiser mudar
  const desktopDuration = 20;

  // Detecta se é mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const visibleTestimonials = showAll ? testimonials : testimonials.slice(0, 3);

  useEffect(() => {
    if (bannerRef.current) {
      setBannerWidth(bannerRef.current.scrollWidth / 2);
    }
  }, [isMobile, locale]); // recalcula se mobile ou idioma mudar

  // Função para obter o caminho do vídeo baseado no idioma
  const getVideoPath = (currentLocale: string) => {
    switch (currentLocale) {
      case "en":
        return "/videoavatar-ingles.mp4";
      case "es":
        return "/videoavatar-espanhol.mp4";
      case "pt":
      default:
        return "/videoavatar.mp4";
    }
  };

  return (
    <div key={locale}>
      {/* Seção inicial do autor */}
      <section className="bg-white pt-48 pb-20 relative z-0 md:pt-48 md:pb-20 pt-24 pb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header do autor */}
            <motion.div
              className="flex items-center gap-6 mb-8 md:gap-6 md:mb-8 gap-4 mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className="relative w-16 h-16 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-20 lg:h-20 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src="/fotoeduardo.png"
                  alt="Eduardo Ibrahim"
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>
              <h2 className="text-black text-design-title-mobile md:text-design-title">
  {t("author.name")}
</h2>
            </motion.div>

            {/* Sobre o autor */}
            <motion.div
              className="bg-white border border-black rounded-2xl p-8 md:p-8 p-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
            >
             <h3 className="text-xl md:text-2xl lg:text-xl font-bold text-black mb-4 md:mb-6">
  {t("author.aboutAuthor")}
</h3>
              <div className="text-black space-y-4 md:space-y-4 space-y-3">
  <p className="text-design-body-mobile md:text-design-body">{t("author.bio1")}</p>
  <p className="text-design-body-mobile md:text-design-body">{t("author.bio2")}</p>
  <p className="text-design-body-mobile md:text-design-body">{t("author.bio3")}</p>
</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Avatar interativo + título */}
      <section className="bg-white">
        <div className="w-full">
          {/* Vídeo responsivo ocupando toda a largura */}
          <motion.div
            className="flex justify-center bg-white py-12 px-4"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="relative w-full max-w-5xl aspect-[16/9] rounded-lg overflow-hidden shadow-xl border border-gray-200">
              <video
                key={locale}
                src={getVideoPath(locale)}
                className="w-full h-full object-cover object-top"
                controls
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </motion.div>

          {/* Faixa contínua estilo estádio */}
<div className="overflow-hidden bg-white py-8">
  <motion.div
    ref={bannerRef}
    className="flex whitespace-nowrap"
    animate={{ x: [0, -bannerWidth / 2] }}
    transition={{
      repeat: Infinity,
      repeatType: "loop",
      duration: isMobile ? mobileDuration : desktopDuration,
      ease: "linear",
    }}
  >
    {/* Primeiro bloco */}
    <div className="flex">
      {[...Array(6)].map((_, i) => (
        <h2
          key={`block1-${i}`}
          className={`text-black font-bold tracking-tight mx-[12vw] ${
            isMobile
              ? "text-7xl md:text-6xl leading-tight"
              : "text-9xl"
          }`}
        >
          {t("author.bookTitle")}
        </h2>
      ))}
    </div>

    {/* Segundo bloco (duplicado) */}
    <div className="flex">
      {[...Array(6)].map((_, i) => (
        <h2
          key={`block2-${i}`}
          className={`text-black font-bold tracking-tight mx-[12vw] ${
            isMobile
              ? "text-5xl md:text-6xl leading-tight"
              : "text-8xl"
          }`}
        >
          {t("author.bookTitle")}
        </h2>
      ))}
    </div>
  </motion.div>
</div>

          {/* Depoimentos */}
          <div className={`bg-white px-4 ${isMobile ? "py-12" : "py-16"}`}>
            <div className="max-w-8xl mx-auto">
              <div
                className={`items-start ${
                  isMobile
                    ? "flex flex-col gap-6"
                    : "grid grid-cols-1 md:grid-cols-3 gap-8"
                }`}
              >
                {visibleTestimonials.map((testimonial: any, index: number) => (
                  <motion.div
                    key={index}
                    className={`bg-white text-center h-full flex flex-col border border-gray-200 rounded-xl shadow-sm ${
                      isMobile ? "p-5 max-w-sm mx-auto w-full" : "p-8"
                    }`}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      ease: "easeOut",
                      delay: index * 0.2,
                    }}
                    viewport={{ once: true }}
                  >
                    <div
                      className={`text-black leading-relaxed mb-6 flex-grow 
                         ${isMobile ? "text-base" : "text-base lg:text-lg"}`}
                    >
                      {testimonial.text}
                    </div>
                    <div className="mt-auto">
                      <div className="bg-black text-white py-3 mb-4 rounded-md">
                        <div className="font-bold text-sm md:text-base lg:text-lg">
                          {testimonial.author}
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <span className="text-black text-xl">✦✦✦✦✦</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

             {/* Botão de expandir/recolher */}
{testimonials.length > 3 && (
  <div className="flex justify-center mt-8">
    <button
      onClick={() => setShowAll(!showAll)}
      className="flex items-center gap-2 text-black font-medium text-lg md:text-xl px-4 md:px-6 py-2 md:py-3 hover:underline"
    >
      {showAll
        ? t("author.showLess")
        : t("author.showMore", { count: testimonials.length - 3 })}
      {showAll ? (
        <ChevronUp size={24} />
      ) : (
        <ChevronDown size={24} />
      )}
    </button>
  </div>
)}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
