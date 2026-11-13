import { useTranslation } from "react-i18next";
import { SiWakatime } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import WakaTimeStats from "../components/WakaTimeStats/WakaTimeStats";
import GitHubStats from "../components/GitHubStats";
import Reveal from "../components/Reveal.jsx";
import "./Dados.css";

function Dados() {
  const { t } = useTranslation();

  return (
    <section id="dados">
      {/* ---------- Cabeçalho ---------- */}
      <div className="dados-hero">
        <div className="dados-hero__inner">
          <span className="dados-badge">
            <span className="dados-dot" aria-hidden="true" />
            {t("data.badge")}
          </span>
          <h1 className="dados-hero__title">{t("data.title")}</h1>
          <p className="dados-hero__note">{t("data.note")}</p>
        </div>
      </div>

      {/* ---------- WakaTime ---------- */}
      <Reveal>
        <div className="dados-panel">
          <div className="dados-panel__head">
            <span className="dados-panel__icon" aria-hidden="true">
              <SiWakatime />
            </span>
            <div className="dados-panel__heading">
              <h2 className="dados-panel__title">{t("data.wakatime.title")}</h2>
              <p className="dados-panel__subtitle">
                {t("data.wakatime.subtitle")}
              </p>
            </div>
          </div>
          <div className="dados-panel__body">
            <WakaTimeStats initialRange="last_7_days" showProjects />
          </div>
        </div>
      </Reveal>

      {/* ---------- GitHub ---------- */}
      <Reveal>
        <div className="dados-panel">
          <div className="dados-panel__head">
            <span className="dados-panel__icon" aria-hidden="true">
              <FaGithub />
            </span>
            <div className="dados-panel__heading">
              <h2 className="dados-panel__title">{t("data.github.title")}</h2>
              <p className="dados-panel__subtitle">
                {t("data.github.subtitle")}
              </p>
            </div>
          </div>
          <div className="dados-panel__body">
            <GitHubStats />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default Dados;
