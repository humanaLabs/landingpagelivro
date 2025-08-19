"use client";
import { useState } from "react";
import Image from "next/image";
import { useI18n } from "../../../lib/i18n";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

export function HeroSection() {
  const [hovered, setHovered] = useState(false);
  const { t, locale } = useI18n();
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section
      key={locale}
      ref={ref}
      className={`relative bg-white text-black pt-20 pb-12 overflow-hidden min-h-screen
        transition-all duration-700 transform
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[80vh]">
            {/* Book Image */}
            <div className="relative inline-block pointer-events-none">
              <Image
                src="/Livro.png"
                alt="Livro Economia guiada por IA"
                width={400}
                height={500}
                className="drop-shadow-2xl transition-all duration-500 ease-out pointer-events-auto"
                priority
                style={{
                  backgroundColor: "transparent",
                  transform: hovered
                    ? "scale(1.5) translate(-20px, 0px)"
                    : "scale(1.4) translate(-20px, 0px)",
                  filter: hovered
                    ? "drop-shadow(0 35px 70px rgba(0, 0, 0, 0.25))"
                    : "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.15))",
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              />
            </div>

            {/* Content - Right Side */}
            <div className="text-left">
              <h1 className="text-black mb-8 font-poppins text-design-title sm:text-5xl lg:text-6xl xl:text-design-mega">
                {t("hero.title")}
              </h1>

              <div className="text-black mb-7 max-w-xl font-poppins text-design-body sm:text-xl lg:text-2xl">
                <div className="block">{t("hero.subtitleLine1")}</div>
                <div className="block">{t("hero.subtitleLine2")}</div>
                <div className="block">{t("hero.subtitleLine3")}</div>
              </div>

              <div className="flex justify-start">
                <button className="bg-black text-white px-5 py-1.5 rounded-full hover:bg-white hover:text-black transition-all duration-300 font-poppins text-design-button border border-black">
                  {t("hero.cta")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
