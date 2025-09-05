"use client";

import Image from "next/image";
import { useI18n } from "../../../lib/i18n";
import { motion } from "framer-motion";

export function FeaturesSection() {
  const { t, locale } = useI18n();

  return (
    <div key={locale}>
      {/* Cognitive Value Section */}
      <section className="relative bg-black text-white py-20 overflow-visible md:overflow-hidden">
        {/* Background effect */}
        <div className="absolute inset-0">
          <div className="absolute right-0 top-1/4 w-1/3 h-1/2 flex items-center justify-end">
            <Image
              src="/design.png"
              alt="Efeito digital"
              width={300}
              height={300}
              className="opacity-80 object-contain"
            />
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-white mb-16 leading-tight">
                <span className="block">{t("features.aiTitleLine1")}</span>
                <span className="block">{t("features.aiTitleLine2")}</span>
                <span className="block underline decoration-white/50">
                  {t("features.aiTitleLine3")}
                </span>
              </h2>

              <div className="text-sm md:text-base text-white leading-relaxed max-w-4xl mx-auto font-thin mb-20 text-center book-description-mobile">
                <div className="line-1">{t("features.bookDescriptionLine1")}</div>
                <div className="line-2">{t("features.bookDescriptionLine2")}</div>
                <div className="line-3">{t("features.bookDescriptionLine3")}</div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white-900/60 border border-white-500 rounded-3xl px-12 py-12">
                <h3 className="text-left font-medium text-white text-base mb-8">
                  {t("features.aboutBook")}
                </h3>

                <div className="text-white text-left space-y-6">
                  <p className="text-design-body">{t("features.bookContent1")}</p>
                  <p className="text-design-body">{t("features.bookContent2")}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white pt-10 pb-10 relative z-0">
        <div className="container mx-auto px-4">
          {/* Mobile: Content first, then image */}
          <div className="flex flex-col lg:hidden">
            {/* Benefits Content - Top */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h2 className="text-design-title text-black mb-9 text-center">
                {t("features.benefitsTitle")}
              </h2>

              <div className="space-y-3">
                {t("features.benefits").map((benefit: string, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="flex-shrink-0 w-5 h-5 bg-black rounded-sm flex items-center justify-center mt-0.5">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="text-design-body text-black">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Book with Hand Image - Bottom */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative flex justify-center -mb-10"
            >
              <Image
                src="/livroerobo.png"
                alt="Mão segurando livro Economia guiada por IA"
                width={900}
                height={1000}
                className="
                  object-contain object-bottom relative
                  z-10
                  translate-y-10 scale-90
                  pointer-events-none
                "
                style={{
                  filter: "drop-shadow(0 15px 35px rgba(0, 0, 0, 0.1))",
                }}
              />
            </motion.div>
          </div>

          {/* Desktop: Original layout */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
            {/* Book with Hand Image - Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative flex justify-center lg:justify-start"
            >
              <Image
                src="/livroerobo.png"
                alt="Mão segurando livro Economia guiada por IA"
                width={900}
                height={1000}
                className="
                  object-contain object-bottom relative
                  z-10 md:z-auto
                  md:translate-y-[75px] md:scale-[0.9]
                  translate-y-10 scale-90
                  pointer-events-none
                "
                style={{
                  // desktop mantém o drop-shadow e deslocamento
                  filter: "drop-shadow(0 15px 35px rgba(0, 0, 0, 0.1))",
                }}
              />
            </motion.div>

            {/* Benefits Content - Right Side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative z-20 md:z-auto"
            >
             <h2 className="text-design-title text-black mb-9 !text-4xl lg:!text-5xl">
  {t("features.benefitsTitle")}
</h2>

              <div className="space-y-4">
                {t("features.benefits").map((benefit: string, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="flex-shrink-0 w-5 h-5 bg-black rounded-sm flex items-center justify-center mt-0.5">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="text-design-body text-black">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Future Glimpse Section - PAPER SOBREPÕE O FOOTER NO MOBILE */}
<section className="
  relative bg-black text-white 
  pt-16 pb-20          /* mobile mantém espaçamento atual */
  md:pt-36 md:pb-34   /* desktop com fundo preto maior */
  overflow-visible z-40
">
  <div className="container mx-auto px-4 relative z-10">
    <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
      
      {/* Conteúdo à esquerda */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="lg:pr-8"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white mb-8 leading-tight max-w-lg">
          {t("features.futureTitle")}
        </h2>

        <p className="text-lg text-white/80 mb-10 max-w-md leading-relaxed">
          {t("features.futureDescription")}
        </p>

        <div className="flex justify-center md:justify-start">
          <button
            onClick={() => {
              const link = document.createElement("a");
              link.href = "/Economia%20Guiada%20por%20IA%20-%20Introdução.pdf";
              link.download = "Economia Guiada por IA - Introdução.pdf";
              link.click();
            }}
            className="bg-white text-black px-8 py-3 rounded-full hover:bg-gray-100 transition-all duration-300 flex items-center group text-sm font-medium"
          >
            {t("features.freePreview")}
            <svg
              className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </button>
        </div>
      </motion.div>

      {/* Preview Paper à direita - SOBREPÕE O FOOTER NO MOBILE */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative flex justify-center lg:justify-end z-50"
      >
        <div className="relative z-50">
          <Image
            src="/engenhariareversa.png"
            alt="Prévia do conteúdo - Engenharia Reversa de Funções"
            width={600}
            height={800}
            className="
              paper-section paper-image
              w-full h-auto
              transform rotate-3 hover:rotate-1
              transition-transform duration-500

              /* Mobile */
              -translate-y-5 scale-100

              /* Desktop */
              md:scale-150
              md:-mt-[-200px]
              md:z-50
            "
          />
        </div>
      </motion.div>
    </div>
  </div>
</section>
    </div>
  );
}