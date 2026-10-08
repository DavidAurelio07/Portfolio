import curriculo from "../assets/curriculo/Curriculo.pdf";

function Resume() {
  return (
    <section id="resume">
      <div>
        <a href={curriculo} download="Curriculo-David.pdf">
          Baixar currículo
        </a>

        <iframe
          src={curriculo}
          title="Currículo de David"
          width="1200px"
          height="700px"
        ></iframe>
      </div>
    </section>
  );
}

export default Resume;
