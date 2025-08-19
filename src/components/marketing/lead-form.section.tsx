"use client";

import { useState } from "react";
import { useI18n } from "../../../lib/i18n";
import { motion } from "framer-motion";

export function LeadForm() {
  const { t, locale } = useI18n();
  const [form, setForm] = useState({ nome: "", email: "", telefone: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

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
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section key={locale} className="bg-black text-white py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl font-bold mb-6"
        >
          {t("form.title") || "Cadastre-se para saber mais"}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mb-8 text-gray-300"
        >
          {t("form.subtitle") || "Preencha seus dados para receber mais informações sobre o livro."}
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          <motion.input
            type="text"
            name="nome"
            placeholder={t("form.name") || "Seu nome"}
            value={form.nome}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg text-black focus:outline-none"
            required
            whileFocus={{ scale: 1.02 }}
          />
          <motion.input
            type="email"
            name="email"
            placeholder={t("form.email") || "Seu e-mail"}
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg text-black focus:outline-none"
            required
            whileFocus={{ scale: 1.02 }}
          />
          <motion.input
            type="tel"
            name="telefone"
            placeholder={t("form.phone") || "Seu telefone"}
            value={form.telefone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg text-black focus:outline-none"
            required
            whileFocus={{ scale: 1.02 }}
          />

          <motion.button
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

          {errorMsg && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-red-400"
            >
              {errorMsg}
            </motion.p>
          )}
          {status === "success" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-green-400"
            >
              {t("form.success") || "Dados enviados com sucesso!"}
            </motion.p>
          )}
          {status === "error" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-red-400"
            >
              {t("form.error") || "Ocorreu um erro. Tente novamente."}
            </motion.p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
