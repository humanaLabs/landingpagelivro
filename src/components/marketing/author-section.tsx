"use client";

import Image from "next/image";
import { useI18n } from "../../../lib/i18n";
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export function AuthorSection() {
  const { t, locale } = useI18n();
  const testimonials = t("author.testimonials");
  const [showAll, setShowAll] = useState(false);

  const visibleTestimonials = showAll ? testimonials : testimonials.slice(0, 3);

  return (
    <div key={locale}>
      {/* Seção inicial do autor */}
      <section className="bg-white pt-48 pb-20 relative z-0">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header do autor */}
            <motion.div
              className="flex items-center gap-6 mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src="/fotoeduardo.png"
                  alt="Eduardo Ibrahim"
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>
              <h2 className="text-design-title text-black">
                {t("author.name")}
              </h2>
            </motion.div>

            {/* Sobre o autor */}
            <motion.div
              className="bg-white border border-black rounded-2xl p-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h3 className="text-design-subtitle text-black mb-6">
                {t("author.aboutAuthor")}
              </h3>
              <div className="text-black space-y-4">
                <p className="text-design-body">{t("author.bio1")}</p>
                <p className="text-design-body">{t("author.bio2")}</p>
                <p className="text-design-body">{t("author.bio3")}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Avatar interativo + título */}
      <section className="bg-white">
        <div className="w-full">
          <motion.div
            className="flex justify-center py-12 bg-white"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="relative w-[800px] h-[450px] bg-white rounded-lg overflow-hidden shadow-xl border border-gray-200">
              <video
                src="/videoavatar.mp4"
                className="w-full h-full object-cover object-top"
                controls
                autoPlay
                muted
                loop
              />
            </div>
          </motion.div>

          <motion.div
            className="bg-white py-8 px-4 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-design-mega text-black tracking-tight">
              {t("author.bookTitle")}
            </h2>
          </motion.div>

          {/* Depoimentos */}
          <div className="bg-white py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                {visibleTestimonials.map((testimonial: any, index: number) => (
                  <motion.div
                    key={index}
                    className="bg-white p-6 text-center h-full flex flex-col border border-gray-200 rounded-xl shadow-sm"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      ease: "easeOut",
                      delay: index * 0.2, // efeito cascata
                    }}
                    viewport={{ once: true }}
                  >
                    <div className="text-black text-sm leading-relaxed mb-6 flex-grow">
                      {testimonial.text}
                    </div>
                    <div className="mt-auto">
                      <div className="bg-black text-white py-3 mb-4 rounded-md">
                        <div className="font-bold text-sm">
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
                    className="flex items-center gap-2 text-black font-medium hover:underline"
                  >
                    {showAll ? "Mostrar menos" : "Mostrar mais"}
                    {showAll ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
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
