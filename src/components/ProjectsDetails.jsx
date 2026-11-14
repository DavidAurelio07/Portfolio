import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaGithub, FaTimes } from "react-icons/fa";
import { TECH } from "../data/projects";
import "./ProjectsDetails.css";

// Capa do projeto: imagem real ou, se não houver, um placeholder neon com a
// inicial do título.
function Cover({ project }) {
  if (project.image) {
    return (
      <img
        className="project-card__image"
        src={project.image}
        alt={project.title}
        loading="lazy"
      />
    );
  }
  return (
    <div className="project-card__placeholder" aria-hidden="true">
      <span>{project.title.charAt(0)}</span>
    </div>
  );
}

// Lista de linguagens/tecnologias como chips com ícone colorido.
function TechList({ tech = [], className = "" }) {
  const items = tech.map((key) => TECH[key]).filter(Boolean);
  if (!items.length) return null;

  return (
    <ul className={`project-tech ${className}`}>
      {items.map(({ label, icon: Icon, color }) => (
        <li key={label} className="project-tech__chip">
          <Icon aria-hidden="true" style={{ color }} />
          <span>{label}</span>
        </li>
      ))}
    </ul>
  );
}

function ProjectModal({ project, onClose }) {
  const { t } = useTranslation();

  // Fecha com Esc e trava o scroll do fundo enquanto o modal está aberto
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  return (
    <div
      className="project-modal__backdrop"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="project-modal__close"
          onClick={onClose}
          aria-label={t("projects.close")}
        >
          <FaTimes aria-hidden="true" />
        </button>

        <Cover project={project} />

        <div className="project-modal__body">
          <h3 id="project-modal-title" className="project-modal__title">
            {project.title}
          </h3>

          <TechList tech={project.tech} className="project-tech--modal" />

          <p className="project-modal__description">{project.description}</p>

          <a
            className="project-modal__link"
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub aria-hidden="true" />
            {t("projects.viewOnGithub")}
          </a>
        </div>
      </div>
    </div>
  );
}

function ProjectsDetails({ projects = [] }) {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="projects-grid">
        {projects.map((project) => (
          <article
            key={project.id}
            className="project-card"
            role="button"
            tabIndex={0}
            aria-label={`${project.title} — ${t("projects.openDetails")}`}
            onClick={() => setSelected(project)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setSelected(project);
              }
            }}
          >
            <Cover project={project} />

            <div className="project-card__body">
              <h3 className="project-card__title">{project.title}</h3>
              <TechList tech={project.tech} />
              <p className="project-card__description">{project.description}</p>
              <span className="project-card__cta">
                {t("projects.openDetails")}
              </span>
            </div>
          </article>
        ))}
      </div>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}

export default ProjectsDetails;
