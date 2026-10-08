"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Shield, Lock, Eye, FileText, CheckCircle2, UserCheck, Server, Cookie, HelpCircle } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { type Lang } from "@/lib/i18n";

export default function PrivacyPage() {
  const { lang: currentLang, setLang } = useLang();
  const [selectedLang, setSelectedLang] = useState<Lang>(currentLang);

  const activeLang = selectedLang || currentLang || "pt";

  const handleLangChange = (l: Lang) => {
    setSelectedLang(l);
    setLang(l);
  };

  return (
    <div className="legal-page container">
      <nav className="legal-nav">
        <Link href="/" className="legal-back">
          <ArrowLeft size={18} />
          {activeLang === "en" ? "Back to Home" : activeLang === "es" ? "Volver al Inicio" : "Voltar ao Início"}
        </Link>

        <div className="legal-lang-tabs">
          <button
            type="button"
            className={`legal-lang-btn ${activeLang === "pt" ? "active" : ""}`}
            onClick={() => handleLangChange("pt")}
          >
            Português
          </button>
          <button
            type="button"
            className={`legal-lang-btn ${activeLang === "en" ? "active" : ""}`}
            onClick={() => handleLangChange("en")}
          >
            English
          </button>
          <button
            type="button"
            className={`legal-lang-btn ${activeLang === "es" ? "active" : ""}`}
            onClick={() => handleLangChange("es")}
          >
            Español
          </button>
        </div>
      </nav>

      <main className="legal-content">
        {activeLang === "pt" && (
          <article>
            <div className="legal-badge">
              <Shield size={14} /> Em conformidade com LGPD (Brasil), GDPR (UE) e CCPA
            </div>
            <h1>Política de Privacidade & Proteção de Dados</h1>
            <div className="legal-meta">
              <span><strong>Responsável:</strong> BrunoDEV</span>
              <span>•</span>
              <span><strong>Última atualização:</strong> Outubro de 2026</span>
              <span>•</span>
              <span><strong>Contato:</strong> contact@brunodev.eu</span>
            </div>

            <div className="legal-card">
              <section className="legal-section">
                <h2><Shield size={20} /> 1. Introdução e Compromisso</h2>
                <p>
                  A privacidade, a confidencialidade e a segurança das informações são pilares fundamentais da consultoria <strong>BrunoDEV</strong>. Esta Política de Privacidade descreve de forma clara e transparente como coletamos, tratamos, armazenamos e protegemos seus dados pessoais quando você acessa nosso website ou entra em contato para solicitar serviços de consultoria em Cibersegurança, DevOps, Arquitetura Cloud, Inteligência Artificial ou Desenvolvimento.
                </p>
                <p>
                  Atuamos em estrita observância à Lei Geral de Proteção de Dados Pessoais (<strong>LGPD</strong> - Lei nº 13.709/2018), ao Regulamento Geral sobre a Proteção de Dados da União Europeia (<strong>GDPR</strong> - Regulamento UE 2016/679) e aos mais elevados padrões internacionais de segurança da informação (ISO/IEC 27001 e CIS Controls).
                </p>
              </section>

              <section className="legal-section">
                <h2><FileText size={20} /> 2. Dados Pessoais Coletados</h2>
                <p>Coletamos exclusivamente os dados necessários para a finalidade pretendida:</p>
                <ul>
                  <li><strong>Dados fornecidos voluntariamente via formulário:</strong> Nome, endereço de e-mail corporativo ou pessoal, nome da empresa (opcional), estimativa orçamentária e descrição da necessidade ou projeto.</li>
                  <li><strong>Dados técnicos e de segurança de navegação:</strong> Endereço IP (com máscaras e tratamento para segurança contra ataques DDoS e brute force), registros de timestamp, navegador e país aproximado de acesso para ajuste automático de idioma.</li>
                  <li><strong>Não coletamos dados pessoais sensíveis:</strong> Não solicitamos dados sobre origem racial ou étnica, convicções religiosas, opiniões políticas, dados de saúde ou genéticos.</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2><Lock size={20} /> 3. Finalidades e Bases Legais do Tratamento</h2>
                <p>O tratamento de dados pessoais é fundamentado nas seguintes hipóteses legais:</p>
                <ul>
                  <li><strong>Execução de procedimentos pré-contratuais (Art. 7º, V da LGPD / Art. 6(1)(b) do GDPR):</strong> Utilização dos seus dados de contato para responder mensagens, enviar propostas de consultoria técnica e viabilizar a formalização de projetos solicitados por você.</li>
                  <li><strong>Legítimo Interesse e Segurança (Art. 7º, IX da LGPD / Art. 6(1)(f) do GDPR):</strong> Prevenção a incidentes de segurança, proteção contra fraudes, ataques de negação de serviço (DoS/DDoS) e abuso de infraestrutura.</li>
                  <li><strong>Cumprimento de obrigação legal ou regulatória:</strong> Quando exigido por normas contábeis, fiscais ou determinações judiciais competentes.</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2><Server size={20} /> 4. Armazenamento, Segurança e Retenção</h2>
                <p>
                  Adotamos medidas técnicas e organizacionais de padrão militar para blindar seus dados contra acesso não autorizado, destruição, perda ou alteração:
                </p>
                <ul>
                  <li>Toda a transmissão de dados é criptografada utilizando o protocolo <strong>TLS 1.3 / HTTPS</strong> de ponta a ponta.</li>
                  <li>Servidores configurados sob preceitos de <em>Zero Trust</em>, com firewall avançado, restrição de portas e monitoramento 24/7.</li>
                  <li>Os dados do formulário de contato são transmitidos diretamente para nossa infraestrutura segura de e-mail e não são compartilhados, alugados ou comercializados com nenhum terceiro para fins de marketing.</li>
                  <li>Os dados são retidos apenas pelo período estritamente necessário para responder ao contato ou durante a vigência do relacionamento comercial, sendo eliminados de forma segura após o encerramento da finalidade.</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2><Cookie size={20} /> 5. Cookies e Armazenamento Local</h2>
                <p>
                  Nosso website adota uma postura minimalista e ética em relação ao uso de cookies:
                </p>
                <ul>
                  <li><strong>Cookies Essenciais:</strong> Necessários para funcionamento do sistema, segurança de tráfego e rate limiting.</li>
                  <li><strong>Armazenamento Local (localStorage):</strong> Utilizado exclusivamente para memorizar a sua escolha de idioma (<code>lang</code>) e o seu status de consentimento de cookies (<code>brunodev_cookie_consent</code>), sem rastreamento de comportamento cruzado entre sites.</li>
                  <li><strong>Sem rastreadores invasivos de terceiros:</strong> Não vendemos dados a corretores de dados (data brokers) nem usamos redes intrusivas de publicidade comportamental.</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2><UserCheck size={20} /> 6. Direitos do Titular de Dados</h2>
                <p>
                  Você possui plenos direitos previstos pelo Artigo 18 da LGPD e Artigos 15 a 22 do GDPR, incluindo:
                </p>
                <ul>
                  <li>Confirmar a existência de tratamento e solicitar acesso aos seus dados;</li>
                  <li>Solicitar a correção de dados incompletos, inexatos ou desatualizados;</li>
                  <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários;</li>
                  <li>Solicitar a portabilidade dos seus dados para outro prestador de serviços;</li>
                  <li>Revogar o seu consentimento a qualquer momento de forma simples e gratuita.</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2><HelpCircle size={20} /> 7. Contato e Encarregado (DPO)</h2>
                <p>
                  Para exercer qualquer um dos seus direitos ou esclarecer qualquer dúvida sobre o tratamento de dados pessoais, entre em contato direto pelo e-mail:
                </p>
                <p>
                  <strong>E-mail:</strong> <a href="mailto:contact@brunodev.eu" style={{ color: "var(--c1)", textDecoration: "underline" }}>contact@brunodev.eu</a><br />
                  <strong>Prazo médio de resposta:</strong> Até 24 horas úteis.
                </p>
              </section>
            </div>
          </article>
        )}

        {activeLang === "en" && (
          <article>
            <div className="legal-badge">
              <Shield size={14} /> GDPR (EU), LGPD (Brazil) & CCPA Compliant
            </div>
            <h1>Privacy & Data Protection Policy</h1>
            <div className="legal-meta">
              <span><strong>Controller:</strong> BrunoDEV</span>
              <span>•</span>
              <span><strong>Last Updated:</strong> October 2026</span>
              <span>•</span>
              <span><strong>Contact:</strong> contact@brunodev.eu</span>
            </div>

            <div className="legal-card">
              <section className="legal-section">
                <h2><Shield size={20} /> 1. Overview & Commitment</h2>
                <p>
                  Confidentiality and data protection are core principles at <strong>BrunoDEV</strong>. This Privacy Policy outlines how we collect, process, store, and safeguard personal data when you visit our website or submit inquiries regarding our Cybersecurity, DevOps, Cloud Architecture, Artificial Intelligence, and Software Engineering services.
                </p>
                <p>
                  We operate in strict accordance with the General Data Protection Regulation (<strong>GDPR</strong> - Regulation EU 2016/679), Brazil's General Data Protection Law (<strong>LGPD</strong> - Law 13,709/2018), and internationally recognized cyber defense standards (ISO 27001 & CIS Controls).
                </p>
              </section>

              <section className="legal-section">
                <h2><FileText size={20} /> 2. Personal Data Collected</h2>
                <p>We process only the minimum information necessary to fulfill your request:</p>
                <ul>
                  <li><strong>Information voluntarily provided via the contact form:</strong> Full name, professional or personal email address, company name (optional), estimated budget bracket, and project description.</li>
                  <li><strong>Technical and security metadata:</strong> IP addresses (anonymized and filtered to mitigate DDoS/brute-force attacks), request timestamps, browser headers, and approximate country geolocation for automatic language adaptation.</li>
                  <li><strong>No sensitive personal data:</strong> We do not collect or request special categories of data (e.g., racial/ethnic origin, political or philosophical opinions, health or biometric information).</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2><Lock size={20} /> 3. Legal Bases and Purposes of Processing</h2>
                <p>Processing is carried out strictly under valid legal frameworks:</p>
                <ul>
                  <li><strong>Performance of Pre-contractual Steps (GDPR Art. 6(1)(b) / LGPD Art. 7(V)):</strong> To respond to inquiries, evaluate project requirements, and prepare formal consulting proposals requested by you.</li>
                  <li><strong>Legitimate Interests & Cyber Defense (GDPR Art. 6(1)(f) / LGPD Art. 7(IX)):</strong> Maintaining server integrity, protecting against automated bot attacks, denial-of-service attempts, and infrastructure abuse.</li>
                  <li><strong>Compliance with Legal Obligations:</strong> When mandated by applicable statutory or tax regulations.</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2><Server size={20} /> 4. Security & Data Retention</h2>
                <p>
                  We employ enterprise-grade cybersecurity controls to protect your data from unauthorized access or destruction:
                </p>
                <ul>
                  <li>End-to-end transport layer encryption via <strong>TLS 1.3 / HTTPS</strong> on all network communications.</li>
                  <li>Zero Trust server architecture, restrictive firewall policies, and active rate limiting.</li>
                  <li>We never sell, rent, or trade your personal information with third-party brokers or advertisers.</li>
                  <li>Data is retained only as long as necessary to handle your inquiry or maintain our contractual relationship, after which it is permanently purged.</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2><Cookie size={20} /> 5. Cookies & Local Storage</h2>
                <p>
                  Our site is intentionally free of invasive behavioral trackers:
                </p>
                <ul>
                  <li><strong>Essential Cookies:</strong> Required solely for network routing, security verification, and rate limiting.</li>
                  <li><strong>Browser Local Storage:</strong> Used strictly to remember your language selection (<code>lang</code>) and your cookie banner preference (<code>brunodev_cookie_consent</code>).</li>
                  <li><strong>No Third-Party Ad Trackers:</strong> We do not deploy third-party advertising pixels or behavioral profiling tools.</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2><UserCheck size={20} /> 6. Your Rights</h2>
                <p>
                  Under GDPR Articles 15–22 and LGPD Article 18, you maintain full control over your personal data:
                </p>
                <ul>
                  <li>The right to access and obtain a copy of your stored personal data;</li>
                  <li>The right to rectify inaccurate, out-of-date, or incomplete data;</li>
                  <li>The right to request data erasure ("Right to be Forgotten");</li>
                  <li>The right to restrict or object to certain processing activities;</li>
                  <li>The right to data portability and immediate consent revocation.</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2><HelpCircle size={20} /> 7. Data Protection Officer & Inquiries</h2>
                <p>
                  To exercise any of your data protection rights, reach out directly to our dedicated contact point:
                </p>
                <p>
                  <strong>Email:</strong> <a href="mailto:contact@brunodev.eu" style={{ color: "var(--c1)", textDecoration: "underline" }}>contact@brunodev.eu</a><br />
                  <strong>Expected turnaround:</strong> Within 1 business day.
                </p>
              </section>
            </div>
          </article>
        )}

        {activeLang === "es" && (
          <article>
            <div className="legal-badge">
              <Shield size={14} /> Cumplimiento con RGPD (UE), LGPD y Normativas Internacionales
            </div>
            <h1>Política de Privacidad y Protección de Datos</h1>
            <div className="legal-meta">
              <span><strong>Responsable:</strong> BrunoDEV</span>
              <span>•</span>
              <span><strong>Última actualización:</strong> Octubre de 2026</span>
              <span>•</span>
              <span><strong>Contacto:</strong> contact@brunodev.eu</span>
            </div>

            <div className="legal-card">
              <section className="legal-section">
                <h2><Shield size={20} /> 1. Introducción y Compromiso</h2>
                <p>
                  La confidencialidad y la protección de datos constituyen pilares esenciales de <strong>BrunoDEV</strong>. Esta Política de Privacidad explica de forma transparente cómo recopilamos, tratamos, protegemos y almacenamos sus datos personales al interactuar con nuestro sitio web o al solicitar servicios de consultoría técnica en Ciberseguridad, DevOps, Arquitectura Cloud, Inteligencia Artificial o Desarrollo de Software.
                </p>
                <p>
                  Cumplimos rigurosamente con el Reglamento General de Protección de Datos de la Unión Europea (<strong>RGPD</strong> - Reglamento UE 2016/679) y con los más altos estándares internacionales de ciberseguridad.
                </p>
              </section>

              <section className="legal-section">
                <h2><FileText size={20} /> 2. Datos Personales Recopilados</h2>
                <p>Tratamos exclusivamente los datos mínimos necesarios para atender sus solicitudes:</p>
                <ul>
                  <li><strong>Datos proporcionados mediante el formulario:</strong> Nombre, dirección de correo electrónico profesional o personal, empresa (opcional), rango presupuestario estimado y descripción del proyecto.</li>
                  <li><strong>Datos técnicos y de seguridad:</strong> Dirección IP (con anonimización y filtros de mitigación frente a ataques DoS/fuerza bruta), registros de marcas de tiempo y geolocalización aproximada para adaptar el idioma de la plataforma.</li>
                  <li><strong>Sin datos sensibles:</strong> No recopilamos categorías especiales de datos personales (opiniones políticas, salud, datos biométricos, etc.).</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2><Lock size={20} /> 3. Bases Legales y Fines del Tratamiento</h2>
                <p>El tratamiento se fundamenta en las siguientes bases legales:</p>
                <ul>
                  <li><strong>Ejecución de medidas precontractuales (Art. 6(1)(b) del RGPD):</strong> Gestionar sus consultas, coordinar llamadas de consultoría y elaborar propuestas comerciales personalizadas.</li>
                  <li><strong>Interés Legítimo y Seguridad (Art. 6(1)(f) del RGPD):</strong> Preservar la integridad de los servidores, prevenir ciberataques, fraudes y abusos en la infraestructura.</li>
                  <li><strong>Cumplimiento de Obligaciones Legales:</strong> Cuando sea requerido por normativas fiscales o judiciales pertinentes.</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2><Server size={20} /> 4. Seguridad y Conservación de Datos</h2>
                <p>
                  Implementamos salvaguardas técnicas avanzadas para garantizar la máxima seguridad:
                </p>
                <ul>
                  <li>Cifrado integral de extremo a extremo mediante <strong>TLS 1.3 / HTTPS</strong>.</li>
                  <li>Arquitectura de servidores bajo principios de <em>Zero Trust</em> y cortafuegos perimetrales.</li>
                  <li>Nunca comercializamos, cedemos ni alquilamos sus datos personales con intermediarios de publicidad.</li>
                  <li>Los datos se conservan únicamente durante el tiempo imprescindible para gestionar la consulta o la relación contractual.</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2><Cookie size={20} /> 5. Política de Cookies y Almacenamiento Local</h2>
                <p>
                  Adoptamos un enfoque ético sin herramientas invasivas de rastreo:
                </p>
                <ul>
                  <li><strong>Cookies Técnicas:</strong> Requeridas para la seguridad del tráfico y el balanceo de carga.</li>
                  <li><strong>Almacenamiento Local (localStorage):</strong> Utilizado únicamente para memorizar el idioma preferido (<code>lang</code>) y su elección sobre el banner de cookies (<code>brunodev_cookie_consent</code>).</li>
                  <li><strong>Cero rastreadores de terceros:</strong> No empleamos píxeles de remarketing publicitario ni perfiles cruzados.</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2><UserCheck size={20} /> 6. Derechos del Usuario</h2>
                <p>
                  Conforme al RGPD, usted dispone de los siguientes derechos inalienables:
                </p>
                <ul>
                  <li>Acceder a sus datos personales almacenados;</li>
                  <li>Rectificar cualquier dato inexacto o incompleto;</li>
                  <li>Solicitar la supresión de sus datos personales ("Derecho al olvido");</li>
                  <li>Solicitar la limitación u oponerse al tratamiento;</li>
                  <li>Portabilidad de los datos y retirada del consentimiento en cualquier momento.</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2><HelpCircle size={20} /> 7. Contacto</h2>
                <p>
                  Para ejercer sus derechos de privacidad, comuníquese directamente a:
                </p>
                <p>
                  <strong>Correo:</strong> <a href="mailto:contact@brunodev.eu" style={{ color: "var(--c1)", textDecoration: "underline" }}>contact@brunodev.eu</a><br />
                  <strong>Plazo de respuesta:</strong> Menos de 24 horas laborables.
                </p>
              </section>
            </div>
          </article>
        )}
      </main>
    </div>
  );
}
