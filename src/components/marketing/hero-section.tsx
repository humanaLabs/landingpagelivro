"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useI18n } from "../../../lib/i18n";
import { useScrollAnimation } from "@/lib/useScrollAnimation";
import { motion, type Variants } from "framer-motion";

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
};

const containerStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export function HeroSection() {
  const [hovered, setHovered] = useState(false);
  const { t, locale } = useI18n();

  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  useEffect(() => setHovered(false), [locale]);

  const handleScrollToForm = () => {
    document.getElementById("formularioContato")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Função para obter a imagem correta baseada no idioma
  const getBookImage = () => {
    switch (locale) {
      case "es":
        return "/Mockup livro e tablet espanhol.png";
      case "en":
        return "/Mockup livro e tablet inglês.png";
      case "pt":
      default:
        return "/Mockup livro e tablet pt.png";
    }
  };

  // Função para renderizar o título com quebras de linha forçadas
  const renderTitle = (className: string) => {
    const line1 = t("hero.titleLine1");
    const line2 = t("hero.titleLine2");
    const line3 = t("hero.titleLine3");
    const line4 = t("hero.titleLine4");
    const line5 = t("hero.titleLine5");
  
    return (
      <div className={`${className} flex flex-col`}>
        <span className="block whitespace-nowrap">{line1}</span>
        <span className="block whitespace-nowrap">{line2}</span>
        <span className="block whitespace-nowrap">{line3}</span>
        <span className="block whitespace-nowrap">{line4}</span>
        <span className="block whitespace-nowrap">{line5}</span>
      </div>
    );
  };

  return (
    <section
      ref={ref}
      className="relative bg-white text-black pt-16 pb-8 lg:py-0 overflow-hidden min-h-screen"
    >
      <div className="container mx-auto px-4 relative z-10 h-full">
        <div className="max-w-7xl mx-auto h-full">
          
          {/* MOBILE */}
<div className="lg:hidden flex flex-col items-center text-center">
  {/* Imagem */}
  <motion.div
    key={`hero-book-mobile-${locale}`}
    initial="hidden"
    animate={isVisible ? "show" : "hidden"}
    variants={fadeUp}
  >
    <motion.div
      animate={{ scale: hovered ? 1.08 : 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        filter: hovered
          ? "drop-shadow(0px 25px 50px rgba(0,0,0,.25))"
          : "drop-shadow(0px 20px 40px rgba(0,0,0,.18))",
      }}
      className="mx-auto mt-6"
    >
      <Image
        src={getBookImage()}
        alt={t("hero.bookAlt", { defaultValue: "Livro Economia guiada por IA" })}
        width={300}
        height={380}
        priority
        className="object-contain"
        key={`book-image-mobile-${locale}`}
      />
    </motion.div>
  </motion.div>

  {/* Bloco do conteúdo de baixo */}
  <div className="flex flex-col items-center text-center gap-3 -mt-6">
    {/* Título */}
    <motion.div
      suppressHydrationWarning
      variants={fadeUp}
      initial="hidden"
      animate={isVisible ? "show" : "hidden"}
    >
      {renderTitle("hero-title-mobile-compact text-2xl font-semibold leading-tight !whitespace-normal break-words lg:hidden")}
    </motion.div>

    {/* Botão */}
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate={isVisible ? "show" : "hidden"}
    >
      <button onClick={handleScrollToForm} className="hero-cta-mobile-compact">
        {t("hero.cta")}
      </button>
    </motion.div>
  </div>
</div>

          {/* DESKTOP - VERSÃO LIMPA */}
<div className="hidden lg:grid lg:grid-cols-12 lg:gap-8 items-center min-h-screen">
  
  {/* Livro */}
  <div className="lg:col-span-6 flex justify-center">
    <motion.div
      key={`hero-book-desktop-${locale}`}
      variants={fadeInLeft}
      initial="hidden"
      animate={isVisible ? "show" : "hidden"}
      className="hero-book-desktop" 
    >
      <motion.div
        animate={{ 
          scale: hovered ? 1.06 : 1,
          rotateY: hovered ? 5 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          filter: hovered
            ? "drop-shadow(0px 40px 80px rgba(0,0,0,.3))"
            : "drop-shadow(0px 25px 50px rgba(0,0,0,.2))",
          transformStyle: "preserve-3d",
          marginLeft: "-50px", // APENAS ESTA LINHA MOVE O LIVRO
        }}
      >
        <Image
          src={getBookImage()}
          alt={t("hero.bookAlt", { defaultValue: "Livro Economia guiada por IA" })}
          width={700}
          height={600}
          priority
          className="object-contain select-none hero-book-desktop-img" 
          key={`book-image-desktop-${locale}`}
        />
      </motion.div>
    </motion.div>
  </div>

            {/* Conteúdo - TOTALMENTE SEPARADO */}
            <div className="lg:col-span-6">
              <motion.div
                key={`hero-content-desktop-${locale}`}
                variants={containerStagger}
                initial="hidden"
                animate={isVisible ? "show" : "hidden"}
                className="flex flex-col justify-center"
              >
                {/* Título */}
                <motion.div
                  suppressHydrationWarning
                  variants={fadeUp}
                >
                 {renderTitle("text-[2.6rem] md:text-[2.8rem] font-bold leading-tight mb-6 whitespace-pre-line break-keep")}

                </motion.div>

                {/* Botão */}
                <motion.div variants={fadeInRight}>
                  <button 
                    onClick={handleScrollToForm} 
                    className="bg-black text-white border border-black px-5 py-1 rounded-full text-base font-semibold transition-all duration-300 hover:bg-white hover:text-black"
                  >
                    {t("hero.cta")}
                  </button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}