"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Server, Sparkles, Award, Languages, Zap } from "lucide-react";
import { useLang } from "./LanguageProvider";
import { Counter, Tilt } from "./ui";

const STAT_ICONS = [Award, Languages, ShieldCheck, Zap];

function Cube() {
  return (
    <div className="cube-wrap" aria-hidden="true">
      <div className="cube">
        {["</>", "AI", "SEC", "OPS", "SEO", "{ }"].map((l, i) => (
          <span key={i} className={`face f${i}`}>{l}</span>
        ))}
      </div>
    </div>
  );
}

const LINES = [
  { c: "c-mut", t: "$ ssh bruno@brunodev.eu" },
  { c: "c-ok", t: "✔ connection encrypted (TLS 1.3)" },
  { c: "c-mut", t: "$ ./security-scan --deep" },
  { c: "c-cy", t: "› checking 1,284 rules…" },
  { c: "c-ok", t: "✔ 0 critical vulnerabilities" },
  { c: "c-mut", t: "$ deploy --zero-downtime" },
  { c: "c-ok", t: "✔ production is healthy 🚀" },
];

function Terminal() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setN((x) => (x >= LINES.length + 3 ? 0 : x + 1)), 900);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="terminal glass">
      <div className="term-bar"><i /><i /><i /><span>bruno@brunodev: ~</span></div>
      <div className="term-body">
        {LINES.slice(0, n).map((l, i) => (
          <motion.div key={i} className={l.c} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>{l.t}</motion.div>
        ))}
        <span className="caret" />
      </div>
    </div>
  );
}

export default function Hero() {
  const { t } = useLang();
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((x) => x + 1), 2600);
    return () => clearInterval(id);
  }, []);
  const role = t.hero.roles[i % t.hero.roles.length];

  return (
    <section id="home" className="hero container">
      <div className="hero-copy">
        <motion.span className="badge" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <span className="dot" /> {t.hero.badge}
        </motion.span>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.8 }}>
          {t.hero.pre}
          <br />
          <span className="role-wrap">
            <AnimatePresence mode="wait">
              <motion.span key={role} className="grad role" initial={{ y: 40, opacity: 0, filter: "blur(8px)" }} animate={{ y: 0, opacity: 1, filter: "blur(0px)" }} exit={{ y: -40, opacity: 0, filter: "blur(8px)" }} transition={{ duration: 0.45 }}>
                {role}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>

        <motion.p className="lead" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
          {t.hero.sub}
        </motion.p>

        <motion.div className="hero-actions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <a href="#contact" className="btn btn-primary" id="hero-cta">{t.hero.primary} <ArrowRight size={18} /></a>
          <a href="#services" className="btn btn-ghost">{t.hero.secondary}</a>
        </motion.div>
      </div>

      <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.85, rotateY: -25 }} animate={{ opacity: 1, scale: 1, rotateY: 0 }} transition={{ delay: 0.5, duration: 1.1, ease: [0.22, 1, 0.36, 1] }} style={{ transformPerspective: 1200 }}>
        <Tilt className="hero-tilt" max={10} scale={1} glare={false}>
          <Cube />
          <div className="z-30"><Terminal /></div>
          <motion.div className="float-card glass fc1" style={{ z: 90 }} animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 5 }}>
            <ShieldCheck size={20} /> <b>Secure</b>
          </motion.div>
          <motion.div className="float-card glass fc2" style={{ z: 120 }} animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 6 }}>
            <Server size={20} /> <b>99.99%</b>
          </motion.div>
          <motion.div className="float-card glass fc3" style={{ z: 70 }} animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4.5 }}>
            <Sparkles size={20} /> <b>AI</b>
          </motion.div>
        </Tilt>
      </motion.div>

      <div className="stats-grid">
        {t.stats.map((s, i) => {
          const Icon = STAT_ICONS[i] || Award;
          return (
            <motion.div
              key={s.l}
              className="stat-wrapper"
              initial={{ opacity: 0, y: 35, rotateX: -20 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformPerspective: 1000 }}
            >
              <Tilt className={`stat-card stat-${i}`} max={12} scale={1.03}>
                <div className="stat-card-header">
                  <span className="stat-icon-pill">
                    <Icon size={20} />
                  </span>
                  <span className="stat-index">0{i + 1}</span>
                </div>
                <div className="stat-main">
                  <strong className="stat-number">
                    <Counter to={s.v} suffix={s.s} />
                  </strong>
                  <span className="stat-label">{s.l}</span>
                </div>
                <div className="stat-glow-line" />
                <div className="stat-ambient-glow" />
              </Tilt>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
