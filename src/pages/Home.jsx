import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import "./Home.css";
import SkillsSection from "../components/SkillsSection/SkillsSection.jsx";
import getProjects from "../data/projects";
import Reveal from "../components/Reveal.jsx";
import Typewriter from "../components/Typewriter.jsx";
import SKILLS, { CATEGORIES } from "../data/skills";
import fotoDavid from "../assets/imagens/davidfoto.jpg";
import logoPuc from "../assets/imagens/logoPuc.png";

const GITHUB_URL = "https://github.com/DavidAurelio07";

function Home() {
  const { t } = useTranslation();
  const projects = getProjects(t);
  const roles = t("home.hero.roles", { returnObjects: true });
  const aboutItems = t("home.about.items", { returnObjects: true });

  // Cada item da linha do tempo usa o texto que você já tinha (p1, p2, p3)
  const story = [
    { ...aboutItems[0], text: t("home.hero.p1") },
    { ...aboutItems[1], text: t("home.hero.p2") },
    { ...aboutItems[2], text: t("home.hero.p3") },
  ];

  const stats = [
    {
      value: t("home.stats.period.value"),
      label: t("home.stats.period.label"),
    },
    { value: `${SKILLS.length}+`, label: t("home.stats.skills.label") },
    { value: projects.length, label: t("home.stats.projects.label") },
    { value: t("home.stats.since.value"), label: t("home.stats.since.label") },
  ];

  return (
    <section id="home">
      {/* ---------- Hero ---------- */}
      <div className="hero">
        <div className="hero__inner">
          <div className="hero__photo">
            <img src={fotoDavid} alt={t("home.hero.photoAlt")} />
          </div>

          <div className="hero__text">
            <span className="hero__badge">
              <span className="hero__dot" aria-hidden="true" />
              {t("home.hero.available")}
            </span>

            <p className="hero__greeting">{t("home.hero.greeting")}</p>
            <h1>David Aurélio Pedrosa</h1>

            <p className="hero__role">
              <Typewriter words={Array.isArray(roles) ? roles : []} />
            </p>

            <p className="hero__subtitle">{t("home.hero.subtitle")}</p>
            <p className="hero__tagline">{t("home.hero.tagline")}</p>

            <div className="hero__actions">
              <Link className="btn btn--primary" to="/projetos">
                {t("home.hero.ctaProjects")}
              </Link>
              <Link className="btn btn--secondary" to="/resume">
                {t("home.hero.ctaResume")}
              </Link>
              <a
                className="btn btn--icon"
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("home.hero.github")}
                title={t("home.hero.github")}
              >
                <FaGithub aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Números ---------- */}
      <Reveal>
        <ul className="stats">
          {stats.map((s) => (
            <li key={s.label} className="stats__item">
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* ---------- Minha história ---------- */}
      <Reveal>
        <div className="home-section">
          <h2 className="section-title">{t("home.about.title")}</h2>
          <ol className="timeline">
            {story.map((item) => (
              <li key={item.year} className="timeline__item">
                <span className="timeline__year">{item.year}</span>
                <div className="timeline__card">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>

      {/* ---------- Habilidades ---------- */}
      <Reveal>
        <div className="skills-section">
          <h2>{t("home.skills.title")}</h2>
          <SkillsSection skills={SKILLS} categories={CATEGORIES} />
        </div>
      </Reveal>

      {/* ---------- Educação ---------- */}
      <Reveal>
        <div className="home-section">
          <h2 className="section-title">{t("home.education.title")}</h2>
          <div className="education-card">
            <img src={logoPuc} alt={t("home.education.logoAlt")} />
            <div className="education-about">
              <span className="education-badge">
                {t("home.education.status")}
              </span>
              <h3>{t("home.education.degree")}</h3>
              <h4>{t("home.education.university")}</h4>
              <p>
                {t("home.education.start")} – {t("home.education.end")}{" "}
                <small>{t("home.education.expected")}</small>
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default Home;
