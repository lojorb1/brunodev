import { ImageResponse } from "next/og";

export const alt = "BrunoDEV – Cybersecurity, DevOps & AI Consulting";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center",
          padding: 80, color: "#e8ecff", fontFamily: "sans-serif",
          background: "radial-gradient(circle at 80% 20%, #3b1d9e 0%, #05060f 55%)",
        }}
      >
        <div style={{ fontSize: 40, color: "#00e5ff", display: "flex" }}>&lt;BrunoDEV/&gt;</div>
        <div style={{ fontSize: 84, fontWeight: 800, marginTop: 24, lineHeight: 1.05, display: "flex" }}>
          Secure. Scalable. Intelligent.
        </div>
        <div style={{ fontSize: 34, color: "#8a93b8", marginTop: 28, display: "flex" }}>
          Cybersecurity · DevOps · AI · SEO — brunodev.eu
        </div>
      </div>
    ),
    size
  );
}
