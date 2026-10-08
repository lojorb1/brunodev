import type { Metadata, Viewport } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import { LanguageProvider } from "@/components/LanguageProvider";
import CookieConsent from "@/components/CookieConsent";
import { dictionaries } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import "./globals.css";

const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"], weight: ["300", "400", "500", "700", "800"] });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"], weight: ["400", "600"] });

const en = dictionaries.en.meta;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: en.title, template: "%s | BrunoDEV" },
  description: en.description,
  keywords: ["cybersecurity consulting", "devops", "server security", "data security", "AI consulting", "SEO expert", "software developer", "BrunoDEV", "ciberseguridad", "cibersegurança"],
  authors: [{ name: "BrunoDEV", url: SITE.url }],
  alternates: {
    canonical: "/",
    languages: { en: "/?lang=en", es: "/?lang=es", pt: "/?lang=pt", "x-default": "/" },
  },
  openGraph: {
    type: "website", url: SITE.url, siteName: "BrunoDEV", title: en.title, description: en.description,
    locale: "en_US", alternateLocale: ["es_ES", "pt_BR"],
  },
  twitter: { card: "summary_large_image", title: en.title, description: en.description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
};

export const viewport: Viewport = { themeColor: "#05060f" };

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", name: "BrunoDEV", url: SITE.url, inLanguage: ["en", "es", "pt"] },
    {
      "@type": "ProfessionalService", name: "BrunoDEV", url: SITE.url, email: SITE.email,
      description: "Cybersecurity, DevOps, AI and SEO consulting.",
      areaServed: "Worldwide",
      knowsAbout: ["Cybersecurity", "DevOps", "Server security", "Data security", "Artificial Intelligence", "SEO"],
      founder: { "@type": "Person", name: "Bruno", jobTitle: "Software Developer & Security Consultant" },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${outfit.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var clean = function() {
                    var els = document.querySelectorAll('[bis_skin_checked]');
                    for (var i = 0; i < els.length; i++) els[i].removeAttribute('bis_skin_checked');
                  };
                  clean();
                  if (typeof MutationObserver !== 'undefined') {
                    var obs = new MutationObserver(function(mutations) {
                      for (var i = 0; i < mutations.length; i++) {
                        var m = mutations[i];
                        if (m.type === 'attributes' && m.attributeName === 'bis_skin_checked' && m.target) {
                          m.target.removeAttribute('bis_skin_checked');
                        }
                      }
                    });
                    obs.observe(document.documentElement, {
                      attributes: true,
                      subtree: true,
                      attributeFilter: ['bis_skin_checked']
                    });
                  }
                  window.addEventListener('DOMContentLoaded', clean);
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <LanguageProvider>
          {children}
          <CookieConsent />
        </LanguageProvider>
      </body>
    </html>
  );
}
