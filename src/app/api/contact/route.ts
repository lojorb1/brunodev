import nodemailer from "nodemailer";
import { SITE } from "@/lib/site";

export const runtime = "nodejs";

type Payload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  budget?: unknown;
  topic?: unknown;
  message?: unknown;
  lang?: unknown;
  website?: unknown; // honeypot
};

// Simple in-memory rate limit (per server instance)
const hits = new Map<string, number[]>();
const WINDOW = 10 * 60 * 1000;
const MAX = 5;

function limited(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  list.push(now);
  hits.set(ip, list);

  // Periodic pruning if map gets large
  if (hits.size > 2000) {
    for (const [k, v] of hits.entries()) {
      if (!v.some((t) => now - t < WINDOW)) hits.delete(k);
    }
  }

  return list.length > MAX;
}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const cleanHeader = (s: string) => s.replace(/[\r\n]/g, " ").trim();
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Bots fill the hidden field — pretend success
  if (str(body.website, 200)) return Response.json({ ok: true });

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (limited(ip)) return Response.json({ ok: false, error: "rate_limited" }, { status: 429 });

  const data = {
    name: str(body.name, 120),
    email: str(body.email, 200),
    company: str(body.company, 160),
    budget: str(body.budget, 80),
    topic: str(body.topic, 80),
    message: str(body.message, 5000),
    lang: str(body.lang, 5),
  };

  if (!data.name || !EMAIL_RE.test(data.email) || data.message.length < 5) {
    return Response.json({ ok: false, error: "validation" }, { status: 422 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, CONTACT_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error("[contact] SMTP not configured – set SMTP_HOST, SMTP_USER, SMTP_PASS in .env.local");
    return Response.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  const port = Number(SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const when = new Date().toLocaleString("pt-BR", { timeZone: "Europe/Lisbon" });
  const rows: [string, string][] = [
    ["Nome", data.name],
    ["E-mail", data.email],
    ["Empresa", data.company || "—"],
    ["Orçamento", data.budget || "—"],
    ["Assunto", data.topic || "—"],
    ["Idioma do site", data.lang || "—"],
    ["IP", ip],
    ["Data", when],
  ];

  const text =
    rows.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\nMensagem:\n${data.message}`;

  const html = `
  <div style="font-family:Segoe UI,Arial,sans-serif;background:#05060f;padding:32px;color:#e8ecff">
    <div style="max-width:620px;margin:0 auto;background:#0d1024;border:1px solid #1f2547;border-radius:16px;overflow:hidden">
      <div style="padding:22px 28px;background:linear-gradient(135deg,#00e5ff,#7c4dff);color:#05060f">
        <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:700">Novo contato · brunodev.eu</div>
        <div style="font-size:22px;font-weight:800;margin-top:4px">${esc(data.topic || "Contato")} — ${esc(data.name)}</div>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:10px 28px;color:#8a93b8;width:150px;border-bottom:1px solid #1a1f3d">${k}</td><td style="padding:10px 28px;border-bottom:1px solid #1a1f3d;color:#e8ecff">${esc(v)}</td></tr>`
          )
          .join("")}
      </table>
      <div style="padding:24px 28px">
        <div style="color:#00e5ff;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:700;margin-bottom:10px">Mensagem</div>
        <div style="white-space:pre-wrap;line-height:1.6;color:#e8ecff">${esc(data.message)}</div>
      </div>
      <div style="padding:16px 28px;background:#080a18;color:#8a93b8;font-size:12px">Responda diretamente este e-mail para falar com ${esc(data.name)}.</div>
    </div>
  </div>`;

  try {
    const cleanName = cleanHeader(data.name).replace(/"/g, "");
    const cleanTopic = cleanHeader(data.topic) || "Contato";
    await transporter.sendMail({
      from: SMTP_FROM || `"BrunoDEV Website" <${SMTP_USER}>`,
      to: CONTACT_TO || SITE.email,
      replyTo: `"${cleanName}" <${cleanHeader(data.email)}>`,
      subject: `[brunodev.eu] ${cleanTopic} — ${cleanName}`,
      text,
      html,
    });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("[contact] send failed", err);
    return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
}
