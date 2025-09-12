"use client";

import { useState, useEffect } from "react";
import { useI18n } from "../../../lib/i18n";
import { motion, type Variants } from "framer-motion";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

const containerStagger: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: EASE, when: "beforeChildren", staggerChildren: 0.12 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function LeadForm() {
  const { t, locale } = useI18n();
  const [form, setForm] = useState({ nome: "", email: "", telefone: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  useEffect(() => {
    setStatus("idle");
    setErrorMsg("");
  }, [locale]);

  const validate = () => {
    if (form.nome.trim().length < 3) {
      setErrorMsg(t("form.errorName") || "Digite pelo menos 3 letras no nome.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setErrorMsg(t("form.errorEmail") || "Digite um e-mail válido.");
      return false;
    }
    if (!/^\d{8,15}$/.test(form.telefone.replace(/\D/g, ""))) {
      setErrorMsg(t("form.errorPhone") || "Digite um telefone válido (somente números).");
      return false;
    }
    setErrorMsg("");
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (status !== "idle") setStatus("idle");
    if (errorMsg) setErrorMsg("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ nome: "", email: "", telefone: "" });
      } else {
        const data = await res.json();
        if (res.status === 400 && data.error?.includes("Já recebemos")) {
          setErrorMsg("Você já enviou seus dados. Obrigado!");
          setStatus("idle"); // 🔹 volta ao normal
        } else {
          setStatus("error");
        }
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="formularioContato" className="bg-black text-white py-16 px-4 scroll-mt-15">
      <div ref={ref} className="max-w-3xl mx-auto text-center">
        <motion.div
          key={`lead-wrap-${locale}`}
          variants={containerStagger}
          initial="hidden"
          animate={isVisible ? "show" : "hidden"}
        >
          <motion.h2
  key={`lead-title-${locale}`}
  variants={fadeUp}
  suppressHydrationWarning
  className="font-semibold mb-6 text-[1.875rem] md:text-[2.5rem] lg:text-[3rem] leading-[1.15]"
>
  {t("form.title") || "Cadastre-se para saber mais"}
</motion.h2>

<motion.p
  key={`lead-sub-${locale}`}
  variants={fadeUp}
  className="mb-8 text-gray-300 text-base md:text-base lg:text-xl"
>
  {t("form.subtitle") || "Preencha seus dados para receber mais informações sobre o livro."}
</motion.p>

          <motion.form
            key={`lead-form-${locale}`}
            onSubmit={handleSubmit}
            variants={fadeUp}
            className="space-y-4"
          >
            {/* Campo Nome */}
            <motion.div whileFocus={{ scale: 1.02 }}>
              <input
                key={`lead-name-${locale}`}
                type="text"
                name="nome"
                placeholder={t("form.name") || "Seu nome"}
                value={form.nome}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg text-black focus:outline-none"
                required
              />
            </motion.div>

            {/* Campo Email */}
            <motion.div whileFocus={{ scale: 1.02 }}>
              <input
                key={`lead-email-${locale}`}
                type="email"
                name="email"
                placeholder={t("form.email") || "Seu e-mail"}
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg text-black focus:outline-none"
                required
              />
            </motion.div>

            {/* Campo Telefone */}
            <motion.div whileFocus={{ scale: 1.02 }}>
              <input
                key={`lead-phone-${locale}`}
                type="tel"
                name="telefone"
                placeholder={t("form.phone") || "Seu telefone"}
                value={form.telefone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg text-black focus:outline-none"
                required
              />
            </motion.div>

            <motion.button
              key={`lead-submit-${locale}`}
              type="submit"
              disabled={status === "loading" || !!errorMsg}
              className={`px-6 py-3 rounded-full font-medium transition-colors duration-200 ${
                status === "loading"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-white text-black hover:bg-gray-200"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {status === "loading"
                ? t("form.sending") || "Enviando..."
                : t("form.submit") || "Enviar"}
            </motion.button>

            {/* Mensagens */}
            {errorMsg && (
              <motion.p
                key={`lead-error-${locale}-${errorMsg}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-red-400"
              >
                {errorMsg}
              </motion.p>
            )}

            {status === "success" && (
              <motion.p
                key={`lead-success-${locale}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-green-400"
              >
                {t("form.success") || "Dados enviados com sucesso!"}
              </motion.p>
            )}

            {status === "error" && (
              <motion.p
                key={`lead-fail-${locale}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-red-400"
              >
                {t("form.error") || "Ocorreu um erro. Tente novamente."}
              </motion.p>
            )}
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}
