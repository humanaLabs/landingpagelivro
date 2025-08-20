"use client";

import Image from "next/image";
import { useI18n } from "../../../lib/i18n";
import { motion } from "framer-motion";

export function FeaturesSection() {
  const { t, locale } = useI18n();

  return (
    <div key={locale}>
      {/* Cognitive Value Section */}
      <section className="relative bg-black text-white py-20 overflow-hidden">
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

              <div className="text-sm md:text-base text-white leading-relaxed max-w-4xl mx-auto font-thin mb-20 text-center">
                <div className="block">{t("features.bookDescriptionLine1")}</div>
                <div className="block">{t("features.bookDescriptionLine2")}</div>
                <div className="block">{t("features.bookDescriptionLine3")}</div>
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
                  <p className="text-design-body ">{t("features.bookContent1")}</p>
                  <p className="text-design-body ">{t("features.bookContent2")}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
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
                className="object-contain object-bottom"
                priority
                style={{
                  marginBottom: "-1px",
                  transform: "translateY(65px) scale(1.0)",
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
            >
              <h2 className="text-design-title  text-black mb-9">
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
          </div>
        </div>
      </section>

      {/* Future Glimpse Section */}
      <section className="relative bg-black text-white pb-24 pt-24 overflow-visible">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:pr-0"
            >
              <h2 className="text-design-title text-white mb-14 whitespace-pre-line max-w-none">
                {t("features.futureTitle")}
              </h2>

              <p className="text-design-body text-white mb-12 max-w-lg">
                {t("features.futureDescription")}
              </p>

              <button
  onClick={() => {
    const link = document.createElement("a");
    link.href = "/Economia%20Guiada%20por%20IA%20-%20Intro%20e%20cap%2001.pdf"; 
    link.download = "Economia_Guiada_por_IA_Previa.pdf"; // nome que aparece ao salvar
    link.click();
  }}
  className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-100 transition-all duration-300 flex items-center group text-design-button"
>
  {t("features.freePreview")}
  <svg
    className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
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
            </motion.div>

            {/* Preview Papers */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative flex justify-center lg:justify-end items-end"
            >
              <Image
                src="/engenhariareversa.png"
                alt="Prévia do conteúdo - Engenharia Reversa de Funções"
                width={800}
                height={650}
                className="transform relative"
                style={{
                  filter: "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.8))",
                  marginBottom: "-120px",
                  zIndex: 1000,
                  position: "relative",
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
