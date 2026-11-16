// curriculumConfig.js
// Os PDFs ficam na pasta public/ (tudo que está lá é servido na raiz do site:
// public/curriculo-pt.pdf → /curriculo-pt.pdf). Troque pelos seus arquivos!
const CURRICULUM_CONFIG = {
  // Para oferecer o currículo em inglês, coloque o PDF em public/curriculo/ e
  // adicione outro item aqui (ex.: { id: "en", label: "English",
  // file: "/curriculo/Resume-EN.pdf", downloadName: "Resume-David-Aurelio.pdf" }).
  // Com mais de um arquivo, o seletor de idioma aparece sozinho no visualizador.
  FILES: [
    {
      id: "pt",
      label: "Português",
      file: "/curriculo/Curriculo-BR.pdf",
      // Nome do arquivo quando o visitante clicar em "Baixar"
      downloadName: "Curriculo-David-Aurelio.pdf",
    },
  ],

  // Limites do zoom (1 = página na largura da área)
  ZOOM_MIN: 0.5,
  ZOOM_MAX: 2,
  ZOOM_STEP: 0.25,
};

export default CURRICULUM_CONFIG;
