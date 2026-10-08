import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import "./Contato.css";

const Contato = () => {
  const seuLinkedIn =
    "https://www.linkedin.com/in/david-aurélio-pedrosa-348aa92b5";
  const seuGitHub = "https://github.com/DavidAurelio07";
  const seuEmail = "davidaureliop07@gmail.com";

  return (
    <div className="contato-container" style={{ padding: "0 1.5rem" }}>
      <h3 className="contato-titulo">Entre em Contato</h3>
      <p className="contato-subtitulo">
        Sinta-se à vontade para se conectar ou me enviar uma mensagem.
      </p>

      <div className="contato-links">
        {/* LinkedIn */}
        <a
          href={seuLinkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="contato-item"
        >
          <FaLinkedin className="contato-icone" />
          <span>LinkedIn</span>
        </a>

        {/* GitHub */}
        <a
          href={seuGitHub}
          target="_blank"
          rel="noopener noreferrer"
          className="contato-item"
        >
          <FaGithub className="contato-icone" />
          <span>GitHub</span>
        </a>

        {/* E-mail (Solução com mailto:) */}
        <a href={`mailto:${seuEmail}`} className="contato-item">
          <FaEnvelope className="contato-icone" />
          <span>{seuEmail}</span>
        </a>

        <h4>Tempo médio de resposta de 1 até 2 dias úteis</h4>
      </div>
    </div>
  );
};

export default Contato;
