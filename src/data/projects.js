import ecofluxPage from "../assets/imagens/ecofluxPage.jpeg";

// Lista de projetos usada na Home e na página Projetos.
// Recebe o `t` para a descrição acompanhar o idioma escolhido.
export default function getProjects(t) {
  return [
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
}
