"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useI18n } from "../../../lib/i18n";
import { useScrollAnimation } from "@/lib/useScrollAnimation";
import { motion, type Variants } from "framer-motion";

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const containerStagger: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08 } },
};

export function HeroSection() {
  const [hovered, setHovered] = useState(false);
  const { t, locale } = useI18n();

  // gatilho com intersection observer
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  useEffect(() => setHovered(false), [locale]);

  const handleScrollToForm = () => {
    document.getElementById("formularioContato")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      ref={ref}
      className="relative bg-white text-black pt-20 pb-12 overflow-hidden min-h-screen"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[80vh]">

            {/* Coluna da imagem */}
            <motion.div
  key={`hero-book-${locale}`}
  initial="hidden"
  animate={isVisible ? "show" : "hidden"}
  variants={{
    hidden: { opacity: 0, x: -30 },
    show:   { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
  }}
  className="relative flex justify-center lg:justify-end px-4"
>
  <motion.div
    animate={{
      scale: hovered ? 1.5 : 1.4,
      x: -20,
      y: 0,
      filter: hovered
        ? "drop-shadow(0px 35px 70px rgba(0,0,0,.25))"
        : "drop-shadow(0px 25px 50px rgba(0,0,0,.15))",
    }}
    transition={{ type: "spring", stiffness: 180, damping: 18 }}
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    className="pointer-events-auto drop-shadow-2xl mr-12"
  >
    <Image
      src="/livro.png"
      alt="Livro Economia guiada por IA"
      width={400}
      height={500}
      priority
      style={{ backgroundColor: "transparent" }}
    />
  </motion.div>
</motion.div>


            {/* Coluna de texto */}
            <motion.div
              key={`hero-content-${locale}`}
              variants={containerStagger}
              initial="hidden"
              animate={isVisible ? "show" : "hidden"}
              className="text-left"
            >
            <motion.h1
  variants={fadeUp}
  suppressHydrationWarning
  className="
    text-black mb-8 font-poppins font-bold tracking-tight
    text-3xl sm:text-4xl lg:text-5xl xl:text-[clamp(1.75rem, 4vw, 2.5rem)]
    leading-[1.2]
  "
>
<span className="block whitespace-nowrap">{t("hero.titleLine1")}</span>
  <span className="block whitespace-nowrap">{t("hero.titleLine2")}</span>
  <span className="block whitespace-nowrap">{t("hero.titleLine3")}</span>
</motion.h1>

              <motion.div
                variants={fadeUp}
                className="text-black mb-7 max-w-xl font-poppins text-design-body text-lg lg:text-1xl"
              >
                <div suppressHydrationWarning>{t("hero.subtitleLine1")}</div>
                <div suppressHydrationWarning>{t("hero.subtitleLine2")}</div>
                <div suppressHydrationWarning>{t("hero.subtitleLine3")}</div>
              </motion.div>

              <motion.div variants={fadeUp} className="flex justify-start">
                <button
                  onClick={handleScrollToForm}
                  className="bg-black text-white px-5 py-1.5 rounded-full hover:bg-white hover:text-black transition-all duration-300 font-poppins text-design-button border border-black"
                >
                  {t("hero.cta")}
                </button>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
