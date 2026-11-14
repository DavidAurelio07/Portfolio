import { useTranslation } from "react-i18next";
import "./Projects.css";
import ProjectsDetails from "../components/ProjectsDetails.jsx";
import getProjects from "../data/projects";

function Projects() {
  const { t } = useTranslation();

  // Montada a cada render para a descrição acompanhar o idioma escolhido
  const projetos = getProjects(t);

  return (
    <section id="projects">
      <div className="projects-hero">
        <h2 className="projects-title">{t("projects.title")}</h2>
        <p className="projects-subtitle">{t("projects.subtitle")}</p>
      </div>

      <div className="projects-container">
        <ProjectsDetails projects={projetos} />
      </div>
    </section>
  );
}

export default Projects;
