import { useTranslation } from "react-i18next";
import "./Home.css";
import Skills from "../components/Skills.jsx";
import fotoDavid from "../assets/imagens/davidfoto.jpg";
import logoPuc from "../assets/imagens/logoPuc.png";

function Home() {
  const { t } = useTranslation();

  // Montadas a cada render para acompanhar o idioma escolhido
  const skillLanguages = [
    {
      id: 1,
      title: t("home.skills.python.title"),
      description: t("home.skills.python.description"),
    },
    {
      id: 2,
      title: t("home.skills.web.title"),
      description: t("home.skills.web.description"),
    },
    {
      id: 3,
      title: t("home.skills.java.title"),
      description: t("home.skills.java.description"),
    },
  ];

  const skillFrameworks = [
    {
      id: 1,
      title: t("home.skills.react.title"),
      description: t("home.skills.react.description"),
    },
    {
      id: 2,
      title: t("home.skills.spring.title"),
      description: t("home.skills.spring.description"),
    },
  ];

  return (
    <section id="home">
      <div>
        <div className="hero-section">
          <h2>David Aurélio Pedrosa</h2>
          <p>{t("home.hero.subtitle")}</p>
          <div className="sobre-hero">
            <img src={fotoDavid} alt={t("home.hero.photoAlt")} />
            <p>{t("home.hero.p1")}</p>
            <p>{t("home.hero.p2")}</p>
            <p>{t("home.hero.p3")}</p>
          </div>
        </div>

        <div className="skills-section">
          <h2>{t("home.skills.title")}</h2>
          <div className="skills-container">
            <div className="skills-cards">
              <h3>{t("home.skills.languages")}</h3>
              <Skills skills={skillLanguages} />
            </div>

            <div className="skills-cards">
              <h3>{t("home.skills.frameworks")}</h3>
              <Skills skills={skillFrameworks} />
            </div>
          </div>
        </div>

        <div className="section-education">
          <h2>{t("home.education.title")}</h2>
          <div style={{ display: "flex", gap: 100, marginTop: 50 }}>
            <div>
              <img src={logoPuc} alt={t("home.education.logoAlt")} />
            </div>
            <div className="education-about">
              <h3>{t("home.education.degree")}</h3>
              <h4>{t("home.education.university")}</h4>
              <p>
                <span>{t("home.education.start")}</span> -{" "}
                <span>
                  {t("home.education.end")}
                  <br />
                </span>{" "}
                <span style={{ fontSize: 10 }}>
                  {t("home.education.expected")}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
