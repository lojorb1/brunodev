"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Check, CheckCircle2, Clock, Copy, Globe, Loader2, Lock, Mail, Send } from "lucide-react";
import { useLang } from "./LanguageProvider";
import { Reveal, SectionHead, Tilt } from "./ui";
import { SITE } from "@/lib/site";

const Github = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>
);
const Linkedin = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z"/></svg>
);

type Status = "idle" | "sending" | "success" | "error";
const EMPTY = { name: "", email: "", company: "", budget: 0, topic: 0, message: "", website: "" };

export function Contact() {
  const { t, lang } = useLang();
  const [copied, setCopied] = useState(false);
  const [f, setF] = useState(EMPTY);
  const [status, setStatus] = useState<Status>("idle");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: f.name,
          email: f.email,
          company: f.company,
          budget: t.contact.budgets[f.budget],
          topic: t.contact.topics[f.topic],
          message: f.message,
          lang,
          website: f.website,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "error");
      setStatus("success");
      setF(EMPTY);
    } catch {
      setStatus("error");
    }
  };

  const copy = async () => {
    try { await navigator.clipboard.writeText(SITE.email); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch {}
  };

  const set = <K extends keyof typeof EMPTY>(k: K) => (e: { target: { value: string } }) =>
    setF({ ...f, [k]: typeof EMPTY[k] === "number" ? Number(e.target.value) : e.target.value });

  return (
    <section id="contact" className="section container">
      <SectionHead eyebrow={t.contact.eyebrow} title={t.contact.title} />
      <div className="contact-grid">
        <Reveal>
          <Tilt className="contact-info glass" max={8}>
            <p className="muted">{t.contact.sub}</p>
            <div className="contact-stats">
              <div><Clock size={18} /><span>{t.contact.reply}</span><b>{t.contact.replyV}</b></div>
              <div><Globe size={18} /><span>{t.contact.langs}</span><b>EN · ES · PT</b></div>
            </div>
            <span className="small-label">{t.contact.direct}</span>
            <a className="mail" href={`mailto:${SITE.email}`}><Mail size={20} /> {SITE.email}</a>
            <button className="btn btn-ghost btn-sm" onClick={copy} type="button" id="copy-email">
              {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? t.contact.copied : t.contact.copy}
            </button>
            {(SITE.github || SITE.linkedin) && (
              <div className="socials">
                {SITE.github && <a href={SITE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={20} /></a>}
                {SITE.linkedin && <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={20} /></a>}
              </div>
            )}
          </Tilt>
        </Reveal>

        <Reveal delay={0.15}>
          <Tilt className="form-shell glass" max={4} scale={1} glare={false}>
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div key="ok" className="form-success" initial={{ opacity: 0, scale: 0.8, rotateX: -30 }} animate={{ opacity: 1, scale: 1, rotateX: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ type: "spring", stiffness: 160, damping: 16 }}>
                  <div className="success-icon"><CheckCircle2 size={44} /></div>
                  <h3>{t.contact.success}</h3>
                  <button className="btn btn-ghost btn-sm" type="button" onClick={() => setStatus("idle")} id="f-again">{t.contact.again}</button>
                </motion.div>
              ) : (
                <motion.form key="form" className="form" onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
                  {/* honeypot – hidden from humans */}
                  <input className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" name="website" value={f.website} onChange={set("website")} />
                  <div className="row">
                    <label className="field">
                      <input id="f-name" required placeholder=" " value={f.name} onChange={set("name")} autoComplete="name" maxLength={120} />
                      <span>{t.contact.name}</span>
                    </label>
                    <label className="field">
                      <input id="f-email" type="email" required placeholder=" " value={f.email} onChange={set("email")} autoComplete="email" maxLength={200} />
                      <span>{t.contact.email}</span>
                    </label>
                  </div>
                  <label className="field">
                    <input id="f-company" placeholder=" " value={f.company} onChange={set("company")} autoComplete="organization" maxLength={160} />
                    <span>{t.contact.company}</span>
                  </label>

                  <div className="field-group">
                    <span className="group-label">{t.contact.topic}</span>
                    <div className="pills" role="radiogroup" aria-label={t.contact.topic}>
                      {t.contact.topics.map((x, i) => (
                        <button key={x} type="button" role="radio" aria-checked={f.topic === i} className={`pill ${f.topic === i ? "on" : ""}`} onClick={() => setF({ ...f, topic: i })} id={`f-topic-${i}`}>{x}</button>
                      ))}
                    </div>
                  </div>
                  <div className="field-group">
                    <span className="group-label">{t.contact.budget}</span>
                    <div className="pills" role="radiogroup" aria-label={t.contact.budget}>
                      {t.contact.budgets.map((x, i) => (
                        <button key={x} type="button" role="radio" aria-checked={f.budget === i} className={`pill ${f.budget === i ? "on" : ""}`} onClick={() => setF({ ...f, budget: i })} id={`f-budget-${i}`}>{x}</button>
                      ))}
                    </div>
                  </div>

                  <label className="field">
                    <textarea id="f-message" required rows={5} placeholder=" " value={f.message} onChange={set("message")} minLength={5} maxLength={5000} />
                    <span>{t.contact.message}</span>
                  </label>

                  {status === "error" && (
                    <motion.p className="form-error" role="alert" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}>
                      <AlertTriangle size={16} /> {t.contact.error}
                    </motion.p>
                  )}

                  <button className="btn btn-primary btn-3d" type="submit" id="f-submit" disabled={status === "sending"}>
                    {status === "sending" ? <><Loader2 size={17} className="spin" /> {t.contact.sending}</> : <>{t.contact.send} <Send size={17} /></>}
                  </button>
                  <small className="muted secure-note"><Lock size={13} /> {t.contact.note}</small>
                </motion.form>
              )}
            </AnimatePresence>
          </Tilt>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <Link href="/" className="logo">&lt;Bruno<span>DEV</span>/&gt;</Link>
        <p className="footer-copy">© {new Date().getFullYear()} BrunoDEV. {t.footer.rights}</p>
        <div className="footer-links">
          <Link href="/privacy">{t.footer.privacy}</Link>
          <span className="footer-sep">·</span>
          <Link href="/terms">{t.footer.terms}</Link>
        </div>
      </div>
    </footer>
  );
}
