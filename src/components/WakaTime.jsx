import { useEffect, useState } from "react";
import WAKATIME_CONFIG from "../config/wakaTimeConfig";
import { languageStyle, OTHERS_STYLE } from "../data/wakaTimeLanguages";
import "./WakaTime.css";

function formatDuration(totalSeconds) {
  if (totalSeconds < 60) return "<1min";
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return hours > 0 ? `${hours}h ${minutes}min` : `${minutes}min`;
}

function formatJoinedDate(isoDate) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}

function parseBadgeSeconds(svgText) {
  const hours = svgText.match(/(\d+)\s*hrs?/i);
  const minutes = svgText.match(/(\d+)\s*mins?/i);
  if (!hours && !minutes) return null;
  return (
    (hours ? Number(hours[1]) : 0) * 3600 +
    (minutes ? Number(minutes[1]) : 0) * 60
  );
}

function buildRows(rawItems, totalSeconds) {
  const hidden = WAKATIME_CONFIG.HIDDEN_LANGUAGES;
  const items = rawItems
    .filter((item) => !hidden.includes(item.name) && item.percent > 0)
    .sort((a, b) => b.percent - a.percent);

  const limit = WAKATIME_CONFIG.MAX_ITEMS;
  const top = items.slice(0, limit);
  const rest = items.slice(limit);

  const rows = top.map((item) => ({
    name: item.name,
    percent: item.percent,
    seconds: (item.percent / 100) * totalSeconds,
    style: languageStyle(item.name),
  }));

  if (rest.length > 0) {
    const restPercent = rest.reduce((sum, item) => sum + item.percent, 0);
    rows.push({
      name: `+ ${rest.length} linguagens`,
      percent: restPercent,
      seconds: (restPercent / 100) * totalSeconds,
      style: OTHERS_STYLE,
    });
  }

  return rows;
}

function WakaTime() {
  const [data, setData] = useState({ rows: [], total: 0 });
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const controller = new AbortController();

    const languagesRequest = fetch(WAKATIME_CONFIG.SHARE_URL, {
      signal: controller.signal,
    }).then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    });

    // Se o selo não puder ser lido, seguimos com o valor do config
    const badgeRequest = fetch(WAKATIME_CONFIG.BADGE_URL, {
      signal: controller.signal,
    })
      .then((response) => response.text())
      .then(parseBadgeSeconds)
      .catch(() => null);

    Promise.all([languagesRequest, badgeRequest])
      .then(([json, badgeSeconds]) => {
        const total = badgeSeconds ?? WAKATIME_CONFIG.FALLBACK_TOTAL_SECONDS;
        setData({ rows: buildRows(json.data ?? [], total), total });
        setStatus("ok");
      })
      .catch((error) => {
        if (error.name !== "AbortError") setStatus("error");
      });

    return () => controller.abort();
  }, []);

  return (
    <section className="waka" id="wakatime">
      <header className="waka__header">
        <div>
          <h2 className="waka__title">Linguagens mais usadas</h2>
          <p className="waka__since">
            No WakaTime desde {formatJoinedDate(WAKATIME_CONFIG.JOINED_DATE)}
          </p>
        </div>

        {status === "ok" && (
          <div className="waka__totalbox">
            <span className="waka__total">{formatDuration(data.total)}</span>
            <span className="waka__totallabel">horas totais</span>
          </div>
        )}
      </header>

      {status === "loading" && <p className="waka__msg">Carregando...</p>}
      {status === "error" && (
        <p className="waka__msg">
          Não foi possível carregar os dados do WakaTime agora.
        </p>
      )}

      {status === "ok" && (
        <ul className="waka__list">
          {data.rows.map((row) => {
            const Icon = row.style.icon;
            const [from, to] = row.style.gradient;
            return (
              <li className="waka__row" key={row.name}>
                <span className="waka__icon" style={{ color: row.style.color }}>
                  <Icon />
                </span>
                <span className="waka__name">{row.name}</span>
                <span className="waka__bar">
                  <span
                    className="waka__fill"
                    style={{
                      width: `${Math.max(row.percent, 1)}%`,
                      background: `linear-gradient(90deg, ${from}, ${to})`,
                    }}
                  />
                </span>
                <span className="waka__value">
                  {formatDuration(row.seconds)} · {row.percent.toFixed(1)}%
                </span>
              </li>
            );
          })}
        </ul>
      )}

      <a
        className="waka__link"
        href={WAKATIME_CONFIG.PROFILE_URL}
        target="_blank"
        rel="noreferrer"
      >
        Ver perfil no WakaTime
      </a>
    </section>
  );
}

export default WakaTime;
