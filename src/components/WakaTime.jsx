import { useEffect, useState } from "react";
import WAKATIME_CONFIG from "../config/wakaTimeConfig";
import { languageStyle, OTHERS_STYLE } from "../data/wakaTimeLanguages";
import "./WakaTime.css";

function buildRows(rawItems) {
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
    style: languageStyle(item.name),
  }));

  if (rest.length > 0) {
    rows.push({
      name: `+ ${rest.length} linguagens`,
      percent: rest.reduce((sum, item) => sum + item.percent, 0),
      style: OTHERS_STYLE,
    });
  }

  return rows;
}

function WakaTime() {
  const [rows, setRows] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const controller = new AbortController();

    fetch(WAKATIME_CONFIG.SHARE_URL, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((json) => {
        setRows(buildRows(json.data ?? []));
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
        <h2 className="waka__title">Linguagens mais usadas</h2>
      </header>

      {status === "loading" && <p className="waka__msg">Carregando...</p>}
      {status === "error" && (
        <p className="waka__msg">
          Não foi possível carregar os dados do WakaTime agora.
        </p>
      )}

      {status === "ok" && (
        <ul className="waka__list">
          {rows.map((row) => {
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
                <span className="waka__value">{row.percent.toFixed(1)}%</span>
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
