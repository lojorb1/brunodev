"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { dictionaries, langFromBrowser, langFromCountry, type Dict, type Lang } from "@/lib/i18n";

type Ctx = { lang: Lang; t: Dict; setLang: (l: Lang) => void };
const LangContext = createContext<Ctx>({ lang: "en", t: dictionaries.en, setLang: () => {} });

export const useLang = () => useContext(LangContext);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  const apply = useCallback((l: Lang) => {
    setLangState(l);
    document.documentElement.lang = l;
    document.title = dictionaries[l].meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", dictionaries[l].meta.description);
  }, []);

  const setLang = useCallback(
    (l: Lang) => {
      apply(l);
      try { localStorage.setItem("lang", l); } catch {}
    },
    [apply]
  );

  useEffect(() => {
    let cancelled = false;
    const q = new URLSearchParams(location.search).get("lang") as Lang | null;
    let saved: string | null = null;
    try { saved = localStorage.getItem("lang"); } catch {}

    if (q && q in dictionaries) return apply(q);
    if (saved && saved in dictionaries) return apply(saved as Lang);

    apply(langFromBrowser());
    const ctl = new AbortController();
    const to = setTimeout(() => ctl.abort(), 2500);
    fetch("https://ipapi.co/json/", { signal: ctl.signal })
      .then((r) => r.json())
      .then((j) => { if (!cancelled && j?.country_code) apply(langFromCountry(j.country_code)); })
      .catch(() => {})
      .finally(() => clearTimeout(to));
    return () => { cancelled = true; };
  }, [apply]);

  return <LangContext.Provider value={{ lang, t: dictionaries[lang], setLang }}>{children}</LangContext.Provider>;
}
