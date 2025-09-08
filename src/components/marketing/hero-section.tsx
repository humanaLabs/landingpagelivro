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

  // título MOBILE (já estava ok)
  const renderTitleMobile = (className: string) => {
    const line1 = t("hero.titleLine1");
    const line2 = t("hero.titleLine2");
    const line3 = t("hero.titleLine3");
<<<<<<< HEAD

=======
  
>>>>>>> desenv
    return (
      <div className={`${className} flex flex-col`}>
        <span className="block whitespace-nowrap">{line1}</span>
        <span className="block whitespace-nowrap">{line2}</span>
        <span className="block whitespace-nowrap">{line3}</span>
      </div>
    );
  };

  // título DESKTOP (forçado para quebrar 3 linhas no Chrome)
  const renderTitleDesktop = (className: string) => {
    const line1 = t("hero.titleLine1"); // "O futuro da economia"
    const line2 = t("hero.titleLine2"); // "é cognitivo —"
    const line3 = t("hero.titleLine3"); // "e já começou."
  
    return (
      <h1
        className={`${className} text-black leading-tight 
        text-4xl xl:text-5xl 2xl:text-6xl`} // diminui um pouco no desktop
      >
        <span className="block">{line1}</span>
        <span className="block">{line2}</span>
        <span className="block">{line3}</span>
      </h1>
    );
  };

  // subtítulo (sem alteração)
  const renderSubtitle = (className: string) => {
    const line1 = t("hero.subtitleLine1");
    const line2 = t("hero.subtitleLine2");
    const line3 = t("hero.subtitleLine3");

    return (
      <div className={className}>
        <div className="block mb-1">{line1}</div>
        <div className="block mb-1">{line2}</div>
        <div className="block">{line3}</div>
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
          <div className="lg:hidden flex flex-col items-center text-center gap-5">
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
                className="mx-auto"
              >
                <Image
                  src="/livro.png"
                  alt={t("hero.bookAlt", {
                    defaultValue: "Livro Economia guiada por IA",
                  })}
                  width={300}
                  height={380}
                  priority
                  className="object-contain"
                />
              </motion.div>
            </motion.div>

            <motion.div
              suppressHydrationWarning
              variants={fadeUp}
              initial="hidden"
              animate={isVisible ? "show" : "hidden"}
            >
              {renderTitleMobile(
                "text-3xl font-semibold leading-tight !whitespace-normal break-words lg:hidden"
              )}
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isVisible ? "show" : "hidden"}
              suppressHydrationWarning
            >
              {renderSubtitle("text-base leading-relaxed opacity-90")}
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isVisible ? "show" : "hidden"}
            >
              <button
                onClick={handleScrollToForm}
                className="hero-cta-mobile-compact"
              >
                {t("hero.cta")}
              </button>
            </motion.div>
          </div>

          {/* DESKTOP */}
          <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8 items-center min-h-screen">
            {/* Livro */}
            <div className="lg:col-span-6 flex justify-center">
              <motion.div
                key={`hero-book-desktop-${locale}`}
                variants={fadeInLeft}
                initial="hidden"
                animate={isVisible ? "show" : "hidden"}
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
                    marginLeft: "-40px",
                  }}
                >
                  <Image
                    src="/livro.png"
                    alt={t("hero.bookAlt", {
                      defaultValue: "Livro Economia guiada por IA",
                    })}
                    width={700}
                    height={600}
                    priority
                    className="object-contain select-none"
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Conteúdo */}
            <div className="lg:col-span-6">
              <motion.div
                key={`hero-content-desktop-${locale}`}
                variants={containerStagger}
                initial="hidden"
                animate={isVisible ? "show" : "hidden"}
                className="flex flex-col justify-center"
              >
                {/* Título */}
<<<<<<< HEAD
                <motion.div suppressHydrationWarning variants={fadeUp}>
                  {renderTitleDesktop(
                    "text-5xl xl:text-6xl font-bold leading-tight mb-6"
                  )}
=======
                <motion.div
                  suppressHydrationWarning
                  variants={fadeUp}
                >
                 {renderTitle("text-5xl xl:text-5xl font-bold leading-tight mb-6 whitespace-pre-line break-keep")}

>>>>>>> desenv
                </motion.div>

                {/* Subtítulo */}
                <motion.div
                  suppressHydrationWarning
                  variants={fadeUp}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                  }}
                >
                  {renderSubtitle("text-lg opacity-90 leading-relaxed mb-8")}
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
