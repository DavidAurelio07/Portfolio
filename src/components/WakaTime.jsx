import React, {
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Trans, useTranslation } from "react-i18next";
import { FiActivity, FiCalendar, FiClock, FiCode } from "react-icons/fi";
import WAKATIME_CONFIG from "../config/wakaTimeConfig";
import { SKINS, DEFAULT_SKIN } from "../data/wakaTimeSkins";
import {
  languageStyle,
  OTHERS_STYLE,
  TRANSLATED_NAMES,
} from "../data/wakaTimeLanguages";
import {
  fetchWakaTimeStats,
  getCachedWakaTimeStats,
  WakaTimePendingError,
  splitTop,
  formatDuration,
  formatPercent,
  formatDate,
} from "../lib/wakatime";
import useCommandAtTop from "../terminal/useCommandAtTop";
import { useTheme } from "../theme/themeContext";
import { toHex } from "../theme/colorUtils";
import SkinsFooter from "./SkinsFooter";
import "./WakaTime.css";

const { USERNAME, LIMITS, PROFILE_URL } = WAKATIME_CONFIG;

/* =====================================================================
   wakatime --lista: fatia de cada linguagem + ranking com barras
   ===================================================================== */

// Barra única dividida por linguagem (parte do todo). As linhas abaixo
// trazem os mesmos valores em texto, então ela fica fora do leitor de tela.
const STACK_SEGMENTS = 7;
function FatiasLinguagens({ languages, f }) {
  const { t } = useTranslation();
  const { top, rest } = splitTop(languages, STACK_SEGMENTS);
  const segments = rest
    ? [
        ...top,
        restItem(rest, t("wakatime.maisLinguagens", { count: rest.count })),
      ]
    : top;

  return (
    <div className="waka-stack" aria-hidden="true">
      {segments.map((item, index) => {
        const style = item.isRest ? OTHERS_STYLE : languageStyle(item.name);
        const name = item.isRest ? item.name : f.name(item.name);
        return (
          <span
            key={item.name}
            className="waka-stack-seg"
            style={itemStyle(style, index, { flexGrow: item.seconds })}
            title={`${name} · ${f.duration(item.seconds)} · ${f.percent(item.percent)}`}
          />
        );
      })}
    </div>
  );
}

function ListaSkin({ data, f }) {
  const { t } = useTranslation();
  const { top, rest } = splitTop(data.languages, LIMITS.lista);
  const rows = rest
    ? [
        ...top,
        restItem(rest, t("wakatime.maisLinguagens", { count: rest.count })),
      ]
    : top;
  // Barras proporcionais ao tempo, com a maior linguagem ocupando a largura toda
  const max = top[0]?.seconds || 1;

  return (
    <>
      <p className="waka-resumo">
        <Trans
          i18nKey="wakatime.resumo"
          values={{
            total: f.duration(data.totalSeconds),
            media: f.duration(data.dailyAverage),
          }}
          components={{ b: <strong /> }}
        />
      </p>

      <FatiasLinguagens languages={data.languages} f={f} />

      <ul className="waka-list">
        {rows.map((lang, index) => {
          const style = lang.isRest ? OTHERS_STYLE : languageStyle(lang.name);
          const Icon = style.icon;
          return (
            <li
              key={lang.name}
              className={lang.isRest ? "waka-row resto" : "waka-row"}
              style={itemStyle(style, index, {
                "--rel": `${(lang.seconds / max) * 100}%`,
              })}
            >
              <span className="waka-tile" aria-hidden="true">
                <Icon />
              </span>
              <div className="waka-row-body">
                <div className="waka-row-head">
                  <span className="waka-name">
                    {lang.isRest ? lang.name : f.name(lang.name)}
                  </span>
                  <span className="waka-row-time">
                    {f.duration(lang.seconds)}
                  </span>
                  <span className="waka-pct">{f.percent(lang.percent)}</span>
                </div>
                <div className="waka-bar" aria-hidden="true" />
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

/* =====================================================================
   Moldura dos estilos com dados: título, carregando/erro e rodapé
   ===================================================================== */
const SKIN_VIEWS = {
  grade: GradeSkin,
  lista: ListaSkin,
  terminal: TerminalSkin,
};

// Se a API mandar algo num formato inesperado, o erro fica só neste painel.
// Sem isso, um erro de renderização derruba o terminal inteiro (tela vazia).
class PainelErrorBoundary extends React.Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.error("WakaTime:", error);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function WakaTimeStats({ skin }) {
  const { t } = useTranslation();
  const state = useWakaTimeStats();
  const f = useFormatters();
  const containerRef = useRef(null);
  const Skin = SKIN_VIEWS[skin];
  const since = state.data && f.date(state.data.since);
  const errorMessage = (
    <p className="wakatime-status error" role="status">
      {t("wakatime.status.error")}
    </p>
  );

  // Comando no topo, com a saída abaixo. Os dados chegam depois e a saída
  // cresce: o hook percebe e repete o ajuste (ver terminal/useCommandAtTop.js)
  useCommandAtTop(containerRef);

  return (
    <div className="wakatime-painel" ref={containerRef}>
      <h3 className="wakatime-titulo">{t("wakatime.titulo")}</h3>

      {state.status === "ready" ? (
        <PainelErrorBoundary fallback={errorMessage}>
          <p className="wakatime-subtitulo">
            {since && `${t("wakatime.desde", { data: since })} · `}
            <a href={PROFILE_URL} target="_blank" rel="noopener noreferrer">
              wakatime.com/@{USERNAME}
            </a>
          </p>
          <Skin data={state.data} f={f} />
        </PainelErrorBoundary>
      ) : (
        <p className={`wakatime-status ${state.status}`} role="status">
          {t(`wakatime.status.${state.status}`)}
        </p>
      )}

      <SkinsFooter skins={SKINS} active={skin} namespace="wakatime" />
    </div>
  );
}

export default function WakaTime({ skin = DEFAULT_SKIN }) {
  return SKIN_VIEWS[skin] ? <WakaTimeStats skin={skin} /> : <WakaTimeCards />;
}
