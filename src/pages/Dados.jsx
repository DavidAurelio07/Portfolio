import WakaTime from "../components/WakaTime";
import GitHubStats from "../components/GitHubStats";
import "./Dados.css";

function Dados() {
  return (
    <section id="dados">
      <h2>Meus dados estatísticos no WakaTime e GitHub</h2>
      <p>
        Alguns dados podem está desatualizados, portanto disponibilizei o link
        do meu perfil do WakaTime e GitHub para que possa ver atualizado.
      </p>
      <div className="dados-section">
        <div className="dados-waka">
          <h2>WakaTime</h2>
          {/*Puxar o wakatime para a página*/}
          <WakaTime />
        </div>

        <div className="dados-git">
          <h2>GitHub</h2>
          {/*Puxar o githubstats para a página*/}
          <GitHubStats />
        </div>
      </div>
    </section>
  );
}

export default Dados;
