"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLang } from "./LanguageProvider";
import { LANGS } from "@/lib/i18n";

export default function Navbar() {
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(scrollY > 20);
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);

  const links = [
    { href: "#about", l: t.nav.about },
    { href: "#services", l: t.nav.services },
    { href: "#tech", l: t.nav.tech },
    { href: "#contact", l: t.nav.contact },
  ];

  return (
    <motion.header
      className={`nav ${scrolled ? "scrolled" : ""}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container nav-inner">
        <a href="#home" className="logo" aria-label="BrunoDEV">
          &lt;Bruno<span>DEV</span>/&gt;
        </a>

        <nav className="nav-links" aria-label="Main">
          {links.map((x) => (
            <a key={x.href} href={x.href}>{x.l}</a>
          ))}
        </nav>

        <div className="nav-right">
          <div className="lang-switch" role="group" aria-label="Language">
            {LANGS.map((l) => (
              <button key={l} id={`lang-${l}`} className={lang === l ? "active" : ""} onClick={() => setLang(l)} aria-pressed={lang === l}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <a href="#contact" className="btn btn-sm btn-primary nav-cta">{t.nav.cta}</a>
          <button className="burger" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div className="mobile-menu" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
            {links.map((x) => (
              <a key={x.href} href={x.href} onClick={() => setOpen(false)}>{x.l}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
