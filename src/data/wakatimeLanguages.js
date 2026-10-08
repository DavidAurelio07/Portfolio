import { FaJava, FaTerminal } from "react-icons/fa";
import {
  FiFileText,
  FiMoreHorizontal,
  FiSettings,
  FiCode,
} from "react-icons/fi";
import {
  SiPython,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiMarkdown,
  SiJson,
  SiXml,
  SiDocker,
  SiGnubash,
  SiGit,
} from "react-icons/si";

// Ícone e cores de cada linguagem, pelo nome que o WakaTime devolve.
//   color    → cor do logo (versão da marca legível no fundo escuro;
//              no tema light o CSS escurece automaticamente)
//   gradient → [início, fim] do anel e da barra
// Linguagens sem cor de marca usam os tokens de texto, que seguem o tema.

const brand = (icon, color, gradient) => ({ icon, color, gradient });
const neutral = (icon, tone = "--text-muted") => ({
  icon,
  color: `var(${tone})`,
  gradient: ["var(--text-dim)", `var(${tone})`],
});

const LANGUAGES = {
  Java: brand(FaJava, "#F89820", ["#5382A1", "#F89820"]),
  JavaScript: brand(SiJavascript, "#F7DF1E", ["#E8A317", "#F7DF1E"]),
  CSS: brand(SiCss3, "#33A9DC", ["#1572B6", "#33A9DC"]),
  HTML: brand(SiHtml5, "#F06529", ["#E34F26", "#F06529"]),
  Python: brand(SiPython, "#4B8BBE", ["#3776AB", "#FFD43B"]),
  Docker: brand(SiDocker, "#2496ED", ["#1D63ED", "#2496ED"]),
  Bash: brand(SiGnubash, "#4EAA25", ["#2E7D18", "#4EAA25"]),
  "Git Config": brand(SiGit, "#F05032", ["#C93A1D", "#F05032"]),
  "GitIgnore file": brand(SiGit, "#F05032", ["#C93A1D", "#F05032"]),

  Markdown: neutral(SiMarkdown, "--text-soft"),
  JSON: neutral(SiJson),
  XML: neutral(SiXml),
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

// Nomes genéricos do WakaTime que ganham tradução (chaves em wakatime.nomes)
export const TRANSLATED_NAMES = {
  Text: "texto",
  Other: "outro",
  Coding: "coding",
  Building: "building",
  Debugging: "debugging",
  "AI Coding": "aiCoding",
  "Writing Docs": "writingDocs",
  "Writing Tests": "writingTests",
  "Running Tests": "runningTests",
  "Manual Testing": "manualTesting",
  "Code Reviewing": "codeReviewing",
  Browsing: "browsing",
  Researching: "researching",
  Learning: "learning",
  Designing: "designing",
  Meeting: "meeting",
  Planning: "planning",
  Communicating: "communicating",
};
