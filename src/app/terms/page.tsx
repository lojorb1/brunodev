"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, FileCheck, Shield, Scale, Code2, Lock, AlertCircle, HelpCircle } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { type Lang } from "@/lib/i18n";

export default function TermsPage() {
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
              <FileCheck size={14} /> Termos Contratuais & Prestação de Serviços
            </div>
            <h1>Termos de Uso e Condições Gerais</h1>
            <div className="legal-meta">
              <span><strong>Prestador:</strong> BrunoDEV</span>
              <span>•</span>
              <span><strong>Última atualização:</strong> Outubro de 2026</span>
              <span>•</span>
              <span><strong>Contato:</strong> contact@brunodev.eu</span>
            </div>

            <div className="legal-card">
              <section className="legal-section">
                <h2><Scale size={20} /> 1. Aceitação dos Termos</h2>
                <p>
                  O acesso, navegação e utilização deste website, bem como a contratação de quaisquer serviços de consultoria técnica oferecidos por <strong>BrunoDEV</strong>, implicam na concordância integral e irrevogável com os presentes Termos de Uso. Caso não concorde com qualquer uma das disposições aqui estabelecidas, solicitamos que não utilize nossos canais ou serviços.
                </p>
              </section>

              <section className="legal-section">
                <h2><Code2 size={20} /> 2. Escopo dos Serviços de Consultoria</h2>
                <p>
                  <strong>BrunoDEV</strong> atua na prestação de serviços de engenharia e consultoria especializada de alto padrão, englobando:
                </p>
                <ul>
                  <li><strong>Cibersegurança Ofensiva e Defensiva:</strong> Auditorias de segurança, hardening de servidores e infraestrutura Linux, modelagem de ameaças e estratégias Zero Trust.</li>
                  <li><strong>DevOps & Engenharia Cloud:</strong> Automação de pipelines CI/CD, conteinerização (Docker/Kubernetes), infraestrutura como código (Terraform) e arquiteturas de alta disponibilidade.</li>
                  <li><strong>Inteligência Artificial Prática:</strong> Implementação e integração de LLMs, automação de fluxos corporativos e engenharia de contexto para ganhos de produtividade.</li>
                  <li><strong>Desenvolvimento de Software:</strong> Arquitetura de aplicações web modernas, APIs resilientes e sistemas escaláveis.</li>
                  <li><strong>SEO Técnico Avançado:</strong> Otimização de Core Web Vitals, arquitetura da informação e indexação para mercados globais.</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2><FileCheck size={20} /> 3. Propostas Comerciais e Formalização</h2>
                <p>
                  As informações exibidas neste website possuem caráter estritamente informativo e não configuram proposta comercial vinculativa imediata. Os serviços contratados serão formalizados por meio de instrumentos contratuais específicos, incluindo propostas comerciais detalhadas, Acordos de Nível de Serviço (SLA) e Especificação de Escopo (Statement of Work - SOW), definindo cronogramas, entregáveis, remuneração e responsabilidades de ambas as partes.
                </p>
              </section>

              <section className="legal-section">
                <h2><Lock size={20} /> 4. Confidencialidade e Sigilo</h2>
                <p>
                  Todas as informações estratégicas, comerciais, credenciais de acesso e dados técnicos trocados entre o cliente e <strong>BrunoDEV</strong> durante negociações preliminares ou no decorrer da execução dos serviços são tratadas com sigilo absoluto. Mediante solicitação de qualquer uma das partes, celebramos Acordo de Não Divulgação (NDA - Non-Disclosure Agreement) formal prévio ao compartilhamento de dados sensíveis.
                </p>
              </section>

              <section className="legal-section">
                <h2><Shield size={20} /> 5. Propriedade Intelectual</h2>
                <p>
                  Salvo disposição em contrário expressa em contrato individual:
                </p>
                <ul>
                  <li><strong>Entregáveis do Cliente:</strong> O código-fonte, configurações e relatórios desenvolvidos de forma personalizada para o cliente passarão à titularidade integral do cliente mediante quitação dos honorários contratados.</li>
                  <li><strong>Ativos do Website:</strong> A marca BrunoDEV, design visual, identidade gráfica, textos e código-fonte deste website são de propriedade exclusiva de BrunoDEV, sendo vedada a reprodução total ou parcial sem autorização prévia por escrito.</li>
                  <li><strong>Componentes Open Source:</strong> Frameworks e bibliotecas de terceiros permanecem regidos por suas respectivas licenças de código aberto (MIT, Apache 2.0, etc.).</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2><AlertCircle size={20} /> 6. Limitação de Responsabilidade</h2>
                <p>
                  Os serviços de consultoria e hardening são executados de acordo com o estado da arte e as melhores práticas consolidadas da indústria (OWASP, CIS Benchmarks, NIST). Reconhece-se, contudo, que no ecossistema de tecnologia da informação não existe imunidade absoluta contra novos vetores de ataque cibernético (zero-days), falhas em sistemas operacionais subjacentes ou ações imprudentes de usuários autorizados do cliente.
                </p>
                <p>
                  Em nenhuma hipótese BrunoDEV será responsável por lucros cessantes, perdas indiretas ou danos decorrentes de causas fora do seu controle direto ou decorrentes de implementações alteradas unilateralmente pelo cliente.
                </p>
              </section>

              <section className="legal-section">
                <h2><HelpCircle size={20} /> 7. Legislação Aplicável e Contato</h2>
                <p>
                  Estes Termos são regidos pelas leis vigentes aplicáveis a serviços internacionais de tecnologia. Para quaisquer esclarecimentos sobre estes termos ou para formalizar contratações:
                </p>
                <p>
                  <strong>E-mail:</strong> <a href="mailto:contact@brunodev.eu" style={{ color: "var(--c1)", textDecoration: "underline" }}>contact@brunodev.eu</a>
                </p>
              </section>
            </div>
          </article>
        )}

        {activeLang === "en" && (
          <article>
            <div className="legal-badge">
              <FileCheck size={14} /> Service Terms & Professional Agreement
            </div>
            <h1>Terms of Service & General Conditions</h1>
            <div className="legal-meta">
              <span><strong>Provider:</strong> BrunoDEV</span>
              <span>•</span>
              <span><strong>Last Updated:</strong> October 2026</span>
              <span>•</span>
              <span><strong>Contact:</strong> contact@brunodev.eu</span>
            </div>

            <div className="legal-card">
              <section className="legal-section">
                <h2><Scale size={20} /> 1. Acceptance of Terms</h2>
                <p>
                  By accessing, browsing, or utilizing this website, or by engaging any technical consulting services provided by <strong>BrunoDEV</strong>, you acknowledge and agree to be bound by these Terms of Service. If you disagree with any part of these terms, please refrain from using our website or services.
                </p>
              </section>

              <section className="legal-section">
                <h2><Code2 size={20} /> 2. Scope of Services</h2>
                <p>
                  <strong>BrunoDEV</strong> provides high-tier international technology consulting and engineering services, including:
                </p>
                <ul>
                  <li><strong>Cybersecurity:</strong> Security audits, Linux server hardening, vulnerability remediation, threat modeling, and Zero Trust engineering.</li>
                  <li><strong>DevOps & Cloud Engineering:</strong> CI/CD automation, container orchestration (Docker/Kubernetes), Infrastructure as Code (Terraform), and high-availability cloud setups.</li>
                  <li><strong>Practical AI Integration:</strong> Production-grade LLM implementation, intelligent automation workflows, and RAG architectures.</li>
                  <li><strong>Custom Software Engineering:</strong> Resilient full-stack web architectures, mission-critical microservices, and secure APIs.</li>
                  <li><strong>Technical SEO:</strong> Performance tuning, Core Web Vitals optimization, and multi-region search visibility.</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2><FileCheck size={20} /> 3. Commercial Proposals & Contracts</h2>
                <p>
                  Information on this website serves an informational purpose and does not constitute a unilateral binding contract. Client engagements are formalized through dedicated contractual agreements, including detailed Statements of Work (SOW), project milestones, SLAs, and formal payment schedules.
                </p>
              </section>

              <section className="legal-section">
                <h2><Lock size={20} /> 4. Mutual Confidentiality</h2>
                <p>
                  All proprietary information, infrastructure credentials, source code, and strategic plans exchanged between the client and <strong>BrunoDEV</strong> are held in strict confidence. A mutual Non-Disclosure Agreement (NDA) may be executed prior to the disclosure of sensitive systems or proprietary data upon request.
                </p>
              </section>

              <section className="legal-section">
                <h2><Shield size={20} /> 5. Intellectual Property</h2>
                <p>
                  Unless specifically agreed otherwise in writing:
                </p>
                <ul>
                  <li><strong>Client Work Product:</strong> Custom code, configuration scripts, and architectures developed specifically for the client transfer to client ownership upon full payment of agreed fees.</li>
                  <li><strong>Website Assets:</strong> The BrunoDEV brand, domain, logo, copy, and layout remain the exclusive intellectual property of BrunoDEV.</li>
                  <li><strong>Open Source Components:</strong> Standard third-party libraries and frameworks retain their applicable open-source licenses (MIT, Apache 2.0, etc.).</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2><AlertCircle size={20} /> 6. Limitation of Liability</h2>
                <p>
                  Consulting services and security configurations are implemented strictly following industry gold standards (OWASP, CIS Benchmarks, NIST). However, because cybersecurity is an evolving domain, no security architecture can guarantee perpetual immunity against novel zero-day exploits or unauthorized changes made by third parties.
                </p>
                <p>
                  To the maximum extent permitted by applicable law, BrunoDEV shall not be liable for indirect, incidental, or consequential damages resulting from events beyond reasonable technical control.
                </p>
              </section>

              <section className="legal-section">
                <h2><HelpCircle size={20} /> 7. Governing Law & Contact</h2>
                <p>
                  These terms are governed by applicable laws for international IT consulting services. For inquiries regarding these terms or project bookings:
                </p>
                <p>
                  <strong>Email:</strong> <a href="mailto:contact@brunodev.eu" style={{ color: "var(--c1)", textDecoration: "underline" }}>contact@brunodev.eu</a>
                </p>
              </section>
            </div>
          </article>
        )}

        {activeLang === "es" && (
          <article>
            <div className="legal-badge">
              <FileCheck size={14} /> Términos del Servicio y Acuerdo Profesional
            </div>
            <h1>Términos de Servicio y Condiciones Generales</h1>
            <div className="legal-meta">
              <span><strong>Proveedor:</strong> BrunoDEV</span>
              <span>•</span>
              <span><strong>Última actualización:</strong> Octubre de 2026</span>
              <span>•</span>
              <span><strong>Contacto:</strong> contact@brunodev.eu</span>
            </div>

            <div className="legal-card">
              <section className="legal-section">
                <h2><Scale size={20} /> 1. Aceptación de los Términos</h2>
                <p>
                  El acceso, navegación y uso de este sitio web, así como la contratación de cualquier servicio de consultoría técnica ofrecido por <strong>BrunoDEV</strong>, implican la aceptación plena e incondicional de los presentes Términos de Servicio.
                </p>
              </section>

              <section className="legal-section">
                <h2><Code2 size={20} /> 2. Alcance de los Servicios</h2>
                <p>
                  <strong>BrunoDEV</strong> ofrece servicios de ingeniería y consultoría de alto nivel, incluyendo:
                </p>
                <ul>
                  <li><strong>Ciberseguridad:</strong> Auditorías de seguridad, hardening de servidores Linux, mitigación de vulnerabilidades y arquitectura Zero Trust.</li>
                  <li><strong>DevOps e Infraestructura Cloud:</strong> Automatización CI/CD, contenedores (Docker/Kubernetes), Terraform y entornos cloud de alta disponibilidad.</li>
                  <li><strong>Consultoría en Inteligencia Artificial:</strong> Integración práctica de modelos LLM, automatización de procesos corporativos y flujos de trabajo inteligentes.</li>
                  <li><strong>Desarrollo de Software:</strong> Aplicaciones web modernas, APIs escalables y sistemas críticos.</li>
                  <li><strong>SEO Técnico:</strong> Optimización de Core Web Vitals, arquitectura y presencia en mercados internacionales.</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2><FileCheck size={20} /> 3. Propuestas y Formalización Contractual</h2>
                <p>
                  La información contenida en este sitio web es meramente informativa. Los proyectos se formalizan mediante contratos específicos, propuestas detalladas y acuerdos de alcance (SOW) que estipulan plazos, entregables y honorarios.
                </p>
              </section>

              <section className="legal-section">
                <h2><Lock size={20} /> 4. Confidencialidad Mutua</h2>
                <p>
                  Toda la información técnica y estratégica compartida entre el cliente y <strong>BrunoDEV</strong> se gestiona bajo el más estricto secreto profesional. Se puede suscribir un Acuerdo de Confidencialidad (NDA) antes de intercambiar datos sensibles.
                </p>
              </section>

              <section className="legal-section">
                <h2><Shield size={20} /> 5. Propiedad Intelectual</h2>
                <p>
                  Salvo estipulación expresa en contrario:
                </p>
                <ul>
                  <li><strong>Entregables del Cliente:</strong> Las soluciones y desarrollos personalizados pasan a ser propiedad del cliente tras la liquidación de los honorarios acordados.</li>
                  <li><strong>Activos del Sitio Web:</strong> La marca, los textos y el diseño de este sitio web pertenecen exclusivamente a BrunoDEV.</li>
                  <li><strong>Código Abierto:</strong> Las herramientas de código abierto utilizadas respetan sus respectivas licencias públicas.</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2><AlertCircle size={20} /> 6. Limitación de Responsabilidad</h2>
                <p>
                  Los servicios se ejecutan conforme a las mejores prácticas de la industria (OWASP, CIS Benchmarks). No obstante, ningún entorno tecnológico puede garantizar inmunidad absoluta frente a nuevos vectores de ciberataque de día cero o manipulaciones de terceros.
                </p>
              </section>

              <section className="legal-section">
                <h2><HelpCircle size={20} /> 7. Contacto</h2>
                <p>
                  Para consultas legales o contratación de servicios:
                </p>
                <p>
                  <strong>Correo:</strong> <a href="mailto:contact@brunodev.eu" style={{ color: "var(--c1)", textDecoration: "underline" }}>contact@brunodev.eu</a>
                </p>
              </section>
            </div>
          </article>
        )}
      </main>
    </div>
  );
}
