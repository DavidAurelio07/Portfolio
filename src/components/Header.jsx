import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>

        <Link to="/">Dados</Link>

        <Link to="/resume">Currículo</Link>

        <Link to="/projetos">Projetos</Link>

        <Link to="/contate">Contato</Link>
      </nav>
    </header>
  );
}

export default Header;
