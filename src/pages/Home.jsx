import { useState } from "react";
import "./Home.css";
import Skills from "../components/Skills.jsx";
import fotoDavid from "../assets/imagens/davidfoto.jpg";

function Home() {
  const [skillLanguages, setSkillLanguages] = useState([
    {
      id: 1,
      title: "Python",
      description: "Possuo conhecimento em Python, com lógica de programação.",
      isActive: false,
    },
    {
      id: 2,
      title: "Desenvolvimento Web",
      description:
        "Possuo conhecimento em desenvolvimento web, com foco em HTML, CSS e JavaScript.",
      isActive: false,
    },
    {
      id: 3,
      title: "Java",
      description:
        "Possuo conhecimento em Java, com foco em programação orientada a objetos.",
      isActive: false,
    },
  ]);

  const [skillFrameworks, setSkillFrameworks] = useState([
    {
      id: 1,
      title: "React",
      description:
        "Possuo conhecimento em React, com foco em desenvolvimento de aplicações web.",
      isActive: false,
    },
    {
      id: 2,
      title: "Spring Boot",
      description:
        "Possuo conhecimento em Spring Boot, com foco em desenvolvimento de APIs REST.",
      isActive: false,
    },
  ]);

  return (
    <section id="home">
      <div>
        <header className="header">
          <nav className="header-links">
            <a href="#home">home</a>
            <a href="#resume">resume</a>
            <a href="#projects">projects</a>
            <a href="#contact">contact</a>
          </nav>
        </header>
        <div className="hero-section">
          <h2>David Aurélio Pedrosa</h2>
          <p>
            Estudante de Engenharia de Software na PUC Minas, atualmente no 2º
            Periodo.
          </p>
          <div className="sobre-hero">
            <img src={fotoDavid} alt="Foto de David Aurélio Pedrosa" />
            <p>
              Desde pequeno, comecei a utilizar o computador do meu pai e, por
              conta disso, desenvolvi um grande interesse pela área de
              tecnologia. Em 2016, comecei a conhecer um pouco mais sobre
              desenvolvimento de jogos, tendo também meu primeiro contato com
              programação.
            </p>
            <p>
              Em 2020, surgiu em mim a vontade de ingressar na área de
              programação. Por isso, iniciei o curso de Programação 1 na Escola
              CNI (Prime System), onde aprendi sobre Lógica de Programação, Java
              e um pouco de PHP. Gostei muito da experiência e, posteriormente,
              realizei o curso de Programação 2, com foco em HTML, CSS e
              WordPress.
            </p>
            <p>
              Após esses cursos, surgiu o interesse em cursar uma faculdade na
              área de Tecnologia da Informação. Foi então que conheci o curso de
              Engenharia de Software da PUC Minas e iniciei minha graduação no
              primeiro semestre de 2026. Durante a graduação, venho adquirindo
              conhecimentos em Python, desenvolvimento web com HTML, CSS e
              JavaScript, Java, Spring Boot e metodologias ágeis, como Scrum.
            </p>
          </div>
        </div>

        <div className="skills-section">
          <h2>Habilidades</h2>
          <div className="skills-container">
            <div className="skills-cards">
              <h3>Linguagens</h3>
              <Skills skills={skillLanguages} />
            </div>

            <div className="skills-cards">
              <h3>Frameworks</h3>
              <Skills skills={skillFrameworks} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
