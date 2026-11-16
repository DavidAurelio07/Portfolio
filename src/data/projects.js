import {
  SiJavascript,
  SiHtml5,
  SiCss,
  SiPython,
  SiReact,
  SiSpringboot,
  SiPostgresql,
  SiOpenjdk,
} from "react-icons/si";

import ecofluxPage from "../assets/imagens/ecofluxPage.jpeg";
import spaceEscapePage from "../assets/imagens/spaceEscape.jpeg";

// Metadados de cada linguagem/tecnologia: ícone e cor da marca.
// Reaproveitado pelos chips nos cards e no modal de detalhe.
export const TECH = {
  javascript: { label: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
  html: { label: "HTML", icon: SiHtml5, color: "#e34f26" },
  css: { label: "CSS", icon: SiCss, color: "#663399" },
  python: { label: "Python", icon: SiPython, color: "#3776ab" },
  react: { label: "React", icon: SiReact, color: "#61dafb" },
  java: { label: "Java", icon: SiOpenjdk, color: "#f89820" },
  spring: { label: "Spring Boot", icon: SiSpringboot, color: "#6db33f" },
  postgres: { label: "PostgreSQL", icon: SiPostgresql, color: "#4169e1" },
};

// Lista de projetos usada na Home e na página Projetos (fonte única).
// Recebe o `t` para a descrição acompanhar o idioma escolhido.
//
// Campos por projeto:
//   image  → imagem de capa (import do asset). Sem ela, o card mostra um
//            placeholder neon com a inicial do projeto.
//   tech   → chaves de TECH (ordem = ordem de exibição dos chips).
export default function getProjects(t) {
  return [
    {
      id: 1,
      title: "EcoFlux",
      description: t("projects.ecoflux.description"),
      github: "https://github.com/DavidAurelio07/ecoflux",
      image: ecofluxPage,
      tech: ["javascript", "html", "css"],
    },
    {
      id: 2,
      title: "SpaceEscape",
      description: t("projects.spaceEscape.description"),
      github: "https://github.com/DavidAurelio07/Trabalho-de-Algoritmo",
      image: spaceEscapePage,
      tech: ["python"],
    },
    {
      id: 3,
      title: "Bão de Roda",
      description: t("projects.aluguelCarros.description"),
      github:
        "https://github.com/DavidAurelio07/desenvolvimento-e-integracao-de-aplicacoes-web/tree/main/AluguelCarros",
      image: null,
      tech: ["react", "javascript", "css", "java", "spring", "postgres"],
    },
  ];
}
