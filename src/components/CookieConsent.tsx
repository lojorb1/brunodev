"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, ShieldCheck } from "lucide-react";
import { useLang } from "./LanguageProvider";

const STORAGE_KEY = "brunodev_cookie_consent";

export default function CookieConsent() {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(STORAGE_KEY);
      if (!consent) {
        // Delay slightly for smooth entrance after page load
        const timer = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // In case localStorage is blocked
    }
  }, []);

  const handleChoice = (choice: "all" | "essential") => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {}
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="cookie-banner"
          role="region"
          aria-label="Consentimento de Cookies"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="cookie-banner-inner">
            <div className="cookie-header">
              <span className="cookie-icon">
                <ShieldCheck size={20} />
              </span>
              <strong className="cookie-title">Cookies & Privacidade</strong>
            </div>

            <p className="cookie-text">
              {t.cookie?.text || "Este site utiliza cookies essenciais e armazenamento local para garantir navegação segura e alto desempenho."}{" "}
              <Link href="/privacy">{t.cookie?.learnMore || "Política de Privacidade"}</Link>
            </p>

            <div className="cookie-actions">
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => handleChoice("all")}
                id="cookie-accept-all"
              >
                {t.cookie?.accept || "Aceitar Todos"}
              </button>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => handleChoice("essential")}
                id="cookie-essential"
              >
                {t.cookie?.decline || "Apenas Essenciais"}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
