"use client";

import { useI18n } from "../../../lib/i18n";

export function Footer() {
  const { t, locale } = useI18n();

  return (
    <footer key={locale} className="bg-black text-white">
      <div className="w-full mx-auto px-5 pt-10 pb-6">
        {/* Grid 3 colunas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 items-start">
          
          {/* ESQUERDA */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center flex-wrap gap-2">
              <span className="text-[13px] uppercase tracking-wide text-white/70">
                {t("footer.humanaSiteLabel")}
              </span>
              <a
                href="https://humana.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-[13px] hover:text-gray-200"
              >
                humana.ai
              </a>

              {/* LinkedIn Humana */}
              <a
                href="https://www.linkedin.com/company/humana-ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 23 23"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M4.98 3.5C4.98 5 3.9 6 2.5 6S0 5 0 3.5 1.1 1 2.5 1 4.98 2 4.98 3.5zM.5 8.5h4V24h-4V8.5zm7 0h3.7v2.1h.1c.5-1 1.8-2.1 3.7-2.1 3.9 0 4.6 2.6 4.6 6v9h-4v-8c0-1.9-.1-4.4-2.7-4.4-2.7 0-3.1 2-3.1 4.2v8.2h-4V8.5z" />
                </svg>
              </a>

              {/* Instagram Humana */}
              <a
                href="https://www.instagram.com/humana_ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 22 22"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3a5.75 5.75 0 1 1 0 11.5 5.75 5.75 0 0 1 0-11.5zm0 1.5a4.25 4.25 0 1 0 0 8.5 4.25 4.25 0 0 0 0-8.5zm5.5-.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z" />
                </svg>
              </a>
            </div>
            <div className="text-[13px]">{t("footer.publisherName")}</div>
          </div>

          {/* CENTRO */}
          <div className="flex flex-col items-center mt-11">
            <div className="flex gap-4 whitespace-nowrap text-[14px]">
              <a href="#" className="hover:text-gray-300">{t("footer.privacyPolicy")}</a>
              <span>|</span>
              <a href="#" className="hover:text-gray-300">{t("footer.termsOfUse")}</a>
              <span>|</span>
              <a href="#" className="hover:text-gray-300">{t("footer.contact")}</a>
            </div>
          </div>

          {/* DIREITA */}
          <div className="flex flex-col md:flex-row md:items-center justify-end gap-3">
            <div className="flex items-center gap-2">
              <span className="text-[13px] uppercase tracking-wide text-white/70">
                {t("footer.eduardoLabel")}
              </span>
              <span className="text-white/30">|</span>

              {/* LinkedIn Eduardo */}
              <a
                href="https://www.linkedin.com/in/eduibrahim/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 23 23"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M4.98 3.5C4.98 5 3.9 6 2.5 6S0 5 0 3.5 1.1 1 2.5 1 4.98 2 4.98 3.5zM.5 8.5h4V24h-4V8.5zm7 0h3.7v2.1h.1c.5-1 1.8-2.1 3.7-2.1 3.9 0 4.6 2.6 4.6 6v9h-4v-8c0-1.9-.1-4.4-2.7-4.4-2.7 0-3.1 2-3.1 4.2v8.2h-4V8.5z" />
                </svg>
              </a>

              {/* Instagram Eduardo */}
              <a
                href="https://www.instagram.com/eduibrahim/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 22 22"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3a5.75 5.75 0 1 1 0 11.5 5.75 5.75 0 0 1 0-11.5zm0 1.5a4.25 4.25 0 1 0 0 8.5 4.25 4.25 0 0 0 0-8.5zm5.5-.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z" />
                </svg>
              </a>
            </div>

            <button className="border border-white text-white px-4 py-[3px] text-[13px] rounded-full hover:bg-white hover:text-black transition-colors font-semibold">
              {t("footer.ctaButton")}
            </button>
          </div>

        </div>
      </div>
      <div className="border-b border-white/15" />
    </footer>
  );
}
