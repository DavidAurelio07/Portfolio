import { useEffect, useState } from "react";

/**
 * Digita e apaga uma lista de frases, com cursor piscando.
 * <Typewriter words={["Desenvolvedor Web", "Estudante de ES"]} />
 * Com "reduzir movimento" ativado no sistema, mostra só a primeira frase.
 */
export default function Typewriter({ words = [], speed = 70, pause = 1600 }) {
  // Lista vira texto para o efeito só reiniciar quando o conteúdo mudar
  // (ex.: troca de idioma), e não a cada render.
  const key = words.join("|");
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  // Troca de idioma: recomeça do zero
  useEffect(() => {
    setIndex(0);
    setText("");
    setDeleting(false);
  }, [key]);

  useEffect(() => {
    const list = key ? key.split("|") : [];
    if (list.length === 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    if (reduced) {
      setText(list[0]);
      return;
    }

    const word = list[index % list.length];
    let delay = deleting ? speed / 2 : speed;

    if (!deleting && text === word) delay = pause; // terminou de digitar
    if (deleting && text === "") delay = 300; // terminou de apagar

    const timer = setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % list.length);
      } else {
        setText(
          deleting
            ? word.slice(0, text.length - 1)
            : word.slice(0, text.length + 1),
        );
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [key, index, text, deleting, speed, pause]);

  return (
    <span className="typewriter" aria-label={words[0]}>
      <span aria-hidden="true">{text}</span>
      <span className="typewriter__cursor" aria-hidden="true" />
    </span>
  );
}
