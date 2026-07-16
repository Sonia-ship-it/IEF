"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import en from "./locales/en.json";
import fr from "./locales/fr.json";
import rw from "./locales/rw.json";

export type Language = "en" | "fr" | "rw";

const dictionaries: Record<Language, any> = { en, fr, rw };

type TranslationParams = Record<string, string | number>;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string, params?: TranslationParams) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("rw"); // Default is rw
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedLang = localStorage.getItem("ief_lang") as Language;
    if (savedLang && ["en", "fr", "rw"].includes(savedLang)) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (isClient) {
      localStorage.setItem("ief_lang", lang);
    }
  };

  const t = (path: string, fallbackString?: string, params?: TranslationParams): string => {
    const keys = path.split(".");
    let current = dictionaries[language];
    
    for (const key of keys) {
      if (current[key] === undefined) {
        // Fallback to English if key missing
        let fallback = dictionaries["en"];
        for (const k of keys) {
          if (fallback[k] === undefined) return applyParams(fallbackString || path, params);
          fallback = fallback[k];
        }
        return applyParams(fallback as unknown as string, params);
      }
      current = current[key];
    }
    return applyParams(current as unknown as string, params);
  };

  useEffect(() => {
    if (isClient) {
      document.documentElement.lang = language;
    }
  }, [language, isClient]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

function applyParams(text: string, params?: TranslationParams): string {
  if (!params) return text;
  return Object.entries(params).reduce(
    (result, [key, value]) =>
      result.replaceAll(`%${key}%`, String(value)),
    text
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
