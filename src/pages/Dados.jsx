import { useTranslation } from "react-i18next";
import WakaTime from "../components/WakaTime";
import GitHubStats from "../components/GitHubStats";
import "./Dados.css";

function Dados() {
  const { t } = useTranslation();

  return (
    <section id="dados">
      <h2>{t("data.title")}</h2>
      <p>{t("data.note")}</p>
      <div className="dados-section">
        <div className="dados-waka">
          <h2>WakaTime</h2>
          <WakaTime />
        </div>

        <div className="dados-git">
          <h2>GitHub</h2>
          <GitHubStats />
        </div>
      </div>
    </section>
  );
}

export default Dados;
