const WAKATIME_CONFIG = {
  // Gráfico de linguagens (JSON) criado em wakatime.com/share/embed
  SHARE_URL:
    "https://wakatime.com/share/@c9204a3e-1f2b-4c8c-9032-0d921b67c216/bf2e761d-0878-4b3e-8a5c-61615f7b0ed0.json",

  // Seu perfil público
  PROFILE_URL: "https://wakatime.com/@c9204a3e-1f2b-4c8c-9032-0d921b67c216",

  // Selo oficial com o total de horas. O componente tenta ler o texto dele;
  // se o navegador bloquear, usa FALLBACK_TOTAL_SECONDS.
  BADGE_URL:
    "https://wakatime.com/badge/user/c9204a3e-1f2b-4c8c-9032-0d921b67c216.svg",

  // Data em que você entrou no WakaTime (AAAA-MM-DD)
  JOINED_DATE: "2026-08-10",

  // Caso o tempo que  o BADGE_URL  de algum problema,ele irá ler esse
  // Atualize de vez em quando: segundos = horas * 3600 + minutos * 60
  FALLBACK_TOTAL_SECONDS: 74460,

  // Quantas linguagens mostrar (o resto vira "+ N linguagens")
  MAX_ITEMS: 8,

  // Linguagens que não devem aparecer, ex.: ["Other", "Text"]
  HIDDEN_LANGUAGES: [],
};

export default WAKATIME_CONFIG;
