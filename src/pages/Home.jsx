import "./Home.css";
import { useTranslation } from "react-i18next";

function Home() {
  return (
    <section id="home">
      <div>
        <header className="header">
          <nav className="header-links">
            <a href=""></a>
            <a href="">CURRÍCULO</a>
            <a href="">PROJETOS</a>
            <a href="">CONTATO</a>
          </nav>
        </header>
        <div className="hero-section">
          <h2>David Aurélio Pedrosa</h2>
          <p>
            Estudante de Engenharia de Software na PUC Minas, atualmente no 2º
            Periodo.
          </p>
          <div className="sobre-hero">
            <img src="./assets/imagens/davidfoto.jpg" />
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum,
              minus possimus eaque nemo nam modi aut error illum, at aperiam
              accusantium sunt alias perspiciatis quam. Expedita vel modi illo
              facilis!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
