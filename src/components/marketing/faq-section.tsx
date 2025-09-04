"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useI18n } from "../../../lib/i18n";

interface FAQ { question: string; answer: string; }

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const containerStagger: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08 } },
};

export function FaqSection() {
  const { t, locale } = useI18n();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // fecha respostas abertas ao trocar idioma
  useEffect(() => setOpenFaq(null), [locale]);

  const faqQuestions = t("faq.questions") as FAQ[];

  return (
    // força remontagem da seção ao trocar idioma (garante reanimação)
    <section
      key={`faq-section-${locale}`}
      className="relative w-full overflow-hidden"
    >
      <div className="grid lg:grid-cols-2 min-h-screen w-full">
        {/* Imagem à esquerda */}
        <motion.div
          key={`faq-left-${locale}`}
          initial={{ opacity: 0, x: -24 }}
          whileInView={{
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: EASE },
          }}
          viewport={{ once: true, amount: 0.2 }}
          className="relative bg-black overflow-hidden lg:w-full lg:h-full"
        >
          <Image
            src="/Imagem 1.png"
            alt="Design Visual Effects"
            fill
            className="object-cover object-center opacity-90"
            priority
          />
        </motion.div>

        {/* FAQ à direita */}
        <div className="bg-white px-8 lg:px-16 py-20 flex flex-col justify-center">
          <div className="max-w-md">

            {/* Título */}
            <motion.h2
              key={`faq-title-${locale}`}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              suppressHydrationWarning
              className="text-design-title text-black mb-16"
            >
              {t("faq.title")}
            </motion.h2>

            {/* Lista FAQ com stagger */}
            <motion.div
              key={`faq-list-${locale}`}
              variants={containerStagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-10"
            >
              {faqQuestions.map((faq, index) => (
                <motion.div
                  key={`${locale}-${index}`}
                  variants={fadeUp}
                  className="border-b border-gray-100 pb-8"
                >
                  <div className="group">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full cursor-pointer text-design-subtitle text-black flex items-center justify-between py-2 text-left hover:text-gray-700 transition-colors duration-200"
                    >
                      <span suppressHydrationWarning>{faq.question}</span>
                      <motion.svg
                        animate={{ rotate: openFaq === index ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="w-5 h-5 flex-shrink-0 ml-6 text-gray-400"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    </button>

                    <AnimatePresence initial={false}>
                      {openFaq === index && (
                        <motion.div
                          key={`answer-${locale}-${index}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                          className="overflow-hidden mt-6"
                        >
                          <div suppressHydrationWarning className="text-design-body text-black pb-2">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}