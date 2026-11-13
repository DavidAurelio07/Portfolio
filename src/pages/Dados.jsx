import { useTranslation } from "react-i18next";
import WakaTimeStats from "../components/WakaTimeStats/WakaTimeStats";
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
          <WakaTimeStats initialRange="last_7_days" showProjects />
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
