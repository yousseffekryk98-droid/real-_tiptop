import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { TR } from "../config/translations";

export const I18nCtx = createContext(null);

export function I18nProvider({ children }) {
  const [lang, setLang] = useState("en");
  const isRTL = lang === "ar";
  const t = useCallback((k) => {
    try {
      return TR[lang]?.[k] ?? TR.en?.[k] ?? k;
    } catch (err) {
      console.warn(`Translation error for key "${k}":`, err);
      return k;
    }
  }, [lang]);
  const changeLanguage = useCallback((l) => {
    if (["en", "ar"].includes(l)) {
      setLang(l);
    }
  }, []);

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [isRTL, lang]);

  return (
    <I18nCtx.Provider value={{ t, lang, isRTL, changeLanguage }}>
      {children}
    </I18nCtx.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(I18nCtx);
  if (!ctx) {
    throw new Error("useTranslation must be used within I18nProvider");
  }
  return ctx;
}
