// Configuração do i18next. Importado UMA vez no main.jsx, antes do <App />.
//   i18next                          → o motor de tradução
//   react-i18next                    → useTranslation() e o re-render ao trocar de idioma
//   i18next-browser-languagedetector → descobre o idioma (escolha salva ou idioma do navegador)

import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import I18N_CONFIG from "../config/i18nConfig";

import en from "./locales/en/translation.json";
import ptBR from "./locales/pt-BR/translation.json";

const resources = {
  "pt-BR": { translation: ptBR },
  en: { translation: en },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs: I18N_CONFIG.LANGUAGES.map((l) => l.code),
    // Idioma não suportado (ex.: "fr") → português. "en-US" vira "en" sozinho.
    fallbackLng: I18N_CONFIG.FALLBACK,

    detection: {
      // 1º a escolha salva; 2º o idioma do navegador
      order: ["localStorage", "navigator"],
      lookupLocalStorage: I18N_CONFIG.STORAGE_KEY,
      caches: ["localStorage"],
    },

    interpolation: {
      // O React já protege contra XSS
      escapeValue: false,
    },
  });

// A cada troca de idioma: atualiza <html lang="..."> e o título da aba
function syncDocument(lng) {
  document.documentElement.lang = i18n.resolvedLanguage ?? lng;
  document.title = i18n.t("meta.title");
}
i18n.on("languageChanged", syncDocument);
syncDocument(i18n.language);

export default i18n;
