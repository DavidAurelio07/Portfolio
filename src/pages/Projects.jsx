import { useTranslation } from "react-i18next";
import "./Projects.css";
import ProjectsDetails from "../components/ProjectsDetails.jsx";
import ecofluxPage from "../assets/imagens/ecofluxPage.jpeg";

function Projects() {
  const { t } = useTranslation();

  // Montada a cada render para a descrição acompanhar o idioma escolhido
  const projetos = [
    {
      id: 1,
      title: "EcoFlux",
      description: t("projects.ecoflux.description"),
      github: "https://github.com/DavidAurelio07/ecoflux",
      image: ecofluxPage,
    },
    {
      id: 2,
      title: "SpaceEscape",
      description: t("projects.spaceEscape.description"),
      github: "https://github.com/DavidAurelio07/Trabalho-de-Algoritmo",
    },
  ];

  return (
    <section id="projects">
      <h2>{t("projects.title")}</h2>
      <div className="projects-container">
        <ProjectsDetails projects={projetos} />
      </div>
    </section>
  );
}

export default Projects;
