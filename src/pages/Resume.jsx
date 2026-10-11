import { useTranslation } from "react-i18next";
import curriculo from "../assets/curriculo/Curriculo.pdf";

function Resume() {
  const { t } = useTranslation();

  return (
    <section id="resume">
      <div>
        <a href={curriculo} download="Curriculo-David.pdf">
          {t("resume.download")}
        </a>

        <iframe
          src={curriculo}
          title={t("resume.frameTitle")}
          width="100%"
          height="700px"
        ></iframe>
      </div>
    </section>
  );
}

export default Resume;
