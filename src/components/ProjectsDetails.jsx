import { useTranslation } from "react-i18next";
import "./ProjectsDetails.css";

function ProjectsDetails({ projects = [] }) {
  const { t } = useTranslation();

  return (
    <div className="projects-grid">
      {projects.map((projeto) => (
        <article key={projeto.id} className="project-card">
          {projeto.image && (
            <img
              className="project-card__image"
              src={projeto.image}
              alt={projeto.title}
            />
          )}

          <div className="project-card__body">
            <h3 className="project-card__title">{projeto.title}</h3>
            <p className="project-card__description">{projeto.description}</p>
            <a
              className="project-card__link"
              href={projeto.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("projects.viewOnGithub")}
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}

export default ProjectsDetails;
