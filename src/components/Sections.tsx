"use client";

import Image from "next/image";
import { Check, Shield, Cloud, Brain, Code2, Search, Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLang } from "./LanguageProvider";
import { Reveal, SectionHead, Tilt } from "./ui";

const ICONS = [Shield, Cloud, Brain, Code2, Search, Lock];

const TECH: string[][] = [
  ["OWASP Top 10", "Pentesting", "Zero Trust", "IAM", "WAF", "SIEM", "Cryptography", "GDPR"],
  ["Linux", "Docker", "Kubernetes", "Windows Server", "GitHub Actions", "Nginx", "AWS"],
  ["TypeScript", "Node.js", "React", "Next.js", "Python", "PostgreSQL", "REST / GraphQL", "PHP"],
  ["LLMs", "RAG", "OpenAI", "LangChain", "Automation", "Vector DBs", "Prompt Engineering"],
  ["Technical SEO", "Core Web Vitals", "Schema.org", "hreflang", "Search Console", "Analytics"],
];

export function About() {
  const { t } = useLang();
  return (
    <section id="about" className="section container">
      <div className="about-grid">
        <Reveal>
          <Tilt className="about-card glass" max={8}>
            <div className="about-card-badge">
              <span className="live-dot" />
              <span>{t.about.card.status}</span>
            </div>

            <div className="avatar">
              <Image
                src="/bruno.webp"
                alt="Bruno - Developer, DevOps & Security Consultant"
                width={170}
                height={170}
                className="avatar-img"
                priority
              />
              <div className="ring" />
              <div className="ring ring2" />
            </div>

            <div className="about-profile-info">
              <h3 className="profile-name">
                Bruno <span className="verified-badge" title="Verified Professional">✓</span>
              </h3>
              <p className="profile-role">{t.about.card.role}</p>
            </div>

            <div className="profile-specs">
              <div className="spec-row">
                <span className="spec-label">{t.about.card.eduLabel}</span>
                <span className="spec-val highlight-us-eu">{t.about.card.eduVal}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">{t.about.card.certLabel}</span>
                <span className="spec-val highlight-cert">{t.about.card.certVal}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">{t.about.card.expLabel}</span>
                <span className="spec-val">{t.about.card.expVal}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">{t.about.card.scopeLabel}</span>
                <span className="spec-val">{t.about.card.scopeVal}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">{t.about.card.langsLabel}</span>
                <span className="spec-val">{t.about.card.langsVal}</span>
              </div>
            </div>
          </Tilt>
        </Reveal>

        <div>
          <Reveal><span className="eyebrow">{t.about.eyebrow}</span></Reveal>
          <Reveal delay={0.1}><h2>{t.about.title}</h2></Reveal>
          <Reveal delay={0.2}><p className="muted">{t.about.p1}</p></Reveal>
          <Reveal delay={0.3}><p className="muted">{t.about.p2}</p></Reveal>
          <ul className="points">
            {t.about.points.map((p, i) => (
              <Reveal key={p} delay={0.35 + i * 0.08}>
                <li><Check size={18} /> {p}</li>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.65}>
            <div className="about-action-row">
              <a href="#contact" className="btn btn-primary btn-sm">
                {t.about.cta} <ArrowRight size={16} />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Services() {
  const { t } = useLang();
  return (
    <section id="services" className="section container">
      <SectionHead eyebrow={t.services.eyebrow} title={t.services.title} />
      <div className="cards">
        {t.services.items.map((s, i) => {
          const Icon = ICONS[i];
          return (
            <Reveal key={s.t} delay={i * 0.08}>
              <Tilt className="card glass" max={14} scale={1.03}>
                <div className="card-icon"><Icon size={26} /></div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
                <span className="card-num">0{i + 1}</span>
                <span className="card-glow" />
              </Tilt>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export function Tech() {
  const { t } = useLang();
  return (
    <section id="tech" className="section container">
      <SectionHead eyebrow={t.tech.eyebrow} title={t.tech.title} />
      <div className="tech-groups">
        {TECH.map((items, g) => (
          <Reveal key={g} delay={g * 0.07}>
            <Tilt className="tech-group glass" max={6}>
              <h3>{t.tech.groups[g]}</h3>
              <div className="chips">
                {items.map((x) => (
                  <motion.span key={x} className="chip" whileHover={{ scale: 1.08, y: -3 }}>{x}</motion.span>
                ))}
              </div>
            </Tilt>
          </Reveal>
        ))}
      </div>
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...TECH.flat(), ...TECH.flat()].map((x, i) => <span key={i}>{x}</span>)}
        </div>
      </div>
    </section>
  );
}

export function Process() {
  const { t } = useLang();
  return (
    <section className="section container">
      <SectionHead eyebrow={t.process.eyebrow} title={t.process.title} />
      <div className="steps">
        {t.process.steps.map((s, i) => (
          <Reveal key={s.t} delay={i * 0.1}>
            <Tilt className="step glass" max={12}>
              <span className="step-n">0{i + 1}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
