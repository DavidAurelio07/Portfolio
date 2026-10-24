// curriculumConfig.js
// Os PDFs ficam na pasta public/ (tudo que está lá é servido na raiz do site:
// public/curriculo-pt.pdf → /curriculo-pt.pdf). Troque pelos seus arquivos!
const CURRICULUM_CONFIG = {
  FILES: [
    {
      id: "pt",
      label: "Português",
      file: "../../public/curriculo/Curriculo-BR.pdf",
      // Nome do arquivo quando o visitante clicar em "Baixar"
      downloadName: "Curriculo-David-Aurelio.pdf",
    },
    {
      id: "en",
      label: "English",
      file: "/curriculo-en.pdf",
      downloadName: "Resume-David-Aurelio.pdf",
    },
  ],

  // Limites do zoom (1 = página na largura da área)
  ZOOM_MIN: 0.5,
  ZOOM_MAX: 2,
  ZOOM_STEP: 0.25,
};

export default CURRICULUM_CONFIG;
