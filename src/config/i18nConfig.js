import { BR, US } from "country-flag-icons/react/3x2";

// Configuração central da tradução: idiomas disponíveis, idioma padrão
// e a chave onde a escolha fica salva no navegador.
const I18N_CONFIG = {
  LANGUAGES: [
    { code: "pt-BR", name: "Português", short: "PT", flag: BR },
    { code: "en", name: "English", short: "EN", flag: US },
  ],
  FALLBACK: "pt-BR",
  STORAGE_KEY: "portfolio-language",
};

export default I18N_CONFIG;
