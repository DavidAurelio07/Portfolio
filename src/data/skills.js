import { FaJava } from "react-icons/fa";
import {
  SiBootstrap,
  SiCss,
  SiFigma,
  SiGit,
  SiGithub,
  SiHtml5,
  SiIntellijidea,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNpm,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiSpringboot,
  SiVercel,
  SiVite,
  SiNodedotjs,
} from "react-icons/si";
import { TbBrandCSharp, TbBrandVscode } from "react-icons/tb";

// Suas habilidades. Troque, tire ou acrescente à vontade:
//   name     → nome que aparece no globo e na lista
//   icon     → componente do react-icons (procure em https://react-icons.github.io/react-icons)
//   color    → cor do ícone (em geral, a cor da marca)
//   category → precisa ser uma das CATEGORIES abaixo
//   link     → para onde o clique leva (documentação, repositório, certificado...)

export const CATEGORIES = ["Front-end", "Back-end", "Dados", "Ferramentas"];

const SKILLS = [
  // Front-end
  {
    name: "HTML",
    icon: SiHtml5,
    color: "#E34F26",
    category: "Front-end",
    link: "https://developer.mozilla.org/pt-BR/docs/Web/HTML",
  },
  {
    name: "CSS",
    icon: SiCss,
    color: "#663399",
    category: "Front-end",
    link: "https://developer.mozilla.org/pt-BR/docs/Web/CSS",
  },
  {
    name: "JavaScript",
    icon: SiJavascript,
    color: "#E5B800",
    category: "Front-end",
    link: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript",
  },
  {
    name: "React",
    icon: SiReact,
    color: "#149ECA",
    category: "Front-end",
    link: "https://react.dev/",
  },
  {
    name: "Vite",
    icon: SiVite,
    color: "#646CFF",
    category: "Front-end",
    link: "https://vite.dev/",
  },
  {
    name: "Bootstrap",
    icon: SiBootstrap,
    color: "#7952B3",
    category: "Front-end",
    link: "https://getbootstrap.com/",
  },

  // Back-end
  {
    name: "Java",
    icon: FaJava,
    color: "#E76F00",
    category: "Back-end",
    link: "https://dev.java/learn/",
  },
  {
    name: "Spring Boot",
    icon: SiSpringboot,
    color: "#6DB33F",
    category: "Back-end",
    link: "https://spring.io/projects/spring-boot",
  },
  {
    name: "Node.js",
    icon: SiNodedotjs,
    color: "#5FA04E",
    category: "Back-end",
    link: "https://nodejs.org/pt",
  },
  {
    name: "Python",
    icon: SiPython,
    color: "#3776AB",
    category: "Back-end",
    link: "https://docs.python.org/pt-br/3/",
  },

  // Dados
  {
    name: "MySQL",
    icon: SiMysql,
    color: "#4479A1",
    category: "Dados",
    link: "https://dev.mysql.com/doc/",
  },
  {
    name: "PostgreSQL",
    icon: SiPostgresql,
    color: "#4169E1",
    category: "Dados",
    link: "https://www.postgresql.org/docs/",
  },
  {
    name: "MongoDB",
    icon: SiMongodb,
    color: "#47A248",
    category: "Dados",
    link: "https://www.mongodb.com/docs/",
  },

  // Ferramentas
  {
    name: "Git",
    icon: SiGit,
    color: "#F05032",
    category: "Ferramentas",
    link: "https://git-scm.com/book/pt-br/v2",
  },
  {
    name: "GitHub",
    icon: SiGithub,
    color: "#181717",
    category: "Ferramentas",
    link: "https://github.com/DavidAurelio07",
  },
  {
    name: "VS Code",
    icon: TbBrandVscode,
    color: "#007ACC",
    category: "Ferramentas",
    link: "https://code.visualstudio.com/docs",
  },
  {
    name: "IntelliJ IDEA",
    icon: SiIntellijidea,
    color: "#FE315D",
    category: "Ferramentas",
    link: "https://www.jetbrains.com/idea/",
  },
  {
    name: "Postman",
    icon: SiPostman,
    color: "#FF6C37",
    category: "Ferramentas",
    link: "https://learning.postman.com/",
  },
  {
    name: "Figma",
    icon: SiFigma,
    color: "#A259FF",
    category: "Ferramentas",
    link: "https://help.figma.com/",
  },
  {
    name: "npm",
    icon: SiNpm,
    color: "#CB3837",
    category: "Ferramentas",
    link: "https://docs.npmjs.com/",
  },
  {
    name: "Vercel",
    icon: SiVercel,
    color: "#111111",
    category: "Ferramentas",
    link: "https://vercel.com/docs",
  },
];

export default SKILLS;
