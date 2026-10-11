import {
  FaJava,
  FaPython,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaMarkdown,
  FaDocker,
  FaGitAlt,
  FaTerminal,
} from "react-icons/fa";
import {
  FiFileText,
  FiMoreHorizontal,
  FiSettings,
  FiCode,
} from "react-icons/fi";

// Ícone e cores de cada linguagem, pelo nome que o WakaTime devolve.
//   color    → cor do logo
//   gradient → [início, fim] da barra
// Linguagens sem cor de marca usam tons neutros.

const brand = (icon, color, gradient) => ({ icon, color, gradient });
const neutral = (icon, tone = "--text-muted") => ({
  icon,
  color: `var(${tone})`,
  gradient: ["var(--text-dim)", `var(${tone})`],
});

const LANGUAGES = {
  Java: brand(FaJava, "#F89820", ["#5382A1", "#F89820"]),
  JavaScript: brand(FaJs, "#F7DF1E", ["#E8A317", "#F7DF1E"]),
  CSS: brand(FaCss3Alt, "#33A9DC", ["#1572B6", "#33A9DC"]),
  HTML: brand(FaHtml5, "#F06529", ["#E34F26", "#F06529"]),
  Python: brand(FaPython, "#4B8BBE", ["#3776AB", "#FFD43B"]),
  Docker: brand(FaDocker, "#2496ED", ["#1D63ED", "#2496ED"]),
  Bash: brand(FaTerminal, "#4EAA25", ["#2E7D18", "#4EAA25"]),
  "Git Config": brand(FaGitAlt, "#F05032", ["#C93A1D", "#F05032"]),
  "GitIgnore file": brand(FaGitAlt, "#F05032", ["#C93A1D", "#F05032"]),

  Markdown: neutral(FaMarkdown, "--text-soft"),
  JSON: neutral(FiCode),
  XML: neutral(FiCode),
  Properties: neutral(FiSettings),
  "Java Properties": neutral(FiSettings),
  Batchfile: neutral(FaTerminal),
  Text: neutral(FiFileText),
  Other: neutral(FiMoreHorizontal, "--text-dim"),
};

const FALLBACK = neutral(FiCode);

export const languageStyle = (name) => LANGUAGES[name] ?? FALLBACK;

// Linha "+ N linguagens" que soma o que ficou fora do limite
export const OTHERS_STYLE = neutral(FiMoreHorizontal, "--text-dim");

// Nomes genéricos do WakaTime que ganham tradução
export const TRANSLATED_NAMES = {
  Text: "texto",
  Other: "outro",
  Coding: "coding",
  Debugging: "debugging",
  "Writing Docs": "writingDocs",
};
