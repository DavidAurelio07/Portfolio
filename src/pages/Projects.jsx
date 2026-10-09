import { useState } from "react";
import "./Projects.css";
import ProjectsDetails from "../components/ProjectsDetails.jsx";
import ecofluxPage from "../assets/imagens/ecofluxPage.jpeg";

function Projects() {
  const [Projetos] = useState([
    {
      id: 1,
      title: "EcoFlux",
      description:
        "Plataforma web desenvolvida para facilitar o acesso à reciclagem e à coleta seletiva. O EcoFlux conecta cidadãos, pontos de coleta e empresas parceiras, permitindo consultar pontos de coleta, agendar a retirada de materiais recicláveis e acompanhar o calendário de coleta por região — tornando o processo mais simples e acessível no dia a dia.",
      github: "https://github.com/DavidAurelio07/ecoflux",
      image: ecofluxPage,
      isActive: false,
    },
    {
      id: 2,
      title: "SpaceEscape",
      description:
        "Space Escape é um jogo 2D em que o jogador controla uma nave espacial e deve desviar dos meteoros que caem pela tela. Durante a partida, kits de reparo aparecem aleatoriamente e podem ser coletados para recuperar a vida da nave durante a partida. O objetivo é sobreviver pelo maior tempo possível e alcançar a maior pontuação.",
      github: "https://github.com/DavidAurelio07/Trabalho-de-Algoritmo",
      isActive: false,
    },
  ]);
  return (
    <section id="projects">
      <h2>Projetos</h2>
      <div className="projects-container">
        <ProjectsDetails projects={Projetos} />
      </div>
    </section>
  );
}

export default Projects;
