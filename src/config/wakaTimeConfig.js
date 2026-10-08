const WAKATIME_CONFIG = {
  USERNAME: "c9204a3e-1f2b-4c8c-9032-0d921b67c216",
  API_PATH: "/api/wakatime",
  RANGE: "all_time", // mesmo período dos cards
  PROFILE_URL: "https://wakatime.com/@c9204a3e-1f2b-4c8c-9032-0d921b67c216",

  // Quantos itens cada estilo mostra (o resto vira "+ N linguagens")
  LIMITS: {
    grade: 12,
    lista: 10,
    terminal: { languages: 8, editors: 4, categories: 5, operatingSystems: 3 },
  },

  // Linguagens que não devem aparecer, ex.: ["Text", "Other"]
  HIDDEN_LANGUAGES: [],
};

export default WAKATIME_CONFIG;
